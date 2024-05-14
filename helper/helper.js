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

module.exports.decoder = token = {
    
};

module.exports.generateToken = (Credential) =>{
  
}
