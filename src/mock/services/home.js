import Mock from 'mockjs'
import { response } from '../util'

Mock.mock('/home/statistics', options => {
  return response(
    200,
    [
      { id: Mock.Random.id(), title: '用户访问量', amount: Mock.Random.integer(0, 10 ^ 7), icon: 'fa-hourglass-end' },
      { id: Mock.Random.id(), title: '系统消息', amount: Mock.Random.integer(0, 10 ^ 7), icon: 'fa-tags' },
      { id: Mock.Random.id(), title: '数量', amount: Mock.Random.integer(0, 10 ^ 7), icon: 'fa-shopping-bag' }
    ],
    '成功'
  )
})
