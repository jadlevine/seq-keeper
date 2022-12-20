import { Link } from 'react-router-dom'

const Nav = ({ user, handleSignout }) => {
  
  const publicOptions = (
    <div className="nav-options">
      <Link className="nav-text" to="/register">Register</Link>
      <Link className="nav-text" to="/signin">Sign In</Link>
    </div>
  )

  const authOptions = (
      <div className='authenticated-nav'>
        <h3><span className='underline'>Signed in as</span> <br/>{user?.email}</h3>
        <div className="nav-options">
          <Link className="nav-text" to="/userhome">User Home</Link>
          <Link className="nav-text" to="/SearchNcbi">NCBI Search</Link>
          <Link className="nav-text" to="/accountdetails">Account Details</Link>
          <Link className="nav-text" onClick={handleSignout} to="/signin">Sign Out</Link>
        </div>
      </div>
  )

  return (
      <nav className='nav-bar'>
        <div>
          <h1 className="app-title">Seq Keeper</h1>          
        </div>
        {user? authOptions : publicOptions}
      </nav>
  )
}

export default Nav