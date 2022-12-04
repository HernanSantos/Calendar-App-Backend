/*
    Rutas de usuarios / Auth
    host + /api/auth
*/

const {Router} = require("express");
const {check} = require("express-validator")
const router = Router();
const {crearUsuario,loginUsuario,revalidarToken} = require("../controllers/auth");
const { fieldsValidate } = require("../middlewares/fieldsValidate");
const { validateJWT } = require("../middlewares/ValidateJWT");

router.post(
    "/new",
    [
        check("name", "El nombre es obligatorio").not().isEmpty(),
        check("email", "El email es obligatorio").isEmail(),
        check("password", "El password debe de ser de 6 caracteres").isLength({min:6}),
        fieldsValidate
    ],
    crearUsuario);

router.post(
    "/",
    [
        check("email", "El email es obligatorio").isEmail(), 
        check("password", "El password debe de ser de 6 caracteres").isLength({min:6}),
        fieldsValidate
    ],
    loginUsuario);

router.get("/renew", validateJWT, revalidarToken);


module.exports = router;