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

const nombreDocente =
    document.getElementById(
        "nombreDocente"
    );

if (nombreDocente) {

    nombreDocente.textContent =
        `${usuario.Nombre} ${usuario.Apellido_Paterno}`;

}

// =========================
// LOGOUT
// =========================

document
    .getElementById("logoutBtn")
    .addEventListener("click", () => {

        if (
            confirm(
                "¿Desea cerrar sesión?"
            )
        ) {

            localStorage.clear();

            window.location.href =
                "login.html";

        }

    });

// =========================
// CAMBIO DE VISTAS
// =========================

const menuItems =
    document.querySelectorAll(
        ".menu-item"
    );

const views =
    document.querySelectorAll(
        ".view"
    );

const pageTitle =
    document.getElementById(
        "pageTitle"
    );

menuItems.forEach(item => {

    item.addEventListener(
        "click",
        () => {

            menuItems.forEach(btn =>
                btn.classList.remove(
                    "active"
                )
            );

            item.classList.add(
                "active"
            );

            const viewId =
                item.dataset.view;

            views.forEach(view =>
                view.classList.remove(
                    "active"
                )
            );

            document
                .getElementById(viewId)
                .classList.add(
                    "active"
                );

            pageTitle.textContent =
                item.textContent.trim();

            cargarVista(viewId);

        }
    );

});

// =========================
// CARGAR VISTA
// =========================

function cargarVista(view) {

    switch (view) {

        case "dashboard":
            cargarDashboard();
            break;

        case "alumnos":
            cargarAlumnos();
            break;

        case "docentes":
            cargarDocentes();
            break;

        case "tutores":
            cargarTutores();
            break;

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
        case "representar":
            cargarRepresentar();
            break;
    }

}

// =========================
// DASHBOARD
// =========================

async function cargarDashboard() {

    try {

        const [
            alumnos,
            docentes,
            grupos,
            materias
        ] = await Promise.all([

            fetch("https://proyectofinal-bd.onrender.com/api/alumnos"),
            fetch("https://proyectofinal-bd.onrender.com/api/docentes"),
            fetch("https://proyectofinal-bd.onrender.com/api/grupos"),
            fetch("https://proyectofinal-bd.onrender.com/api/materias")

        ]);

        const alumnosData =
            await alumnos.json();

        const docentesData =
            await docentes.json();

        const gruposData =
            await grupos.json();

        const materiasData =
            await materias.json();

        document.getElementById(
            "totalAlumnos"
        ).textContent =
            alumnosData.length;

        document.getElementById(
            "totalDocentes"
        ).textContent =
            docentesData.length;

        document.getElementById(
            "totalGrupos"
        ).textContent =
            gruposData.length;

        document.getElementById(
            "totalMaterias"
        ).textContent =
            materiasData.length;

    } catch (error) {

        console.error(error);

    }

}

// =========================
// ALUMNOS
// =========================

async function cargarAlumnos() {

    try {

        const response =
            await fetch(
                "https://proyectofinal-bd.onrender.com/api/alumnos"
            );

        const alumnos =
            await response.json();

        const tabla =
            document.getElementById(
                "tablaAlumno"
            );

        tabla.innerHTML = "";
        alumnos.forEach(alumno => {

            tabla.innerHTML += `
                <tr>
                    <td>${alumno.Id_Alumno}</td>
                    <td>${alumno.GrupoId_Grupo}</td>
                    <td>${alumno.Nombre}</td>
                    <td>${alumno.Apellido_Paterno}</td>
                    <td>${alumno.Apellido_Materno || ""}</td>
                    <td>${mostrarFecha(alumno.Fecha_nacimiento)}</td>
                </tr>
            `;

        });

    } catch (error) {

        console.error(error);

    }

}

// =========================
// DOCENTES
// =========================

async function cargarDocentes() {

    try {

        const response =
            await fetch(
                "https://proyectofinal-bd.onrender.com/api/docentes"
            );

        const docentes =
            await response.json();

        const tabla =
            document.getElementById(
                "tablaDocente"
            );

        tabla.innerHTML = "";

        docentes.forEach(docente => {

            tabla.innerHTML += `
                <tr>
                    <td>${docente.Id_Docente}</td>
                    <td>${docente.Nombre}</td>
                    <td>${docente.Apellido_Paterno}</td>
                    <td>${docente.Apellido_Materno}</td>
                    <td>********</td>
                </tr>
            `;

        });

    } catch (error) {

        console.error(error);

    }

}

// =========================
// TUTORES
// =========================

async function cargarTutores() {

    try {

        const response =
            await fetch(
                "https://proyectofinal-bd.onrender.com/api/tutores"
            );

        const tutores =
            await response.json();

        const tabla =
            document.getElementById(
                "tablaTutor"
            );

        tabla.innerHTML = "";

        tutores.forEach(tutor => {

            tabla.innerHTML += `
                <tr>
                    <td>${tutor.Id_Tutor}</td>
                    <td>${tutor.Nombre}</td>
                    <td>${tutor.Telefono}</td>
                    <td>${tutor.Direccion}</td>
                </tr>
            `;

        });

    } catch (error) {

        console.error(error);

    }

}

// =========================
// GRUPOS
// =========================

