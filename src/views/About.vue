<template>
  <div class="about">
    <el-card class="box-card">
      <div class="clearfix" slot="header">
        <i class="el-icon-edit"></i>&nbsp;&nbsp;
        <span>Vue开发备忘录</span>
      </div>
      <div class="text item">
        <ol>
          <li v-for="(str,index) in notes" :key="index">{{str}}</li>
        </ol>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'about',
  data () {
    return {notes: this.$store.state.notes}
  }
}
</script>

<style scoped>
  li {
    line-height: 30px;
  }
</style>
