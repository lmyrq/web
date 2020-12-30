<template>
    <div>
        <AppHeader/>
        <MainView/>
        <GoodFresh/>
        <AppFooter/>
    </div>
</template>

<script>
import AppHeader from './AppHeader'
import MainView from './MainView'
import GoodFresh from './GoodFresh'
import AppFooter from './AppFooter'

export default {
  name: 'Home',
  components: {
    AppFooter,
    GoodFresh,
    AppHeader,
    MainView
  }
}
</script>

<style scoped>

</style>