async function cargarGrupos() {
    try {
        const response =
            await fetch(
                "https://proyectofinal-bd.onrender.com/api/grupos"
            );
        const grupos =
            await response.json();
        const tabla =
            document.getElementById(
                "tablaGrupo"
            );
        tabla.innerHTML = "";
        grupos.forEach(grupo => {
            tabla.innerHTML += `
                <tr>
                    <td>${grupo.Id_Grupo}</td>
                    <td>${grupo.DocenteId_Docente}</td>
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
                "https://proyectofinal-bd.onrender.com/api/materias"
            );

        const materias =
            await response.json();

        const tabla =
            document.getElementById(
                "tablaMateria"
            );

        tabla.innerHTML = "";

        materias.forEach(materia => {

            tabla.innerHTML += `
                <tr>
                    <td>${materia.Id_Materia}</td>
                    <td>${materia.Nombre_Materia}</td>
                </tr>
            `;

        });

    } catch (error) {

        console.error(error);

    }

}

async function cargarCalificaciones() {

    try {

        const response =
            await fetch(
                "https://proyectofinal-bd.onrender.com/api/calificaciones"
            );

        const calificaciones =
            await response.json();

        const tabla =
            document.getElementById(
                "tablaCursar"
            );

        tabla.innerHTML = "";

        calificaciones.forEach(calificacion => {

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

async function cargarAvisos() {

    try {

        const response =
            await fetch(
                "https://proyectofinal-bd.onrender.com/api/avisos"
            );

        const avisos =
            await response.json();

        const tabla =
            document.getElementById(
                "tablaAviso"
            );

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

async function cargarCitas() {

    try {

        const response =
            await fetch(
                "https://proyectofinal-bd.onrender.com/api/citas"
            );

        const citas =
            await response.json();

        const tabla =
            document.getElementById(
                "tablaCita"
            );

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

async function cargarRegistros() {
    try {
        const response =
            await fetch(
                "https://proyectofinal-bd.onrender.com/api/registros"
            );

        const registros =
            await response.json();

        const tabla =
            document.getElementById(
                "tablaRegistro"
            );

        tabla.innerHTML = "";
        registros.forEach(registro => {

            tabla.innerHTML += `
                <tr>
                    <td>${registro.Id_Registro}</td>
                    <td>${registro.AlumnoId_Alumno}</td>
                    <td>${registro.Comportamiento}</td>
                    <td>${registro.Asistencia}</td>
                    <td>${registro.Fecha}</td>
                    <td>${registro.Observacion}</td>
                </tr>
            `;

        });
    } catch (error) {
        console.error(error);
    }
}

async function cargarRepresentar() {
    try {
        const response = await fetch("https://proyectofinal-bd.onrender.com/api/representar");
        const relaciones = await response.json();
        const tabla = document.getElementById("tablaRepresentar");
        tabla.innerHTML = "";
        relaciones.forEach(rel => {
            tabla.innerHTML += `
                <tr>
                    <td>${rel.TutorId_Tutor}</td>
                    <td>${rel.NombreTutor}</td>
                    <td>${rel.AlumnoId_Alumno}</td>
                    <td>${rel.NombreAlumno}</td>
                </tr>
            `;
        });
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

function mostrarAlerta(mensaje, tipo = "exito") {
    // Crea un elemento <div> nuevo en la página
    const alerta = document.createElement("div");

    // Le pone el texto del mensaje
    alerta.textContent = mensaje;

    // Le da estilo con JavaScript (posición, colores, etc.)
    alerta.style.position = "fixed";
    alerta.style.top = "20px";
    alerta.style.right = "20px";
    alerta.style.padding = "1rem 1.5rem";
    alerta.style.borderRadius = "8px";
    alerta.style.color = "#fff";
    alerta.style.fontWeight = "600";
    alerta.style.zIndex = "9999";
    alerta.style.boxShadow = "0 10px 30px rgba(0,0,0,0.2)";

    // Si tipo es "exito" se pone verde, si no, rojo
    alerta.style.background = tipo === "exito" ? "#22c55e" : "#e53e3e";

    // Agrega la cajita a la página para que se vea
    document.body.appendChild(alerta);

    // Después de 2.5 segundos, la quita poco a poco y la elimina
    setTimeout(() => {
        alerta.style.opacity = "0";
        alerta.style.transition = "opacity 0.3s";
        setTimeout(() => alerta.remove(), 300);
    }, 2500);
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
                    ${campo.requerido ? "required" : ""}
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
    .getElementById("btnNuevoAlumno")
    .addEventListener("click", () => {
        abrirModal(
            "Nuevo Alumno",
            [
                {
                    id:"Nombre",
                    label:"Nombre",
                    requerido: true
                },
                {
                    id:"Apellido_Paterno",
                    label:"Apellido Paterno",
                    requerido: true
                },
                {
                    id:"Apellido_Materno",
                    label:"Apellido Materno",
                    requerido: true
                },
                {
                    id:"GrupoId_Grupo",
                    label:"ID Grupo"
                },
                {
                    id:"Fecha_nacimiento",
                    label:"Fecha Nacimiento",
                    tipo:"fecha",
                    requerido: true
                }
            ],

            async (datos) => {

                await fetch(
                    "https://proyectofinal-bd.onrender.com/api/alumnos",
                    {
                        method:"POST",
                        headers:{
                            "Content-Type":
                            "application/json"
                        },
                        body:JSON.stringify(
                            datos
                        )
                    }
                );
                const data = await response.json();
                if (!response.ok) {
                    mostrarAlerta(data.message, "error"); // mostramos el mensaje en rojo
                    return; 
                }
                mostrarAlerta(data.message, "exito");
                cargarAlumnos();
            }
        );
    });

document
    .getElementById("btnModificarAlumno")
    .addEventListener("click", () => {
        abrirModal(
            "Seleccionar Alumno",
            [{ id: "Id_Alumno", label: "ID Alumno" }],
            async (datos) => {
                const id = datos.Id_Alumno;
                if (!id) return;
                try {
                    const response = await fetch(`https://proyectofinal-bd.onrender.com/api/alumnos/${id}`);
                    const alumno = await response.json();
                    abrirModal(
                        "Modificar Alumno",
                        [
                            { id: "Nombre", label: "Nombre", valor: alumno.Nombre, requerido: true },
                            { id: "Apellido_Paterno", label: "Apellido Paterno", valor: alumno.Apellido_Paterno, requerido: true },
                            { id: "Apellido_Materno", label: "Apellido Materno", valor: alumno.Apellido_Materno, requerido: true },
                            { id: "GrupoId_Grupo", label: "ID Grupo", valor: alumno.GrupoId_Grupo },
                            { id: "Fecha_nacimiento", label: "Fecha Nacimiento", tipo: "fecha", valor: alumno.Fecha_nacimiento, requerido: true }
                        ],
                        async (datosModificados) => {
                            await fetch(`https://proyectofinal-bd.onrender.com/api/alumnos/${id}`, {
                                method: "PUT",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify(datosModificados)
                            });
                            const data = await response.json();
                            if (!response.ok) {
                                mostrarAlerta(data.message, "error"); // mostramos el mensaje en rojo
                                return; 
                            }
                            mostrarAlerta(data.message, "exito");
                            cargarAlumnos();
                        }
                    );
                } catch (error) {
                    console.error(error);
                    alert("No se pudo obtener el alumno");
                }
            },
            true
        );
    });

document
    .getElementById("btnEliminarAlumno")
    .addEventListener("click", () => {
        abrirModal(
            "Eliminar Alumno",
            [{ id: "Id_Alumno", label: "ID Alumno" }],
            async (datos) => {
                const id = datos.Id_Alumno;
                if (!id) return;
                await fetch(`https://proyectofinal-bd.onrender.com/api/alumnos/${id}`, {
                    method: "DELETE"
                });
                const data = await response.json();
                if (!response.ok) {
                    mostrarAlerta(data.message, "error"); // mostramos el mensaje en rojo
                    return; 
                }
                mostrarAlerta(data.message, "exito");
                cargarAlumnos();
            }
        );
    });

document.getElementById("btnNuevoDocente")
.addEventListener("click", () => {
    abrirModal(
        "Nuevo Docente",
        [
            {id:"Nombre",label:"Nombre"},
            {id:"Apellido_Paterno",label:"Apellido Paterno"},
            {id:"Apellido_Materno",label:"Apellido Materno"},
            {id:"Contrasena",label:"Contraseña"}
        ],
        async(datos)=>{
            await fetch(
                "https://proyectofinal-bd.onrender.com/api/docentes",
                {
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify(datos)
                }
            );
            const data = await response.json();
            if (!response.ok) {
                mostrarAlerta(data.message, "error"); // mostramos el mensaje en rojo
                return; 
            }
            mostrarAlerta(data.message, "exito");
            cargarDocentes();
        }
    );
});

document
.getElementById("btnModificarDocente")
.addEventListener("click", () => {
    abrirModal(
        "Seleccionar Docente",
        [{ id: "Id_Docente", label: "ID Docente" }],
        async (datos) => {
            const id = datos.Id_Docente;
            if (!id) return;
            try {
                const response = await fetch(`https://proyectofinal-bd.onrender.com/api/docentes/${id}`);
                const docente = await response.json();
                abrirModal(
                    "Modificar Docente",
                    [
                        { id: "Nombre", label: "Nombre", valor: docente.Nombre },
                        { id: "Apellido_Paterno", label: "Apellido Paterno", valor: docente.Apellido_Paterno },
                        { id: "Apellido_Materno", label: "Apellido Materno", valor: docente.Apellido_Materno },
                        { id: "Contrasena", label: "Contraseña", valor: docente.Contrasena }
                    ],
                    async (datosModificados) => {
                        await fetch(`https://proyectofinal-bd.onrender.com/api/docentes/${id}`, {
                            method: "PUT",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(datosModificados)
                        });
                        const data = await response.json();
                        if (!response.ok) {
                            mostrarAlerta(data.message, "error"); // mostramos el mensaje en rojo
                            return; 
                        }
                        mostrarAlerta(data.message, "exito");
                        cargarDocentes();
                    }
                );
            } catch (error) {
                console.error(error);
                alert("No se pudo obtener el docente");
            }
        },
        true
    );
});

document
.getElementById("btnEliminarDocente")
.addEventListener("click", () => {
    abrirModal(
        "Eliminar Docente",
        [{ id: "Id_Docente", label: "ID Docente" }],
        async (datos) => {
            const id = datos.Id_Docente;
            if (!id) return;
            await fetch(`https://proyectofinal-bd.onrender.com/api/docentes/${id}`, {
                method: "DELETE"
            });
            const data = await response.json();
            if (!response.ok) {
                mostrarAlerta(data.message, "error"); // mostramos el mensaje en rojo
                return; 
            }
            mostrarAlerta(data.message, "exito");
            cargarDocentes();
        }
    );
});

document
.getElementById("btnNuevoTutor")
.addEventListener("click",()=>{
    abrirModal(
        "Nuevo Tutor",
        [
            {id:"Nombre",label:"Nombre"},
            {id:"Telefono",label:"Teléfono"},
            {id:"Direccion",label:"Dirección"}
        ],
        async(datos)=>{
            await fetch(
                "https://proyectofinal-bd.onrender.com/api/tutores",
                {
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify(datos)
                }
            );
            const data = await response.json();
            if (!response.ok) {
                mostrarAlerta(data.message, "error"); // mostramos el mensaje en rojo
                return; 
            }
            mostrarAlerta(data.message, "exito");
            cargarTutores();
        }
    );
});

