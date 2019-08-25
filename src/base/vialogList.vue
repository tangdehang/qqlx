<template>
  <div>
    <div :class="getClass(item)" v-for="(item,index) in roomItem" :key="index">
      <div class="photo">
        <img v-lazy="item.photoImg" :key="item.photoImg" alt>
      </div>
      <div class="text">
        <p>{{item.content}}</p>
        <i :class="getIClass(item)"></i>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters,mapState } from "vuex";
export default {
  props: {
    roomItem: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  computed: {
    ...mapState(["userList"])
  },
  methods: {
    getClass(item) {
      if (item.from == this.userList._id) {
        return "right";
      } else {
        return "left";
      }
    },
    getIClass(item) {
      if (item.from == this.userList._id) {
        return "icon-right";
      } else {
        return "icon-round";
      }
    }
  }
};
</script>

