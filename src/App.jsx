import { useState, useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import './style/main.css'
import Client from './services/api'
import Login from './pages/Login'
import Register from './pages/Register'
import Garage from './pages/Garage'
import AddCar from './components/AddCar'
import Home from './pages/Home'
import Vehicle from './pages/Vehicle'



function App() {

  document.title= "Chop Shop"

  const navigate = useNavigate()
  const [user, setUser] = useState()

  const CheckSession = async () => {
    try {
      const res = await Client.get('/auth/session')
      return res.data
    } catch(error) {
      throw error
    }
  }

  const checkToken = async () => {
    const user = await CheckSession()
    setUser(user)
  }

  const loginSubmit = async(event) => {
    event.preventDefault()
    const response = await Client.post('/auth/login', {
    email: event.target.email.value,
    password: event.target.password.value,
    })
    if (response.status !== 200) {

    } else {
      setUser(response.data.user)
      localStorage.setItem('token', response.data.token)
      navigate('/garage')

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

  const signout = async () => {
    localStorage.removeItem('token')
    setUser()
    navigate('/')
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      checkToken()
    }
  }, [])

  return (
    <>
      <header>
        { user ? 
        (
          <div className='navBar'>
            <a href='/garage' className='navOption'>My Garage</a>
            <a href='/' className='navOption'>Home</a>
            <button className='navButton' onClick={signout}>Sign Out</button>
          </div>
        ) : (
          <div className='navBar'>
            <a href="/" className='navOption'>Home</a>
            <a href="/login" className='navOption'> Login </a>
            <a href="/register" className='navOption'> Register </a>
          </div>
        ) }
      </header>
      <main>
        <Routes>
          <Route path='/' element={ <Home /> } />
          <Route path='/login' element={ <Login onSubmit={loginSubmit} />} />
          <Route path='/register' element={ <Register onSubmit={signupSubmit} />} />
          <Route path='/garage' element={ <Garage user={user} /> } />
          <Route path='/garage/:id' element={ <Vehicle user={user} />} />
        </Routes>
      </main>
      <footer></footer>
    </>
  )
}

export default App
