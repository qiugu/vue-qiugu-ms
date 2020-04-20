<template>
    <div class="topbar-wrap" :class="{topCollapsed: isCollapse}">
        <el-row type="flex" justify="space-between" align="center">
            <div class="left-row">
                <i :class="[isCollapse ? 'nav-rotate' : '', 'fa fa-bars']"
                    @click="toggleSiderBar"></i>
                    <Breadcrumb/>
            </div>
            <div class="right-row hidden-sm-and-down">
                <div class="btn-language" @click="toggleLanguage">
                    <el-tooltip effect="dark" content="切换语言" placement="bottom">
                        <i class="fa fa-language"></i>
                    </el-tooltip>
                </div>
                <div class="btn-fullscreen" @click="toggleFullscreen">
                    <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                        <i class="fa fa-arrows-alt"></i>
                    </el-tooltip>
                </div>
                <div class="btn-bell">
                    <el-tooltip effect="dark" :content="message?`有${message}条未读消息`:`消息中心`" placement="bottom">
                        <router-link to="/layout/about">
                            <i class="fa fa-bell-o"></i>
                        </router-link>
                    </el-tooltip>
                    <span class="btn-bell-badge" v-if="message"></span>
                </div>
                <img src="../assets/img.jpg" alt="zhaopian" class="author-img">

                <el-dropdown @command="handleCommand">
                    <span class="el-dropdown-link animated fadeIn">
                        {{userName}} <i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <a href="#">
                            <el-dropdown-item command="personInfo">个人信息</el-dropdown-item>
                        </a>
                        <a href="https://github.com/qiugu/vue-qg-ms" target="_blank">
                            <el-dropdown-item>项目仓库</el-dropdown-item>
                        </a>
                        <a href="#">
                            <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
                        </a>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </el-row>
    </div>
</template>

<script>
import screenfull from 'screenfull'
import bus from '../plugins/bus'
import { mapMutations } from 'vuex'
import Breadcrumb from './Breadcrumb'

export default {
  name: 'topbar',
  components: {
    Breadcrumb
  },
  data () {
    return {
      userName: sessionStorage.username || '',
      fullscreen: false,
      message: 2
    }
  },
  computed: {
    isCollapse () {
      return this.$store.state.isCollapse
    }
  },
  methods: {
    ...mapMutations([
      'toggleSiderBar'
    ]),
    toggleLanguage () {
      const locale = this.$i18n.locale
      locale === 'zh' ? (this.$i18n.locale = 'en') : (this.$i18n.locale = 'zh')
      const info = locale === 'en' ? '切换成功' : 'change language successfully'
      this.$message.success(info)
    },
    toggleFullscreen () {
      if (!screenfull) {
        this.$message({
          message: '您的浏览器不支持全屏',
          type: 'warning'
        })
        return false
      }
      screenfull.toggle()
      this.fullscreen = !this.fullscreen
    },
    handleCommand (command) {
      if (command === 'logout') {
        sessionStorage.clear()
        this.$store.dispatch('permission/logout')
        bus.$emit('stopMusic')
        this.$router.push('/login')
      } else if (command === 'personInfo') {
        this.$router.push('/layout/about-author')
      }
    }
  },
  mounted () {
    if (document.body.clientWidth < 900) {
      this.$store.commit('toggleSiderBar')
    }
  },
  watch: {
    $route (to, from) {
      this.pathName = this.$route.path.substring(1)
      this.nowPath = this.$route.path
    }
  }
}
</script>

<style scoped>
    .topbar-wrap {
        overflow: hidden;
        border-bottom: 1px solid #e7eaec;
        background: #324157;
        color: #fff;
        padding: 0 15px;
        z-index: 4;
        box-sizing: border-box;
        height: 60px;
    }
    .topbar-wrap .fa {
        font-size: 24px;
        transition: all 0.3s;
    }
    i {
        vertical-align: top;
        line-height: 60px;
    }
    .topbar-wrap .fa:hover {
         cursor: pointer;
     }
    .fa.nav-rotate {
        transform: rotate(90deg);
    }
    a {
        line-height: 60px;
    }
    .animated {
        font-size: 16px;
        color: #fff;
    }
    .el-row {
        height: 100%;
    }
    .left-row {
        text-align: left;
        height: 100%;
        white-space: nowrap;
    }
    .right-row {
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    .right-row>div {
      margin-right: 20px;
    }
    .author-img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
    .el-dropdown {
        margin-right: 40px;
        line-height: 60px;
    }
    .el-dropdown-link {
        color: #fff;
        cursor: pointer;
        margin-left: 10px;
    }
    .btn-bell-badge{
        position: absolute;
        left: 17px;
        top: 12px;
        width: 8px;
        height: 8px;
        border-radius: 4px;
        background: #f56c6c;
        color: #fff;
    }
    .btn-bell {
        position: relative;
    }
</style>
