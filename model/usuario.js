const {Schema,model} = require('mongoose');

const UsuarioSchema = Schema({
    name:{
        type:String,
        required:[true,"El nombre es obligatorio"]
    },
    email:{
        type:String,
        required:[true,"El email es obligatorio"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"El password es obligatorio"]
    }
})

module.exports = model("Usuario",UsuarioSchema)