const db = require("../config/db");

// Obtener todos los grupos
exports.getGrupos = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM Grupo");
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener grupos" });
    }
};

// Obtener un grupo
exports.getGrupo = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await db.query("SELECT * FROM Grupo WHERE Id_Grupo = ?", [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: "Grupo no encontrado" });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener grupo" });
    }
};

// Crear grupo
exports.createGrupo = async (req, res) => {
    try {
        const { Nombre, Grado, DocenteId_Docente } = req.body;
        const docente = DocenteId_Docente || 1;
        const grupo = Nombre || "A";
        const [result] = await db.query(
            "INSERT INTO Grupo (Grado, Grupo, DocenteId_Docente) VALUES (?, ?, ?)",
            [Grado || 1, grupo, docente]
        );
        res.status(201).json({ id: result.insertId, message: "Grupo creado exitosamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crear grupo" });
    }
};

// Actualizar grupo
exports.updateGrupo = async (req, res) => {
    try {
        const { id } = req.params;
        const { Nombre, Grado } = req.body;
        await db.query(
            "UPDATE Grupo SET Grado = ?, Grupo = ? WHERE Id_Grupo = ?",
            [Grado || 1, Nombre || "A", id]
        );
        res.json({ message: "Grupo actualizado exitosamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al actualizar grupo" });
    }
};

// Eliminar grupo
exports.deleteGrupo = async (req, res) => {
    try {
        const { id } = req.params;
        await db.query("DELETE FROM Grupo WHERE Id_Grupo = ?", [id]);
        res.json({ message: "Grupo eliminado exitosamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al eliminar grupo" });
    }
};
