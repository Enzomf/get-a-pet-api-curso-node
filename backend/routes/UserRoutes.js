const express = require("express");
const route = express.Router();

const UserController = require("../controllers/UserController");

const verifyAuth = require("../helpers/verifyAuth");
const upload = require("../helpers/imageUpload");

route.post("/register", UserController.register);
route.post("/login", UserController.login);
route.patch(
  "/update",
  upload.single("image"),
  verifyAuth,
  UserController.updateData
);

route.get("/checkuser", verifyAuth, UserController.checkUser);
route.get("/:id", verifyAuth, UserController.UserById);

module.exports = route;
