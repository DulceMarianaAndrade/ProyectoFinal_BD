const db = require("../config/db");

// Obtener todas las materias
exports.getMaterias = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM Materia");
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener materias" });
    }
};

// Obtener una materia
exports.getMateria = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await db.query("SELECT * FROM Materia WHERE Id_Materia = ?", [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: "Materia no encontrada" });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener materia" });
    }
};

// Crear materia
exports.createMateria = async (req, res) => {
    try {
        const { Nombre } = req.body;
        const [result] = await db.query(
            "INSERT INTO Materia (Nombre_Materia) VALUES (?)",
            [Nombre]
        );
        res.status(201).json({ id: result.insertId, message: "Materia creada exitosamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crear materia" });
    }
};

// Actualizar materia
exports.updateMateria = async (req, res) => {
    try {
        const { id } = req.params;
        const { Nombre } = req.body;
        await db.query(
            "UPDATE Materia SET Nombre_Materia = ? WHERE Id_Materia = ?",
            [Nombre, id]
        );
        res.json({ message: "Materia actualizada exitosamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al actualizar materia" });
    }
};

// Eliminar materia
exports.deleteMateria = async (req, res) => {
    try {
        const { id } = req.params;
        await db.query("DELETE FROM Materia WHERE Id_Materia = ?", [id]);
        res.json({ message: "Materia eliminada exitosamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al eliminar materia" });
    }
};
