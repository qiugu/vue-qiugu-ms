<template>
  <el-breadcrumb class="app-breadcrumb" separator-class="el-icon-arrow-right">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span
          v-if="
            (item.meta.title && item.redirect === 'noredirect') ||
              index === levelList.length - 1
          "
          class="no-redirect"
        >
          {{ item.meta.title }}
        </span>
        <router-link v-else :to="item.redirect || item.path">
          {{ item.meta.title }}
        </router-link>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'Breadcrumb',
  data () {
    return {
      levelList: []
    }
  },
  watch: {
    $route () {
      this.getBreadcrumb()
    }
  },
  created () {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb () {
      let matched = this.$route.matched.filter(item => item.name)
      const first = matched[1]
      if (
        first &&
        first.name.trim().toLocaleLowerCase() !== 'index'.toLocaleLowerCase()
      ) {
        matched = [{ path: 'index', meta: { title: '首页' } }].concat(matched)
      }
      this.levelList = matched
    }
  }
}
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 60px;
  margin-left: 10px;
  .no-redirect {
    color: rgba(0,0,0,.85);
    cursor: text;
  }
  a {
    color: #f0f0f0;
  }
}
</style>
