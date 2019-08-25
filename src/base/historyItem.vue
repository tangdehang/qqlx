<template>
  <ul>
    <li v-for="(item,index) in listItem" :key="index" @click="itemClick(item)">{{item}}</li>
  </ul>
</template>
<script>
export default {
  props: {
    listItem: {
      type: Array,
      default() {
        return ["小明", "啥方式发送到", "小华", "是的发送打发第三似懂非懂是否"];
      }
    }
  },
  methods: {
    itemClick(val) {
      this.$emit("itemClick", val);
    }
  }
};
</script>
<style lang="less" scoped>
ul {
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-content: center;
  padding: 10px 0;
  li {
    padding: 5px 12px;
    background: #eee;
    color: #666;
    border-radius: 20px;
    margin-right: 10px;
    letter-spacing: 2px;
    margin-bottom: 10px;
  }
}
</style>


