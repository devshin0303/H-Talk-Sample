import axios from 'axios'

export const service = {
  post<T, R>(url: string, request: T, params?: any): Promise<R> {
    return axios
      .post(url, request, {params})
      .then((res) => res.data)
      .catch((error) => {
        throw error.response.data
      })
  },
  get<R>(url: string, params?: any): Promise<R> {
    return axios
      .get(url, {params})
      .then((res) => res.data)
      .catch((error) => {
        throw error.response.data
      })
  },
  init() {
    axios.defaults.baseURL = 'https://htalk-api.helixtech.co.kr'
    axios.defaults.headers.common['App-Agent'] = 'AppVersion:1.0.0;DeviceType:PC;DeviceAuthType:WEB'
    axios.defaults.headers.common['Content-Type'] = 'application/json'
  },
}
