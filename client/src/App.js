import './App.css'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import AccountDetails from './pages/AccountDetails'
import UserHome from './pages/UserHome'
import GenePage from './pages/GenePage'
import Nav from './components/Nav'

function App() {
  return (
    <div>
      <div className="header-container">
        <Nav />
      </div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account-details" element={<AccountDetails />} />
        <Route path="/user-home" element={<UserHome />} />
        <Route path="/gene/:gene_id" element={<GenePage />} />
      </Routes>
    </div>
  )
}

export default App
