<template>
  <div class="chart">
    <v-chart ref="chart" :options="options" style="width: 100%;height: 100%;" />
  </div>
</template>

<script>
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/grid'

import mixins from './mixins'

export default {
  components: {
    'v-chart': ECharts
  },
  mixins: [mixins],
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
        names: ['出口', '入口']
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
        this.$refs.chart.mergeOptions({
          legend: {
            selected: {
              出口: false,
              入口: false
            }
          }
        })
        this.$refs.chart.mergeOptions({
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
