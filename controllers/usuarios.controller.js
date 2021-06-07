const {response}= require('express');
const bcrypt = require('bcryptjs'); //se importa aqui el bcript por que aqui se va a crear el usuario y la contraseña

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');
//↑importando desde el modelo


const getUsuarios = async(req,res = response) => {


const usuarios = await Usuario.find({}, 'nombre email role google');

    res.json({
        ok:true,
        usuarios,
        uid:req.uid
    })
}

const crearUsuarios = async (req,res) => {
    //console.log(req.body);
    const {email,password,nombre}=req.body;
    
    /* para controlar si ya existe el usuario dentro de bdd*/

   

    try {
        console.log(email);
        console.log(nombre);

        const existeEmail= await Usuario.findOne({email});
        if (existeEmail){
            return res.status(400).json({
                ok:false,
                msg:'El correo ya está registrado'
            });
        }

        const usuario = new Usuario(req.body);    
        //Encriptar contraseña
        const salt = bcrypt.genSaltSync(); //Esto genera esta data de manera aleatoria
        usuario.password = bcrypt.hashSync(password,salt) //tomo el usuario el password y el salt lo genera de manera aleatoria

        // ↓ guardar usuario
        await usuario.save();
        
        //Generar el TOKEN JWT PASO 2
        const token = await generarJWT(usuario._id);

        res.json({
            ok:true,
            usuario,
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error inesperado... revisar logs'
        })
    }
    /* para controlar si ya existe el usuario dentro de bdd*/
}

const actualizarUsuario = async (req,res = response) => {
        //TODO: Validar token y comprobar si el usuario es correcto

    const uid=req.params.id;

    try {

        const usuarioBD = await Usuario.findById(uid);
        if(!usuarioBD){
            return res.status(404).json({
                ok:false,
                msg:'No existe un usuario por ese id',
            });
        }

        //Actualizaciones 
        const { password,google,email, ...campos} = req.body;

        if(usuarioBD.email !== email) {

            const existeEmail = await Usuario.findOne({ email});
            if(existeEmail){
                return res.status(400).json({
                    ok:false,
                    msg:'Ya existe un usuario con ese email',
                })
            }
        }

        camposemail=email;
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos,{new:true});

        res.json({
            ok:true,
            usuario:usuarioActualizado
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error inesperado'
        })
    }

}





const borrarUsuario = async (req,res = response) => {
    //TODO: Validar token y comprobar si el usuario es correcto

const uid=req.params.id;

try {

    const usuarioBD = await Usuario.findById(uid);
    if(!usuarioBD){
        return res.status(404).json({
            ok:false,
            msg:'No existe un usuario por ese id',
        });
    }

    await Usuario.findOneAndDelete(uid);


    res.json({
        ok:true,
        msg:'Usuario Eliminado'
    })
    
} catch (error) {
    console.log(error);
    res.status(500).json({
        ok:false,
        msg:'Error inesperado'
    })
}

}




module.exports={
    getUsuarios,
    crearUsuarios,
    actualizarUsuario,
    borrarUsuario
}