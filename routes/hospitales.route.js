/**
 * ruta: api/hospitales
 */

 const { Router } = require('express');
 const { check } = require ('express-validator'); /**Esta linea nos permite cargar una libreria para poder realizar validaciones */
 const { validarCampos } = require ('../middlewares/validar-campos'); /**Esta linea nos permite cargar el middlware de validar campos */
 
 const { getHospitales,creartHospital,actualizarHospital,borrarHospital } = require('../controllers/hospitales.controller')
 const { validarJWT } = require('../middlewares/validar-jwt');
 
 
 const router = Router();
 
 router.get('/',getHospitales);
 
 /**usamos check que es de espress-validator para poder validar */
 //↓ NOTA! es importante manejar el orden de los campos por que primero se necesita los campos para 
 //poder validarlos
 router.post('/',
     [
        validarJWT,
        check('nombre','El nombre del hospital es necesario').not().isEmpty(),
        validarCampos
     ] ,
     creartHospital
 
 );
 
 router.put('/:id',
 [
     validarJWT,
     check('nombre','El nombre del hospital es necesario').not().isEmpty(),
        validarCampos
 ],
 actualizarHospital);
 
 
 router.delete('/:id',
 validarJWT,
 borrarHospital);
 
 
 
 
 module.exports = router;