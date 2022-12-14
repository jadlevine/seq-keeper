import Client from './api'

export const GetAllSeqsByUser = async (userId) => {
  try {
    // this is POST request, so that data can be passed in as req.body ({ userId }, here)
    const res = await Client.post('/user/sequences/all', { userId })
    return res.data
  } catch (error) {
    throw error
  }
}

export const GetSeqsByGene = async (geneId) => {
  try {
    const res = await Client.post(`/user/sequences/gene`, { geneId })
    return res.data
  } catch (error) {
    throw error
  }
}

export const CheckSKSeqStatus = async (userId, seqUid) => {
  try {
    const res = await Client.post('/user/sequences/check', { userId, seqUid })
    return res.data
  } catch (error) {
    throw error
  }
}

export const AddSeqToUser = async (seqSumm) => {
  try {
    // let userId = parseInt(userid)
    // const res = await Client.post('/user/sequences/add', { ...geneSumm, userId })
    const res = await Client.post('/user/sequences/add', seqSumm)
    return res.data
  } catch (error) {
    throw error
  }
}

export const DeleteSeqFromUser = async (userId, seqId) => {
  try {
    const res = await Client.delete(`/user/sequences/${userId}/${seqId}`) // this is messy, but a trial... if it works, change to (`/user//${userId}/sequence/${seqId}`), and change all routes to user/${userId}, where appropriate
    return res.data
  } catch (error) {
    // console.log(error)
    throw error
  }
}
