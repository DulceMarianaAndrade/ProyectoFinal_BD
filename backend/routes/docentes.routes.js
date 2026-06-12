const express = require("express");
const router = express.Router();

const {
    getDocentes,
    getDocente,
    createDocente,
    updateDocente,
    deleteDocente
} = require("../controllers/docentes.controller");

router.get("/", getDocentes);
router.get("/:id", getDocente);
router.post("/", createDocente);
router.put("/:id", updateDocente);
router.delete("/:id", deleteDocente);

module.exports = router;
