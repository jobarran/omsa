const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors');
require('dotenv').config();


//* Crear el servidor de express
const app = express();

//*Base de datos
dbConnection();

//* Cors
app.use(cors())

//* Directorio publico
app.use( express.static('public') );

//* Lectura y parseo del body (middelware)
app.use( express.json() );

//* Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/obras', require('./routes/obras'));
app.use('/api/om', require('./routes/om'));
app.use('/api/remitos', require('./routes/remitos'))

app.get('*', (req, res) => {
    res.sendFile( __dirname + '/public/index.html');
});


//* Escuchar peticiones
app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
})