document
.getElementById("btnModificarTutor")
.addEventListener("click", () => {
    abrirModal(
        "Seleccionar Tutor",
        [{ id: "Id_Tutor", label: "ID Tutor" }],
        async (datos) => {
            const id = datos.Id_Tutor;
            if (!id) return;
            try {
                const response = await fetch(`https://proyectofinal-bd.onrender.com/api/tutores/${id}`);
                const tutor = await response.json();
                abrirModal(
                    "Modificar Tutor",
                    [
                        { id: "Nombre", label: "Nombre", valor: tutor.Nombre },
                        { id: "Telefono", label: "Teléfono", valor: tutor.Telefono },
                        { id: "Direccion", label: "Dirección", valor: tutor.Direccion }
                    ],
                    async (datosModificados) => {
                        await fetch(`https://proyectofinal-bd.onrender.com/api/tutores/${id}`, {
                            method: "PUT",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(datosModificados)
                        });
                        const data = await response.json();
                        if (!response.ok) {
                            mostrarAlerta(data.message, "error"); // mostramos el mensaje en rojo
                            return; 
                        }
                        mostrarAlerta(data.message, "exito");
                        cargarTutores();
                    }
                );
            } catch (error) {
                console.error(error);
                alert("No se pudo obtener el tutor");
            }
        },
        true
    );
});

document
.getElementById("btnEliminarTutor")
.addEventListener("click", () => {
    abrirModal(
        "Eliminar Tutor",
        [{ id: "Id_Tutor", label: "ID Tutor" }],
        async (datos) => {
            const id = datos.Id_Tutor;
            if (!id) return;
            await fetch(`https://proyectofinal-bd.onrender.com/api/tutores/${id}`, {
                method: "DELETE"
            });
            const data = await response.json();
            if (!response.ok) {
                mostrarAlerta(data.message, "error"); // mostramos el mensaje en rojo
                return; 
            }
            mostrarAlerta(data.message, "exito");
            cargarTutores();
        }
    );
});

document
.getElementById("btnNuevoGrupo")
.addEventListener("click",()=>{
    abrirModal(
        "Nuevo Grupo",
        [
            {id:"DocenteId_Docente",label:"ID Docente"},
            {id:"Grado",label:"Grado"},
            {id:"Grupo",label:"Grupo"}
        ],
        async(datos)=>{
            await fetch(
                "https://proyectofinal-bd.onrender.com/api/grupos",
                {
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify(datos)
                }
            );
            const data = await response.json();
            if (!response.ok) {
                mostrarAlerta(data.message, "error"); // mostramos el mensaje en rojo
                return; 
            }
            mostrarAlerta(data.message, "exito");
            cargarGrupos();
        }
    );
});

document
.getElementById("btnModificarGrupo")
.addEventListener("click", () => {
    abrirModal(
        "Seleccionar Grupo",
        [{ id: "Id_Grupo", label: "ID Grupo" }],
        async (datos) => {
            const id = datos.Id_Grupo;
            if (!id) return;
            try {
                const response = await fetch(`https://proyectofinal-bd.onrender.com/api/grupos/${id}`);
                const grupo = await response.json();
                abrirModal(
                    "Modificar Grupo",
                    [
                        { id: "DocenteId_Docente", label: "ID Docente", valor: grupo.DocenteId_Docente },
                        { id: "Grado", label: "Grado", valor: grupo.Grado },
                        { id: "Grupo", label: "Grupo", valor: grupo.Grupo }
                    ],
                    async (datosModificados) => {
                        await fetch(`https://proyectofinal-bd.onrender.com/api/grupos/${id}`, {
                            method: "PUT",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(datosModificados)
                        });
                        const data = await response.json();
                        if (!response.ok) {
                            mostrarAlerta(data.message, "error"); // mostramos el mensaje en rojo
                            return; 
                        }
                        mostrarAlerta(data.message, "exito");
                        cargarGrupos();
                    }
                );
            } catch (error) {
                console.error(error);
                alert("No se pudo obtener el grupo");
            }
        },
        true
    );
});

document
.getElementById("btnEliminarGrupo")
.addEventListener("click", () => {
    abrirModal(
        "Eliminar Grupo",
        [{ id: "Id_Grupo", label: "ID Grupo" }],
        async (datos) => {
            const id = datos.Id_Grupo;
            if (!id) return;
            await fetch(`https://proyectofinal-bd.onrender.com/api/grupos/${id}`, {
                method: "DELETE"
            });
            const data = await response.json();
            if (!response.ok) {
                mostrarAlerta(data.message, "error"); // mostramos el mensaje en rojo
                return; 
            }
            mostrarAlerta(data.message, "exito");
            cargarGrupos();
        }
    );
});

document
.getElementById("btnNuevaMateria")
.addEventListener("click",()=>{
    abrirModal(
        "Nueva Materia",
        [
            {
                id:"Nombre_Materia",
                label:"Nombre Materia"
            }
        ],
        async(datos)=>{
            await fetch(
                "https://proyectofinal-bd.onrender.com/api/materias",
                {
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify(datos)
                }
            );
            const data = await response.json();
            if (!response.ok) {
                mostrarAlerta(data.message, "error"); // mostramos el mensaje en rojo
                return; 
            }
            mostrarAlerta(data.message, "exito");
            cargarMaterias();
        }
    );
});

document
.getElementById("btnModificarMateria")
.addEventListener("click", () => {
    abrirModal(
        "Seleccionar Materia",
        [{ id: "Id_Materia", label: "ID Materia" }],
        async (datos) => {
            const id = datos.Id_Materia;
            if (!id) return;
            try {
                const response = await fetch(`https://proyectofinal-bd.onrender.com/api/materias/${id}`);
                const materia = await response.json();
                abrirModal(
                    "Modificar Materia",
                    [
                        { id: "Nombre_Materia", label: "Materia", valor: materia.Nombre_Materia }
                    ],
                    async (datosModificados) => {
                        await fetch(`https://proyectofinal-bd.onrender.com/api/materias/${id}`, {
                            method: "PUT",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(datosModificados)
                        });
                        const data = await response.json();
                        if (!response.ok) {
                            mostrarAlerta(data.message, "error"); // mostramos el mensaje en rojo
                            return; 
                        }
                        mostrarAlerta(data.message, "exito");
                        cargarMaterias();
                    }
                );
            } catch (error) {
                console.error(error);
                alert("No se pudo obtener la materia");
            }
        },
        true
    );
});

document
.getElementById("btnEliminarMateria")
.addEventListener("click", () => {
    abrirModal(
        "Eliminar Materia",
        [{ id: "Id_Materia", label: "ID Materia" }],
        async (datos) => {
            const id = datos.Id_Materia;
            if (!id) return;
            await fetch(`https://proyectofinal-bd.onrender.com/api/materias/${id}`, {
                method: "DELETE"
            });
            const data = await response.json();
            if (!response.ok) {
                mostrarAlerta(data.message, "error"); // mostramos el mensaje en rojo
                return; 
            }
            mostrarAlerta(data.message, "exito");
            cargarMaterias();
        }
    );
});

document
.getElementById("btnNuevaCalificacion")
.addEventListener("click",()=>{
    abrirModal(
        "Nueva Calificación",
        [
            {
                id:"AlumnoId_Alumno",
                label:"ID Alumno"
            },
            {
                id:"MateriaId_Materia",
                label:"ID Materia"
            },
            {
                id:"Calificacion",
                label:"Calificación"
            }
        ],
        async(datos)=>{
            await fetch(
                "https://proyectofinal-bd.onrender.com/api/calificaciones",
                {
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify(datos)
                }
            );
            const data = await response.json();
            if (!response.ok) {
                mostrarAlerta(data.message, "error"); // mostramos el mensaje en rojo
                return; 
            }
            mostrarAlerta(data.message, "exito");
            cargarCalificaciones();
        }
    );
});

