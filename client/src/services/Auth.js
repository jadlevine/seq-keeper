// import Client from './api'

// export const SignInUser = async (data) => {
//   try {
//     const res = await Client.post('/users/signin', data)
//     localStorage.setItem('token', res.data.token)
//     return res.data.user
//   } catch (error) {
//     return 'Signin Error'
//     throw error
//   }
// }

// export const RegisterUser = async (data) => {
//   try {
//     const res = await Client.post('/users/register', data)
//     return res.data
//   } catch (error) {
//     console.log(error)
//     throw error
//   }
// }

// export const CheckSession = async () => {
//   try {
//     // Checks if the current token if it exists is valid
//     const res = await Client.get('/users/session')
//     return res.data
//   } catch (error) {
//     throw error
//   }
// }

// this doesn't bleong here, once logged in, all requests should go through client, and, there should ideally be a separate service for each model?

//so really, the 3 functions above should be in services/Account (User)
// then there should also be services/gene, /sequence, /homologouspair?

// export const GetRooms = async (req) => {
//   try {
//     const res = await Client.get(`/rooms/user/${req.id}`)
//     return res.data
//   } catch (error) {
//     throw error
//   }
// }
