const express = require('express')
const router = express.Router();
const { check } = require("express-validator")
const { validarCampos } = require("../middleware/validar-campos.js")
const { crearUsuario, loginUsuario, revalidarUsuario } = require("../Controllers/auth.js")


router.post('/', loginUsuario);

router.post(
    '/new'
    , [
        check("name", "El nombre es obligatorio").not().isEmpty(),
        check("email", "El email es obligatorio").isEmail(),
        check("password", "El password debe de ser de 8 caracteres").isLength({ min: 8 }),
        validarCampos
    ],
    crearUsuario)

router.get('/renew', revalidarUsuario)

module.exports = router