import http from '@/utils/request'

export function getStatistics () {
  return http('/home/statistics', {})
}
