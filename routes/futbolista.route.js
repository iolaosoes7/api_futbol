const {Router}= require('express');
const {check} = require('express-validator');

/* const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos'); */

const {validarJWT, validarCampos} = require('../middlewares');


const { futbolistaGet, futbolistaById, futbolistaPost, futbolistaUpdate, futbolistaDelete} = require('../controllers/futbolista.controller');
const path = require('path');
const { emailExiste, existeusuarioById, existeFutbolistaById, existeUsuarioById } = require('../helpers/db-validators');
const validarUsuarioFutbolista = require('../middlewares/validar-usuario-futbolista');


//ejecutar el router de express
const router = Router();

// Futbolista Routes 

router.get('/',[
    validarJWT,
    validarCampos
], futbolistaGet );

router.get('/:id',[
    validarJWT,
    check('id', 'No es un mongoID valido').isMongoId(),
    check('id').custom(existeFutbolistaById),
    validarCampos
], futbolistaById);


router.post('/',[
    validarJWT,
    check('imagen','La url de la imagen del futbolista es obligatorio').not().isEmpty(),
    check('nombre','La nombre del futbolista es obligatorio').not().isEmpty(),
    check('posicion','La posicion del futbolista es obligatorio').not().isEmpty(),
    //check('usuario','El id del usuario es obligatorio').isMongoId,
    check('usuario').custom(existeUsuarioById),
    //llamar al middleware 
    validarCampos
], futbolistaPost);


router.put('/:id',[
    validarJWT,
    check('imagen','La url de la imagen del futbolista es obligatorio').not().isEmpty(),
    check('posicion','La posicion del futbolista es obligatorio').not().isEmpty(),
    //check('usuario','El id del usuario es obligatorio').isMongoId,
    check('usuario').custom(existeUsuarioById),
    //llamar al middleware 
    validarUsuarioFutbolista,
    validarCampos
] , futbolistaUpdate);


router.delete('/:id',[
    validarJWT,
    check('id').custom(existeFutbolistaById),
    validarUsuarioFutbolista,
    validarCampos
], futbolistaDelete);
 


module.exports= router;

