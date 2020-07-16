const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");


const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "3004",
    database: "smartbrain",
  },
});

const app = express();

const database = {
  users: [
    {
      id: "123",
      name: "john",
      email: "abc@abc.com",
      password: "test",
      entries: 0,
      joined: new Date(),
    },
    {
      id: "124",
      name: "joanna",
      email: "edf@abc.com",
      password: "test",
      entries: 0,
      joined: new Date(),
    },
  ],
  login: [
    {
      id: "987",
      has: "",
      email: "email@joh.com",
    },
  ],
};

app.use(cors());

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send(database.users);
});

app.post("/signin", (req, res) => {
  signin.handleSignIn(req, res, db, bcrypt);
});

app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

app.get("/profile/:id", (req, res) => {
  profile.handleProfileGet(req, res, db);
});

app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});

app.post("/imageURL", (req, res) => {
  image.handleAPI(req, res);
});

app.listen(3000, () => {
  console.log("all good on port 3000");
});
