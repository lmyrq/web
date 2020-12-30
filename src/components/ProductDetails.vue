<template>
    <div class="product-details">
        <AppHeader/>
        <div class="category-wrapper">
            <div class="category">水果 > {{ productInfo.name }} > 商品详情 </div>
        </div>
        <div class="main-area">
            <div class="img-area">
                <!--<img :src="getProductImgPath(productInfo.imgName)">-->
                <vue-photo-zoom-pro :url="getProductImgPath(productInfo.imgName)"></vue-photo-zoom-pro>
            </div>
            <div class="product-info">
                <div class="title">
                    <span class="company-name">{{productInfo.brand}}</span>
                    <span class="name">{{productInfo.desc}}</span>
                </div>
                <div class="main-details">
                    <div>
                        价格
                        <span class="price">￥{{ productInfo.price1 }}</span>
                        <span class="price-lowering-inform">降价通知</span>
                    </div>
                    <div>
                        累计评论 <span class="comment-num">{{ productInfo.commentNum }}</span>
                    </div>
                    <div>
                        优惠券
                        <span v-for="discount in discounts" class="discount">{{ discount }}</span>
                        <span class="more-discount">更多>></span>
                    </div>
                    <div>规格 <span class="weight">{{ productInfo.specification }}</span></div>
                    <div>
                        发货地 <span class="delivery-address">常熟理工学院<span class="down-arrow"></span></span>
                        <span class="in-stock">有货</span>
                        <span>在线支付免运费</span>
                        <br>
                        <span class="arrival-time">由 <span class="company">{{productInfo.brand}}</span> 发货, 并提供售后服务，23:00前下单,预计明天发货</span>
                    </div>
                </div>
                <div class="operation">
                    <div class="product-num">
                        <span class="subtract" :class="{inactive: productNum==1}" @click="addProductNum(false)">-</span>
                        <input type="text" name="" class="number" v-model="productNum">
                        <span class="add" @click="addProductNum(true)">+</span>
                    </div>
                    <div class="add-to-shopping-cart" @click="handleAddCart">加入购物车</div>
                    <div class="buy-now">立即购买</div>
                </div>
            </div>
        </div>
        <AppFooter/>
    </div>
</template>

<script>
import AppHeader from './AppHeader'
import AppFooter from './AppFooter'
import products from '../../static/products'

export default {
  name: 'ProductDetails',
  components: {
    AppHeader,
    AppFooter
  },
  data () {
    return {
      allProducts: products,
      productNum: 1,
      discounts: ['满50减5', '满99减20', '满199减50', '满299减100']
    }
  },
  methods: {
    getProductInfo: function (id) {
      return this.allProducts[id - 1]
    },
    getProductImgPath: function (name) {
      return require('../assets/product-images/' + name)
    },
    addProductNum: function (bool) {
      if (bool) {
        this.productNum++
      } else if (!bool && this.productNum > 1) {
        this.productNum--
      }
    },
    handleAddCart () {
      if (this.$store.state.loginStatus) {
        alert('添加成功')
        this.$store.commit('addCart', this.$route.params.id)
        window.localStorage.setItem('productList', JSON.stringify(this.$store.state.cartList))
      } else {
        alert('请先登录')
        window.location.href = '/Login#/Login'
      }
    }
  },
  computed: {
    productInfo: function () {
      return this.getProductInfo(this.$route.params.id)
    }
  }
}
</script>

