<template>
  <div class="bg">
    <div class="login-wrap animated flipInY">
      <h3>Auto Vue</h3>
      <h3>{{ $t("m.login.introduction") }}</h3>
      <el-form
        :model="form"
        label-width="0"
        :rules="rules"
        ref="form"
        @keyup.enter.native="login('form')"
      >
        <el-form-item prop="username">
          <el-input
            :placeholder="$t('m.login.name_holder')"
            suffix-icon="el-icon-message"
            v-model="form.username"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            suffix-icon="el-icon-goods"
            :placeholder="$t('m.login.name_holder')"
            v-model="form.password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-row type="flex" justify="space-between">
            <el-checkbox v-model="isMemory" style="color: #eee;">{{ $t("m.login.remember") }}</el-checkbox>
            <a href="" @click.prevent="openMsg" style="color: #eee">{{ $t("m.login.forget") }}</a>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="loading" @click="login('form')">{{ $t("m.login.button") }}</el-button>
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
      clickMode="push"
    >
    </vue-particles>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      form: {
        username: sessionStorage.username || 'guest',
        password: sessionStorage.password || 'guest'
      },
      isMemory: false,
      loading: false,
      rules: {
        username: [
          {
            required: true,
            message: this.$t('m.login.name_tip'),
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: this.$t('m.login.password_tip'),
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    login (formName) {
      this.loading = true
      setTimeout(() => {
        this.$refs[formName].validate(async valid => {
          if (valid) {
            await this.$store.dispatch('user/login', this.form)
            this.$router.push({
              path: '/index'
            })
          } else {
            this.$message({
              message: '请输入正确格式的账号密码',
              type: 'warning'
            })
          }
          this.loading = false
        })
      }, 3000)
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
        sessionStorage.clear()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.bg {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("~@/assets/images/sky.jpg") no-repeat;
  background-size: cover;
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
    background: rgba(216, 222, 229, 0.5);
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
}
</style>
