<template>
  <div class="ErrorPage" :style="{width:width+'px',height:height+'px'}">
    <img src="../assets/img/404.gif" alt="">
  </div>
</template>

<script>
import {getClientSize} from '../util/util';
export default {
  name: 'ErrorPage',
  computed:{
    width(){
      return getClientSize().width;
    },
    height(){
      return getClientSize().height;
    },
  }
}
</script>

<style scoped lang="less">
@import "../assets/css/var.less";
.ErrorPage{
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>