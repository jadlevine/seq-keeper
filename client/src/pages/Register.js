import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RegisterUser } from '../services/UserServices'

const Register = () => {
  let navigate = useNavigate()
  const initialState = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    passwordsMatch: true
  }
  const [formValues, setFormValues] = useState(initialState)

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formValues.password !== formValues.confirmPassword) {
      setFormValues({ ...formValues, passwordsMatch: false })
    } else {
      let registerResponse = await RegisterUser({
        name: formValues.name,
        email: formValues.email,
        password: formValues.password
      })
      console.log(registerResponse)
      if (registerResponse === 'That Email Already Exists') {
        alert(
          `${registerResponse}\nPlease try signing in with that email or use a different email to register`
        )
        setFormValues(initialState)
      } else if (registerResponse === 'Invalid Email Format') {
        alert(
          `${registerResponse}\nEnsure that email follows standard format: example@email.com`
        )
        setFormValues(initialState)
      } else {
        alert('Registration Success\nPlease sign in!')
        setFormValues(initialState)
        navigate('/signin')
      }
    }
  }

  if (!formValues.passwordsMatch) {
    return (
      <div>
        <h3>Password and Confirm Password Must match</h3>
        <button
          className="btn"
          onClick={() => {
            setFormValues(initialState)
          }}
        >
          Try Again
        </button>
      </div>
    )
  } else {
    return (
      <div className="register-body">
        <h2>Register For A Seq Keeper Account</h2>
        <form className="register-form container" onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            type="text"
            name="name"
            value={formValues.name}
            placeholder="username"
            className="register-input"
            required
          ></input>
          <input
            onChange={handleChange}
            type="text"
            name="email"
            value={formValues.email}
            placeholder="email"
            className="register-input"
            required
          ></input>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            value={formValues.password}
            placeholder="password"
            className="register-input"
            required
          ></input>
          <input
            onChange={handleChange}
            type="password"
            name="confirmPassword"
            value={formValues.confirmPassword}
            placeholder="confirm password"
            className="register-input"
            required
          ></input>
          <button
            disabled={
              !formValues.email ||
              !formValues.name ||
              !formValues.password ||
              !formValues.confirmPassword
            }
            className="register-button"
          >
            Register
          </button>
        </form>
      </div>
    )
  }
}

export default Register
