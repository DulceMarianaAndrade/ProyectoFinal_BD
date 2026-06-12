const express = require("express");
const router = express.Router();

const {
    getRegistros,
    getRegistro,
    getRegistrosPorAlumno,
    createRegistro,
    updateRegistro,
    deleteRegistro
} = require("../controllers/registros.controller");

router.get("/alumno/:alumnoId", getRegistrosPorAlumno);
router.get("/", getRegistros);
router.get("/:id", getRegistro);
router.post("/", createRegistro);
router.put("/:id", updateRegistro);
router.delete("/:id", deleteRegistro);

module.exports = router;
