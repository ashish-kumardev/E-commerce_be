/**
 * I need to write a controller/logic to register a user
 */
const bcryptjs = require("bcryptjs")
const userModel = require("../models/user.model.js")
exports.signup = async (req,res) => {
  /**
   * Logic to create/register a user
   */

  // 1. Read the request object and create a user object
  const requestBody = req.body;

  const userObj = {
    name : requestBody.name,
    userId : requestBody.userId,
    password : bcryptjs.hashSync(requestBody.password,8),
    email : requestBody.email,
    userType : requestBody.userType
  }

  // 2. Insert the user object to user collection in mongoDB
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


/* {
  "name": "Deepak",
  "userType": "CUSTOMER",
  "userId": "Deepak_01",
  "password": "DEEPAK01",
  "email": "deepak@gmail.com"
} */