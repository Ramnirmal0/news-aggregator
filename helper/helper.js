const bcrypt = require("bcrypt");
const secretKey = process.env.SECRETkEY || "S@ltPepperZissorS";

module.exports.validator = (body, endpoint) => {
  switch (endpoint) {
    case "register": {
      break;
    }
    case "login": {
      break;
    }
    case "preferences": {
      break;
    }
    default: {
      throw new Error("Invalid endpoint.");
    }
  }
};

module.exports.decoder = (token) => {
  try {
    // Verify the token
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    throw new Error("Not a valid token");
  }
};

module.exports.hashPassword = async (password) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw new Error("Hashing of password failed");
  }
};

module.exports.passwordCheck = async (inputPassword, password) => {
  try {
    const match = await bcrypt.compare(inputPassword, password);
    if (match) {
      return true;
    } else {
      throw new Error("Password is Incorrect");
    }
  } catch (error) {
    throw new Error("Passsword authentication failed");
  }
};

module.exports.generateToken = (user) => {
  // Exclude the password from the user object
  const { password, ...userWithoutPassword } = user;

  // Create a token
  const token = jwt.sign(userWithoutPassword, secretKey, { expiresIn: "1h" });

  return token;
};
