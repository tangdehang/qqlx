<template>
  <transition name="slide">
    <div>
      <div
        class="room"
        @touchstart="touchstart"
        @touchmove="touchmove"
        @touchend="touchend"
        ref="slide"
      >
        <div class="head">
        <span class="icon">
          <i class="icon-tuodong"></i>
        </span>
          <span>聊天群</span>
          <div class="icon">
            <i class="icon---"></i>
          </div>
        </div>
        <div v-if="roomGropItem.length">
          <Scroll
            class="content"
            ref="scroll"
            :data="roomGropItem"
            :listenBeforeScroll="listenBeforeScroll"
            @beforeScrollStart="beforeScrollStart"
            @pullingDown="pullingDown"
            :pullDownRefresh="pullDownRefresh"
          >
            <div :class="getClass(item)" v-for="(item,index) in roomGropItem" :key="index">
              <div class="photo">
                <img :src="item.photoImg" v-lazy="item.photoImg" :key="item.photoImg" alt>
              </div>
              <div class="text">
                <p v-if="!item.chatImg">{{item.content}}</p>
                <div class="v-img"
                     v-else
                     :style="{'background-image':`url(${item.chatImg})`}"
                     @click="showPictureClick(item.chatImg)"
                ></div>
                <i :class="getIClass(item)"></i>
              </div>
            </div>
          </Scroll>
        </div>
      </div>
      <v-send ref="sendRoom" :showFace="showFace" @showPace="showSendPace" @send="send" @sendImg="sendImg"></v-send>
      <div v-if="pictureList.length">
        <v-picture
          ref="picture"
          v-if="showPicture"
          @hidePictureClick="hidePictureClick"
        >
          <div v-for="(item,index) in pictureList" :key="index">
            <img v-lazy="item" :key="item" @load="pictLoad" alt="" :style="{maxHeight:maxHeight+'px'}">
          </div>
        </v-picture>
      </div>
      <router-view />
    </div>
  </transition>
</template>
<script>
  import Scroll from "../base/scroll.vue";
  import { mapMutations, mapActions, mapState} from "vuex";
  import {slideMinxins, RoomMinxins} from "../assets/js/mixin";
  import Slider from "../base/slider.vue";
  import VSend from "../base/send.vue";
  const PER_PAGE = 20;
  import VPicture from '../base/picture'
  export default {
    mixins: [slideMinxins, RoomMinxins],
    components: {
      Scroll,
      Slider,
      VSend,
      VPicture
    },
    created() {
      if(this.roomGropItem.length<20){
        this.pullDownRefresh=false;
      }else{
        this.pullDownRefresh=true;
      }
    },
    computed: {
      pictureList() {
        let list = [];
        this.roomGropItem.forEach(item => {
          if (item.chatImg) {
            list.push(item.chatImg)
          }
        })
        return list;
      },
      ...mapState(["roomGropItem", "userList"])
    },
    beforeDestroy() {
      this.getGroupList();
    },
    mounted() {
      this.$nextTick(() => {
        this.onresize()
        if (this.roomGropItem.length) {
          this.bottom()
        }
      })
    },
    methods: {
      // 發送
      send(text) {
        this.isPulingDown=false
        let obj = {
          userId: this.userList._id,
          content: text,
          chatImg: "",
          from: this.userList._id,
          to: '1111111111'
        };
        this.send_groupMessage(obj);
        this.bottom()
      },
      // 发送图片
      sendImg(item) {
        this.isPulingDown=false
        let obj = {
          userId: this.userList._id,
          content: item.text,
          chatImg: item.chatImg,
          from: this.userList._id,
          to: '1111111111'
        };
        this.send_groupMessage(obj);
        this.bottom()
      },
      pullingDown() {
        if (this.isHasMore && this.roomGropItem.length >= PER_PAGE) {
          this.isPulingDown=true
          this.initNews();
        } else {
          this.$refs.scroll.forceUpdate();
        }
      },
      initNews() {
        this.page++;
        this.$http.post("/groupList", {
          page: this.page
        }).then(res => {
          if (res.data.code) {
            this.set_roomGropItem_send(res.data.list.reverse())
            this.scrollTop()
          }
          this._checkHasMore(res.data)
        });
      },
      getGroupList() {
        this.$http.post("/groupList",{page:1}).then(res => {
          if (res.data.code) {
            this.set_roomGropItem(res.data.list.reverse());
          }
        });
      },
      ...mapMutations(['set_roomGropItem_send','set_roomGropItem','set_personItem']),
      ...mapActions(["send_groupMessage"])
    },
    watch: {
      // 監聽表情打開隱藏
      showFace(val) {
        if (!this.roomGropItem.length) return;
        this.scrollHeight(val)
      },
      roomGropItem(val){
        if(!val.length) return;
        if(!this.isPulingDown) this.bottom()
      },
      pullDownRefresh(val){
        if(!val&&this.roomGropItem.length>19){
          const scroll=this.$refs.scroll.scroll;
          scroll.closePullDown()
        }
      }
    }
  };
</script>
<style lang="less" scoped>
  @import "../assets/css/variable.less";

  .hide-enter-active,
  .hide-leave-active {
    transition: all 0.3s;
  }

  .hide-enter,
  .hide-leave-to {
    transform: scale(0.6);
  }

  .room {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 9;
    background: #f0f2ff;

    .head {
      height: 130/2px;
      background: @bg-color;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;

      .icon {
        width: 88/2px;
        flex: 0 0 88/2px;
        text-align: center;
        height: 130/2px;
        line-height: 130/2px;

        i {
          display: inline-block;
          vertical-align: middle;
          font-size: 40/2px;
          color: #ffffff;
        }
      }

      span {
        flex: 1;
        display: inline-block;
        text-align: center;
        color: #ffffff;
        font-size: 36/2px;
      }
    }

    .content {
      padding: 24/2px 30/2px;
      position: fixed;
      left: 0;
      right: 0;
      bottom: 120/2px;
      top: 130/2px;
      overflow: hidden;

      div {
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        align-items: flex-end;
        margin-bottom: 16/2px;

        .photo {
          width: 108/2px;
          flex: 0 0 108/2px;
          height: 108/2px;
          border-radius: 50%;
          overflow: hidden;

          img {
            width: 100%;
            height: 100%;
            display: inline-block;
          }
        }

        .text {
          position: relative;
          padding: 26/2px 18/2px;
          display: inline-block;
          -webkit-border-radius: ;
          -moz-border-radius: ;
          border-radius: 9px;
          box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
          overflow: hidden;

          p {
            color: #333;
            line-height: 20px;
            overflow: hidden;
          }

          img {
            width: 160px;
            height: auto;
            position: relative;
            z-index: 1;
          }
        }
      }

      .left {
        .text {
          background: #fff;
          margin-left: 20/2px;

          i {
            display: inline-block;
            position: absolute;
            left: -9px;
            bottom: 0;
            color: #fff;
          }
        }
      }

      .right {
        flex-flow: row-reverse nowrap;

        .text {
          background: @bg-color;
          margin-right: 20/2px;

          p {
            color: #ffffff;
          }

          i {
            display: inline-block;
            position: absolute;
            right: -9px;
            bottom: 0;
            color: @bg-color;
          }
        }
      }
    }
  }

  .bar {
    background: @bg-color;
  }
</style>
