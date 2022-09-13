const jwt = require("jsonwebtoken");
const splitToken = require("./splitToken");


async function validatePetOwner(req, OwnerID) {
  const Owner = OwnerID.toString();

  const token = splitToken(req.headers.authorization);
  let currentUser = await jwt.decode(token, "nossosecret");
  currentUser = currentUser.id;

  if (Owner != currentUser) {
  
    return false;
  }

  return true;
}

module.exports = validatePetOwner;
