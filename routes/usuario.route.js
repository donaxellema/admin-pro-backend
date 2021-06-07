/**
 * Ruta: /api/usuarios
 */

const { Router } = require('express');
const { check } = require ('express-validator'); /**Esta linea nos permite cargar una libreria para poder realizar validaciones */
const { validarCampos } = require ('../middlewares/validar-campos'); /**Esta linea nos permite cargar el middlware de validar campos */

const { getUsuarios,crearUsuarios,actualizarUsuario,borrarUsuario }=require('../controllers/usuarios.controller');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

router.get('/',validarJWT,getUsuarios);

/**usamos check que es de espress-validator para poder validar */
//↓ NOTA! es importante manejar el orden de los campos por que primero se necesita los campos para 
//poder validarlos
router.post('/',
    [
        check('nombre','El nombre es Obligatorio').not().isEmpty(),
        check('password','El password es Obligatorio').not().isEmpty(),
        check('email','El email es Obligatorio').isEmail(),
        validarCampos,
    ] ,
    crearUsuarios

);

router.put('/:id',
[
    validarJWT,
    check('nombre','El nombre es Obligatorio').not().isEmpty(),
    check('email','El email es Obligatorio').isEmail(),
    check('role','El role es Obligatorio').not().isEmpty(),
    validarCampos
],
actualizarUsuario);


router.delete('/:id',
    
[
    validarJWT
    /* check('nombre','El nombre es Obligatorio').not().isEmpty(),
    check('email','El email es Obligatorio').isEmail(),
    check('role','El role es Obligatorio').isEmail(),
    validarCampos */
],
borrarUsuario);




module.exports = router;