import axios, { AxiosError } from 'axios'
import store from '../store'
import { getToken } from './auth'
import { ElMessage, ElMessageBox } from 'element-plus'

// create an axios instance
const service = axios.create({
  // eslint-disable-next-line no-undef
  baseURL: import.meta.env.VITE_BASE_URL + '/game', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  (config) => {
    // do something before request is sent
    const hasToken = getToken()
    if (hasToken) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Authorization-Token'] = hasToken
    }
    return config
  },
  (error) => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {
    const res = response.data
    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 200) {
      // eslint-disable-next-line no-unused-expressions
      ElMessage({
        message: res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      }).error

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 400) {
        // to re-login
        ElMessageBox.confirm(
          'You have been logged out, you can cancel to stay on this page, or log in again',
          'Confirm logout',
          {
            confirmButtonText: 'Re-Login',
            cancelButtonText: 'Cancel',
            type: 'warning'
          }
        ).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new AxiosError(res.msg || 'Error'))
    } else {
      return res
    }
  },
  (error) => {
    console.log('err' + error) // for debug
    ElMessage({
      message: error.message,
      type: 'error',
      duration: 30 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
