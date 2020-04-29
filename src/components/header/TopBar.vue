<template>
  <div class="topbar-wrap" :class="{ topCollapsed: isCollapse }">
    <el-row type="flex" justify="space-between" align="center">
      <div class="left-row">
        <i
          :class="[isCollapse ? 'nav-rotate' : '', 'fa fa-bars']"
          @click="toggleSiderBar"
        ></i>
        <Breadcrumb />
      </div>
      <div class="right-row hidden-sm-and-down">
        <div class="btn-language" @click="toggleLanguage">
          <el-tooltip effect="dark" :content="`${$t('m.topbar.language')}`" placement="bottom">
            <i class="fa fa-language"></i>
          </el-tooltip>
        </div>
        <div class="btn-fullscreen" @click="toggleFullscreen">
          <el-tooltip
            effect="dark"
            :content="fullscreen ? `${$t('m.topbar.cancel_screen')}` : `${$t('m.topbar.full_screen')}`"
            placement="bottom"
          >
            <i class="fa fa-arrows-alt"></i>
          </el-tooltip>
        </div>
        <div class="btn-bell">
          <el-tooltip
            effect="dark"
            :content="message ? `${$t('m.topbar.message', { message })}` : `${$t('m.login.notification')}`"
            placement="bottom"
          >
            <router-link to="/layout/about">
              <i class="fa fa-bell-o"></i>
            </router-link>
          </el-tooltip>
          <span class="btn-bell-badge" v-if="message"></span>
        </div>
        <img src="@/assets/images/img.jpg" alt="zhaopian" class="author-img" />

        <el-dropdown @command="handleCommand" placement="top-end">
          <span class="el-dropdown-link animated fadeIn">
            {{ userName }} <i class="el-icon-caret-bottom"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <a href="https://github.com/qiugu/vue-qiugu-ms" rel="nopener" class="github-link" target="_blank">{{ $t("m.topbar.repository") }}</a>
            </el-dropdown-item>
            <el-dropdown-item divided command="logout">{{ $t("m.topbar.logout") }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-row>
  </div>
</template>

<script>
import screenfull from 'screenfull'
import bus from '../../plugins/bus'
import { mapMutations } from 'vuex'
import Breadcrumb from '../breadcrumb/Breadcrumb'

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
  },
  methods: {
    ...mapMutations(['toggleSiderBar']),
    toggleLanguage () {
      const locale = this.$i18n.locale
      if (locale === 'zh') {
        this.$i18n.locale = 'en'
        localStorage.setItem('locale', 'en')
      } else {
        this.$i18n.locale = 'zh'
        localStorage.setItem('locale', 'zh')
      }
      const info =
        locale === 'en' ? '切换成功' : 'change language successfully'
      this.$message.success(info)
    },
    toggleFullscreen () {
      if (!screenfull) {
        this.$message({
          message: this.$t('m.tobar.support'),
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
        bus.$emit('stopMusic')
        // 退出需要刷新页面清空路由信息，否则会导致权限失效
        this.$router.push('/login')
        window.location.reload()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.topbar-wrap {
  background: #fff;
  color: #fff;
  z-index: 4;
  box-sizing: border-box;
  height: 60px;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  .fa {
    font-size: 24px;
    transition: all 0.3s;
    &.nav-rotate {
      transform: rotate(90deg);
    }
    &:hover {
      cursor: pointer;
    }
  }
  i {
    vertical-align: top;
    line-height: 60px;
    color: rgba(0,0,0,.85);
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
  .right-row > div {
    margin-right: 20px;
  }
  .author-img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .el-dropdown-link {
    color: rgba(0, 0, 0, 0.85);
    cursor: pointer;
    margin-left: 10px;
    line-height: 60px;
    a {
      text-decoration: none;
    }
  }
  .btn-bell-badge {
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
}
.github-link {
  color: inherit;
  text-decoration: none;
}
</style>
