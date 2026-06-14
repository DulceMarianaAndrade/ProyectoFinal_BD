// representar.routes.js
const express = require("express");
const router = express.Router();
const {
    getRepresentar,
    getRepresentarPorTutor,
    getRepresentarPorAlumno,
    createRepresentar,
    updateRepresentar,
    deleteRepresentar
} = require("../controllers/representar.controller");

router.get("/", getRepresentar);
router.get("/tutor/:tutorId", getRepresentarPorTutor);
router.get("/alumno/:alumnoId", getRepresentarPorAlumno);
router.post("/", createRepresentar);
router.put("/:tutorId/:alumnoId", updateRepresentar);
router.delete("/:tutorId/:alumnoId", deleteRepresentar);

module.exports = router;