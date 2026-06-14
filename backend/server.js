require("dotenv").config();
const express = require("express");
const cors = require("cors");
const queryRoutes = require("./routes/query.routes");

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/alumnos", require("./routes/alumnos.routes"));
app.use("/api/docentes", require("./routes/docentes.routes"));
app.use("/api/grupos", require("./routes/grupos.routes"));
app.use("/api/materias", require("./routes/materias.routes"));
app.use("/api/avisos", require("./routes/avisos.routes"));
app.use("/api/citas", require("./routes/citas.routes"));
app.use("/api/registros", require("./routes/registros.routes"));
app.use("/api/calificaciones", require("./routes/calificaciones.routes"));
app.use("/api/tutores", require("./routes/tutores.routes"));
app.use("/api/representar", require("./routes/representar.routes"));
app.use("/api/query", queryRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en puerto ${PORT}`);
});