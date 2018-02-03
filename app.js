// load the express module
var express = require("express");

// initilize and store the express in a variable
var app = express();

//attach static resources at root
//app.use(express.static("public"));
// attach with a virtual prefix to serve static files from public folder
app.use("/static",express.static("public"));

//we can use multiple static folders with same virtual prefix
app.use("/static",express.static("app-resources"));

// mounting routes
app.get("/", (req, res) => {
  //res.send("Welcome to express node app");
  res.sendFile("public/index.html",{root:__dirname});
});

app.get("/message", (req, res) => {
  res.send("Message url changed");
});

app.get("/aboutus", (req, res) => {
  res.send("About us page");
});

// start the server and listen on  a port

app.listen(3000, () => console.log("Express server running at 3000"));
