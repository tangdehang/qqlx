import {clearSearch, saveSearch} from "../assets/js/history";
import axios from 'axios'

const token = localStorage.getItem('token');
axios.defaults.headers.common['Authorization'] = token;
import io from 'socket.io-client'
//const socket = io.connect('ws://localhost:3444')
const socket = io.connect('http://qq.mmys.fun')
export default {
  // 关闭socket
  socketOut() {
    socket.close()
  },
  act_saveSearch({commit, state}, query) {
    commit('set_searchList', saveSearch(query))
  },
  act_clearSearch({commit, state}) {
    commit('set_searchList', clearSearch())
  },
  // 发送退出登录消息
  send_loginOut({
                  commit,
                  state
                }, val) {
    socket.emit("loginOut", val)
  },
  // 发送登录成功消息
  send_loginSuccess({
                      commit,
                      state
                    }, val) {
    socket.emit("loginSuccess", val)
  },

  // 接受登录消息
  send_getloginSuccess({
                         commit,
                         state
                       }, val) {
    socket.on('getloginSuccess', (data) => {
      let list = data.filter(item => {
        return item._id !== state.userList._id
      })
      let item=data.find(item => {
        return item._id === state.userList._id
      })
      commit('set_personList', list)
      commit('set_users',item)
    })
  },

  // 群聊天室
  // 发送消息
  send_groupMessage({
                      commit,
                      state
                    }, val) {
    socket.emit("sendGroupMsg", val)
  },
  // 接受消息
  get_groupMessage({
                     commit,
                     state
                   }) {
    socket.on('getGroupMsg', (data) => {
      state.roomGropItem.push(data)
      commit('set_roomGropItem', state.roomGropItem)
    })
  },

  // 單人聊天
  // 发送消息
  send_message({
                 commit,
                 state
               }, val) {
    socket.emit("sendMsg", val)
  },
  // 接受消息
   get_message({commit,state}) {
    socket.on('recvMsg',async (data) => {
      try{
        commit('set_roomItem_val', data)
        commit('set_showErr', true)
        let item = await getChat();
        commit('set_messageList', item.list)
        commit('set_usersList', item.users)
        if (!item.length) commit('set_showErr', false);
      }catch (e) {
        // commit('set_messageList', [])
      }

    })
  },
  // 获取消息
  async getchatList({commit,state}) {
    try {
      commit('set_showErr', true)
      let item = await getChat();
      commit('set_messageList', item.list)
      commit('set_usersList', item.users)
      if (!item.length) commit('set_showErr', false);
    } catch (e) {
      commit('set_messageList', [])
    }
  },

}

async function getChat() {
  try {
    let res = await axios.post("/chatList");
    if (res.data.code) {
      let list = res.data.lists.map(item => {
        return item.reverse()
      })
      let users = res.data.users
      return {list, users}
    }
  } catch (e) {
    console.log(e)
  }

}
