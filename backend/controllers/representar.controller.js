// representar.controller.js
const db = require("../config/db");

// Obtener todas las relaciones
exports.getRepresentar = async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT r.TutorId_Tutor, r.AlumnoId_Alumno,
                   t.Nombre AS NombreTutor,
                   CONCAT(al.Nombre, ' ', al.Apellido_Paterno) AS NombreAlumno
            FROM representar r
            JOIN tutor t ON r.TutorId_Tutor = t.Id_Tutor
            JOIN alumno al ON r.AlumnoId_Alumno = al.Id_Alumno
        `);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener relaciones" });
    }
};

// Obtener relaciones por tutor
exports.getRepresentarPorTutor = async (req, res) => {
    try {
        const { tutorId } = req.params;
        const [rows] = await db.query(`
            SELECT r.TutorId_Tutor, r.AlumnoId_Alumno,
                   t.Nombre AS NombreTutor,
                   CONCAT(al.Nombre, ' ', al.Apellido_Paterno) AS NombreAlumno
            FROM representar r
            JOIN tutor t ON r.TutorId_Tutor = t.Id_Tutor
            JOIN alumno al ON r.AlumnoId_Alumno = al.Id_Alumno
            WHERE r.TutorId_Tutor = ?
        `, [tutorId]);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener relaciones del tutor" });
    }
};

// Obtener relaciones por alumno
exports.getRepresentarPorAlumno = async (req, res) => {
    try {
        const { alumnoId } = req.params;
        const [rows] = await db.query(`
            SELECT r.TutorId_Tutor, r.AlumnoId_Alumno,
                   t.Nombre AS NombreTutor,
                   CONCAT(al.Nombre, ' ', al.Apellido_Paterno) AS NombreAlumno
            FROM representar r
            JOIN tutor t ON r.TutorId_Tutor = t.Id_Tutor
            JOIN alumno al ON r.AlumnoId_Alumno = al.Id_Alumno
            WHERE r.AlumnoId_Alumno = ?
        `, [alumnoId]);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener relaciones del alumno" });
    }
};

// Crear relación
exports.createRepresentar = async (req, res) => {
    try {
        const { TutorId_Tutor, AlumnoId_Alumno } = req.body;

        // Verificar que no exista ya
        const [existe] = await db.query(
            "SELECT * FROM representar WHERE TutorId_Tutor = ? AND AlumnoId_Alumno = ?",
            [TutorId_Tutor, AlumnoId_Alumno]
        );
        if (existe.length > 0) {
            return res.status(400).json({ message: "Esta relación ya existe" });
        }

        await db.query(
            "INSERT INTO representar (TutorId_Tutor, AlumnoId_Alumno) VALUES (?, ?)",
            [TutorId_Tutor, AlumnoId_Alumno]
        );
        res.status(201).json({ message: "Relación creada exitosamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crear relación" });
    }
};

// Modificar relación (elimina la vieja, crea la nueva)
exports.updateRepresentar = async (req, res) => {
    try {
        const { tutorId, alumnoId } = req.params;
        const { NuevoTutorId, NuevoAlumnoId } = req.body;

        // Verificar que la relación original existe
        const [existe] = await db.query(
            "SELECT * FROM representar WHERE TutorId_Tutor = ? AND AlumnoId_Alumno = ?",
            [tutorId, alumnoId]
        );
        if (existe.length === 0) {
            return res.status(404).json({ message: "Relación no encontrada" });
        }

        // Verificar que la nueva relación no exista ya
        const [duplicado] = await db.query(
            "SELECT * FROM representar WHERE TutorId_Tutor = ? AND AlumnoId_Alumno = ?",
            [NuevoTutorId, NuevoAlumnoId]
        );
        if (duplicado.length > 0) {
            return res.status(400).json({ message: "La nueva relación ya existe" });
        }

        // Eliminar la vieja e insertar la nueva
        await db.query(
            "DELETE FROM representar WHERE TutorId_Tutor = ? AND AlumnoId_Alumno = ?",
            [tutorId, alumnoId]
        );
        await db.query(
            "INSERT INTO representar (TutorId_Tutor, AlumnoId_Alumno) VALUES (?, ?)",
            [NuevoTutorId, NuevoAlumnoId]
        );

        res.json({ message: "Relación actualizada exitosamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al actualizar relación" });
    }
};

// Eliminar relación
exports.deleteRepresentar = async (req, res) => {
    try {
        const { tutorId, alumnoId } = req.params;
        const [existe] = await db.query(
            "SELECT * FROM representar WHERE TutorId_Tutor = ? AND AlumnoId_Alumno = ?",
            [tutorId, alumnoId]
        );
        if (existe.length === 0) {
            return res.status(404).json({ message: "Relación no encontrada" });
        }
        await db.query(
            "DELETE FROM representar WHERE TutorId_Tutor = ? AND AlumnoId_Alumno = ?",
            [tutorId, alumnoId]
        );
        res.json({ message: "Relación eliminada exitosamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al eliminar relación" });
    }
};