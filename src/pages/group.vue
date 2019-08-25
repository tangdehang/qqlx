<template>
  <div class="group">
    <scroll class="scroll">
      <group-item
        v-for="(item,index) in list"
        :key="index"
        :item="item"
        @roomClick="roomClick"></group-item>
    </scroll>
    <router-view/>
  </div>
</template>
<script>
  import GroupItem from "../components/groupItem.vue";
  import Scroll from "../base/scroll.vue";
  import {mapMutations, mapActions, mapState} from 'vuex'
  import {getUserInfoMixins} from "../assets/js/mixin";
  export default {
    mixins: [getUserInfoMixins],
    components: {
      GroupItem,
      Scroll
    },
    activated() {
      this.getGroupList()
    },
    computed: {
      ...mapState(['userList'])
    },
    data() {
      return {
        list:[
          {photo:'/static/image/group.jpg',title:'聊天群',subTitle:'欢迎畅所欲言!!!',url:'groupRoom'}
          ]
      };
    },
    methods: {
      getGroupList() {
        this.$http.post("/groupList", {page: 1}).then(res => {
          if (res.data.code) {
            this.set_roomGropItem(res.data.list.reverse());
          }else{
            this.$message.info(res.data.message)
          }
        });
      },
      roomClick(url) {
        this.$router.push(`/news/group/${url}`)
      },
      ...mapMutations(['set_roomGropItem']),
      ...mapActions(['send_loginSuccess'])
    }
  };
</script>
<style lang="less" scoped>
  .group {
    width: 100%;
    height: 100%;
    overflow: hidden;

    .scroll {
      width: 100%;
      height: 100%;
    }
  }
</style>
