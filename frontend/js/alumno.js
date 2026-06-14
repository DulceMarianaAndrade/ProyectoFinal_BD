// =========================
// VERIFICAR SESIÓN
// =========================

const usuario =
    JSON.parse(localStorage.getItem("usuario"));

const token =
    localStorage.getItem("token");

if (!usuario || !token) {

    window.location.href =
        "login.html";

}

// =========================
// MOSTRAR NOMBRE
// =========================

const nombreAlumno =
    document.getElementById("nombreAlumno");

if (nombreAlumno && usuario) {

    nombreAlumno.textContent =
        `${usuario.Nombre} ${usuario.Apellido_Paterno}`;

}

// =========================
// CAMBIO DE VISTAS
// =========================

const menuItems =
    document.querySelectorAll(".menu-item");

const views =
    document.querySelectorAll(".view");

const pageTitle =
    document.getElementById("pageTitle");

menuItems.forEach(item => {

    item.addEventListener("click", () => {

        menuItems.forEach(btn =>
            btn.classList.remove("active")
        );

        item.classList.add("active");

        const viewId =
            item.dataset.view;

        views.forEach(view =>
            view.classList.remove("active")
        );

        const currentView =
            document.getElementById(viewId);

        if (currentView) {

            currentView.classList.add("active");

        }

        pageTitle.textContent =
            item.textContent.trim();

        cargarVista(viewId);

    });

});

// =========================
// LOGOUT
// =========================

document
    .getElementById("logoutBtn")
    .addEventListener("click", () => {

        const confirmar =
            confirm(
                "¿Desea cerrar sesión?"
            );

        if (!confirmar) return;

        localStorage.removeItem("usuario");
        localStorage.removeItem("token");

        window.location.href =
            "login.html";

    });

// =========================
// CARGAR VISTA
// =========================
function cargarVista(view) {
    switch (view) {
        case "grupos":
            cargarGrupos();
            break;
        case "materias":
            cargarMaterias();
            break;
        case "calificaciones":
            cargarCalificaciones();
            break;
        case "avisos":
            cargarAvisos();
            break;
        case "citas":
            cargarCitas();
            break;
        case "registros":
            cargarRegistros();
            break;
    }

}

// =========================
// DASHBOARD
// =========================

