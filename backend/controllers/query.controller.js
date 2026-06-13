const db = require("../config/db");

const TABLAS_PERMITIDAS = [
    "Alumno", "Docente", "Tutor", "Grupo",
    "Materia", "Cursar", "Aviso", "Cita", "Registro"
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