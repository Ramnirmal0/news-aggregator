const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); // Ensure you have jwt module required here
const Joi = require("joi");

const secretKey = process.env.SECRETkEY || "S@ltPepperZissorS";

/**
 * Validates request body based on the endpoint.
 *
 * @param {Object} body - The request body to validate.
 * @param {string} endpoint - The API endpoint to determine validation rules.
 * @throws Will throw an error if the endpoint is invalid.
 */
module.exports.validator = (body, endpoint) => {
  const schemas = {
    register: Joi.object({
      name: Joi.string().min(3).max(50).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
      preferences: Joi.array().items(Joi.string()).required(),
    }),
    login: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
    }),
    preferences: Joi.object({
      preferences: Joi.array().items(Joi.string()).required(),
    }),
  };

  const schema = schemas[endpoint];
  if (!schema) {
    throw new Error("Invalid endpoint.");
  }

  const { error } = schema.validate(body);
  if (error) {
    throw new Error(`Validation error: ${error.details[0].message}`);
  }
  
  return true;
};

/**
 * Decodes and verifies a JWT token.
 *
 * @param {string} token - The JWT token to decode and verify.
 * @returns {Object} - The decoded token payload.
 * @throws Will throw an error if the token is invalid.
 */
module.exports.decoder = (token) => {
  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, secretKey);
    return decoded; // Return the decoded token if verification is successful
  } catch (error) {
    // Throw an error if the token is invalid
    throw new Error("Not a valid token");
  }
};

/**
 * Hashes a password asynchronously using bcrypt.
 *
 * @param {string} password - The plain text password to hash.
 * @returns {Promise<string>} - The hashed password.
 * @throws Will throw an error if hashing fails.
 */
module.exports.hashPassword = async (password) => {
  try {
    const saltRounds = 10; // Number of rounds for generating the salt
    const hashedPassword = await bcrypt.hash(password, saltRounds); // Hash the password with the specified number of salt rounds
    return hashedPassword; // Return the hashed password
  } catch (error) {
    // Throw an error if hashing fails
    throw new Error("Hashing of password failed");
  }
};

/**
 * Compares an input password with a stored hashed password.
 *
 * @param {string} inputPassword - The plain text password to check.
 * @param {string} password - The hashed password to compare against.
 * @returns {Promise<boolean>} - True if the passwords match, false otherwise.
 * @throws Will throw an error if the passwords do not match or if comparison fails.
 */
module.exports.passwordCheck = async (inputPassword, password) => {
  try {
    const match = await bcrypt.compare(inputPassword, password); // Compare the input password with the hashed password
    if (match) {
      return true; // Return true if the passwords match
    } else {
      // Throw an error if the passwords do not match
      throw new Error("Password is Incorrect");
    }
  } catch (error) {
    // Throw an error if the comparison fails
    throw new Error("Password authentication failed");
  }
};

/**
 * Generates a JWT token for an authenticated user.
 *
 * @param {Object} user - The user object containing user details.
 * @returns {string} - The generated JWT token.
 */
module.exports.generateToken = (user) => {
  // Exclude the password property from the user object using destructuring
  const { password, ...userWithoutPassword } = user;

  // Create a JWT token with the user data, using the secret key and setting an expiration time of 1 hour
  const token = jwt.sign(userWithoutPassword, secretKey, { expiresIn: "1h" });

  return token; // Return the generated token
};
