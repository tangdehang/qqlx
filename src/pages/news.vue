<template>
  <div>
    <bg-img></bg-img>
    <div class="message">
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
  </div>
</template>
<script>
  import BgImg from "../components/bgImg.vue";
  import {mapMutations, mapActions, mapGetters,mapState} from "vuex";

  export default {
    components: {
      BgImg
    },
    computed: {
      ...mapState(['userList'])
    },
    created() {
      this.get_message();
      this.get_groupMessage()
      // 接受登录消息
      this.send_getloginSuccess();
      this.getUserInfo()
    },
    activated() {
      // 获取所有消息列表
      this.getchatList();
    },
    methods: {
      getUserInfo() {
        this.$http.post("/getUserInfo").then(res => {
          if (res.data.code) {
            this.set_users(res.data.list);
          }
        })
      },
      ...mapMutations(["set_isToken",'set_users']),
      ...mapActions(["send_loginOut", "get_message", "getchatList", "send_getloginSuccess", "get_groupMessage"])
    }
  };
</script>
<style lang="less" scoped>
  .message {
    width: 100%;
    padding: 0 20px;
    position: fixed;
    top: 203px;
    bottom: 0;
    left: 0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    overflow: hidden;
  }
</style>
