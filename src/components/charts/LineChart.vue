<template>
  <div class="line-chart">
    <v-chart ref="lines" :options="options" />
  </div>
</template>

<script>
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/grid'

export default {
  components: {
    'v-chart': ECharts
  },
  props: {
    dataOptions: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      interval: null,
      options: {},
      lineY: [],
      charts: {
        unit: 'Kbps',
        names: ['出口', '入口'],
        value: [
          [451, 352, 303, 534, 95, 236, 217, 328, 159, 151, 231, 192, 453, 524, 165, 236, 527, 328, 129, 530],
          [360, 545, 80, 192, 330, 580, 192, 80, 250, 453, 352, 28, 625, 345, 65, 325, 468, 108, 253, 98]
        ]
      }
    }
  },
  watch: {
    dataOptions (val) {
      if (val) {
        this.generateCharts()
      }
    }
  },
  mounted () {
    window.addEventListener('resize', () => {
      this.$refs.lines.resize(this.options)
    })
  },
  destroyed () {
    window.removeEventListener('resize')
  },
  methods: {
    generateCharts () {
      // 生成y轴的数据
      const color = ['rgba(23, 255, 243', 'rgba(255,100,97']

      for (let i = 0; i < this.charts.names.length; i++) {
        let x = i
        if (x > color.length - 1) {
          x = color.length - 1
        }
        const data = {
          name: this.charts.names[i],
          type: 'line',
          color: color[x] + ')',
          smooth: true,
          areaStyle: {
            normal: {
              color: new ECharts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: color[x] + ', 0.3)'
              }, {
                offset: 0.8,
                color: color[x] + ', 0)'
              }], false),
              shadowColor: 'rgba(0, 0, 0, 0.1)',
              shadowBlur: 10
            }
          },
          symbol: 'circle',
          symbolSize: 5,
          data: this.dataOptions.value[i]
        }
        this.lineY.push(data)
      }

      // 配置折线图选项
      this.options = {
        backgroundColor: '#fff',
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: this.charts.names,
          textStyle: {
            fontSize: 12
          },
          right: '4%',
          top: '4%'
        },
        grid: {
          top: '14%',
          left: '4%',
          right: '4%',
          bottom: '12%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.dataOptions.line
        },
        yAxis: {
          name: this.charts.unit,
          type: 'value',
          axisLabel: {
            formatter: '{value}'
          }
        },
        series: this.lineY
      }

      // 定时刷新图标
      this.interval = setInterval(() => {
        this.$refs.lines.mergeOptions({
          legend: {
            selected: {
              出口: false,
              入口: false
            }
          }
        })
        this.$refs.lines.mergeOptions({
          legend: {
            selected: {
              出口: true,
              入口: true
            }
          }
        })
      }, 10000)
    }
  }
}
</script>

<style lang="scss" scoped>
.line-chart {
  height: 100%;
}
.echarts {
  width: 100%;
  height: 100%;
}
</style>
