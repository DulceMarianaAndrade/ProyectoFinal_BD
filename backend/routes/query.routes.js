const express = require("express");
const router = express.Router();

const {
    ejecutarConsulta,
    listarConsultasPredefinidas,
    ejecutarConsultaPredefinida
} = require("../controllers/query.controller");

const {
    verificarToken,
    permitirRoles
} = require("../middlewares/auth.middleware");

// =========================================================
// SEGURIDAD DE LAS RUTAS DE CONSULTAS
// ---------------------------------------------------------
// Todas las rutas de este módulo pasan primero por
// "verificarToken", que valida que el usuario haya iniciado
// sesión y que su token (JWT) sea válido y no haya
// expirado.
//
// Después se aplica "permitirRoles('docente')", de manera
// que únicamente los usuarios cuyo tipoUsuario sea
// "docente" pueden ejecutar consultas. Si un alumno (o
// cualquier petición sin token válido) intenta acceder,
// el middleware responde con 401/403 antes de llegar al
// controlador y, por lo tanto, antes de tocar la base de
// datos.
// =========================================================

// Lista de consultas predefinidas (id, título, descripción, tablas y SQL)
router.get(
    "/predefinidas",
    verificarToken,
    permitirRoles("docente"),
    listarConsultasPredefinidas
);

// Ejecuta una consulta predefinida específica por su id
router.get(
    "/predefinida/:id",
    verificarToken,
    permitirRoles("docente"),
    ejecutarConsultaPredefinida
);

// Constructor de consultas dinámico (ya existente)
router.post(
    "/ejecutar",
    verificarToken,
    permitirRoles("docente"),
    ejecutarConsulta
);

module.exports = router;