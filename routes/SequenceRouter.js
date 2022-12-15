const Router = require('express').Router()
const controller = require('../controllers/SequenceController.js')
const middleware = require('../middleware')

Router.post(
  '/all',
  middleware.stripToken,
  middleware.verifyToken,
  controller.GetAllSeqsByUser
)

Router.post(
  '/gene',
  middleware.stripToken,
  middleware.verifyToken,
  controller.GetAllSeqsByGene
)

Router.post(
  '/add',
  middleware.stripToken,
  middleware.verifyToken,
  controller.AddSequence
)

Router.post(
  '/check',
  middleware.stripToken,
  middleware.verifyToken,
  controller.CheckForSequence
)

Router.delete(
  '/:user_id/:seq_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.DeleteSeqFromUser
)

module.exports = Router
