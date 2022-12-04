const {response} = require("express");
const bcrypt = require("bcryptjs")
const User = require("../models/User");
const { generateJWT } = require("../helpers/jwt");


const crearUsuario = async(req,res = response)=>{

    const { email, password} = req.body;

    try{
        let user = await User.findOne({email});

        if(user){
            return res.status(400).json({
                ok:false,
                msg: "Un usuario existe con ese correo"
            });
        }

        user = new User(req.body);

        //encriptar contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt)

        await user.save();

        //generar json web token

        const token = await generateJWT(user.id, user.name)

        res.status(201).json({
        ok:true,
        uid: user.id,
        name: user.name,
        token
        })

    }catch(error){
        console.log(error)
        res.status(500).json({
            ok: false,
            msg:"Comunicarse con el administrador"
        })
    }

    
}

const loginUsuario = async(req,res = response)=>{

    const { email, password} = req.body;

    try{
        let user = await User.findOne({email});
        console.log(user);

        if(!user){
            return res.status(400).json({
                ok:false,
                msg: "Usario o contraseña incorrecto"
            });
        }
        //confirmar password

        const validPassword = bcrypt.compareSync(password, user.password);
        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: "password incorrecto"
            })
        }

        //generar json web token

        const token = await generateJWT(user.id, user.name)
        console.log(token)
        res.json({
            ok:true,
            uid: user.id,
            name: user.name,
            token
        })

    }catch(error){
        console.log(error)
        res.status(500).json({
            ok: false,
            msg:"Comunicarse con el administrador"
        })
    }
};

const revalidarToken = async(req, res=response)=>{

    const {uid, name} = req;

    //generar un nuevo JWT y retornarlo en esta peticion
    const token = await generateJWT(uid, name)

    res.json({
        ok:true,
        token
    })
};


module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}