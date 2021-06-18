/**
 * Medicos
 * ruta: api/medicos
 */

 const { Router } = require('express');
 const { check } = require ('express-validator'); /**Esta linea nos permite cargar una libreria para poder realizar validaciones */
 const { validarCampos } = require ('../middlewares/validar-campos'); /**Esta linea nos permite cargar el middlware de validar campos */
 const { validarJWT } = require('../middlewares/validar-jwt');
 
 const {
    getMedicos,crearMedico,actualizarMedico,borrarMedico 
    } = require('../controllers/medico.controller');

    
  
 const router = Router();
 
 router.get('/',getMedicos);
 
 /**usamos check que es de espress-validator para poder validar */
 //↓ NOTA! es importante manejar el orden de los campos por que primero se necesita los campos para 
 //poder validarlos
 router.post('/',
     [
        validarJWT,
        check('nombre','EL nombre del medico es necesario').not().isEmpty(),
        check('hospital','EL hostial id debe ser valido').isMongoId(),//validacion exclusiva para id de mongos
        validarCampos
     ] ,
     crearMedico
 
 );
 
 router.put('/:id',
 [
     
 ],
 actualizarMedico);
 
 
 router.delete('/:id',
 borrarMedico);
 
 
 
 
 module.exports = router;