
const mongoose = require('mongoose');
const Usuario = require('../models/user.js');
const Futbolista = require('../models/futbolista.js');

const emailExiste = async(email) => 
    {

    const  validarEmail = await Usuario.findOne({ email });

    if (validarEmail){
        throw new Error (`El Email ${email} ya está registrado en el base de datos `);
    }
}

const existeUsuarioById = async ( id ) => {
    if (mongoose.Types.ObjectId.isValid(id)){

        const existeId = await Usuario.findById(id);

        if (!existeId){
            throw new Error (`El Id ${id} no existe en la base de datos`);
        }/* else{
            throw new Error (`El Id ${id} no es valido`);
        } */
    }
}

const existeFutbolistaById = async ( id ) => {
    if (mongoose.Types.ObjectId.isValid(id)){

        const existeId = await Futbolista.findById(id);

        if (!existeId){
            throw new Error (`El Id ${id} no existe en la base de datos`);
        }
    }
}

module.exports = {
    emailExiste,
    existeUsuarioById,
    existeFutbolistaById
}