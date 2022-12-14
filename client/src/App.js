import './App.css'
import { Routes, Route, useNavigate } from 'react-router-dom'
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
  // const [geneSumm, setGeneSumm] = useState(null) // take this out, eventually
  const [currentGeneSumm, setCurrentGeneSumm] = useState(null)
  const [needGeneSumm, setNeedGeneSumm] = useState(true)
  const [currentSeqSumm, setCurrentSeqSumm] = useState(null)
  const [needSeqSumm, setNeedSeqSumm] = useState(true)

  let navigate = useNavigate()

  const checkToken = async () => {
    const user = await CheckSession()
    setUser(user)
  }

  const handleSignout = () => {
    //Reset all auth related state and clear localStorage
    setUser(null)
    setCurrentGeneSumm(null)
    setNeedGeneSumm(true)
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
      <Route
        index
        element={
          <UserHome
            user={user}
            setCurrentGeneSumm={setCurrentGeneSumm}
            setNeedGeneSumm={setNeedGeneSumm}
            setCurrentSeqSumm={setCurrentSeqSumm}
            setNeedSeqSumm={setNeedSeqSumm}
          />
        }
      />
      <Route
        path="/userhome"
        element={
          <UserHome
            user={user}
            setCurrentGeneSumm={setCurrentGeneSumm}
            setNeedGeneSumm={setNeedGeneSumm}
            setCurrentSeqSumm={setCurrentSeqSumm}
            setNeedSeqSumm={setNeedSeqSumm}
          />
        }
      />
      <Route
        path="/searchncbi"
        element={
          <SearchNCBI
            setCurrentGeneSumm={setCurrentGeneSumm}
            setNeedGeneSumm={setNeedGeneSumm}
          />
        }
      />
      <Route
        path="/accountdetails"
        element={<AccountDetails user={user} handleSignout={handleSignout} />}
      />
      <Route
        path="/gene/:gene_uid"
        element={
          <GeneDetails
            user={user}
            currentGeneSumm={currentGeneSumm}
            setCurrentGeneSumm={setCurrentGeneSumm}
            needGeneSumm={needGeneSumm}
            setNeedGeneSumm={setNeedGeneSumm}
            setCurrentSeqSumm={setCurrentSeqSumm}
            setNeedSeqSumm={setNeedSeqSumm}
          />
        }
      />
      <Route
        path="/gene/:gene_uid/sequence/:seq_uid"
        element={
          <SequenceDetails
            user={user}
            currentGeneSumm={currentGeneSumm}
            setCurrentGeneSumm={setCurrentGeneSumm}
            setNeedGeneSumm={setNeedGeneSumm}
            currentSeqSumm={currentSeqSumm}
            setCurrentSeqSumm={setCurrentSeqSumm}
            needSeqSumm={needSeqSumm}
            setNeedSeqSumm={setNeedSeqSumm}
          />
        }
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
