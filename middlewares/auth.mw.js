const userModel = require("../models/user.model.js");

/**
 * Create a mw will check if a request body is correct or not
 */

exports.verifySignUpRequestBody = async (req, res, next) => {
  try {
    if (!req.body.name)
      return res.status(400).send({
        success: false,
        message: "Failed ! name was not provided",
      });

    if (!req.body.email)
      return res.status(400).send({
        success: false,
        message: "Failed ! email was not provided",
      });

    if (!req.body.userId)
      return res.status(400).send({
        success: false,
        message: "Failed ! userId was not provided",
      });

    if (!req.body.password)
      return res.status(400).send({
        success: false,
        message: "Failed ! password was not provided",
      });

    const isEmailPresent = await userModel.findOne({ email: req.body.email });

    if (isEmailPresent)
      return res.status(400).send({
        success: false,
        message: "Failed ! Email is already registered",
      });

    const isUserIdPresent = await userModel.findOne({ email: req.body.userId });

    if (isUserIdPresent)
      return res.status(400).send({
        success: false,
        message: "Failed ! User id is already present",
      });

    next();
  } catch (error) {
    console.log("Error while verify request body for signup", error);
    res.status(500).send({
      success: false,
      message: "Error while verify request body for sign up",
    });
  }
};