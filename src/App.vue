<template>
  <div id="app">
      <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      user: this.$store.state.username
    }
  },
  computed: {
    cartList () {
      return this.$store.state.cartList
    },
    show () {
      return this.$store.state.loginStatus
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #424242;
}
    li{
        list-style: none;
    }
</style>
