export default {
  mounted () {
    window.addEventListener('resize', this.resizeCallback)
  },
  destroyed () {
    // 销毁事件监听需要引用同一监听方法
    window.removeEventListener('resize', this.resizeCallback)
  },
  methods: {
    resizeCallback () {
      this.throttle(() => {
        this.$refs.chart.resize(this.options)
      })()
    },
    // 节流函数，针对resize事件
    // 闭包函数需要将变量置为null
    throttle (fn, wait = 1000) {
      let previous = 0
      let timer = null
      let context
      return (...args) => {
        const now = +new Date()
        context = this
        if (now - previous > wait) {
          if (timer) {
            clearTimeout(timer)
            timer = null
          }

          previous = now
          timer = null
          fn.apply(this, args)
          if (!timer) context = null
        } else {
          timer = setTimeout(() => {
            fn.apply(context, args)
            if (!timer) context = null
          }, wait - (now - previous))
        }
      }
    }
  }
}
