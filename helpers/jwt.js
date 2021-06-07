const jwt = require('jsonwebtoken');

/**
 * NOTA: se transformo la funcion en una async await por que de esa forma 
 * se podra hacer un resolve y un reject dentro del if
 */
const generarJWT = (uid) => {

    return new Promise( (resolve,reject) =>{
        
        const payload = {
            uid,
        }

         //el sing es para crear el token?
        jwt.sign(payload, process.env.JWT_SECRET,{
            expiresIn:'12h'
        },(err,token)=>{

            if(err){
                console.log(err);
                reject('No se pudo generar el JWT')
            }else{
                resolve(token);
            }

        });


    });

    
}

module.exports={
    generarJWT,
}