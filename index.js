const express = require('express');
require('dotenv').config();
var cors = require('cors');

const {dbConnection} = require ('./database/config');

//crear el servidor de express
const app = express();

//Configurar CORS
app.use(cors());

//Letura y parseo del body se coloca siempre antes de las rutas
app.use(express.json() )


/**En teoria use es un middleware */

/** datos bdd mongo
 * pass:admin1mongo+
 * user: mean_usuario
 * npm i dotenv (para variables de entorno)
 */

//Base de datos
dbConnection();
//console.log(process.env);

//Directorio publico

app.use(express.static('public'));

//Rutas
app.use( '/api/usuarios', require('./routes/usuario.route') );
/**↑ Esto es un middleware son funciones que se ejecutan antes de llegar a otras */

app.use( '/api/hospitales', require('./routes/hospitales.route') );
app.use( '/api/medicos', require('./routes/medicos.route') );
app.use( '/api/todo', require('./routes/busquedas.route') );
app.use( '/api/login', require('./routes/auth.route') );
app.use( '/api/upload', require('./routes/uploads.route') );

//req => datos del cliente
//res => respuesta del servidor

/* 
 */



app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto '+process.env.PORT);
});




/**
 * NOTA:
 * El JWT consta de 3 partes 
 * Herader
 * Payload
 * Firma
 */