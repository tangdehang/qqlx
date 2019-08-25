export function getRect(el) {
  if (el instanceof window.SVGElement) {
    let rect = el.getBoundingClientRect()
    return {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height
    }
  } else {
    return {
      top: el.offsetTop,
      left: el.offsetLeft,
      width: el.offsetWidth,
      height: el.offsetHeight
    }
  }
}

export function getChatId(userId, targetId) {
  return [userId, targetId].sort().join('_')
}

export function getLast(arr) {
  return arr[arr.length - 1]
}
export function hasClass(el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}

export function addClass(el, className) {
  if (hasClass(el, className)) {
    return
  }

  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}

export function face() {
  let emoji = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 '
    .split(' ')
    .filter(v => v)
    .map(v => ({ text: v }))
  let b=[]
  for(let i=0;i<emoji.length;i++){
    if(i%21===0){
      b.push(emoji.slice(i,i+21))
    }
  }
  return b
}

export function beforedate(dateAt) {
  let nowdate = new Date().getTime()+62*1000;
  let olddate = new Date(dateAt).valueOf()
  let date = Math.floor((nowdate - olddate) / 1000);
  let s = date % 60;
  let m = Math.floor(date / 60)
  let h = Math.floor(date / 3600)
  let d = Math.floor(date / 3600 / 24)
  if (d > 0) {
    return d + '天前'
  } else if (h > 0) {
    return h + '小时前'
  } else if (m > 0) {
    return m + '分钟前'
  } else {
    return s + '秒前'
  }
}

 export function debounce(func, delay) {
  let timer = null;
  // 返回一个新的函数
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
export function findIndex(arr,chatId) {
  let n=-1;
  arr.forEach((k,index)=>{
    k.forEach(item=>{
      if(item.chatId==chatId){
        n=index;
      }
    })
  })
  return n;
}
