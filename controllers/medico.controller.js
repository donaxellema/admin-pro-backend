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

const actualizarMedico = async (req,res=response)=>{
    
    const id = req.params.id;
    const uid= req.uid;//tengo este dato de usuario por que pasa por autentica JWT
    try {
        
        const medico = await Medicos.findById(id);

        if (!medico){
            return res.status(404).json({
                ok:true,
                msg:'Medico no encontrado por id'
            })
        }

        //hospital.nombre = req.body.nombre;
        const cambiosMedico = {
            ...req.body,
            usuario:uid
        }

        const medicoActualizado = await Medicos.findByIdAndUpdate(id,cambiosMedico,{new:true})


        res.json({
            ok:true,
            medico:medicoActualizado
        })

    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }
}

const borrarMedico = async(req,res=response)=>{
    const id = req.params.id;
    
    try {
        
        const medico = await Medicos.findById(id);

        if (!medico){
            return res.status(404).json({
                ok:true,
                msg:'Medico no encontrado por id'
            })
        }

        await Medicos.findByIdAndDelete(id);

        res.json({
            ok:true,
            msg:'Médico borrado'
        });

    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }



}



module.exports={
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}