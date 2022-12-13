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

// Router.post(
//   '/create',
//   middleware.stripToken,
//   middleware.verifyToken,
//   controller.CreatePlant
// )

// Router.get(
//   '/user/:user_id/',
//   middleware.stripToken,
//   middleware.verifyToken,
//   controller.GetAllPlantsByUser
// )

// Router.get(
//   '/room/:room_id/',
//   middleware.stripToken,
//   middleware.verifyToken,
//   controller.GetAllPlantsByRoom
// )

// Router.get(
//   '/plant/:plant_id/',
//   middleware.stripToken,
//   middleware.verifyToken,
//   controller.GetPlantById
// )

// Router.put(
//   '/update/:plant_id',
//   middleware.stripToken,
//   middleware.verifyToken,
//   controller.UpdatePlant
// )

module.exports = Router
