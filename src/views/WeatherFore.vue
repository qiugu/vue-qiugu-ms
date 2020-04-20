<template>
  <div class="weather">
    <el-row class="searchCity" type="flex" justify="flex-start">
        <area-select
            v-model="selected"
            :level="1"
            :data="pcaa"
            :type="code"
            :placeholders="['省份','城市']">
        </area-select>
        <el-button
            type="primary"
            size="small"
            icon="el-icon-search"
            @click="searchCity">
            查询
        </el-button>
    </el-row>
    <el-row :gutter="20">
        <el-col :span="5">
            <el-card>
                <div class="text item" :title="wendu">实时温度{{wendu}}°C</div>
            </el-card>
        </el-col>
        <el-col :span="19">
            <el-card>
                <div class="text item" :title="ganmao">{{ganmao}}</div>
            </el-card>
        </el-col>
    </el-row>
    <el-card>
        <div id="demo" style="width: '100%';height: 350px;"></div>
    </el-card>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import 'vue-area-linkage/dist/index.css'
import { AreaSelect } from 'vue-area-linkage'
import { pcaa } from 'area-data'
Vue.use(AreaSelect)

export default {
  name: 'WeatherFore',
  components: {
    AreaSelect
  },
  data () {
    return {
      city: '芜湖市',
      selected: [],
      pcaa: pcaa,
      code: 'text',
      ganmao: '',
      wendu: ''
    }
  },
  mounted () {
    this.renderChart(this.city)
    this.resizeInit()
  },
  methods: {
    open () {
      const h = this.$createElement

      this.$notify({
        title: '提示',
        message: h('i', { style: 'color: teal' }, '港澳台及少部分地区暂无数据')
      })
    },
    searchCity () {
      if (this.selected[1] === '市辖区') {
        this.city = this.selected[0]
        this.renderChart(this.selected[0])
      } else if (this.selected[0] === '台湾省' || this.selected[0] === '港澳') {
        this.open()
      } else {
        this.city = this.selected[1]
        this.renderChart(this.selected[1])
      }
    },
    renderChart (city) {
      const date = []; const high = []; const low = []; const _this = this
      axios.get(`https://www.apiopen.top/weatherApi?city=${city}`)
        .then(res => {
          if (res.data.code === 200) {
            _this.ganmao = res.data.data.ganmao
            _this.wendu = res.data.data.wendu
            date.push(res.data.data.yesterday.date.slice(0, -3))
            high.push(parseFloat(res.data.data.yesterday.high.slice(3)))
            low.push(parseFloat(res.data.data.yesterday.low.slice(3)))
            res.data.data.forecast.map(item => {
              date.push(item.date.slice(0, -3))
              high.push(parseFloat(item.high.slice(3)))
              low.push(parseFloat(item.low.slice(3)))

              const elem = document.getElementById('demo')
              const myChart = _this.$echarts.init(elem)
              myChart.setOption({
                title: {
                  text: '近期气温变化',
                  subtext: _this.city || '芜湖'
                },
                tooltip: {
                  trigger: 'axis'
                },
                legend: {
                  data: ['最高气温', '最低气温']
                },
                toolbox: {
                  show: true,
                  feature: {
                    dataZoom: {
                      yAxisIndex: 'none'
                    },
                    dataView: { readOnly: false },
                    magicType: { type: ['line', 'bar'] },
                    restore: {},
                    saveAsImage: {}
                  }
                },
                xAxis: {
                  type: 'category',
                  boundaryGap: false,
                  data: date
                },
                yAxis: {
                  type: 'value',
                  axisLabel: {
                    formatter: '{value} °C'
                  }
                },
                series: [
                  {
                    name: '最高气温',
                    type: 'line',
                    data: high,
                    markPoint: {
                      data: [
                        { type: 'max', name: '最大值' },
                        { type: 'min', name: '最小值' }
                      ]
                    },
                    markLine: {
                      data: [
                        { type: 'average', name: '平均值' }
                      ]
                    },
                    label: {
                      show: true
                    }
                  },
                  {
                    name: '最低气温',
                    type: 'line',
                    data: low,
                    markPoint: {
                      data: [
                        { name: '周最低', value: -2, xAxis: 1, yAxis: -1.5 }
                      ]
                    },
                    markLine: {
                      data: [
                        { type: 'average', name: '平均值' },
                        [{
                          symbol: 'none',
                          x: '90%',
                          yAxis: 'max'
                        }, {
                          symbol: 'circle',
                          label: {
                            normal: {
                              position: 'start',
                              formatter: '最大值'
                            }
                          },
                          type: 'max',
                          name: '最高点'
                        }]
                      ]
                    },
                    label: {
                      show: true
                    }
                  }
                ]
              })
            })
          } else {
            _this.open()
          }
        }).catch(err => {
          console.error(err)
        })
    },
    resizeInit () {
      const self = this
      window.onresize = function () {
        self.debounce(self.init, 2000)()
      }
    },
    //  函数防抖，在2s内多次触发resize，都不会执行，超过2秒才会执行重置元素
    debounce (fn, delay) {
      return function () {
        if (fn.deferTime) {
          clearTimeout(fn.deferTime)
        }
        fn.deferTime = setTimeout(function () {
          fn()
        }, delay)
      }
    },
    init () {
      this.myChart = this.$echarts.init(document.getElementById('demo'))
      this.myChart.resize()
    }
  }
}
</script>

<style lang="scss" scoped>
    .el-row {
        margin-bottom: 15px;
        .area-select-wrap {
            margin-right: 15px;
            &:first-child {
                margin-left: -10px;
            }
        }
    }
    .text.item {
        white-space: nowrap;
        font-weight: 600;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>
