import {Box, Button, Stack, TextField, Typography} from '@mui/material'
import {useForm, Controller} from 'react-hook-form'
import React from 'react'
import {toaster} from '../../../utils/toast'

interface LoginFormValues {
  email: string
  password: string
  certNumber?: string
}

export default function LoginForm() {
  const {control, handleSubmit} = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
      certNumber: '',
    },
  })

  const onSubmit = (e: LoginFormValues) => {}

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <Box>
          <Typography sx={{fontSize: '12px', color: '#202A38', fontWeight: '700'}}>이메일</Typography>
          <Controller
            name='email'
            control={control}
            defaultValue=''
            render={({field}) => <TextField fullWidth placeholder='이메일을 입력해주세요' {...field} />}
          />
        </Box>
        <Box>
          <Typography sx={{fontSize: '12px', color: '#202A38', fontWeight: '700'}}>비밀번호</Typography>
          <Controller
            name='password'
            control={control}
            defaultValue=''
            render={({field}) => <TextField fullWidth placeholder='비밀번호를 입력해주세요' {...field} />}
          />
        </Box>
        <Box>
          <Typography sx={{fontSize: '12px', color: '#202A38', fontWeight: '700'}}>인증번호</Typography>
          <Controller
            name='certNumber'
            control={control}
            defaultValue=''
            render={({field}) => <TextField fullWidth placeholder='인증번호를 입력해주세요' {...field} />}
          />
        </Box>
      </Stack>
      <Button fullWidth variant='contained' sx={{mt: '20px', backgroundColor: 'black'}} type='submit'>
        로그인
      </Button>
    </form>
  )
}
