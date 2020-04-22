import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import user from './modules/user'
import permission from './modules/permisson'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    permission
  },
  state: {
    isCollapse: false,
    chartTheme: ['#2ec7c9', '#b6a2de', '#5ab1ef', '#ffb980', '#d87a80', '#8d98b3', '#e5cf0d', '#97b552', '#95706d', '#dc69aa', '#07a2a4', '#9a7fd1', '#588dd5', '#f5994e', '#c05050', '#59678c', '#c9ab00', '#7eb00a', '#6f5553', '#c14089'],
    notes: [
      'Axios不支持JSONP，需要另外安装jsonp模块实现',
      '如果需要动态生成路由，可以使用router.addRoutes(routes)',
      '如果要区分新建页和编辑页，可以在路由对象中设置meta属性',
      '在组件中访问路由信息对象：this.$route',
      '在组件中访问路由实例：this.$router',
      '可以在全局拦截路由，也可以在单个组件中拦截路由',
      '如果是中等规模的项目，推荐使用vuex',
      '代码按页面分，每个人负责一个页面，尽量避免公共代码文件',
      '如果想看其它队友的页面效果，可以在本地新建一个分支，然后将自己和对方的分支合并上去',
      '深度监听一个对象非常消耗性能，可以转换成监听一个开关变量，开关一变就运行',
      '渲染图表时，可以在渲染前先 this.myChart.dispose()，销毁上次的图表',
      'vue-particles打包报错：https://github.com/creotip/vue-particles/issues/7',
      '配置favicon：https://segmentfault.com/a/1190000010043013#articleHeader5',
      '切换路由时，vuex里的state不会跟着变，除非在导航守卫里提交mutations'
    ]
  },
  getters: getters
})
