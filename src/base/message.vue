<template>
  <div>
    <div class="messageBase" v-if="showMessage">
      <div class="head">
        <h1>提示</h1>
        <p>{{content}}</p>
      </div>
      <div class="foot">
        <button type="button" class="cancel" @click="cancelClick">{{cencelText}}</button>
        <button type="button" class="confirm" @click="confirmClick">{{confirmText}}</button>
      </div>
    </div>
    <div v-if="showMessage" @click="cancelClick" class="messbg" @touchmove.stop></div>
  </div>
</template>
<script>
  export default{
    props: {
      cencelText: {
        type: String,
        default: '取消'
      },
      confirmText: {
        type: String,
        default: '确认'
      },
      showMessage: {
        type: Boolean,
        default: false
      },
      content:{
        type:String,
        default:'确认退出登录吗？'
      }
    },
    methods: {
      cancelClick(){
        this.$emit('cancel')
      },
      confirmClick(){
        this.$emit('confirm')
      }
    }
  }
</script>
<style lang="less" scoped>
  @import "../assets/css/variable.less";

  .messageBase {
    position: fixed;
    width: 85%;
    bottom:265px;
    left: 50%;
    transform: translate(-50%, 0);
    z-index: 20;
    background: #ffffff;
    border-radius: 5px;
    overflow: hidden;
    text-align: center;
    .head {
      border-bottom: 1px solid #ddd;
      h1 {
        padding: 15px 0 0;
        color: #111;
      }
      p {
        padding: 10px 20px 15px;
        height: 36px;
        line-height: 36px;
        color: #333;
      }
    }
    .foot {
      display: flex;
      height: 40px;
      line-height: 40px;

      button {
        line-height: 35px;
        display: block;
        background-color: #fff;
        flex: 1;
        margin: 0;
        border: 0;
        font-size: 16px;
      }
      .cancel {
        width: 50%;
        border-right: 1px solid #ddd;
      }
      .confirm {
        color: @text-color;
        width: 50%;
      }
    }
  }

  .messbg {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 19;
  }
</style>
