import http from '@/axios'

export function loginByUsername(username, password) {
  const data = {
    username,
    password
  }
  return http({
    url: 'http://localhost:8080/user/login',
    method: 'post',
    data
  })
}
