<template>
  <div class="LoginBox">
    <div class="login">
      <p class="center">后台管理系统</p>
      <div class="inputBox">
        <div class="inputBoxContent center">
          <el-input placeholder="请输入管理员账号" type="text" v-model="adminInfo.account" clearable ></el-input>
          <el-input placeholder="请输入密码" type="password" v-model="adminInfo.pwd" clearable></el-input>
          <el-button @click="login" type="primary">登陆</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapMutations } from "vuex";
import { login } from "../../api/admin";

export default {
  name: "",
  data() {
    return {
      adminInfo: {
        account: "",
        pwd: ""
      },
    };
  },
  methods: {
    ...mapMutations(['setadminName','setadminToken']),
    login() {
      login(this.adminInfo).then(data => {
          this.setadminName(data.name);
          this.setadminToken(data.token);
          this.$router.push("/backHome");
        }).catch(err => {
          this.$message.error('用户名或者密码错误!');
        });
    }
  }
};
</script>

<style lang='less' scoped>
.LoginBox {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: url(../../assets/img/time.jpg) no-repeat;
  background-size: 100% 100%;
  .login {
    position: absolute;
    top: 50%;
    margin-top: -220px;
    left: 20%;
    width: 300px;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 20px;
    p {
      height: 50px;
      font-size: 18px;
      margin-top: 20px;
      margin-bottom: 15px;
    }
    .inputBox {
      .inputBoxTop {
        height: 50px;
        margin-bottom: 10px;
        span {
          display: inline-block;
          width: 50px;
          text-align: center;
          padding: 5px 0;
          margin: 0 20px;
          cursor: pointer;
        }
      }
      .inputBoxContent {
        flex-wrap: wrap;
        .el-input {
          width: 200px;
          margin-bottom: 15px;
          border-radius: 20px;
          height: 50px;
        }
        .el-button {
          margin-top: 10px;
          width: 120px;
          height: 40px;
          border-radius: 50px;
          cursor: pointer;
          margin-bottom: 20px;
        }
      }
    }
  }
}
</style>

<style lang="less">
.LoginBox {
  .inputBoxContent {
    .el-input__inner {
      border-radius: 50px;
      height: 50px;
      padding-left: 20px;
    }
  }
}
</style>
