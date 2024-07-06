//archivo de barril 

const validar_JWT = require('../middlewares/validar-jwt');
const validar_Campos = require('../middlewares/validar-campos');


module.exports = {
    //... operadort express para desestructurar
    ...validar_JWT,
    ...validar_Campos
}