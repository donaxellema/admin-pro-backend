const {response} = require('express');
const Usuario = require('../models/usuario')
const bcrypt = require('bcryptjs'); //se importa aqui el bcript por que aqui se va a crear el usuario y la contraseña
const { generarJWT } = require('../helpers/jwt');
const {googleVerify}= require('../helpers/google-verify');


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


const googleSingIn= async(req,res=response)=>{

    const googleToken= req.body.token;

    try {

        const  {name,email,picture} = await googleVerify( googleToken );

        //verificar si esa cuenta existe en la base de datos 
        const usuarioDB = await Usuario.findOne({ email });
        let usuario;
        if ( !usuarioDB ){
            //si no existe creo un nuevo usuario
            //la info del usuario se queda aquiu en la variable 
            usuario = new Usuario({
                nombre:name,
                email,
                password:'@@@@@',
                img:picture,
                google:true,
            });
        }else{
            //La persona puede pasar de(usuario y contraseña ) a una autentica de google 
            //existe usuario
            usuario= usuarioDB;
            //para marcar que fue desde un usuario de google
            usuario.google=true;
            
        }

        // Guardar en DB
        await usuario.save();
        //Generar el JWToken -JWT
        const token = await generarJWT(usuario.id);

        res.json({
            ok:true,
            token
        })
        
    } catch (error) {
        res.status(401).json({
            ok:false,
            msg:'Token no es correcto'
        })
    }    
}

const renewToken = async (req,res=response) =>{

    //el usuario debe de grabar ya sea en el local storage o algun lugar de la maquina y 
    //proveelor despues para hacer las peticiones    
    
    const uid= req.uid;
    //Generar el JWToken -JWT
    const token = await generarJWT(uid);

    res.json({
        ok:true,
        token
    })
};

module.exports={
    login,
    googleSingIn,
    renewToken

}