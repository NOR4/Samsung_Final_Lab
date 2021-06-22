const mongoose = require('mongoose');
require('dotenv').config({path:'variables.env'});

const uri = process.env.DB_MONGO || "localhost:27017";
const conectarDB = async () => {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        } )
        console.log('DB connected');
    } catch (error) {
        console.log(error);
        process.exit(1); //Detener la app
    }
}

module.exports = conectarDB