<template>
    <div id="sidebar-wrap" :class="{collapsed: toggleSideBar}">
        <h3 class="logo rythm twist1">
            {{toggleSideBar ? 'VUE' : 'AUTO VUE'}}
        </h3>
        <el-menu 
            background-color="#324157" 
            text-color="#ddd" 
            :default-active="$route.path" 
            :router="isRouter"
            :unique-opend="isUnique" 
            mode="vertical" 
            :collapse="toggleSideBar">
            <template v-for="item in menu">
                <el-submenu v-if="item.children.length !== 0" :index="item.router" :key="item.router">
                    <template slot="title">
                        <i :class="item.icon"></i>
                        <span slot="title">{{langType === 'en' ? item.name_en : item.name}}</span>
                    </template>
                    <el-menu-item v-for="child in item.children" :index="child.router" :key="child.router">
                        <i :class="child.icon"></i>
                        <span slot="title">{{langType === 'en'? child.name_en: child.name}}</span>
                    </el-menu-item>
                </el-submenu>

                <el-menu-item v-else :index="item.router" :key="item.router">
                    <i :class="item.icon"></i>
                    <span slot="title">{{langType === 'en'? item.name_en: item.name}}</span>
                </el-menu-item>
            </template>
        </el-menu>

        <div class="animated bounceInDown imgWrap">
            <img src="../assets/little.gif" height="60px" class="gif rythm pulse3" @click="toggleDance">
        </div>
    </div>
</template>

<script>
import Rythm from 'rythm.js'
import music from '../assets/langlangago.mp3'
import bus from '../plugins/bus'
import mixins from '@/components/mixins'
const rythm = new Rythm()

export default {
  name: 'sidebar',
  mixins: [mixins],
  data () {
    return {
      isMusicOn: false,
      isUnique: true,
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

<style scoped>
    #sidebar-wrap {
        width: 160px;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
        z-index: 5;
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
    .logo {
        color: #fff;
        text-align: center;
        background: #324157;
        padding: 18px 0;
        margin: 0;
    }
    #sidebar-wrap.collapsed {
        width: 64px;
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
        display: block;
        height: 60px;
        box-sizing: border-box;
    }
    #sidebar-wrap ul ul li {
        background: rgba(40, 52, 70, 1) !important;
    }
    #sidebar-wrap ul ul li:hover {
         background: #48576a !important;
    }
</style>
