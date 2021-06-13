const express = require('express');
const conectarDB = require('./config/dbs');
const cors = require("cors");

//Crear server
const app = express();

//Conectar a la DB
conectarDB();
app.use(cors());

app.use(express.json());
app.use('/api/usuarios', require('./routes/usuario'));


app.listen(4000, ()=> {
    console.log('Escuchando en puerto 4000');
})