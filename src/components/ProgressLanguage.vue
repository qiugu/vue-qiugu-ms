<template>
    <div class="progress">
        <el-card>
            <div slot="header" class="title">
                <span>{{title}}</span>
            </div>
            <div class="text">
                <div v-for="(progress, index) in progressList" :key="index">
                    <span>{{progress.name}}</span>
                    <el-progress :percentage="progress.percent" :color="progress.color"></el-progress>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
  name: 'ProgressLanguage',
  data () {
    return {
      title: '语言详情'
    }
  },
  computed: {
    progressList () {
      return this.$store.state.progressList
    }
  }
}
</script>

<style scoped>

</style>
