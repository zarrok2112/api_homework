const express = require('express')
require('dontv').config()
const {dbConnetion} = require('../database/config')
const cors = require('cors')

class Server {
    constructor(){
        // crear express app
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            task: '/api/auth'
        }

        this.connectToDB();
        this.addMiddlewares();
        this.setRoutes();
    }

    //base de datos
    async connectToDB(){
        await dbConnetion();
    }

    addMiddlewares(){
        this.app.use (cors());

        this.app.use(express.json());

        this.app.use(express.static('public'))
    }

    setRoutes(){
        // aqui van las rutas
    }

    sockets(){
        //
    }

    listen(){
        
    }
}