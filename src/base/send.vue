<template>
  <div class="send" @click="hideSend">
    <div class="send-btn">
      <div class="icon" @click.stop="showPace">
        <i class="icon-10"></i>
      </div>
      <div class="icon two">
        <i class="icon-uniE91D"></i>
        <v-upload
          @errUpload="errUpload"
          @uploadImg="uploadImg"
        ></v-upload>
      </div>
      <div class="input">
        <input type="text" v-model='text' ref="vInput">
      </div>
      <div :class="['btn',sendClass?'show-btn':'hide-btn']" @click="send">
        <span>发送</span>
      </div>
    </div>
    <transition name="hide">
      <div class="send-slider" v-if="showFace">
        <template v-if="faceList.length">
          <slider :autoPlay="autoPlay">
            <div v-for="(key,index) in faceList" :key="index">
              <span v-for="(item,num) in key" :key="num" @click.stop="faceClick(item.text)">{{item.text}}</span>
            </div>
          </slider>
        </template>
      </div>
    </transition>
  </div>
</template>
<script>
import { face } from "../assets/js/util";
import Slider from "./slider.vue";
import VUpload from "./upload.vue";
export default {
  props: {
    showFace: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: ""
    }
  },
  components: {
    Slider,
    VUpload
  },
  computed: {
    sendClass() {
      if (this.text.trim()) {
        return true;
      } else {
        return false;
      }
    }
  },
  created() {
    this.autoPlay = false;
  },
  data() {
    return {
      faceList: face(),
      text: ''
    };
  },
  methods: {
    hideSend(){
      this.$emit("showPace", false);
    },
    InputBlur(){
      this.$refs.vInput.blur();
    },
    showPace() {
      this.$emit("showPace", !this.showFace);
    },
    send() {
      if (!this.sendClass) return;
      this.$emit("send", this.text);
      this.text = "";
    },
    faceClick(val) {
      this.text += val;
    },
    errUpload(val) {
      this.$message.info(val)
    },
    uploadImg(val) {
      let obj = {
        chatImg: val,
        text: ""
      };
      this.$emit("sendImg", obj);
    },
  }
};
</script>

<style lang="less" scoped>
@import "../assets/css/variable.less";
.send {
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  background: @btn-bg;
  z-index: 10;
  .send-btn {
    padding: 8px 10px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.2);
    .icon {
      width: 60/2px;
      flex: 0 0 60/2px;
      text-align: center;
      padding: 14/2px 2px;
      i {
        display: inline-block;
        vertical-align: middle;
        font-size: 46/2px;
        color: #999;
      }
    }
    .icon:first-child {
      i {
        font-size: 50/2px;
      }
    }
    .two {
      position: relative;
      width: 25px;
      height: 25px;
      border-radius: 50%;
      i {
        font-weight: bold;
      }
      input {
        position: absolute;
        left: 0;
        top: 0;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        opacity: 0;

      }
    }
    .input {
      flex: 1;
      border: 1px solid #eee;
      border-radius: 5px;
      overflow: hidden;
      margin-left: 5px;
      input{
        width: 100%;
        height: 24px;
        line-height: 24px;
        padding: 2px;
        word-wrap: break-word;
        font-size: 14px;
      }
    }
    .btn {
      width: 91/2px;
      height: 56/2px;
      text-align: center;
      line-height: 56/2px;
      border-radius: 5px;
      margin-left: 30/2px;
      span {
        display: inline-block;
        vertical-align: middle;
        color: #ffffff;
        font-size: 26/2px;
        letter-spacing: 2px;
      }
    }
    .show-btn {
      background: @bg-color;
    }
    .hide-btn {
      background: #cccccc;
    }
  }
}
</style>
