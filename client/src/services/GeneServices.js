import Client from './api'

export const GetAllGenesByUser = async (userId) => {
  try {
    const res = await Client.get('/user/genes/all', { userId })
    console.log(res)
    console.log(res.data)
    return res
  } catch (error) {
    // console.log(error)
    throw error
  }
}

export const AddGeneToUser = async (userid, geneSumm) => {
  try {
    let userId = parseInt(userid)
    const res = await Client.post('/user/genes/add', { ...geneSumm, userId })
    console.log(res)
    console.log(res.data)
  } catch (error) {
    throw error
  }
}
