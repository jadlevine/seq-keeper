import { Link } from 'react-router-dom'

const Nav = ({ user, handleSignout }) => {
  
  const publicOptions = (
    <div className="nav-options">
      <Link to="/register">Register</Link>
      <Link to="/signin">Sign In</Link>
    </div>
  )

  const authOptions = (
    <div className="nav-options">
      <div>Signed in as: {user?.email}</div>
      <Link to="/userhome">User Home</Link>
      <Link to="/searchncbi">NCBI Search</Link>
      <Link to="/accountdetails">Account Details</Link>
      <Link onClick={handleSignout} to="/signin">Sign Out</Link>
    </div>
  )

  return (
      <nav className='nav-bar'>
        <div className="welcome-container">
          <h3 className="welcome-note">Seq Keeper</h3>          
        </div>
        {user? authOptions : publicOptions}
      </nav>
  )
}

export default Nav