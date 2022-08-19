import {Box, Button, Stack, TextField, Typography} from '@mui/material'
import {useForm, Controller, Control, FieldPath} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import React, {useCallback, useState} from 'react'
import {useMutation} from 'react-query'
import {login} from '../../../service/login/loginService'
import {HError} from '../../../service/common/types'
import {LoginRequest, CertPwRequest, CertPwConfirm} from '../../../service/login/login'
import {useStore} from '../../../store/store'
import * as Yup from 'yup'

interface LoginFormValues {
  email: string
  password: string
  certNumber?: string
}

interface LoginFieldProps {
  control: Control<LoginFormValues>
  name: FieldPath<LoginFormValues>
  label: string
  placeHolder: string
  type?: string
}

//로그인 필드 컴포넌트로 분리
function LoginField({control, name, label, placeHolder, type}: LoginFieldProps) {
  return (
    <Box>
      <Typography sx={{fontSize: '12px', color: '#202A38', fontWeight: '700'}}>{label}</Typography>
      <Controller
        name={name}
        control={control}
        defaultValue=''
        render={({field}) => (
          <TextField {...field} size='small' required fullWidth type={type} placeholder={placeHolder} />
        )}
      />
    </Box>
  )
}

export default function LoginForm() {
  const {saveToken} = useStore()

  //loginField Value Validation Check
  const loginValidationSchema = Yup.object({
    email: Yup.string().email().required('이메일을 입력해주세요.'),
    password: Yup.string().required('비밀번호를 입력해주세요.'),
    certNumber: Yup.string().required('인증번호를 입력해주세요'),
  })

  //인증번호 입력필드 유무를 위한 state
  const [isCertNumberField, setIsCertNumberField] = useState<boolean>(false)

  const {control, handleSubmit} = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
      certNumber: undefined,
    },
    resolver: yupResolver(loginValidationSchema),
  })

  //인증번호 요청
  const cert = useMutation(login.certPw, {
    onSuccess: () => {
      window.alert('인증번호를 요청했습니다.')
    },
    onError: (error: HError) => {
      window.Error(error.message)
    },
  })

  //로그인
  const loginPw = useMutation(login.loginPw, {
    onSuccess: (res) => {
      window.alert('로그인에 성공하였습니다.')
      console.log('로그인 성공', res)
      const {token} = res
      saveToken(token)
    },
    onError: (error: HError) => {
      window.Error(error.message)
    },
  })

  //인증번호 확인
  const certConfirm = useMutation(login.certConfirmPw, {
    onSuccess: (res, req) => {
      const loginRequest: LoginRequest = {
        certType: 'LOGIN',
        certId: res.certId,
        email: req.email,
        password: req.password,
      }
      loginPw.mutate(loginRequest)
    },
    onError: (error: HError) => {
      console.log(error.message)
      window.alert(error.message)
    },
  })

  const onSubmit = useCallback(
    (e: LoginFormValues) => {
      if (isCertNumberField) {
        if (e.certNumber) {
          const certConfirmRequest: CertPwConfirm = {
            certType: 'LOGIN',
            email: e.email,
            password: e.password,
            certNumber: e.certNumber,
          }
          certConfirm.mutate(certConfirmRequest)
        }
      } else {
        const certRequest: CertPwRequest = {
          certType: 'LOGIN',
          email: e.email,
          password: e.password,
        }
        cert.mutate(certRequest)
        setIsCertNumberField(true)
      }
    },
    [isCertNumberField, cert, certConfirm]
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <LoginField control={control} name='email' placeHolder='이메일을 입력해주세요' label='이메일' type='email' />
        <LoginField
          control={control}
          name='password'
          placeHolder='비밀번호를 입력해주세요'
          label='비밀번호'
          type='password'
        />
        {isCertNumberField && (
          <LoginField
            control={control}
            name='certNumber'
            placeHolder='인증번호(6자리)를 입력해주세요'
            label='인증번호'
          />
        )}
      </Stack>
      <Button fullWidth variant='contained' sx={{mt: '20px', backgroundColor: 'black'}} type='submit'>
        로그인
      </Button>
    </form>
  )
}
