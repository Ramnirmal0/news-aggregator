const { decoder } = require("../helper/helper");
module.exports.authorizer = (req, res, next) => {
  // Extract the bearer token from the request headers
  const bearerToken = req.headers.authorization;

  // Check if the token is present and formatted correctly
  if (!bearerToken || !bearerToken.startsWith("Bearer ")) {
    return res.send(401).status("Unauthorized: Bearer token missing or invalid")
  }

  // Extract the token value (removing 'Bearer ' prefix)
  const token = bearerToken.split(" ")[1];

  // Validate the token using your decoder function
  if (!decoder(token)) {
    return res.send(401).status("Unauthorized: Invalid token")
  }

  // If token is valid, proceed to the next middleware
  next();
};
