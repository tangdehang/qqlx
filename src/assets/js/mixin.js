import {mapActions, mapState, mapMutations} from 'vuex';

const RoomMinxins = {

  data() {
    return {
      showFace: false,
      page: 1,
      isHasMore: true,
      isPulingDown: false,
      showPicture: false,
      PER_PAGE: 20,
      pullDownRefresh:true,
      listenBeforeScroll : true,
      maxHeight:window.innerHeight
    };
  },
  methods: {
    // 表情展開收縮
    showSendPace(val) {
      this.showFace = val;
    },
    // 關閉
    cancel() {
      this.showFace = false;
      this.$router.back();
    },
    beforeScrollStart() {
      this.showFace = false;
      this.$refs.sendRoom.InputBlur()
    },
    // 人物左右class
    getClass(item) {
      if (item.from == this.userList._id) {
        return "right";
      } else {
        return "left";
      }
    },
    // 控制氣泡
    getIClass(item) {
      if (item.from == this.userList._id) {
        return "icon-right";
      } else {
        return "icon-round";
      }
    },
    onresize() {
      window.addEventListener("resize", () => {
        this.$refs.scroll && this.$refs.scroll.scrollBottom();
      });
    },

    pictLoad() {
      if (!this.checkImg) {
        this.checkImg = true;
        this.$refs.scroll.refresh()
      }
    },
    _checkHasMore(data) {
      if (!data.list || !data.list.length || (this.page - 1) * this.PER_PAGE + data.list.length >= parseInt(data.num)) {
        this.isHasMore = false;
        this.$refs.scroll.forceUpdate(true);
        this.pullDownRefresh=false;
      } else {
        this.isHasMore = true;
        this.$refs.scroll && this.$refs.scroll.forceUpdate();
      }
    },
    bottom() {
      this.$refs.scroll && this.$refs.scroll.refresh();
      setTimeout(() => {
        this.$refs.scroll && this.$refs.scroll.scrollBottom();
      }, 200);
    },
    scrollTop() {
      setTimeout(() => {
        this.$refs.scroll && this.$refs.scroll.scrollTo(0, 0);
      }, 200);
    },
    scrollHeight(val) {
      if (val) {
        this.$refs.scroll.$el.style.bottom = "225px";
        this.$refs.scroll.refresh();
        setTimeout(() => {
          this.$refs.scroll.scrollBottom();
        }, 80);
      } else {
        this.$refs.scroll.$el.style.bottom = "60px";
        this.$refs.scroll.refresh();
      }
    },
    hidePictureClick() {
      this.showPicture = false;
    },
    showPictureClick(val) {
      this.showPicture = true;
      let index = this.pictureList.findIndex(item => {
        return item === val
      })
      if (index > -1 && this.pictureList.length > 1) {
        setTimeout(() => {
          this.$refs.picture.gotoPage(index)
        }, 20)
      }
    }
  }
}
const ArticleListMinxins = {
  created() {

  },
  data() {
    return {}
  },
  methods: {}
}
const getUserInfoMixins = {
  activated() {
    this.getUserInfo()
    setTimeout(()=>{
      this.$refs.scroll&&this.$refs.scroll.refresh();
    },20)
  },
  methods: {
    getUserInfo() {
      this.$http.post("/getUserInfo").then(res => {
        if (res.data.code) {
          if (!res.data.list.online) {
            this.send_loginSuccess(res.data.list._id)
          }
        }
      })
    },
    ...mapActions(['send_loginSuccess'])
  }
}
const personMinxins = {

  computed: {
    ...mapState(['personListErr', 'personList', 'userList'])
  },
  data() {
    return {
      page: 1,
      isHasMore: true,
      first: true,
      PER_PAGE: 50
    };
  },
  methods: {
    ...mapActions(['send_loginSuccess']),
    ...mapMutations(['set_personList']),
    roomClick() {
      this.$router.push(`${this.$route.path}/room`)
    },
    personClick() {
      this.$router.push(`${this.$route.path}/personal`)
    },
    pullingUp() {
      if (this.personList.length >= 50) {
        this.searchMore();
      } else {
        this.$refs.scroll.forceUpdate(true);
      }

    },
    searchMore() {
      if (this.isHasMore) {
        this.page++;
        this.initNews(true)
      } else {
        this.$refs.scroll.forceUpdate(true);
      }
    },
    _checkHasMore(data) {
      if (!data.list || !data.list.length || (this.page - 1) * this.PER_PAGE + data.list.length >= parseInt(data.num)) {
        this.isHasMore = false;
        this.$refs.scroll && this.$refs.scroll.forceUpdate(true);
      } else {
        this.isHasMore = true;
        this.$refs.scroll && this.$refs.scroll.forceUpdate();
      }
    }
  }
}
const slideMinxins = {
  created() {
    this.touch = {};
    this.transLate = 60;
  },
  methods: {
    touchstart(e) {
      if (e.target.nodeName === 'I' || e.target.nodeName === 'SPAN' || e.target.nodeName === 'INPUT') return
      this.touch.initaled = true;
      this.touch.startX = e.touches[0].pageX;
      this.touch.startY = e.touches[0].pageY;
      this.touch.move = false;
      this.$refs.slide.style.transition = `none`
      if (this.$refs.sendRoom) this.$refs.sendRoom.$el.style.transition = `none`

    },
    touchmove(e) {
      if (e.target.nodeName === 'I' || e.target.nodeName === 'SPAN' || e.target.nodeName === 'INPUT') return
      if (!this.touch.initaled) return;
      if (!this.touch.move) this.touch.move = true;
      let dealtX = e.touches[0].pageX - this.touch.startX;
      let dealtY = e.touches[0].pageY - this.touch.startY
      if (Math.abs(dealtY) > Math.abs(dealtX) || dealtX <= 0) {
        return;
      }
      this.touch.dealtX = dealtX
      this.$refs.slide.style.transform = `translate3d(${dealtX}px,0,0)`
      if (this.$refs.sendRoom) this.$refs.sendRoom.$el.style.transform = `translate3d(${dealtX}px,0,0)`
    },
    touchend(e) {
      if (e.target.nodeName === 'I' || e.target.nodeName === 'SPAN' || e.target.nodeName === 'INPUT') return
      if (!this.touch.dealtX || this.touch.dealtX < 0) return;
      if (!this.touch.move) return;
      let slideWidth = this.$refs.slide.clientWidth;
      if (Math.abs(this.touch.dealtX) >= this.transLate) {
        this.$refs.slide.style.transition = `transform 0.3s ease-in-out`
        this.$refs.slide.style.transform = `translate3d(${slideWidth}px,0,0)`
        if (this.$refs.sendRoom) this.$refs.sendRoom.$el.style.transition = `transform 0.3s ease-in-out`
        if (this.$refs.sendRoom) this.$refs.sendRoom.$el.style.transform = `translate3d(${slideWidth}px,0,0)`
        this.cancel()
      } else {
        this.$refs.slide.style.transition = `transform 0.3s ease-in-out`
        this.$refs.slide.style.transform = `translate3d(0,0,0)`

        if (this.$refs.sendRoom) this.$refs.sendRoom.$el.style.transition = `transform 0.3s ease-in-out`
        if (this.$refs.sendRoom) this.$refs.sendRoom.$el.style.transform = `translate3d(0,0,0)`
      }
      delete this.touch.dealtX
      this.touch.initaled = false;
    },
    BeforeEnter(el) {
      el.style.transform = `translate3d(-100%,0,0)`
      el.style.display = 'block'
    },
    enter(el, done) {
      let rf = el.offsetHeight;
      el.style.transform = `translate3d(0,0,0)`
      el.addEventListener('transitioned', done)
    },
    AfterLeave(el) {
      el.style.display = 'none'
    }
  }
}

export {
  RoomMinxins,
  ArticleListMinxins,
  personMinxins,
  slideMinxins,
  getUserInfoMixins
}
