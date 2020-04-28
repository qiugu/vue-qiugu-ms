import http from '@/utils/request'

export function getEditorTable () {
  return http('/table/getTableData', {})
}
