import React from 'react'
import {QueryClient, QueryClientProvider} from 'react-query'
import Router from './Router'
import {CssBaseline} from '@mui/material'
import {ToastContainer} from 'react-toastify'

const queryClient = new QueryClient({defaultOptions: {queries: {staleTime: 10000, refetchOnWindowFocus: false}}})

function App() {
  return (
    <>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <Router />
        <ToastContainer />
      </QueryClientProvider>
    </>
  )
}

export default App
