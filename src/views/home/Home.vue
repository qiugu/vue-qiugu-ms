<template>
  <div class="home">
    <el-row :gutter="20">
      <el-col :lg="8">
        <el-card class="card-margin">
          <div slot="header" class="clearfix">
            <img src="@/assets/img.jpg" alt="admin" />
            <div class="userinfo">
              <h2>{{ admin }}</h2>
              <span>{{ role }}</span>
            </div>
          </div>
          <el-row type="flex" justify="space-between">
            <el-col :span="12">上次登录时间</el-col>
            <el-col :span="8">{{ lastTime }}</el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="12">上次登录地点</el-col>
            <el-col :span="8">{{ lastAddress }}</el-col>
          </el-row>
        </el-card>
        <el-card class="card-margin">
          <div slot="header" class="title">
            <span>{{ title }}</span>
          </div>
          <div class="text">
            <div v-for="item in progressList" :key="item.id">
              <span>{{ item.name }}</span>
              <el-progress
                :percentage="item.percent"
                :color="item.color"
              ></el-progress>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :lg="16">
        <div class="statistics-wrapper">
          <div
            v-for="card in statistics"
            :key="card.id"
            class="card-item"
          >
            <i class="fa" :class="card.icon"></i>
            <div class="right-card">
              <h2>{{ card.amount }}</h2>
              <span>{{ card.title }}</span>
            </div>
          </div>
        </div>
        <line-chart :dataOptions="options" style="height: 410px;overflow: hidden;margin-bottom: 20px;"/>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :lg="8">
        <word-chart style="height: 300px;margin-bottom: 20px;"/>
      </el-col>
      <el-col :lg="8">
        <TodoList :todos="todos" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import TodoList from '@/components/TodoList/TodoList'
import lineChart from '@/components/charts/LineChart'
import wordChart from '@/components/charts/WordChart'
import { getStatistics } from '@/services/home'

export default {
  name: 'HomePage',
  components: {
    TodoList,
    lineChart,
    wordChart
  },
  data () {
    return {
      lastAddress: '芜湖',
      admin: '',
      role: '',
      statistics: [],
      title: '',
      progressList: [],
      todos: [],
      options: {}
    }
  },
  computed: {
    lastTime () {
      const date = new Date()
      return date.toLocaleDateString()
    }
  },
  mounted () {
    this.admin = sessionStorage.getItem('username')
    const role = JSON.parse(sessionStorage.getItem('roles'))

    if (role.length !== 0) {
      this.role = role
    }
    this.fetchData()
  },
  methods: {
    async fetchData () {
      const res = await getStatistics()
      if (res.code === 200) {
        this.statistics = res.result.statistics
        this.lastAddress = res.result.userData.city
        this.progressList = res.result.proportion
        this.title = res.result.title
        this.todos = res.result.todos
        this.options = res.result.lines
        this.$store.commit('user/SET_TODO', this.todos)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  .card-margin {
    margin-bottom: 20px;
  }
  .clearfix {
    display: flex;
    justify-content: space-between;
    align-items: center;
    & img {
      border-radius: 50%;
      cursor: pointer;
      &:hover {
        transform: rotate(666turn);
        transition-delay: 1s;
        transition-property: all;
        transition-duration: 59s;
        transition-timing-function: cubic-bezier(.34, 0, .84, 1);
      }
    }
    & .userinfo {
      padding-right: 10%;
    }
    & .userinfo h2 {
      margin: 0;
      font-size: 30px;
    }
    & .userinfo span {
      font-size: 14px;
      color: #999;
    }
  }
  .statistics-wrapper {
    margin-bottom: 20px;
    display: flex;
    .card-item {
      flex: 1;
      display: flex;
      align-items: center;
      height: 100px;
      border-radius: 10px;
      &:not(:last-child) {
        margin-right: 20px;
      }
      .fa {
        text-align: center;
        color: #fff;
        display: inline-block;
        flex: 1;
        font-size: 40px;
        height: 100%;
        border-radius: 10px 0 0 10px;
        cursor: pointer;
        &::before {
          display: inline-block;
          line-height: 100px;
        }
      }
      .fa.fa-hourglass-end {
        background: #1f84f4;
        &:hover {
          background: #fff;
          color: #1f84f4;
          transform: rotate(360deg);
          transition: all .3s;
        }
      }
      .fa.fa-tags {
        background: #00e072;
        &:hover {
          background: #fff;
          color: #00e072;
          transform: rotate(360deg);
          transition: all .3s;
        }
      }
      .fa.fa-shopping-bag {
        background: #ff4e21;
        &:hover {
          background: #fff;
          color: #ff4e21;
          transform: rotate(360deg);
          transition: all .3s;
        }
      }
      .right-card {
        flex: 1.5;
        background: #fff;
        padding-top: 20px;
        box-sizing: border-box;
        text-align: center;
        height: 100px;
        border-radius: 0 10px 10px 0;
        & h2 {
          margin: 0;
        }
        & span {
          color: #999;
        }
      }
    }
  }
}
</style>
