//REQUIRE SOMETHING YOU ARE GOING TO USE. whicch has to be Installed first

// 1. Require and make all the Packages/ Libraries.
// to be used in cproject part of it
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");

// 2. Create a handler to store all the express features.
let server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

// Mongoose connects the app to the mongoDB.
mongoose.connect("mongodb://localhost:27017/users-db", () => {
  console.log("Database Connection Successful");
});

// Schema definition/ creating a schema.
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: "" },
  password: { type: String, required: "Password is required" }
});

const userModel = mongoose.model("user", userSchema);

//3. Set the engine that is to render files.
server.set("view engine", "pug");

// Server is picking a specific file pug
let joinedpath = path.join(__dirname, "views");
server.set("views", joinedpath);

// Rendering/displaying Pug Form. (using Route)
server.get("/registration", (request, response) => {
  // request,response are call backs
  response.render("register");
  //render specifys what you want from register.pug having the (form and displays)
});

// picking the data from the Form. (using Route) // creating a schema to make it display to the database.
server.post("/register", (req, res) => {
  console.log(req.body);
});

server.post("/addUser", (req, res) => {
  let newUser = new userModel(req.body);
  newUser.save();
  res.send("Saved");
});
// // create Routes through which requests.
// server.get('/',(request,response) => { // request,response are call backs
//     response.send('This is a server page')
// })

// 3. Configure the server to be able to listen for requests
server.listen(4000, () => {
  console.log("Server is listening...");
});

/*
1. home/ index
2. products
3. services
4. about us
5. contact
*/

// 3. Configure the server to be able to listen for requests.
//ROUTES CALL BACKS.
// server.get('/home',(request,response) => { // request,response are call backs
//     response.send('This is a home page')
// })

// server.get('/products',(request,response) => { // request,response are call backs
//     response.send('This is the products page')
// })

// server.get('/services',(request,response) => { // request,response are call backs
//     response.send('This is a services page')
// })

// server.get('/aboutus',(request,response) => { // request,response are call backs
//     response.send('This is aboutus page')
// })

// server.get('/contacts',(request,response) => { // request,response are call backs
//     response.send('This is the contacts page')
// })
