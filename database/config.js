const mongoose = require('mongoose');



const dbConnection = async()=>{

    try {
        //await mongoose.connect('mongodb+srv://mean_user:admin1mongo+@cluster0.eiypl.mongodb.net/hospitaldb', {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('DB Online');
    } catch (error) {
        console.log(error);
        throw new  Error('Error a la hora de inciar BDD ver logs');
    }

}


module.exports = {
    dbConnection
}