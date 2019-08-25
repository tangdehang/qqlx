<template>
  <div class="mess">
    <scroll class="scroll" :data="messageList" ref="scroll">
      <person-list v-for="(item,index) in messageList"
                   :key="index"
                   :personArray="item"
                   @roomClick="roomClick"
      ></person-list>
    </scroll>
    <v-err v-show="!showErr&&!messageList.length"></v-err>
    <router-view/>
  </div>
</template>
<script>
  import PersonList from "../components/personlist.vue";
  import Scroll from "../base/scroll.vue";
  import VErr from "../base/err.vue";
  import {RoomMinxins,getUserInfoMixins} from "../assets/js/mixin";
  import {mapActions, mapState, mapMutations} from "vuex";

  export default {
    mixins: [RoomMinxins,getUserInfoMixins],
    components: {
      PersonList,
      Scroll,
      VErr
    },
    activated() {
      this.getchatList();
    },
    computed: {
      ...mapState(['showErr', "messageList", 'userList'])
    },
    data() {
      return {};
    },
    methods: {
      ...mapActions(['getchatList']),
      ...mapMutations(["set_users"]),
      roomClick() {
        this.$router.push('/news/message/room')
      }
    }

  };
</script>
<style lang="less" scoped>
  .mess {
    width: 100%;
    height: 100%;
    overflow: hidden;

    .scroll {
      width: 100%;
      height: 100%;
    }
  }

  .v-loading {
    position: fixed;
    left: 0;
    top: 270px;
    width: 100%;
  }
</style>
