/**
 * path: '/api/login'
 */
const { Router } = require('express');
const { check } = require('express-validator');
const {login, googleSingIn} = require('../controllers/auth.controller');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();

router.post ('/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password','EL password es obligatorio').not().isEmpty(),
        validarCampos
    ],
    login
);


router.post ('/google',
    [
        check('token','EL token de Google es obligatorio').not().isEmpty(),
        validarCampos
    ],
    googleSingIn
)




module.exports = router;