<template>
  <div class="Mall">
    <div class="navBar">
      <div class="title" @click="navTo('/mall')">购物商城</div>
      <Notice :notices="notices"></Notice>
      <div class="right" v-if="clientToken">
        <span>欢迎您，{{clientName}}</span>
        <span @click="navTo('/mall/personal')">个人中心</span>
        <span @click="logout">退出登陆</span>
      </div>
      <div class="right" v-else>
        <span @click="navTo('/login')">登陆</span>
        <span @click="navTo('/login')">注册</span>
      </div>
    </div>
    <div class="content">
      <div class="container">
        <MallShow></MallShow>
        <router-view></router-view>
      </div>
      <div class="fixedAd" v-show="isShow">
        <img src="../../assets/img/nav.gif" alt>
        <ul class="fixedList">
          <li>
            <i class="iconfont icon-collection_fill"/>
            <span>新人有礼</span>
          </li>
          <li>
            <i class="iconfont icon-paixing-copy"/>
            <span>热门商品</span>
          </li>
          <li>
            <i class="iconfont icon-fabulous"/>
            <span>用户反馈</span>
          </li>
          <li @click="backToTop">
            <i class="iconfont icon-arrows-4-7"/>
            <span>回顶部</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="bottomInfo">
      <div class="container">
        <div class="service footerItem">
          <p class="title">客户服务</p>
          <span>
            <i class="iconfont icon-people_fill"/>在线客服
          </span>
          <span>
            <i class="iconfont icon-fabulous"/>用户反馈
          </span>
        </div>
        <div class="intro footerItem">
          <p class="title">何为严选</p>
          <p class="intro-p">网易原创生活类电商品牌，秉承网易一贯的严谨态度，我们深入世界各地，从源头全程严格把控商品生产环节，力求帮消费者甄选到优质的商品</p>
          <div>
            关注我们：
            <img src="http://yanxuan.nosdn.127.net/60068701f3a380911f237c26c91b39d0.png" alt>
            <img src="http://yanxuan.nosdn.127.net/031e783d7ee645b6096980d0bf83079b.png" alt>
            <img src="http://yanxuan.nosdn.127.net/0c8759a89cdbd7acf7f2921e6f0fad19.png" alt>
          </div>
        </div>
        <div class="code footerItem">
          <p class="title">扫码下载APP</p>
          <img src="../../assets/img/code.png" alt>
          <span>下载领1000元新人礼包</span>
        </div>
      </div>
    </div>
    <footer>
      <div class="container">
        <ul class="footerTop">
          <li>
            <img src="//yanxuan.nosdn.127.net/e72ed4de906bd7ff4fec8fa90f2c63f1.png" alt>
            <span>网易品质保证</span>
          </li>
          <li>
            <img src="//yanxuan.nosdn.127.net/e6021a6fcd3ba0af3a10243b7a2fda0d.png" alt>
            <span>30天无忧退换货</span>
          </li>
          <li>
            <img src="//yanxuan.nosdn.127.net/e09c44e4369232c7dd2f6495450439f1.png" alt>
            <span>满88元免邮费</span>
          </li>
          <li>
            <img src="//yanxuan.nosdn.127.net/e6021a6fcd3ba0af3a10243b7a2fda0d.png" alt>
            <span>品质保障</span>
          </li>
        </ul>
        <div class="footerBottom">
          <ul>
            <li>关于我们</li>
            <li>帮助中心</li>
            <li>售后服务</li>
            <li>配送与验收</li>
            <li>商务合作</li>
            <li>企业采购</li>
            <li>开放平台</li>
            <li>搜索推荐</li>
            <li>友情链接</li>
          </ul>
          <p>版权所有 © 1997-2019</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import Notice from "../../components/Notice";
import MallShow from "../../components/MallShow";

