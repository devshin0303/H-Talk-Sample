import {Box} from '@mui/material'
import {Outlet} from 'react-router-dom'

export default function BlankLayout() {
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        height: '100vh',
        background: '#f5f9fe',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Outlet />
    </Box>
  )
}
