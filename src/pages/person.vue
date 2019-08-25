<template>
  <div class="person">
    <scroll class="scroll"
            :data="personList"
            :pullUpLoad="pullUpLoad"
            @pullingUp="pullingUp"
            ref="scroll"
    >
      <person-item
        v-for="(item,index) in personList"
        :key="index"
        :item="item"
        @roomClick="roomClick"
      ></person-item>
    </scroll>
    <v-err v-show="!personList.length&&!isHasMore"></v-err>
    <router-view/>
  </div>
</template>
<script>
  import PersonItem from "../components/personItem.vue";
  import Scroll from "../base/scroll.vue";
  import VErr from "../base/err.vue";
  import {personMinxins,getUserInfoMixins} from "../assets/js/mixin";
  export default {
    mixins: [personMinxins,getUserInfoMixins],
    components: {
      PersonItem,
      Scroll,
      VErr
    },
    created() {
      this.pullUpLoad = true;
      this.initNews();
    },
    methods: {
      initNews(status) {
        if (!status) this.page = 1;
        this.$http.post("/chatPerson", {page: this.page}).then(res => {
          if (res.data.code) {
            if (status) {
              this.list = this.list.concat(res.data.list);
            } else {
              this.list = res.data.list;
            }
          }
          this.set_personList(this.list)
          this._checkHasMore(res.data)
        });
      }
    }
  };
</script>
<style lang="less" scoped>
  .person {
    width: 100%;
    height: 100%;
    overflow: hidden;

    .scroll {
      width: 100%;
      height: 100%;
    }
  }
</style>
