const db = require("../config/db");

// Obtener todas las citas
exports.getCitas = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM Cita");
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener citas" });
    }
};

// Obtener una cita
exports.getCita = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await db.query("SELECT * FROM Cita WHERE Id_Cita = ?", [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: "Cita no encontrada" });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener cita" });
    }
};

// Crear cita
exports.createCita = async (req, res) => {
    try {
        const { Fecha, Hora, TutorId_Tutor, DocenteId_Docente } = req.body;
        const [result] = await db.query(
            "INSERT INTO Cita (Fecha, Hora, TutorId_Tutor, DocenteId_Docente, Estado) VALUES (?, ?, ?, ?, ?)",
            [Fecha, Hora, TutorId_Tutor || 1, DocenteId_Docente || 1, "No agendada"]
        );
        if (
            Hora < "08:00" ||
            Hora > "13:00"
        ){
            return res.status(400).json({
                message:
                "La hora debe estar entre 08:00 y 13:00"
            });
        }
        res.status(201).json({ id: result.insertId, message: "Cita creada exitosamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crear cita" });
    }
};

// Actualizar cita
exports.updateCita = async (req, res) => {
    try {
        const { id } = req.params;
        const { Fecha, Hora, TutorId_Tutor, DocenteId_Docente, Estado } = req.body;
        await db.query(
            "UPDATE Cita SET Fecha = ?, Hora = ?, TutorId_Tutor = ?, DocenteId_Docente = ?, Estado = ? WHERE Id_Cita = ?",
            [Fecha, Hora, TutorId_Tutor, DocenteId_Docente, Estado || "No agendada", id]
        );
        res.json({ message: "Cita actualizada exitosamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al actualizar cita" });
    }
};

// Eliminar cita
exports.deleteCita = async (req, res) => {
    try {
        const { id } = req.params;
        await db.query("DELETE FROM Cita WHERE Id_Cita = ?", [id]);
        res.json({ message: "Cita eliminada exitosamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al eliminar cita" });
    }
};
