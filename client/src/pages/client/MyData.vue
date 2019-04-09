<template>
  <div class="personBox">
    <div class="headBox">
      <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="headimg" :src="headimg" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>
    <div class="inputBox">
      <div class="content">
        <span>账号:</span>
      </div>
      <input v-model="email" disabled>
    </div>
    <div class="inputBox">
      <div class="content">
        <span>昵称:</span>
      </div>
      <input v-model="nickname">
    </div>
    <div class="inputBox">
      <div class="content">
        <span>收件人:</span>
      </div>
      <input v-model="recipient">
    </div>
    <div class="inputBox">
      <div class="content">
        <span>收件地址:</span>
      </div>
      <input v-model="address">
    </div>
    <div class="inputBox">
      <div class="content">
        <span>联系电话:</span>
      </div>
      <input v-model="phone">
    </div>
    <div class="buttonBox">
      <button @click="showPopup">修改密码</button>
      <button @click="updateUserData">确认保存</button>
    </div>
    <Popup title="修改密码" @popupClose="closePopup" v-show="popupShow">
      <div class="popupContent" slot="popupContent">
        <input type="password" v-model="oldPwd" placeholder="请输入原密码">
        <input type="password" v-model="newPwd" placeholder="请输入新密码">
        <input type="password" v-model="confirmPwd" placeholder="请再次输入新密码">
        <button @click="updatePwd">确认修改</button>
      </div>
    </Popup>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import Popup from "../../components/Popup";
import { getUserData, updateUserData, updatePwd } from "../../api/client";
export default {
  name: "",
  components: {
    Popup
  },
  data() {
    return {
      id: "",
      headimg: "",
      email: "",
      nickname: "",
      recipient: "",
      address: "",
      phone: "",
      popupShow: false,
      oldPwd: "",
      newPwd: "",
      confirmPwd: ""
    };
  },
  mounted() {
    getUserData(this.clientToken)
      .then(data => {
        this.id = data.id;
        this.headimg = data.headimg;
        this.email = data.email;
        this.nickname = data.nickname;
        this.recipient = data.recipient;
        this.address = data.address;
        this.phone = data.phone;
      })
      .catch(e => {
        alert(e);
      });
  },
  computed: {
    ...mapState(["clientToken"])
  },
  methods: {
    ...mapMutations({
      setClientName: "SET_CLIENT_NAME"
    }),
    updateUserData() {
      console.log(this.headimg, "9999");
      updateUserData({
        headimg: this.headimg,
        id: this.id,
        nickname: this.nickname,
        recipient: this.recipient,
        address: this.address,
        phone: this.phone
      })
        .then(() => {
          this.$message({
            message: "修改个人信息成功！",
            type: "success",
            duration: 1000
          });
          this.setClientName(this.nickname);
        })
        .catch(e => {
          alert(e);
        });
    },
    closePopup() {
      this.popupShow = false;
    },
    showPopup() {
      console.log("0000");
      this.popupShow = true;
    },
    updatePwd() {
      if (this.newPwd !== this.confirmPwd) {
        this.$message({
          message: "两次输入的密码不一致！",
          type: "success",
          duration: 1000
        });
        return;
      }
      updatePwd({
        id: this.id,
        oldPwd: this.oldPwd,
        newPwd: this.newPwd,
        confirmPwd: this.confirmPwd
      })
        .then(() => {
          this.oldPwd = "";
          this.newPwd = "";
          this.confirmPwd = "";
          this.closePopup();
          this.$message({
            message: "修改密码成功!",
            type: "success",
            duration: 1000
          });
        })
        .catch(e => {
          alert(e);
        });
    },
    handleAvatarSuccess(res, file) {
      this.headimg = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style lang='less' scoped>
.personBox {
  width: 100%;
  height: 100%;
  background: #f6f4ef;
  border: 3px solid #ccc;
  .headBox {
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      display: block;
      border-radius: 50%;
      width: 80px;
      height: 80px;
      cursor: pointer;
    }
  }
  .inputBox {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    .content {
      width: 100px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    input {
      border: none;
      border: 1px solid #ccc;
      width: 25%;
      height: 40px;
      border-radius: 10px;
      padding-left: 20px;
    }
  }
  .buttonBox {
    display: flex;
    align-items: center;
    justify-content: center;
    button {
      margin: 20px;
      padding: 10px 20px;
      background-color: #b4a078;
      color: white;
      border: none;
      border-radius: 30px;
    }
  }
  .popupContent {
    padding: 20px;
    input {
      display: block;
      border: none;
      border-bottom: 1px solid #313541;
      margin-bottom: 16px;
      font-size: 13px;
      padding: 5px;
      width: 200px;
    }
    button {
      background-color: #333333;
      border: none;
      color: white;
      width: 80px;
      height: 32px;
      display: block;
      margin: 20px auto 5px;
    }
  }
}
</style>
<style>
.el-message {
  margin-top: 20px;
}
</style>
