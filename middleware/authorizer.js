const { decoder } = require("../helper/helper");

/**
 * Middleware function to authorize requests based on a bearer token.
 * This function checks for the presence of a valid bearer token in the request headers.
 * If the token is missing, improperly formatted, or invalid, it responds with a 401 Unauthorized status.
 * If the token is valid, it calls the next middleware in the stack.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next middleware function in the stack.
 */
module.exports.authorizer = (req, res, next) => {
  // Extract the bearer token from the request headers
  const bearerToken = req.headers.authorization;

  // Check if the token is present and formatted correctly
  if (!bearerToken || !bearerToken.startsWith("Bearer ")) {
    // Respond with 401 Unauthorized if token is missing or improperly formatted
    return res.status(401).send("Unauthorized: Bearer token missing or invalid");
  }

  // Extract the token value (removing 'Bearer ' prefix)
  const token = bearerToken.split(" ")[1];

  // Validate the token using your decoder function
  if (!decoder(token)) {
    // Respond with 401 Unauthorized if token is invalid
    return res.status(401).send("Unauthorized: Invalid token");
  }

  // If token is valid, proceed to the next middleware
  next();
};
