import axios from 'axios'
import { AlertDialog } from "@radix-ui/react-alert-dialog";
import { BASE_URL } from '@/constant/request-url';

// 创建 Axios 实例
const service = axios.create({
  baseURL: BASE_URL, // Next.js 环境变量写法
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' }
})

/**
 * 请求拦截器
 * 功能：自动添加Token、Loading状态管理等
 */
service.interceptors.request.use(
  config => {
    // 1. 注入认证Token
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
    if (token) config.headers.Authorization = `${token}` // [1,5](@ref)
    
    // 2. 可在此处添加全局Loading动画
    // showLoading();
    
    return config
  },
  error => Promise.reject(error)
)

/**
 * 响应拦截器
 * 功能：统一处理状态码、错误消息、数据过滤
 */
service.interceptors.response.use(
  response => {
    // 1. 隐藏Loading
    // hideLoading();
    
    // 2. 根据业务状态码处理（示例）
    const res = response.data
    if (res.code !== 200) { // [3,8](@ref)
      showError(res.msg || '业务逻辑错误')
      return Promise.reject(new Error(res.msg))
    }
    
    // 3. 返回数据（过滤外层包装）
    return res // [6,10](@ref)
  },
  error => {
    // 1. HTTP状态码处理
    if (!error.response) {
      showError('网络连接异常，请检查网络')
    } else {
      switch (error.response.status) {
        case 401:
          showError('登录过期，请重新登录')
          localStorage.removeItem('token')
          // 页面跳转请在组件中处理
          break
        case 403:
          showError('无权访问该资源')
          break
        case 500:
          showError('服务器内部错误')
          break
        default:
          showError(`请求失败: ${error.msg}`)
      }
    }
    return Promise.reject(error)
  }
)

// 封装请求方法
class HttpService {

  static get<T = any>(url: string, params?: Record<string, any>, config: Record<string, any> = {}) {
    return service.get<T>(url, { ...config, params })
  }
  static post<T = any>(url: string, data?: Record<string, any>, config: Record<string, any> = {}) {
    return service.post<T>(url, data, config)
  }

  static put<T = any>(url: string, data?: Record<string, any>, config: Record<string, any> = {}) {
    return service.put<T>(url, data, config)
  }

  static delete<T = any>(url: string, params?: Record<string, any>, config: Record<string, any> = {}) {
    return service.delete<T>(url, { ...config, params })
  }
  static upload<T = any>(url: string, file: File) {
    const formData = new FormData()
    formData.append('file', file)
    return service.post<T>(url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' } // [2](@ref)
    })
  }
}

// 辅助函数：显示错误提示
function showError(msg: string) {
  console.error(msg)
  alert(msg);
  // 可接入UI提示
}



export default HttpService
