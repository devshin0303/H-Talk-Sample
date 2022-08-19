import axios from 'axios'
import {service} from '../common/axiosInstance'
import {CertConfirmResponse, CertPwConfirm, CertPwRequest, LoginRequest, LoginResponse} from './login'

const AUTH_URL = '/auth/v1'

export interface LoginService {
  certPw(request: CertPwRequest): Promise<void>
  certConfirmPw(request: CertPwConfirm): Promise<CertConfirmResponse>
  loginPw(request: LoginRequest): Promise<LoginResponse>
}

export const loginService: LoginService = {
  certPw(request: CertPwRequest): Promise<void> {
    return service.post(`${AUTH_URL}/cert/pw`, request)
  },
  certConfirmPw(request: CertPwConfirm): Promise<CertConfirmResponse> {
    return service.post(`${AUTH_URL}/cert/confirm/pw`, request)
  },
  loginPw(request: LoginRequest): Promise<LoginResponse> {
    return service.post(`${AUTH_URL}/login/pw`, request)
  },
}

export const login: LoginService = {
  certPw(request: CertPwRequest): Promise<void> {
    return axios
      .post(`${AUTH_URL}/cert/pw`, request)
      .then((res) => res.data)
      .catch((error) => error.response.data)
  },
  certConfirmPw(request: CertPwConfirm): Promise<CertConfirmResponse> {
    return axios
      .post(`${AUTH_URL}/cert/confirm/pw`, request)
      .then((res) => res.data)
      .catch((error) => error.response.data)
  },
  loginPw(request: LoginRequest): Promise<LoginResponse> {
    return axios
      .post(`${AUTH_URL}/login/pw`, request)
      .then((res) => res.data)
      .catch((error) => error.response.data)
  },
}
