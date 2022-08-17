import React from 'react'
import {QueryClient, QueryClientProvider} from 'react-query'
import Router from './Router'
import {CssBaseline} from '@mui/material'

const queryClient = new QueryClient({defaultOptions: {queries: {staleTime: 10000, refetchOnWindowFocus: false}}})

function App() {
  return (
    <>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </>
  )
}

export default App
