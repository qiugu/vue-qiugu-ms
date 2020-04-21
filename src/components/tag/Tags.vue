<template>
  <div class="tags" v-if="showTags">
    <ul class="tags-list">
      <li
        class="tags-li"
        v-for="(item, index) in tagsList"
        :class="{ active: isActive(item.path) }"
        :key="index"
      >
        <router-link :to="item.path" class="tags-li-title">
          {{ item.title }}
        </router-link>
        <span class="tags-li-icon" @click="closeTags(index)">
          <i class="el-icon-close"></i>
        </span>
      </li>
    </ul>
    <div class="tags-close-box">
      <el-dropdown @command="handleTags">
        <el-button size="mini" type="primary">
          标签选项 <i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu size="small" slot="dropdown">
          <el-dropdown-item command="other">关闭其他</el-dropdown-item>
          <el-dropdown-item command="all">关闭所有</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import bus from '../../plugins/bus'
export default {
  name: 'Tags',
  data () {
    return {
      tagsList: []
    }
  },
  methods: {
    isActive (path) {
      return path === this.$route.fullPath
    },
    closeTags (index) {
      //    删除当前项的元素
      const delItem = this.tagsList.splice(index, 1)[0]
      //    如果从数组第一项开始删除，则跳转到tagsList[index]项，否则跳转到index-1的标签项
      const item = this.tagsList[index]
        ? this.tagsList[index]
        : this.tagsList[index - 1]
      //    如果数组中还有元素，则item存在，那么就跳转到这个标签页代表的路由的页面
      if (item) {
        delItem.path === this.$route.fullPath && this.$router.push(item.path)
      } else {
        //  如果是最后一个标签的话，那就跳转到默认的路由页面
        this.$router.push('/')
      }
    },
    closeAll () {
      this.tagsList = []
      this.$router.push('/')
    },
    closeOther () {
      this.tagsList = this.tagsList.filter(item => {
        return item.path === this.$route.fullPath
      })
    },
    setTags (route) {
      //    判断tagsList中是否有和要跳转的route相等的项
      const isExist = this.tagsList.some(item => {
        return item.path === route.fullPath
      })
      //    没有的话先判断tagsList长度是否大于8，大于的话，会删除数组中的第一位
      //    然后向数组里面添加新的项
      if (!isExist) {
        if (this.tagsList.length >= 8) {
          this.tagsList.shift()
        }
        this.tagsList.push({
          title: route.meta.title,
          path: route.fullPath,
          name: route.matched[1].components.default.name
        })
      }
      bus.$emit('tags', this.tagsList)
    },
    handleTags (command) {
      command === 'other' ? this.closeOther() : this.closeAll()
    }
  },
  computed: {
    //  数组长度大于0的时候，tab选项才会出现
    showTags () {
      return this.tagsList.length > 0
    }
  },
  watch: {
    //  监控路由变化，路由一旦变化的话，就调用setTags的方法，添加新的标签页
    $route (newValue, oldValue) {
      this.setTags(newValue)
    }
  },
  created () {
    this.setTags(this.$route)
  }
}
</script>

<style lang="scss" scoped>
.tags {
  position: relative;
  height: 30px;
  overflow: hidden;
  background: #fff;
  padding-right: 120px;
  box-shadow: 0 5px 10px #ddd;
  .tags-list {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    .tags-li {
      float: left;
      margin: 3px 5px 2px 3px;
      border-radius: 3px;
      font-size: 12px;
      overflow: hidden;
      cursor: pointer;
      height: 23px;
      line-height: 23px;
      border: 1px solid #e9eaec;
      background: #fff;
      padding: 0 5px 0 12px;
      vertical-align: middle;
      color: #666;
      transition: all 0.3s ease-in;
      a {
        text-decoration: none;
      }
      &:not(.active):hover {
        background: #7546c9;
      }
      &.active {
        color: #fff;
        background: #7546c9;
        border: 1px solid #7546c9;
      }
      .tags-li-title {
        float: left;
        max-width: 80px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-right: 5px;
        color: #666;
      }
      &.active .tags-li-title {
        color: #fff;
      }
    }
  }
  .tags-close-box {
    position: absolute;
    right: 0;
    top: 0;
    box-sizing: border-box;
    padding-top: 1px;
    text-align: center;
    width: 110px;
    height: 30px;
    z-index: 10;
  }
}
</style>
