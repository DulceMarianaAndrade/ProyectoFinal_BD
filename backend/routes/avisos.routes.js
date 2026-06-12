const express = require("express");
const router = express.Router();

const {
    getAvisos,
    getAviso,
    createAviso,
    updateAviso,
    deleteAviso
} = require("../controllers/avisos.controller");

router.get("/", getAvisos);
router.get("/:id", getAviso);
router.post("/", createAviso);
router.put("/:id", updateAviso);
router.delete("/:id", deleteAviso);

module.exports = router;
