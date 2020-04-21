<template>
  <div class="home">
    <el-row>
      <el-col :span="8">
        <div class="info">
          <el-card>
            <div slot="header" class="clearfix">
              <img src="../assets/img.jpg" alt="admin" />
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
        </div>
        <ProgressLanguage />
      </el-col>
      <el-col :span="16">
        <div class="statistics-wrapper">
          <div
            :span="8"
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
        <TodoList />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ProgressLanguage from '../components/ProgressLanguage'
import TodoList from '../components/TodoList/TodoList'
import { getStatistics } from '@/services/home'

export default {
  name: 'HomePage',
  components: {
    ProgressLanguage,
    TodoList
  },
  data () {
    return {
      lastAddress: '芜湖',
      admin: '',
      role: '',
      statistics: []
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
        this.statistics = res.result
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  .info {
    margin-bottom: 20px;
    .clearfix {
      display: flex;
      justify-content: space-between;
      align-items: center;
      & img {
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
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
  }
  .todoapp {
    margin: 20px 0 0 40px;
  }
  .statistics-wrapper {
    margin: 0 0 0 40px;
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
