/**
* author: qiugu
* createTime: 2018/10/19
* description: 表单编辑框组件
**/
<template>
  <div>
    <el-input 
        v-show="editType === 'input'"
        v-model="editRow[columns.property]"
        @change="handleChange"
        :maxlength='25'
        placeholder="请输入内容">
    </el-input>
    <el-select 
        v-show="editType === 'select'"
        v-model="editRow[columns.property]"
        @change="handleChange">
        <Option 
            v-for="(item, index) in options" 
            :key="index" 
            :value="item.label">
            {{item.value}}
        </Option>
    </el-select>
    <el-date-picker
        v-show="editType === 'date'" 
        placeholder="请选择日期"
        :type="editType"
        v-model="editRow[columns.property]"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        @change="handleChange"
        >
    </el-date-picker>
    <el-date-picker
        v-show="editType === 'year'" 
        placeholder="请选择年份"
        :type="editType"
        v-model="editRow[columns.property]"
        format="yyyy"
        value-format="yyyy"
        @change="handleChange"
        >
    </el-date-picker>
    <el-date-picker
        v-show="editType === 'month'" 
        placeholder="请选择年月"
        :type="editType"
        v-model="editRow[columns.property]"
        format="yyyy-MM"
        value-format="yyyy-MM"
        @change="handleChange"
        >
    </el-date-picker>
  </div>
</template>

<script>
  export default {
    name: "inputedit",
    props: {
      editType: {
        type: String
      },
      options: {
        type: Array,
        default () {
          return []
        }
      },
      data: {
        type: Object
      },
      columns: {
        type: Object
      }
    },
    data() {
      return {
        editRow: this.data
      };
    },
    methods: {
      handleChange(value) {
        this.$emit('changeInput', this.editRow);
      },
    }
  }
</script>

<style lang="less" scoped>
  .handle {
    display: flex;
    justify-content: center;
  }

</style>
