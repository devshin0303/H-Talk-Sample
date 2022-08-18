import {Box, Button, Stack, TextField, Typography} from '@mui/material'
import {useForm, Controller, Control, FieldPath} from 'react-hook-form'
import React, {useCallback, useState} from 'react'
import {useMutation} from 'react-query'
import {loginService} from '../../../service/login/loginService'
import {HError} from '../../../service/common/types'
import {LoginRequest, CertPwRequest, CertPwConfirm} from '../../../service/login/login'

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

function LoginField({control, name, label, placeHolder, type}: LoginFieldProps) {
  return (
    <Box>
      <Typography sx={{fontSize: '12px', color: '#202A38', fontWeight: '700'}}>{label}</Typography>
      <Controller
        name={name}
        control={control}
        render={({field}) => (
          <TextField {...field} size='small' required fullWidth type={type} placeholder={placeHolder} />
        )}
      />
    </Box>
  )
}

export default function LoginForm() {
  const [isCertNumberField, setIsCertNumberField] = useState<boolean>(false)

  const {control, handleSubmit} = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
      certNumber: undefined,
    },
  })

  const cert = useMutation(loginService.certPw, {
    onSuccess: () => {
      window.alert('인증번호를 요청했습니다.')
    },
    onError: (error: HError) => {
      window.Error(error.message)
    },
  })

  const loginPw = useMutation(loginService.loginPw, {
    onSuccess: (res) => {
      console.log('로그인 성공', res)
    },
    onError: (error: HError) => {
      window.Error(error.message)
    },
  })

  const certConfirm = useMutation(loginService.certConfirmPw, {
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
