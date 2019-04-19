<template>
  <div class="AdminLogin" :style="{width:width+'px',height:height+'px'}">
    <div class="login_box">
      <p>购物商城后台系统</p>
      <div class="formBox">
        <input ref="account" type="text" placeholder="账号">
        <input ref="pwd" type="password" placeholder="密码">
        <button @click="login">登录</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { getClientSize } from "../../util/util";
import { login } from "../../api/admin";

export default {
  name: "AdminLogin",
  computed: {
    width() {
      return getClientSize().width;
    },
    height() {
      return getClientSize().height;
    }
  },
  data() {
    return {};
  },
  methods: {
    ...mapMutations(['setadminName','setadminToken']),
    login() {
      const account = this.$refs.account.value;
      const pwd = this.$refs.pwd.value;
      login({
        account: account,
        pwd: pwd
      }).then(data => {
          this.setadminName(data.name);
          this.setadminToken(data.token);
          this.$router.push("/backstage");
        }).catch(e => {
          this.$message.error('用户名或者密码错误!');
        });
    }
  }
};
</script>

<style scoped lang="less">
@import "../../assets/css/var.less";
.AdminLogin {
  background-color: @bgColor;
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: url(../../assets/img/time.jpg) no-repeat 100% 100%;
  img {
    width: 100%;
    height: 100%;
  }
  .login_box {
    width: 330px;
    height: 300px;
    border-radius: 10px;
    position: absolute;
    top: 20%;
    left: 200px;
    p {
      background: rgba(255, 255, 255, 0.5);
      padding-top: 30px;
      text-align: center;
      font-size: 20px;
      border-radius: 20px 20px 0 0;
    }
    .formBox {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      background: rgba(255, 255, 255, 0.5);
      padding: 20px 0;
      border-radius: 0 0 20px 20px;
      input {
        width: 70%;
        height: 50px;
        padding: 18px;
        margin-bottom: 10px;
        border: 1px solid @borderColor;
        border-radius: 15px;
      }
      button {
        width: 40%;
        background: @secondColor;
        border: 0;
        border-radius: 50px;
        line-height: 40px;
        color: #fff;
        cursor: pointer;
      }
    }
  }
}
</style>
