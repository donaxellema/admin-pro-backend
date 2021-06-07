const {response} = require('express');
const Usuario = require('../models/usuario')
const bcrypt = require('bcryptjs'); //se importa aqui el bcript por que aqui se va a crear el usuario y la contraseña
const { generarJWT } = require('../helpers/jwt');



const login = async(req, res=response)=>{
     const {email,password} = req.body;

    try {
        
        //Verificar email
        const usuarioDB = await Usuario.findOne({email});
        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg:'email no Encontrado'
            });
        }
        //Verificar contraseña
        const validPassword =  bcrypt.compareSync(password,usuarioDB.password);
        if( !validPassword ){
            return res.status(400).json({
                ok:false,
                msg:'Contraseña no valida'
            })
        }
        
        //PASO 1 CREAR EL ARCHIVO JWT EN UNA CARPETA HELPERS
        //Generar el TOKEN JWT PASO 2
        const token = await generarJWT(usuarioDB._id);

        res.json({
            ok:true,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        });
    }
}


module.exports={
    login
}