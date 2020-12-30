<template>
    <div id="main-view">
        <div class="container">
            <div class="main-screen">
                <SlideMainView/>
            </div>
            <SideBar/>
        </div>
    </div>
</template>

<script>
import SideBar from './SideBar'
import SlideMainView from './SlideMainView'

export default {
  name: 'MainView',
  components: {
    SideBar,
    SlideMainView
  },
  data () {
    return {
      goodServiceInfo: {}
    }
  }
}
</script>

<style scoped>
#main-view {
    box-sizing: border-box;
    width: 100%;
    height: 420px;
    background-size: 2100px; /* 这里不写百分比 */
    /*背景图片居中*/
    background: url('../assets/main-view/main-view-bg.png') no-repeat 50% 0%;
    margin-top: 30px;
}
#main-view .container {
    box-sizing: border-box;
    width: 1200px;
    height: 100%;
    margin: 0 auto;
    /*border: 1px solid green;*/
    position: relative;
    box-shadow: 0px 8px 20px #999;
}
#main-view .container .top-bar .topic-nav li {
    float: left;
    color: #424242;
    /*background-color: red;*/
    height: 20px;
    line-height: 20px;
    padding: 5px 20px;
    margin: 5px 0;
}
#main-view .container .top-bar .topic-nav li:hover {
    background-color: rgba(18, 171, 52, 0.9);
    cursor: pointer;
    border-radius: 15px;
}
#main-view .container .top-bar .topic-nav li a {
    color: #12ab34;
}
#main-view .container .top-bar .topic-nav li:hover a {
    color: #fff;
}
#main-view .container .main-screen {
    width: 914px;
    height: 420px;
    position: absolute;
    top: 0px;
    left: 15%;
}
</style>
