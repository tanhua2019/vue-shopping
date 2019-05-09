<template>
  <div class="personBox">
    <div class="personInfo">
      <div class="leftBox">
        <div class="headBox">
          <el-upload
            :headers="clientToken"
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
          <el-button type="primary">修改密码</el-button>
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
  </div>
</template>

<script>
import { mapState,mapMutations } from "vuex";
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
      }
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
    ...mapMutations(['setclientName']),
    //保存个人信息
    updateUserData() {
      updateUserData(this.userInfo).then(res => {
        this.$message({
          message: "修改成功",
          type: 'success'
        })
        this.setclientName(this.nickname);
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
  },
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
}
</style>
