const db = require("../config/db");

// Obtener todos los tutores
exports.getTutores = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM Tutor");
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener tutores" });
    }
};

// Obtener un tutor
exports.getTutor = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await db.query("SELECT * FROM Tutor WHERE Id_Tutor = ?", [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: "Tutor no encontrado" });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener tutor" });
    }
};

// Crear tutor
exports.createTutor = async (req, res) => {
    try {
        const { Nombre, Telefono, Direccion } = req.body;
        const [result] = await db.query(
            "INSERT INTO Tutor (Nombre, Telefono, Direccion) VALUES (?, ?, ?)",
            [Nombre, Telefono || "", Direccion || ""]
        );
        res.status(201).json({ id: result.insertId, message: "Tutor creado exitosamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crear tutor" });
    }
};

// Actualizar tutor
exports.updateTutor = async (req, res) => {
    try {
        const { id } = req.params;
        const { Nombre, Telefono, Direccion } = req.body;
        await db.query(
            "UPDATE Tutor SET Nombre = ?, Telefono = ?, Direccion = ? WHERE Id_Tutor = ?",
            [Nombre, Telefono, Direccion, id]
        );
        res.json({ message: "Tutor actualizado exitosamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al actualizar tutor" });
    }
};

// Eliminar tutor
exports.deleteTutor = async (req, res) => {
    try {
        const { id } = req.params;
        await db.query("DELETE FROM Tutor WHERE Id_Tutor = ?", [id]);
        res.json({ message: "Tutor eliminado exitosamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al eliminar tutor" });
    }
};
