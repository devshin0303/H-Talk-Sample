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
// Outlet : 부모 경로 요소에서 자식 경로 요소를 렌더링하는데 사용한다. 하위 경로가 렌더링될 때 중첩된 UI가 표시
