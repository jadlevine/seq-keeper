import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { LoginUser } from '../services/UserServices'

const LogIn = ({ setUser }) => {
  const navigate = useNavigate()

  const initialState = { email: '', password: '' }

  const [formValues, setFormValues] = useState(initialState)

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = await LoginUser(formValues)
    if (payload === 'Login Error') {
      alert(
        `${payload}\nMake sure your email and password are the same ones you used to register`
      )
    } else {
      setUser(payload)
      setFormValues(initialState)
      navigate('/user-home')
    }
  }

  return (
    <div className="login-container">
      <div className="button-form-container">
        <button onClick={() => navigate('/register')} className="signup-btn">
          Register
        </button>

        <form className="signin-container">
          <h3 className="signin-text">Sign In</h3>
          <input
            onChange={handleChange}
            value={formValues.email}
            required
            type="text"
            name="email"
            className="signin-input"
            placeholder="email"
          ></input>
          <input
            onChange={handleChange}
            value={formValues.password}
            required
            type="password"
            name="password"
            className="signin-input"
            placeholder="password"
          ></input>
          <button onClick={handleSubmit} type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default LogIn
