<template>
    <div>
        <ShortcutBar/>
        <SearchArea/>
    </div>
</template>

<script>
import ShortcutBar from './ShortcutBar'
import SearchArea from './SearchArea'
export default {
  name: 'AppHeader',
  components: {
    ShortcutBar,
    SearchArea
  }
}
</script>

<style scoped>

</style>
