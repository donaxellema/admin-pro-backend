/**
 * 
 * ruta: api/todo/:busqeuda
 */

 const { Router } = require('express');
 const { check } = require ('express-validator'); /**Esta linea nos permite cargar una libreria para poder realizar validaciones */
 const { validarCampos } = require ('../middlewares/validar-campos'); /**Esta linea nos permite cargar el middlware de validar campos */
 const { validarJWT } = require('../middlewares/validar-jwt');
 
 const {getTodo,getDocumentosColeccion} = require('../controllers/busquedas.controller');

  
 const router = Router();
 
 router.get('/:busqueda',validarJWT ,getTodo);

 router.get('/coleccion/:tabla/:busquedas',validarJWT ,getDocumentosColeccion);
 
 /**usamos check que es de espress-validator para poder validar */
 //↓ NOTA! es importante manejar el orden de los campos por que primero se necesita los campos para 
 //poder validarlos

  
 
 module.exports = router;