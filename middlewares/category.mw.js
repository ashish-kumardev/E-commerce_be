/**
 * add m/w for category
 */

const jwt = require("jsonwebtoken");
const authConfig = require("../configs/auth.config.js");
const userModel = require("../models/user.model.js");

// 1. verify the req body details
exports.verifyDetails = (req, res, next) => {
  if (!req.body.name)
    return res.status(400).send({
      success: false,
      message: "Failed ! name was not provided",
    });
  if (!req.body.description)
    return res.status(400).send({
      success: false,
      message: "Failed ! description was not provided",
    });
  next();
};

// 2. verify the header token is valid or not
exports.verifyToken = async (req, res, next) => {
  const token = req.headers["x-access-token"];
  // Check token is present or not
  if (!token)
    return res.status(401).send({
      success: false,
      message: "Failed ! No token found unauthorized",
    });

  // Check token is valid or not
  jwt.verify(token, authConfig.SECRET_STRING, async (error, decoded) => {
    if (error) {
      return res.status(401).send({
        success: false,
        message: "Failed ! token not valid",
      });
    }

    const user = await userModel.findOne({ userId: decoded.id });
    if (!user)
      return res.status(404).send({
        success: false,
        message: "Failed ! This user for this token doesn't exist",
      });
    req.user = user;
    next();
  });
};

// 3. Check user type is admin or customer
exports.verifyUserType = (req, res, next) => {
  const user = req.user;
  if (user.userType === "ADMIN") {
    next();
  } else {
    res.status(403).send({
      success: false,
      message: "Failed ! Only ADMIN users are allowed to access this endpoint",
    });
  }
};
