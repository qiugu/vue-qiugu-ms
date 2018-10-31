<template>
  <div class="cube">
      <h1>Test</h1>
    <el-button v-permission="['admin']" type="primary" @click="changeRoles">只有admin权限才能看到我</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    changeRoles () {

    }
  }
}
</script>

<style lang='less' scope>
  h1 {
    background: #ccc;
  }
</style>