document
.getElementById("btnModificarCalificacion")
.addEventListener("click", () => {
    abrirModal(
        "Seleccionar Calificación",
        [
            { id: "AlumnoId_Alumno", label: "ID Alumno" },
            { id: "MateriaId_Materia", label: "ID Materia" }
        ],
        async (datos) => {
            const alumno = datos.AlumnoId_Alumno;
            const materia = datos.MateriaId_Materia;
            if (!alumno || !materia) return;
            try {
                const response = await fetch(`https://proyectofinal-bd.onrender.com/api/calificaciones/${alumno}/${materia}`);
                const calificacion = await response.json();
                abrirModal(
                    "Modificar Calificación",
                    [
                        { id: "AlumnoId_Alumno", label: "ID Alumno", valor: calificacion.AlumnoId_Alumno },
                        { id: "MateriaId_Materia", label: "ID Materia", valor: calificacion.MateriaId_Materia },
                        { id: "Calificacion", label: "Calificación", valor: calificacion.Calificacion }
                    ],
                    async (datosModificados) => {
                        await fetch(`https://proyectofinal-bd.onrender.com/api/calificaciones/${alumno}/${materia}`, {
                            method: "PUT",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(datosModificados)
                        });
                        const data = await response.json();
                        if (!response.ok) {
                            mostrarAlerta(data.message, "error"); // mostramos el mensaje en rojo
                            return; 
                        }
                        mostrarAlerta(data.message, "exito");
                        cargarCalificaciones();
                    }
                );
            } catch (error) {
                console.error(error);
                alert("No se pudo obtener la calificación");
            }
        },
        true
    );
});

document
.getElementById("btnEliminarCalificacion")
.addEventListener("click", () => {
    abrirModal(
        "Eliminar Calificación",
        [
            { id: "AlumnoId_Alumno", label: "ID Alumno" },
            { id: "MateriaId_Materia", label: "ID Materia" }
        ],
        async (datos) => {
            const alumno = datos.AlumnoId_Alumno;
            const materia = datos.MateriaId_Materia;
            if (!alumno || !materia) return;
            await fetch(`https://proyectofinal-bd.onrender.com/api/calificaciones/${alumno}/${materia}`, {
                method: "DELETE"
            });
            const data = await response.json();
            if (!response.ok) {
                mostrarAlerta(data.message, "error"); // mostramos el mensaje en rojo
                return; 
            }
            mostrarAlerta(data.message, "exito");
            cargarCalificaciones();
        }
    );
});

document
.getElementById("btnNuevoAviso")
.addEventListener("click",()=>{

    abrirModal(
        "Nuevo Aviso",
        [
            {
                id:"DocenteId_Docente",
                label:"ID Docente"
            },
            {
                id:"Titulo",
                label:"Título"
            },
            {
                id:"Mensaje",
                label:"Mensaje"
            },
            {
                id:"Fecha",
                label:"Fecha",
                tipo:"fecha"
            },
            {
                id:"Categoria",
                label:"Categoría"
            }
        ],

        async(datos)=>{

            await fetch(
                "https://proyectofinal-bd.onrender.com/api/avisos",
                {
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify(datos)
                }
            );
            const data = await response.json();
            if (!response.ok) {
                mostrarAlerta(data.message, "error"); // mostramos el mensaje en rojo
                return; 
            }
            mostrarAlerta(data.message, "exito");
            cargarAvisos();
        }
    );

});

document
.getElementById("btnModificarAviso")
.addEventListener("click", () => {
    abrirModal(
        "Seleccionar Aviso",
        [{ id: "Id_Aviso", label: "ID Aviso" }],
        async (datos) => {
            const id = datos.Id_Aviso;
            if (!id) return;
            try {
                const response = await fetch(`https://proyectofinal-bd.onrender.com/api/avisos/${id}`);
                const aviso = await response.json();
                abrirModal(
                    "Modificar Aviso",
                    [
                        { id: "DocenteId_Docente", label: "ID Docente", valor: aviso.DocenteId_Docente },
                        { id: "Titulo", label: "Título", valor: aviso.Titulo },
                        { id: "Mensaje", label: "Mensaje", valor: aviso.Mensaje },
                        { id: "Fecha", label: "Fecha", tipo: "fecha", valor: aviso.Fecha },
                        { id: "Categoria", label: "Categoría", valor: aviso.Categoria }
                    ],
                    async (datosModificados) => {
                        await fetch(`https://proyectofinal-bd.onrender.com/api/avisos/${id}`, {
                            method: "PUT",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(datosModificados)
                        });
                        const data = await response.json();
                        if (!response.ok) {
                            mostrarAlerta(data.message, "error"); // mostramos el mensaje en rojo
                            return; 
                        }
                        mostrarAlerta(data.message, "exito");
                        cargarAvisos();
                    }
                );
            } catch (error) {
                console.error(error);
                alert("No se pudo obtener el aviso");
            }
        },
        true
    );
});

document
.getElementById("btnEliminarAviso")
.addEventListener("click", () => {
    abrirModal(
        "Eliminar Aviso",
        [{ id: "Id_Aviso", label: "ID Aviso" }],
        async (datos) => {
            const id = datos.Id_Aviso;
            if (!id) return;
            await fetch(`https://proyectofinal-bd.onrender.com/api/avisos/${id}`, {
                method: "DELETE"
            });
            const data = await response.json();
            if (!response.ok) {
                mostrarAlerta(data.message, "error"); // mostramos el mensaje en rojo
                return; 
            }
            mostrarAlerta(data.message, "exito");
            cargarAvisos();
        }
    );
});

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
                "https://proyectofinal-bd.onrender.com/api/citas",
                {
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify(datos)
                }
            );
            const data = await response.json();
            if (!response.ok) {
                mostrarAlerta(data.message, "error"); // mostramos el mensaje en rojo
                return; 
            }
            mostrarAlerta(data.message, "exito");
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
                const response = await fetch(`https://proyectofinal-bd.onrender.com/api/citas/${id}`);
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
                        await fetch(`https://proyectofinal-bd.onrender.com/api/citas/${id}`, {
                            method: "PUT",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(datosModificados)
                        });
                        const data = await response.json();
                        if (!response.ok) {
                            mostrarAlerta(data.message, "error"); // mostramos el mensaje en rojo
                            return; 
                        }
                        mostrarAlerta(data.message, "exito");
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
            await fetch(`https://proyectofinal-bd.onrender.com/api/citas/${id}`, {
                method: "DELETE"
            });
            const data = await response.json();
            if (!response.ok) {
                mostrarAlerta(data.message, "error"); // mostramos el mensaje en rojo
                return; 
            }
            mostrarAlerta(data.message, "exito");
            cargarCitas();
        }
    );
});

document
.getElementById("btnNuevoRegistro")
.addEventListener("click",()=>{

    abrirModal(
        "Nuevo Registro",
        [
            {
                id:"AlumnoId_Alumno",
                label:"ID Alumno"
            },
            {
                id:"Comportamiento",
                label:"Comportamiento"
            },
            {
                id:"Asistencia",
                label:"Asistencia",
                tipo:"select",
                opciones:[
                    "Presente",
                    "Ausente",
                    "Justificado"
                ]
            },
            {
                id:"Fecha",
                label:"Fecha",
                tipo:"fecha"
            },
            {
                id:"Observacion",
                label:"Observacion"
            }
        ],
        async(datos)=>{
            await fetch(
                "https://proyectofinal-bd.onrender.com/api/registros",
                {
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify(datos)
                }
            );
            const data = await response.json();
            if (!response.ok) {
                mostrarAlerta(data.message, "error"); // mostramos el mensaje en rojo
                return; 
            }
            mostrarAlerta(data.message, "exito");
            cargarRegistros();
        }
    );
});

document
.getElementById("btnModificarRegistro")
.addEventListener("click", () => {
    abrirModal(
        "Seleccionar Registro",
        [{ id: "Id_Registro", label: "ID Registro" }],
        async (datos) => {
            const id = datos.Id_Registro;
            if (!id) return;
            try {
                const response = await fetch(`https://proyectofinal-bd.onrender.com/api/registros/${id}`);
                const registro = await response.json();
                abrirModal(
                    "Modificar Registro",
                    [
                        { id: "AlumnoId_Alumno", label: "ID Alumno", valor: registro.AlumnoId_Alumno },
                        { id: "Comportamiento", label: "Comportamiento", valor: registro.Comportamiento },
                        {
                            id: "Asistencia", label: "Asistencia",
                            tipo: "select",
                            opciones: ["Presente", "Ausente", "Justificado"],
                            valor: registro.Asistencia
                        },
                        { id: "Fecha", label: "Fecha", tipo: "fecha", valor: registro.Fecha },
                        { id: "Observacion", label: "Observacion", valor: registro.Observacion }
                    ],
                    async (datosModificados) => {
                        await fetch(`https://proyectofinal-bd.onrender.com/api/registros/${id}`, {
                            method: "PUT",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(datosModificados)
                        });
                        const data = await response.json();
                        if (!response.ok) {
                            mostrarAlerta(data.message, "error"); // mostramos el mensaje en rojo
                            return; 
                        }
                        mostrarAlerta(data.message, "exito");
                        cargarRegistros();
                    }
                );
            } catch (error) {
                console.error(error);
                alert("No se pudo obtener el registro");
            }
        },
        true
    );
});

