import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AppRoutes from './routes/AppRoutes'
import { UserProvider } from './context/UserContext'
import { PostProvider } from './context/PostContext'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <UserProvider>
          <PostProvider>
            <AppRoutes />
          </PostProvider>
        </UserProvider>
      </div>
    </>
  )
}

export default App
