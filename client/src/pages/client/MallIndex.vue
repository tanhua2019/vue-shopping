<template>
  <div class="MallIndex">
    <FadeSwiper class="swiperBox" :width="clientWidth" height="420px">
      <img
        class="banner"
        slot="item1"
        src="https://yanxuan.nosdn.127.net/3640fd6f350855cb06b25fd1e3d255bc.jpg?watermark&type=1&gravity=northwest&dx=0&dy=0&image=MGNiZTA1NWEyMjE2NmIwY2FjMjMyZWQ1N2I2MGRkNjUucG5n|imageView&quality=95&thumbnail=1920x420"
      >
      <img
        class="banner"
        slot="item2"
        src="https://yanxuan.nosdn.127.net/10ead2d36171237d054b69eaa9fa75ba.jpg?imageView&quality=95&thumbnail=1920x420"
      >
      <img
        class="banner"
        slot="item3"
        src="https://yanxuan.nosdn.127.net/46a19ee23ce144d21343601c7f90503d.jpg?watermark&type=1&gravity=northwest&dx=0&dy=0&image=MGNiZTA1NWEyMjE2NmIwY2FjMjMyZWQ1N2I2MGRkNjUucG5n|imageView&quality=95&thumbnail=1920x420"
      >
      <img
        class="banner"
        slot="item4"
        src="https://yanxuan.nosdn.127.net/59de6219f3b3e51176b5f0782be22c59.jpg?imageView&quality=95&thumbnail=1920x420"
      >
      <img
        class="banner"
        slot="item5"
        src="https://yanxuan.nosdn.127.net/7d0bd935105420274fcc73001ff3eda7.jpg?imageView&quality=95&thumbnail=1920x420"
      >
    </FadeSwiper>
    <section class="newGoods section">
      <SectionHeader title="新品首发" tips="周一周四上新，为你寻觅世间好物" moreText="更多新品>"/>
      <Slick
        :ulWidth="(266*goodsList.length)+(10*(goodsList.length-1))"
        :showWidth="(266*4)+(10*3)"
        :height="360"
      >
        <ul :style="{width:`${(266*goodsList.length)+(10*(goodsList.length-1))}px`}" slot="list">
          <GoodsItem
            :style="{marginRight: (index+1)%4 === 0? '0px':'10px'}"
            v-for="(item,index) in goodsList"
            :key="index"
            :id="item.id"
            :img="item.img"
            :name="item.name"
            :price="item.price"
          ></GoodsItem>
        </ul>
      </Slick>
    </section>
    <section class="maker section">
      <SectionHeader title="品牌制造商" tips="工厂直达消费者，剔除品牌溢价" moreText="更多制造商>"/>
      <div class="content">
        <ZoomImg
          imgSrc="http://yanxuan.nosdn.127.net/0266209ded1751f599fe0dc21bb33e02.jpg"
          class="left"
        >
          <div class="makerInfo" slot="otherEle">
            <p class="large">Adidas制造商</p>
            <hr>
            <p class="small">35元起</p>
          </div>
        </ZoomImg>
        <ZoomImg
          imgSrc="http://yanxuan.nosdn.127.net/7cd0c8ed77da498090fb67c288ef05be.jpg"
          class="center"
        >
          <div class="makerInfo" slot="otherEle">
            <p class="large">UGG制造商</p>
            <hr>
            <p class="small">129元起</p>
          </div>
        </ZoomImg>
        <div class="right">
          <ZoomImg imgSrc="http://yanxuan.nosdn.127.net/d824afe357e61fbee097412c5894c6ce.jpg">
            <div class="makerInfo" slot="otherEle">
              <p class="large">新秀丽制造商</p>
              <hr>
              <p class="small">49元起</p>
            </div>
          </ZoomImg>
          <ZoomImg imgSrc="http://yanxuan.nosdn.127.net/cf5f4a0d110ca17b9e0a80e6f7e6184b.jpg">
            <div class="makerInfo" slot="otherEle">
              <p class="large">MUJI制造商</p>
              <hr>
              <p class="small">12.9元起</p>
            </div>
          </ZoomImg>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { getTypes, getGoodsList } from "../../api/client";
import SectionHeader from "../../components/SectionHeader";
import ZoomImg from "../../components/ZoomImg";
import GoodsItem from "../../components/GoodsItem";
import Slick from "../../components/Slick";
import FadeSwiper from "../../components/FadeSwiper";

export default {
  name: "MallIndex",
  components: {
    SectionHeader,
    ZoomImg,
    GoodsItem,
    Slick,
    FadeSwiper
  },
  computed: {
    clientWidth() {
      return this.getClientSize().width - this.getScrollWidth() + "px";
    }
  },
  data() {
    return {
      typeList: [],
      goodsList: []
    };
  },
  mounted() {
    //获取数据
    getTypes().then(res => {
      res.unshift({
        id: -1,
        name: "首页"
      });
      this.typeList = res;
      this.getGoodsList(-1);
    });
  },
  methods: {
    getClientSize() {
      let w = document.documentElement.clientWidth || document.body.clientWidth;
      return {
        width: w
      };
    },
    //获取滚动条宽度
    getScrollWidth() {
      let noScroll,
        scroll,
        oDiv = document.createElement("DIV");
      oDiv.style.cssText =
        "position:absolute; top:-1000px; width:100px; height:100px; overflow:hidden;";
      noScroll = document.body.appendChild(oDiv).clientWidth;
      oDiv.style.overflowY = "scroll";
      scroll = oDiv.clientWidth;
      document.body.removeChild(oDiv);
      return noScroll - scroll;
    },
    filterGoodsByType(typeid) {
      return this.goodsList.filter(item => {
        return item.typeId === typeid;
      });
    },
    navTo(route) {
      this.$router.push(route);
    },
    selectType(typeId) {
      if (typeId == -1) return;
      this.navTo("/mall/show/goodsList/" + typeId + "/all");
    },
    getGoodsList(typeId) {
      getGoodsList(typeId).then(res => {
        this.goodsList = res;
        console.log("eeeeeeeee");
        console.log(this.goodsList);
      });
    }
  }
};
</script>

