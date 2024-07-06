const express = require('express');
const { dbConnection } = require('../database/config.js');
const cors = require('cors');

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT || 8080;

        this.userPath = '/api/users';
        this.authPath = '/api/auth';
        this.futbolistaPath = '/api/futbolista';
        

        // conexion DB
        this.connectDB();

        //middlewares
        this.middlewares();

        //rutas
        this.routes();
    }

    async connectDB() {
        await dbConnection();
    }

    middlewares(){
        this.app.use(cors());
        this.app.use(express.static('public'));
        this.app.use(express.json());
    }

    routes(){
        this.app.use(this.userPath, require('../routes/user.route.js'));
        this.app.use(this.authPath, require('../routes/auth.route.js'));
        this.app.use(this.futbolistaPath, require('../routes/futbolista.route.js'));
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`Api Futbol Nodejs-Express ejecutandose en el puerto:  ${this.port}`)
        });
    }

};

module.exports = Server;