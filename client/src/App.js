import './App.css'
import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { CheckSession } from './services/UserServices'

import Login from './pages/Login'
import Register from './pages/Register'
import AccountDetails from './pages/AccountDetails'
import UserHome from './pages/UserHome'
import GeneDetails from './pages/GeneDetails'
import Nav from './components/Nav'

function App() {
  const [user, setUser] = useState(null)

  const checkToken = async () => {
    const user = await CheckSession()
    setUser(user)
  }

  const handleLogOut = () => {
    //Reset all auth related state and clear localStorage
    setUser(null)
    localStorage.clear()
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      checkToken()
    }
  }, [])

  return (
    <div>
      <div className="header-container">
        <Nav />
      </div>
      <Routes>
        {/* <Route path="/" element={<Login setUser={setUser}/>} /> */}
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/account-details"
          element={<AccountDetails user={user} handleLogOut={handleLogOut} />}
        />
        <Route path="/user-home" element={<UserHome />} />
        <Route path="/gene/:gene_uid" element={<GeneDetails />} />
      </Routes>
    </div>
  )
}

export default App
