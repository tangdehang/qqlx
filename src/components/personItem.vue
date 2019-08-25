<template>
  <ul class="personlist">
    <li @click="roomClick(item)">
      <div class="photo">
        <img :class="!item.online?'gg':''" v-lazy="item.photoImg" :key="item.photoImg" alt>
      </div>
      <div class="personNews">
        <div class="text">
          <h1>{{item.user}}</h1>
          <p>{{item.autograph}}</p>
        </div>
        <span :class="{activeSpan:item.online}">{{item.online?'在线':'离线'}}</span>
      </div>
    </li>
  </ul>
</template>
<script>
import { mapMutations,mapState } from "vuex";
import {getChatId} from "../assets/js/util.js";
export default {
  props: {
    item: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed:{
    ...mapState(['userList'])
  },
  methods: {
    roomClick(item) {
      let chatId=getChatId(item._id,this.userList._id)
      this.set_allowRoom(chatId)
      this.set_roomItem(item._id);
      this.set_roomUser(item)
      this.$emit('roomClick')
    },
    ...mapMutations(["set_personItem","set_roomItem","set_roomUser","set_allowRoom"])
  }
};
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
      -webkit-border-radius: ;
      -moz-border-radius: ;
      border-radius: 50%;
      overflow: hidden;
      position: relative;
      img {
        width: 100%;
        height: 100%;
        display: inline-block;
        vertical-align: top;
        position: absolute;
        left: 0;
        top: 0;
      }
      img.gg {
        filter: grayscale(100%);
      }
    }
    .personNews {
      flex: 1;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      box-sizing: border-box;
      overflow: hidden;
      .text {
        margin-left: 41/2px;
        height: 78/2px;
        overflow: hidden;
        flex: 1;
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
          padding-right: 10px;
          .no-wrap();
        }
      }
      span{
        width: 40px;
        flex:0 0 40px;
        height: 20px;
        text-align: center;
        line-height: 20px;
        background: #ccc;
        display: inline-block;
        font-size: 12px;
        border-radius: 4px;
        letter-spacing: 2px;
        color: #999;
      }
      .activeSpan{
        background:@personal-bg;
        color: #fff;
      }
    }
  }
}
</style>
