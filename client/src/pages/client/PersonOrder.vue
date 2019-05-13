<template>
  <div class="personOrderBox">
    <div class="buttonBox">
      <el-button
        size="small"
        v-for="(item,index) in buttonTag"
        :key="index"
        :class="{active:index == isActive}"
        @click="changeTab(index)"
        v-waves
      >{{item}}</el-button>
    </div>
    <div class="list">
        <el-table
          :data="tableData"
          stripe
          styel="width: 100%"
          border
          :header-cell-style="tableStyle"
        >
        <el-table-column prop="id" label="订单号" align="center"></el-table-column>
          <el-table-column prop="goods.name" label="商品名称" align="center" width="200"></el-table-column>
          <el-table-column prop="goods.unitPrice" label="单价" align="center"></el-table-column>
          <el-table-column prop="goodsNum" label="数量" align="center"></el-table-column>
          <el-table-column prop="amount" label="实付款" align="center"></el-table-column>
          <el-table-column prop="createtime" label="创建时间" align="center"></el-table-column>
          <el-table-column label="操作" align="center" width="160">
            <template slot-scope="scope">
              <el-button type="text" v-show="scope.row.state===0" @click="confirmPay(scope.row.id)">确认付款</el-button>
              <el-button type="text" v-show="scope.row.state===2" @click="confirmReceive(scope.row.id)">确认收货</el-button>
              <el-button type="text" v-show="scope.row.state===3 && !scope.row.hasComment" @click="showPopup(scope.row.id,scope.row.goods.id,scope.row.goods.goodsDetailId)">评价</el-button>
              <el-button type="text" @click="deleteOrder(scope.row.id)" v-show="scope.row.state != 1">删除</el-button>
              <span  v-show="scope.row.state===3 && scope.row.hasComment">已评价</span>
              <span  v-show="scope.row.state===1">待发货</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-dialog :visible.sync="popupShow" title="请填写您的评价" class="dialogs" width="450px">
      <div class="box">
        <el-rate
          v-model="curStar"
          show-text>
        </el-rate>
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="请输入评价内容："
          v-model="comment">
        </el-input>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmSave()">保 存</el-button>
        <el-button @click= "popupShow = !popupShow">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import waves from '@/directive/waves'
import { mapState } from 'vuex';
import {getOrderByState,deleteOrder,confirmReceive,pay,sendComment} from '../../api/client';
export default {
  name: 'personOrderBox',
  computed:{
    ...mapState(['clientToken']),
  },
  directives: {
      waves
  },
  data () {
    return {
       //表头样式
      tableStyle: {
        background: "#f5f7fa",
        "font-weight": "800"
      },
      buttonTag:['全部订单','待付款','待发货','已发货','已完成'],
      isActive: 0,
      tableData: [],
      orderList:[],

      comment:'',
      popupShow: false,
      curGoodsId: '',
      curOrderId: '',
      curGoodsDetailId: '',
      curStar: null
    }
  },
  created(){
    this.getOrderByState(-1);
  },
  methods:{
    changeTab(index){
      this.isActive = index;
      this.getOrderByState(this.isActive-1);
    },
    getOrderByState(state){
      getOrderByState(state,this.clientToken).then(res=>{
        console.log(res,'999');
        this.tableData=res
      })
    },
    confirmPay(orderId){
      pay(orderId).then(()=>{
        this.$message({
            message: "支付成功！",
            type: "success",
            duration: 1000
        });
        this.orderList.map((item,index)=>{
          if(item.id===orderId){
            item.state = 1;
          }
        })
        this.$router.go(0)
        // this.getOrderByState(-1);
      })
    },
    confirmReceive(orderId){
      confirmReceive(orderId).then(()=>{
        this.$message({
            message: "确认收货成功！",
            type: "success",
            duration: 1000
        });
        this.orderList.map((item,index)=>{
          if(item.id===orderId){
            item.state = 3;
          }
        })
      })
      this.$router.go(0);
      // this.getOrderByState(-1);
    },
    deleteOrder(orderId){
      deleteOrder(orderId).then(()=>{
        this.$message({
            message: "删除订单成功！",
            type: "success",
            duration: 1000
        });
        this.orderList.map((item,index)=>{
          if(item.id===orderId){
            this.orderList.splice(index,1);
          }
        })
      })
      this.$router.go(0);
    },
    showPopup(orderId,goodsId,goodsDetailId){
      this.curGoodsId = goodsId;
      this.curOrderId = orderId;
      this.curGoodsDetailId = goodsDetailId;
      this.popupShow = true;
      // console.log(this.curGoodsId);
      // console.log(this.curOrderId);
      // console.log(this.curGoodsDetailId);
    },
    confirmSave() {
      if(this.curStar<=0 || this.comment==''){
        this.$message.error('评分和评价不能为空！');
        return;
      }
      sendComment({
        goodsDetailId:this.curGoodsDetailId,
        orderId:this.curOrderId,
        content:this.comment,
        score:this.curStar*20,
        token:this.clientToken,
        goodsId:this.curGoodsId,
      }).then(()=>{
        this.$message({
            message: "评价成功！",
            type: "success",
            duration: 1000
        });
        for(let order of this.orderList){
          if(order.id===this.curOrderId){
            order.hasComment = true;
          }
        }
        this.popupShow = false;
        this.$router.go(0)
      })
    }
  },

}
</script>

<style scoped lang="less">
@import "../../assets/css/var.less";
.personOrderBox{
  .buttonBox {
    margin-top: 10px;
    margin-bottom: 20px;
    .el-button {
      width: 160px;
      height: 40px;
    }
    .active {
      background: #339999;
      color: #fff;
    }
  }
  .dialogs {
    .box {
      height: 150px;
      width: 90%;
      margin: 20px auto;
      .el-rate {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 50px;
      }
    }
  }
}
</style>

<style lang="less">
.personOrderBox {
  .el-dialog__header {
    background: #ccc;
    height: 60px;
  }
  .el-dialog__body {
    padding: 0;
  }
  .el-dialog__footer {
    display: flex;
    justify-content: center;
    .el-button {
      width: 120px;
    }
  }
}
</style>
