/**
 * POST localhost:3005/ecomm/api/v1/auth/signup
 *
 * POST localhost:3005/ecomm/api/v1/auth/signin
 * I need to intercept this
 */

const authController = require("../controllers/auth.controller.js");
const authMiddleware = require("../middlewares/auth.mw.js");
module.exports = (app) => {
  app.post(
    "/ecomm/api/v1/auth/signup",
    [authMiddleware.verifySignUpRequestBody],
    authController.signup
  );

  app.post(
    "/ecomm/api/v1/auth/signin",
    [authMiddleware.verifySignInRequestBody],
    authController.signin
  );
};
