<template>
  <div class="login" ref="login">
    <div class="top-bar"></div>
    <div class="head">
      <img src="../../static/image/loginbg.jpg" alt>
    </div>
    <div class="input">
      <div class="user textInput">
        <div class="icon">
          <i class="icon---"></i>
        </div>
        <input type="text" v-model="user" placeholder="请输入用户名">
      </div>
      <div class="passwd textInput">
        <div class="icon">
          <i class="icon-6"></i>
        </div>
        <input type="password" v-model="passwd" placeholder="请输入密码">
      </div>
    </div>
    <div class="resignlist" @click="login">登录</div>
    <div class="forget">
      <span>注册</span>
      <i></i>
      <span>忘记密码?</span>
    </div>
  </div>
</template>
<script>
  import {mapMutations} from "vuex";
  export default {
    mounted() {
      this.$nextTick(()=>{
        this.onresize();
      })
    },
    data() {
      return {
        user: "",
        passwd: ""
      };
    },
    methods: {
      ...mapMutations(["set_users"]),
      login() {
        if (!this.user.trim() || !this.passwd.trim()) {
          this.$message.info('用户名和密码不能为空')
          return;
        }
        this.$http
          .post("/login", {user: this.user, passwd: this.passwd})
          .then(res => {
            if (res.data.code) {
              this.set_users(res.data.list);
              localStorage.setItem("token", res.data.token);
              this.$router.push("/news");
              this.user = "";
              this.passwd = "";
            }
            this.$message.info(res.data.message)
          });
      },
      onresize() {
        let innerHeight = window.innerHeight;
        window.addEventListener("resize", () => {
          let thisInner = window.innerHeight;
          if (innerHeight - thisInner > 50) {
            setTimeout(() => {
              this.$refs.login.style.top = "-50px";
            }, 20);
          } else {
            this.$refs.login.style.top = "0px";
          }
        });
      }
    }
  };
</script>
<style lang="less" scoped>
  @import "../assets/css/variable.less";
  @import "../assets/css/mixin.less";

  .login {
    .head {
      width: 100%;
      img {
        width: 100%;
        height: 100%;
        display: inline-block;
        vertical-align: top;
      }
    }

    .input {
      margin-top: 100/2px;
      padding: 0 105/2px;
      height: 213/2px;
      overflow: hidden;
      display: flex;
      flex-flow: column nowrap;
      justify-content: space-between;
      align-items: center;
      font-size: 0;

      .textInput {
        width: 100%;
        height: 82/2px;
        border: 1px solid @bg-color;
        -webkit-border-radius: ;
        -moz-border-radius: ;
        border-radius: 50/2px;
        background: #ffffff;
        display: flex;
        flex-flow: row nowrap;
        overflow: hidden;

        input {
          display: inline-block;
          flex: 1;
          color: #333;
          .no-wrap();
          font-size: 14px;
        }

        input::placeholder {
          color: @bg-color;
        }

        .icon {
          width: 116/2px;
          height: 100%;
          line-height: 82/2px;
          text-align: center;
          vertical-align: bottom;
          flex: 0 0 116/2px;
        }

        i {
          display: inline-block;
          vertical-align: middle;
          font-size: 42/2px;
          color: @bg-color;
        }
      }
    }

    .resignlist {
      margin: 63/2px auto 33/2px;
      width: 544/2px;
      height: 83/2px;
      background: @bg-color;
      line-height: 83/2px;
      text-align: center;
      color: #ffffff;
      border-radius: 100/2px;
      font-size: 40/2px;
      letter-spacing: 5px;
      box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.3)
    }

    .forget {
      height: 31/2px;
      line-height: 31/2px;
      color: @bg-color;
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      align-items: center;
      margin-bottom: 70/2px;

      span {
        display: inline-block;
      }

      i {
        display: inline-block;
        width: 1px;
        height: 100%;
        background: @bg-color;
        margin: 0 40/2px;
      }
    }

    .list {
      width: 100%;
      height: 90/2px;
      text-align: center;
      font-size: 0;

      i {
        display: inline-block;
        font-size: 70/2px;
        color: @resign-icon;
        margin-right: 44/2px;
      }

      i:last-child {
        margin-right: 0;
      }
    }
  }
</style>
