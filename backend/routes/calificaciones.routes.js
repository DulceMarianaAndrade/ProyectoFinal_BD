const express = require("express");
const router = express.Router();

const {
    getCalificaciones,
    getCalificacionesPorAlumno,
    getCalificacion,
    createCalificacion,
    updateCalificacion,
    deleteCalificacion
} = require("../controllers/calificaciones.controller");

router.get("/", getCalificaciones);

router.get(
    "/alumno/:alumnoId",
    getCalificacionesPorAlumno
);

router.get(
    "/:AlumnoId_Alumno/:MateriaId_Materia",
    getCalificacion
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