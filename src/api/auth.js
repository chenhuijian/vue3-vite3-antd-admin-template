import request from '@/utils/request.js'

/**
 * 获取验证码
 * @param params
 * @returns {*}
 */
export function getCode(params) {
  return request({
    method: 'get',
    url: '/user/getCode',
    params
  })
}


/**
 * 登录
 * @param params
 * @returns {*}
 */
export function login(params) {
  return request({
    method: 'post',
    url: '/user/login',
    data: params
  })
}

/**
 * 用户信息
 * @returns {*}
 */
export function getUserInfo() {
  return request({
    method: 'get',
    url: '/user/userInfo',
  })
}

/**
 * 用户菜单列表
 * @returns {*}
 */
export function getMenuList() {
  return request({
    method:'get',
    url:'/user/menulist'
  })
}


