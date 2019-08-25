<template>
  <div ref="wrapper" class="list-wrapper">
    <div class="scroll-content">
      <div ref="listWrapper">
        <slot></slot>
      </div>
      <slot
        name="pullup"
        :pullUpLoad="pullUpLoad"
        :isPullUpLoad="isPullUpLoad"
      >
        <div class="pullup-wrapper" v-if="pullUpLoad&&data.length">
          <div class="before-trigger" v-if="!isPullUpLoad">
            <span>{{pullUpTxt}}</span>
          </div>
          <div class="after-trigger" v-else>
            <loading></loading>
          </div>
        </div>
      </slot>
    </div>
    <slot name="pulldown"
          :pullDownRefresh="pullDownRefresh"
          :pullDownStyle="pullDownStyle"
          :beforePullDown="beforePullDown"
          :isPullingDown="isPullingDown"
          :bubbleY="bubbleY"
    >
      <div ref="pulldown" class="pulldown-wrapper" :style="pullDownStyle" v-if="pullDownRefresh&&data.length">
        <div class="before-trigger" v-if="beforePullDown">
          <bubble :y="bubbleY"></bubble>
        </div>
        <div class="after-trigger" v-else>
          <div v-if="isPullingDown" class="loading">
            <loading></loading>
          </div>
          <div class="refreshing" v-show="false">
            <span>{{refreshTxt}}</span>
          </div>
        </div>
      </div>
    </slot>
  </div>
