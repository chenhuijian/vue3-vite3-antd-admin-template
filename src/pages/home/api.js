import request from '@/utils/request.js'

/**
 * 获取企业列表
 * @param params
 * @returns {*}
 */
export function getEnterpriseList(params) {
  return request({
    method: 'get',
    url: '/enterprise/getList',
    params
  })
}
