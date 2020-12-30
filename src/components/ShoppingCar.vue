<template>
    <div>
        <AppHeader/>
        <div class="cart">
            <div>
                <div class="cart-header-title">购物清单</div>
                <div class="cart-header-main">
                    <div class="cart-info">商品信息</div>
                    <div class="cart-price">单价</div>
                    <div class="cart-count">数量</div>
                    <div class="cart-cost">小计</div>
                    <div class="cart-delete">删除</div>
                </div>
            </div>

            <div>
                <div class="cart-content-main" v-for="(item, index) in cartList">
                    <div class="cart-info">
                        <img :src="getProductImgPath(productDictList[item.id].imgName)"/>
                        <span>{{productDictList[item.id].name}}</span>
                    </div>
                    <div class="cart-price">
                        ￥{{productDictList[item.id].price0}}
                    </div>
                    <div class="cart-count">
                    <span class="cart-control-minus"
                          @click="handleCount(index, -1)">-</span>
                        {{item.count}}
                        <span class="cart-control-add"
                              @click="handleCount(index, 1)">+</span>
                    </div>
                    <div class="cart-cost">
                        ￥ {{numFilter(productDictList[item.id].price0 * item.count)}}
                    </div>
                    <div class="cart-delete">
                    <span class="cart-control-delete"
                          @click="handleDelete(index)">删除</span>
                    </div>
                </div>

                <div class="cart-empty" v-if="!cartList.length">购物车为空</div>

                <div class="cart-footer" v-show="cartList.length">
                    <div v-if="!change" class="cart-footer-desc" @mouseenter="change=true" @mouseleave="change=false">
                        收货地址 {{position}}
                    </div>
                    <div v-if="change" class="cart-footer-desc" @mouseenter="change=true" @mouseleave="change=false">
                        收货地址 <input type="text" v-model="position">
                    </div>
                    <div class="cart-footer-desc">
                        共计 <span>{{countAll}}</span>
                    </div>
                    <div class="cart-footer-desc">
                        应付总额 <span>{{numFilter(costAll - promotion)}}</span>
                        <br>
                    </div>
                    <div class="cart-footer-desc">
                        <div class="cart-control-order"
                             @click="handleOrder">现在结算</div>
                    </div>
                </div>

            </div>
        </div>
        <AppFooter/>
    </div>
</template>

<script>
import products from '../../static/products'
import AppHeader from './AppHeader'
import AppFooter from './AppFooter'

export default {
  name: 'ShoppingCar',
  components: {AppFooter, AppHeader},
  data () {
    return {
      promotion: 0,
      promotionCode: '',
      productList: products,
      // 实时更新cartList
      carProductList: JSON.parse(window.localStorage.getItem('productList')),
        position:'常熟理工学院',
        change:false,
    }
  },
  methods: {
    getProductImgPath: function (name) {
      return require('../assets/product-images/' + name)
    },
    handleCount (index, count) {
      // 最小值设置1
      // if (count < 0 && this.cartList[index].count === 1) return
      // this.$store.commit('editCartCount', {
      //   id: this.cartList[index].id,
      //   count: count
      // })

      if (count > 0 || (count < 0 && this.cartList[index].count > 1)) { this.cartList[index].count += count }
    },
    // 保留一位小数
    numFilter (value) {
      const realVal = parseFloat(value).toFixed(1)
      return realVal
    },
    // 根据index查找商品id进行删除
    handleDelete (index) {
      this.$store.state.cartList = JSON.parse(window.localStorage.getItem('productList'))
      this.$store.state.cartList.splice(index, 1)
      window.localStorage.setItem('productList', JSON.stringify(this.$store.state.cartList))
      this.carProductList = JSON.parse(window.localStorage.getItem('productList'))
      // this.$store.commit('deleteCart', this.cartList[index].id)
      //   this.carProductList=JSON.parse(window.localStorage.getItem('productList'))
    },
    // 通知Vuex,完成下单
    handleOrder () {
      this.$store.dispatch('buy').then(() => {
        this.carProductList = JSON.parse(window.localStorage.getItem('productList'))
          window.alert('收货地址:'+ this.position)
        window.alert('购买成功')
      })
    }
  },
  computed: {
    cartList () {
      return this.carProductList
      // return this.$store.state.cartList
    },
    productDictList () {
      const dict = {}
      this.productList.forEach(item => {
        dict[item.id] = item
      })
      return dict
    },
    // 购物车商品总数
    countAll () {
      let count = 0
      this.cartList.forEach(item => {
        count += item.count
      })
      return count
    },
    // 购物车商品总价
    costAll () {
      let cost = 0
      this.cartList.forEach(item => {
        cost += this.productDictList[item.id].price0 * item.count
      })
      return cost
    }
  }
}
</script>

<style scoped>
    .cart{
        margin: 32px;
        background: #fff;
        border: 1px solid #dddee1;
        border-radius: 10px;
    }
    .cart-header-title{
        padding: 16px 32px;
        border-bottom: 1px solid #dddee1;
        border-radius: 10px 10px 0 0;
        background: #f8f8f9;
    }
    .cart-header-main{
        padding: 8px 32px;
        overflow: hidden;
        border-bottom: 1px solid #dddee1;
        background: #eee;
        overflow: hidden;
    }
    .cart-empty{
        text-align: center;
        padding: 32px;
    }
    .cart-header-main div{
        text-align: center;
        float: left;
        font-size: 14px;
    }
    div.cart-info{
        width: 60%;
        text-align: left;
    }
    .cart-price{
        width: 10%;
    }
    .cart-count{
        width: 10%;
    }
    .cart-cost{
        width: 10%;
    }
    .cart-delete {
        width: 10%;
    }
    .cart-content-main{
        padding: 0 32px;
        height: 60px;
        line-height: 60px;
        text-align: center;
        border-bottom: 1px dashed #e9eaec;
        overflow: hidden;
    }
    .cart-content-main div{
        float: left;
    }
    .cart-content-main img{
        width: 40px;
        height: 40px;
        position: relative;
        top: 10px;
    }
    .cart-control-minus,
    .cart-control-add{
        display: inline-block;
        margin: 0 4px;
        width: 24px;
        height: 24px;
        line-height: 22px;
        text-align: center;
        background: #f8f8f9;
        border-radius: 50%;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        cursor: pointer;
    }
    .cart-control-delete{
        cursor: pointer;
        color: #2d8cf0;
    }
    .cart-control-order{
        display: inline-block;
        padding: 8px 32px;
        border-radius: 6px;
        background: #2d8cf0;
        color: #fff;
        cursor: pointer;
    }
    .cart-footer{
        padding: 32px;
        text-align: right;
    }
    .cart-footer-desc{
        display: inline-block;
        padding: 0 16px;
    }
    .cart-footer-desc span{
        color: #f2352e;
        font-size: 20px;
    }
</style>
