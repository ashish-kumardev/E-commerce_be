/**
 *
 * POST localhost:3005/ecomm/api/v1/categories
 *
 * I need to intercept this
 *
 */

const categoryController = require("../controllers/category.controller.js");
const categoryMiddleware = require("../middlewares/category.mw.js");

module.exports = (app) => {
  app.post(
    "/ecomm/api/v1/categories",
    [
      categoryMiddleware.verifyDetails, //name, description
      categoryMiddleware.verifyToken, // valid token or not
      categoryMiddleware.verifyUserType, // admin or not
    ],
    categoryController.createCategory
  );
};
