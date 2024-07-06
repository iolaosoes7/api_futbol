const {request, response } = require('express');
const bcrypt = require('bcrypt');
const Usuario = require('../models/user');
const { generarJWT } = require('../helpers/generar-jsonwebtoken');


const login = async (req= request, res= response) => {
    const {email, password} = req.body;

    try {

        const usuario = await Usuario.findOne({email: email});

        if (!usuario){
            return res.status(400).json({
                status: false,
                message: 'Usuario o Contraseña Incorrectos. - ...email...'
            });
        }

        // si el usuario esta activo 
        if (!usuario.estado){
            return res.status(400).json({
                status: false,
                message: 'Usuario bloqueado o suspoendido.'
            });
        }

        // validar contraseña 
        const validarPassword = bcrypt.compareSync(password, usuario.password);

        if (!validarPassword){
            return res.status(400).json({
                status: false,
                message: 'Usuario o Contraseña Incorrectos. - ...password...'
            });
        }

        // generar token 
        const token = await generarJWT(usuario.id);

        res.json({
            status: true,
            result: usuario,
            token: token

        });

        
    } catch (error) {
        console.log(error);
        return response.status(500).json({
            status: false,
            message: 'Ooops Algo salio mal.'
        })
        
    }


}

module.exports = {
    login
}