const express = require('express');
require('dotenv').config();
var cors = require('cors');

const {dbConnection} = require ('./database/config');

//crear el servidor de express
const app = express();

//Configurar CORS
app.use(cors());

/**En teoria use es un middleware */

/** datos bdd mongo
 * pass:admin1mongo+
 * user: dbalex
 * npm i dotenv (para variables de entorno)
 */

//Base de datos
dbConnection();
//console.log(process.env);


//Rutas
//req => datos del cliente
//res => respuesta del servidor

app.get('/',(req,res) => {
    res.json({
        ok:true,
        msg:'Hola Mundo'
    })
});


app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto '+process.env.PORT);
});