</template>
<script>
  import BScroll from 'better-scroll';
  import Loading from './loading.vue'
  import {getRect} from '../assets/js/util'
  import Bubble from './bubble.vue'

  const COMPONENT_NAME = 'scroll'
  const DIRECTION_H = 'horizontal'
  const DIRECTION_V = 'vertical'
  export default {
    components: {
      Loading,
      Bubble
    },
    props: {
      data: {
        type: Array,
        default() {
          return []
        }
      },
      probeType: {
        type: Number,
        default: 1
      },
      click: {
        type: Boolean,
        default: true
      },
      listenScroll: {
        type: Boolean,
        default: false
      },
      listenBeforeScroll: {
        type: Boolean,
        default: false
      },
      listenScrollEnd: {
        type: Boolean,
        default: false
      },
      direction: {
        type: String,
        default: DIRECTION_V
      },
      scrollbar: {
        type: null,
        default: false
      },
      pullDownRefresh: {
        type: null,
        default: false
      },
      pullUpLoad: {
        type: null,
        default: false
      },
      startY: {
        type: Number,
        default: 0
      },
      refreshDelay: {
        type: Number,
        default: 20
      },
      freeScroll: {
        type: Boolean,
        default: false
      },
      mouseWheel: {
        type: Boolean,
        default: false
      },
      bounce: {
        default: true
      },
      zoom: {
        default: false
      }
    },
    data() {
      return {
        beforePullDown: true,
        isRebounding: false,
        isPullingDown: false, //下拉刷新请求异步数据
        isPullUpLoad: false, //上拉加载更多
        pullUpDirty: false,
        pullDownStyle: '',
        bubbleY: 0
      }
    },
    computed: {
      pullUpTxt() {
        return this.pullUpDirty ? '没有更多数据了' : '上拉加载更多...'
      },
      refreshTxt() {
        return (this.pullDownRefresh && this.pullDownRefresh.txt) || '刷新成功'
      }
    },
    created() {
      this.pullDownInitTop = -50
    },
    mounted() {
      setTimeout(() => {
        this.initScroll()
      }, 20)
    },
    destroyed() {
      this.$refs.scroll && this.$refs.scroll.destroy()
    },
    methods: {
      initScroll() {
        if (!this.$refs.wrapper) {
          return
        }
        if (this.$refs.listWrapper && (this.pullDownRefresh || this.pullUpLoad)) {
          //  this.$refs.listWrapper.style.minHeight = `${getRect(this.$refs.wrapper).height + 1}px`
          // this.$refs.listWrapper.style.minHeight = `${this.$refs.wrapper.clientHeight}px`
        }
        let options = {
          probeType: this.probeType,
          click: this.click,
          scrollY: this.freeScroll || this.direction === DIRECTION_V,
          scrollX: this.freeScroll || this.direction === DIRECTION_H,
          scrollbar: this.scrollbar,
          pullDownRefresh: this.pullDownRefresh,
          pullUpLoad: this.pullUpLoad,
          startY: this.startY,
          freeScroll: this.freeScroll,
          mouseWheel: this.mouseWheel,
          bounce: this.bounce,
          zoom: this.zoom
        }
        this.scroll = new BScroll(this.$refs.wrapper, options)
        if (this.listenScroll) {
          this.scroll.on('scroll', (pos) => {
            this.$emit('scroll', pos)
          })
        }
        if (this.listenScrollEnd) {
          this.scroll.on('scrollEnd', (pos) => {
            this.$emit('scrollEnd', pos)
          })
        }

        if (this.listenBeforeScroll) {
          this.scroll.on('beforeScrollStart', () => {
            this.$emit('beforeScrollStart')
          })

          this.scroll.on('scrollStart', () => {
            this.$emit('scrollStart')
          })
        }

        if (this.pullDownRefresh) {
          this._initPullDownRefresh()
        }

        if (this.pullUpLoad) {
          this._initPullUpLoad()
        }
      },
      disable() {
        this.scroll && this.scroll.disable()
      },
      enable() {
        this.scroll && this.scroll.enable()
      },
      refresh() {
        this.scroll && this.scroll.refresh()
      },
      scrollTo() {
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      scrollBottom() {
        this.scroll && this.scrollTo(0, this.scroll.maxScrollY, 200)
      },
      openPullUp() {
        this.scroll && this.scroll.openPullUp({});
      },
      closePullUp() {
        this.scroll && this.scroll.closePullUp({});
      },
      openPullDown() {
        this.scroll && this.scroll.openPullDown({});
      },
      closePullDown() {
        this.scroll && this.scroll.closePullDown({});
      },
      autoPullDownRefresh(){
        this.scroll && this.scroll.autoPullDownRefresh();
      },
      scrollToElement() {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      },
      clickItem(e, item) {
        this.$emit('click', item)
      },
      destroy() {
        this.scroll.destroy()
      },
      forceUpdate(dirty) {
        if (this.pullDownRefresh && this.isPullingDown) {
          this.isPullingDown = false
          this._reboundPullDown().then(() => {
            this._afterPullDown()
          })
        } else if (this.pullUpLoad && this.isPullUpLoad) {
          this.isPullUpLoad = false
          this.scroll.finishPullUp()
          this.refresh()
        } else {
          this.refresh()
        }
        this.pullUpDirty = dirty
      },
      _initPullDownRefresh() {
        this.scroll.on('pullingDown', () => {
          this.beforePullDown = false
          this.isPullingDown = true
          this.$emit('pullingDown')
        })

        this.scroll.on('scroll', (pos) => {
          if (!this.pullDownRefresh) {
            return
          }
          if (this.beforePullDown) {
            this.bubbleY = Math.max(0, pos.y + this.pullDownInitTop)
            this.pullDownStyle = `top:${Math.min(pos.y + this.pullDownInitTop, 10)}px`
          } else {
            this.bubbleY = 0
          }
          if (this.isRebounding) {
            this.pullDownStyle = `top:${10 - (this.pullDownRefresh.stop - pos.y)}px`
          }
        })
      },
      _initPullUpLoad() {
        this.scroll.on('pullingUp', () => {
          this.isPullUpLoad = true
          this.$emit('pullingUp')
        })
      },
      _reboundPullDown() {
        const {stopTime = 600} = this.pullDownRefresh
        return new Promise((resolve) => {
          setTimeout(() => {
            this.isRebounding = true
            this.scroll.finishPullDown()
            resolve()
          }, stopTime)
        })
      },
      _afterPullDown() {
        setTimeout(() => {
          this.pullDownStyle = `top:${this.pullDownInitTop}px`
          this.beforePullDown = true
          this.isRebounding = false
          this.refresh()
        }, this.scroll.options.bounceTime)
      }
    },
    watch: {
      data() {
        if(!this.pullDownRefresh&&!this.pullUpLoad){
          setTimeout(() => {
            this.forceUpdate(true)
          }, this.refreshDelay)
        }
      }
    }
  }
</script>
<style scoped lang="less">
  .list-wrapper {
    .scroll-content {
      position: relative;
      z-index: 1;
    }
  }

  .pulldown-wrapper {
    position: absolute;
    width: 100%;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all;
    top: -50px;

    .after-trigger {
      margin-top: 10px;
      width: 200px;

      .refreshing {
        width: 100%;
        background: rgba(0, 0, 0, 0.2);
        height: 30px;
        line-height: 30px;
        border-radius: 5px;
        text-align: center;

        span {
          display: inline-block;
          font-size: 14px;
          color: #eeeeee;
        }
      }

    }
  }

  .pullup-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px 0;

    span {
      font-size: 14px;
      color: #ccc;
    }
  }
</style>
