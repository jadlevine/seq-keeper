import { Link } from 'react-router-dom'

const Nav = (props) => {
  return (
      <nav className='nav-bar'>
        <div className="welcome-container">
          <h3 className="welcome-note">Seq Keeper</h3>          
        </div>
        <div className="nav-options">
          <Link to="/user-home">User Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <Link to="/account-details">Account Details</Link>
        </div>
      </nav>
  )
}

export default Nav