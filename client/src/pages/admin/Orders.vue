<template>
  <div class="orderBox">
    <div class="orderHead">
      <span>订单管理</span>
    </div>
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
    <div class="table">
      <el-table
        :data="orderList"
        stripe
        styel="width: 90%"
        border
        :header-cell-style="tableStyle"
        height="450"
      >
        <el-table-column width="180" prop="id" label="订单号" align="center" fixed></el-table-column>
        <el-table-column width="180" prop="user.nickname" label="用户昵称" align="center"></el-table-column>
        <el-table-column width="180" prop="user.name" label="收件人" align="center"></el-table-column>
        <el-table-column width="180" prop="user.address" label="收货地址" align="center"></el-table-column>
        <el-table-column width="180" prop="user.phone" label="联系电话" align="center"></el-table-column>
        <el-table-column width="180" prop="goods" label="商品" align="center"></el-table-column>
        <el-table-column width="180" prop="spec" label="规格" align="center"></el-table-column>
        <el-table-column width="180" prop="num" label="购买数量" align="center"></el-table-column>
        <el-table-column width="180" prop="amount" label="金额" align="center"></el-table-column>
        <el-table-column width="180" prop="state" label="订单状态" align="center"></el-table-column>
        <el-table-column width="180" prop="time" label="更新时间" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="200" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" @click="editOrder(scope.row.id)">编辑</el-button>
            <el-button type="text" @click="deleteOrder(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="订单编辑" :visible.sync="isShow" width="45%">
      <div class="content">
        <div class="box">
          <span>订单号：</span>
          <span>{{id}}</span>
        </div>
        <div class="box">
          <span>商品名称：</span>
          <span>{{goods}}</span>
        </div>
        <div class="box">
          <span>总金额：</span>
          <span class="money">{{'¥'+amount}}</span>
        </div>
        <div class="box">
          <span>规格：</span>
          <el-radio-group v-model="temSpecId">
            <el-radio
              :label="item.id"
              v-for="(item,index) in spec"
              :key="index"
              border
            >{{item.specName}}</el-radio>
          </el-radio-group>
        </div>
        <div class="box">
          <span>数量：</span>
          <el-input-number size="small" v-model="temNum" :min="1" :max="99" @change="handleChange"></el-input-number>
        </div>
        <div class="box">
          <span>订单状态：</span>
          <el-radio-group v-model="temStateId">
            <el-radio
              :label="item.id"
              v-for="(item,index) in states"
              :key="index"
              border
            >{{item.name}}</el-radio>
          </el-radio-group>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveChange">确 定</el-button>
        <el-button @click="isShow = !isShow">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getOrders,
  deleteOrder,
  getAOrder,
  changeOrder
} from "../../api/admin";
import waves from "@/directive/waves";
export default {
  name: "",
  data() {
    return {
      //表头样式
      tableStyle: {
        background: "#f5f7fa",
        "font-weight": "800"
      },
      buttonTag: ["全部", "未付款", "未发货", "已发货", "已到货"],
      isActive: 0,
      orderList: [],
      isShow: false,

      id: "",
      goods: "",
      spec: [],
      states: [],
      curSpecId: "",
      curStateId: "",
      temSpecId: "",
      temNum: 0,
      temState: "",
    
      temStateId: 0,
    };
  },
  directives: {
    waves
  },
  mounted() {
    this.changeTab(0);
  },
  computed: {
    amount() {
      let price = 0;
      console.log(this.spec, "0000");
      this.spec.map((item, index) => {
        if (item.id === this.temSpecId) {
          price = item.unitPrice;
        }
      });
      return this.temNum * price;
    }
  },
  methods: {
    changeTab(index) {
      this.isActive = index;
      getOrders(index - 1).then(res => {
        this.orderList = res;
      });
    },
    handleChange(value) {
      console.log(value);
    },
    editOrder(id) {
      this.isShow = true;
      getAOrder(id).then(order => {
        this.id = order.id;
        this.goods = order.goods;
        this.spec = order.spec;
        this.states = order.states;
        this.curSpecId = order.curSpec.id;
        this.curStateId = order.curState.id;
        this.temSpecId = order.curSpec.id;
        this.temNum = Number(order.num);
        this.temStateId = order.curState.id;
        console.log(this.temStateId,'9090');
      });
    },
    saveChange(){
      changeOrder({
        id:this.id,
        state:this.temStateId,
        spec:this.temSpecId,
        num:this.temNum
      }).then(()=>{
        this.$message({
            message: "修改成功！",
            type: "success",
            duration: 1000
        });
      })
    },
    deleteOrder(id) {
      deleteOrder(id)
        .then(() => {
          this.$message({
            message: "删除成功!",
            type: "success",
            duration: 1000
          });
          this.orderList.map((item, index) => {
            if (item.id === id) {
              this.orderList.splice(index, 1);
            }
          });
          this.$router.go(0);
        })
        .catch(err => {
          this.$message.error("商品还未完成发货，不能删除");
        });
      // this.changeTab(0);
    }
  }
};
</script>

<style lang='less' scoped>
.orderBox {
  .orderHead {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 50px;
  }
  .buttonBox {
    width: 100%;
    padding: 0 5%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    .el-button {
      width: 200px;
      height: 40px;
    }
    .active {
      background: #339999;
      color: #fff;
    }
  }
  .table {
    width: 90%;
    margin: 0 auto;
    // height: 450px;
    // overflow: auto;
  }
  .content {
    .box {
      height: 50px;
      display: flex;
      justify-content: left;
      align-items: center;
      .money {
        font-size: 20px;
        color: red;
      }
      span {
        font-size: 18px;
      }
    }
  }
}
</style>

<style lang="less">
.orderBox{
  .el-dialog__header {
    background: #ccc;
    height: 60px;
  }
  .el-dialog__body {
    padding: 20px 30px;
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
