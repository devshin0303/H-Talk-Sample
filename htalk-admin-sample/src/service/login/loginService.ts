import {service} from '../common/server'
import {CertConfirmResponse, CertPwConfirm, CertPwRequest, LoginRequest, LoginResponse} from './login'

const BASEURL = '/auth/v1'

export interface LoginService {
  certPw(request: CertPwRequest): Promise<void>
  certConfirmPw(request: CertPwConfirm): Promise<CertConfirmResponse>
  loginPw(request: LoginRequest): Promise<LoginResponse>
}

export const loginService: LoginService = {
  certPw(request: CertPwRequest): Promise<void> {
    return service.post(`${BASEURL}/cert/pw`, request)
  },
  certConfirmPw(request: CertPwConfirm): Promise<CertConfirmResponse> {
    return service.post(`${BASEURL}/cert/confirm/pw`, request)
  },
  loginPw(request: LoginRequest): Promise<LoginResponse> {
    return service.post(`${BASEURL}/login/pw`, request)
  },
}
