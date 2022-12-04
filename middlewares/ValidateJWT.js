const {response} = require("express")
const jwt = require("jsonwebtoken");


const validateJWT = (req, resp = response, next) =>{

    //x-tokens headers
    const token = req.header("x-token")

    if (!token){
        return resp.status(401).json({
            ok:false,
            msg:"No hay token en la peticion"
        });
    }

    try{

        const {uid, name} = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );

        req.uid = uid;
        req.name = name;

    }catch(error){
        return resp.status(401).json({
            ok:false,
            msg: "token no valido"
        })
    }

    next();
}

module.exports = {
    validateJWT
}