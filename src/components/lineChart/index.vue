<template>
  <div class="line-chart">
    <v-chart :options="options" />
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
    data: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      options: {},
      lineY: [],
      charts: {
        unit: 'Kbps',
        names: ['出口', '入口'],
        lineX: ['2018-11-11 17:01', '2018-11-11 17:02', '2018-11-11 17:03', '2018-11-11 17:04', '2018-11-11 17:05', '2018-11-11 17:06', '2018-11-11 17:07', '2018-11-11 17:08', '2018-11-11 17:09', '2018-11-11 17:10', '2018-11-11 17:11', '2018-11-11 17:12', '2018-11-11 17:13', '2018-11-11 17:14', '2018-11-11 17:15', '2018-11-11 17:16', '2018-11-11 17:17', '2018-11-11 17:18', '2018-11-11 17:19', '2018-11-11 17:20'],
        value: [
          [451, 352, 303, 534, 95, 236, 217, 328, 159, 151, 231, 192, 453, 524, 165, 236, 527, 328, 129, 530],
          [360, 545, 80, 192, 330, 580, 192, 80, 250, 453, 352, 28, 625, 345, 65, 325, 468, 108, 253, 98]
        ]

      }
    }
  },
  created () {
    this.generateCharts()
    this.options = {
      backgroundColor: '#1b2735',
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: this.charts.names,
        textStyle: {
          fontSize: 12,
          color: 'rgb(0,253,255,0.6)'
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
        data: this.charts.lineX,
        axisLabel: {
          textStyle: {
            color: 'rgb(0,253,255,0.6)'
          },
          formatter: function (params) {
            return params.split(' ')[0] + '\n' + params.split(' ')[1]
          }
        }
      },
      yAxis: {
        name: this.charts.unit,
        type: 'value',
        axisLabel: {
          formatter: '{value}',
          textStyle: {
            color: 'rgb(0,253,255,0.6)'
          }
        },
        splitLine: {
          lineStyle: {
            color: 'rgb(23,255,243,0.3)'
          }
        },
        axisLine: {
          lineStyle: {
            color: 'rgb(0,253,255,0.6)'
          }
        }
      },
      series: this.lineY
    }
  },
  methods: {
    generateCharts () {
      var color = ['rgba(23, 255, 243', 'rgba(255,100,97']

      for (var i = 0; i < this.charts.names.length; i++) {
        var x = i
        if (x > color.length - 1) {
          x = color.length - 1
        }
        var data = {
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
          data: this.charts.value[i]
        }
        this.lineY.push(data)
      }
    },
    executeAnimation () {

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
