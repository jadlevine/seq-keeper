const { User, Gene, HomologousPair, Sequence } = require('../models')

const GetAllSeqsByUser = async (req, res) => {
  try {
    const seqs = await Sequence.findAll({
      where: { userId: req.body.userId }
    })
    res.send(seqs)
  } catch (error) {
    throw error
  }
}

const GetAllSeqsByGene = async (req, res) => {
  try {
    const seqs = await Sequence.findAll({
      where: { geneId: req.body.geneId }
    })
    res.send(seqs)
  } catch (error) {
    throw error
  }
}

const AddSequence = async (req, res) => {
  try {
    const newSeq = await Sequence.create(req.body)
    // console.log(typeof req.body.organism.taxid)
    res.send(newSeq)
  } catch (error) {
    throw error
  }
}

const CheckForSequence = async (req, res) => {
  try {
    const seq = await Sequence.findOne({
      where: {
        userId: req.body.userId,
        uid: req.body.seqUid
      }
    })
    res.send(seq)
  } catch (error) {
    throw error
  }
}

const DeleteSeqFromUser = async (req, res) => {
  try {
    let userId = parseInt(req.params.user_id)
    let seqId = parseInt(req.params.seq_id)
    let seq = await Sequence.findOne({
      where: {
        id: seqId,
        userId
      }
    })
    await seq.destroy()
    res.send({ message: `Deleted sequence with an id of ${seqId}` })
  } catch (error) {
    throw error
  }
}

// const GetAllRooms = async (req, res) => {
//   try {
//     const room = await Room.findAll()
//     res.send(room)
//   } catch (error) {
//     throw error
//   }
// }

// const GetRoomsByUser = async (req, res) => {
//   try {
//     let userId = parseInt(req.params.user_id)
//     const roomsByUser = await Room.findAll({
//       where: { userId },
//       include: User
//     })
//     res.send(roomsByUser)
//   } catch (error) {
//     throw error
//   }
// }

// const GetRoomById = async (req, res) => {
//   try {
//     let roomId = parseInt(req.params.room_id)
//     const roomById = await Room.findAll({
//       where: { id: roomId },
//       include: User
//     })
//     res.send(roomById)
//   } catch (error) {
//     throw error
//   }
// }

// const CreateRoom = async (req, res) => {
//   try {
//     const { name, userId } = req.body.formValues
//     // console.log(req.body)
//     let room = await Room.create({ name, userId })
//     res.send(room)
//   } catch (error) {
//     throw error
//   }
// }

// const UpdateRoom = async (req, res) => {
//   try {
//     let roomId = parseInt(req.body.roomForm.roomId)
//     let updatedRoom = await Room.update(req.body.roomForm, {
//       where: { id: roomId },
//       returning: true
//     })
//     res.send(updatedRoom)
//   } catch (error) {
//     throw error
//   }
// }

// const DeleteRoom = async (req, res) => {
//   try {
//     let roomId = parseInt(req.params.room_id)
//     let room = await Room.findOne({ where: { id: roomId } })
//     await room.destroy()
//     res.send({ message: `Deleted room with an id of ${roomId}` })
//   } catch (error) {
//     throw error
//   }
// }

module.exports = {
  // GetAllRooms,
  GetAllSeqsByUser,
  GetAllSeqsByGene,
  AddSequence,
  CheckForSequence,
  DeleteSeqFromUser
  // GetRoomsByUser,
  // GetRoomById,
  // CreateRoom,
  // UpdateRoom,
  // DeleteRoom
}
