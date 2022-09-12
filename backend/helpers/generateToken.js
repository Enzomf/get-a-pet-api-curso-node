const { json } = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

async function generateToken(res, user) {

    const token = jwt.sign({ name: user.name, id: user._id }, "nossosecret")

    res.status(200).json({ message: "Usuário autenticado!", token: token })
}

module.exports = generateToken