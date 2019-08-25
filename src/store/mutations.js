import {getChatId, getLast} from "../assets/js/util";
import {findIndex} from '../assets/js/util'
export default {
    set_isToken(state,val){
      state.isToken=val
    },

    // 獲取群聊數據
    set_roomGropItem(state, list) {
      state.roomGropItem = list
    },
  set_roomGropItem_send(state, val) {
    state.roomGropItem.unshift(...val)
  },


    // 單人聊天
    set_usersList(state, obj) {
      state.users = obj
    },
    set_personItem(state,obj){
      state.personItem=obj
    },
       set_users(state, val) {
      state.userList = val;
    },

    set_messageList(state, val) {
      if (!val.length){
        state.messageList = []
        return;
      }
      state.messageList = val
    },
    set_roomItem(state, id) {
      let chatId = getChatId(id, state.userList._id)
      let messageList=state.messageList
      let index=findIndex(messageList,chatId)
      if(index!=-1){
        state.roomItem = messageList[index]
      }else{
        state.roomItem=[]
      }
    },
    set_roomItem_val(state, val) {
      if(val.chatId==state.allowRoom){
        state.roomItem.push(val)
      }
    },
  set_roomItem_send(state, val) {
    state.roomItem.unshift(...val)
  },
    set_roomUser(state, item) {
      state.roomUser = item
    },
    set_showErr(state, val) {
      state.showErr = val
    },
    set_personList(state, val) {
      state.personList = val
    },
    // 上传图片参数
    set_uploadImg(state, val) {
      state.uploadImg = val;
    },
    set_uploadErr(state, val) {
      state.uploadErr=val
    },
  set_allowRoom(state,val){
      state.allowRoom=val;
  }
}
