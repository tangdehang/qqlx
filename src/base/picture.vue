<template>
  <div class="slide" ref="slide" @click="hidePictureClick">
      <div class="slide-group" ref="slideGroup">
        <slot></slot>
      </div>
    <div v-if="showDot" class="dots">
        <span class="dot" :class="{active: currentPageIndex === index }" v-for="(item, index) in dots"
              :key="index"></span>
    </div>
  </div>
</template>

<script>
  import {addClass} from '../assets/js/util'
  import BScroll from 'better-scroll'

  const COMPONENT_NAME = 'slider'

  export default {
    name: COMPONENT_NAME,
    props: {
      loop: {
        type: Boolean,
        default: false
      },
      autoPlay: {
        type: Boolean,
        default: false
      },
      interval: {
        type: Number,
        default: 2000
      },
      showDot: {
        type: Boolean,
        default: false
      },
      click: {
        type: Boolean,
        default: true
      },
      threshold: {
        type: Number,
        default: 0.3
      },
      speed: {
        type: Number,
        default: 400
      }
    },
    data() {
      return {
        dots: [],
        currentPageIndex: 0,
        showPicture:false
      }
    },
    mounted() {
      this.update()
      window.addEventListener('resize', () => {
        if (!this.slide || !this.slide.enabled) {
          return
        }
        clearTimeout(this.resizeTimer)
        this.resizeTimer = setTimeout(() => {
          if (this.slide.isInTransition) {
            this._onScrollEnd()
          } else {
            if (this.autoPlay) {
              this._play()
            }
          }
          this.refresh()
        }, 60)
      })
    },
    activated() {
      if (!this.slide) {
        return
      }
      this.slide.enable()
      let pageIndex = this.slide.getCurrentPage().pageX
      this.slide.goToPage(pageIndex, 0, 0)
      this.currentPageIndex = pageIndex
      if (this.autoPlay) {
        this._play()
      }
    },
    deactivated() {
      this.slide.disable()
      clearTimeout(this.timer)
    },
    beforeDestroy() {
      this.slide.disable()
      clearTimeout(this.timer)
    },
    methods: {
      hidePictureClick(){
        this.$emit('hidePictureClick')
      },
      update() {
        if (this.slide) {
          this.slide.destroy()
        }
        this.$nextTick(() => {
          this.init()
        })
      },
      refresh() {
        this._setSlideWidth(true)
        this.slide.refresh()
      },
      prev() {
        this.slide.prev()
      },
      next() {
        this.slide.next()
      },
      init() {
        clearTimeout(this.timer)
        this.currentPageIndex = 0
        this._setSlideWidth()
        if (this.showDot) {
          this._initDots()
        }
        this._initSlide()

        if (this.autoPlay) {
          this._play()
        }
      },
      _setSlideWidth(isResize) {
        this.children = this.$refs.slideGroup.children
        let width = 0
        let slideWidth = this.$refs.slide.clientWidth
        for (let i = 0; i < this.children.length; i++) {
          let child = this.children[i]
          addClass(child, 'slide-item')
          child.style.width = slideWidth + 'px'
          width += slideWidth
        }
        if (this.loop && !isResize) {
          width += 2 * slideWidth
        }
        this.$refs.slideGroup.style.width = width + 'px'
      },
      _initSlide() {
        this.slide = new BScroll(this.$refs.slide, {
          scrollX: true,
          scrollY: false,
          momentum: false,
          snap: {
            loop: this.loop,
            threshold: this.threshold,
            speed: this.speed
          },
          bounce: false,
          stopPropagation: true,
          click: this.click
        })
        this.slide.on('scrollEnd', this._onScrollEnd)
        this.slide.on('touchEnd', () => {
          if (this.autoPlay) {
            this._play()
          }
        })
        this.slide.on('beforeScrollStart', () => {
          if (this.autoPlay) {
            clearTimeout(this.timer)
          }
        })
      },
      _onScrollEnd() {
        let pageIndex = this.slide.getCurrentPage().pageX
        this.currentPageIndex = pageIndex
        if (this.autoPlay) {
          this._play()
        }
        this.$emit('scrollPage', pageIndex)
      },
      _initDots() {
        this.dots = new Array(this.children.length)
      },
      _play() {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.slide.next()
        }, this.interval)
      },
      gotoPage(pageIndex){
        this.slide&&this.slide.goToPage(pageIndex, 0, 0)
      }
    },
    watch: {
      loop() {
        this.update()
      },
      autoPlay() {
        this.update()
      },
      speed() {
        this.update()
      },
      threshold() {
        this.update()
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../assets/css/variable.less";
  .slide {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    background: rgba(0, 0, 0, 1);
    z-index: 100;
    .slide-group {
      position: absolute;
      left: 0;
      top: 50%;
      .slide-item {
        float: left;
        transform: translateY(-50%);
          img {
            display: block;
            width: 100%;
            max-height: 568px;
          }
      }
    }
    .dots {
      transform: translateZ(1px);
      text-align: center;
      font-size: 0;
      padding: 56/2px 0;
      position: absolute;
      left: 10px;
      top: 100px;
      width: 10px;
      .dot {
        display: block;
        margin: 4px 0;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: @tab-text-color;
        &.active {
          height: 56/2px;
          border-radius: 5px;
          background: @text-router-active;
        }
      }
    }

  }
</style>
