// load the express module
var express = require("express");

// initilize and store the express in a variable
var app = express();


function refAdminCheck(req,res,next) {
  
    if (req.params.ref === "admin") {
      next();  // move to next handler in queue
     // next('route');// will skip the next handler and move to next matching route
    } else {
      res.send("You should be type of admin");
    }
  
}
//attach static resources at root
//app.use(express.static("public"));
// attach with a virtual prefix to serve static files from public folder
app.use("/static", express.static("public"));

//we can use multiple static folders with same virtual prefix
app.use("/static", express.static("app-resources"));

app.set("view engine","pug");

// mounting routes
app.get("/", (req, res) => {
  //res.send("Welcome to express node app");
  res.sendFile("public/index.html", { root: __dirname });
});

app.get("/message", (req, res) => {
  res.send("Message url changed");
});

app.get("/aboutus", (req, res) => {
  res.send("About us page changed the content");
});

app.get("/contactus", (req, res) => {
  res.send("This is our contact us page dflsdfj l");
});

// sending json data
app.get("/userinfo", (req, res) => {
  res.json({ user: "Indresh", addr: "Noida Sector 82" });
});

// path variables
app.get("/detail[s]?/:userid/", (req, res) => {
  res.send("You are asking for userid: " + req.params.userid);
});

// multiple path variables
app.get("/details/:userid/info/:username", (req, res) => {
  res.send(
    "You are asking for userid: " +
      req.params.userid +
      " and name is: " +
      req.params.username
  );
});

// routing can be duplicate but keep in mind about ordering
app.get("/details/:userid/info/:username", (req, res) => {
  res.send(
    "You are asking for userid second: " +
      req.params.userid +
      " and name is: " +
      req.params.username
  );
});

// catching at router level
app.get("/fetch-user/:id", (req, res) => {
  try {
    if (parseInt(req.params.id) > 100) {
      throw new Error("Failed to fetch the info ");
    } else {
      res.send("Here is your data");
    }
  } catch (error) {
    // send the status code
    res.status(500).send("Internal Server Error");
  }
});

app.get("/fetch-failed-user", (req, res) => {
  throw new Error("Failed to fetch the info ");
});

app.get("/fetch-payment/:id", (req, res, next) => {
  if (parseInt(req.params.id) > 100) {
    // use blank to delegate the request to next matched route
    //next();
    //next('route'); // go to next route
    next("Its new id dont want to process!!!");
  } else {
    res.send("Ok processed the old payment id");
  }
});

app.get("/fetch-payment/:id", (req, res) => {
  res.send("Ok processed the new payment id for id" + req.params.id);
});

// example of route level middleware

app.get(
  "/check-info/:ref",
  refAdminCheck,
  (req, res) => {
    res.send("I am admin");
  }
);

app.get(
  "/check-info/:ref",(req,res)=>{
    res.send("Delegated request");
  });

  //example of view engine

  app.get("/users",(req,res)=> {
    res.render("show-users",{name:'Indresh',addr : "Noida"});
  });
// ordering always matters keep default page after all the routing
app.get("*", (req, res) => {
  res.send("Wrong page ");
});

// error specific middleware
app.use((err, req, res, next) => {
  console.log("Listining for all the errors");
  console.error(err);
  next(err);
  // res.status(500).send("Got internal server error, please try again!");
});
// multiple handler
app.use((err, req, res, next) => {
  console.log("Listining for error responder");
  // console.error(err);
  res.status(500).send("Got internal server error, please try again!");
});
// start the server and listen on  a port

app.listen(3000, () => console.log("Express server running at 3000"));
