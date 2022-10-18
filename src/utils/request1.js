import axios from 'axios'
import qs from 'qs'


const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API,
  timeout: 30000
})
// 请求拦截
service.interceptors.request.use(
  config => {
    removePendingRequest(config) // 检查是否存在重复请求
    addPendingRequest(config) // 将当前请求信息添加到 pendingRequest对象中
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// 响应拦截
service.interceptors.response.use(
  response => {
    console.log(response)
    // const res = response.data
    // if (res.code === 401) {
    //   cancelAjax()//登录过期，直接取消已发送的请求，避免多次弹窗
    //   return Promise.reject(new Error(res.msg || 'Error'))
    // }
    removePendingRequest(response.config) // 从 pendingRequest对象中移除请求
    return response
  },
  error => {
    removePendingRequest(error.config || {}) // 从 pendingRequest对象中移除请求
    if (axios.isCancel(error)) {
      console.log(error.message)
    } else {
      // 自行处理异常请求
    }
    return Promise.reject(error)
  }
)

// 生成 key
function generateReqKey(config) {
  const { method, url, params, data } = config
  return [method, url, qs.stringify(params), qs.stringify(data)].join('&')
}

// 把当前请求信息添加到
const pendingRequest = new Map()

function addPendingRequest(config) {
  const requestKey = generateReqKey(config)
  config.cancelToken = config.cancelToken || new axios.CancelToken((cancel) => {
    if (!pendingRequest.has(requestKey)) {
      pendingRequest.set(requestKey, cancel)
    }
  })
}

// 移除重复请求
function removePendingRequest(config) {
  const requestKey = generateReqKey(config)
  if (pendingRequest.has(requestKey)) {
    const cancelToken = pendingRequest.get(requestKey)
    cancelToken(requestKey)
    pendingRequest.delete(requestKey)
  }
}


/*

function cancelAjax(mes = '') {
  let cancelArr = window.axiosCancel
  cancelArr = cancelArr || []
  cancelArr.forEach((ele, index) => {
    ele.cancel(mes || '登录过期或登录已失效，需要重新登录')
    delete window.axiosCancel[index]
  })
}
*/


export default service
