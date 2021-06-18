const {Schema,model} = require ('mongoose');
const hospital = require('./hospital');

const MedicoSchema=Schema({
    nombre:{
        type:String,
        required:true,
        unique:false
    },
    img:{
        type:String,
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref:'Usuario',
        required:true,

    },
    hospital:{
        type: Schema.Types.ObjectId,
        ref:'Hospital',
        required:true,
    },
 
});

//Simepre va a estar el usuario por que siempre se va a querer saber quien creo el registro

//configuracion para cambiar el nombre del _id
MedicoSchema.method('toJSON', function(){
    const{__v, ...object} = this.toObject();
    return object;
})


module.exports= model ('Medico' , MedicoSchema);
