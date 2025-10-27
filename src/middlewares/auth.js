const User = require("../models/user.js");
const jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
  try {
    // Read the token from the req cookies
    const { token } = req.cookies;

    if (!token) {
      throw new Error("Token is not valid");
    }
    // validate the token
    // verify will give you back the data (not boolean) hide inside the cookie (in our case we hide UserId in the cookie so it return userId )
    const decodedObj = await jwt.verify(token, "JWT_SECRET_KEY123");

    const { _id } = decodedObj;

    const user = await User.findById(_id);

    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("ERROR :" + err.message);
  }
};

module.exports = { userAuth };

// const adminAuth = (req, res, next) => {
//   console.group("Admin Auth is Checked");
//   const token = "XYZ";
//   const isAdminAuthorized = token === "XYZ";

//   if (!isAdminAuthorized) {
//     res.status(401) / send("unothorized");
//   } else {
//     next();
//   }
// };

// const userAuth = (req, res, next) => {
//   console.group("User Auth is Checked");
//   const token = "XYZ";
//   const isUserAuthorized = token === "XYZ";

//   if (!isUserAuthorized) {
//     res.status(401) / send("unothorized");
//   } else {
//     next();
//   }
// };
