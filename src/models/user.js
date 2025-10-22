const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 15,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
      // validate(value){
      //   if(!validator.isEmail(value)){
      //     throw new Error("Invalid Email" + value);
      //   }
      // }
    },
    password: {
      type: String,
      required: true,
      // validate(value){
      //   if(!validator.isStrongPassword(value)){
      //     throw new Error("Enter a Strong Password" + value);
      //   }
      // }
    },
    gender: {
      type: String,
      //custom validation fn
      validate() {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender data is not valid");
        }
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    photoUrl: {
      type: String,
      // validate(value){
      //   if(!validator.isURL(value)){
      //     throw new Error("Invalid Photo URL" + value);
      //   }
      // }
    },
    about: {
      type: String,
      default: "This is a defualt about of User",
    },
    skills: {
      type: [String],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
