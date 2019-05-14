<template>
  <div class="editGoods">
    <div class="editHead">
      <span>商品编辑</span>
    </div>
    <div class="content">
      <div class="inputBox">
        <span>商品名称：</span>
        <el-input placeholder="请输入商品名称" v-model="goodsName"></el-input>
      </div>
      <div class="inputBox">
        <span>选择类目：</span>
        <el-radio-group v-model="temTypeId">
            <el-radio
              :label="item.id"
              v-for="(item,index) in types"
              :key="index"
              border
            >{{item.name}}</el-radio>
          </el-radio-group>
      </div>
      <div class="inputBox">
        <span>图片地址：</span>
        <el-input placeholder="请输入图片地址" v-model="goodsImg"></el-input>
      </div>
      <div class="inputBox2">
        <span>规格详情：</span>
        <div class="box2">
        <ul>
          <li v-for="(item,index) in specList" :key="index">
            <span>名称：</span>
            <el-input placeholder="请输入规格名称" v-model="item.specName" disabled></el-input>
            <span>库存量：</span>
            <el-input type="text" v-model.number="item.stockNum"></el-input>
            <span>价格：</span>
            <el-input type="text" v-model.number="item.unitPrice"></el-input>
          </li>
        </ul>
        </div>
      </div>
      <div class="inputBox">
        <span>详情描述：</span>
        <el-input placeholder="请输入简单描述" v-model="desc"></el-input>
      </div>
      <div class="btnBox">
        <el-button class="confirmBtn"  @click="saveChange" type="primary">保存修改</el-button>
        <el-button class="normalBtn" @click="back" type="danger">返回</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {getTypes,getGoodsInfo,addGoods,updateGoods} from '../../api/admin';
export default {
  name: '',
  data () {
    return {
      id:this.$route.params.id,
      goodsName:'',
      types:[],
      temTypeId:'',
      goodsImg:'',
      desc:'',
      specList:[
        {
          specName:'默认',
          stockNum:0,
          unitPrice:0,
        }
      ]
    }
  },
  mounted(){
    this.getTypes();
    //新建商品
    if(this.id==='new'){
    }else{
      getGoodsInfo(this.id).then(res=>{
        console.log(res,'0999');
        this.temTypeId = res.goods.typeId;
        this.goodsName = res.goods.name;
        this.goodsImg = res.goods.img;
        this.desc = res.goods.desc;
        this.specList = res.specs;
      })
    }
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    getTypes(){
      getTypes().then(res=>{
        this.types = res;
      })
    },
    saveChange(){
      if(this.id==='new'){
        addGoods({
          name:this.goodsName,
          typeId:this.temTypeId,
          img:this.goodsImg,
          desc:this.desc,
          specList:this.specList
        }).then(()=>{
          this.$message({
            message: "创建商品成功！",
            type: "success",
            duration: 1000
        });
        })
      }else{
         updateGoods({
          id:this.id,
          name:this.goodsName,
          typeId:this.temTypeId,
          img:this.goodsImg,
          desc:this.desc,
          specList:this.specList
        }).then(()=>{
          this.$message({
            message: "修改成功！",
            type: "success",
            duration: 1000
        });
        })
      }
    },
  }
}

</script>
<style lang='less' scoped>
.editGoods {
  .editHead {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 50px;
  }
  .content {
    border: 2px solid #ccc;
    border-radius: 30px;
    padding: 30px;
    width: 90%;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    .inputBox {
      width: 100%;
      margin: 15px 0;
      .el-input {
        width: 200px;
      }
    }
    .inputBox2 {
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
      .box2 {
        display: flex;
        flex-wrap: nowrap;
        .el-input {
          width: 100px;
        }
      }
    }
    .btnBox {
      width: 100%;
      display: flex;
      justify-content: center;
      .el-button {
        margin: 20px;
        width: 160px;
      }
    }
  }
}
</style>
