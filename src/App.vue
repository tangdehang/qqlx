<template>
  <div id="app" @touchmove.prevent>
    <keep-alive>
      <router-view/>
    </keep-alive>
    <v-message
      :showMessage="isToken"
      confirmText="重新登录"
      content="你的登录信息已过期!!!"
      @cancel="cancel"
      @confirm="confirm"
    ></v-message>
  </div>
</template>
<script>
  import VMessage from "./base/message.vue";
  import {mapMutations, mapActions,mapState} from "vuex";

  export default {
    name: "App",
    components: {
      VMessage
    },
    computed: {
      ...mapState(["isToken"])
    },
    methods: {
      cancel() {
        this.set_isToken(false);
      },
      confirm() {
        this.$router.push("/login");
        localStorage.removeItem("token");
        this.set_isToken(false);
        this.send_loginOut(localStorage.getItem("userId"));
      },
      ...mapMutations(["set_users", "set_isToken"]),
      ...mapActions(["send_loginOut"])
    }
  };
</script>

<style lang="less">
  @import "./assets/css/variable";

  .slide-enter-active,
  .slide-leave-active {
    transition: all 0.3s ease-in-out;
  }

  .slide-enter,
  .slide-leave-to {
    transform: translate3d(100%, 0, 0);
  }
  .v-img{
    width: 160px;
    height: 110px;
    position: relative;
    z-index: 1;
    background-size: cover;
    background-color: #fff;
    background-repeat:no-repeat;
    background-position:left top;
    margin-bottom: 0 !important;
  }
</style>
