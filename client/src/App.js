import './App.css'
import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { CheckSession } from './services/UserServices'
import Signin from './pages/Signin'
import Register from './pages/Register'
import AccountDetails from './pages/AccountDetails'
import UserHome from './pages/UserHome'
import GeneDetails from './pages/GeneDetails'
import SequenceDetails from './pages/SequenceDetails'
import Nav from './components/Nav'
import NoPage from './components/NoPage'
import SearchNCBI from './pages/SearchNCBI'

const App = () => {
  const [user, setUser] = useState(null)

  const checkToken = async () => {
    const user = await CheckSession()
    setUser(user)
  }

  const handleSignout = () => {
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

  const publicRoutes = (
    <Route path="/">
      <Route index element={<Signin setUser={setUser} />} />
      <Route path="/signin" element={<Signin setUser={setUser} />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<NoPage />} />
    </Route>
  )
  const authRoutes = (
    <Route path="/">
      <Route index element={<UserHome user={user} />} />
      <Route path="/userhome" element={<UserHome user={user} />} />
      <Route path="/searchncbi" element={<SearchNCBI />} />
      <Route
        path="/accountdetails"
        element={<AccountDetails user={user} handleSignout={handleSignout} />}
      />
      <Route path="/gene/:gene_uid" element={<GeneDetails user={user} />} />
      <Route
        path="/sequence/:seq_uid"
        element={<SequenceDetails user={user} />}
      />
      <Route path="*" element={<NoPage />} />
    </Route>
  )

  return (
    <div>
      <div className="header-container">
        <Nav user={user} handleSignout={handleSignout} />
      </div>
      <Routes>{user ? authRoutes : publicRoutes}</Routes>
    </div>
  )
}

export default App
