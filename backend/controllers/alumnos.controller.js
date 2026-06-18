const db = require("../config/db");

// Obtener todos los alumnos
exports.getAlumnos = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM Alumno");
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener alumnos" });
    }
};

// Obtener un alumno
exports.getAlumno = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await db.query("SELECT * FROM Alumno WHERE Id_Alumno = ?", [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: "Alumno no encontrado" });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener alumno" });
    }
};

// Crear alumno
exports.createAlumno = async (req, res) => {
    try {
        const { Nombre, Apellido_Paterno, Apellido_Materno, GrupoId_Grupo, Fecha_nacimiento } = req.body;
        if(
            !Nombre ||
            !Apellido_Paterno ||
            !Apellido_Materno ||
            !Fecha_nacimiento
        ){
            return res.status(400).json({
                message:
                "Todos los campos son obligatorios"
            });
        }
        const [result] = await db.query(
            "INSERT INTO Alumno (Nombre, Apellido_Paterno, Apellido_Materno, GrupoId_Grupo, Fecha_nacimiento) VALUES (?, ?, ?, ?, ?)",
            [Nombre, Apellido_Paterno, Apellido_Materno, GrupoId_Grupo || 1, Fecha_nacimiento || "2010-01-01"]
        );
        res.status(201).json({ id: result.insertId, message: "Alumno creado exitosamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crear alumno" });
    }
};

// Actualizar alumno
exports.updateAlumno = async (req, res) => {
    try {
        const { id } = req.params;
        const { Nombre, Apellido_Paterno, Apellido_Materno, GrupoId_Grupo, Fecha_nacimiento } = req.body;
        
        if (!Nombre || !Apellido_Paterno || !Apellido_Materno || !Fecha_nacimiento) {
            return res.status(400).json({ message: "Nombre, apellidos y fecha de nacimiento son obligatorios" });
        }

        await db.query(
            "UPDATE Alumno SET Nombre = ?, Apellido_Paterno = ?, Apellido_Materno = ?, GrupoId_Grupo = ?, Fecha_nacimiento = ? WHERE Id_Alumno = ?",
            [Nombre, Apellido_Paterno, Apellido_Materno, GrupoId_Grupo, Fecha_nacimiento, id]
        );
        res.json({ message: "Alumno actualizado exitosamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al actualizar alumno" });
    }
};

// Eliminar alumno
exports.deleteAlumno = async (req, res) => {
    try {
        const { id } = req.params;
        await db.query("DELETE FROM Alumno WHERE Id_Alumno = ?", [id]);
        res.json({ message: "Alumno eliminado exitosamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al eliminar alumno" });
    }
};
