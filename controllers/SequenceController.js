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

module.exports = {
  GetAllSeqsByUser,
  GetAllSeqsByGene,
  AddSequence,
  CheckForSequence,
  DeleteSeqFromUser
}
