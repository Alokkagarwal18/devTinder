const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
      validate(value){
        if(!validator.isEmail(value)){
          throw new Error("Invalid Email" + value);
        }
      }
    },
    password: {
      type: String,
      required: true,
      validate(value){
        if(!validator.isStrongPassword(value)){
          throw new Error("Enter a Strong Password" + value);
        }
      }
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female", "others"],
        message: `{value} is not a valid gender type`
      },

      //custom validation fn
      // validate() {
      //   if (!["male", "female", "others"].includes(value)) {
      //     throw new Error("Gender data is not valid");
      //   }
      // },
    },
    age: {
      type: Number,
      min: 18,
    },
    photoUrl: {
      type: String,
      default: "https://png.pngtree.com/png-vector/20221130/ourmid/pngtree-user-profile-button-for-web-and-mobile-design-vector-png-image_41767880.jpg",
      validate(value){
        if(!validator.isURL(value)){
          throw new Error("Invalid Photo URL" + value);
        }
      }
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

userSchema.methods.getJWT = async function () {
  //never used arrow fn in these type of methods in Schema because this keyword nit work with arrow fn for more info watch this keyword video on youtube of akshay saini
  const user = this;

  const token = await jwt.sign({ _id: user._id}, "JWT_SECRET_KEY123", {expiresIn: "7d"});

  return token;
}

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;

  const isPasswordValid = await bcrypt.compare(
    //if we change the order of these this will get error 
    passwordInputByUser,
    passwordHash,
  )

  return isPasswordValid;
}

module.exports = mongoose.model("User", userSchema);
