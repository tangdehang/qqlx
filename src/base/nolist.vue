<template>
  <div class="err">
    <div class="list">
      <div class="img">
        <img src="/static/image/noList.png" alt>
      </div>
      <p>暂时木有内容呀~~</p>
    </div>
  </div>
</template>
<style lang="less" scoped>
.err {
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
  .list {
    text-align: center;
    padding: 10px 20px;
    transform: translateY(-50%);
    .img {
      display: inline-block;
      width: 226/2px;
    }
    p {
      display: block;
      padding-top: 20px;
      font-size: 12px;
      color: #999;
    }
  }
}
</style>

