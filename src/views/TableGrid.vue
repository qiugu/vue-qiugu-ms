<template>
  <div class="main">
    <el-card class="box-card">
      <table-edit
        :tableData="tableData"
        :columns="columnsConfig"
        :showSummary="true"
        options="options"
        :addInsideData="addData"
        :updateInsideData="updateData"
        :deleteInsideData="deleteData"
        @save-add="saveAdd"
        @save-update="saveUpdate"
        @save-delete="saveDelete">
      </table-edit>
    </el-card>
  </div>
</template>
<script>
  import TableEdit from '../components/EditTable/TableEdit';

  export default {
    components: {
      TableEdit
    },
    data() {
      return {
        options: [
          {label: '是',value: '是'},
          {label: '否', value: '否'}
        ],
        columnsConfig: [
          {
            prop: 'name',
            label: '借款银行名称',
            options: 'input',
            align: 'center'
          },
          {
            prop: 'open',
            label: '授信额度(万元)',
            options: 'input',
            align: 'center'
          },
          {
            prop: 'email',
            label: '借款金额（万元）',
            options: 'input',
            align: 'center'
          },
          {
            prop: 'createTime',
            label: '起止日期',
            options: 'date',
            align: 'center'
          },
          {
            prop: 'remark',
            label: '备注',
            options: 'input',
            align: 'center'
          }
        ], //表单结构
        tableData: [], // 表单数据
        dialogTableVisible: false,
        //员工分析
        addData: [],
        updateData: [],
        deleteData: [],
        loadingStatus: false,

        //上传参数
        fileList: [],
        fileUploadParam: {
          creditCode: sessionStorage.getItem("creditCode"),
          token: sessionStorage.getItem("token")
        },
        param: {
          creditCode: sessionStorage.getItem("creditCode"),
          token: sessionStorage.getItem("token")
        }
      }
    },

    mounted() {
      //初始化表格数据
      this.init();
    },

    methods: {
      saveAdd (param) {
        this.addData = param;
      },
      saveUpdate (param) {
        this.updateData = param;
      },
      saveDelete (param) {
        this.deleteRow = param;
      },

      eventData(tempData) {
        this.fileList = tempData;
        this.getUploadGsjkqk();
      },
      //项目初始化数据
      init() {
        let self = this;
        self.getGsjkqk();
      },
      //初始化表格数据
      getGsjkqk() {
        this.$http({
          url: '/user/edit',
          method: 'post'
        }).then(response => {
          if (response.data.errno === 0) {
            this.tableData = response.data.data;
          }
        });
      },

      //组件数据方法处理
      changeInput(value) {
        let self = this;
        let tmp = value.index;
        let prop = value.tmpProp;
        self.tableData[tmp][prop] = value.change;
      },
      //取消按钮
      cancelRow(index, row, tableName) {
        let self = this;
        self.editIndex = null;
        if (self.isAddRow) {
          self.tableData.splice(0, 1);
        } else {
          self.tableData.splice(index, 1, self.backupsRow);
          if (!self.backupsRow.id) {
            self.addData.splice(index, 1, self.backupsRow);
          } else {
            self.updateData.splice(index, 1, self.backupsRow);
          }
        }
        //防止新增行的时候把其它行数据复制给新增行
        self.editRow = {};
        self.backupsRow = {};
      },
      //编辑状态提取
      editStatus(index, row) {
        let self = this;
        if (self.isAddRow) {
          self.tableData.splice(0, 1, self.editRow);
          self.addData.unshift(row);
        } else if (row.id) {
          self.updateData.unshift(row);
        }
        //保存成功，清空数据
        self.editIndex = null;
        self.backupsRow = {};
        self.editRow = {};
      },
      //保存按钮
      saveRow(index, row, tableName) {
        let self = this;
        if (self.editIndex !== null) {
          //表格添加数据需要reload table这里删除
          if (row.jkyhmc === "" || row.jkyhmc == null || row.jkyhmc === undefined) {
            this.$message({message: '请填写借款银行名称', type: "warning"});
            return null;
          }
          if (row.sxed !== "" && row.sxed !== null && row.sxed !== undefined) {
            if (!/^[1-9]\d*\d*|[1-9]\d*$/.test(row.sxed)) {
              this.$message({message: '授信额度需录入正确格式', type: "warning"});
              return null;
            }
          } else {
            this.$message({message: '请填写授信额度', type: "warning"});
            return null;
          }
          if (row.jkje !== "" && row.jkje !== null && row.jkje !== undefined) {
            if (!/^[1-9]\d*\d*|[1-9]\d*$/.test(row.jkje)) {
              this.$message({message: '借款金额需录入正确格式', type: "warning"});
              return null;
            }
          } else {
            this.$message({message: '请填写借款金额', type: "warning"});
            return null;
          }
          if (self.editIndex !== index) {
            this.$message({message: '请先保存或取消当前编辑数据', type: "warning"});
            return null;
          }
          self.editStatus(index, row);
        } else {
          self.editIndex = index;
          self.editRow = row;
          self.tempRow = JSON.parse(JSON.stringify(row));
          self.backupsRow = JSON.parse(JSON.stringify(row));
        }
        this.isAddRow = false;
      },

      //添加按钮
      addRow() {
        if (this.editIndex !== null) {
          this.$message({message: '请先保存或取消当前编辑数据', type: "warning"});
          return;
        }
        this.tableData.unshift(this.editRow);
        this.editIndex = 0;
        this.isAddRow = true;
      },
      //保存表单内的数据
      save() {
        let self = this;
        if (this.editIndex != null) {
          //编辑状态不保存
          this.$message({message: '请先保存或取消当前编辑数据', type: "warning"});
          return;
        }
        this.loadingStatus = true;
        let data = {
          creditCode: sessionStorage.getItem("creditCode"),
          addData: JSON.stringify(self.addData),
          updateData: JSON.stringify(self.updateData),
          delData: JSON.stringify(self.deleteData)
        };
        this.$axios.post('/hspt-web-api/entryPrise/entry/epQytbGsjkqk/saveGsjkqk', data).then(response => {
          const data = response.data;
          if (data.resultCode === "0") {
            this.$message({message: data.resultMsg, type: "success"});
            this.getGsjkqk();
          } else {
            this.$message({message: data.resultMsg, type: "error"});
          }
        });
        this.loadingStatus = false;
        this.addData = [];
        this.updateData = [];
        this.deleteData = [];
      },
      //删除按钮
      deleteRow(index, row) {
        if (this.editIndex !== null) {
          this.$message({message: '请先保存或取消当前编辑数据', type: "warning"});
          return;
        }
        this.$confirm("确认删除?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center: true
        }).then(() => {
          this.tableData.splice(index, 1);
          this.addData.splice(index, 1);
          if (row.id) {
            this.deleteData.push(row);
          }
        });
      }
    }
  }

</script>
<style scoped>

</style>
