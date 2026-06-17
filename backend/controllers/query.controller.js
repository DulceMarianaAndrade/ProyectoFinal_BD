const db = require("../config/db");

// =========================================================
// CONSULTAS ESTÁTICAS PREDEFINIDAS
// ---------------------------------------------------------
// Cada consulta corresponde a una de las solicitadas en la
// Entrega 3 del proyecto (apartado "3. Realizar en SQL").
// Se guarda el texto SQL exacto, las tablas que utiliza,
// una breve descripción de lo que hace, para que el
// frontend pueda mostrar todo antes de ejecutar.
// =========================================================
const CONSULTAS_PREDEFINIDAS = {

    // ---------------- a. CONSULTAS SENCILLAS ----------------
    sencilla1: {
        titulo: "Nombre y apellidos de todos los alumnos",
        descripcion: "Selecciona el nombre y apellidos de la tabla Alumno, sin ningún filtro, mostrando a todos los alumnos registrados.",
        tablas: ["Alumno"],
        sql: `SELECT Nombre, Apellido_Paterno, Apellido_Materno
FROM Alumno;`
    },

    sencilla2: {
        titulo: "Avisos de la categoría 'Evento'",
        descripcion: "Selecciona Titulo, Mensaje y Fecha de la tabla Aviso, filtrando con WHERE únicamente los avisos cuya categoría sea 'Evento'.",
        tablas: ["Aviso"],
        sql: `SELECT Titulo, Mensaje, Fecha
FROM Aviso
WHERE Categoria = 'Evento';`
    },

    sencilla3: {
        titulo: "Alumnos nacidos después del año 2011",
        descripcion: "Selecciona Nombre, Apellido_Paterno y Fecha_nacimiento de la tabla Alumno, filtrando con WHERE las fechas de nacimiento posteriores al 31/12/2011.",
        tablas: ["Alumno"],
        sql: `SELECT Nombre, Apellido_Paterno, Fecha_nacimiento
FROM Alumno
WHERE Fecha_nacimiento > '2011-12-31';`
    },

    sencilla4: {
        titulo: "Citas con estado 'Agendada'",
        descripcion: "Selecciona Id_Cita, Fecha, Hora y Estado de la tabla Cita, filtrando con WHERE solo las citas cuyo estado sea 'Agendada'.",
        tablas: ["Cita"],
        sql: `SELECT Id_Cita, Fecha, Hora, Estado
FROM Cita
WHERE Estado = 'Agendada';`
    },

    sencilla5: {
        titulo: "Alumnos con calificación mayor a 8 en alguna materia",
        descripcion: "Selecciona AlumnoId_Alumno, MateriaId_Materia y Calificacion de la tabla Cursar, filtrando con WHERE solo las calificaciones mayores a 8.",
        tablas: ["Cursar"],
        sql: `SELECT AlumnoId_Alumno, MateriaId_Materia, Calificacion
FROM Cursar
WHERE Calificacion > 8;`
    },

    // ---------------- b. CONSULTAS CON CAMPOS AGRUPADOS ----------------
    agrupada1: {
        titulo: "Total de alumnos por grupo",
        descripcion: "Cuenta con COUNT() los alumnos de cada grupo. Usa LEFT JOIN entre Grupo y Alumno para incluir también grupos sin alumnos, y agrupa con GROUP BY.",
        tablas: ["Grupo", "Alumno"],
        sql: `SELECT g.Grado, g.Grupo, COUNT(a.Id_Alumno) AS Total_Alumnos
FROM Grupo g
LEFT JOIN Alumno a ON a.GrupoId_Grupo = g.Id_Grupo
GROUP BY g.Id_Grupo, g.Grado, g.Grupo;`
    },

    agrupada2: {
        titulo: "Promedio de calificación por materia",
        descripcion: "Calcula con AVG() y ROUND() el promedio de calificaciones de Cursar, relacionando con Materia mediante JOIN y agrupando con GROUP BY por materia.",
        tablas: ["Cursar", "Materia"],
        sql: `SELECT m.Nombre_Materia, ROUND(AVG(c.Calificacion), 2) AS Promedio
FROM Cursar c
JOIN Materia m ON m.Id_Materia = c.MateriaId_Materia
GROUP BY c.MateriaId_Materia, m.Nombre_Materia;`
    },

    agrupada3: {
        titulo: "Número de avisos publicados por cada docente",
        descripcion: "Cuenta con COUNT() los avisos de cada docente usando LEFT JOIN entre Docente y Aviso, para incluir también a los docentes sin avisos, agrupando con GROUP BY.",
        tablas: ["Docente", "Aviso"],
        sql: `SELECT d.Nombre, d.Apellido_Paterno, COUNT(av.Id_Aviso) AS Total_Avisos
FROM Docente d
LEFT JOIN Aviso av ON av.DocenteId_Docente = d.Id_Docente
GROUP BY d.Id_Docente, d.Nombre, d.Apellido_Paterno;`
    },

    agrupada4: {
        titulo: "Conteo de registros diarios por tipo de asistencia",
        descripcion: "Cuenta con COUNT(*) todos los registros de Registro_Diario, agrupando con GROUP BY según el valor del campo Asistencia.",
        tablas: ["Registro_Diario"],
        sql: `SELECT Asistencia, COUNT(*) AS Total
FROM Registro_Diario
GROUP BY Asistencia;`
    },

    agrupada5: {
        titulo: "Número de citas por tutor",
        descripcion: "Cuenta con COUNT() las citas de cada tutor usando LEFT JOIN entre Tutor y Cita, para incluir también tutores sin citas, agrupando con GROUP BY.",
        tablas: ["Tutor", "Cita"],
        sql: `SELECT t.Nombre, COUNT(c.Id_Cita) AS Total_Citas
FROM Tutor t
LEFT JOIN Cita c ON c.TutorId_Tutor = t.Id_Tutor
GROUP BY t.Id_Tutor, t.Nombre;`
    },

    // ---------------- c. CONSULTAS CON HAVING ----------------
    having1: {
        titulo: "Materias con promedio de calificación menor a 8",
        descripcion: "Calcula el promedio por materia con AVG() y JOIN entre Cursar y Materia, agrupando con GROUP BY y filtrando con HAVING solo los promedios menores a 8.",
        tablas: ["Cursar", "Materia"],
        sql: `SELECT m.Nombre_Materia, ROUND(AVG(c.Calificacion), 2) AS Promedio
FROM Cursar c
JOIN Materia m ON m.Id_Materia = c.MateriaId_Materia
GROUP BY c.MateriaId_Materia, m.Nombre_Materia
HAVING Promedio < 8;`
    },

    having2: {
        titulo: "Docentes que han publicado más de 1 aviso",
        descripcion: "Relaciona Docente y Aviso con JOIN, cuenta los avisos con COUNT(), agrupa con GROUP BY y filtra con HAVING los docentes con más de 1 aviso.",
        tablas: ["Docente", "Aviso"],
        sql: `SELECT d.Nombre, d.Apellido_Paterno, COUNT(av.Id_Aviso) AS Total_Avisos
FROM Docente d
JOIN Aviso av ON av.DocenteId_Docente = d.Id_Docente
GROUP BY d.Id_Docente, d.Nombre, d.Apellido_Paterno
HAVING Total_Avisos > 1;`
    },

    having3: {
        titulo: "Grupos que tienen 1 alumno registrado",
        descripcion: "Relaciona Grupo y Alumno con JOIN, cuenta alumnos con COUNT(), agrupa con GROUP BY y filtra con HAVING los grupos con exactamente 1 alumno.",
        tablas: ["Grupo", "Alumno"],
        sql: `SELECT g.Grado, g.Grupo, COUNT(a.Id_Alumno) AS Total_Alumnos
FROM Grupo g
JOIN Alumno a ON a.GrupoId_Grupo = g.Id_Grupo
GROUP BY g.Id_Grupo, g.Grado, g.Grupo
HAVING Total_Alumnos = 1;`
    },

    having4: {
        titulo: "Alumnos cuya calificación máxima sea mayor a 8",
        descripcion: "Relaciona Alumno y Cursar con JOIN, obtiene la calificación más alta con MAX(), agrupa con GROUP BY y filtra con HAVING las calificaciones máximas mayores a 8.",
        tablas: ["Alumno", "Cursar"],
        sql: `SELECT al.Nombre, al.Apellido_Paterno, MAX(c.Calificacion) AS Calificacion_Max
FROM Alumno al
JOIN Cursar c ON c.AlumnoId_Alumno = al.Id_Alumno
GROUP BY al.Id_Alumno, al.Nombre, al.Apellido_Paterno
HAVING Calificacion_Max > 8;`
    },

    having5: {
        titulo: "Tutores que representan a más de 1 alumno",
        descripcion: "Relaciona Tutor y Representar con JOIN, cuenta alumnos representados con COUNT(), agrupa con GROUP BY y filtra con HAVING los tutores con más de 1 alumno.",
        tablas: ["Tutor", "Representar"],
        sql: `SELECT t.Nombre, COUNT(r.AlumnoId_Alumno) AS Alumnos_Representados
FROM Tutor t
JOIN Representar r ON r.TutorId_Tutor = t.Id_Tutor
GROUP BY t.Id_Tutor, t.Nombre
HAVING Alumnos_Representados > 1;`
    },

    // ---------------- d. CONSULTAS MULTITABLA ----------------
    multitabla1: {
        titulo: "Nombre del alumno, materia que cursa y calificación",
        descripcion: "Relaciona Alumno, Cursar y Materia mediante JOIN para mostrar en un solo resultado al alumno, la materia y su calificación, ordenando con ORDER BY por nombre.",
        tablas: ["Alumno", "Cursar", "Materia"],
        sql: `SELECT al.Nombre, al.Apellido_Paterno, m.Nombre_Materia, c.Calificacion
FROM Alumno al
JOIN Cursar c ON c.AlumnoId_Alumno = al.Id_Alumno
JOIN Materia m ON m.Id_Materia = c.MateriaId_Materia
ORDER BY al.Nombre;`
    },

    multitabla2: {
        titulo: "Nombre del alumno, su grupo y el docente que lo imparte",
        descripcion: "Relaciona Alumno, Grupo y Docente mediante JOIN para mostrar el alumno, el grado/grupo al que pertenece y el docente responsable de ese grupo.",
        tablas: ["Alumno", "Grupo", "Docente"],
        sql: `SELECT al.Nombre, al.Apellido_Paterno, g.Grado, g.Grupo,
       d.Nombre AS Docente, d.Apellido_Paterno AS Ap_Docente
FROM Alumno al
JOIN Grupo g ON g.Id_Grupo = al.GrupoId_Grupo
JOIN Docente d ON d.Id_Docente = g.DocenteId_Docente;`
    },

    multitabla3: {
        titulo: "Docente responsable de cada aviso publicado",
        descripcion: "Relaciona Aviso y Docente mediante JOIN usando el Id_Docente, mostrando el nombre del docente junto con el título, fecha y categoría del aviso.",
        tablas: ["Aviso", "Docente"],
        sql: `SELECT d.Nombre, d.Apellido_Paterno, av.Titulo, av.Fecha, av.Categoria
FROM Aviso av
JOIN Docente d ON d.Id_Docente = av.DocenteId_Docente;`
    },

    multitabla4: {
        titulo: "Detalle de cada cita con nombre del docente y del tutor",
        descripcion: "Relaciona Cita, Docente y Tutor mediante JOIN para mostrar fecha, hora y estado de cada cita junto con los nombres del docente y del tutor.",
        tablas: ["Cita", "Docente", "Tutor"],
        sql: `SELECT c.Fecha, c.Hora, c.Estado,
       d.Nombre AS Docente,
       t.Nombre AS Tutor
FROM Cita c
JOIN Docente d ON d.Id_Docente = c.DocenteId_Docente
JOIN Tutor t ON t.Id_Tutor = c.TutorId_Tutor;`
    },

    multitabla5: {
        titulo: "Tutor, alumno que representa y sus registros diarios",
        descripcion: "Relaciona Tutor, Representar, Alumno y Registro_Diario mediante JOIN para mostrar el tutor, el alumno representado y la asistencia/observación de sus registros diarios.",
        tablas: ["Tutor", "Representar", "Alumno", "Registro_Diario"],
        sql: `SELECT t.Nombre AS Tutor, al.Nombre AS Alumno,
       rd.Fecha, rd.Asistencia, rd.Observacion
FROM Tutor t
JOIN Representar r ON r.TutorId_Tutor = t.Id_Tutor
JOIN Alumno al ON al.Id_Alumno = r.AlumnoId_Alumno
JOIN Registro_Diario rd ON rd.AlumnoId_Alumno = al.Id_Alumno;`
    }

};

