const express = require("express");
const router = express.Router();

const {
    getCalificaciones,
    getCalificacionesPorAlumno,
    createCalificacion,
    updateCalificacion,
    deleteCalificacion
} = require("../controllers/calificaciones.controller");

router.get("/", getCalificaciones);

router.get(
    "/alumno/:alumnoId",
    getCalificacionesPorAlumno
);

router.post("/", createCalificacion);

router.put(
    "/:AlumnoId_Alumno/:MateriaId_Materia",
    updateCalificacion
);

router.delete(
    "/:AlumnoId_Alumno/:MateriaId_Materia",
    deleteCalificacion
);

module.exports = router;