document
.getElementById("btnEliminarRegistro")
.addEventListener("click", () => {
    abrirModal(
        "Eliminar Registro",
        [{ id: "Id_Registro", label: "ID Registro" }],
        async (datos) => {
            const id = datos.Id_Registro;
            if (!id) return;
            await fetch(`https://proyectofinal-bd.onrender.com/api/registros/${id}`, {
                method: "DELETE"
            });
            const data = await response.json();
            if (!response.ok) {
                mostrarAlerta(data.message, "error"); // mostramos el mensaje en rojo
                return; 
            }
            mostrarAlerta(data.message, "exito");
            cargarRegistros();
        }
    );
});

document
.getElementById("btnNuevoRepresentar")
.addEventListener("click", () => {
    abrirModal(
        "Nueva Relación",
        [
            { id: "TutorId_Tutor", label: "ID Tutor" },
            { id: "AlumnoId_Alumno", label: "ID Alumno" }
        ],
        async (datos) => {
            await fetch("https://proyectofinal-bd.onrender.com/api/representar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(datos)
            });
            const data = await response.json();
            if (!response.ok) {
                mostrarAlerta(data.message, "error"); // mostramos el mensaje en rojo
                return; 
            }
            mostrarAlerta(data.message, "exito");
            cargarRepresentar();
        }
    );
});

document
.getElementById("btnModificarRepresentar")
.addEventListener("click", () => {
    abrirModal(
        "Seleccionar Relación",
        [
            { id: "TutorId_Tutor", label: "ID Tutor actual" },
            { id: "AlumnoId_Alumno", label: "ID Alumno actual" }
        ],
        async (datos) => {
            const tutorId = datos.TutorId_Tutor;
            const alumnoId = datos.AlumnoId_Alumno;
            if (!tutorId || !alumnoId) return;
            abrirModal(
                "Modificar Relación",
                [
                    { id: "NuevoTutorId", label: "Nuevo ID Tutor", valor: tutorId },
                    { id: "NuevoAlumnoId", label: "Nuevo ID Alumno", valor: alumnoId }
                ],
                async (datosModificados) => {
                    await fetch(`https://proyectofinal-bd.onrender.com/api/representar/${tutorId}/${alumnoId}`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(datosModificados)
                    });
                    const data = await response.json();
                    if (!response.ok) {
                        mostrarAlerta(data.message, "error"); // mostramos el mensaje en rojo
                        return; 
                    }
                    mostrarAlerta(data.message, "exito");
                    cargarRepresentar();
                }
            );
        },
        true
    );
});

document
.getElementById("btnEliminarRepresentar")
.addEventListener("click", () => {
    abrirModal(
        "Eliminar Relación",
        [
            { id: "TutorId_Tutor", label: "ID Tutor" },
            { id: "AlumnoId_Alumno", label: "ID Alumno" }
        ],
        async (datos) => {
            const tutorId = datos.TutorId_Tutor;
            const alumnoId = datos.AlumnoId_Alumno;
            if (!tutorId || !alumnoId) return;
            await fetch(`https://proyectofinal-bd.onrender.com/api/representar/${tutorId}/${alumnoId}`, {
                method: "DELETE"
            });
            const data = await response.json();
            if (!response.ok) {
                mostrarAlerta(data.message, "error"); // mostramos el mensaje en rojo
                return; 
            }
            mostrarAlerta(data.message, "exito");
            cargarRepresentar();
        }
    );
});

// ════════════════════════════════════════════
//   CONSTRUCTOR DE CONSULTAS VISUAL
// ════════════════════════════════════════════

const SCHEMA = {
    Alumno:      { label: "Alumnos",           alias: "al", cols: { Id_Alumno: "ID", GrupoId_Grupo: "ID Grupo", Nombre: "Nombre", Apellido_Paterno: "Apellido paterno", Apellido_Materno: "Apellido materno", Fecha_nacimiento: "Fecha de nacimiento" } },
    Docente:     { label: "Docentes",          alias: "d",  cols: { Id_Docente: "ID", Nombre: "Nombre", Apellido_Paterno: "Apellido paterno", Apellido_Materno: "Apellido materno", Contrasena: "Contraseña" } },
    Tutor:       { label: "Tutores",           alias: "t",  cols: { Id_Tutor: "ID", Nombre: "Nombre", Telefono: "Teléfono", Direccion: "Dirección" } },
    Grupo:       { label: "Grupos",            alias: "g",  cols: { Id_Grupo: "ID Grupo", DocenteId_Docente: "ID Docente", Grado: "Grado", Grupo: "Grupo" } },
    Materia:     { label: "Materias",          alias: "m",  cols: { Id_Materia: "ID", Nombre_Materia: "Nombre de la materia" } },
    Cursar:      { label: "Calificaciones",    alias: "c",  cols: { AlumnoId_Alumno: "ID Alumno", MateriaId_Materia: "ID Materia", Calificacion: "Calificación" } },
    Aviso:       { label: "Avisos",            alias: "av", cols: { Id_Aviso: "ID", DocenteId_Docente: "ID Docente", Titulo: "Título", Mensaje: "Mensaje", Fecha: "Fecha", Categoria: "Categoría" } },
    Cita:        { label: "Citas",             alias: "ci", cols: { Id_Cita: "ID", DocenteId_Docente: "ID Docente", TutorId_Tutor: "ID Tutor", Hora: "Hora", Fecha: "Fecha", Estado: "Estado" } },
    Registro_Diario: { label: "Registros diarios", alias: "r", cols: { Id_Registro: "ID", AlumnoId_Alumno: "ID Alumno", Comportamiento: "Comportamiento", Asistencia: "Asistencia", Fecha: "Fecha", Observacion: "Observacion" } },
    Representar: { label: "Tutores representados", alias: "rp", cols: { TutorId_Tutor: "ID Tutor", AlumnoId_Alumno: "ID Alumno" } }
};

const OP_LABELS = {
    "=":    "es igual a",
    "!=":   "es diferente de",
    ">":    "es mayor que",
    "<":    "es menor que",
    ">=":   "es mayor o igual que",
    "<=":   "es menor o igual que",
    "LIKE": "contiene"
};

const TIPO_JOIN_LABELS = {
    "INNER": "solo los que coinciden en ambas tablas",
    "LEFT":  "todos de la tabla principal + los que coincidan",
    "RIGHT": "todos de la tabla secundaria + los que coincidan"
};

let qbState = { tabla: "", joins: [], cols: [], filters: [], groups: [], orderBy: [], limit: 50 };

function qbGetAllCols() {
    const res = [];
    if (!qbState.tabla) return res;
    const main = SCHEMA[qbState.tabla];
    Object.entries(main.cols).forEach(([col, label]) => {
        res.push({ tbl: qbState.tabla, col, display: qbState.joins.length > 0 ? `${main.label}: ${label}` : label });
    });
    qbState.joins.forEach(j => {
        if (j.tabla && SCHEMA[j.tabla]) {
            Object.entries(SCHEMA[j.tabla].cols).forEach(([col, label]) => {
                res.push({ tbl: j.tabla, col, display: `${SCHEMA[j.tabla].label}: ${label}` });
            });
        }
    });
    return res;
}

function qbRenderTablas() {
    const g = document.getElementById("tablasGrid");
    if (!g) return;
    g.innerHTML = "";
    Object.entries(SCHEMA).forEach(([k, v]) => {
        const c = document.createElement("span");
        c.className = "qb-chip" + (qbState.tabla === k ? " sel-tabla" : "");
        c.textContent = v.label;
        c.onclick = () => {
            qbState = { tabla: k, joins: [], cols: [], filters: [], groups: [], orderBy: [], limit: qbState.limit };
            qbRebuild();
        };
        g.appendChild(c);
    });
    document.getElementById("b1").textContent = qbState.tabla ? SCHEMA[qbState.tabla].label : "ninguna";
}

