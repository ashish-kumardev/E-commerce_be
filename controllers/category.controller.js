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

/**
 * Create category
 *
 * 1. Create a new object from req.body
 * 2. Check the given category name is already present or not
 * 3. Create a new category
 * 4. return the status
 */
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

/**
 * get all categories
 *
 * 1. Find all the categories
 * 2. return the status
 */
exports.getCategories = async (req, res) => {
  try {
    const categories = await categoryModel.find({});
    const arrayOfCategory = categories.map((category) => {
      return category.name;
    });
    if (!arrayOfCategory.length)
      return res.status(200).send({
        success: true,
        message: "Category not available",
      });
    res.status(200).send({
      success: true,
      message: arrayOfCategory,
    });
  } catch (error) {
    console.log("Error while reading categories", error);
    res.status(500).send({
      success: false,
      message: "Failed ! Error while reading categories",
    });
  }
};

/**
 * get_category_by_name
 *
 * 1. find the category by category.name
 * 2. Check the category is present or not
 * 3. return the status
 */
exports.getCategoryByName = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ name: req.params.name });
    console.log(category);
    if (!category) {
      return res.status(404).send({
        success: false,
        message: "Failed ! category not found",
      });
    }
    res.status(200).send({
      success: true,
      message: category,
    });
  } catch (err) {
    console.log("Error while reading category by name", err);
    res.status(500).send({
      success: false,
      message: "Failed ! Error while reading category by name",
    });
  }
};

/**
 * Update category
 *
 * 1. find the category by category._id
 * 2. Check the update name of category already present or not
 * 3. update the category with new values
 * 4. return the status
 */
exports.updateCategory = async (req, res) => {
  try {
    const searchId = req.params.id;
    const requestBody = req.body;
    const updateObj = {
      name: requestBody.name,
      description: requestBody.description,
    };

    // check, is updated category already present or not ?
    let categoryObj = await categoryModel.findOne({ name: updateObj.name });
    categoryObj = JSON.parse(JSON.stringify(categoryObj));
    if (categoryObj && categoryObj._id !== searchId) {
      return res.status(400).send({
        success: false,
        message: "Failed ! Category already present",
      });
    }

    // args --> filter, updateValue, {new : true} (which return the updated obj)
    const updatedCategory = await categoryModel.findOneAndUpdate(
      { _id: searchId },
      updateObj,
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).send({
        success: false,
        message: "Failed ! Category not found",
      });
    }
    res.status(200).send({
      success: true,
      message: updatedCategory,
    });
  } catch (error) {
    console.log("Error while updating category", error);
    res.status(500).send({
      success: false,
      message: "Failed ! Error while updating category",
    });
  }
};

/**
 * Delete category
 *
 * 1. find the category by category._id
 * 2. Check the category is present or not
 * 3. Delete the category
 * 4. return the status
 */
exports.deleteCategory = async (req, res) => {
  try {
    const searchId = req.params.id;
    const categoryObj = await categoryModel.findOneAndDelete({ _id: searchId });
    if (!categoryObj)
      return res.status(404).send({
        success: false,
        message: "Failed ! category not found",
      });

    res.status(200).send({
      success: true,
      message: {
        id: categoryObj._id,
        name: categoryObj.name,
      },
    });
  } catch (error) {
    console.log("Error while deleting an category", error);
    res.status(500).send({
      success: false,
      message: "Failed ! Error while deleting an category",
    });
  }
};
