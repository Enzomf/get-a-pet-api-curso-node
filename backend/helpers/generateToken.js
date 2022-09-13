const jwt = require("jsonwebtoken");

async function generateToken(res, user) {
  const token = jwt.sign({ name: user.name, id: user._id }, "nossosecret");

  res.status(200).json({ message: "Usuário autenticado!", token: token });
}

module.exports = generateToken;