function qbRenderJoins() {
    const cont = document.getElementById("joinsContainer");
    if (!cont) return;
    cont.innerHTML = "";
    qbState.joins.forEach((j, i) => {
        const row = document.createElement("div");
        row.className = "qb-join-row";

        // Select tabla
        const tabSel = document.createElement("select");
        tabSel.className = "qb-select";
        tabSel.innerHTML = '<option value="">-- elige tabla --</option>' +
            Object.entries(SCHEMA)
                .filter(([k]) => k !== qbState.tabla)
                .map(([k, v]) => `<option value="${k}"${j.tabla === k ? " selected" : ""}>${v.label}</option>`)
                .join("");
        tabSel.onchange = () => { qbState.joins[i].tabla = tabSel.value; qbState.joins[i].onLeft = ""; qbState.joins[i].onRight = ""; qbRebuild(); };
        row.appendChild(Object.assign(document.createElement("span"), { className: "qb-join-label", textContent: "Tabla:" }));
        row.appendChild(tabSel);

        if (j.tabla && SCHEMA[j.tabla]) {
            const allCols = [
                ...Object.entries(SCHEMA[qbState.tabla].cols).map(([col, lbl]) => ({ id: `${qbState.tabla}.${col}`, display: `${SCHEMA[qbState.tabla].label}: ${lbl}` })),
                ...Object.entries(SCHEMA[j.tabla].cols).map(([col, lbl]) => ({ id: `${j.tabla}.${col}`, display: `${SCHEMA[j.tabla].label}: ${lbl}` }))
            ];

            const makeOnSel = (current, placeholder, onChange) => {
                const sel = document.createElement("select");
                sel.className = "qb-select";
                sel.innerHTML = `<option value="">${placeholder}</option>` +
                    allCols.map(x => `<option value="${x.id}"${current === x.id ? " selected" : ""}>${x.display}</option>`).join("");
                sel.onchange = onChange;
                return sel;
            };

            row.appendChild(Object.assign(document.createElement("span"), { className: "qb-join-label", textContent: "donde" }));
            row.appendChild(makeOnSel(j.onLeft, "-- columna A --", e => { qbState.joins[i].onLeft = e.target.value; qbRebuild(); }));
            row.appendChild(Object.assign(document.createElement("span"), { className: "qb-join-label", textContent: "=" }));
            row.appendChild(makeOnSel(j.onRight, "-- columna B --", e => { qbState.joins[i].onRight = e.target.value; qbRebuild(); }));

            const tipSel = document.createElement("select");
            tipSel.className = "qb-select";
            tipSel.innerHTML = Object.entries(TIPO_JOIN_LABELS)
                .map(([k, v]) => `<option value="${k}"${j.tipo === k ? " selected" : ""}>${v}</option>`).join("");
            tipSel.onchange = () => { qbState.joins[i].tipo = tipSel.value; qbRebuild(); };
            row.appendChild(tipSel);
        }

        const rm = document.createElement("button");
        rm.className = "qb-btn-rm";
        rm.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        rm.onclick = () => { qbState.joins.splice(i, 1); qbRebuild(); };
        row.appendChild(rm);

        cont.appendChild(row);
    });
}

function qbRenderCols() {
    const g = document.getElementById("colsGrid");
    if (!g) return;
    g.innerHTML = "";
    if (!qbState.tabla) {
        g.innerHTML = '<span class="qb-hint">Primero elige una tabla.</span>';
        return;
    }
    qbGetAllCols().forEach(({ tbl, col, display }) => {
        const id = `${tbl}.${col}`;
        const c = document.createElement("span");
        c.className = "qb-chip" + (qbState.cols.includes(id) ? " sel-col" : "");
        c.textContent = display;
        c.onclick = () => {
            qbState.cols = qbState.cols.includes(id)
                ? qbState.cols.filter(x => x !== id)
                : [...qbState.cols, id];
            qbRebuild();
        };
        g.appendChild(c);
    });
    const n = qbState.cols.length;
    document.getElementById("b3").textContent = n === 0 ? "todas" : `${n} columna${n !== 1 ? "s" : ""}`;
}

function qbRenderFilters() {
    const cont = document.getElementById("filtersContainer");
    if (!cont || !qbState.tabla) return;
    cont.innerHTML = "";
    const allCols = qbGetAllCols();
    qbState.filters.forEach((f, i) => {
        const row = document.createElement("div");
        row.className = "qb-filter-row";

        if (i > 0) {
            const logSel = document.createElement("select");
            logSel.className = "qb-select";
            logSel.innerHTML = `<option value="AND"${f.logic === "AND" ? " selected" : ""}>y además</option><option value="OR"${f.logic === "OR" ? " selected" : ""}>o también</option>`;
            logSel.onchange = () => { qbState.filters[i].logic = logSel.value; qbRebuild(); };
            row.appendChild(logSel);
        }

        const colSel = document.createElement("select");
        colSel.className = "qb-select";
        colSel.innerHTML = '<option value="">-- columna --</option>' +
            allCols.map(x => `<option value="${x.tbl}.${x.col}"${f.col === `${x.tbl}.${x.col}` ? " selected" : ""}>${x.display}</option>`).join("");
        colSel.onchange = () => { qbState.filters[i].col = colSel.value; qbRebuild(); };
        row.appendChild(colSel);

        const opSel = document.createElement("select");
        opSel.className = "qb-select";
        opSel.innerHTML = Object.entries(OP_LABELS)
            .map(([k, v]) => `<option value="${k}"${f.op === k ? " selected" : ""}>${v}</option>`).join("");
        opSel.onchange = () => { qbState.filters[i].op = opSel.value; qbRebuild(); };
        row.appendChild(opSel);

        const valInp = document.createElement("input");
        valInp.type = "text";
        valInp.className = "qb-input-val";
        valInp.placeholder = "valor";
        valInp.value = f.val || "";
        valInp.oninput = () => {
            qbState.filters[i].val = valInp.value;
            qbBuildSQL(); 
        };
        row.appendChild(valInp);

        const rm = document.createElement("button");
        rm.className = "qb-btn-rm";
        rm.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        rm.onclick = () => { qbState.filters.splice(i, 1); qbRebuild(); };
        row.appendChild(rm);

        cont.appendChild(row);
    });
}

function qbRenderGroups() {
    const g = document.getElementById("groupGrid");
    if (!g || !qbState.tabla) return;
    g.innerHTML = "";
    qbGetAllCols().forEach(({ tbl, col, display }) => {
        const id = `${tbl}.${col}`;
        const c = document.createElement("span");
        c.className = "qb-chip" + (qbState.groups.includes(id) ? " sel-group" : "");
        c.textContent = display;
        c.onclick = () => {
            qbState.groups = qbState.groups.includes(id)
                ? qbState.groups.filter(x => x !== id)
                : [...qbState.groups, id];
            qbRebuild();
        };
        g.appendChild(c);
    });
    document.getElementById("havingRow").style.display = qbState.groups.length > 0 ? "flex" : "none";
}

function qbRenderOrder() {
    const cont = document.getElementById("orderContainer");
    if (!cont || !qbState.tabla) return;
    cont.innerHTML = "";
    const allCols = qbGetAllCols();
    qbState.orderBy.forEach((o, i) => {
        const row = document.createElement("div");
        row.className = "qb-filter-row";

        const colSel = document.createElement("select");
        colSel.className = "qb-select";
        colSel.innerHTML = '<option value="">-- columna --</option>' +
            allCols.map(x => `<option value="${x.tbl}.${x.col}"${o.col === `${x.tbl}.${x.col}` ? " selected" : ""}>${x.display}</option>`).join("");
        colSel.onchange = () => { qbState.orderBy[i].col = colSel.value; qbRebuild(); };
        row.appendChild(colSel);

        const dirSel = document.createElement("select");
        dirSel.className = "qb-select";
        dirSel.innerHTML = `<option value="ASC"${o.dir === "ASC" ? " selected" : ""}>de menor a mayor (A → Z)</option><option value="DESC"${o.dir === "DESC" ? " selected" : ""}>de mayor a menor (Z → A)</option>`;
        dirSel.onchange = () => { qbState.orderBy[i].dir = dirSel.value; qbRebuild(); };
        row.appendChild(dirSel);

        const rm = document.createElement("button");
        rm.className = "qb-btn-rm";
        rm.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        rm.onclick = () => { qbState.orderBy.splice(i, 1); qbRebuild(); };
        row.appendChild(rm);

        cont.appendChild(row);
    });
}

