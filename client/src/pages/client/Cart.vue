<template>
  <div class="Cart">
    <div v-if="orderList.length>0">
      <div class="cartTableHeader">
        <span>商品信息</span>
        <span>单价</span>
        <span>数量</span>
        <span>小计</span>
        <span>交易操作</span>
      </div>
      <ul class="orderList">
        <li v-for="(item,index) in orderList" :key="index">
          <div class="orderDetail">
            <img :src="item.goods.img" alt="商品图片">
            <div class="goodsName">
              <p @click="navTo('/mall/goods/'+item.goods.id)">{{item.goods.name}}</p>
              <span>{{item.goods.spec}}</span>
            </div>
            <span class="unitPrice">{{'￥'+item.goods.unitPrice}}</span>
            <span class="num">
              <NumberInput
                @changeHandle="numberChange(item.id)"
                :initNum="item.temGoodsNum"
                v-model="item.temGoodsNum"
                :min="1"
                :max="999"
              />
            </span>
            <!-- <input @change="numberChange(item.id)" type="text" v-model="item.temGoodsNum" min="1" class="numInput" /> -->
            <span class="amount">{{'￥'+item.amount}}</span>
            <button @click="deleteOrde(item.id)">删除</button>
          </div>
        </li>
      </ul>
      <div class="cartFooter">
        <span>应付金额：</span>
        <span class="total">{{'￥'+totalAmount}}</span>
        <button @click="makeOrder()">下单</button>
      </div>
    </div>
    <p class="emptyTips" v-else>购物车还是空滴~</p>
  </div>
</template>

<script>
import { mapState,mapMutations } from "vuex";
import { getOrderByState, deleteOrder, settleAccounts } from "../../api/client";
import NumberInput from "../../components/NumberInput";


export default {
  name: "Cart",
  components: {
    NumberInput
  },
  computed: {
    ...mapState(["clientToken"]),
    totalAmount() {
      let amount = 0;
      this.orderList.map((item, index) => {
        amount += item.amount;
      });
      return amount;
    }
  },
  data() {
    return {
      orderList: {
        goods: []
      }
    };
  },
  mounted() {
    this.getOrderState(0);
  },
  methods: {
    ...mapMutations({
      del: 'DELETE',
    }),
    ...mapMutations({
      setClientName: 'SET_CLIENT_NAME',
      setClientToken: 'SET_CLIENT_TOKEN'
    }),
    //购物车
    getOrderState(state) {
      getOrderByState(state, this.clientToken).then(res => {
          console.log(res, "99999");
          this.orderList = res;
          //解决购物车数量默认值报错
          this.orderList.map((item, index) => {
            item.temGoodsNum = item.goodsNum;
          });
        }).catch(e => {
          console.log(e);
        });
    },
    //改变购物车商品数量
    numberChange(orderId) {
      this.orderList.map(item => {
        if (orderId == item.id) {
          item.amount = item.goods.unitPrice * item.temGoodsNum;
          // console.log(item.amount,item.goods.unitPrice,item.temGoodsNum,'购物车');
        }
      });
    },
    //删除订单
    deleteOrde(orderId) {
      // console.log("000");
      this.del(this.orderList.length-1);
      deleteOrder(orderId).then(res => {
          this.$message({
            message: "删除订单成功！",
            type: "success",
            duration: 1000
          });
          this.orderList.map((item, index) => {
            if (item.id == orderId) {
              this.orderList.splice(index, 1);
            }
          });
        }).catch(err => {
          console.log(err);
        });
    },
    navTo(route) {
      this.$router.push(route);
    },
    //下单
    makeOrder() {
      let cartList = [];
      this.orderList.map(item => {
        cartList.push({
          id: item.id,
          goodsNum: item.temGoodsNum,
          amount: item.amount
        });
      });
      settleAccounts({cartList}).then(res => {
        this.$message({
            message: "下单成功！",
            type: "success",
            duration: 1000
          });
        this.orderList= []
        }).catch(err => {
          console.log(err);
        });
    },
  }
};
</script>

<style scoped lang="less">
@import "../../assets/css/var.less";
.Cart {
  width: 100%;
  .emptyTips {
    width: 200px;
    text-align: center;
    display: block;
    margin: 30px auto;
    color: @thirdColor;
    font-size: 20px;
  }
  .cartTableHeader {
    width: 100%;
    height: 40px;
    background-color: #f5f5f5;
    border: 1px solid @borderColor;
    color: @fontDefaultColor;
    font-size: 14px;
    line-height: 40px;
    span {
      display: inline-block;
      width: 14%;
      &:first-child {
        width: 40%;
        text-align: center;
      }
    }
  }
  .orderList {
    width: 100%;
    li {
      border: 1px solid @borderColor;
      border-top: none;
      font-size: 13px;
      .orderHeader {
        background-color: #f1f1f1;
        height: 40px;
        line-height: 40px;
        padding: 0 5px;
        .orderTime {
          font-weight: 600;
        }
        .orderId,
        .state {
          margin-left: 10px;
        }
      }
      .orderDetail {
        width: 100%;
        padding: 10px;
        position: relative;
        overflow: hidden;
        img {
          width: 84px;
          height: 84px;
          display: inline-block;
        }
        .goodsName {
          display: inline-block;
          margin-left: 5px;
          width: 230px;
          vertical-align: top;
          p {
            cursor: pointer;
            line-height: 20px;
            &:hover {
              text-decoration: underline;
            }
          }
          span {
            color: @fontDefaultColor;
            display: block;
            margin-top: 10px;
          }
        }
        .unitPrice,
        .num,
        .amount {
          display: inline-block;
          vertical-align: top;
          width: 15%;
          height: 85px;
          line-height: 85px;
          text-align: center;
        }
        .NumberInput {
          position: relative;
          top: 25px;
        }
        button {
          position: absolute;
          right: 90px;
          bottom: 40px;
          width: 70px;
          height: 30px;
          border-radius: 3px;
          background-color: @falseColor;
          color: white;
          border: none;
        }
      }
    }
  }
  .cartFooter {
    width: 100%;
    height: 60px;
    line-height: 60px;
    padding: 0 10px;
    border: 1px solid @borderColor;
    border-top: none;
    background-color: #f5f5f5;
    position: relative;
    span {
      color: @fontDefaultColor;
      display: inline-block;
      vertical-align: top;
    }
    .total {
      color: @falseColor;
      font-size: 25px;
      font-weight: 600;
    }
    button {
      position: absolute;
      right: 0;
      top: 0;
      width: 100px;
      height: 100%;
      background-color: @thirdColor;
      border: none;
      color: white;
      font-size: 20px;
    }
  }
}
</style>

<style>
.el-message {
  margin-top: 20px;
}
</style>
