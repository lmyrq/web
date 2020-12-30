<template>
    <div class="shortcut-bar">
        <template>
            <div class="container" v-if="!show()">
                <span class="welcome">欢迎来到每日生鲜！</span>
                <ul class="right-part">
                    <router-link :to="{name: 'Login'}">[登录]</router-link>
                </ul>
            </div>
        </template>
        <template>
            <div class="container" v-if="show()">
                <span class="welcome">欢迎来到每日生鲜！</span>
                <ul class="right-part">
                    <span>用户：{{user}}</span>
                    <span @click="logOut()" style="cursor: pointer">[注销]</span>
                    <router-link :to="{name: 'ShoppingCar'}">[购物车]</router-link>
                </ul>
            </div>
        </template>
    </div>
</template>

<script>
export default {
  name: 'ShortcutBar',
  data () {
    return {
      user: this.$store.state.username
    }
  },
  methods: {
    show: function () {
      return this.$store.state.loginStatus
    },
    logOut: function () {
      this.$store.state.loginStatus = ''
      window.localStorage.removeItem('loginStatus')
    }
  }
}
</script>

<style scoped>
    .shortcut-bar {
        width: 100%;
        background-color: #efefef;
        font-size: 13px;
    }
    .shortcut-bar .container {
        width: 1200px;
        height: 30px;
        line-height: 30px;
        margin: 0 auto;
        position: relative;
    }
    .shortcut-bar .welcome {
        display: inline-block;
        height: 30px;
        vertical-align: 12px;
    }
    .shortcut-bar .right-part {
        display: inline-block;
        float: right;
        margin-top: 0px;
    }
    a {
        text-decoration: none;
        color: black;
    }
</style>
