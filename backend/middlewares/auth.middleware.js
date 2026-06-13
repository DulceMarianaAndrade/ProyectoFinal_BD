const jwt = require("jsonwebtoken");

// =========================================================
// MIDDLEWARE: verificarToken
// ---------------------------------------------------------
// Revisa que la petición incluya un token JWT válido en el
// encabezado "Authorization" con el formato:
//      Authorization: Bearer <token>
//
// Si el token es válido, se decodifica y la información del
// usuario (id y tipoUsuario) se guarda en req.usuario para
// que los controladores puedan usarla.
//
// Si no hay token o es inválido/expirado, se corta la
// petición con un error 401 (No autorizado), evitando que
// llegue a la base de datos.
// =========================================================
const verificarToken = (req, res, next) => {

    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(401).json({
            message: "Acceso denegado. No se proporcionó un token."
        });
    }

    const partes = authHeader.split(" ");

    if (partes.length !== 2 || partes[0] !== "Bearer") {
        return res.status(401).json({
            message: "Formato de token inválido."
        });
    }

    const token = partes[1];

    try {

        const payload = jwt.verify(token, process.env.JWT_SECRET);

        // Guardamos los datos del usuario autenticado para
        // que estén disponibles en el resto de la petición
        req.usuario = {
            id: payload.id,
            tipoUsuario: payload.tipoUsuario
        };

        next();

    } catch (error) {

        return res.status(401).json({
            message: "Token inválido o expirado."
        });

    }

};

// =========================================================
// MIDDLEWARE: permitirRoles
// ---------------------------------------------------------
// Middleware "configurable": recibe la lista de roles que
// pueden acceder a la ruta (ej. "docente") y devuelve un
// middleware que verifica que req.usuario.tipoUsuario esté
// dentro de esa lista.
//
// Debe usarse SIEMPRE después de verificarToken, ya que
// depende de que req.usuario ya exista.
//
// Ejemplo de uso:
//   router.post("/ejecutar", verificarToken, permitirRoles("docente"), ejecutarConsulta);
// =========================================================
const permitirRoles = (...rolesPermitidos) => {

    return (req, res, next) => {

        if (!req.usuario) {
            return res.status(401).json({
                message: "No se ha verificado la identidad del usuario."
            });
        }

        if (!rolesPermitidos.includes(req.usuario.tipoUsuario)) {
            return res.status(403).json({
                message: "No tienes permisos para acceder a este recurso."
            });
        }

        next();

    };

};

module.exports = {
    verificarToken,
    permitirRoles
};