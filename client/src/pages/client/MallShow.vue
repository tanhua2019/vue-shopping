<template>
  <div class="MallShow">
    <FixedNav v-show="navShouldFixed">
      <div slot="navContent" class="container fixedNavContainer">
        <h3 class="fixedLeft" @click="navTo('/mall/show/index')">严选商城</h3>
        <ul class="fixedRight">
          <li
            v-for="item in typeList"
            :key="'type'+item.id"
            :class="{selected:judgeCurPath(item.id)}"
            @click="selectType(item.id)"
          >{{item.name}}</li>
        </ul>
      </div>
    </FixedNav>
    <div class="logo">
      <img src="http://yanxuan.nosdn.127.net/606d02b8d3f40a7496cad463e79f128a.gif">
      <div class="searchBox">
        <div class="inputBox">
          <el-col :span="12">
            <el-autocomplete
              clearable
              prefix-icon="el-icon-search"
              class="inline-input"
              v-model="searchText"
              :fetch-suggestions="querySearch"
              placeholder="请输入商品关键字"
              :trigger-on-focus="false"
              @keyup.enter.native="searchConfirm"
            ></el-autocomplete>
          </el-col>
        </div>
        <div class="buttonBox" @click="searchConfirm">
          <p>搜索</p>
        </div>
      </div>
    </div>
    <ul ref="typeList" class="typeList">
      <li
        v-for="(item,index) in typeList"
        :key="index"
        :class="{selected:judgeCurPath(item.id)}"
        @click="selectType(item.id)"
      >{{item.name}}</li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
import { getTypes, getGoodsList } from "../../api/client";
import FixedNav from "../../components/FixedNav";

export default {
  name: "MallShow",
  components: {
    // TipsInput,
    FixedNav
  },
  computed: {
    curPath() {
      return this.$route.path;
    }
  },
  data() {
    return {
      typeList: [],
      searchText: "",
      navShouldFixed: false,
      searchList: [
        {value: "男式经典基础西装套"},
        {value: "竹语初棉撞色四件套"},
        {value: "全棉针织条纹四件套"},
        {value: "男式三防商务休闲裤"},
      ],
    };
  },

  methods: {
    getGoodsList(typeId){
      const res = getGoodsList(typeId);
      res.then((data)=>{
        console.log('9999');
        this.searchList = data;
        console.log(this.searchList);
      })
      .catch((e)=>{
        alert(e);
      })
    },
    navTo(route) {
      this.$router.push(route);
    },
    judgeCurPath(typeId) {
      if (typeId === -1) {
        if (this.curPath.indexOf("/show/index") > -1) {
          return true;
        } else {
          return false;
        }
      } else {
        if (this.curPath.indexOf(`/show/goodsList/${typeId}`) > -1) {
          return true;
        } else {
          return false;
        }
      }
    },
    selectType(typeId) {
      //首页
      if (typeId === -1) {
        this.navTo("/mall/show/index");
      } else {
        this.navTo("/mall/show/goodsList/" + typeId + "/all");
      }
    },
    searchTip(tip) {
      // alert(tip)
      this.searchText = tip;
      console.log();
    },
    searchTextChange(text) {
      this.searchText;
    },
    searchConfirm() {
      if (this.searchText.trim().length <= 0) {
        alert("输入不能为空！");
        return;
      }
      this.navTo(`/mall/show/goodsList/0/${this.searchText}`);
    },
    scrollHandle() {
      const top = this.$refs.typeList.getBoundingClientRect().top;
      //还未到顶
      if (top > 0) {
        this.navShouldFixed = false;
      }
      //已经到顶
      else {
        this.navShouldFixed = true;
      }
    },
    querySearch(queryString, cb) {

      var searchList = this.searchList;
      console.log(this.searchList,'009');
      var results = queryString
        ? searchList.filter(this.createFilter(queryString))
        : searchList;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return a => {
        return (
          a.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    }
  },

  mounted() {
    // this.getGoodsList(-1);
    //获取数据
    const res = getTypes();
    res
      .then(data => {
        data.unshift({
          id: -1,
          name: "首页"
        });
        this.typeList = data;
        console.log(this.typeList);
      })
      .catch(e => {
        alert(e);
      });

    //监听滚动事件
    document.addEventListener("scroll", this.scrollHandle, false);
  },

  destroyed() {
    document.removeEventListener("scroll", this.scrollHandle, false);
  },
  watch: {
    searchText(newVal, oldVal) {
      this.searchTextChange(newVal);
    }
  }
};
</script>

<style scoped lang="less">
@import "../../assets/css/var.less";
.MallShow {
  width: 100%;
  .logo {
    height: 150px;
    display: flex;
    align-items: center;
    .searchBox {
      display: flex;
      align-items: center;
      .buttonBox {
        width: 100px;
        height: 50px;
        background: #b4a078;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 0 50px 50px 0;
        cursor: pointer;
        p {
          font-size: 18px;
          color: #fff;
        }
      }
      display: flex;
    }
  }
  // .logo {
  //   display: block;
  //
  //   text-align: right;
  //   user-select: none;
  //   vertical-align: middle;
  //   img {
  //     display: inline-block;
  //     width: 33.3%;
  //     vertical-align: middle;
  //   }
  //   .searchBox {
  //     display: inline-block;
  //     width: 33.3%;
  //     vertical-align: middle;
  //     text-align: left;
  //     .TipsInput {
  //       margin-left: 30px;
  //     }
  //     .icon-search {
  //       font-size: 24px;
  //       font-weight: bold;
  //       color: @thirdColor;
  //       cursor: pointer;
  //       position: relative;
  //       top: 4px;
  //     }
  //   }
  // }
  .typeList {
    width: 100%;
    text-align: center;
    background-color: white;
    li {
      display: inline-block;
      width: 60px;
      margin: 0 50px;
      text-align: center;
      height: 30px;
      line-height: 20px;
      font-weight: 600;
      font-size: 14px;
      cursor: pointer;
    }
    .selected {
      color: @thirdColor;
      border-bottom: 3px solid @thirdColor;
    }
  }
  .fixedNavContainer {
    text-align: left;
    .fixedLeft {
      display: inline-block;
      vertical-align: middle;
      width: 15%;
      height: 100%;
      font-size: 30px;
      color: @thirdColor;
      user-select: none;
      line-height: 64px;
      text-align: center;
      cursor: pointer;
    }
    .fixedRight {
      width: 70%;
      height: 100%;
      display: inline-block;
      vertical-align: middle;
      li {
        display: inline-block;
        width: 60px;
        margin: 0 30px;
        text-align: center;
        height: 30px;
        line-height: 20px;
        font-weight: 600;
        font-size: 14px;
        cursor: pointer;
        position: relative;
        top: 4px;
      }
      .selected {
        color: @thirdColor;
        border-bottom: 3px solid @thirdColor;
      }
    }
  }
}
</style>

<style>
.el-input__inner {
  border: 2px solid #b4a078;
  padding-left: 4px;
  width: 500px;
  height: 50px;
  border-radius: 50px 0 0 50px;
}
.el-input__inner:hover {
  border-color: #b4a078;
}
.el-input.is-active .el-input__inner,
.el-input__inner:focus {
  border-color: #b4a078;
}
</style>
