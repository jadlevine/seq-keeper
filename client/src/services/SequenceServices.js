import Client from './api'

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
