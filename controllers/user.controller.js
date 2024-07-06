const {request, response } = require('express');
const bcrypt = require('bcrypt');
const Usuario = require('../models/user.js');
const { validationResult } = require('express-validator');


const userGet = async (req=request, res= response) => {

  const query ={estado: true};

  const { limite = 5, desde = 0 } = req.query;

  const [result, total] = await Promise.all([
    Usuario.find(query).limit(Number(limite)).skip(Number(desde)),
    Usuario.countDocuments()
  ]);

  res.json({
    status: true,
    result,
    total
  });

}

const userById =  async (req=request, res= response) => {
    
    const id = req.params.id;

    const result = await Usuario.findById(id);

    if (!result){
      res.status(400).jason({
        status: false,
        message: 'No se ha podido encontrar el id'
      })
    }else{
      res.json({
        status: true,
        result
      });
    }
  }


  const userPost = (req=request, res= response) => {
  
    const {nombre, email, password, estado, isAdmin, image} = req.body;

    const  usuario = new Usuario({nombre, email, password, estado, isAdmin, image});

    // encriptar password 
    //npm install bcrypt

    //numero de vuletas para encriptar por default 10
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    // Graba el usuario en la BD
    usuario.save();
    
    res.json({
      status: true,
      message: 'Usuario registrado correctamente',
      result: {nombre, email, password, estado, isAdmin, image}
    })
  }


  const userUpdate = async (req=request, res= response)=>{

    const id = req.params.id;

    //no actualiza el _id, email, password, y actualiza el resto 
    const {_id, email, password , ...resto} = req.body;

    //encripta el password 
    if (password){
      const salt = bcrypt.genSaltSync();
      resto.password = bcrypt.hashSync(password, salt);
    }

    //actualiza el documento 
    const result = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
      status: true,
      result,
      message: `El usuario ${resto.nombre} Actualizado`
    })
  }

  const userDelete = async (req=request, res= response) => {
    const id = req.params.id;

    /* //borrado fisico del documento 
    const result = await Usuario.findByIdAndDelete(id); */

    // borrado por estado en false
    const result = await Usuario.findByIdAndUpdate(id, {estado: false});


    res.json({
      status: true,
      result,
      message: `El usuario Eliminado`
    })

  }





// exporta los metodos 
module.exports = {
    userGet,
    userById,
    userPost,
    userUpdate,
    userDelete
}