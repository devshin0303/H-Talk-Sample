import React from 'react'
import {Box, CardMedia, Stack, Typography} from '@mui/material'
import {Helmet} from 'react-helmet-async'
import LoginForm from '../components/authentication/login/LoginForm'

export default function Login() {
  return (
    <Box title='Login'>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <Box
        sx={{
          width: '560px',
          background: 'white',
          borderRadius: '6px',
          padding: '40px 100px',
        }}>
        <Typography
          align='center'
          sx={{fontWeight: '700', color: '#202A38', fontSize: ' 20px', lineHeight: '1.2', mb: '30px'}}>
          H-talk에 오신 걸 환영합니다.
        </Typography>
        <LoginForm />
        <Stack
          alignItems='center'
          sx={{
            position: 'absolute',
            top: '100px',
            left: '50%',
            transform: 'translate(-50%, 0)',
          }}>
          <CardMedia component='img' image='/static/logo-severance.png' alt='세브란스 병원 로고' />
        </Stack>
      </Box>
    </Box>
  )
}