<style scoped lang="less">
.MallIndex {
  width: 100%;
  .swiperBox {
    position: absolute;
    left: 0;
    top: 230px;
    margin-top: 20px;
    display: block;
    box-shadow: 0 -1px 2px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    .banner {
      transform: scale(1.2, 1);
    }
  }
  .section {
    padding: 30px;
    overflow: hidden;
    .Slick {
      position: relative;
      left: -30px;
    }
  }
  .newGoods {
    margin-top: 440px;
  }
  .flashSale {
    .content {
      border: 1px solid #e6e8eb;
      height: 376px;
      position: relative;
      .left {
        vertical-align: top;
        display: inline-block;
        width: 20%;
        height: 100%;
        position: relative;
        background-image: url(//yanxuan.nosdn.127.net/c9aeb62a3f79123d793d8c49b6698b09.jpg);
        background-repeat: no-repeat;
        background-size: 100%;
        text-align: center;
        color: #615548;
        cursor: pointer;
        .title {
          font-size: 26px;
          font-weight: 500;
          margin-top: 60px;
        }
        hr {
          width: 20px;
          height: 2px;
          background-color: #615548;
          border: none;
          margin-top: 20px;
        }
        .tips {
          font-size: 18px;
          margin-top: 20px;
        }
        .countBox {
          margin-top: 20px;
          .time {
            width: 42px;
            height: 42px;
            line-height: 42px;
            font-size: 19px;
            display: inline-block;
            color: white;
            background-color: #615548;
          }
        }
        .allBtn {
          width: 110px;
          height: 33px;
          line-height: 33px;
          font-size: 13px;
          background-color: #a7936e;
          color: white;
          border-radius: 20px;
          margin: 50px auto;
        }
      }
      .right {
        vertical-align: top;
        display: inline-block;
        width: 80%;
        height: 100%;
        position: relative;
        overflow: hidden;
        li {
          display: inline-block;
          width: 50%;
          height: 50%;
          overflow: hidden;
          .leftImg {
            width: 180px;
            height: 100%;
            display: inline-block;
          }
          .rightBox {
            display: inline-block;
            width: 240px;
            height: 100%;
            overflow: hidden;
            .goodsName {
              font-size: 15px;
              cursor: pointer;
              margin-top: 16px;
              &:hover {
                color: #b4a078;
              }
            }
            .less {
              margin-top: 16px;
              .lessBar {
                display: inline-block;
                width: 150px;
                height: 10px;
                background-color: #ffe5e5;
                border: 1px solid #f2cecd;
                border-radius: 10px;
              }
              .lessNum {
                color: #7d7d7d;
                font-size: 13px;
              }
            }
            .price {
              margin-top: 16px;
              .nowPrice {
                color: #be4141;
                font-size: 20px;
              }
              .beforePrice {
                color: #7d7d7d;
                text-decoration: line-through;
                margin-left: 10px;
                font-size: 14px;
              }
            }
            .buyBtn {
              margin-top: 16px;
              width: 120px;
              height: 30px;
              color: white;
              background-color: #be4141;
              text-align: center;
              line-height: 30px;
              cursor: pointer;
            }
          }
          &:nth-of-type(1) {
            border-bottom: 1px solid #e6e8eb;
            border-right: 1px solid #e6e8eb;
          }
          &:nth-of-type(2) {
            border-bottom: 1px solid #e6e8eb;
          }
          &:nth-of-type(3) {
            border-right: 1px solid #e6e8eb;
          }
        }
      }
    }
  }
  .maker {
    .content {
      .left,
      .center,
      .right {
        display: inline-block;
        height: 320px;
        width: 32%;
      }
      .left,
      .center {
        margin-right: 7px;
        .makerInfo {
          p {
            text-align: center;
          }
          hr {
            width: 60px;
          }
          .large {
            margin-top: 50px;
            margin-bottom: 10px;
            font-size: 26px;
          }
          .small {
            margin-top: 10px;
            font-size: 14px;
          }
        }
      }
      .right {
        .ZoomImg {
          width: 100%;
          height: 49%;
          .makerInfo {
            p {
              text-align: left;
              margin-left: 30px;
            }
            hr {
              width: 60px;
              position: relative;
              left: -122px;
            }
            .large {
              margin-top: 30px;
              margin-bottom: 10px;
              font-size: 20px;
            }
            .small {
              margin-top: 10px;
              font-size: 12px;
            }
          }
          &:first-child {
            margin-bottom: 7px;
          }
        }
      }
    }
  }
  .hotGoods {
    background-color: rgb(244, 240, 234);
    height: 654px;
    .left {
      width: 394px;
      display: inline-block;
      vertical-align: top;
      .GoodsItem {
        width: 100%;
        height: 532px;
        background-color: white;
      }
      .GoodsItem /deep/ .imgBox {
        height: 380px;
      }
      .GoodsItem /deep/ .goodsInfo {
        height: auto;
      }
      .GoodsItem /deep/ .goodsName {
        font-size: 30px;
        line-height: 60px;
      }
    }
    .right {
      display: inline-block;
      vertical-align: top;
      width: 740px;
      height: 100%;
      .GoodsItem {
        width: 230px;
        height: 260px;
        background-color: white;
        margin-left: 10px;
        overflow: hidden;
      }
      .GoodsItem /deep/ .imgBox {
        height: 180px;
      }
    }
  }
}
</style>
