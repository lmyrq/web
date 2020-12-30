<template>
    <div class="search-area">
        <div class="container">
            <router-link class="logo" :to="{name: 'home'}" tag="span"></router-link>
            <div class="search-box">
                <form class="search">
                    <!--<label class=""><input type="text" value="西班牙 进口脐橙" v-model="searchData"><span>搜索</span></label>-->
                    <label class="" v-if="id==0"><input type="text" value="葡萄" v-model="searchData">
                        <router-link :to="{name:'home',params: {id:id}}">
                            <span @click="search(searchData)">搜索</span>
                        </router-link>
                    </label>
                    <label class="" v-if="id!=0"><input type="text" value="葡萄" v-model="searchData">
                        <router-link :to="{name:'ProductDetails',params: {id:id}}">
                            <span @click="search(searchData)">搜索</span>
                        </router-link>
                    </label>
                </form>
                <p class="hot-search">
                    <router-link v-for="id in hotSearchIds" :to="{name: 'ProductDetails', params: {id:id}}" tag="span">
                        {{ getProductInfo(id).name }}
                    </router-link>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import products from '../../static/products'

export default {
  name: 'SearchArea',
  data () {
    return {
      allProducts: products,
      hotSearchIds: [3, 4, 6, 13, 15, 22, 27, 30, 33, 39, 42, 44],
      searchData: '',
      id: 0
    }
  },
  methods: {
    getProductInfo: function (id) {
      return this.allProducts[id - 1]
    },
    search (name) {
        const sid=[]
      const index = this.allProducts.findIndex(item => item.name.includes(name))
        for (let i in this.allProducts){
            if (this.allProducts[i].name.includes(name)){
                sid.push(i)
            }
        }
        for (let i in sid){
            alert(sid[i])
        }
      this.id = index + 1
      if (this.id === 0) {
        alert('查无此商品')
      }
    }
  }
}
</script>

<style scoped>
    /*搜索区域 */
    .search-area {
        width: 100%;
        height: 80px;
        line-height: 80px;
        background-color: #fff;
    }
    .search-area .container {
        width: 1200px;
        margin: 0 auto;
        position: relative;
    }
    .search-area .logo {
        position: absolute;
        height: 49px;
        width: 180px;
        top: 15px;
        background: url('../assets/main-view/logo1.png') no-repeat;
        background-size: 180px 49px;
        cursor: pointer;
    }
    /* 搜索框区域 */
    .search-area .search-box {
        position: absolute;
        width: 600px;
        height: 80px;
        left: 300px;
    }
    /* 热搜 */
    .search-area .search-box .hot-search {
        font-size: 13px;
        color: #999;
        height: 0px;
        line-height: 20px;
        position: absolute;
        bottom: 3px;
        margin-left: 0px;
    }
    .search-area .search-box .hot-search span {
        margin: 0 3px;
    }
    .search-area .search-box .hot-search span:hover {
        cursor: pointer;
        color: #129934;
    }
    /* 搜索框 */
    .search-area .search-box .search input {
        position: absolute;
        top: 20px;
        width: 480px;
        height: 34px;
        outline: none;
        box-sizing: border-box;
        border: 1px solid #12ab34;
        padding: 0 10px;
    }
    .search-area .search-box .search span {
        position: absolute;
        left: 480px;
        top: 20px;
        width: 90px;
        height: 34px;
        line-height: 34px;
        text-align: center;
        border: none;
        background-color: #12ab34;
        color: #fff;
        font-size: 16px;
        outline: none;
        cursor: pointer;
    }
</style>