<style scoped>
    /* 组件的最外层标签 */
    .product-details {
        width: 100%;
        font-size: 14px;
    }
    /* 分类栏 */
    .product-details .category-wrapper {
        width: 100%;
        background: #eee;
    }
    .product-details .category-wrapper .category {
        width: 1200px;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        margin: 20px auto 0;
    }
    /* 主要信息 */
    .product-details .main-area {
        width: 1200px;
        margin: 10px auto 0;
        position: relative;
    }
    .product-details .main-area::after {
        content: '';
        display: block;
        clear: both;
    }
    /* 商品图片 */
    .product-details .main-area .img-area {
        width: 320px;
        height: 320px;
        float: left;
        border: 1px gray solid;
    }
    .product-details .main-area .img-area img {
        width: 320px;
        height: 320px;
        box-sizing: border-box;
        border: 1px solid #eee;
        /*box-shadow: 0px 0px 10px rgba(0,0,0,0.2);*/

    }
    /* 商品信息1 */
    .product-details .main-area .product-info {
        width: 680px;
        min-height: 360px;
        float: left;
        box-sizing: border-box;
        /*border: 1px solid green;*/
        padding: 0px 30px;
    }
    .product-details .main-area .product-info .title {
        height: 40px;
        line-height: 40px;
    }
    .product-details .main-area .product-info .title .company-name {
        font-size: 14px;
        padding: 2px;
        background-color: #ef1234;
        color: #fff;
        vertical-align: 1px;
        border-radius: 2px;
    }
    .product-details .main-area .product-info .title .name {
        /*display: inline-block;*/
        overflow: hidden;
        font-size: 16px;
        font-weight: bold;
    }
    /* 主要细节 */
    .product-details .main-area .product-info .main-details {
        font-size: 12px;
        color: #666;
        position: relative;
        width: 620px;
        min-height: 100px;
        background: rgba(238,238,238,0.5);
        box-sizing: border-box;
        padding: 0 10px 35px 10px;
    }
    .product-details .main-area .product-info .main-details>div {
        height: 36px;
        line-height: 36px;
        /*background: red;*/
        box-sizing: border-box;
        /*border: 1px solid red;*/
    }
    /* 价格 */
    .product-details .main-area .product-info .main-details .price {
        color: #ef1234;
        font-size: 22px;
        padding: 0 10px;
        vertical-align: -3px;
    }
    .product-details .main-area .product-info .main-details .price-lowering-inform {
        cursor: pointer;
        color: #1234ab;
    }
    .product-details .main-area .product-info .main-details .price-lowering-inform:hover {
        color: #ef1234;
    }
    /* 累积评论 */
    .product-details .main-area .product-info .main-details .comment-num {
        color: #1234ab;
        font-size: 16px;
        padding: 0 10px;
    }
    .product-details .main-area .product-info .main-details .discount {
        border: 1px solid #ef1234;
        padding: 3px 15px;
        margin: 0 5px;
        color: #ef1234;
        border-radius: 2px;
        background: rgba(255,0,0,0.1);
    }
    .product-details .main-area .product-info .main-details .discount:hover {
        cursor: pointer;
        background: #fff;
    }
    .product-details .main-area .product-info .main-details .more-discount:hover {
        cursor: pointer;
        color: #ef1234;
    }
    /* 重量 */
    .product-details .main-area .product-info .main-details .weight {
        color: #424242;
        font-size: 13px;
        padding: 0 10px;
        /*background: red;*/
    }
    /* 地址 */
    .product-details .main-area .product-info .main-details .delivery-address {
        border: 1px solid #ccc;
        padding: 5px;
        margin: 0 10px;
    }
    .product-details .main-area .product-info .main-details .in-stock {
        /*color: #424242;*/
        /*font-size: 14px;*/
        font-weight: 600;
    }
    .product-details .main-area .product-info .main-details .arrival-time {
        margin-left: 50px;
        /*line-height: 30px;*/
    }
    .product-details .main-area .product-info .main-details .arrival-time .company {
        color: #ef1234;
    }
    /* 操作 */
    .product-details .main-area .product-info .operation::after {
        content: '';
        display: block;
        clear: both;
    }
    .product-details .main-area .product-info .operation {
        /*margin-top: 10px;*/
        padding-top: 20px;
    }

    /* 商品数量 */
    .product-details .main-area .product-info .operation .product-num {
        float: left;
        width: 120px;
        height: 30px;
        border: 1px solid #ccc;
        position: relative;
        /*display: */
        /*box-sizing: border-box;*/
    }
    .product-details .main-area .product-info .operation .product-num>* {
        position: absolute;
        top: 0;
        text-align: center;
        width: 25%;
        height: 30px;
        line-height: 30px;
        background-color: #eee;
        font-size: 20px;
        border: none;
    }
    .product-details .main-area .product-info .operation .product-num .add {
        left: 90px;
        cursor: pointer;
    }
    .product-details .main-area .product-info .operation .product-num .subtract {
        cursor: pointer;
    }
    .product-details .main-area .product-info .operation .product-num span.inactive {
        cursor: default;
        color: #ccc;
    }
    .product-details .main-area .product-info .operation .product-num .number {
        left: 30px;
        width: 50%;
        box-sizing: border-box;
        border-left: 1px solid #ccc;
        border-right: 1px solid #ccc;
        background-color: #fff;
        outline: none;
        font-size: 16px;
    }
    /* 加入购物车/立即下单 */
    .product-details .main-area .product-info .operation>div:nth-child(n+2) {
        float: left;
        display: inline-block;
        height: 32px;
        width: 120px;
        line-height: 32px;
        text-align: center;
        margin-left: 20px;
        background-color: #ef1234;
        color: #fff;
        font-size: 16px;
        font-weight: bold;
    }
    .product-details .main-area .product-info .operation>div:nth-child(n+2):hover {
        box-shadow: 0px 0px 10px rgba(0,0,0,0.5);
        cursor: pointer;
    }

    .product-details .main-area .recommendation>p {
        height: 30px;
        line-height: 30px;
        text-align: center;
        font-weight: bold;
        color: #666;
    }
    .product-details .main-area .recommendation>ul {
        /*height: 300px;*/
    }
    .product-details .main-area .recommendation>ul li {
        height: 160px;
        box-sizing: border-box;
        /*border: 1px solid red;*/
        padding-top: 10px;
        position: relative;
        /*margin-bottom: 10px;*/
    }
    .product-details .main-area .recommendation>ul li .recom-product-img img {
        width: 120px;
        height: 120px;
    }
    .product-details .main-area .recommendation>ul li:hover {
        /*margin-top: 2px;*/
        box-shadow: 0px 0px 10px rgba(0,0,0,0.2);
        cursor: pointer;
        color: #ef1234;
    }
    .product-details .main-area .recommendation>ul li>div:nth-child(n+2) {
        position: absolute;
        left: 40px;
        bottom: 10px;
        height: 20px;
        line-height: 20px;
        font-size: 12px;
        width: 120px;
        overflow: hidden;
        text-align: center;
        /*background-color: red;*/
        background-color: rgba(255,255,255,0.8);
    }
    .product-details .other-info .hot-sale .title {
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 16px;
        font-weight: bold;
        background: rgba(238,238,238,0.5);
        box-sizing: border-box;
        border-bottom: 1px solid #ddd;
    }
    .product-details .other-info .hot-sale ul li {
        /*background-color: */
        width: 220px;
        height: 200px;
        box-sizing: border-box;
        border-bottom: 1px solid #ddd;
        cursor: pointer;
        position: relative;
    }
    .product-details .other-info .hot-sale ul li:hover {
        /*box-shadow: 0px 0px 10px rgba(0,0,0,0.2);*/
    }
    .product-details .other-info .hot-sale ul li:last-child {
        border: none;
    }
    .product-details .other-info .hot-sale ul li>.recom-product-img img {
        width: 100%;
    }
</style>
