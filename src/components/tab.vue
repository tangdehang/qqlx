<template>
  <div class="tab">
    <router-link to="/news/message" active-class="active">
      <i class="icon-12"></i>
      <em></em>
      <span v-if="!isRead"></span>
    </router-link>
    <router-link to="/news/person" active-class="active">
      <i class="icon---2"></i>
      <em></em>
    </router-link>
    <router-link to="/news/group" active-class="active">
      <i class="icon-19"></i>
      <em></em>
    </router-link>
    <router-link to="/news/dynamic" active-class="active">
      <i class="icon-uniE91B"></i>
      <em></em>
    </router-link>
  </div>
</template>
  <script>
import { mapGetters ,mapState} from "vuex";
export default {
  computed: {
    ...mapState(['userList',"messageList"]),
    isRead() {
      let status = true;
      this.messageList.forEach(k => {
        k.forEach(item => {
          if (!item.read && item.to == this.userList._id) {
            status = false;
          }
        });
      });
      return status;
    }
  }
};
</script>
  
<style lang="less" scoped>
@import "../assets/css/variable.less";
.tab {
  width: 100%;
  height: 107/2px;
  -webkit-border-radius: ;
  -moz-border-radius: ;
  border-radius: 50px;
  background: #ffffff;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;
  a {
    display: block;
    flex: 1;
    height: 107/2px;
    line-height: 107/2px;
    text-align: center;
    position: relative;
    i {
      display: inline-block;
      font-size: 56/2px;
      vertical-align: middle;
      color: @tab-text-color;
    }
    em {
      display: inline-block;
      width: 40px;
      height: 4px;
      background: #fff;
      position: absolute;
      bottom: 5px;
      left: 50%;
      -webkit-border-radius: ;
      -moz-border-radius: ;
      border-radius: 2px;
      transform: translateX(-50%);
    }
    span {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: @circle-bg;
      position: absolute;
      right: 18px;
      top: 12px;
    }
  }
  a.active {
    i {
      color: @text-color;
    }
    em {
      background: @text-color;
    }
  }
}
</style>
