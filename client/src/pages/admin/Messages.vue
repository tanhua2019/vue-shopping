<template>
  <div class="messageBox">
    <div class="messageHead">
      <span>留言管理</span>
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
      <ul v-if="isActive===0" class="ulBox">
        <li v-for="(item,index) in noReplyMsgList" :key="index" class="liBox">
          <div class="left">
            <img :src="item.user.headimg" alt>
            <div class="leftgood">
              <p>{{item.user.name}}</p>
              <p>商品：{{item.goods.name}}</p>
              <p>{{item.content}}</p>
            </div>
          </div>
          <div class="rightBox">
            <span>{{item.time}}</span>
            <el-button type="primary" @click="reply(item.id)">回复</el-button>
          </div>
        </li>
      </ul>
      <ul v-if="isActive===1" class="ulBox">
        <li v-for="(item,index) in repliedMsgList" :key="index" class="liBox">
          <div class="left">
            <img :src="item.user.headimg" alt>
            <div class="leftgood">
              <p>{{item.user.name}}</p>
              <p>商品：{{item.goods.name}}</p>
              <p>{{item.content}}</p>
              <p>{{'回复内容：'+item.replyContent}}</p>
            </div>
          </div>
          <div class="rightBox">
            <span>{{item.time}}</span>
            <el-button disabled type="success">已回复</el-button>
          </div>
        </li>
      </ul>
    </div>
    <el-dialog :visible.sync="isShow" title="请回复留言内容" class="dialogs" width="450px">
      <div class="box">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="请输入回复内容："
          v-model="text"
        ></el-input>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="replyConfirm">确 定</el-button>
        <el-button @click="isShow = !isShow">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import waves from "@/directive/waves";
import { getNoReplyMsg, getRepliedMsg, reply } from "../../api/admin";
export default {
  name: "",
  directives: {
    waves
  },
  data() {
    return {
      buttonTag: ["未回复", "已回复"],
      isActive: 0,
      noReplyMsgList: [],
      repliedMsgList: [],
      isShow: false,
      curMsgId: '',
      text: ''
    };
  },
  mounted() {
    this.getNoReplyMsg();
  },
  methods: {
    changeTab(index) {
      this.isActive = index;
      if (index === 1) {
        this.getRepliedMsg();
      } else {
        this.getNoReplyMsg();
      }
    },
    getNoReplyMsg() {
      getNoReplyMsg().then(res => {
        console.log(res, "000");
        this.noReplyMsgList = res;
      });
    },
    getRepliedMsg() {
      getRepliedMsg().then(res => {
        this.repliedMsgList = res;
      });
    },
    reply(id) {
      this.isShow = true;
      this.curMsgId = id;
    },
    replyConfirm(){
  		reply({
  			id:this.curMsgId,
  			content: this.text
  		}).then(()=>{
        this.$message({
            message: "回复成功!",
            type: "success",
            duration: 1000
        });
  			this.noReplyMsgList.map((item,index)=>{
  				if(item.id===this.curMsgId){
  					this.noReplyMsgList.splice(index,1);
  				}
        });
        this.text = '',
  			this.isShow = !this.isShow;
  		})
  	},
  }
};
</script>

<style lang='less' scoped>
.messageBox {
  .messageHead {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 50px;
  }
  .buttonBox {
    width: 100%;
    padding: 0 5%;
    height: 50px;
    display: flex;
    align-items: center;
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
    .ulBox {
      .liBox {
        width: 90%;
        margin: 20px auto;
        height: 120px;
        background: #ccc;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left {
          display: flex;
          flex-wrap: wrap;
          img {
            margin: 0 10px;
            width: 80px;
            height: 80px;
          }
          .leftgood {
            p {
              margin: 6px;
            }
          }
        }
        .rightBox {
          padding-right: 20px;
          display: flex;
          flex-direction: column;
          .el-button {
            margin-top: 20px;
          }
          span {
          }
        }
      }
    }
  }
}
</style>


<style lang="less">
.messageBox {
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
