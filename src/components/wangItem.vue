<template>
    <div class="wang">
        <div ref="editor"></div>
        <!-- <div v-html="content"></div> -->
    </div>
</template>

<script>
import E from 'wangeditor';
export default {
    data () {
        return {
            editor: ''
        }
    },
    model: {
        prop: "content",
        event: "change"
    },
    props: {
        content: {
            type: String,
            default: ''
        }
    },
    methods: {
        result () {
            
        }
    },
    mounted () {
        console.log('我刷新了');
        const editor = new E(this.$refs.editor);
        editor.customConfig.uploadImgShowBase64 = true;
        editor.customConfig.zIndex = 100;
        editor.customConfig.onchange = (html) => {
            // html 即变化之后的内容
            // console.log(html);
            // this.editor = html;
            this.$emit('change',html)
        }
        editor.create();
        this.editor = editor;
        this.editor.$textElem.html(this.content)
    },
    watch: {
        'content': function() {
            this.editor.$textElem.html(this.content)
        }
    }
}
</script>

<style>

</style>
