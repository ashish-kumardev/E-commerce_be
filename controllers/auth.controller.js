/**
 * I need to write a controller/logic to register a user
 */
const bcryptjs = require("bcryptjs")
const userModel = require("../models/user.model.js");
const jwt = require("jsonwebtoken");
const authConfig = require("../configs/auth.config.js")

/**
  * Logic to create/register a user
  */
exports.signup = async (req,res) => {
  // 1. Read the request object and create a user object
  const requestBody = req.body;

  const userObj = {
    name : requestBody.name,
    userId : requestBody.userId,
    password : bcryptjs.hashSync(requestBody.password,8),
    email : requestBody.email,
    userType : requestBody.userType
  }

  // 2. Insert the user object into user collection in mongoDB
  try {
    const userCreated = await userModel.create(userObj)
  // 3. Return the created 
    res.status(201).send({
      success : true,
      message : {
        name : userCreated.name,
        email : userCreated.email,
        userId : userCreated.userId,
        userType : userCreated.userType,
        createdAt : userCreated.createdAt,
        updatedAt : userCreated.updatedAt
      }
    })
  } catch (error) {
    console.log("Error while registering user",error)
    res.status(500).send({
      success : false,
      message : "Some error happened while registering the user"
    })
  }
}

/**
  * Logic to login/signin user
  */
exports.signin = async (req, res) => {
    const userObj = await userModel.findOne({userId : req.body.userId})
    const token = jwt.sign({id : userObj.userId},authConfig.SECRET_STRING, {
      expiresIn : 120
    })
    res.status(200).send({
      success : true,
      message : {
        name : userObj.name,
        email : userObj.email,
        userId : userObj.userId,
        userType : userObj.userType,
        accessToken : token
      }
    })
}


/* {
  "name": "Deepak",
  "userType": "CUSTOMER",
  "userId": "Deepak_01",
  "password": "DEEPAK01",
  "email": "deepak@gmail.com"
} */