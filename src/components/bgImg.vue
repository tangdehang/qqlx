<template>
  <div>
    <div class="bgImg">
      <div class="top">
        <div class="left" @click="showMessgeClick">
          <i class="icon-return2"></i>
        </div>
        <div class="right">
          <i class="icon-uniE919"></i>
        </div>
      </div>
      <div class="photoImg" v-if="userList.photoImg">
        <div class="photo">
          <img v-lazy="userList.photoImg" :key="userList.photoImg" alt>
        </div>
        <div class="title">{{userList.user}}</div>
        <div class="list">
          <p>{{userList.autograph}}</p>
        </div>
      </div>
      <div class="tab">
        <v-tab></v-tab>
      </div>
    </div>
    <message
      :showMessage="showMessage"
      @cancel="cancel"
      @confirm="confirm">
    </message>
  </div>
</template>
<script>
import Message from "../base/message.vue";
import VTab from "./tab.vue";
import { mapGetters, mapMutations, mapActions,mapState } from "vuex";
export default {
  components: {
    VTab,
    Message
  },
  computed: {
    ...mapState(["userList"])
  },
  data() {
    return {
      showMessage: false
    };
  },
  methods: {
    cancel() {
      this.showMessage = false;
    },
    confirm() {
      this.$router.push("/login");
      this.send_loginOut(this.userList._id);
      this.showMessage = false;
      localStorage.removeItem("token");
    },
    showMessgeClick() {
      this.showMessage = true;
    },
    ...mapMutations(["set_users"]),
    ...mapActions(["socketOut", "send_loginOut"])
  }
};
</script>
<style lang="less" scoped>
@import "../assets/css/variable.less";
@import "../assets/css/mixin.less";

.bgImg {
  position: fixed;
  width: 100%;
  padding: 60/2px 30/2px;
  height: 356/2px;
  background: @bg-color;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  box-sizing: border-box;
  .top {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    position: relative;
    z-index: 1;
    .left {
      width: 55/2px;
      height: 41/2px;
      line-height: 41/2px;
      i {
        display: inline-block;
        font-size: 41/2px;
        color: #ffffff;
        vertical-align: top;
      }
    }
    .right {
      width: 54/2px;
      height: 53/2px;
      line-height: 53/2px;
      text-align: right;
      i {
        display: inline-block;
        color: #ffffff;
        font-size: 38/2px;
      }
    }
  }
  .photoImg {
    width: 100%;
    padding: 0 66/2px;
    height: 251/2px;
    position: absolute;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    align-items: center;
    left: 0;
    top: 32/2px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    overflow: hidden;
    .photo {
      width: 168/2px;
      height: 168/2px;
      border-radius: 50%;
      border: 1px solid @border-color;
      position: relative;
      z-index: 2;
      box-shadow: 0 0 8px rgba(27, 38, 113, 0.5);
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        vertical-align: top;
      }
    }
    .title {
      font-size: 29/2px;
      color: #eeeeee;
      text-align: center;
    }
    .list {
      width: 100%;
      color: #b9c1f1;
      text-align: center;
      p {
        font-size: 26/2px;
        .no-wrap();
      }
    }
  }
  .tab {
    width: 95%;
    padding: 0 33/2px;
    position: absolute;
    left: 50%;
    bottom: -24/2px;
    transform: translateX(-50%);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
}
  .bar{
    background: @bg-color;
  }
</style>
