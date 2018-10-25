<template>
    <div class="info">
        <el-card>
            <div slot="header" class="clearfix">
                <img src="../assets/img.jpg" alt="admin">
                <div class="userinfo">
                    <h2>admin</h2>
                    <span>超级管理员</span>
                </div>
            </div>
            <div class="text">
                <div>上次登录时间<span>{{lastTime}}</span></div>
                <div>上次登录地点<span>{{lastAddress}}</span></div>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
  name: 'PersonInfo',
  data () {
    return {
      lastAddress: '芜湖'
    }
  },
  computed: {
    lastTime () {
      let date = new Date()
      return date.toLocaleDateString()
    }
  }
}
</script>

<style lang="less" scoped>
    @card: #999;
    .flex {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .clearfix {
        .flex;
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
            color: @card;
        }
    }
    .text div {
        color: @card;
    }
    .text div span {
        padding-left: 40%;
    }
</style>
