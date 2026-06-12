const express = require("express");
const router = express.Router();

const {
    getTutores,
    getTutor,
    createTutor,
    updateTutor,
    deleteTutor
} = require("../controllers/tutores.controller");

router.get("/", getTutores);
router.get("/:id", getTutor);
router.post("/", createTutor);
router.put("/:id", updateTutor);
router.delete("/:id", deleteTutor);

module.exports = router;
