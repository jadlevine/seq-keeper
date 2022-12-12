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

// Router.delete(
//   '/plant/:plant_id',
//   middleware.stripToken,
//   middleware.verifyToken,
//   controller.DeletePlant
// )

module.exports = Router
