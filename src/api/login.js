import http from '@/utils/request'

export function loginByUsername (username, password) {
  const data = {
    username,
    password
  }
  return http({
    url: '/getroles',
    method: 'post',
    data
  })
}
