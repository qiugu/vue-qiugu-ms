<template>
  <div class="dynamic-table">
    <el-card>
      <FixedTable />
    </el-card>
    <el-card>
      <UnfixedTable />
    </el-card>
  </div>
</template>

<script>
import FixedTable from '../components/BaseTable/FixedTable'
import UnfixedTable from '../components/BaseTable/UnfixedTable'

export default {
  name: 'DynamicTable',
  components: {
    FixedTable,
    UnfixedTable
  }
}
</script>

<style scoped>
.el-card {
  margin-bottom: 20px;
}
</style>
