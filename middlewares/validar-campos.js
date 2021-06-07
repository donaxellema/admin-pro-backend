
const {response} = require ('express');
const {validationResult}= require ('express-validator');
//↑ para desestructurar la require

/**Pàrecido a un controlador perpo tiene un parametro adicional que es el next que permite 
 * llamar al siguiente middleware si pasa el primero
 */
const validarCampos = (req, res=response, next) => {
    
    const errores = validationResult(req);
    if( !errores.isEmpty() ){
        return res.status(400).json({
            ok:false,
            errors:errores.mapped()
        });
    }

    next();
}

module.exports ={
        validarCampos
}