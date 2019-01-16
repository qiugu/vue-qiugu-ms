<template>
    <div class="wang">
        <div ref="editor"></div>
        <div class="w-e-text" v-html="content"></div>
    </div>
</template>

<script>
import E from 'wangeditor';
export default {
    data() {
        return {
            content: ''
        }
    },
    methods: {

    },
    mounted() {
        let editor = new E(this.$refs.editor);
        editor.customConfig.uploadImgShowBase64 = true;
        editor.customConfig.onchange = (html) => {
            // html 即变化之后的内容
            console.log(html);
            this.content = html;
        }
        editor.create();
    }
}
</script>

<style>

</style>