function qbRenderLimit() {
    document.querySelectorAll(".qb-chip-limit").forEach(ch => {
        const v = parseInt(ch.dataset.val);
        ch.classList.toggle("sel-limit", v === qbState.limit);
        ch.onclick = () => { qbState.limit = v; qbRenderLimit(); qbBuildSQL(); };
    });
    document.getElementById("b7").textContent = `${qbState.limit} filas`;
}

function qbAlias(tbl) {
    return SCHEMA[tbl] ? SCHEMA[tbl].alias : tbl;
}

function qbBuildSQL() {
    if (!qbState.tabla) {
        document.getElementById("sqlPreview").textContent = "-- Elige una tabla para comenzar";
        document.getElementById("btnRun").disabled = true;
        return null;
    }

    const mainAlias = qbAlias(qbState.tabla);
    const tieneJoins = qbState.joins.some(j => j.tabla && j.onLeft && j.onRight);
    const tieneGroup = qbState.groups.length > 0;

    // SELECT
    let cols;
    if (qbState.cols.length > 0) {
        cols = qbState.cols.map(c => {
            const [tbl, col] = c.split(".");
            return `${qbAlias(tbl)}.${col}`;
        }).join(", ");
    } else if (tieneGroup) {
        cols = qbState.groups.map(c => {
            const [tbl, col] = c.split(".");
            return `${qbAlias(tbl)}.${col}`;
        }).join(", ");
    } else {
        cols = tieneJoins
            ? [mainAlias, ...qbState.joins.filter(j => j.tabla).map(j => qbAlias(j.tabla))].map(a => `${a}.*`).join(", ")
            : "*";
    }

    if (tieneGroup && !cols.includes("COUNT(")) {
        cols += ", COUNT(*) AS total";
    }

    let sql = `SELECT ${cols}\nFROM ${qbState.tabla} ${mainAlias}`;

    // JOINs
    qbState.joins.forEach(j => {
        if (j.tabla && j.onLeft && j.onRight && SCHEMA[j.tabla]) {
            const [lt, lc] = j.onLeft.split(".");
            const [rt, rc] = j.onRight.split(".");
            sql += `\n${j.tipo || "INNER"} JOIN ${j.tabla} ${qbAlias(j.tabla)} ON ${qbAlias(lt)}.${lc} = ${qbAlias(rt)}.${rc}`;
        }
    });

    // WHERE
    const validFilters = qbState.filters.filter(f => f.col && f.val !== "");
    if (validFilters.length > 0) {
        sql += "\nWHERE ";
        validFilters.forEach((f, i) => {
            const [tbl, col] = f.col.split(".");
            const val = f.op === "LIKE" ? `'%${f.val}%'` : `'${f.val}'`;
            if (i > 0) sql += `\n  ${f.logic || "AND"} `;
            sql += `${qbAlias(tbl)}.${col} ${f.op} ${val}`;
        });
    }

    // GROUP BY
    if (qbState.groups.length > 0) {
        sql += "\nGROUP BY " + qbState.groups.map(c => {
            const [tbl, col] = c.split(".");
            return `${qbAlias(tbl)}.${col}`;
        }).join(", ");
        const hv = document.getElementById("havingVal")?.value || "1";
        const ho = document.getElementById("havingOp")?.value || ">";
        sql += `\nHAVING COUNT(*) ${ho} ${hv}`;
    }

    // ORDER BY
    const validOrders = qbState.orderBy.filter(o => o.col);
    if (validOrders.length > 0) {
        sql += "\nORDER BY " + validOrders.map(o => {
            const [tbl, col] = o.col.split(".");
            return `${qbAlias(tbl)}.${col} ${o.dir || "ASC"}`;
        }).join(", ");
    }

    sql += `\nLIMIT ${qbState.limit}`;

    document.getElementById("sqlPreview").textContent = sql;
    document.getElementById("btnRun").disabled = false;
    return sql;
}

function qbRebuild() {
    qbRenderTablas();
    qbRenderJoins();
    qbRenderCols();
    qbRenderFilters();
    qbRenderGroups();
    qbRenderOrder();
    qbRenderLimit();
    qbBuildSQL();
    document.getElementById("qbResultados").style.display = "none";
    document.getElementById("qbError").style.display = "none";
}

