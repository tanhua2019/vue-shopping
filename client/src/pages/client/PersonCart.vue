<template>
  <div class="cartBox">
    <div class="cartList" v-if="carList.length>0">
      <div class="cartListHead">
        <el-row class="rows">
          <el-col :span="5" class="cols">商品信息</el-col>
          <el-col :span="4" class="cols">单价</el-col>
          <el-col :span="6" class="cols">数量</el-col>
          <el-col :span="4" class="cols">小计</el-col>
          <el-col :span="5" class="cols">交易操作</el-col>
        </el-row>
      </div>
      <div class="cartListMain">
        <ul>
          <li v-for="(item,index) in carList" :key="index">
            <div class="listBox">
              <div class="goodName" @click="navTo('/mall/goods/'+item.goods.id)">
                <img :src="item.goods.img" alt="商品图片">
                <span>{{item.goods.name}}</span>
              </div>
              <div class="goodPrice">
                <span>{{'￥'+item.goods.unitPrice}}</span>
              </div>
              <div class="inputNumber">
                <el-input-number
                  v-model="item.goodsNum"
                  @change="handleChange(item.id)"
                  :min="1"
                  :max="99"
                  label="描述文字"
                  type:number
                ></el-input-number>
              </div>
              <div class="amount">
                <span>{{'￥'+item.amount}}</span>
              </div>
              <div class="del">
                <el-button type="danger" @click="deleteList(item.id)">删除</el-button>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="cartBottom">
        <div class="bottomLeft">
          <span>应付总额：</span>
          <span class="total">{{'￥'+totalAmount}}</span>
        </div>
        <el-button type="primary" class="elbutton" @click="makeOrder()">下单</el-button>
      </div>
    </div>
    <div class="elseCartList" v-else>
      <i class="el-icon-goods"></i>
      <span>购物车还是空滴</span>
      <el-button type="primary" @click="navTo('/mall')">去逛逛</el-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { getOrderByState, deleteOrder, settleAccounts } from "../../api/client";
export default {
  name: "",
  data() {
    return {
      num: 1,
      carList: []
    };
  },
  mounted() {
    this.getOrderState(0);
  },
  computed: {
    ...mapState(["clientToken"]),
    totalAmount() {
      let amount = 0;
      this.carList.map(item => {
        amount += item.amount;
      });
      return amount;
    }
  },
  methods: {
    ...mapMutations(["deleteCar"]),
    navTo(route) {
      this.$router.push(route);
    },
    //购物车
    getOrderState(state) {
      getOrderByState(state, this.clientToken).then(res => {
        console.log(res, "99999");
        this.carList = res;
      });
    },
    //改变购物车商品数量
    handleChange(orderId) {
      this.carList.map(item => {
        if (orderId == item.id) {
          item.amount = item.goods.unitPrice * item.goodsNum;
        }
      });
    },
    //删除订单
    deleteList(orderId) {
      // console.log("000");
      this.deleteCar(this.carList.length - 1);
      deleteOrder(orderId).then(res => {
        this.$message({
          message: "删除订单成功！",
          type: "success",
          duration: 1000
        });
        this.carList.map((item, index) => {
          if (item.id == orderId) {
            this.carList.splice(index, 1);
          }
        });
      });
    },
    //下单
    makeOrder() {
      let cartList = [];
      this.carList.map(item => {
        cartList.push({
          id: item.id,
          goodsNum: item.goodsNum,
          amount: item.amount
        });
      });
      // console.log(cartList);
      settleAccounts({ cartList }).then(res => {
        this.$message({
          message: "下单成功！",
          type: "success",
          duration: 1000
        });
        this.carList = [];
        //刷新页面
        this.$router.go(0)
        // this.getOrderState(0);
      });
    }
  }
};
</script>

<style lang='less' scoped>
.cartBox {
  .cartList {
    height: 400px;
    overflow: auto;
    .cartListHead {
      height: 50px;
      background: #f5f7fa;
      border: 1px solid #d1d1d1;
      margin-bottom: 10px;
      .rows {
        .cols {
          height: 50px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
    .cartListMain {
      .listBox {
        height: 120px;
        margin-top: 20px;
        background: #f5f7fa;
        border: 1px solid #d1d1d1;
        display: flex;
        align-items: center;
        justify-content: center;
        .goodName {
          display: flex;
          flex: 1;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          cursor: pointer;
          img {
            width: 80px;
            height: 80px;
            display: inline-block;
          }
          span {
            margin-top: 10px;
            flex: 1;
          }
        }
        .goodPrice {
          display: flex;
          flex: 1;
          justify-content: center;
          span {
            font-size: 16px;
            font-weight: 800;
            color: #000;
          }
        }
        .inputNumber {
          display: flex;
          flex: 1;
          justify-content: center;
        }
        .amount {
          display: flex;
          flex: 1;
          justify-content: center;
          span {
            font-size: 16px;
            font-weight: 800;
            color: red;
          }
        }
        .del {
          display: flex;
          flex: 1;
          justify-content: center;
        }
      }
    }
    .cartBottom {
      width: 100%;
      height: 60px;
      margin-top: 10px;
      padding: 0 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border: 1px solid #d1d1d1;
      background: #f5f7fa;
      padding: 0 20px;
      .total {
        color: red;
        font-size: 25px;
        font-weight: 600;
      }
    }
  }
  .elseCartList {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      height: 300px;
      background: #f5f7fa;
      border: 1px solid #d1d1d1;
      i {
        display: flex;
        justify-content: center;
        font-size: 200px;
        color: #b4a078;
      }
      span {
        display: flex;
        justify-content: center;
        font-size: 20px;
        color: #ccc;
      }
      .el-button {
        width: 150px;
        margin: 0 auto;
        margin-top: 20px;
      }
    }
}
</style>
