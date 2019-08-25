<template>
  <div class="head">
    <div class="icon">
      <i class="icon-tuodong"></i>
    </div>
    <span>{{title}}</span>
    <div class="icon right">
      <i>···</i>
    </div>
  </div>
</template>
<script>
  export default{
    props: {
      title: {
        type: String,
        default: '注册'
      }
    }
  }
</script>
<style lang="less" scoped>
  @import "../assets/css/variable.less";

  .head {
    height: 100/2px;
    background: #fff;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #eeeeee;
    .icon {
      width: 102/2px;
      height: 100%;
      flex: 0 0 102/2px;
      text-align: center;
      line-height: 100/2px;
      i {
        vertical-align: middle;
        display: inline-block;
        font-size: 16px;
        color: #111;
      }
    }

    span {
      flex: 1;
      display: inline-block;
      font-size: 16px;
      text-align: center;
      color: #111;
      letter-spacing: 2px;
    }
    .right{
      i{
        font-weight: bold;
        font-size: 20px;
      }
    }
  }
</style>
