/**
 * category controller
 *
 * POST localhost:3005/ecomm/api/v1/categories
 *
 *  {
 *    "name" : "Electronics",
 *    "description" : "This will have all the electronic items"
 *  }
 */

const categoryModel = require("../models/category.model.js");

exports.createCategory = async (req, res) => {
  try {
    // 1. Read the request body and create a category object
    const requestBody = req.body;

    const categoryObj = {
      name: requestBody.name,
      description: requestBody.description,
    };

    // 2. Category is already created or not ?
    const isCategoryPresent = await categoryModel.findOne({
      name: categoryObj.name,
    });

    if (isCategoryPresent)
      return res.status(400).send({
        success: false,
        message: `Failed ! ${categoryObj.name} category is already present`,
      });

    // 3. Insert category obj into categories collection in mongoDB
    const createdCategory = await categoryModel.create(categoryObj);

    // 4. return the category object
    res.status(201).send({
      success: true,
      message: createdCategory,
    });
  } catch (error) {
    console.log("Error while creating category", error);
    res.status(500).send({
      success: false,
      message: "Failed ! Internal error while creating category",
    });
  }
};
