<template>
    <div class="wang">
        <el-row type="flex" justify="space-between">
            <el-col :span="5">
                <span>富文本保存</span>
            </el-col>
            <el-col :span="1">
                <el-button @click="saveData">保存</el-button>
            </el-col>
        </el-row>
        <v-editor v-model="content"></v-editor>
        <!-- <div class="w-e-text" v-html="content"></div> -->
    </div>
</template>

<script>
import wangItem from '@/components/wangItem.vue';
export default {
    components: {
        'v-editor': wangItem
    },
    data() {
        return {
            content: '',
            test: ''
        }
    },
    methods: {
        async initData () {
            let param = {
                creditCode: JSON.stringify('123')
            }
            try {
                let res = await this.$http({
                    url: 'http://localhost:8080/test/upload',
                    method: 'post',
                    data: {
                        creditCode: '123'
                    }
                });
                console.log(res);
                if (res.status === 200) {
                    this.content = res.data
                    this.content = '<table border="0" width="100%" cellpadding="0" cellspacing="0"><tbody><tr><th>&nbsp;11</th><th>1&nbsp;</th><th>&nbsp;1</th><th>1&nbsp;</th><th>1&nbsp;</th></tr><tr><td>&nbsp;2</td><td>&nbsp;2</td><td>&nbsp;2</td><td>&nbsp;2</td><td>&nbsp;2</td></tr><tr><td>&nbsp;3</td><td>&nbsp;3</td><td>&nbsp;3</td><td>&nbsp;3</td><td>&nbsp;3</td></tr><tr><td>&nbsp;3</td><td>&nbsp;33</td><td>&nbsp;3</td><td>&nbsp;3</td><td>&nbsp;3</td></tr><tr><td>&nbsp;3</td><td>&nbsp;3</td><td>&nbsp;3</td><td>&nbsp;3</td><td>&nbsp;3</td></tr></tbody></table><p><br></p>'
                }
            }catch(e) {
                console.log(e)
            }
        },
        result (val) {
           this.content = val
        },
        async saveData () {
            console.log(this.content);
            let res = await this.$http({
                url: 'http://localhost:8080/test/save',
                method: 'post',
                data: {
                    creditText: this.content
                }
            })
        }
    },
    mounted() {
        this.initData();
    }
}
</script>

<style>

</style>
