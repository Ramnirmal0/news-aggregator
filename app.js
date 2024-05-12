const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { validator } = require("./helper/helper");

app.post("/register", (req, res) => {
  let status = 200;
  let result;
  try {
    validator(req.body);
  } catch (error) {
    status = 401;
    result = error.message;
  }
  res.status(status).send(result);
});

app.post("/login", (req, res) => {
  let status = 200;
  let result;
  try {
    validator(req.body);
  } catch (error) {
    status = 401;
    result = error.message;
  }
  res.status(status).send(result);
});

app.get("/preferences", (req, res) => {
  let status = 200;
  let result;
  try {
  } catch (error) {
    status = 401;
    result = error.message;
  }
  res.status(status).send(result);
});

app.put("/preferences", (req, res) => {
  let status = 200;
  let result;
  try {
    validator(req.body);
  } catch (error) {
    status = 401;
    result = error.message;
  }
  res.status(status).send(result);
});

app.get("/news", (req, res) => {
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
