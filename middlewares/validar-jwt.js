
// npm i jsonwebtoken
//para validar los tokens 


const { request, response } = require("express");
const jwt = require('jsonwebtoken');
const Usuario = require('../models/user');

const validarJWT = async (req,res,next) =>{

    const token = req.header('x-token');

    if (!token){
        return res.status(401).json({
            status: false,
            message: 'Debe enviar un token'
        });
    }

    try {

        const KEY = process.env.SECRET_KEY;
        const {uid} = jwt.verify(token, KEY);

        //leer el usuario que corresponde al uid

        const usuario = await Usuario.findById(uid);

        if(!usuario){
            res.status(401).json({
                status: false,
                message: 'Token no valido - usuario no existe en la BD'
            });
        }


        //verificar que el usuario este activo 

        if (!usuario.estado){
            res.status(401).json({
                status: false,
                message: 'Token no valido - usuario bloqueado o suspendido '
            });
        }

        req.usuario = usuario;

        next();
     
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            message: 'Token no valido'
        });
    }
}




module.exports = {
    validarJWT
}