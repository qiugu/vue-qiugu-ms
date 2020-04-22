import Mock from 'mockjs'
import { response } from '../util'

Mock.mock('/home/statistics', options => {
  return response(
    200,
    {
      statistics: [
        { id: Mock.Random.id(), title: '用户访问量', amount: Mock.Random.integer(1000, 10 ^ 7), icon: 'fa-hourglass-end' },
        { id: Mock.Random.id(), title: '系统消息', amount: Mock.Random.integer(1000, 10 ^ 7), icon: 'fa-tags' },
        { id: Mock.Random.id(), title: '数量', amount: Mock.Random.integer(1000, 10 ^ 7), icon: 'fa-shopping-bag' }
      ],
      title: '学习占比',
      proportion: [
        { id: Mock.Random.id(), name: 'Vue', percent: Mock.Random.integer(0, 100), color: Mock.Random.color() },
        { id: Mock.Random.id(), name: 'JavaScript', percent: Mock.Random.integer(0, 100), color: Mock.Random.color() },
        { id: Mock.Random.id(), name: 'TypeScript', percent: Mock.Random.integer(0, 100), color: Mock.Random.color() },
        { id: Mock.Random.id(), name: 'React', percent: Mock.Random.integer(0, 100), color: Mock.Random.color() },
        { id: Mock.Random.id(), name: 'Flutter', percent: Mock.Random.integer(0, 100), color: Mock.Random.color() }
      ],
      userData: {
        city: Mock.Random.city()
      },
      todos: [
        { id: Mock.Random.id(), text: Mock.Random.csentence(10, 100), done: false },
        { id: Mock.Random.id(), text: Mock.Random.csentence(10, 100), done: false },
        { id: Mock.Random.id(), text: Mock.Random.csentence(10, 100), done: false },
        { id: Mock.Random.id(), text: Mock.Random.csentence(10, 100), done: false },
        { id: Mock.Random.id(), text: Mock.Random.csentence(10, 100), done: false },
        { id: Mock.Random.id(), text: Mock.Random.csentence(10, 100), done: false }
      ]
    },
    '成功'
  )
})
