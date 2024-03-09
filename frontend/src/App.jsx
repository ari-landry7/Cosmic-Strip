import * as React from 'react'
import './App.css'
import AppRoutes from './routes/AppRoutes'
import { UserProvider } from './context/UserContext'
import { PostProvider } from './context/PostContext'

import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#7c4dff',
    },
    secondary: {
      main: '#64b5f6',
    },
    text: {
      primary: '#ede7f6',
    },
  },
  typography: {
    fontFamily: 'Kode Mono'
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <UserProvider>
          <PostProvider>
            <AppRoutes />
          </PostProvider>
        </UserProvider>
      </ThemeProvider>
    </>
  )
}

export default App
