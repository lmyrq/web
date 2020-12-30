<template>
    <div class="block">
        <el-carousel trigger="click" height="420px">
            <el-carousel-item v-for="image in slideContent">
                <img :src="getSlideImgPath(image.name)">
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
export default {
  name: 'SlideMainView',
  data () {
    return {
      slideContent: [
        {
          index: 0,
          name: '1.jpg'
        },
        {
          index: 1,
          name: '2.jpg'
        },
        {
          index: 2,
          name: '3.jpg'
        },
        {
          index: 3,
          name: '4.jpg'
        }
      ]
    }
  },
  methods: {
    getSlideImgPath: function (name) {
      return require('../assets/main-view/' + name)
    }
  }
}
</script>

<style scoped>
    img{
        display: inline-block; width: 100%; max-width: 100%; height: auto;
    }
</style>
