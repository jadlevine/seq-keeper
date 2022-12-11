const Router = require('express').Router()
const controller = require('../controllers/UserController.js')
const middleware = require('../middleware')

Router.get('/all', controller.GetAllUsers) // testing route

Router.post('/register', controller.RegisterUser)

Router.post('/login', controller.Login)

Router.get(
  '/session',
  middleware.stripToken,
  middleware.verifyToken,
  controller.CheckSession
)

Router.put(
  '/update',
  middleware.stripToken,
  middleware.verifyToken,
  controller.UpdateUser
)

Router.delete(
  '/user/:user_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.DeleteUser
)

module.exports = Router
