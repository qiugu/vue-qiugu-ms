<template>
    <div class="authors">
    	<el-button 
    		plain 
    		class="animated rollIn" 
    		@click="openMy">
    		Who am i?
    	</el-button>
        <el-carousel 
        	:interval="4000" 
        	type="card" 
        	height="400px" 
        	class="animated flipInY"
        	trigger="click"
        	@change="openInfo">
        	<el-carousel-item 
        		v-for="item in authorImages" 
        		:key="item.alt" 
        		:label="item.text">
        		<img :src="item.src" :alt="item.alt"/>
        	</el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
export default {
  name: 'AboutAuthor',
  data () {
  	return {
  		authorImages: [
	      {
	      	src: require('../assets/author1.jpg'), 
	      	alt: 'author1',text: '半路出家',
	      	content: '学习前端已经两年了，真正做前端的工作只有5个月的时间，时间虽短，但是有一颗望远的心'
	      },
	      {
	      	src: require('../assets/author2.jpg'), 
	      	alt: 'author2',
	      	text: '学习不止',
	      	content: '从最基础的HTML、CSS、JS，到前端三大框架，再到后端NodeJS，现在可能大部分只是出于基本会用，会继续努力学习其中的精华的地方'
	      },
	      {
	      	src: require('../assets/author3.jpg'), 
	      	alt: 'author3',text: '热爱前端',
	      	content: '前端对自己而言不仅仅是工作，更带给了自己自信，看问题的方式，以及学习能力，对待生活思考的能力，慢慢的在改变自己'
	      },
	      {
	      	src: require('../assets/author4.jpg'), 
	      	alt: 'author4',text: '喜欢交流',
	      	content: '虽然现在并不认识大牛，但渴望和所有前端爱好者一起学习交流，交流才能全面提高，一起来GitHub交流技术吧'
	      }
	    ],
	    initMes: '也许我还不够专业，也许我离前端还远，但是我一直在前进，请等着我，我会在未来某个地方去找你'
  	}
  },
  methods: {
  	openMy (e, title, mes) {
  		mes = mes || this.initMes
  		title = title || '关于我'
  		const h = this.$createElement
  		this.$notify({
  			title: title,
  			message: h('i', {style: 'color: teal'},mes)
  		})
  	},
  	openInfo (e) {
  		let indexText = this.authorImages[e].content
  		let indexTitle = this.authorImages[e].text
  		this.openMy(e,indexTitle,indexText)
  	}
  }
}
</script>

<style lang="less" scoped>
    .authors {
        .el-carousel__item h3 {
		    color: #475669;
		    font-size: 14px;
		    opacity: 0.75;
		    line-height: 200px;
		    margin: 0;
		  }
    }
</style>
