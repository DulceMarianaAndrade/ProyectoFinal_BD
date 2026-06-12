const db = require("../config/db");

// Obtener todos los registros
exports.getRegistros = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM Registro_Diario ORDER BY Fecha DESC");
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener registros" });
    }
};

// Obtener un registro
exports.getRegistro = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await db.query("SELECT * FROM Registro_Diario WHERE Id_Registro = ?", [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: "Registro no encontrado" });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener registro" });
    }
};

// Crear registro
exports.createRegistro = async (req, res) => {
    try {
        const { Fecha, AlumnoId_Alumno, Asistencia, Comportamiento, Observacion } = req.body;
        const [result] = await db.query(
            "INSERT INTO Registro_Diario (Fecha, AlumnoId_Alumno, Asistencia, Comportamiento, Observacion) VALUES (?, ?, ?, ?, ?)",
            [Fecha, AlumnoId_Alumno, Asistencia || "Presente", Comportamiento || "", Observacion || ""]
        );
        res.status(201).json({ id: result.insertId, message: "Registro creado exitosamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crear registro" });
    }
};

// Actualizar registro
exports.updateRegistro = async (req, res) => {
    try {
        const { id } = req.params;
        const { Fecha, AlumnoId_Alumno, Asistencia, Comportamiento, Observacion } = req.body;
        await db.query(
            "UPDATE Registro_Diario SET Fecha = ?, AlumnoId_Alumno = ?, Asistencia = ?, Comportamiento = ?, Observacion = ? WHERE Id_Registro = ?",
            [Fecha, AlumnoId_Alumno, Asistencia, Comportamiento, Observacion, id]
        );
        res.json({ message: "Registro actualizado exitosamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al actualizar registro" });
    }
};

// Eliminar registro
exports.deleteRegistro = async (req, res) => {
    try {
        const { id } = req.params;
        await db.query("DELETE FROM Registro_Diario WHERE Id_Registro = ?", [id]);
        res.json({ message: "Registro eliminado exitosamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al eliminar registro" });
    }
};

// Registros por alumno
exports.getRegistrosPorAlumno = async (req, res) => {
    try {
        const { alumnoId } = req.params;
        const [rows] = await db.query(
            `
            SELECT *
            FROM Registro_Diario
            WHERE AlumnoId_Alumno = ?
            ORDER BY Fecha DESC
            `,
            [alumnoId]
        );
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error al obtener registros del alumno"
        });
    }
};
