const express = require("express");
const route = express.Router();

const PetController = require("../controllers/PetController");
const verifyAuth = require("../helpers/verifyAuth");
const upload = require("../helpers/imageUpload");

route.get("/mypets", verifyAuth, PetController.myPets);
route.delete("/delete/:id", verifyAuth, PetController.delete);
route.get("/:id", PetController.petById);
route.post("/create", verifyAuth, upload.array("images"), PetController.create);


route.get("/", PetController.getPets);

module.exports = route;
