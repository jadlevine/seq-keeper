import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UpdateAccount, DeleteAccount } from '../services/UserServices'

const AccountDetails = ({ user, handleSignout }) => {
  let navigate = useNavigate()

  const initialUpdateFormValues = {
    name: '',
    email: '',
    newPassword: '',
    confirmNewPassword: '',
    password: '',
    userId: ''
  }

  const [accountFormRendered, setAccountFormRendered] = useState(null)
  const [updateFormValues, setUpdateFormValues] = useState(
    initialUpdateFormValues
  )

  const handleChange = (e) => {
    setUpdateFormValues({
      ...updateFormValues,
      [e.target.name]: e.target.value
    })
  }

  const handleDelete = async (e) => {
    e.preventDefault()
    if (user.email === 'josh@josh.com') {
      window.alert(`Sorry, this account cannot be deleted.`)
      setAccountFormRendered(null)
    } else {
      try {
        let deleted = await DeleteAccount(user.id)
        window.alert(
          `${deleted.message}. Register again to continue using Seq Keeper`
        )
        handleSignout()
        navigate('/register')
      } catch (err) {
        throw err
      }
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (user.email === 'josh@josh.com') {
      window.alert(`Sorry, this account cannot be updated.`)
      setUpdateFormValues(initialUpdateFormValues)
      setAccountFormRendered(null)
    } else {
      try {
        if (
          updateFormValues.newPassword !== updateFormValues.confirmNewPassword
        ) {
          window.alert(
            'Update request failed. \nNew Password and Confirm New Password must match.'
          )
          return
        } else {
          //add userId to updateform value
          let updateBody = { ...updateFormValues, userId: user.id }
          //send update request with current pw, confirm pw on backend
          let res = await UpdateAccount(updateBody)
          console.log(res) // this is not working when pw does not match
        }

        //alert user that update was successful
        window.alert('SUCCESS! Account details updated. Please sign in again')
        // logout and navigate back to sign in
        handleSignout()
        navigate('/signin')
      } catch (error) {
        window.alert(
          'Update request failed. \nCheck that your Current Password was entered correctly.'
        )
        throw error
      }
    }
  }

  if (!accountFormRendered) {
    return (
      <div className="account-container">
        <h2>Account Details</h2>
        <div className="account-buttons">
          <button
            className="account-button"
            onClick={() => setAccountFormRendered('update')}
          >
            Update Account
          </button>
          <button
            className="account-button"
            onClick={() => setAccountFormRendered('delete')}
          >
            Delete Account
          </button>
        </div>
      </div>
    )
  } else if (accountFormRendered === 'update') {
    return (
      <div className="update-account-body">
        <h2>Update Account</h2>
        <form className="update-account-form container" onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            type="text"
            name="name"
            value={updateFormValues.name}
            placeholder="New User Name"
            size="24"
            className="update-account-input"
          />
          <input
            onChange={handleChange}
            type="text"
            name="email"
            value={updateFormValues.email}
            placeholder="New Email"
            size="24"
            className="update-account-input"
          />
          <input
            onChange={handleChange}
            type="password"
            name="newPassword"
            value={updateFormValues.newPassword}
            placeholder="New Password"
            size="24"
            className="update-account-input"
          />
          <input
            onChange={handleChange}
            type="password"
            name="confirmNewPassword"
            value={updateFormValues.confirmNewPassword}
            placeholder="Confirm New Password"
            size="24"
            className="update-account-input"
          />
          <input
            onChange={handleChange}
            type="password"
            name="password"
            value={updateFormValues.password}
            placeholder="Current Password (required)"
            size="24"
            className="update-account-input"
            required
          />
          <div className="update-account-buttons">
            <button
              disabled={
                (!updateFormValues.name &&
                  !updateFormValues.email &&
                  !updateFormValues.newPassword &&
                  !updateFormValues.confirmNewPassword) ||
                !updateFormValues.password
              }
              className="account-button"
            >
              Submit
            </button>
            <button
              className="account-button"
              onClick={() => setAccountFormRendered(null)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    )
  } else if (accountFormRendered === 'delete') {
    return (
      <div className="delete-account-body">
        <h2>Delete Account</h2>
        <form className="delete-account-form container" onSubmit={handleDelete}>
          <h2>
            Are you sure you want to delete your Seq Keeper account?
            <br /> <br />
            You will lose all your data.
          </h2>
          <div className="delete-account-buttons">
            <button className="account-button">Delete</button>
            <button
              className="account-button"
              onClick={() => setAccountFormRendered(null)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    )
  }
}
export default AccountDetails
