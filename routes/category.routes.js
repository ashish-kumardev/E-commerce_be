/**
 *
 * POST localhost:3005/ecomm/api/v1/categories
 *
 * GET localhost:3005/ecomm/api/v1/get_categories
 *
 * GET localhost:3005/ecomm/api/v1/get_category_by_name/:name
 *
 * POST localhost:3005/ecomm/api/v1/update-category/{category-id}
 *
 * I need to intercept this
 *
 */

const categoryController = require("../controllers/category.controller.js");
const categoryMiddleware = require("../middlewares/category.mw.js");

module.exports = (app) => {
  // create category
  app.post(
    "/ecomm/api/v1/add_category",
    [
      categoryMiddleware.verifyDetails, //name, description
      categoryMiddleware.verifyToken, // valid token or not
      categoryMiddleware.verifyUserType, // admin or not
    ],
    categoryController.createCategory
  );

  // get all categories
  app.get(
    "/ecomm/api/v1/get_categories",
    [categoryMiddleware.verifyToken, categoryMiddleware.verifyUserType],
    categoryController.getCategory
  );

  // get single category
  app.get(
    "/ecomm/api/v1/get_category_by_name/:name",
    [
      categoryMiddleware.verifyToken,
      categoryMiddleware.verifyUserType,
    ],
    categoryController.getCategoryByName
  );

  // update category
  app.put(
    "/ecomm/api/v1/update-category/:id",
    [
      categoryMiddleware.checkDetails,
      categoryMiddleware.verifyToken,
      categoryMiddleware.verifyUserType,
    ],
    categoryController.updateCategory
  );
};
