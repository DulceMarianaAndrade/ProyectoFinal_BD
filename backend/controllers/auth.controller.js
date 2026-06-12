const db = require("../config/db");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {

    try {

        const {
            tipoUsuario,
            usuario,
            password
        } = req.body;

        if (
            !tipoUsuario ||
            !usuario ||
            !password
        ) {
            return res.status(400).json({
                message: "Todos los campos son obligatorios"
            });
        }

        let query;
        let values;

        if (tipoUsuario === "docente") {

            query = `
                SELECT *
                FROM Docente
                WHERE Id_Docente = ?
                AND Contrasena = ?
            `;

            values = [usuario, password];

        } else if (tipoUsuario === "alumno") {

            query = `
                SELECT *
                FROM Alumno
                WHERE Id_Alumno = ?
                AND DATE_FORMAT(Fecha_nacimiento,'%Y-%m-%d') = ?
            `;

            values = [usuario, password];

        } else {

            return res.status(400).json({
                message: "Tipo de usuario inválido"
            });

        }

        const [rows] = await db.query(
            query,
            values
        );

        if (rows.length === 0) {

            return res.status(401).json({
                message: "Usuario o contraseña incorrectos"
            });

        }

        const usuarioEncontrado = rows[0];

        const token = jwt.sign(
            {
                id:
                    tipoUsuario === "docente"
                        ? usuarioEncontrado.Id_Docente
                        : usuarioEncontrado.Id_Alumno,

                tipoUsuario
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "8h"
            }
        );

        delete usuarioEncontrado.Contrasena;
        
        res.json({
            success: true,
            token,
            usuario: usuarioEncontrado
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Error interno del servidor"
        });

    }

};