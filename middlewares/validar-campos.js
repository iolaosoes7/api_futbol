
// npm install express-validator
//crear un middleware = el tercet parametro debe ser una funcion "next"

const { request, response } = require("express");
const { validationResult } = require("express-validator");



const validarCampos = (req=request, res= response, next ) => {
    const errors = validationResult(req);

    if ( !errors.isEmpty() ){
      return res.status(400).json( errors );
    }

    next();
}

module.exports = {
    validarCampos
}