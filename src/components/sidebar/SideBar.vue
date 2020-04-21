<template>
  <div class="sidebar-wrap" :class="{ collapsed: toggleSideBar }">
    <div class="logo rythm twist1">
      <img v-show="!toggleSideBar" src="@/assets/logo.png" style="height: 32px;margin-right: 10px;" alt="logo">
      <span>{{ toggleSideBar ? 'VUE' : 'AUTO VUE' }}</span>
    </div>
    <el-menu
      background-color="#001529"
      text-color="#ddd"
      :default-active="$route.path"
      :router="isRouter"
      :unique-opened="true"
      mode="vertical"
      :collapse="toggleSideBar"
    >
      <template v-for="item in menu">
        <el-submenu
          v-if="item.children.length !== 0"
          :index="item.router"
          :key="item.router"
        >
          <template slot="title">
            <i :class="item.icon"></i>
            <span slot="title">{{
              langType === "en" ? item.name_en : item.name
            }}</span>
          </template>
          <el-menu-item
            v-for="child in item.children"
            :index="child.router"
            :key="child.router"
          >
            <i :class="child.icon"></i>
            <span slot="title">{{
              langType === "en" ? child.name_en : child.name
            }}</span>
          </el-menu-item>
        </el-submenu>

        <el-menu-item v-else :index="item.router" :key="item.router">
          <i :class="item.icon"></i>
          <span slot="title">{{
            langType === "en" ? item.name_en : item.name
          }}</span>
        </el-menu-item>
      </template>
    </el-menu>

    <div class="animated bounceInDown imgWrap">
      <img
        src="@/assets/little.gif"
        height="60px"
        class="gif rythm pulse3"
        @click="toggleDance"
      />
    </div>
  </div>
</template>

<script>
import Rythm from 'rythm.js'
import music from '../../assets/langlangago.mp3'
import bus from '../../plugins/bus'
import mixins from '@/components/mixins'
const rythm = new Rythm()

export default {
  name: 'sidebar',
  mixins: [mixins],
  data () {
    return {
      isMusicOn: false,
      isRouter: true
    }
  },
  computed: {
    toggleSideBar () {
      return this.$store.state.isCollapse
    },
    langType () {
      return this.$i18n.locale
    }
  },
  created () {
    this.initRythm()
    bus.$on('stopMusic', () => {
      this.isMusicOn = false
      rythm.stop()
    })
  },
  methods: {
    initRythm () {
      rythm.setMusic(music)
      rythm.addRythm('twist1', 'twist', 0, 10)
      rythm.addRythm('pulse3', 'pulse', 0, 10, {
        min: 0.75,
        max: 1.5
      })
    },
    toggleDance () {
      if (this.isMusicOn) {
        this.isMusicOn = false
        rythm.stop()
      } else {
        this.isMusicOn = true
        rythm.start()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar-wrap {
  width: 256px;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 5;
  &.collapsed {
    width: 64px;
  }
  .logo {
    color: #fff;
    text-align: center;
    background: #001529;
    padding: 18px 0;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .el-menu {
    height: 100%;
    width: 100%;
  }
  .el-submenu .el-menu-item {
    padding: 0 20px;
    min-width: 160px;
  }
  .rythm.twist1 {
    height: 60px;
    box-sizing: border-box;
  }
  .imgWrap {
    text-align: center;
    position: absolute;
    bottom: 30px;
    width: 100%;
  }
  .imgWrap .gif {
    width: 60px;
    height: 60px;
    border-radius: 30px;
  }
  .imgWrap .gif:hover {
    cursor: pointer;
  }
}
</style>
