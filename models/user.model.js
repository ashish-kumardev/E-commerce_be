const mongoose = require("mongoose");

/**
 * name
 * userId
 * password
 * email
 * userType
 */

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      minLength: 10,
      unique: true,
    },
    userType: {
      type: String,
      default: "CUSTOMER",
      enum: ["CUSTOMER", "ADMIN"],
    },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("Users", userSchema);
