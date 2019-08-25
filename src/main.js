// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

 // import './assets/js/appback'
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import 'babel-polyfill'
import store from './store'
import VMessage from './components/messageBox'
import './assets/css/index.less'
import FastClick from 'fastclick'
FastClick.attach(document.body)
import VueLoay from 'vue-lazyload';
import Mui from 'vue-awesome-mui'
Vue.use(VueLoay, {
  loading: "/static/image/preloading.jpg",
  error:"/static/image/preloading.jpg",
  try: 3 // default 1
})

Vue.use(VMessage)
Vue.use(Mui)
axios.defaults.baseURL = 'xxxx'; //获取接口+qq384434682
axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem("token");
    if (token) {
      // JWT的认证头部信息+qq384434682

    }
    return config;
  },
  err => {
    return Promise.reject(err);
  });

// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 404:
          store.commit('set_isToken',true)
          break;
        case 401:
          store.commit('set_isToken', true)
          break;
      }
    }
    return Promise.reject(error.response)
  });
  // import Vconsole from 'vconsole';
  // let vConsole=new Vconsole();
  // export default vConsole
Vue.prototype.$http = axios;
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
