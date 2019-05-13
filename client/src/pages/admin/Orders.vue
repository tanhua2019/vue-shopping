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
      <el-table :data="orderList" stripe styel="width: 90%" border :header-cell-style="tableStyle" height="450">
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
            <el-button type="text"  @click="editOrder(scope.row.id)">编辑</el-button>
            <el-button type="text" @click="deleteOrder(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>

import {getOrders,deleteOrder} from '../../api/admin';
import waves from '@/directive/waves'
export default {
  name: "",
  data() {
    return {
      //表头样式
      tableStyle: {
        background: "#f5f7fa",
        "font-weight": "800"
      },
      buttonTag:['全部','未付款','未发货','已发货','已到货'],
      isActive: 0,
      orderList: [],
    };
  },
  directives: {
      waves
  },
  mounted(){
  	this.changeTab(0);
  },
  methods: {
    changeTab(index){
      this.isActive = index;
      getOrders(index-1).then(res => {
        this.orderList = res;
      })
    },
    editOrder(id){
  		this.$router.push('/backHome/orders/'+id)
  	},
    deleteOrder(id){
  	 deleteOrder(id).then(()=>{
        this.$message({
            message: "删除成功!",
            type: "success",
            duration: 1000
        });
  			this.orderList.map((item,index)=>{
  				if(item.id===id){
  					this.orderList.splice(index,1);
  				}
        })
        this.$router.go(0);
      }).catch(err => {
        this.$message.error("商品还未完成发货，不能删除");
      })
      // this.changeTab(0);

  	}
  },
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
      width: 160px;
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
}
</style>
