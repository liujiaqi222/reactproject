
import axios from 'axios'

// 拦截重复请求
import type { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
export class RequestCanceler {
  // 存储每个请求的标志和取消函数
  pendingRequest: Map<string, AbortController>
  constructor() {
    this.pendingRequest = new Map<string, AbortController>()
  }
  generateReqKey(config: AxiosRequestConfig): string {
    const { method, url, params, data } = config
    return [url || '', method || '', queryString(params || {}), queryString(data || {})].join('&')
  }
  addPendingRequest(config: AxiosRequestConfig) {
    const requestKey: string = this.generateReqKey(config)
    if (!this.pendingRequest.has(requestKey)) {
      const controller = new AbortController()
      // 给config挂载signal
      config.signal = controller.signal
      this.pendingRequest.set(requestKey, controller)
    } else {
      // 如果requestKey已经存在，则获取之前设置的controller，并挂载signal
      config.signal = (this.pendingRequest.get(requestKey) as AbortController).signal
    }
  }
  removePendingRequest(config: AxiosRequestConfig) {
    const requestKey = this.generateReqKey(config)
    if (this.pendingRequest.has(requestKey)) {
      // 取消请求
      (this.pendingRequest.get(requestKey) as AbortController).abort()
      // 从pendingRequest中删掉
      this.pendingRequest.delete(requestKey)
    }
  }
}

// 序列化对象，推荐用qs库,这里就简单的手写吧
interface Obj {
  [name: string]: number | null | string | undefined | boolean
}
function queryString(obj: Obj): string {
  const params = new URLSearchParams()
  // 可能是对象或者stringify后的对象
  if (typeof obj === 'string') {
    obj = JSON.parse(obj) as Obj
  }
  Object.keys(obj).forEach(key => {
    params.append(key, String(obj[key]))
  })
  return params.toString()
}



const canceler = new RequestCanceler()
// 设置全局超时 2min
axios.defaults.timeout = 120000
// 创建axios实例
 const service = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  transformRequest: [
    function (data) {
      return JSON.stringify(data)
    },
  ],
})

export default service

// 添加请求拦截器
service.interceptors.request.use(
  function (config) {
    // 检查是否存在重复请求，若存在则取消已发的请求
    canceler.removePendingRequest(config)
    // 把当前的请求信息添加到pendingRequest
    canceler.addPendingRequest(config)
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
service.interceptors.response.use(
  function (response: AxiosResponse) {
    canceler.removePendingRequest(response.config)
    return response.data
  },
  function (error: AxiosError) {
    canceler.removePendingRequest(error.config!)
    if (axios.isCancel(error)) {
      return {
        success: false,
        message: 'repeat request',
      }
    }
    return Promise.reject(error)
  }
)

service.defaults.baseURL = 'http://localhost:3000'

export * from './netEase'