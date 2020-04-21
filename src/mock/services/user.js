import Mock from 'mockjs'
import { getPostParams, response } from '../util'

Mock.mock('/user/getroles', options => {
  const params = getPostParams(options.body)

  if (params.username !== 'guest' || params.password !== 'guest') {
    return response(401, {}, '账号或密码错误！')
  }

  return response(
    200,
    {
      username: params.username,
      roles: {}
    },
    '登录成功'
  )
})
