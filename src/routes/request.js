const express = require("express");
const { userAuth } = require("../middlewares/auth.js");

const requestRouter = express.Router();

requestRouter.post("/sendconnectionrequest", userAuth, async (req, res) => {
  res.send("Connection send Successfully"); 
})

module.exports = requestRouter;

