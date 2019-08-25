<template>
  <ul class="personlist">
    <li>
      <div class="photo">
        <img :src="item.photo" alt="">
      </div>
      <div class="text" @click="roomClick(item.url)">
        <h1>{{item.title}}</h1>
        <p>{{item.subTitle}}</p>
      </div>
    </li>
  </ul>
</template>
<script>
  export default{
    props:{
      item:{
        type:Object,
        default() {
          return {};
        }
      }
    },
      methods:{
        roomClick(url){
          this.$emit('roomClick',url)
        }
      }
  }
</script>
<style lang="less" scoped>
  @import "../assets/css/mixin.less";
  @import "../assets/css/variable.less";
  .personlist {
    width: 100%;
    height: 166/2px;
    li {
      display: flex;
      height: 166/2px;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;
      .photo {
        width: 104/2px;
        height: 104/2px;
        flex: 0 0 104/2px;
        -webkit-border-radius:;
        -moz-border-radius:;
        border-radius: 50%;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
          display: inline-block;
          vertical-align: top;
        }
      }
      .text {
        flex: 1;
        margin-left: 41/2px;
        height: 78/2px;
        width: 100%;
        overflow: hidden;
        h1 {
          font-size: 31/2px;
          color: #333;
          font-weight: bold;
          .no-wrap();
        }
        p {
          font-size: 26/2px;
          color: #666;
          padding-top: 23/2px;
          .no-wrap();
        }
      }
    }
  }
</style>
