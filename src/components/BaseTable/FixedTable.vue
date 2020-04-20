<template>
    <div class="dynamic-table">
        <div class="crumbs">
            <el-checkbox-group v-model="selectForm">
                <el-checkbox label="Vue">Vue</el-checkbox>
                <el-checkbox label="React">React</el-checkbox>
                <el-checkbox label="Node">Node</el-checkbox>
            </el-checkbox-group>
        </div>
        <el-table :key="key" :data="tableData" border fit highlight-current-row>
            <el-table-column prop="name" label="JavaScript"></el-table-column>
            <el-table-column v-for="lang in columnForm" :key="lang" :label="lang">
                <template slot-scope="scope">
                    {{scope.row[lang]}}
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
  name: 'BaseTable',
  data () {
    return {
      tableData: [
        {
          name: '123',
          Vue: '234',
          React: '345',
          Node: '456'
        },
        {
          name: '567',
          Vue: '789',
          React: '901',
          Node: '012'
        }
      ],
      columnForm: ['Vue', 'React'],
      selectForm: ['Vue', 'React'],
      columnOptions: ['Vue', 'React', 'Node'],
      key: 1
    }
  },
  watch: {
    selectForm (valArr) {
      this.columnForm = this.columnOptions.filter(item => valArr.indexOf(item) > -1)
      this.key = this.key + 1
    }
  }
}
</script>

<style scoped>

</style>
