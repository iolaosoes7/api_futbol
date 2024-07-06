//crea la comunicacion con la base de datos 
// trabaja con el odm  mongoose
// npm install mongoose --save

const mongoose =require('mongoose');

const dbConnection = async () => {

    try {

        await mongoose.connect(process.env.MONGO_CDN);
        
        console.log ('Base de Datos Online.');
    } catch (error) {
        console.log(error);
        throw new Error ('Error a la hora de iniciar la base de datos.');

    }

}

module.exports = {
    dbConnection
}