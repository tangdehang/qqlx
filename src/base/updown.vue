<template>
  <div>
    <transition name="updown">
      <div class="updown" v-if="updown">
        <div class="li">
          <v-upload 
          @uploadImg="uploadImg" 
          @hideUpload="hideUpload" 
          @errUpload="errUpload"
          @sendBefor="sendBefor"
          @sendAfter="sendAfter"
          :maxWidth="maxWidth"
          :maxHeight="maxHeight"
          ></v-upload>
          <span>从相册中选取</span>
        </div>
        <div class="li" @click="showPhoto">从本地相册中选取</div>
        <div @click="hideUpdown" class="cancel li">取消</div>
      </div>
    </transition>
    <div v-if="updown" @click="hideUpdown" class="messbg"></div>
  </div>
</template>
<script>
import VUpload from './upload.vue';
  export default{
    props: {
      updown: {
        type: Boolean,
        default: false
      }
    },
    components:{
        VUpload
    },
    data(){
      return{
        maxWidth:300,
        maxHeight:300
      }
    },
    methods: {
      hideUpdown(){
        this.$emit('hideUpdown')
      },
      showPhoto(){
        this.hideUpdown()
        this.$emit('showPhoto')
      },
      hideUpload(){
        this.hideUpdown()
      },
      uploadImg(val){
        this.$emit('uploadImg',val)
        this.hideUpdown()
      },
      errUpload(val){
        this.$emit('errUpload',val)
        this.hideUpdown()
      },
      sendBefor(){
        this.$emit('sendBefor')
      },
      sendAfter(){
        this.$emit('sendAfter')
      }
    }
  }
</script>
<style lang="less" scoped>
  @import "../assets/css/variable.less";

  .updown-enter-active, .updown-leave-active {
    transition: all 0.3s ease-in-out;
  }

  .updown-enter, .updown-leave-to {
    transform: translateY(100%);
  }

  .updown {
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 0;
    z-index: 20;
    .li {
      width: 100%;
      height: 82/2px;
      background: #ffffff;
      text-align: center;
      line-height: 82/2px;
      font-size: 16px;
      color: #333;
      border-bottom: 1px solid #cccccc;
      position: relative;
      input {
        width: 100%;
        height: 100%;
        vertical-align: top;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1;
        opacity: 0;
      }
      span {
        width: 100%;
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        text-align: center;
      }
    }
    .cancel {
      border: none;
      border-top: 4px solid #cccccc;
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
