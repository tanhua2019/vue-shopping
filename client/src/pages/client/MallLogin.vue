<template>
  <div class="LoginBox">
    <div class="login">
      <p class="center">欢迎光临</p>
      <div class="inputBox">
        <div class="inputBoxTop center">
          <span @click="select(0)" :class="{select:cur === 0}">登陆</span>
          <span @click="select(1)" :class="{select:cur === 1}">注册</span>
        </div>
        <div class="inputBoxContent center" v-if="cur === 0">
          <el-input placeholder="请输入账号" type="text" v-model="userInfo.account" clearable ></el-input>
          <el-input placeholder="请输入密码" type="password" v-model="userInfo.pwd" clearable></el-input>
          <el-button @click="login" type="primary">登陆</el-button>
        </div>
        <div class="inputBoxContent center" v-else>
          <el-input clearable v-model="signUser.email" type="text" placeholder="请输入邮箱"></el-input>
          <el-input clearable v-model="signUser.nickname" type="text" placeholder="请输入用户名"></el-input>
          <el-input clearable v-model="signUser.pwd" type="password" placeholder="请输入密码"></el-input>
          <el-input clearable v-model="signUser.recipient" type="text" placeholder="请输入收件人"></el-input>
          <el-input clearable v-model="signUser.address" type="text" placeholder="请输入地址"></el-input>
          <el-input clearable v-model="signUser.phone" type="text" placeholder="请输入手机号"></el-input>
          <el-button type="primary" @click="resetForm(a)">重置</el-button>
          <el-button type="primary" @click="signup">注册</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login, signup } from "../../api/client";
import { mapState, mapMutations } from "vuex";
export default {
  name: "",
  data() {
    return {
      cur: 0,
      userInfo: {
        account: "",
        pwd: ""
      },
      signUser: {
        email: "",
        nickname: "",
        pwd: "",
        recipient: "",
        address: "",
        phone: ""
      }
    };
  },
  methods: {
    ...mapMutations(['setclientToken','setclientName']),
    select(index) {
      this.cur = index;
    },
    login() {
      login(this.userInfo)
        .then(res => {
          // console.log(res,'9999');
          this.setclientName(res.name);
          this.setclientToken(res.token);
          this.$router.push("/");
        })
        .catch(err => {
          alert(err);
        });
    },
    signup() {
      signup(this.signUser)
        .then(res => {
          // console.log(res,'888');
          this.setclientName(res.name);
          this.setclientToken(res.token);
          this.$router.push("/");
        })
        .catch(err => {
          alert(err);
        });
    },
    resetForm() {
      this.signUser.email= "";
      this.signUser.nickname= "";
      this.signUser.pwd= "";
      this.signUser.recipient= "";
      this.signUser.address= "";
      this.signUser.phone= "";
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
  background: url(../../assets/img/client.jpg) no-repeat;
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
          color: #7d7d7d;
          cursor: pointer;
        }
        .select {
          border-bottom: 2px solid #0e90d2;
          color: #0e90d2;
        }
      }
      .inputBoxContent {
        flex-wrap: wrap;
        .el-input {
          width: 250px;
          margin-bottom: 10px;
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
