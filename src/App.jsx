import { useState, useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Client from './services/api'
import Login from './pages/Login'
import CreateUser from './pages/CreateUser'



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
    if (response.status !== 200) {

    } else {
      setUser(response.data.user)
      setToken(response.data.token)
      navigate('/')

    }
  }

  const signupSubmit = async(event) => {
    event.preventDefault()
    const response = await Client.post('/auth/register', {
      username: event.target.username.value,
      email: event.target.email.value,
      password: event.target.password.value
    })

    if (response.status === 200) {
      navigate('/login')
    } else {
      navigate('/register')
    }

  }

  return (
    <>
      <header></header>
      <main>
        <Routes>
          <Route path='/login' element={ <Login onSubmit={loginSubmit} />} />
          <Route path='/register' element={ <CreateUser onSubmit={signupSubmit} />} />
          <Route />
          <Route />
        </Routes>
      </main>
      <footer></footer>
    </>
  )
}

export default App
