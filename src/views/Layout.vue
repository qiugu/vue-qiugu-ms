<template>
  <div class="wrapper">
    <SideBar/>
    <div class="con-wrap" :class="{conCollapse: isCollapse}">
      <TopBar/>
      <Tags/>
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive" class="page-component-wrap animated fadeIn"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive" class="page-component-wrap animated fadeIn"></router-view>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import TopBar from '../components/TopBar'
import SideBar from '../components/SideBar'
import Tags from '../components/Tags'

export default {
  name: 'layout',
  components: {
    TopBar,
    SideBar,
    Tags
  },
  computed: {
    isCollapse () {
      return this.$store.state.isCollapse
    }
  }
}
</script>

<style>
  .wrapper {
    width: 100%;
    height: 100%;
  }
  .page-component-wrap {
    padding: 15px;
    background: #f0f0f0;
    height: calc(100% - 120px);
    position: relative;
  }
</style>
