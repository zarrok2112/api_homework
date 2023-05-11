const express = require('express')
require('dotenv').config()
const {dbConnection} = require("./database/config.js")

//crear express
const app = express();

//base de datos
dbConnection();

app.use(express.json())

app.use(
    express.static('public')
)

app.use("/api/auth", require("./routes/auth"))

//rutas
app.get('/', (req,res) =>
    res.json({
        personaje:{
            nombre: "jianzhu",
            control: "tierra",
            epocaDeInicio:"Era kuruk",
            epocaDeMuerte:"Era Kyoshi "
        }
    })
)


//escuchar
app.listen(process.env.PORT, () =>{
    console.log("servidor corriendo en el puerto: ", process.env.PORT)
}
)