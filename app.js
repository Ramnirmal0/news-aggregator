const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { validator, hashPassword } = require("./helper/helper");
const { authorizer } = require("./middleware/authorizer");
const CustomDB = require("./database/customDb");
const db = new CustomDB();

app.post("/register", (req, res) => {
  let status = 200;
  let result;
  try {
    const body = JSON.parse(req.body);
    validator(body, "register");
    const payload = {
      name: body.name,
      email: body.email,
      password: hashPassword(body.password),
      preferences: body.preferences,
    };
    db.insertOne(payload);
    db.printAll()
    result = "User registered successfully";
  } catch (error) {
    status = 400;
    result = error.message;
  }
  res.status(status).send(result);
});

app.post("/login", (req, res) => {
  let status = 200;
  let result;
  try {
    validator(req.body, "login");
    result = {
      token: "this is a jwt token",
    };
  } catch (error) {
    status = 401;
    result = error.message;
  }
  res.status(status).send(result);
});

app.get("/preferences", authorizer, (req, res) => {
  let status = 200;
  let result;
  try {
  } catch (error) {
    status = 401;
    result = error.message;
  }
  res.status(status).send(result);
});

app.put("/preferences", authorizer, (req, res) => {
  let status = 200;
  let result;
  try {
    validator(req.body, "preferences");
  } catch (error) {
    status = 401;
    result = error.message;
  }
  res.status(status).send(result);
});

app.get("/news", authorizer, (req, res) => {
  let status = 200;
  let result;
  try {
  } catch (error) {
    status = 401;
    result = error.message;
  }
  res.status(status).send(result);
});

app.listen(port, (err) => {
  if (err) {
    return console.log("Something bad happened", err);
  }
  console.log(`Server is listening on ${port}`);
});

module.exports = app;
