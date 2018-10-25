<template>
  <div class="bg">
      <div class="login-wrap animated flipInY">
          <h3>Auto Vue</h3>
          <h3>{{$t('m.login.introduction')}}</h3>
          <el-form :model="form" label-width="0" :rules="rules" ref="form" @keyup.enter.native="login('form')">
              <el-form-item>
                  <el-input placeholder="用户名" suffix-icon="el-icon-message" v-model="form.username"></el-input>
              </el-form-item>
              <el-form-item>
                  <el-input type="password" suffix-icon="el-icon-goods" placeholder="密码" v-model="form.password"></el-input>
              </el-form-item>
              <el-form-item>
                  <el-row type="flex" justify="space-between">
                      <el-checkbox v-model="isMemory" style="color: #eee;">记住密码</el-checkbox>
                      <a href="" @click.prevent="openMsg" style="color: #eee">忘记密码</a>
                  </el-row>
              </el-form-item>
              <el-form-item>
                  <el-button type="primary" @click="login('form')">登录</el-button>
              </el-form-item>
          </el-form>
      </div>
      <!-- 粒子漂浮物 -->
      <vue-particles
              id="particles-js"
              color="#fff"
              :particleOpacity="0.7"
              :particlesNumber="30"
              shapeType="star"
              :particleSize="5"
              linesColor="#fff"
              :linesWidth="2"
              :lineLinked="true"
              :lineOpacity="0.4"
              :linesDistance="150"
              :moveSpeed="3"
              :hoverEffect="true"
              hoverMode="grab"
              :clickEffect="true"
              clickMode="push">
      </vue-particles>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data () {
    return {
      form: {
        username: sessionStorage.username || 'admin',
        password: sessionStorage.password || 'admin'
      },
      isMemory: false,
      rules: {
        username: [
          {
            required: true,
            message: '请输入您的账号',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入您的密码',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    login (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store.dispatch('user/login', this.form)
          .then(res => {
            this.$router.push({
              path: '/layout/home-page'
            })
          })
        } else {
          this.$message({message: '请输入正确格式的账号密码',type: 'warning'});
          return false
        }
      })
    },
    openMsg: function () {
      console.log(process.env.BASE_URL)
    }
  },
  watch: {
    isMemory (n, o) {
      if (n) {
        sessionStorage.userInfo = this.form.name
        sessionStorage.passwordInfo = this.form.password
      } else {
        sessionStorage.removeItem('userInfo')
        sessionStorage.removeItem('passwordInfo')
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bg {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url('../assets/sky.jpg') no-repeat;
    background-size: cover;
}
#particles-js {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}
.login-wrap {
  width: 330px;
  padding: 20px;
    z-index: 3;
  text-align: center;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  margin-right: -37%;
  background: rgba(216,222,229,.5);
}
h3 {
  margin-bottom: 5px;
  margin-top: 0;
  color: #ebedef;
}
form {
  margin-top: 25px;
}
a {
  color: #42b983;
}
button {
  width: 100%;
  font-weight: 600;
}
</style>
