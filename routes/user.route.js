const {Router}= require('express');
const {check} = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { userGet, userById, userPost, userUpdate, userDelete} = require('../controllers/user.controller');
const path =require('path');
const { emailExiste, existeUsuarioById } = require('../helpers/db-validators');
const { validarJWT } = require('../middlewares/validar-jwt');


//ejecutar el router de express
const router = Router();


//rutas 

/* //index route
router.get('/', function (req, res) {
    const parenDir = path.normalize(__dirname + "/..");
    res.sendFile(parenDir + '/public/index.html');
}); */


// User Routes 

router.get('/', userGet );

router.get('/:id',[
    check('id', 'No es un id valido').isMongoId(),
    validarCampos
], userById);

router.post('/',[
    check('email','El Email es obligatorio').isEmail(),
    check('nombre','El Nombre es Obligatorio').not().isEmpty(),
    check('password','El Password es Obligatorio y debe tener mas de 5 caracteres').isLength({min: 5, max: 30}),
    // llamar al helper
    check('email').custom(emailExiste),
    //llamar al middleware 
    validarCampos

], userPost);


router.put('/:id',[
    check('id', 'No es un id Valido').isMongoId(),
    check('id').custom(existeUsuarioById),
    check('nombre','El Nombre es Obligatorio').not().isEmpty(),
    validarCampos
] , userUpdate);


router.delete('/:id',[
    validarJWT,
    check('id').custom(existeUsuarioById),
    validarCampos
], userDelete);



// npm i jsonwebtoken
//para validar los tokens 






module.exports= router;

