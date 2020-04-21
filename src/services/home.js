import http from '@/utils/request'

export function getStatistics (username, password) {
  return http('/home/statistics', {})
}
