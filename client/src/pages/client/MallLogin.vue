<template>
  <div class="ClientLogin" :style="{width:width+'px',height:height+'px'}">
    <div class="login_box">
      <p>您好，欢迎光临！</p>
      <div class="tag">
        <span @click="setIndex(0)" :class="{selected:curIndex===0}">登录</span>
        <span @click="setIndex(1)" :class="{selected:curIndex===1}">注册</span>
      </div>
      <div class="formBox" v-show="curIndex===0">
        <input ref="account" type="text" placeholder="请输入账号">
        <input ref="pwd" type="password" placeholder="请输入密码">
        <button @click="login">登录</button>
      </div>
      <div class="formBox" v-show="curIndex===1">
        <input ref="signEmail" type="text" placeholder="请输入邮箱">
        <input ref="signName" type="text" placeholder="请输入用户名">
        <input ref="signPwd" type="password" placeholder="请输入密码">
        <input ref="signRecipient" type="text" placeholder="请输入收件人">
        <input ref="signAddress" type="text" placeholder="请输入地址">
        <input ref="signPhone" type="text" placeholder="请输入手机号">
        <button @click="signup">注册</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import {getClientSize} from '../../util/util';
import {login,signup} from '../../api/client';

export default {
  name: 'ClientLogin',
  computed:{
    width(){
      return getClientSize().width;
    },
    height(){
      return getClientSize().height;
    },
  },
  data () {
    return {
      curIndex:0
    }
  },
  methods:{
    ...mapMutations({
      setClientName: 'SET_CLIENT_NAME',
      setClientToken: 'SET_CLIENT_TOKEN'
    }),
    setIndex(index){
      if(index===this.curIndex){
        return;
      }
      this.curIndex = index;
    },
    login(){
      const account = this.$refs.account.value;
      const pwd = this.$refs.pwd.value;
      login({
        account:account,
        pwd:pwd
      }).then((data)=>{
        this.setClientName(data.name);
        this.setClientToken(data.token);
        this.$router.push('/');
      }).catch((e)=>{
        alert(e)
      })
    },
    signup(){
      signup({
        email:this.$refs.signEmail.value,
        nickname:this.$refs.signName.value,
        pwd:this.$refs.signPwd.value,
        recipient:this.$refs.signRecipient.value,
        address:this.$refs.signAddress.value,
        phone:this.$refs.signPhone.value,
      }).then((data)=>{
        this.setClientName(data.name);
        this.setClientToken(data.token);
        this.$router.push('/');
      }).catch((e)=>{
        alert(e)
      })
    }
  }
}
</script>

<style scoped lang="less">
@import "../../assets/css/var.less";
 .ClientLogin {
  background-color: @bgColor;
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: url(../../assets/img/admin.jpg) no-repeat 100% 100%;
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
      font-size: 16px;
      border-radius: 20px 20px 0 0;
    }
    .tag {
      background: rgba(255, 255, 255, 0.5);
      color: @fontDefaultColor;
      text-align: center;
      padding: 20px 0;
      span {
        display: inline-block;
        width: 50px;
        text-align: center;
        margin: 0 20px;
        padding: 5px 0;
        cursor: pointer;
      }
      .selected {
        border-bottom: 2px solid @secondColor;
        color: @secondColor;
      }
    }
    .formBox {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      background: rgba(255, 255, 255, 0.5);
      padding: 0 0 20px 0;
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
