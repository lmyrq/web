import Vue from 'vue'
import Router from 'vue-router'

import Home from '../components/Home'
import Login from '../components/Login'
import ProductDetails from '../components/ProductDetails'
import ShoppingCar from '../components/ShoppingCar'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/product-details/:id',
      name: 'ProductDetails',
      component: ProductDetails
    },
    {
      path: '/shopping-car',
      name: 'ShoppingCar',
      component: ShoppingCar
    }
  ]
})
