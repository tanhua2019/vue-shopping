<template>
  <div class="NoticeBox">
    <span class="el-icon-bell"></span>
    <ul class="noticelist" :style="{top: top+'px',transition: `top ${animateTime}s`}">
      <li v-for="(item,index) in notices" :key="index">
        <a>{{item}}</a>
      </li>
      <!-- 解决空白bug -->
      <li>
        <a href="#">{{notices[0]}}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    notices: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      top: 0,
      height: 40,
      animateTime: 1
    };
  },
  mounted() {
    setInterval(this.setanimate, 2000);
  },
  destroyed() {
    clearInterval(this.setanimate);
  },
  methods: {
    setanimate() {
      // console.log(this.top, -1 * this.height, "9999");
      if (this.top <= -2 * this.height) {
        // console.log("运行了");
        this.animateTime = 0;
        this.top = 0;
        return;
      }
      this.animateTime = 1;
      this.top -= this.height;
    }
  }
};
</script>

<style lang='less' scoped>
@import "../assets/css/var.less";
.NoticeBox {
  // margin-left: -30%;
  width: 300px;
  height: 40px;
  overflow: hidden;
  position: relative;
  display: flex;
  flex: 2;
  span {
    display: block;
    width: 30px;
    height: 30px;
    position: absolute;
    left: 0px;
    top: 12px;
  }
  .noticelist {
    position: absolute;
    list-style: none;
    li {
      padding-left: 20px;
      width: 100%;
      height: 40px;
      line-height: 40px;
      a {
        font-size: 18px;
        color: @thirdColor;
        cursor: pointer;
        text-decoration: underline;
        &:hover {
          color: white;
          text-decoration: none;
        }
      }
    }
  }
}
</style>