// =========================================================
// GET /api/query/predefinidas
// ---------------------------------------------------------
// Devuelve la lista de consultas predefinidas (id, título,
// descripción, tablas y SQL) para que el frontend pueda
// dibujar el apartado de "Consultas".
// =========================================================
exports.listarConsultasPredefinidas = (req, res) => {

    const lista = Object.entries(CONSULTAS_PREDEFINIDAS).map(([id, datos]) => ({
        id,
        titulo: datos.titulo,
        descripcion: datos.descripcion,
        tablas: datos.tablas,
        sql: datos.sql
    }));

    res.json(lista);

};

// =========================================================
// GET /api/query/predefinida/:id
// ---------------------------------------------------------
// Ejecuta la consulta predefinida indicada por el parámetro
// :id (ej. "sencilla1", "having2", "multitabla5"...) y
// devuelve el SQL, descripción, tablas y resultado obtenido
// de la base de datos.
//
// Como las consultas son fijas (no se construyen con datos
// del usuario), no existe riesgo de inyección SQL: el texto
// que se ejecuta es siempre uno de los definidos arriba.
// =========================================================
exports.ejecutarConsultaPredefinida = async (req, res) => {

    try {

        const { id } = req.params;
        const consulta = CONSULTAS_PREDEFINIDAS[id];

        if (!consulta) {
            return res.status(404).json({
                message: `No existe una consulta predefinida con el id '${id}'`
            });
        }

        const [rows] = await db.query(consulta.sql);

        res.json({
            id,
            titulo: consulta.titulo,
            descripcion: consulta.descripcion,
            tablas: consulta.tablas,
            sql: consulta.sql,
            resultados: rows,
            total: rows.length
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Error al ejecutar la consulta",
            detalle: error.message
        });

    }

};

