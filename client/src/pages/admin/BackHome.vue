<template>
  <div class="BackHome">
    <div class="headerTop">
      <div class="topLeft">购物商城后台管理系统</div>
      <div class="topRight">
        <span>欢迎您，{{adminName}}</span>
        <!-- <span @click="navTo('/backHome/editAdmin')">个人中心</span> -->
        <span @click="logout">退出登陆</span>
      </div>
    </div>
    <div class="HomeContent">
      <div class="leftNav">
          <el-menu
            :style="{height:height+'px'}"
            default-active="1"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-menu-item index="1" @click="navTo('/backHome/editUser')">
              <i class="el-icon-location"></i>
              <span slot="title">用户管理</span>
            </el-menu-item>
            <el-menu-item index="2" @click="navTo('/backHome/goods')">
              <i class="el-icon-star-on"></i>
              <span slot="title">商品管理</span>
            </el-menu-item>
            <el-menu-item index="3" @click="navTo('/backHome/orders')">
              <i class="el-icon-menu"></i>
              <span slot="title">订单管理</span>
            </el-menu-item>
            <el-menu-item index="4" @click="navTo('/backHome/messages')">
              <i class="el-icon-view"></i>
              <span slot="title">留言管理</span>
            </el-menu-item>
            <el-menu-item index="5" @click="navTo('/backHome/editAdmin')">
              <i class="el-icon-setting"></i>
              <span slot="title">修改资料</span>
            </el-menu-item>
          </el-menu>
      </div>
      <div class="rightContent">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "",
  data() {
    return {
    };
  },
  computed: {
    ...mapState(["adminName"]),
    height(){
      return this.getClientSize().height;
    },
  },
  watch: {
    $route(to, from) {
      this.curPath = to.path;
    }
  },
  methods: {
    ...mapMutations(["adminLogout"]),
    navTo(route) {
      if (this.curPath === route) {
        return;
      }
      this.$router.push(route);
    },
    logout() {
      this.adminLogout();
      this.$router.push("/login");
    },
    getClientSize() {
      let h = document.documentElement.clientHeight || document.body.clientHeight;
      return {
        height: h - 70
      };
    },
  }
};
</script>

<style lang='less' scoped>
.BackHome {
  .headerTop {
    width: 100%;
    height: 70px;
    background: #333;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 40px;
    .topLeft {
      font-size: 26px;
      color: #fff;
    }
    .topRight {
      font-size: 18px;
      color: #fff;
      span {
        padding: 0 10px;
        cursor: pointer;
      }
    }
  }
  .HomeContent {
    position: relative;
    .leftNav {
      .el-menu {
        width: 15%;
        .el-menu-item {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 30px;
          font-size: 18px;
        }
      }
    }
    .rightContent {
      position: absolute;
      top: 0;
      left: 15%;
      width: 85%;
    }
  }
}
</style>

