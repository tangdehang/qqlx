<template>
  <ul class="personlist">
    <li @click="roomClick">
      <div class="photo">
        <img v-lazy="item.photoImg" :key="item.photoImg" alt>
      </div>
      <div class="personNews">
        <div class="text">
          <h1>{{item.user}}</h1>
          <p>{{item.content}}</p>
        </div>
        <div class="date">
          <span>{{getDate(item.createdTime)}}</span>
          <em v-if="num">{{num}}</em>
        </div>
      </div>
    </li>
  </ul>
</template>
<script>
  import {mapMutations,mapState} from "vuex";
  import {getLast,getChatId} from "../assets/js/util.js";

  export default {
    props: {
      personArray: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    computed: {
      chatItem() {
        return getLast(this.personArray)
      },
      item() {
        let targetId = this.chatItem.from == this.userList._id ? this.chatItem.to : this.chatItem.from;
        return {
          ...this.users[targetId],
          content: this.chatItem.content,
          createdTime: this.chatItem.createdTime
        }
      },
      personList() {
        return this.personArray
      },
      num() {
        return this.personArray.filter(item => {
          return !item.read && item.to == this.userList._id
        }).length
      },
        ...mapState(['users','userList'])
    },
    methods: {
      roomClick() {
        let chatId=getChatId(this.item._id,this.userList._id)
        this.set_roomItem(this.item._id);
        this.set_roomUser(this.item)
        this.set_allowRoom(chatId)
        this.$emit('roomClick')
      },
      getDate(time) {
        let date = new Date(time);
        let m = date.getHours();
        let mm = m < 10 ? "0" + m : m;
        let s = date.getMinutes();
        let ss = s < 10 ? "0" + s : s;
        return `${mm}:${ss}`;
      },
      ...mapMutations(["set_personItem", "set_showRoom", "set_roomItem", "set_roomUser","set_allowRoom"])
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
        overflow: hidden;

        .text {
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

        .date {
          width: 65/2px;
          flex: 0 0 65/2px;
          text-align: right;
          height: 78/2px;
          display: flex;
          flex-flow: column nowrap;
          justify-content: space-between;
          align-items: flex-end;
          margin-left: 20px;

          span {
            font-size: 26/2px;
            color: #666;
          }

          em {
            display: inline-block;
            height: 32/2px;
            min-width: 32/2px;
            line-height: 32/2px;
            background: @circle-bg;
            -webkit-border-radius: ;
            -moz-border-radius: ;
            border-radius: 50%;
            text-align: center;
            color: #ffffff;
            padding: 3px;
          }
        }
      }
    }
  }
</style>
