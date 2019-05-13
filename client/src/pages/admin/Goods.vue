<template>
  <div class="goodsBox">
    <div class="goodsHead">
      <span>用户管理</span>
      <el-button type="primary">添加分类</el-button>
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
  				<img :src="item.img" alt="" />
  				<span>{{item.name}}</span>
  				<div>
  					<button class="normalBtn" @click="navTo('/backHome/goods/'+item.id)">编辑</button>
  					<button @click="deleteGoods(item.id)" class="deleteBtn">删除</button>
  				</div>
  			</li>
  			<li>
  				<div class="addGoods" @click="navTo('/backHome/goods/new')">
  					<div>+</div>
  					点击增加商品
  				</div>
  			</li>
  		</ul>
  	</div>
  </div>
</template>

<script>
import waves from "@/directive/waves";
import { getGoods, getTypes, addType, deleteGoods } from "../../api/admin";
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
      goodsList: []
    };
  },
  mounted() {
    this.getTypes();
    this.changeTab(0);
  },
  methods: {
    getTypes() {
      getTypes().then(res => {
        console.log(res);
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
      width: 160px;
      height: 40px;
    }
    .active {
      background: #339999;
      color: #fff;
    }
  }
  .content{
		position: relative;
		background-color: white;
		width: 100%;
		top: -2px;
		ul{
			padding: 10px;
			li{
				float: left;
				display: inline-block;
				width: 200px;
				height: 300px;
				text-align: center;
				margin-right: 20px;
				img{
					width: 100%;
					height: 200px;
					border: 1px solid red;
				}
				span{
					font-size: 13px;
					display: block;
					margin: 10px 0;
					color:red;
				}
				.normalBtn{
					width: 50px;
					height: 25px;
					color:red;
					border: 1px solid red;
					background-color: white;
					border-radius: 5px;
					margin-right: 5px;
				}
				.deleteBtn{
					width: 50px;
					height: 25px;
					color:red;
					border: 1px solid red;
					background-color: white;
					border-radius: 5px;
				}
				.addGoods{
					width: 100%;
					height: 200px;
					text-align: center;
					cursor: pointer;
					border: 1px solid red;
					color:red;
					div{
						margin: 50px auto 10px;
						border-radius: 50%;
						border:2px solid red;
						width: 40px;
						height: 40px;
						font-size: 30px;
						text-align: center;
						line-height: 30px;
					}
				}
        &:last-of-type{
          margin-right: 0;
        }
			}
		}
	}
}
</style>
