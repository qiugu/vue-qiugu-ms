<template>
  <div class="chart">
    <v-chart ref="chart" :options="options" style="width: 100%;height: 100%;" />
  </div>
</template>

<script>
import 'echarts-liquidfill/dist/echarts-liquidfill'
import ECharts from 'vue-echarts/components/ECharts'

import 'echarts/lib/component/title'
import 'echarts/lib/component/graphic'

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
      options: {}
    }
  },
  mounted () {
    this.generateCharts()
  },
  methods: {
    generateCharts () {
      // 配置折线图选项
      this.options = {
        backgroundColor: '#fff',
        graphic: [{
          type: 'group',
          left: 'center',
          top: '60%'
        }],
        series: [{
          type: 'liquidFill',
          radius: '80%',
          center: ['50%', '50%'],
          name: '流量统计',
          //  shape: 'roundRect',
          data: [0.2, 0.2, 0.2],
          backgroundStyle: {
            color: {
              type: 'linear',
              x: 1,
              y: 0,
              x2: 0.5,
              y2: 1,
              colorStops: [{
                offset: 1,
                color: 'rgba(68, 145, 253, 0)'
              }, {
                offset: 0.5,
                color: 'rgba(68, 145, 253, .25)'
              }, {
                offset: 0,
                color: 'rgba(68, 145, 253, 1)'
              }],
              globalCoord: false
            }
          },
          outline: {
            borderDistance: 0,
            itemStyle: {
              borderWidth: 20,
              borderColor: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0,
                  color: 'rgba(69, 73, 240, 0)'
                }, {
                  offset: 0.5,
                  color: 'rgba(69, 73, 240, .25)'
                }, {
                  offset: 1,
                  color: 'rgba(69, 73, 240, 1)'
                }],
                globalCoord: false
              },
              shadowBlur: 10,
              shadowColor: '#000'
            }
          },
          color: ['rgba(69, 73, 240, 0)', 'rgba(69, 73, 240, .25)', 'rgba(69, 73, 240, 1)'],
          label: {
            formatter: function (param) {
              return param.seriesName + '\n' +
                    param.name + '\n' +
                    `${param.value * 100}%`
            },
            fontSize: 28
          }
        }]
      }
    }
  }
}
</script>
