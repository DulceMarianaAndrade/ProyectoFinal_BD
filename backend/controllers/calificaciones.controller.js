const db = require("../config/db");

// Obtener todas las calificaciones
exports.getCalificaciones = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM Cursar");
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener calificaciones" });
    }
};

// Obtener calificaciones de un alumno
exports.getCalificacionesPorAlumno = async (req, res) => {
    try {
        const { alumnoId } = req.params;
        const [rows] = await db.query(
            "SELECT c.*, m.Nombre_Materia FROM Cursar c JOIN Materia m ON c.MateriaId_Materia = m.Id_Materia WHERE c.AlumnoId_Alumno = ?",
            [alumnoId]
        );
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener calificaciones del alumno" });
    }
};

// Crear o actualizar calificación
exports.createCalificacion = async (req, res) => {
    try {
        const { AlumnoId_Alumno, MateriaId_Materia, Calificacion } = req.body;
        
        // Verificar si ya existe
        const [existing] = await db.query(
            "SELECT * FROM Cursar WHERE AlumnoId_Alumno = ? AND MateriaId_Materia = ?",
            [AlumnoId_Alumno, MateriaId_Materia]
        );
        if(
            Calificacion < 0 ||
            Calificacion > 10
        ){
            return res.status(400).json({
                message:
                "La calificación debe estar entre 0 y 10"
            });
        }
        
        if (existing.length > 0) {
            // Actualizar
            await db.query(
                "UPDATE Cursar SET Calificacion = ? WHERE AlumnoId_Alumno = ? AND MateriaId_Materia = ?",
                [Calificacion, AlumnoId_Alumno, MateriaId_Materia]
            );
            res.json({ message: "Calificación actualizada exitosamente" });
        } else {
            // Crear
            await db.query(
                "INSERT INTO Cursar (AlumnoId_Alumno, MateriaId_Materia, Calificacion) VALUES (?, ?, ?)",
                [AlumnoId_Alumno, MateriaId_Materia, Calificacion]
            );
            res.status(201).json({ message: "Calificación creada exitosamente" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al guardar calificación" });
    }
};

// Actualizar calificación
exports.updateCalificacion = async (req, res) => {
    try {
        const { AlumnoId_Alumno, MateriaId_Materia } = req.params;
        const { Calificacion } = req.body;
        await db.query(
            "UPDATE Cursar SET Calificacion = ? WHERE AlumnoId_Alumno = ? AND MateriaId_Materia = ?",
            [Calificacion, AlumnoId_Alumno, MateriaId_Materia]
        );
        res.json({ message: "Calificación actualizada exitosamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al actualizar calificación" });
    }
};

// Eliminar calificación
exports.deleteCalificacion = async (req, res) => {
    try {
        const { AlumnoId_Alumno, MateriaId_Materia } = req.params;
        await db.query(
            "DELETE FROM Cursar WHERE AlumnoId_Alumno = ? AND MateriaId_Materia = ?",
            [AlumnoId_Alumno, MateriaId_Materia]
        );
        res.json({ message: "Calificación eliminada exitosamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al eliminar calificación" });
    }
};
