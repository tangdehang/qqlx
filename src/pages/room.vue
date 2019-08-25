<template>
  <transition
    @before-enter="BeforeEnter"
    @enter="enter"
    @after-leave="AfterLeave"
  >
    <div class="room-bg">
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
          <span>{{roomUser.user}}</span>
          <div class="icon">
            <i class="icon---"></i>
          </div>
        </div>
        <div v-if="roomItem.length">
          <Scroll
            class="content"
            ref="scroll"
            :data="roomItem"
            :listenBeforeScroll="listenBeforeScroll"
            @beforeScrollStart="beforeScrollStart"
            @pullingDown="pullingDown"
            :pullDownRefresh="pullDownRefresh"
          >
            <div :class="getClass(item)" v-for="(item,index) in roomItem" :key="index">
              <div class="photo">
                <img v-lazy="item.photoImg" :key="item.photoImg" alt>
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
      <v-send
        :showFace="showFace"
        @showPace="showSendPace"
        @send="send"
        @sendImg="sendImg"
        ref="sendRoom"></v-send>
      <div v-if="pictureList.length">
        <v-picture
          ref="picture"
          v-if="showPicture"
          @hidePictureClick="hidePictureClick"
        >
          <div v-for="(item,index) in pictureList" :key="index">
            <img v-lazy="item" :key="item" @load="pictLoad" alt="">
          </div>
        </v-picture>
      </div>
    </div>
  </transition>
</template>
<script>
  import Scroll from "../base/scroll.vue";
  import {mapMutations, mapActions, mapState} from "vuex";
  import {slideMinxins, RoomMinxins} from "../assets/js/mixin";
  import {getChatId} from "../assets/js/util";
  import VSend from "../base/send.vue";

  const PER_PAGE = 20;
  import VPicture from '../base/picture'

  export default {
    mixins: [slideMinxins, RoomMinxins],
    components: {
      Scroll,
      VSend,
      VPicture
    },
    created() {
      if(this.roomItem.length<20){
        this.pullDownRefresh=false;
      }else{
        this.pullDownRefresh=true;
      }
    },
    computed: {
      pictureList() {
        let list = [];
        this.roomItem.forEach(item => {
          if (item.chatImg) {
            list.push(item.chatImg)
          }
        })
        return list;
      },
      ...mapState(['roomUser', "roomItem", "userList"])
    },
    mounted() {
      this.$nextTick(() => {
        this.onresize()
        if (this.roomItem.length) {
          this.bottom()
        }
      })
    },
    beforeDestroy() {
      this.setRead();
    },
    methods: {
      // 發送文字
      send(text) {
        this.isPulingDown = false
        let obj = {
          userId: this.userList._id,
          content: text,
          chatImg: "",
          chatId: getChatId(this.roomUser._id, this.userList._id),
          from: this.userList._id,
          to: this.roomUser._id
        };
        this.send_message(obj);
        this.bottom()
      },
      // 发送图片
      sendImg(item) {
        this.isPulingDown = false
        let obj = {
          userId: this.userList._id,
          content: '图片',
          chatImg: item.chatImg,
          chatId: getChatId(this.roomUser._id, this.userList._id),
          from: this.userList._id,
          to: this.roomUser._id
        };
        this.send_message(obj);
        this.bottom()
      },
      // 清空消息隊列
      setRead() {
        let from = this.roomUser._id;
        this.$http.post("/chatRead", {from}).then(res => {
          if (res.data.code) {
            this.getchatList();
          }
        });
      },
      pullingDown() {
        if (this.isHasMore && this.roomItem.length >= PER_PAGE) {
          this.isPulingDown = true
          this.initNews();
        } else {
          this.$refs.scroll.forceUpdate();
        }
      },
      initNews() {
        this.page++;
        this.$http.post("/chatItem", {
          page: this.page,
          chatId: getChatId(this.roomUser._id, this.userList._id)
        }).then(res => {
          if (res.data.code) {
            this.set_roomItem_send(res.data.list.reverse())
            this.scrollTop()
          }
          this._checkHasMore(res.data)
        });
      },
      ...mapMutations(["set_showRoom", 'set_roomItem_send']),
      ...mapActions(["getchatList", "send_message"])
    },
    watch: {
      // 監聽表情打開隱藏
      showFace(val) {
        if (!this.roomItem.length) return;
        this.scrollHeight(val)
      },
      roomItem(val) {
        if (!val.length) return;
        if (!this.isPulingDown) this.bottom()
      },
      pullDownRefresh(val){
        if(!val&&this.roomItem.length>19){
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

  .room-bg {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: #FFFFFF;
    z-index: 100;
  }

  .room {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: #f0f2ff;
    transition: all 0.4s ease;
    z-index: 10;

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
          border-radius: 9px;
          box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
          overflow: hidden;

          p {
            color: #333;
            line-height: 20px;
            overflow: hidden;
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
            left: -11px;
            bottom: 0;
            color: #fff;
            z-index: 0;
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
            right: -11px;
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
