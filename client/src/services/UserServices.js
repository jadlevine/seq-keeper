import Client from './api'

export const RegisterUser = async (data) => {
  try {
    const res = await Client.post('/users/register', data)
    return res.data
  } catch (error) {
    // console.log(error)
    throw error
  }
}

export const LoginUser = async (data) => {
  try {
    const res = await Client.post('/users/login', data)
    localStorage.setItem('token', res.data.token)
    return res.data.user
  } catch (error) {
    // console.log(error)
    throw error
  }
}

export const CheckSession = async () => {
  try {
    // Checks if the current token if it exists is valid
    const res = await Client.get('/users/session')
    return res.data
  } catch (error) {
    throw error
  }
}

export const UpdateAccount = async (updateBody) => {
  try {
    // console.log(updateBody)
    let res = await Client.put('/users/update', updateBody)
    return res
  } catch (error) {
    // console.log(error)
    throw error
  }
}

export const DeleteAccount = async (userId) => {
  try {
    const res = await Client.delete(`/users/user/${userId}`)
    return res.data
  } catch (error) {
    // console.log(error)
    throw error
  }
}