async function qbEjecutar() {
    const btn = document.getElementById("btnRun");
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Consultando...';
    document.getElementById("qbError").style.display = "none";
    document.getElementById("qbResultados").style.display = "none";

    try {
        const validFilters = qbState.filters.filter(f => f.col && f.val !== "");
        const payload = {
            tablas: [
                { nombre: qbState.tabla, alias: qbAlias(qbState.tabla) },
                ...qbState.joins.filter(j => j.tabla && SCHEMA[j.tabla]).map(j => ({ nombre: j.tabla, alias: qbAlias(j.tabla) }))
            ],
            columnas: qbState.cols.length > 0
                ? qbState.cols.map(c => { const [tbl, col] = c.split("."); return `${qbAlias(tbl)}.${col}`; })
                : [],
            joins: qbState.joins.filter(j => j.tabla && j.onLeft && j.onRight && SCHEMA[j.tabla]).map(j => {
                const [lt, lc] = j.onLeft.split(".");
                const [rt, rc] = j.onRight.split(".");
                return {
                    tipo: j.tipo || "INNER",
                    tabla: j.tabla,
                    alias: qbAlias(j.tabla),
                    condicion: `${qbAlias(lt)}.${lc} = ${qbAlias(rt)}.${rc}`
                };
            }),
            condiciones: validFilters.map(f => {
                const [tbl, col] = f.col.split(".");
                return {
                    columna: `${qbAlias(tbl)}.${col}`,
                    operador: f.op,
                    valor: f.op === "LIKE" ? `%${f.val}%` : f.val,
                    logico: f.logic || "AND"
                };
            }),
            groupBy: qbState.groups.map(c => { const [tbl, col] = c.split("."); return `${qbAlias(tbl)}.${col}`; }),
            having: qbState.groups.length > 0
                ? `COUNT(*) ${document.getElementById("havingOp").value} ${document.getElementById("havingVal").value}`
                : "",
            orderBy: qbState.orderBy.filter(o => o.col).map(o => {
                const [tbl, col] = o.col.split(".");
                return { columna: `${qbAlias(tbl)}.${col}`, direccion: o.dir || "ASC" };
            }),
            limite: qbState.limit
        };

        const res = await fetch("https://proyectofinal-bd.onrender.com/api/query/ejecutar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.detalle || data.message);

        qbMostrarResultados(data.resultados, data.total);

    } catch (err) {
        const el = document.getElementById("qbError");
        el.textContent = "⚠ " + err.message;
        el.style.display = "block";
    } finally {
        btn.disabled = false;
        btn.innerHTML = '<i class="fa-solid fa-play"></i> Consultar';
    }
}

function qbMostrarResultados(filas, total) {
    const sec = document.getElementById("qbResultados");
    const thead = document.getElementById("qbTHead");
    const tbody = document.getElementById("qbTBody");
    document.getElementById("qbTotal").textContent = `${total} fila${total !== 1 ? "s" : ""}`;

    thead.innerHTML = "";
    tbody.innerHTML = "";

    if (!filas || filas.length === 0) {
        tbody.innerHTML = '<tr><td colspan="99" style="text-align:center;padding:20px;color:#888">Sin resultados</td></tr>';
        sec.style.display = "block";
        return;
    }

    const tr = document.createElement("tr");
    Object.keys(filas[0]).forEach(col => {
        const th = document.createElement("th");
        th.textContent = col;
        tr.appendChild(th);
    });
    thead.appendChild(tr);

    filas.forEach(fila => {
        const tr = document.createElement("tr");
        Object.values(fila).forEach(val => {
            const td = document.createElement("td");
            td.textContent = val ?? "NULL";
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });

    sec.style.display = "block";
}

function initQueryBuilder() {
    document.getElementById("btnAddJoin")?.addEventListener("click", () => {
        qbState.joins.push({ tabla: "", tipo: "INNER", onLeft: "", onRight: "" });
        qbRebuild();
    });
    document.getElementById("btnAddFilter")?.addEventListener("click", () => {
        qbState.filters.push({ col: "", op: "=", val: "", logic: "AND" });
        qbRebuild();
    });
    document.getElementById("btnAddOrder")?.addEventListener("click", () => {
        qbState.orderBy.push({ col: "", dir: "ASC" });
        qbRebuild();
    });
    document.getElementById("btnClear")?.addEventListener("click", () => {
        qbState = { tabla: "", joins: [], cols: [], filters: [], groups: [], orderBy: [], limit: 50 };
        qbRebuild();
    });
    document.getElementById("btnRun")?.addEventListener("click", qbEjecutar);
    document.getElementById("havingOp")?.addEventListener("change", qbBuildSQL);
    document.getElementById("havingVal")?.addEventListener("input", qbBuildSQL);
    qbRebuild();
}

document.addEventListener("DOMContentLoaded", initQueryBuilder);

// =========================================================
// APARTADO DE CONSULTAS (SQL ESTÁTICAS)
// ---------------------------------------------------------
// Pide al backend la lista de consultas predefinidas
// (definidas en query.controller.js) y dibuja una tarjeta
// por cada una, mostrando: título, descripción, código SQL
// y un botón "Ejecutar" que trae el resultado real desde la
// base de datos.
//
// Todas las peticiones incluyen el header Authorization con
// el token JWT, ya que estas rutas están protegidas por el
// middleware verificarToken + permitirRoles("docente").
// =========================================================

const GRUPOS_CONSULTAS = {
    sencilla: "sencillas",
    agrupada: "agrupadas",
    having: "having",
    multitabla: "multitabla"
};

function obtenerGrupoConsulta(id) {
    const prefijo = Object.keys(GRUPOS_CONSULTAS).find(p => id.startsWith(p));
    return GRUPOS_CONSULTAS[prefijo] || "sencillas";
}

async function cargarConsultasPredefinidas() {

    const contenedores = document.querySelectorAll(".consultas-grid");
    if (contenedores.length === 0) return;

    try {

        const response = await fetch("https://proyectofinal-bd.onrender.com/api/query/predefinidas", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message || "No se pudieron cargar las consultas");
        }

        const consultas = await response.json();

        consultas.forEach(consulta => {

            const grid = document.querySelector(
                `.consultas-grid[data-grupo="${obtenerGrupoConsulta(consulta.id)}"]`
            );

            if (!grid) return;

            const card = document.createElement("div");
            card.className = "consulta-card";

            card.innerHTML = `
                <h4>${consulta.titulo}</h4>
                <p>${consulta.descripcion}</p>
                <div class="consulta-tablas">
                    <span class="consulta-tablas-label">Tablas:</span>
                    ${consulta.tablas.map(t => `<span class="tabla-chip">${t}</span>`).join("")}
                </div>
                <pre class="qb-sql">${consulta.sql}</pre>
                <button class="btn-secondary btn-ejecutar-consulta" data-id="${consulta.id}">
                    <i class="fa-solid fa-play"></i> Ejecutar consulta
                </button>
                <div class="qb-error" style="display:none"></div>
                <div class="qb-results consulta-resultado">
                    <div class="qb-results-header">
                        <span>Resultado</span>
                        <span class="qb-total"></span>
                    </div>
                    <div class="qb-table-scroll">
                        <table>
                            <thead class="qb-thead"></thead>
                            <tbody class="qb-tbody"></tbody>
                        </table>
                    </div>
                </div>
            `;

            grid.appendChild(card);

            card.querySelector(".btn-ejecutar-consulta")
                .addEventListener("click", () => toggleConsultaPredefinida(consulta.id, card));

        });

    } catch (error) {

        contenedores.forEach(grid => {
            grid.innerHTML = `<div class="qb-error" style="display:block">⚠ ${error.message}</div>`;
        });

    }

}

// =========================================================
// TOGGLE: mostrar/ocultar el resultado al hacer click en el
// botón "Ejecutar consulta".
// ---------------------------------------------------------
// - Si la tarjeta NO tiene resultados cargados todavía,
//   ejecuta la consulta contra el backend y los muestra.
// - Si ya tiene resultados visibles, simplemente los oculta
//   (sin volver a pedirlos al servidor) y regresa el botón
//   a su estilo normal.
// - Si ya tiene resultados pero están ocultos, los vuelve a
//   mostrar sin pedirlos de nuevo.
// =========================================================
async function toggleConsultaPredefinida(id, card) {

    const btn = card.querySelector(".btn-ejecutar-consulta");
    const resultados = card.querySelector(".consulta-resultado");

    const yaCargado = resultados.dataset.cargado === "true";

    if (yaCargado) {

        const visible = resultados.classList.toggle("activo");
        btn.classList.toggle("activo", visible);

        btn.innerHTML = visible
            ? '<i class="fa-solid fa-eye-slash"></i> Ocultar resultado'
            : '<i class="fa-solid fa-play"></i> Ejecutar consulta';

        return;

    }

    await ejecutarConsultaPredefinida(id, card);

}

async function ejecutarConsultaPredefinida(id, card) {

    const btn = card.querySelector(".btn-ejecutar-consulta");
    const errorBox = card.querySelector(".qb-error");
    const resultados = card.querySelector(".consulta-resultado");
    const thead = card.querySelector(".qb-thead");
    const tbody = card.querySelector(".qb-tbody");
    const totalEl = card.querySelector(".qb-total");

    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Ejecutando...';
    errorBox.style.display = "none";

    try {

        const response = await fetch(`https://proyectofinal-bd.onrender.com/api/query/predefinida/${id}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.detalle || data.message || "Error al ejecutar la consulta");
        }

        thead.innerHTML = "";
        tbody.innerHTML = "";
        totalEl.textContent = `${data.total} fila${data.total !== 1 ? "s" : ""}`;

        if (data.resultados.length === 0) {
            tbody.innerHTML = '<tr><td colspan="99" style="text-align:center;padding:20px;color:#888">Sin resultados</td></tr>';
        } else {

            const trHead = document.createElement("tr");
            Object.keys(data.resultados[0]).forEach(col => {
                const th = document.createElement("th");
                th.textContent = col;
                trHead.appendChild(th);
            });
            thead.appendChild(trHead);

            data.resultados.forEach(fila => {
                const tr = document.createElement("tr");
                Object.values(fila).forEach(val => {
                    const td = document.createElement("td");
                    td.textContent = val ?? "NULL";
                    tr.appendChild(td);
                });
                tbody.appendChild(tr);
            });

        }

        resultados.classList.add("activo");
        resultados.dataset.cargado = "true";

        btn.classList.add("activo");
        btn.innerHTML = '<i class="fa-solid fa-eye-slash"></i> Ocultar resultado';
        btn.disabled = false;
        return;

    } catch (error) {

        errorBox.textContent = "⚠ " + error.message;
        errorBox.style.display = "block";

        btn.disabled = false;
        btn.innerHTML = '<i class="fa-solid fa-play"></i> Ejecutar consulta';

    }

}

document.addEventListener("DOMContentLoaded", cargarConsultasPredefinidas);

// =========================================================
// BOTÓN "VOLVER AL DASHBOARD" (vista de Consultas)
// ---------------------------------------------------------
// Reutiliza la misma lógica del menú lateral: quita "active"
// de todas las vistas y del menú, y activa el Dashboard.
// =========================================================
document.addEventListener("DOMContentLoaded", () => {

    const btnVolver = document.getElementById("btnVolverDashboard");

    if (!btnVolver) return;

    btnVolver.addEventListener("click", () => {

        const menuItems = document.querySelectorAll(".menu-item");
        const views = document.querySelectorAll(".view");
        const pageTitle = document.getElementById("pageTitle");

        menuItems.forEach(btn => btn.classList.remove("active"));
        views.forEach(view => view.classList.remove("active"));

        const dashboardMenu = document.querySelector('.menu-item[data-view="dashboard"]');
        const dashboardView = document.getElementById("dashboard");

        if (dashboardMenu) dashboardMenu.classList.add("active");
        if (dashboardView) dashboardView.classList.add("active");
        if (pageTitle) pageTitle.textContent = "Dashboard";

    });

});