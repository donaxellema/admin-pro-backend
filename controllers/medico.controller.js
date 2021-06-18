const { response } = require("express")

const  Medicos  = require("../models/medico")

const getMedicos = async(req,res=response)=>{

    const medicos = await Medicos.find()
                                        .populate('usuario','nombre img ')
                                        .populate('hospital','nombre img');

    res.json({
        ok:true,
        medicos
    })
}

const crearMedico = async (req,res=response)=>{
    /* res.json({
        ok:true,
        msg:'crearMedico'
    })
 */
    /**El siguiente proceso se ejecuta pasando la verificacion del token osea todo el middleware */

    const uid= req.uid;

    const medico = new Medicos ({
        usuario: uid,
        ...req.body
    });
        
    //- siempre se va a tener en este caso el acceso al uid, 
    //- pero despues de haber pasado el middleware(validacion del token)
    console.log(uid);
    try {

        const medicoDB = await medico.save();
        res.json({
            ok:true,
            medico:medicoDB
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })    
    }

}

const actualizarMedico = (req,res=response)=>{
    res.json({
        ok:true,
        msg:'actualizarMedico'
    })
}

const borrarMedico = (req,res=response)=>{
    res.json({
        ok:true,
        msg:'borrarMedico'
    })



}



module.exports={
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}