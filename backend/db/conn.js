const mongoose = require("mongoose");
const uri = "mongodb+srv://enzo:04141511@cluster0.whaas9r.mongodb.net/?retryWrites=true&w=majority";



async function connect() {

    await mongoose.connect(uri);
    console.log("Conectado ao banco !");
}

connect().catch(err => console.log(err));


module.exports = mongoose;

