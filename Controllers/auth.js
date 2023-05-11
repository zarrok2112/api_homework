const express = require('express')
const bcrypt = require('bcryptjs')
const Usuario = require("../model/usuario.js")
const { generarJWT } = require('../helper/jwt.js')

const crearUsuario = async (req, res = express.request) => {
    const { name, email, password } = req.body
    try {
        let ExisteUser = await Usuario.findOne({email:email})

        if(ExisteUser){
            return res.status(400).json({
                ok: false,
                msg: "El usuario ya existe"
            })
        }else{
        const usuario = new Usuario(req.body);
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);
        await usuario.save();

        return res.status(200).json({
            ok: true,
            msg: "Usuario creado correctamente",
            usuario
        })}
    } catch (error) {
        console.log(error)
        return res.status(500).json(
            {
                ok: false,
                msg: "Error inesperado"
            }
        )
    }
    return res.status(200).json(
        {
            ok: true,
            name, email, password
        }
    )
}

const loginUsuario = async(req, res = express.request) => {
    const { email, password } = req.body

    try{
        let usuario = await  Usuario.findOne({email:email})
        if(!usuario){
            return res.status(400).json({
                ok: false,
                msg: "El usuario no existe"
            })
        }

        const passwordValid = bcrypt.compareSync(password, usuario.password)
        if(!passwordValid){
            return res.status(400).json({
                ok: false,
                msg: "El password no es correcto"
            })
        }

    return res.status(200).json(
        {
            ok: true,
            usuario,
        }
    )     

    }catch{
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Error inesperado"
        })
    }
   
}

const revalidarUsuario = (req, res = express.request) => {
   return res.json(
        {
            ok: true
        }
    )
}

module.exports = {
    loginUsuario,
    crearUsuario,
    revalidarUsuario
}