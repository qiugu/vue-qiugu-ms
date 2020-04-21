<template>
  <el-container class="layout-container">
    <el-aside :width="isCollapse">
      <SideBar/>
    </el-aside>
    <el-container>
      <el-header :height="headerWidth">
        <TopBar/>
        <Tags v-if="tagsVisible"/>
      </el-header>
      <el-main class="page-content">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive" class="page-component-wrap animated fadeIn"/>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive" class="page-component-wrap animated fadeIn"/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// @ is an alias to /src
import TopBar from '../header/TopBar'
import SideBar from '../sidebar/SideBar'
import Tags from '../tag/Tags'

export default {
  name: 'layout',
  components: {
    TopBar,
    SideBar,
    Tags
  },
  data () {
    return {
      tagsVisible: true
    }
  },
  computed: {
    isCollapse () {
      return this.$store.state.isCollapse ? '64px' : '256px'
    },
    headerWidth () {
      return this.tagsVisible ? '90px' : '60px'
    }
  }
}
</script>

<style lang="scss">
.layout-container {
  height: 100%;
  .page-content {
    background-color: #f0f2f5;
  }
}
.el-menu-item [class^='el-icon-'] {
  vertical-align: middle;
  color: #ddd;
}
.el-submenu [class^='el-icon-'] {
  color: #ddd;
}
.el-submenu__title i {
  vertical-align: middle;
  color: #ddd;
}
</style>
