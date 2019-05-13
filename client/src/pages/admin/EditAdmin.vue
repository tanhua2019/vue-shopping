<template>
  <div class="eidtAdmin" :style="{height:height+'px'}">
    <div class="box">
      <el-row class="rows">
        <el-col :span="8" style="text-align: right;line-height: 40px; padding-right: 20px;">原密码：</el-col>
        <el-col :span="16">
          <el-input v-model="adminInfo.oldPwd" clearable placeholder="请输入原密码" type="password"></el-input>
        </el-col>
      </el-row>
      <el-row class="rows">
        <el-col :span="8" style="text-align: right;line-height: 40px; padding-right: 20px;">新密码：</el-col>
        <el-col :span="16">
          <el-input v-model="adminInfo.newPwd" clearable placeholder="请输入新密码" type="password"></el-input>
        </el-col>
      </el-row>
      <el-row class="rows">
        <el-col :span="8" style="text-align: right;line-height: 40px; padding-right: 20px;">确认新密码：</el-col>
        <el-col :span="16">
          <el-input v-model="adminInfo.confirmPwd" clearable placeholder="请再次输入新密码" type="password"></el-input>
        </el-col>
      </el-row>
      <el-button type="primary" @click="confirmChange">保 存</el-button>
    </div>
    <div class="buttonBox">

    </div>

  </div>
</template>

<script>
import { changePwd } from "../../api/admin";
import { mapState } from "vuex";

export default {
  name: "",
  computed: {
    ...mapState(["adminToken"]),
    height() {
      return this.getClientSize().height;
    }
  },
  data() {
    return {
      adminInfo: {
        adminToken: "",
        oldPwd: "",
        newPwd: "",
        confirmPwd: ""
      }
    };
  },
  methods: {
    getClientSize() {
      let h =
        document.documentElement.clientHeight || document.body.clientHeight;
      return {
        height: h - 70
      };
    },
    confirmChange() {
      this.adminInfo.adminToken = this.adminToken;
      console.log(this.adminInfo);
      changePwd(this.adminInfo).then(() => {
        this.adminInfo.oldPwd = "";
        this.adminInfo.newPwd = "";
        this.adminInfo.confirmPwd = "";
        this.$message({
          message: "修改密码成功！",
          type: "success",
          duration: 1000
        });
      });
    }
  }
};
</script>

<style lang='less' scoped>
.eidtAdmin {
  background: url(../../assets/img/client.jpg) no-repeat;
  background-size: 100% 100%;
  display: flex;
  // align-items: center;
  // justify-content: center;
  // flex-wrap: wrap;
  .box {
    margin: 50px 0 0 50px;
    height: 200px;
    width: 400px;
    .rows {
        margin: 20px;
        display: flex;
        .el-input {
          width: 200px;
          border-radius: 50px;
        }
      }
      .el-button {
        margin: 0 auto;
        margin-left: 50%;
      }
  }
}
</style>

<style lang="less">
.eidtAdmin {
    .el-input__inner {
      border-radius: 50px;
      padding-left: 20px;
    }
}
</style>
