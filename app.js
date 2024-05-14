const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const {
  validator,
  hashPassword,
  passwordCheck,
  generateToken,
  decoder,
} = require("./helper/helper");
const { authorizer } = require("./middleware/authorizer");
const CustomDB = require("./database/customDb");
const db = new CustomDB();

app.post("/register", async (req, res) => {
  let status = 200;
  let result;
  try {
    const body = req.body;
    validator(body, "register");
    const payload = {
      name: body.name,
      email: body.email,
      password: await hashPassword(body.password),
      preferences: body.preferences,
    };
    const exist = db.findOne(body.email);
    if (exist) throw new Error("User already exist");
    db.insertOne(payload);
    db.printAll();
    result = { result : "User registered successfully"};
  } catch (error) {
    status = 400;
    result = error.message;
  }
  res.status(status).send(result);
});

app.post("/login", async (req, res) => {
  let status = 200;
  let result;
  try {
    validator(req.body, "login");
    const userInfo = db.findOne(req.body.email);
    if (!userInfo) throw new Error("Incorrect user email");
    await passwordCheck(req.body.password, userInfo.password);
    result = {
      token: await generateToken(userInfo),
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
    const token = req.headers.authorization;
    const userInfo = decoder(token.split(" ")[1]);
    result = {
      preferences: userInfo.preferences
    }
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
  res.status(status).send({ result });
});

app.get("/news", authorizer, (req, res) => {
  let status = 200;
  let result;
  try {
  } catch (error) {
    status = 401;
    result = error.message;
  }
  res.status(status).send({ result });
});

app.listen(port, (err) => {
  if (err) {
    return console.log("Something bad happened", err);
  }
  console.log(`Server is listening on ${port}`);
});

module.exports = app;
