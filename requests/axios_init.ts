import { showNotification } from '@mantine/notifications'
import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { API_URL } from './constants'

interface ApiProps {
  url: string
  data: any
  params?: {}
  hooks?: any
}

const alert = (title: string, message?: string) =>
  showNotification({
    title,
    message,
  })
function Redirect(msg: string, hooks: any) {
  alert(msg)
  localStorage.removeItem('token')
  hooks.push('/login')
}

function ErrorHandler(error: AxiosError, hooks: any) {
  // console.log(hooks)
  if (error.message.startsWith('timeout')) {
    alert('Time Out', 'Please check your internet!')
  }
  if (error.response) {
    // debugger
    let _error = error.response
    switch (_error.status) {
      case 400:
        alert('Bad request')
        break
      case 401:
        // Redirect('Unauthorized', hooks)
        alert('Unauthorized')
        break
      case 403:
        alert('Forbidden')
        break
      case 404:
        alert('Not Found')
        break
      case 500:
        alert('Internal Server Error')
        break
      default:
        break
    }
  }
}

const init = {
  request(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    url: string,
    params?: {},
    data?: any,
    hooks?: any
  ) {
    const token = localStorage.getItem('token')
    let config: AxiosRequestConfig = {
      baseURL: API_URL,
      timeout: 30000,
      url: url,
      method: method,
      onUploadProgress: function (e) {
        Math.round((e.loaded * 100) / e.total)
      },
    }
    if (token) {
      config.headers = {
        Authorization: token,
      }
    }
    if (data) config.data = data

    if (params) config.params = params

    let result = axios(config)

    return new Promise((resolve, reject) => {
      result
        .then((res) => {
          resolve(res.data)
        })
        .catch((error: AxiosError) => {
          ErrorHandler(error, hooks)
          reject(error)
        })
    })
  },
  get({ url, params, hooks }: Omit<ApiProps, 'data'>) {
    return this.request('GET', url, params, undefined, hooks)
  },
  post({ url, params, data, hooks }: ApiProps) {
    return this.request('POST', url, params, data, hooks)
  },
  put({ url, params, data, hooks }: ApiProps) {
    this.request('PUT', url, params, data, hooks)
  },
  delete({ url, params, hooks }: Omit<ApiProps, 'data'>) {
    this.request('DELETE', url, params, undefined, hooks)
  },
}

export default init
