<template>
    <div>
        <el-table 
            :data="tableData"
            :highlight-current-row="true"
            :header-cell-style="{'background-color':'#f5f7fa'}"
            :show-summary="showSummary"
            :summary-method="summaryMethod">
            <el-table-column 
                v-for="(item, index) in tableInsideColumns" 
                :key="index" 
                :label="item.label" 
                :prop="item.prop || ''"
                :width="item.width"
                :align="item.align">
                <template slot-scope="{row, column, $index}">
                    <span v-if="editIndex !== $index">{{row[column.property]}}</span>
                    <div v-else>
                        <input-edit 
                            :editType="item.options"
                            :data="row"
                            :columns="column"
                            @changeInput="handleChange">
                        </input-edit>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" align="center" width="120px">
                <template slot-scope="{row, column, $index}">
                    <div v-show="editIndex !== $index" class="handle">
                        <el-button @click="startEdit(row, column, $index)" type="text" size="small">编辑</el-button>
                        <el-button @click="deleteData(row, column, $index)" type="text" size="small">删除</el-button>
                    </div>
                    <div v-show="editIndex === $index" class="handle">
                        <el-button @click="saveEdit(row, column, $index)" type="text" size="small">保存</el-button>
                        <el-button @click="cancelEdit(row, column, $index)" type="text" size="small">取消</el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <div class="add">
            <el-button style="width: 100%" icon="el-icon-plus" @click='addRow' :disabled="isDisable">添加</el-button>
        </div>
    </div>
</template>
<script>
import InputEdit from './InputEdit'

export default {
    components: {
        InputEdit
    },
    props: {
        showSummary: {
            type: Boolean,
            default: false
        },
        tableData: {
            type: Array,
            required: true
        },
        columns: {
            type: Array,
            required: true
        },
        addInsideData: {
            type: Array,
            default () {
                return [];
            }
        },
        updateInsideData: {
            type: Array,
            default () {
                return [];
            }
        },
        deleteInsideData: {
            type: Array,
            default () {
                return [];
            }
        }
    },
    data () {
        return {
            tableInsideData: [],
            tableInsideColumns: [],
            editIndex: -1,
            editRow: {},
            isDisable: false,
            isAddRow: false,
            backupRow: {}
        }
    },
    methods: {
        summaryMethod (param) {
            const {columns, data} = param;
            const sums = [];
            columns.forEach((column, index) => {
            if (index === 0) {
                sums[index] = "合计";
                return;
            }
            const values = data.map(item => Number(item[column.property]));
            if (!values.some(value => isNaN(value))) {
                sums[index] = values.reduce((prev, curr) => {
                const value = Number(curr);
                if (!isNaN(value)) {
                    return prev + curr;
                } else {
                    return prev;
                }
                }, 0);
                sums[index] = sums[index].toFixed(2);
                //根据列名不同，确定不同的合计单位
                // if (column.property == "hj" || column.property == "ck") {
                // sums[index] += " 万元";
                // }  else {
                // sums[index] = "";
                // }
            } else {
                sums[index] = "";
            }
            });
            return sums;
        },
        iniTableColumns () {
            this.tableInsideColumns = this.columns.map((item, index) => {
                item.columnKey = index;
                return item;
            })
        },
        startEdit (row, column, index) {
            if (this.editIndex !== -1) {
                this.$message.warning({message: '请先保存或取消当前编辑数据', type: "warning"});
                return;
            }
            this.editIndex = index;
            this.backupRow = Object.assign({}, row);
        },
        saveEdit (row, column, index) {
            if (Object.values(row).every(item => item !== '')) {
                if (this.editIndex !== -1) {
                    this.tableData[index] = row;
                }
                this.editIndex = -1;
                if (this.isAddRow) {
                    this.addInsideData.unshift(row);
                    this.$emit('save-add', this.addInsideData);
                    this.isAddRow = false;
                }
                if (row.id) {
                    let flag = false;
                    this.updateInsideData.forEach(item => {
                        if (row.id === item.id) flag = true;
                    });
                    if (!flag) {
                        this.updateInsideData.unshift(row);
                        this.$emit('save-update', this.updateInsideData)
                    }
                } else {
                    this.addInsideData.splice(-1, 1, row);
                    this.$emit('save-add', this.addInsideData);
                }
                this.editRow = {};
            } else {
                this.$message.warning({type: 'warning', message: '请填写内容'});
            }
        },
        cancelEdit (row, column, index) {
            if (this.isAddRow) {
                this.tableData.splice(0, 1);
                this.addInsideData.splice(index, 1);
                this.$emit('save-add', this.addInsideData);
                this.isAddRow = false;
            } else {
                this.tableData[index] = this.backupRow;
            }
            this.backupRow = {};
            this.editIndex = -1;
        },
        deleteData (row, column, index) {
            this.$confirm('此操作将删除该行, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
            .then(() => {
                this.tableData.splice(index, 1);
                this.deleteInsideData.push(row);
                this.$emit('save-delete', this.deleteInsideData);
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            })
        },
        handleChange (val) {
            this.editRow = val;
        },
        addRow () {
            if (this.editIndex !== -1) {
                this.$message({message: '请先保存或取消当前编辑数据', type: "warning"});
                return;
            }
            this.tableData.unshift(this.editRow);
            this.editIndex = 0;
            this.isAddRow = true;
        }
    },
    mounted () {
        this.iniTableColumns()
    }
}
</script>
<style lang="scss" scoped>
    .add {
        padding-top: 5px;
        .el-button {
            border: 1px dashed #dcdfe6;
        }
    }

</style>


