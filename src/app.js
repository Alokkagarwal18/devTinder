const express = require("express");

const app = express();

// Specific routes should be defined before wildcard routes to ensure they are matched first.

// app.use("/", (req, res) => {
//   res.send("This is from wildcard route whose overrides all other routes");
// })

// app.use("/hello", (req, res) =>{
//   res.send("Hello Hello .....")
// })
// This is not routing beacuse before this match hello rpute so this will never be executed 
// app.use("/hello/2", (req, res) =>{
//     res.send("Hello Hello 2 .....");
// })

//This will only handle GET call to /user
app.get("/user", (req, res) => {
  res.send({firstName: "Akshay", lasrName: "saini"})
})

app.post("/user", (req, res) => {
  // saving to the DB logic
  res.send("Data successfiully saved to the Db");
})

app.delete("/user", (eq, res) => {
  res.send("Date deleted Successfully")
})

// This will handle all type of HTTP method API calls to /test
app.use("/test",(req, res) => { 
  res.send("Hello from express");
})

app.listen(3000, () => {
  console.log("server is successfully running on port 3000")
});