const TABLAS_PERMITIDAS = [
    "Alumno", "Docente", "Tutor", "Grupo",
    "Materia", "Cursar", "Aviso", "Cita",
    "Registro_Diario", "Representar"
];

exports.ejecutarConsulta = async (req, res) => {
    try {
        const { tablas, columnas, joins, condiciones, groupBy, having, orderBy, limite } = req.body;

        for (const tabla of tablas) {
            if (!TABLAS_PERMITIDAS.includes(tabla.nombre)) {
                return res.status(400).json({ message: `Tabla no permitida: ${tabla.nombre}` });
            }
        }

        const cols = (columnas && columnas.length > 0)
            ? columnas.join(", ")
            : tablas.map(t => `${t.alias || t.nombre}.*`).join(", ");

        const tablaBase = tablas[0];
        let from = `${tablaBase.nombre} ${tablaBase.alias || ""}`.trim();

        let joinSQL = "";
        if (joins && joins.length > 0) {
            joinSQL = joins.map(j =>
                `${j.tipo} JOIN ${j.tabla} ${j.alias || ""} ON ${j.condicion}`
            ).join(" ");
        }

        let whereSQL = "";
        const valores = [];
        if (condiciones && condiciones.length > 0) {
            const partes = condiciones.map((c, i) => {
                valores.push(c.valor);
                const logico = i === 0 ? "" : ` ${c.logico || "AND"} `;
                return `${logico}${c.columna} ${c.operador} ?`;
            });
            whereSQL = "WHERE " + partes.join("");
        }

        const groupSQL = groupBy && groupBy.length > 0
            ? "GROUP BY " + groupBy.join(", ")
            : "";

        const havingSQL = having && having.trim() !== ""
            ? "HAVING " + having
            : "";

        const orderSQL = orderBy && orderBy.length > 0
            ? "ORDER BY " + orderBy.map(o => `${o.columna} ${o.direccion || "ASC"}`).join(", ")
            : "";

        const limitSQL = `LIMIT ${parseInt(limite) || 50}`;

        const sql = [
            `SELECT ${cols}`,
            `FROM ${from}`,
            joinSQL,
            whereSQL,
            groupSQL,
            havingSQL,
            orderSQL,
            limitSQL
        ].filter(Boolean).join(" ");

        const [rows] = await db.query(sql, valores);
        res.json({ sql, resultados: rows, total: rows.length });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al ejecutar consulta", detalle: error.message });
    }
};