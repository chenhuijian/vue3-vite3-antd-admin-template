import axios from 'axios'

let inTheRequest = {}

const service = axios.create({
  headers: {
    'Content-Type': 'application/json'
    // 'Content-Type': 'application/x-www-form-urlencoded'
  }
})


// 请求拦截
service.interceptors.request.use(
  config => {
    // console.log('request=====>', config)
    // 中断接口 上一个相同接口没有请求完中断接口
    if (inTheRequest[config.url]) {
      inTheRequest[config.url]('interrupt')
    }
    // 添加断开请求的方法
    config['cancelToken'] = new axios.CancelToken(cancel => {
      inTheRequest[config.url] = cancel //存储cancle
    })
    // 删除 参数中的 null ，axios 会自动删除 undefined
    try {
      if (config.data) {
        for (let key in config.data) {
          if (config.data[key] === null) {
            delete config.data[key]
          }
        }
      }
    } catch (e) {
      console.log(e)
    }
    // 添加请求头
    // config.headers.timestamp = new Date().getTime()
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)


// 响应拦截
service.interceptors.response.use(
  response => {
    // 接口请求完成去除接口中断方法
    delete inTheRequest[response.config.url]
    if (response.status === 200) {
      return response.data
    }
    return response
  },
  error => {
    if (error.message.includes('timeout')) {
      return Promise.reject('网络超时')
    }
    return Promise.reject(error)
  }
)


export default service