async function cargarInicio() {

    try {

        const response =
            await fetch(
                `http://localhost:3000/api/calificaciones/alumno/${usuario.Id_Alumno}`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

        const materias =
            await response.json();

        document.getElementById(
            "totalMaterias"
        ).textContent =
            materias.length;

        let suma = 0;

        materias.forEach(m => {

            suma +=
                Number(
                    m.Calificacion || 0
                );

        });

        const promedio =
            materias.length > 0
                ? (
                    suma /
                    materias.length
                ).toFixed(1)
                : 0;

        document.getElementById(
            "promedioGeneral"
        ).textContent =
            promedio;

    } catch (error) {

        console.error(
            "Error dashboard:",
            error
        );

    }

}

// =========================
// GRUPOS
// =========================

async function cargarGrupos() {

    try {

        const response =
            await fetch(
                "http://localhost:3000/api/grupos",
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

        const grupos =
            await response.json();

        const tabla =
            document.getElementById(
                "tablaGrupo"
            );

        if (!tabla) return;

        tabla.innerHTML = "";

        grupos.forEach(grupo => {

            tabla.innerHTML += `
                <tr>
                    <td>${grupo.Id_Grupo}</td>
                    <td>${grupo.Grado}</td>
                    <td>${grupo.Grupo}</td>
                </tr>
            `;

        });

    } catch (error) {

        console.error(error);

    }

}

// =========================
// MATERIAS
// =========================

async function cargarMaterias() {

    try {

        const response =
            await fetch(
                `http://localhost:3000/api/calificaciones/alumno/${usuario.Id_Alumno}`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

        const data =
            await response.json();

        const tabla =
            document.getElementById(
                "tablaMateria"
            );

        if (!tabla) return;

        tabla.innerHTML = "";

        data.forEach(materia => {

            tabla.innerHTML += `
                <tr>
                    <td>${materia.MateriaId_Materia}</td>
                    <td>${materia.Nombre_Materia}</td>
                </tr>
            `;

        });

    } catch (error) {

        console.error(error);

    }

}

// =========================
// CALIFICACIONES
// =========================

async function cargarCalificaciones() {

    try {

        const response =
            await fetch(
                `http://localhost:3000/api/calificaciones/alumno/${usuario.Id_Alumno}`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

        const data =
            await response.json();

        const tabla =
            document.getElementById(
                "tablaCursar"
            );

        if (!tabla) return;

        tabla.innerHTML = "";

        data.forEach(calificacion => {

            tabla.innerHTML += `
                <tr>
                    <td>${calificacion.AlumnoId_Alumno}</td>
                    <td>${calificacion.MateriaId_Materia}</td>
                    <td>${calificacion.Calificacion}</td>
                </tr>
            `;

        });

    } catch (error) {

        console.error(error);

    }

}

// =========================
// AVISOS
// =========================

async function cargarAvisos() {

    try {

        const response =
            await fetch(
                "http://localhost:3000/api/avisos",
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

        const avisos =
            await response.json();

        const tabla =
            document.getElementById(
                "tablaAviso"
            );

        if (!tabla) return;

        tabla.innerHTML = "";

        avisos.forEach(aviso => {

            tabla.innerHTML += `
                <tr>
                    <td>${aviso.Id_Aviso}</td>
                    <td>${aviso.DocenteId_Docente}</td>
                    <td>${aviso.Titulo}</td>
                    <td>${aviso.Mensaje}</td>
                    <td>${aviso.Fecha}</td>
                    <td>${aviso.Categoria}</td>
                </tr>
            `;

        });

    } catch (error) {

        console.error(error);

    }

}

// =========================
// CITAS
// =========================

async function cargarCitas() {

    try {

        const response =
            await fetch(
                "http://localhost:3000/api/citas",
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

        const citas =
            await response.json();

        const tabla =
            document.getElementById(
                "tablaCita"
            );

        if (!tabla) return;

        tabla.innerHTML = "";

        citas.forEach(cita => {

            tabla.innerHTML += `
                <tr>
                    <td>${cita.Id_Cita}</td>
                    <td>${cita.DocenteId_Docente}</td>
                    <td>${cita.TutorId_Tutor}</td>
                    <td>${cita.Hora}</td>
                    <td>${cita.Fecha}</td>
                    <td>${cita.Estado}</td>
                </tr>
            `;

        });

    } catch (error) {

        console.error(error);

    }

}

// =========================
// REGISTROS
// =========================

async function cargarRegistros() {

    try {

        const response =
            await fetch(
                `http://localhost:3000/api/registros/alumno/${usuario.Id_Alumno}`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

        const registros =
            await response.json();

        const tabla =
            document.getElementById(
                "tablaRegistro"
            );

        if (!tabla) return;

        tabla.innerHTML = "";

        let asistencias = 0;

        registros.forEach(registro => {

            if (
                registro.Asistencia ===
                "Presente"
            ) {

                asistencias++;

            }

            tabla.innerHTML += `
                <tr>
                    <td>${registro.Id_Registro}</td>
                    <td>${registro.AlumnoId_Alumno}</td>
                    <td>${registro.Comportamiento}</td>
                    <td>${registro.Asistencia}</td>
                    <td>${registro.Fecha}</td>
                    <td>${registro.Observacion || ""}</td>
                </tr>
            `;

        });

        document.getElementById(
            "asistencias"
        ).textContent =
            asistencias;

    } catch (error) {

        console.error(error);

    }

}

// =========================
// CARGA INICIAL
// =========================


document.addEventListener(
    "DOMContentLoaded",
    () => {

        cargarDashboard();

    }
);

const modal =
    document.getElementById("modal");

const modalTitulo =
    document.getElementById("modalTitulo");

const camposModal =
    document.getElementById("camposModal");

const formModal =
    document.getElementById("formModal");

document
    .getElementById("cerrarModal")
    .addEventListener("click", () => {

        modal.style.display =
            "none";

    });

function formatearFecha(valor) {
    if (!valor) return "";
    return new Date(valor).toISOString().split("T")[0]; // → "2026-06-13"
}

function mostrarFecha(fecha) {
    if (!fecha) return "";
    return new Date(fecha).toLocaleDateString("es-MX");
}

function abrirModal(titulo, campos, callback, noAutoCerrar = false) {
    modalTitulo.textContent = titulo;
    camposModal.innerHTML = "";

    campos.forEach(campo => {
        if (campo.tipo === "select") {
            let opciones = "";
            campo.opciones.forEach(op => {
                opciones += `<option value="${op}" ${campo.valor === op ? "selected" : ""}>${op}</option>`;
            });
            camposModal.innerHTML += `
                <label>${campo.label}</label>
                <select id="${campo.id}" required>${opciones}</select>
            `;
        } else {
            camposModal.innerHTML += `
                <label>${campo.label}</label>
                <input
                    type="${campo.tipo === "fecha" ? "date" : campo.tipo || "text"}"
                    id="${campo.id}"
                    placeholder="${campo.label}"
                    value="${campo.tipo === "fecha" ? formatearFecha(campo.valor) : (campo.valor || "")}"
                >
            `;
        }
    });

    const esEliminar = titulo.startsWith("Eliminar");

    if (esEliminar) {
        camposModal.innerHTML += `
            <div style="display:flex;gap:10px;margin-top:1.2rem">
                <button type="button" id="btnCancelarEliminar"
                    style="flex:1;padding:.7rem;background:#9ec9d0;border:1.5px solid #2087cb;border-radius:8px;background:#fff;cursor:pointer;font-size:1rem">
                    Cancelar
                </button>
                <button type="submit"
                    style="flex:1;padding:.7rem;background:#e53e3e;color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:1rem;font-weight:600">
                    Sí, eliminar
                </button>
            </div>
        `;
    }else {
        camposModal.innerHTML += `
            <button type="submit" class="btn-primary" style="margin-top:1.2rem;width:100%">
                Guardar
            </button>
        `;
    }

    modal.style.display = "flex";

    document.getElementById("btnCancelarEliminar")?.addEventListener("click", () => {
        modal.style.display = "none";
    });

    formModal.onsubmit = async (e) => {
        e.preventDefault();

        const datos = {};
        campos.forEach(campo => {
            datos[campo.id] = document.getElementById(campo.id).value;
        });

        if (!noAutoCerrar) {
            modal.style.display = "none";
        }

        await callback(datos);
    };
}


document
.getElementById("btnAgendarCita")
.addEventListener("click",()=>{
    abrirModal(
        "Agendar Cita",
        [
            {
                id:"DocenteId_Docente",
                label:"ID Docente"
            },
            {
                id:"TutorId_Tutor",
                label:"ID Tutor"
            },
            {
                id:"Hora",
                label:"Hora"
            },
            {
                id:"Fecha",
                label:"Fecha",
                tipo:"fecha"
            },
            {
                id:"Estado",
                label:"Estado",
                tipo:"select",
                opciones:[
                    "Agendada",
                    "No agendada"
                ]
            }
        ],
        async(datos)=>{
            await fetch(
                "http://localhost:3000/api/citas",
                {
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify(datos)
                }
            );
            cargarCitas();
        }
    );

});

document
.getElementById("btnModificarCita")
.addEventListener("click", () => {
    abrirModal(
        "Seleccionar Cita",
        [{ id: "Id_Cita", label: "ID Cita" }],
        async (datos) => {
            const id = datos.Id_Cita;
            if (!id) return;
            try {
                const response = await fetch(`http://localhost:3000/api/citas/${id}`);
                const cita = await response.json();
                abrirModal(
                    "Modificar Cita",
                    [
                        { id: "DocenteId_Docente", label: "ID Docente", valor: cita.DocenteId_Docente },
                        { id: "TutorId_Tutor", label: "ID Tutor", valor: cita.TutorId_Tutor },
                        { id: "Hora", label: "Hora", valor: cita.Hora },
                        { id: "Fecha", label: "Fecha", tipo: "fecha", valor: cita.Fecha },
                        {
                            id: "Estado", label: "Estado",
                            tipo: "select",
                            opciones: ["Agendada", "No agendada"],
                            valor: cita.Estado
                        }
                    ],
                    async (datosModificados) => {
                        await fetch(`http://localhost:3000/api/citas/${id}`, {
                            method: "PUT",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(datosModificados)
                        });
                        cargarCitas();
                    }
                );
            } catch (error) {
                console.error(error);
                alert("No se pudo obtener la cita");
            }
        },
        true
    );
});

document
.getElementById("btnEliminarCita")
.addEventListener("click", () => {
    abrirModal(
        "Eliminar Cita",
        [{ id: "Id_Cita", label: "ID Cita" }],
        async (datos) => {
            const id = datos.Id_Cita;
            if (!id) return;
            await fetch(`http://localhost:3000/api/citas/${id}`, {
                method: "DELETE"
            });
            cargarCitas();
        }
    );
});