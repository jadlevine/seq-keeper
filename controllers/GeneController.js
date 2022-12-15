const { Gene } = require('../models')

const GetAllGenesByUser = async (req, res) => {
  try {
    const genes = await Gene.findAll({
      where: { userId: req.body.userId }
    })
    res.send(genes)
  } catch (error) {
    throw error
  }
}

const GetGeneById = async (req, res) => {
  try {
    let geneId = parseInt(req.params.gene_id)
    let gene = await Gene.findOne({ where: { id: geneId } })
    res.send(gene)
  } catch (error) {
    throw error
  }
}

const AddGene = async (req, res) => {
  try {
    const newGene = await Gene.create(req.body)
    res.send(newGene)
  } catch (error) {
    throw error
  }
}

const CheckForGene = async (req, res) => {
  try {
    const gene = await Gene.findOne({
      where: {
        userId: req.body.userId,
        uid: req.body.geneUid
      }
    })
    res.send(gene)
  } catch (error) {
    throw error
  }
}

const DeleteGene = async (req, res) => {
  try {
    let geneId = parseInt(req.params.gene_id)
    let gene = await Gene.findOne({ where: { id: geneId } })
    await gene.destroy()
    res.send({ message: `Deleted gene with an id of ${geneId}` })
  } catch (error) {
    throw error
  }
}

module.exports = {
  GetAllGenesByUser,
  GetGeneById,
  AddGene,
  CheckForGene,
  DeleteGene
}
