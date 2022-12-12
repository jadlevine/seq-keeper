import Client from './api'

export const GetAllGenesByUser = async (userId) => {
  try {
    let asd = { userId }
    // this is POST request, so that data can be passed in as req.body ({ userId }, here)
    const res = await Client.post('/user/genes/all', { userId })
    return res.data
  } catch (error) {
    throw error
  }
}

export const AddGeneToUser = async (userid, geneSumm) => {
  try {
    let userId = parseInt(userid)
    const res = await Client.post('/user/genes/add', { ...geneSumm, userId })
    return res.data
  } catch (error) {
    throw error
  }
}
