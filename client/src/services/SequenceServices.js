import Client from './api'

export const CheckSKSeqStatus = async (userId, seqUid) => {
  try {
    const res = await Client.post('/user/sequences/check', { userId, seqUid })
    return res.data
  } catch (error) {
    throw error
  }
}

// export const AddGeneToUser = async (userid, geneSumm) => {
//   try {
//     let userId = parseInt(userid)
//     const res = await Client.post('/user/genes/add', { ...geneSumm, userId })
//     return res.data
//   } catch (error) {
//     throw error
//   }
// }
