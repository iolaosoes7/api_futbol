 const {request, response } = require('express');
const bcrypt = require('bcrypt');
const Futbolista = require('../models/futbolista.js');
const { validationResult } = require('express-validator');



const futbolistaGet = async (req=request, res= response)  => {

    const { limite = 5, desde = 0 } = req.query;

    const [result, total] = await Promise.all([
        //populate trae todos los datos del usuario -- populated relacion de 1 a muchos 
        Futbolista.find().limit(Number(limite)).skip(Number(desde)).populate('usuario'),
        Futbolista.countDocuments()
    ]);

    res.json({
        status: true,
        message: 'futbolistaGet',
        result,
        total
    });

}


const futbolistaById = async (req=request, res= response)  => {
    
    const id = req.params.id;

    const result = await Futbolista.findById(id);

    if (!result){
      res.status(400).jason({
        status: false,
        message: 'No se ha podido encontrar el id futbolistaById'
      })
    }else{
      res.json({
        status: true,
        result
      });
    }

}


const futbolistaPost = async (req=request, res= response)  => {
    
    const {apodo, edad, equipos, imagen, nacionalidad, nombre, posicion, usuario} = req.body;

    const  futbolista = new Futbolista({apodo, edad, equipos, imagen, nacionalidad, nombre, posicion, usuario});

    // Graba el usuario en la BD
    futbolista.save();
    
    res.json({
      status: true,
      message: 'Futbolista registrado correctamente',
      result: futbolista
    })

}


const futbolistaUpdate = async (req=request, res= response)  => {
    
    const id = req.params.id;

    //no actualiza el _id, email, password, y actualiza el resto 
    const {_id,nombre, ...futbolista} = req.body;

   //actualiza el documento 
    const result = await Futbolista.findByIdAndUpdate(id, futbolista);

    res.json({
      status: true,
      result,
      message: `El Futbolista con id: ${id} Actualizado`
    })
}

const futbolistaDelete = async (req=request, res= response)  => {

    const id = req.params.id;

    //borrado fisico del documento 
    const result = await Futbolista.findByIdAndDelete(id); 

    res.json({
      status: true,
      message: `El usuario Eliminado`
    })

}




module.exports = {
futbolistaGet,
futbolistaById,
futbolistaPost,
futbolistaUpdate,
futbolistaDelete,
}