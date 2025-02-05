const {Router} = require('express');
const router = Router();
const {check} = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { login } = require('../controllers/auth.controller');


router.post('/login',[
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login)




module.exports = router;