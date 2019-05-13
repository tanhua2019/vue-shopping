<template>
  <div class="editUser">
    <div class="userHead">
      <span>用户管理</span>
      <div class="inputBox">
        <el-select
          v-model="content"
          clearable
          filterable
          remote
          reserve-keyword
          placeholder="输入搜索用户"
          :remote-method="userMethod"
          :loading="loading"
          @keyup.enter.native="searchConfirm"
        >
          <el-option
            v-for="item in userList"
            :key="item.value"
            :label="item.email"
            :value="item.email"
          ></el-option>
        </el-select>
        <el-button type="primary" @click="searchConfirm">搜索</el-button>
      </div>
    </div>
    <div class="table">
      <el-table :data="users" stripe styel="width: 90%" border :header-cell-style="tableStyle">
        <el-table-column prop="id" label="用户ID" align="center"></el-table-column>
        <el-table-column prop="email" label="email" align="center"></el-table-column>
        <el-table-column prop="nickname" label="昵称" align="center"></el-table-column>
        <el-table-column prop="sex" label="性别" align="center"></el-table-column>
        <el-table-column prop="recipient" label="收件人" align="center"></el-table-column>
        <el-table-column prop="address" label="收货地址" align="center"></el-table-column>
        <el-table-column prop="phone" label="联系电话" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="deleteUser(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getAllUser, getSearchUser, deleteUser } from "../../api/admin";

export default {
  name: "",
  data() {
    return {
      //表头样式
      tableStyle: {
        background: "#f5f7fa",
        "font-weight": "800"
      },
      users: [],
      content: "",
      loading: false,
      userList: []
    };
  },
  mounted() {
    getAllUser().then(res => {
      this.users = res;
    });
  },
  methods: {
    userMethod(query) {
      if (query !== "") {
        this.loading = true;
        getSearchUser(query).then(res => {
          console.log(res, "0000");
          this.userList = res;
          this.loading = false;
        });
      } else {
        this.userList = [];
      }
    },
    searchConfirm() {
      this.content = this.content?this.content: '',
      console.log("dianji l", this.content);
      getSearchUser(this.content).then(data => {
        this.users = data;
      });
    },
    deleteUser(id) {
      deleteUser(id).then(() => {
        this.$message({
          message: "删除成功！",
          type: "success",
          duration: 1000
        });
        this.userList.map((item, index) => {
          if (item.id === id) {
            this.userList.splice(index, 1);
          }
        });
        this.getAllUser();
      });
    }
  }
};
</script>

<style lang='less' scoped>
.editUser {
  .userHead {
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 50px;
    .el-input {
      width: 200px;
    }
  }
  .table {
    width: 90%;
    margin: 0 auto;
  }
}
</style>
