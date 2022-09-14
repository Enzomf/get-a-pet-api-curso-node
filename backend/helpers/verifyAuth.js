const jwt = require("jsonwebtoken");
const User = require("../models/User");
const splitToken = require("./splitToken");

async function verifyAuth(req, res, next) {
  
  let token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Usuário não autenicado" });
  }

  token = splitToken(token);

  if (!(await jwt.verify(token, "nossosecret"))) {
    return res.status(401).json({ message: "Usuário não autenicado" });
  }

  const tokenData = await jwt.decode(token, "nossosecret");

  const user = await User.findById(tokenData.id);

  if (!user) {
    return res.status(401).json({ message: "Usuário não autenicado" });
  }

  next();
}

module.exports = verifyAuth;
