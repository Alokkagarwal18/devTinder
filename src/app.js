const express = require("express");
const connectDB = require("./config/database.js")
const app = express();
const User = require("./models/user.js");

app.use(express.json());


app.post("/signup", async (req, res) => {
  //crating a new instance of User model
    const user = new User(req.body)

    // it always give us t oa promise so handle the promise we used async await
    try {
       await user.save();
       res.send("User signed up successfully");
    }catch(err){
      res.status(400).send("Error while signing up the user");
   }
})


connectDB().then(() => {
  console.log("Database connection established")  
  app.listen(3000, () => {
  console.log("server is successfully running on port 3000");
});

}).catch(err => {
  console.error("Database cannot be connected")
});













// // Specific routes should be defined before wildcard routes to ensure they are matched first.

// // app.use("/", (req, res) => {
// //   res.send("This is from wildcard route whose overrides all other routes");
// // })

// // app.use("/hello", (req, res) =>{
// //   res.send("Hello Hello .....")
// // })
// // This is not routing beacuse before this match hello rpute so this will never be executed
// // app.use("/hello/2", (req, res) =>{
// //     res.send("Hello Hello 2 .....");
// // })

// //This will only handle GET call to /user
// // app.get("/user/:userId", (req, res) => {
// //   console.log(req.params);
// //   res.send({firstName: "Akshay", lasrName: "saini"})
// // })

// // app.post("/user", (req, res) => {
// //   // saving to the DB logic
// //   res.send("Data successfiully saved to the Db");
// // })

// // app.delete("/user", (eq, res) => {
// //   res.send("Date deleted Successfully")
// // })

// // This will handle all type of HTTP method API calls to /test
// // app.use("/test",(req, res) => {
// //   res.send("Hello from express");
// // })

// // app.use("/user", [rh1, rh2, rh3, rh4])

// // app.use("/user",
// //    (req, res, next) => {
// //     console.log("Handling the route user");
// //     res.send("Response 1");
// //     next();
// // },
// //   (req, res) => {
// //     console.log("Handling the route user - 2");
// //     res.send("Response 2");
// //   })

// // Handle Auth middleware for all HTTP mwthods




// app.get("/getUserData", (req, res) => {
// // try {
//   throw new Error("asdfg");
//   res.send("User Data Send");
// // } catch (err) {
// //   res.status(500).send("some error contact support team")
// // }
// })

// app.use("/", (err, req, res, next) => {
//     if(err){
//       // and i also log your error
//       res.status(500).send("something went wrong")
//     }
// })


// app.get("/user", (req, res) => {
//   res.send("user data sent");
// });