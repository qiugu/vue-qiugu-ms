<template>
    <div class="info">
        <el-card>
            <div slot="header" class="clearfix">
                <img src="../assets/img.jpg" alt="admin">
                <div class="userinfo">
                    <h2>{{admin}}</h2>
                    <span>{{role}}</span>
                </div>
            </div>
            <div class="text">
                <el-row type="flex" justify="space-between">
                  <el-col :span="12">
                    上次登录时间
                  </el-col>
                  <el-col :span="8">
                    {{lastTime}}
                  </el-col>
                </el-row>
                <el-row type="flex" justify="space-between">
                  <el-col :span="12">
                    上次登录地点
                  </el-col>
                  <el-col :span="8">
                    {{lastAddress}}
                  </el-col>
                </el-row>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
  name: 'PersonInfo',
  data() {
    return {
      lastAddress: '芜湖',
      admin: '',
      role: ''
    };
  },
  computed: {
    lastTime() {
      let date = new Date();
      return date.toLocaleDateString();
    }
  },
  created() {
    this.admin = this.$store.getters.username;
    this.role = this.$store.getters.roles;
  }
};
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
