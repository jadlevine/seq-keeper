import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { SigninUser } from '../services/UserServices'

const Signin = ({ setUser }) => {
  const navigate = useNavigate()

  const initialState = { email: '', password: '' }

  const [formValues, setFormValues] = useState(initialState)

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = await SigninUser(formValues)
    if (payload === 'Signin Error') {
      alert(
        `${payload}\nMake sure your email and password are the same ones you used to register`
      )
    } else {
      setUser(payload)
      setFormValues(initialState)
      navigate('/userhome')
    }
  }

  return (
    <div className="signin-body">
      <h2>Sign In to your Seq Keeper Account</h2>
      <form className="signin-form container" onSubmit={handleSubmit}>
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
        <button
          disabled={!formValues.email && !formValues.password}
          className="signin-button"
        >
          Sign In
        </button>
      </form>
    </div>
  )
}

export default Signin