export default {
  name: "Mall",
  computed: {
    ...mapState(["clientToken", "clientName"])
  },
  components: {
    Notice,
    MallShow
  },
  data() {
    return {
      notices: ["随机立减 最高减99元！", "领1000元APP新人礼"],
      isShow: false
    };
  },

  methods: {
    ...mapMutations(["clientLogout"]),
    navTo(route) {
      this.$router.push(route);
    },
    logout() {
      this.clientLogout();
      this.$router.go(0);
    },
    backToTop() {
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (scrollTop > 0) {
        window.requestAnimationFrame(this.backToTop);
        window.scrollTo(0, scrollTop - scrollTop / 10);
      }
    },
    watchScrollTop() {
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (scrollTop > 600 && scrollTop < 3700) {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    }
  },
  mounted() {
    document.addEventListener("scroll", this.watchScrollTop, false);
  },
  beforeDestroyed() {
    document.removeEventListener("scroll", this.watchScrollTop, false);
  }
};
</script>

<style scoped lang="less">
@import "../../assets/css/var.less";
.Mall {
  width: 100%;
  .navBar {
    width: 100%;
    height: 50px;
    background: #333;
    color: #fff;
    font-size: 18px;
    display: flex;
    align-items: center;
    .title {
      cursor: pointer;
      display: flex;
      justify-content: center;
      flex: 1;
    }
    .right {
      display: flex;
      justify-content: flex-end;
      flex: 2;
      padding-right: 50px;
      span {
        padding: 0 10px;
        cursor: pointer;
      }
    }
  }
  .fixedAd {
    position: fixed;
    right: 0;
    top: 108px;
    width: 72px;
    img {
      display: block;
      width: 100%;
      height: 154px;
    }
    .fixedList {
      margin-top: 2px;
      background-color: white;
      width: 100%;
      li {
        width: 100%;
        height: 80px;
        text-align: center;
        border-bottom: 1px solid @borderColor;
        cursor: pointer;
        padding-top: 12px;
        i {
          display: block;
          font-size: 30px;
          color: #666666;
        }
        span {
          display: block;
          font-size: 14px;
          color: #666666;
          margin-top: 4px;
        }
        &:last-child {
          border-bottom: none;
        }
        &:hover {
          i {
            color: @thirdColor;
          }
          span {
            color: @thirdColor;
          }
        }
      }
    }
  }
  .bottomInfo {
    width: 100%;
    height: 300px;
    border-top: 1px solid @borderColor;
    overflow: hidden;
    margin-top: 80px;
    .footerItem {
      width: 33%;
      height: 210px;
      position: relative;
      top: 45px;
      display: inline-block;
      text-align: center;
      vertical-align: middle;
      color: @fontDefaultColor;
      .title {
        color: @fontDeepColor;
        margin-bottom: 30px;
      }
    }
    .service {
      border-right: 1px solid @borderColor;
      span {
        display: inline-block;
        width: 80px;
        height: 100px;
        border: 1px solid @borderColor;
        text-align: center;
        margin: 0 10px;
        font-size: 14px;
        cursor: pointer;
        &:hover {
          color: @thirdColor;
        }
        i {
          display: block;
          font-size: 30px;
          margin-top: 20px;
          margin-bottom: 10px;
        }
      }
    }
    .intro {
      border-right: 1px solid @borderColor;
      .intro-p {
        font-size: 13px;
        width: 300px;
        margin: 0 auto;
        text-align: left;
        color: @fontDeepColor;
        line-height: 1.8em;
      }
      div {
        text-align: left;
        font-size: 14px;
        margin-left: 47px;
        margin-top: 20px;
        img {
          margin: 0 6px;
          display: inline-block;
          vertical-align: middle;
        }
      }
    }
    .code {
      img {
        display: block;
        margin: 0 auto;
      }
      span {
        font-size: 12px;
        color: @thirdColor;
        margin-top: 10px;
        display: block;
      }
    }
  }
  footer {
    width: 100%;
    height: 208px;
    background-color: #414141;
    color: white;
    overflow: hidden;
    .footerTop {
      padding: 36px 0;
      border-bottom: 1px solid #4f4f4f;
      width: 100%;
      li {
        display: inline-block;
        width: 24%;
        text-align: center;
        img {
          vertical-align: middle;
        }
        span {
          vertical-align: middle;
          font-size: 18px;
          margin-left: 10px;
        }
      }
    }
    .footerBottom {
      color: @fontDefaultColor;
      margin-top: 30px;
      font-size: 13px;
      text-align: center;
      ul {
        li {
          display: inline-block;
          cursor: pointer;
          padding: 0 6px;
          border-right: 2px solid @fontDefaultColor;
          &:last-child {
            border-right: none;
          }
        }
      }
      p {
        margin-top: 5px;
      }
    }
  }
}
</style>
