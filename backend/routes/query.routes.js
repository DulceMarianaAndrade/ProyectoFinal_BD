const express = require("express");
const router = express.Router();
const { ejecutarConsulta } = require("../controllers/query.controller");

router.post("/ejecutar", ejecutarConsulta);

module.exports = router;