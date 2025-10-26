const express = require("express");
const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user.js");
const bcrypt = require("bcrypt");

const authRouter = express.Router();


authRouter.post("/signup", async (req, res) => {
  try {
    // validate the signup data
    validateSignUpData(req);

    const { firstName, lastName, emailId, password } = req.body;
    // Encrypt the password

    const passwordHash = await bcrypt.hash(password, 10);

    //crating a new instance of User model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    // it always give us t oa promise so handle the promise we used async await
    await user.save();
    res.send("User signed up successfully");
  } catch (err) {
    res.status(400).send("Error while signing up the user");
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    // validateSignUpData(req);

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      // create JWT token
      // In jWT there ae three fields 
      // 1. The Data you want to hiding for known data of which user(who has logged in)
      // 2. The secret key
      // 3. jwt add signatue for verify
      // hiding the userid and give the secret key and sighn methid added a signature to string whenever verify compare the string it check the signature so this is the 
      const token = await user.getJWT(); 

      // Add the token to cookie and send the response back to the user
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8*3600000),
      });
      res.send("Login Successful");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

authRouter.post("/logout", async (req, res) => {

  // this is called chaining these are used in production
      res
        .cookie("token", null, {
         expires : new Date(Date.now())
      })
      .send("Logout Successfully");
      // res.send();
})


module.exports = authRouter;
