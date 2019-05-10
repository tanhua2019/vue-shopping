<template>
  <div class="Personal">
    <ul class="titleList">
      <li :class="{selected:curPath==='/mall/personal/personCart'}" @click="navTo('/mall/personal/personCart')">购物车</li>
      <li :class="{selected:curPath==='/mall/personal/personOrder'}" @click="navTo('/mall/personal/personOrder')" >我的订单</li>
      <li :class="{selected:curPath==='/mall/personal/personInfo'}" @click="navTo('/mall/personal/personInfo')">修改资料</li>
    </ul>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      curPath: this.$route.path
    };
  },
  watch: {
    $route(to, from) {
      this.curPath = to.path;
    }
  },
  methods: {
    navTo(route) {
      this.$router.push(route);
    }
  }
};
</script>

<style scoped lang="less">
@import "../../assets/css/var.less";
.Personal {
  padding-top: 20px;
  .titleList {
    width: 180px;
    border: 1px solid @borderColor;
    padding: 20px 0;
    display: inline-block;
    overflow: hidden;
    li {
      width: 100%;
      margin: 20px 0;
      padding-left: 30px;
      color: @fontDefaultColor;
      font-size: 15px;
      cursor: pointer;
      border-left: 2px solid transparent;
    }
    .selected {
      border-left: 2px solid @thirdColor;
      color: @thirdColor;
    }
  }
  .content {
    width: 980px;
    margin-left: 30px;
    overflow: hidden;
    display: inline-block;
    vertical-align: top;
  }
}
</style>
