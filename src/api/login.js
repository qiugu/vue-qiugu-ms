import http from '@/axios'

export function loginByUsername(username, password) {
  const data = {
    username,
    password
  }
  return http({
    url: '/user/login',
    method: 'post',
    data
  })
}
