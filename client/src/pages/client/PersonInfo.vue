<template>
  <div class="personBox">
    <div class="personInfo">
      <div class="leftBox">
        <div class="headBox">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="userInfo.headimg" :src="userInfo.headimg" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <el-input disabled v-model="userInfo.email"></el-input>
        <div class="buttonBox">
          <el-button type="primary" @click="showDialog">修改密码</el-button>
          <el-button type="success" @click="updateUserData">确认保存</el-button>
        </div>
      </div>
      <div class="rightBox">
        <div class="inputBox">
          <span>账号：</span>
          <el-input clearable placeholder="请输入账号" v-model="userInfo.nickname"></el-input>
        </div>
        <div class="inputBox">
          <span>收件人：</span>
          <el-input clearable placeholder="请输入收件人" v-model="userInfo.recipient"></el-input>
        </div>
        <div class="inputBox">
          <span>收件地址：</span>
          <el-input clearable placeholder="请输入收货地址" v-model="userInfo.address"></el-input>
        </div>
        <div class="inputBox">
          <span>联系电话：</span>
          <el-input clearable placeholder="请输入联系电话" v-model="userInfo.phone"></el-input>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="isShow" title="修改密码" class="dialogs" width="450px">
      <div class="box">
        <el-row :gutter="10" class="rows">
          <el-col :span="6" style="text-align: center;line-height: 40px">原密码：</el-col>
          <el-col :span="18">
            <el-input v-model="passowrd.oldPwd" clearable placeholder="请输入原密码" type="password"></el-input>
          </el-col>
        </el-row>
        <el-row :gutter="10" class="rows">
          <el-col :span="6" style="text-align: center;line-height: 40px">新密码：</el-col>
          <el-col :span="18">
            <el-input v-model="passowrd.newPwd" clearable placeholder="请输入新密码" type="password"></el-input>
          </el-col>
        </el-row>
        <el-row :gutter="10" class="rows">
          <el-col :span="6" style="text-align: center;line-height: 40px">确认新密码：</el-col>
          <el-col :span="18">
            <el-input v-model="passowrd.confirmPwd" clearable placeholder="请再次输入新密码" type="password"></el-input>
          </el-col>
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="updatePwd">保 存</el-button>
        <el-button @click="closeDialog()">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { getUserData, updateUserData, updatePwd } from "../../api/client";
export default {
  name: "",
  data() {
    return {
      userInfo: {
        address: "",
        email: "",
        headimg: "",
        id: "",
        nickname: "",
        phone: "",
        recipient: ""
      },
      passowrd: {
        oldPwd: "",
        newPwd: "",
        confirmPwd: ""
      },
      isShow: false,
      id: ""
    };
  },
  computed: {
    ...mapState(["clientToken"])
  },
  mounted() {
    getUserData(this.clientToken).then(res => {
      this.userInfo = res;
      console.log(this.userInfo, "9090");
    });
  },
  methods: {
    ...mapMutations(["setclientName"]),
    //保存个人信息
    updateUserData() {
      updateUserData(this.userInfo).then(res => {
        this.$message({
          message: "修改成功",
          type: "success",
          duration: 1000
        });
        this.setclientName(this.userInfo.nickname);
      });
    },
    showDialog() {
      this.isShow = true;
    },
    closeDialog() {
      this.isShow = false;
    },
    updatePwd() {
      if (this.passowrd.newPwd !== this.passowrd.confirmPwd) {
        this.$message.error('两次输入的密码不一致！');
        return;
      }
      updatePwd({
        id: this.userInfo.id,
        oldPwd: this.passowrd.oldPwd,
        newPwd: this.passowrd.newPwd,
        confirmPwd: this.passowrd.confirmPwd
      })
        .then(() => {
          this.passowrd.oldPwd = "";
          this.passowrd.newPwd = "";
          this.passowrd.confirmPwd = "";
          this.closeDialog();
          this.$message({
            message: "修改密码成功!",
            type: "success",
            duration: 1000
          });
        }).catch(err => {
          this.$message.error(`原有${err}`);
        })
    },
    handleAvatarSuccess(res, file) {
      this.userInfo.headimg = URL.createObjectURL(file.raw);
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
  background: #f5f5eb;
  border: 2px solid #ccc;
  padding: 40px;
  .personInfo {
    display: flex;
    .leftBox {
      display: flex;
      flex-wrap: wrap;
      flex: 1;
      justify-content: center;
      align-items: center;
      .el-input {
        width: 250px;
        margin-bottom: 20px;
      }
      .headBox {
        img {
          display: block;
          border-radius: 50%;
          width: 120px;
          height: 120px;
          margin: 0 50px 20px;
          cursor: pointer;
        }
      }
    }
    .rightBox {
      display: flex;
      flex: 1;
      flex-wrap: wrap;
      .inputBox {
        display: flex;
        margin: 10px;
        span {
          display: flex;
          justify-content: center;
          align-items: center;
          // text-align: right;
          width: 150px;
        }
      }
    }
  }
  .dialogs {
    .box {
      height: 150px;
      width: 90%;
      margin: 20px auto;
      padding-left: 30px;
      .rows {
        margin: 20px;
        display: flex;
        // justify-content: center;
        .el-input {
          width: 200px;
        }
      }
    }
  }
}
</style>

<style lang="less">
.personBox {
  .el-dialog__header {
    background: #ccc;
    height: 60px;
    font-weight: 800;
  }
  .el-dialog__body {
    padding: 0;
  }
  .el-dialog__footer {
    display: flex;
    justify-content: center;
    .el-button {
      width: 120px;
    }
  }
}
</style>
