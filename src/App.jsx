import { useState, useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Client from './services/api'
import Login from './pages/Login'



function App() {

  const navigate = useNavigate()
  const [user, setUser] = useState()
  const [token, setToken] = useState()
  const loginSubmit = async(event) => {
  event.preventDefault()
  const response = await Client.post('/auth/login', {
    email: event.target.email.value,
    password: event.target.password.value,
  })
  setUser(response.data.user)
  setToken(response.data.token)
  navigate('/')
  }

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, token])
  return (
    <>
      <header></header>
      <main>
        <Routes>
          <Route path='/login' element={ <Login onSubmit={loginSubmit} />} />
          <Route />
          <Route />
        </Routes>
      </main>
      <footer></footer>
    </>
  )
}

export default App
