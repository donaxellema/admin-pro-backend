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

const actualizarHospital =async (req,res=response)=>{

    const id = req.params.id;
    const uid= req.uid;//tengo este dato por que pasa por autentica JWT
    try {
        
        const hospital = await Hospital.findById(id);

        if (!hospital){
            return res.status(404).json({
                ok:true,
                msg:'Hospital no encontrado por id'
            })
        }

        //hospital.nombre = req.body.nombre;
        const cambiosHospital = {
            ...req.body,
            usuario:uid
        }

        const hospitalActualizado = await Hospital.findByIdAndUpdate(id,cambiosHospital,{new:true})


        res.json({
            ok:true,
            hospital:hospitalActualizado
        })

    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }

    
}

const borrarHospital = async (req,res=response)=>{
    const id = req.params.id;
    
    try {
        
        const hospital = await Hospital.findById(id);

        if (!hospital){
            return res.status(404).json({
                ok:true,
                msg:'Hospital no encontrado por id'
            })
        }

        

        await Hospital.findByIdAndDelete(id);
        
        res.json({
            ok:true,
            msg:'Hospital Eliminado'
        })

    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }
}



module.exports={
    getHospitales,
    creartHospital,
    actualizarHospital,
    borrarHospital
}