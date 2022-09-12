const jwt = require("jsonwebtoken");
const User = require("../models/User")
const splitToken = require("./splitToken")

async function verifyAuth(req, res) {

    let token = req.headers.authorization;
    token = splitToken(token);
;
    const tokenData = await jwt.decode(token, 'nossosecret')

    try{
        const user = await User.findById(tokenData.id).select("-password")
        return user
    }catch(err){
        return res.json({message:err})
    }




    return user


}


module.exports = verifyAuth