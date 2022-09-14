const Pet = require("../models/Pet");
const userByToken = require("../helpers/userByToken");
const validatePetOwner = require("../helpers/validadePetOwner");
const deletePetImages = require("../helpers/deletePetImages");

class PetController {
  async create(req, res) {
    const { name, age, weight, color } = req.body;

    const avalaible = true;

    const images = req.files;

    const petOwner = await userByToken(req);

    if (!name) {
      res.status(422).json({ message: "Nome é obrigatório!" });
      return;
    }

    if (!age) {
      res.status(422).json({ message: "Idade é obrigatório!" });
      return;
    }

    if (!weight) {
      res.status(422).json({ message: "Peso é obrigatório!" });
      return;
    }

    if (!color) {
      res.status(422).json({ message: "Cor é obrigatória!" });
      return;
    }

    if (images.length == 0) {
      res.status(422).json({ message: "A imagem é obrigatória!" });
      return;
    }

    const pet = new Pet({
      name,
      age,
      weight,
      color,
      avalaible,
      images: [],
      user: {
        _id: petOwner._id,
        name: petOwner.name,
        phone: petOwner.phone,
        image: petOwner.image,
      },
    });

    images.map((image) => {
      pet.images.push(image.filename);
    });

    try {
      const newPet = await pet.save();
      return res
        .status(201)
        .json({ message: "Pet cadastrado com sucesso", newPet });
    } catch (err) {
      return res.status(400).json({ message: err });
    }
  }

  async getPets(req, res) {
    try {
      const pets = await Pet.find();

      return res.status(200).json({ pets });
    } catch (err) {
      return res.status(400).json({ message: err });
    }
  }

  async petById(req, res) {
    const id = req.params.id;

    try {
      const pet = await Pet.findById(id);

      if (!pet) {
        return res.status(400).json({ message: "Pet não encontrado" });
      }

      return res.status(200).json({ pet });
    } catch (err) {
      return res.status(400).json({ message: err });
    }
  }

  async delete(req, res) {
    const id = req.params.id;

    const pet = await Pet.findById(id);

    if (!pet) {
      return res.status(404).json({ message: "Pet não encontrado" });
    }

    if (!(await validatePetOwner(req, pet.user._id))) {
      return res
        .status(400)
        .json({ message: "Só é possivel remover os seus pets" });
    }

    await deletePetImages(pet.images);

    try {
      await Pet.findByIdAndDelete(id);

      return res.status(200).json({ message: "Pet removido com sucesso" });
    } catch (err) {
      return res.status(400).json({ message: err });
    }
  }

  async myPets(req, res) {
    console.log("Está iniciando");
    const user = await userByToken(req, res);

    const pets = await Pet.find({ "user._id": user._id }).sort("-createdAt");


    if(pets.length < 1){
        return res.status(200).json({message:"Nenhum pet cadastrado!"})
    }
   
    return res.status(200).json(pets)
  }
}

module.exports = new PetController();
