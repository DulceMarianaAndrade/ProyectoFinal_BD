const express = require("express");
const router = express.Router();

const {
    getCitas,
    getCita,
    createCita,
    updateCita,
    deleteCita
} = require("../controllers/citas.controller");

router.get("/", getCitas);
router.get("/:id", getCita);
router.post("/", createCita);
router.put("/:id", updateCita);
router.delete("/:id", deleteCita);

module.exports = router;
