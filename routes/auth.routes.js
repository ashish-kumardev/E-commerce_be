/**
 * POST localhost:3005/ecomm/api/v1/auth/signup
 * 
 * I need to intercept this
 */

const authController = require('../controllers/auth.controller.js')


module.exports = (app) => {
  app.post("/ecomm/api/v1/auth/signup",authController.signup)
}