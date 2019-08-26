<template>
  <div class="dynamic">
    <div class="card">
      <div class="head">
        <div class="left">
          <div class="img">
            <img :src="userList.photoImg" alt="">
          </div>

        </div>
        <div class="right">
          <h1 class="name">{{userList.user}}</h1>
          <p>{{userList.online?'在线':'离线'}}</p>
        </div>
      </div>
      <div class="bottom">
        <p>{{userList.autograph}}</p>
      </div>
    </div>
    <ul>
      <li>
        <div class="left">前端技术</div>
        <div class="right">Vue+socket+better-scroll</div>
      </li>
      <li>
        <div class="left">后端技术</div>
        <div class="right">Koa2+Mongodb+token</div>
      </li>
      <li>
        <div class="left">服务器部署</div>
        <div class="right">linux+nginx+Mongodb</div>
      </li>
    </ul>
    <div class="speack">
      <p>该项目只能作为个人练习项目,该项目由田先生所创，未经同意禁止作为商业和个人项目，禁止他人非法盗卖，违者必究...</p>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex';
export default {
  computed:{
    ...mapState(['userList'])
  }
}
</script>
<style lang="less" scoped>
  @import "../assets/css/variable.less";
  .dynamic{
    margin-top: 20px;
    .card{
      width: 100%;
      box-shadow: 0 0 8px rgba(0,0,0,0.2);
      padding:15px 25px;
      box-sizing: border-box;
      border-radius: 10px;

      .head{
        display: flex;
        flex-flow: row nowrap;
        .left{
          width: 82px;
          height: 82px;
          flex: 0 0 82px;
          border-radius: 50%;

          border: 1px solid @bg-color;
          overflow: hidden;
          position: relative;
          .img{
            width: 70px;
            height: 70px;
            overflow: hidden;
            border-radius: 50%;
            position: absolute;
            left: 50%;
            top: 50%;
            -webkit-transform: translate(-50%, -50%);
            -moz-transform: translate(-50%, -50%);
            -ms-transform: translate(-50%, -50%);
            -o-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
          }
        }
        .right{
          flex: 1;
          margin-left: 20px;
          margin-top: 20px;
          h1{
            font-weight: bold;
            font-size: 20px;
          }
          p{
            margin-top: 10px;
          }
        }
      }
      .bottom{
        margin-top: 10px;
        text-align: center;
        p{
          font-size: 12px;
          line-height: 18px;
          text-align: left;
        }
      }

    }
    ul{
      margin-top: 20px;
      padding: 0 20px;
      li{
        height: 40px;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #eee;
        font-size: 14px;
        .left{
          color: #666;
          font-weight: bold;
        }
        .right{
          color: #999;
        }
      }
    }
    .speack{
      margin-top: 20px;
      color: #999999;
      font-size: 14px;
      text-align: left;
      line-height: 20px;
    }
  }

</style>
