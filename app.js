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
  fetchNews,
} = require("./helper/helper");
const { authorizer } = require("./middleware/authorizer");
const DBClient = require("./database/DBClient");

const db = new DBClient();

/**
 * User registration endpoint.
 * Validates user data, hashes the password, and stores the user in the database.
 */
app.post("/users/signup", async (req, res) => {
  let status = 200;
  let result;
  try {
    const body = req.body;
    // Validate request body against the register schema
    validator(body, "register");
    // Create payload with hashed password
    const payload = {
      name: body.name,
      email: body.email,
      password: await hashPassword(body.password),
      preferences: body.preferences,
    };
    // Check if the user already exists
    const exist = db.findOne(body.email);
    if (exist) throw new Error("User already exist");
    // Insert new user into the database
    db.insertOne(payload);
    result = { result: "User registered successfully" };
  } catch (error) {
    status = 400;
    result = error.message;
  }
  res.status(status).send(result);
});

/**
 * User login endpoint.
 * Validates user credentials and returns a JWT token if successful.
 */
app.post("/users/login", async (req, res) => {
  let status = 200;
  let result;
  try {
    // Validate request body against the login schema
    validator(req.body, "login");
    // Retrieve user information from the database
    const userInfo = db.findOne(req.body.email);
    if (!userInfo) throw new Error("Incorrect user email");
    // Check if the password is correct
    await passwordCheck(req.body.password, userInfo.password);
    // Generate and return a JWT token
    result = {
      token: await generateToken(userInfo),
    };
  } catch (error) {
    status = 401;
    result = error.message;
  }
  res.status(status).send(result);
});

/**
 * Get user preferences endpoint.
 * Retrieves the user's preferences using the JWT token.
 */
app.get("/users/preferences", authorizer, (req, res) => {
  let status = 200;
  let result;
  try {
    // Extract and decode the JWT token
    const token = req.headers.authorization;
    const userInfo = decoder(token.split(" ")[1]);
    // Retrieve user preferences from the database
    result = {
      preferences: db.findOne(userInfo.email, "Preference"),
    };
  } catch (error) {
    status = 401;
    result = error.message;
  }
  res.status(status).send(result);
});

/**
 * Update user preferences endpoint.
 * Updates the user's preferences in the database.
 */
app.put("/users/preferences", authorizer, (req, res) => {
  let status = 200;
  let result;
  try {
    // Validate request body against the preferences schema
    validator(req.body, "preferences");
    // Extract and decode the JWT token
    const token = req.headers.authorization;
    const userInfo = decoder(token.split(" ")[1]);
    // Update user preferences in the database
    db.updateOne(userInfo.email, req.body.preferences);
    result = { result: "Preference updated for the user" };
  } catch (error) {
    status = 401;
    result = error.message;
  }
  res.status(status).send(result);
});

/**
 * Fetch news endpoint.
 * Fetches news articles based on the user's preferences.
 */
app.get("/news", authorizer, async (req, res) => {
  let status = 200;
  let result;
  try {
    // Extract and decode the JWT token
    const token = req.headers.authorization;
    const userInfo = decoder(token.split(" ")[1]);
    // Retrieve user preferences from the database
    const preferences = db.findOne(userInfo.email, "Preference");
    // Fetch news based on user preferences
    result = { news: await fetchNews(preferences) };
  } catch (error) {
    status = 401;
    result = error.message;
  }
  res.status(status).send(result);
});

/**
 * Starts the Express server and listens on the specified port.
 */
app.listen(port, (err) => {
  if (err) {
    return console.log("Something bad happened", err);
  }
  console.log(`Server is listening on ${port}`);
});

module.exports = app;
