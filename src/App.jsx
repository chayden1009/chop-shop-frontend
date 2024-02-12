import { useState, useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Client from './services/api'
import Login from './pages/Login'
import CreateUser from './pages/CreateUser'
import Garage from './pages/Garage'
import AddCar from './pages/AddCar'
import Home from './pages/Home'



function App() {

  const navigate = useNavigate()
  const [user, setUser] = useState()
  const [cars, setCars] = useState([])

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

  const createCar = async (event) => {
    event.preventDefault()
    const response = await Client.post('/cars', 
      {
        year: event.target.year.value,
        make: event.target.make.value,
        model: event.target.model.value,
        engine: event.target.engine.value,
        trim: event.target.trim.value,
        issues: [],
        user: user.id,
      }
    )
    navigate('/garage')
  }

  const signout = async () => {
    localStorage.removeItem('token')
    setUser()
  }

  useEffect(() => {
    const getCars = async() => {
      const myCars = Client.get('/cars', {user: `65ca89e015212c070638bf1`})
    }
    setCars(getCars())
  }, [user])

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
          <div>
            <a href='/garage'>My Garage</a>
            <a href='/'>Home</a>
            <button onClick={signout}>Sign Out</button>
          </div>
        ) : (
          <div>
            <a href="/login"> Login </a>
            <a href="/register"> Register </a>
          </div>
        ) }
      </header>
      <main>
        <Routes>
          <Route path='/' element={ <Home /> } />
          <Route path='/login' element={ <Login onSubmit={loginSubmit} />} />
          <Route path='/register' element={ <CreateUser onSubmit={signupSubmit} />} />
          <Route path='/garage' element={ <Garage user={user} /> } />
          <Route path='/garage/add' element={ <AddCar onSubmit={createCar} user={user} cars={cars}/> } />
        </Routes>
      </main>
      <footer></footer>
    </>
  )
}

export default App
