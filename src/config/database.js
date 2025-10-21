const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://alokagarwal1812_db_user:Alok1812@namastenodejs.uxb8hsc.mongodb.net/devTinder"
  );
};

module.exports = connectDB
