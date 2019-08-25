<template>
  <div class="toast" v-if="toast">
    <p>{{toast}}</p>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        toast: ''
      }
    },
    methods: {
      showToast(val){
        this.toast = val
        setTimeout(() => {
          this.toast = ''
        }, 2000)
      }
    }
  }
</script>
<style lang="less" scoped>
  .toast{
    position: fixed;
    left:50%;
    top:500px;
    padding:20/2px 18/2px;
    background: rgba(0,0,0,0.8);
    transform: translateX(-50%);
    -webkit-border-radius:;
    -moz-border-radius:;
    border-radius:10px;
    z-index: 200;
    p{
      color: #ffffff;
      font-size:28/2px;
    }
  }
</style>
