const db = require("../config/db");

// Obtener todos los docentes
exports.getDocentes = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM Docente");
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener docentes" });
    }
};

// Obtener un docente
exports.getDocente = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await db.query("SELECT * FROM Docente WHERE Id_Docente = ?", [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: "Docente no encontrado" });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener docente" });
    }
};

// Crear docente
exports.createDocente = async (req, res) => {
    try {
        const { Nombre, Apellido_Paterno, Apellido_Materno, Contrasena } = req.body;
        const [result] = await db.query(
            "INSERT INTO Docente (Nombre, Apellido_Paterno, Apellido_Materno, Contrasena) VALUES (?, ?, ?, ?)",
            [Nombre, Apellido_Paterno, Apellido_Materno, Contrasena]
        );
        res.status(201).json({ id: result.insertId, message: "Docente creado exitosamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crear docente" });
    }
};

// Actualizar docente
exports.updateDocente = async (req, res) => {
    try {
        const { id } = req.params;
        const { Nombre, Apellido_Paterno, Apellido_Materno, Contrasena } = req.body;
        await db.query(
            "UPDATE Docente SET Nombre = ?, Apellido_Paterno = ?, Apellido_Materno = ?, Contrasena = ? WHERE Id_Docente = ?",
            [Nombre, Apellido_Paterno, Apellido_Materno, Contrasena, id]
        );
        res.json({ message: "Docente actualizado exitosamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al actualizar docente" });
    }
};

// Eliminar docente
exports.deleteDocente = async (req, res) => {
    try {
        const { id } = req.params;
        await db.query("DELETE FROM Docente WHERE Id_Docente = ?", [id]);
        res.json({ message: "Docente eliminado exitosamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al eliminar docente" });
    }
};
