const Router = require('express').Router()
const controller = require('../controllers/GeneController.js')
const middleware = require('../middleware')

// Router.get('/all', controller.GetAllPlants) // testing route

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

// Router.post(
//   '/create',
//   middleware.stripToken,
//   middleware.verifyToken,
//   controller.CreatePlant
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
