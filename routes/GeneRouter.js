const Router = require('express').Router()
const controller = require('../controllers/GeneController.js')
const middleware = require('../middleware')

Router.post(
  '/all',
  middleware.stripToken,
  middleware.verifyToken,
  controller.GetAllGenesByUser
)

Router.post(
  '/add',
  middleware.stripToken,
  middleware.verifyToken,
  controller.AddGene
)

Router.post(
  '/check',
  middleware.stripToken,
  middleware.verifyToken,
  controller.CheckForGene
)

Router.delete(
  '/:gene_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.DeleteGene
)

Router.get(
  '/:gene_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.GetGeneById
)

module.exports = Router
