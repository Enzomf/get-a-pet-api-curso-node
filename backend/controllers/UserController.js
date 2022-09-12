const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../helpers/generateToken");
const  getUserById  = require("../helpers/userByToken");


class UserController {

    async register(req, res) {

        const { name, email, password, confirmPassword , phone } = req.body;

        if (!name) {
            return res.status(400).json({ message: "Nome é obrigatório!" });
        }

        if (!email) {
            return res.status(400).json({ message: "Email é obrigatório!" });
        }

        if (!password) {
            return res.status(400).json({ message: "Senha é obrigatória!" });
        }

        if (!confirmPassword) {
            return res.status(400).json({ message: "Confirmação de senha é obrigatória!" });
        }
        if(!phone){
            return res.status(400).json({ message: "Telefone é obrigatório!" });
        }


        if (password != confirmPassword) {
            return res.status(400).json({ message: "Senhas não batem!" });
        }

        const user = await User.findOne({ email: email });

        if (user) {
            return res.status(400).json({ message: "Email já cadastrado!" });
        }

        const hashedPassword = bcrypt.hashSync(password, 8);

        const userData = {

            name, email, password: hashedPassword, phone
        }

        try {
            const createdUser = await User.create(userData);

            generateToken(res, createdUser)

        } catch (err) {
            return res.status(400).json({message:err});
        }

    }


    async login(req, res){

        const { email, password } = req.body;

        if(!email){
          return  res.status(400).json({message:"Email é obrigatório!"});
        }

        if(!password){
           return res.status(400).json({message:"Senha é obrigatória!"});
        }

        const user = await User.findOne({email:email})

        if(!user){
          return  res.status(400).json({message:"Email ou senha invalidos!"})
        }
        console.log(user)

        if(!bcrypt.compareSync(password, user.password)){
            return  res.status(400).json({message:"Email ou senha invalidos!"})
        }

        generateToken(res, user._id)
    }


    async checkUser(req, res){

        const user = await getUserById(req, res)

        return res.status(200).json({message:user})
    }

}


module.exports = new UserController;