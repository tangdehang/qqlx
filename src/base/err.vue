<template>
    <div class="err">
        <div class="img">
            <img src="/static/image/err.png" alt="">
        </div>
    </div>
</template>
<style lang="less" scoped>
    .err{
        position: absolute;
        left: 0;
        top: 10px;
        bottom: 0;
        right: 0;
        text-align: center;
      background: #FFFFFF;
        .img{
            display: inline-block;
            width: 400/2px;
            transform: translateY(50%)
        }
    }
</style>

