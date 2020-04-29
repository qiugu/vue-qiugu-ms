import Mock from 'mockjs'
import { getPostParams, response } from '../util'

Mock.mock('/user/getroles', options => {
  const params = getPostParams(options.body)

  // 管理员登录
  if (params.username === 'admin' && params.password === 'admin') {
    return response(
      200,
      {
        username: params.username,
        token: Mock.Random.guid(),
        roles: ['admin']
      },
      '登录成功'
    )
  }

  if (params.username === 'guest' && params.password === 'guest') {
    return response(
      200,
      {
        username: params.username,
        token: Mock.Random.guid(),
        roles: ['user'] // 每次返回用户信息必须带上角色字段，否则会重复检查路由信息
      },
      '登录成功'
    )
  }

  return response(401, {}, '账号或密码错误！')
})
