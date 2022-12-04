/*
    Rutas de usuarios /events
    host + /api/events
*/

const {Router} = require("express");
const router = Router();
const {validateJWT} = require("../middlewares/ValidateJWT")
const {getEventos,crearEvento,eliminarEvento,actualizarEvento} = require("../controllers/events");
const { check } = require("express-validator");
const { fieldsValidate } = require("../middlewares/fieldsValidate");
const { isDate } = require("../helpers/isDate");


// todas tienen que pasar por la validacion del JWT
// cualquier peticion debajo de esto debe tener su token
router.use(validateJWT);

// obtener eventos
router.get("/", getEventos);

// Crear un nuevo evento
router.post(
    "/",
    [
        check("title", "El titulo es obligatorio").not().isEmpty(),
        check("start", "Fecha de inicio es obligatoria").custom(isDate),
        check("end", "Fecha de finalizacion es obligatoria").custom(isDate),
        fieldsValidate
    ],
    crearEvento);

// Actualizar evento
router.put("/:id",
    [
        check("title", "El titulo es obligatorio").not().isEmpty(),
        check("start", "Fecha de inicio es obligatoria").custom(isDate),
        check("end", "Fecha de finalizacion es obligatoria").custom(isDate),
        fieldsValidate
    ],
    actualizarEvento);


// Borrar evento
router.delete("/:id", eliminarEvento);


module.exports = router;