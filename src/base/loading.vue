<template>
<div class="loading">
    <div class="spinner">
      <div class="double-bounce1"></div>
      <div class="double-bounce2"></div>
    </div>
    </div>
</template>

<style lang="less" scoped>
.loading{
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
}
.spinner {
  width: 40/2px;
  height: 40/2px;
  position: relative;
  display: inline-block;
}

.double-bounce1,
.double-bounce2 {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #3063b2;
  opacity: 0.6;
  position: absolute;
  top: 0;
  left: 0;
  -webkit-animation: bounce 2s infinite ease-in-out;
  animation: bounce 2s infinite ease-in-out;
}

.double-bounce2 {
  -webkit-animation-delay: -1s;
  animation-delay: -1s;
}

@-webkit-keyframes bounce {
  0%,
  100% {
    -webkit-transform: scale(0);
  }

  50% {
    -webkit-transform: scale(1);
  }
}

@keyframes bounce {
  0%,
  100% {
    transform: scale(0);
    -webkit-transform: scale(0);
  }

  50% {
    transform: scale(1);
    -webkit-transform: scale(1);
  }
}
</style>
