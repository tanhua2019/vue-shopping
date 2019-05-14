<template>
  <div class="goodsBox">
    <div class="goodsHead">
      <span>用户管理</span>
      <div class="box">
        <el-button type="primary" @click="addType">添加分类</el-button>
        <el-select
          v-model="typeId"
          clearable
          filterable
          remote
          reserve-keyword
          placeholder="输入搜索分类"
          :remote-method="typeMethod"
          :loading="loading"
          @keyup.enter.native="searchConfirm"
        >
          <el-option
            v-for="item in typeList"
            :key="item.value"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
        <!-- <el-button type="primary" @click="searchConfirm">搜索</el-button> -->
        <el-button type="danger" @click="delType">删除分类</el-button>
      </div>
    </div>
    <div class="buttonBox">
      <el-button
        size="small"
        v-for="(item,index) in buttonTag"
        :key="index"
        :class="{active:index == isActive}"
        @click="changeTab(index)"
        v-waves
      >{{item}}</el-button>
    </div>
    <div class="content">
      <ul class="clear">
        <li v-for="item in goodsList" :key="'goods'+item.id">
          <img :src="item.img" alt>
          <span>{{item.name}}</span>
          <div>
            <el-button type="primary" @click="navTo('/backHome/goods/'+item.id)">编辑</el-button>
            <el-button type="danger" @click="deleteGoods(item.id)">删除</el-button>
          </div>
        </li>
        <li>
          <div class="addGoods" @click="navTo('/backHome/goods/new')">
            <div>+</div>点击增加商品
          </div>
        </li>
      </ul>
    </div>
    <el-dialog :visible.sync="typeShow" title="添加分类" class="dialogs" width="400px">
      <div class="box">
        <el-input placeholder="请输入分类名称" v-model="typeText"></el-input>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addConfirm">确 定</el-button>
        <el-button @click="typeShow = !typeShow">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import waves from "@/directive/waves";
import { getGoods, getTypes, addType, deleteType, deleteGoods } from "../../api/admin";
export default {
  name: "",
  directives: {
    waves
  },
  data() {
    return {
      Tag: [],
      buttonTag: [],
      isActive: 0,
      goodsList: [],
      typeShow: false,
      typeText: "",
      name: '哈哈哈',

      typeId: '',
      typeList: [],
      loading: false,
    };
  },
  mounted() {
    this.getTypes();
    // this.changeTab(0);  id报错bug
  },
  methods: {
    getTypes() {
      getTypes().then(res => {
        console.log(res, "99999");
        this.Tag = res;
        this.Tag.map(item => {
          this.buttonTag.push(item.name);
        });
        this.changeTab(0);
      });
    },
    changeTab(index) {
      this.isActive = index;
      getGoods(this.Tag[index].id).then(res => {
        console.log(this.goodsList);
        this.goodsList = res;
      });
    },
    navTo(route) {
      this.$router.push(route);
    },
    deleteGoods(id) {
      deleteGoods(id).then(() => {
        this.$message({
          message: "删除商品成功!",
          type: "success",
          duration: 1000
        });
        this.goodsList.map((item, index) => {
          if (item.id === id) {
            this.goodsList.splice(index, 1);
          }
        });
      });
    },
    addType() {
      this.typeShow = true;
      this.typeText = null;
    },
    delType() {
      console.log(this.typeId,'ddddddddd0');
      if (!this.typeId) {
        this.$message({
          message: "删除失败!",
          type: "success",
          duration: 1000
        });
        return false;
      } else {
      deleteType(this.typeId).then(res => {
        this.$message({
          message: "删除成功!",
          type: "success",
          duration: 1000
        });
        this.$router.go(0);
      })
      }
    },
    addConfirm() {
      // console.log(this.typeText,'9090');
      addType({
        name: this.typeText
      }).then(() => {
        this.$message({
          message: "添加成功!",
          type: "success",
          duration: 1000
        });
        this.getTypes();

        this.typeShow = !this.typeShow;
        this.$router.go(0);
      });
    },
    typeMethod() {
      this.loading = true;
      getTypes().then(res => {
        console.log(res, "99999");
        this.typeList = res;
        this.loading = false;
      });
    }
  }
};
</script>

<style lang='less' scoped>
.goodsBox {
  .goodsHead {
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 50px;
    .el-input {
      width: 200px;
    }
  }
  .buttonBox {
    width: 100%;
    padding: 0 5%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    .el-button {
      width: 200px;
      height: 40px;
    }
    .active {
      background: #339999;
      color: #fff;
    }
  }
  .content {
    position: relative;
    background-color: white;
    width: 90%;
    margin: 0 auto;
    top: -2px;
    ul {
      padding: 10px;
      li {
        float: left;
        display: inline-block;
        width: 200px;
        height: 300px;
        text-align: center;
        margin-right: 20px;
        &:hover {
          img {
            transform: scale(1.05);
          }
        }
        img {
          width: 100%;
          height: 200px;
          transition: transform 0.5s;
        }
        span {
          font-size: 13px;
          display: block;
          margin: 10px 0;
        }
        .addGoods {
          width: 100%;
          height: 200px;
          text-align: center;
          cursor: pointer;
          border: 1px solid #aaa;
          color: #aaa;
          div {
            margin: 50px auto 10px;
            border-radius: 50%;
            border: 2px solid #aaa;
            width: 40px;
            height: 40px;
            font-size: 30px;
            text-align: center;
            line-height: 30px;
          }
        }
        &:last-of-type {
          margin-right: 0;
        }
      }
    }
  }
}
</style>


<style lang="less">
.goodsBox {
  .el-dialog__header {
    background: #ccc;
    height: 60px;
  }
  .el-dialog__body {
    padding: 30px 20px;
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
