import {YN} from '../common/types'

export type CertType = 'JOIN' | 'LOGIN'

//인증번호 요청
export interface CertPwRequest {
  certType: CertType
  email: string
  password: string
}

//인증번호 확인
export interface CertPwConfirm extends CertPwRequest {
  certNumber: string
}

export interface CertConfirmResponse {
  certId: string
  isUser: YN
}

//로그인
export interface LoginRequest {
  certType: CertType
  email: string
  password: string
  certId: string
}

export interface Token {
  accessToken?: string
  refreshToken?: string
  expiresIn?: string
}

export interface VoipActivation {
  userId: string
  userPwd: string
  displayInfo: string
  domainName: string
  serverIp: string
  serverPort: string
  codec: string
  voipNum: string
  voipId: string
}

export interface LoginResponse {
  token: Token
  voipActivation: VoipActivation
}
