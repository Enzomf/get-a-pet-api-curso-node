const express = require("express");
const route = express.Router();

const UserController = require("../controllers/UserController")

const verifyAuth = require("../helpers/verifyAuth")

route.post("/register", UserController.register);
route.post("/login", UserController.login);

route.get("/checkuser", verifyAuth, UserController.checkUser);


module.exports = route