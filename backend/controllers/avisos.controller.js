const db = require("../config/db");

// Obtener todos los avisos
exports.getAvisos = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM Aviso ORDER BY Fecha DESC");
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener avisos" });
    }
};

// Obtener un aviso
exports.getAviso = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await db.query("SELECT * FROM Aviso WHERE Id_Aviso = ?", [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: "Aviso no encontrado" });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener aviso" });
    }
};

// Crear aviso
exports.createAviso = async (req, res) => {
    try {
        const { Titulo, Contenido, Fecha, DocenteId_Docente } = req.body;
        const docente = DocenteId_Docente || 1; // Usar 1 como defecto
        const [result] = await db.query(
            "INSERT INTO Aviso (Titulo, Mensaje, Fecha, Categoria, DocenteId_Docente) VALUES (?, ?, ?, ?, ?)",
            [Titulo, Contenido, Fecha, "General", docente]
        );
        res.status(201).json({ id: result.insertId, message: "Aviso creado exitosamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crear aviso" });
    }
};

// Actualizar aviso
exports.updateAviso = async (req, res) => {
    try {
        const { id } = req.params;
        const { Titulo, Contenido, Fecha } = req.body;
        await db.query(
            "UPDATE Aviso SET Titulo = ?, Mensaje = ?, Fecha = ? WHERE Id_Aviso = ?",
            [Titulo, Contenido, Fecha, id]
        );
        res.json({ message: "Aviso actualizado exitosamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al actualizar aviso" });
    }
};

// Eliminar aviso
exports.deleteAviso = async (req, res) => {
    try {
        const { id } = req.params;
        await db.query("DELETE FROM Aviso WHERE Id_Aviso = ?", [id]);
        res.json({ message: "Aviso eliminado exitosamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al eliminar aviso" });
    }
};
