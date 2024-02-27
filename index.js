/**
 * This will be the starting file of application
 */
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const indexConfig = require("./configs/index.config.js");
const dbConfig = require("./configs/db.config.js");
const userModel = require("./models/user.model.js");
const bcryptjs = require("bcryptjs")

/**
 * Create a admin user at the starting of the application
 * if not already present
 */

// Connection with mongoDB
mongoose.connect(dbConfig.DB_URL);

const db = mongoose.connection;

db.on("error", () => {
  console.log("Error occur while connection with mongoDB");
});

db.once("open", () => {
  console.log("Connecting to mongoDB");
  init()
});

async function init() {
  try {
    let user = await userModel.findOne({ userId: "admin" });
    if (user) {
      console.log("Admin is already present");
      return;
    }

    user = await userModel.create({
      name : 'Ashish',
      userId : 'admin',
      email : 'ashish@gmail.com',
      userType : 'ADMIN',
      password : bcryptjs.hashSync('ASHISH1',8)
    })
    console.log("Admin created", user)
  } catch (error) {
    console.log("Error while getting/create admin",error)
  }
}

/**
 * Start the server
 */

app.listen(indexConfig.PORT, () => {
  console.log("Server is running on :", indexConfig.PORT);
});
