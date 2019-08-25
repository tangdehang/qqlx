<template>
  <div class="message" :class="type" v-show="show">
    <p>{{text}}</p>
  </div>
</template>

<script>
  export default {
    name: 'message',
    props: {
      type: {
        type: String,
        default: 'info',
        validator: val => ['info',  'error'].includes(val)
//['info', 'success', 'warning', 'error'] 表示type只接收这四个字符串作为参数传入message组件
      },
      text: {
        type: String,
        default: ''
      },
      show: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style lang="less" scoped>
  .message{
    position: fixed;
    left:50%;
    top:500px;
    padding:20/2px 18/2px;
    transform: translateX(-50%);
    -webkit-border-radius:;
    -moz-border-radius:;
    border-radius:10px;
    z-index: 200;
    background: rgba(0,0,0,0.8);
    &.error{
      p{
        color: red;
      }
    }
    &.info{

    }
    p{
      color: #ffffff;
      font-size:28/2px;
    }
  }
</style>
