const express = require("express");
const { userAuth } = require("../middlewares/auth.js");
const { validateEditProfileData } = require("../utils/validation.js");
 

const profileRouter = express.Router();

profileRouter.get("/profile/view",userAuth, async (req, res) => {
  try {
    const user = req.user;  
    res.send(user);
  } catch (error) {
    res.status(400).send("ERROR:" + err.message);
  }
});

profileRouter.patch("/profile/edit", async (req, res) => {
  try {
      if(!validateEditProfileData(req)){
        throw new Error("Invalid edit Request");
      }

      const loggedInUser = req.user;
      Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
      await loggedInUser.save();
      res.json({ message: `${loggedInUser.firstName}, Your Profile Updated Successfully`, data: loggedInUser});

  } catch (err) {
      res.status(400).send("ERROR:" + err.message);
  }
})

module.exports = profileRouter;
