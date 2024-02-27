/**
 * This will be the starting file of application 
 */
const express = require("express")
const mongoose = require("express")
const app = express()
const index_config = require('./configs/index.config.js')



/**
 * Start the server
 */

app.listen(index_config.PORT, () => {
  console.log("Server is running on :",index_config.PORT)
})