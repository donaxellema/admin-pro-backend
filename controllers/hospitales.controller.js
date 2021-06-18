const { response } = require("express")

const Hospital = require('../models/hospital'); 


const getHospitales = async(req,res=response)=>{

    const hospitales = await Hospital.find()
                                        .populate('usuario','nombre email ');

    res.json({
        ok:true,
        hospitales
    })
}

const creartHospital = async (req,res=response)=>{

    const uid= req.uid;

    const hospital = new Hospital ({
        usuario: uid,
        ...req.body
    });
        
    //- siempre se va a tener en este caso el acceso al uid, 
    //- pero despues de haber pasado el middleware(validacion del token)
    console.log(uid);
    try {

        const hospitalDB = await hospital.save();
        res.json({
            ok:true,
            hospital:hospitalDB
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })    
    }

    
}

const actualizarHospital = (req,res=response)=>{
    res.json({
        ok:true,
        msg:'actualizarHospital'
    })
}

const borrarHospital = (req,res=response)=>{
    res.json({
        ok:true,
        msg:'eliminarHospital'
    })
}



module.exports={
    getHospitales,
    creartHospital,
    actualizarHospital,
    borrarHospital
}