import React from 'react'
import { useNavigate } from 'react-router'
import Client from '../services/api'

const DeleteAccount = (props) => {
  let navigate = useNavigate()

  if (!props.show) {
    return null
  }

  const RemoveAccount = async (req) => {
    console.log(req)
    try {
      await Client.delete(`/users/user/${req}`)
      console.log(`User removed with id of ${req}`)
      props.handleSignout()
      navigate('/register')
    } catch (err) {
      throw err
    }
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <p>Are you sure you would like to delete your account?</p>
        <p>You will lose all your data</p>
        <div className="modalButtons-container">
          <button className="modalButtons" onClick={() => props.onClose()}>
            No
          </button>
          <button
            className="modalButtons"
            onClick={() => RemoveAccount(props.user.id)}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  )
}
export default DeleteAccount
