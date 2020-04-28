import Mock from 'mockjs'
import { response } from '../util'

const { result } = Mock.mock({
  'result|80-100': [Mock.mock({
    id: '@uuid',
    user: '@cname',
    ip: '@ip',
    count: '@integer(100,1000)',
    date: '@datetime',
    remark: '@csentence'
  })]
})

Mock.mock('/table/getTableData', options => {
  return response(
    200,
    result,
    '登录成功'
  )
})
