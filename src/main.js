// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import VuePhotoZoomPro from 'vue-photo-zoom-pro'
import products from '../static/products'

import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(ElementUI)
Vue.use(VuePhotoZoomPro)
/* eslint-disable no-new */
const store = new Vuex.Store({
  state: {
    username: window.localStorage.getItem('username'),
    loginStatus: !!window.localStorage.getItem('loginStatus'),
    productList: [],
    cartList: [],
    userList: []
  },
  mutations: {
    setProductList (state, data) {
      state.productList = data
    },
    addCart (state, id) {
      const isAdded = state.cartList.find(item => item.id === id)
      // 如果不存在设置购物车为1，存在count++
      if (isAdded) {
        isAdded.count++
      } else {
        state.cartList.push({
          id: id,
          count: 1
        })
      }
    },
    // // 修改购物车商品数量
    // editCartCount (state, payload) {
    //   const product = state.cartList.findIndex(item => item.id === payload.id)
    //     alert(product)
    //   product.count += payload.count
    // },
    // 删除购物车商品
    // deleteCart (state, id) {
    //   const index = state.cartList.findIndex(item => item.id === id)
    //   state.cartList.splice(index, 1)
    //     window.localStorage.setItem('productList',JSON.stringify(state.cartList))
    // },
    // 清空购物车
    emptyCart (state) {
      state.cartList = []
      window.localStorage.setItem('productList', JSON.stringify(state.cartList))
    },
    getUser (state, username) {
      console.log('username', username)
      state.username = username
    },
    getLoginStatus (state, flag) {
      state.loginStatus = flag
    }
  },
  actions: {
    // 异步请求商品列表，暂且使用setTimeout
    getProductList (context) {
      setTimeout(() => {
        context.commit('setProductList', products)
      }, 500)
    },
    // 购买
    buy (context) {
      return new Promise(resolve => {
        setTimeout(() => {
          context.commit('emptyCart')
          resolve()
        }, 500)
      })
    }
  }
})

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
