const fs = require('fs'); //esta libreria permite trabajar con los archivos del systema (lib propia de nodejs)

const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const borrarImagen = (path) => {
    if ( fs.existsSync(path) ){
        //borrar la imagen anterior
        fs.unlinkSync(path);
    }

}

const actualizarImagen = async (tipo, id,nombreArchivo)=>{
    console.log('vamos bien');

    let pathViejo='';
    switch (tipo) {
        case 'medicos':
            const medico = await Medico.findById(id);
            if( !medico ){
                console.log("no es un médico por id");
                return false;
            }
            pathViejo= `./uploads/medicos/${ medico.img }`;
            borrarImagen(pathViejo);
            medico.img = nombreArchivo;
            await medico.save();
            return true;

        break;
        case 'hospitales':
            hospital = await Hospital.findById(id);
            if( !hospital ){
                console.log("no es un hospital por id");
                return false;
            }
            pathViejo= `./uploads/hospitales/${ hospital.img }`;
            borrarImagen(pathViejo);
            hospital.img = nombreArchivo;
            await hospital.save();
            return true;
        
        break;

        case 'usuarios':

            usuario = await Usuario.findById(id);
            if( !usuario ){
                console.log("no es un usuari por id");
                return false;
            }
            pathViejo= `./uploads/usuarios/${ usuario.img }`;
            borrarImagen(pathViejo);
            usuario.img = nombreArchivo;
            await usuario.save();
            return true;
            
        break;

    }

}



module.exports = {
    actualizarImagen
}