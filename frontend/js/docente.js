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

            fetch("http://localhost:3000/api/alumnos"),
            fetch("http://localhost:3000/api/docentes"),
            fetch("http://localhost:3000/api/grupos"),
            fetch("http://localhost:3000/api/materias")

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
                "http://localhost:3000/api/alumnos"
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
                    <td>${alumno.Fecha_nacimiento || ""}</td>
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
                "http://localhost:3000/api/docentes"
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
                "http://localhost:3000/api/tutores"
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
                "http://localhost:3000/api/grupos"
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
                "http://localhost:3000/api/materias"
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
                "http://localhost:3000/api/calificaciones"
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
                "http://localhost:3000/api/avisos"
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
                "http://localhost:3000/api/citas"
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
                "http://localhost:3000/api/registros"
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

function abrirModal(
    titulo,
    campos,
    callback
){

    modalTitulo.textContent =
        titulo;

    camposModal.innerHTML =
        "";

    campos.forEach(campo => {

        if(campo.tipo === "select"){

            let opciones = "";

            campo.opciones.forEach(op => {

                opciones += `
                    <option value="${op}">
                        ${op}
                    </option>
                `;

            });

            camposModal.innerHTML += `
                <label>${campo.label}</label>

                <select
                    id="${campo.id}"
                    required
                >
                    ${opciones}
                </select>
            `;

        }else{

            camposModal.innerHTML += `
                <input
                    type="${campo.tipo || "text"}"
                    id="${campo.id}"
                    placeholder="${campo.label}"
                    value="${campo.valor || ""}"
                    required
                >
            `;

        }

    });

    modal.style.display =
        "flex";

    formModal.onsubmit =
        async (e) => {

            e.preventDefault();

            const datos = {};

            campos.forEach(campo => {

                datos[campo.id] =
                    document.getElementById(
                        campo.id
                    ).value;

            });

            await callback(datos);

            modal.style.display =
                "none";
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
                    label:"Nombre"
                },
                {
                    id:"Apellido_Paterno",
                    label:"Apellido Paterno"
                },
                {
                    id:"Apellido_Materno",
                    label:"Apellido Materno"
                },
                {
                    id:"GrupoId_Grupo",
                    label:"ID Grupo"
                },
                {
                    id:"Fecha_nacimiento",
                    label:"Fecha Nacimiento"
                }
            ],

            async (datos) => {

                await fetch(
                    "http://localhost:3000/api/alumnos",
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

                cargarAlumnos();
            }
        );

    });

 document
    .getElementById("btnModificarAlumno")
    .addEventListener("click", () => {

        const id =
            prompt(
                "ID Alumno"
            );

        if(!id) return;

        abrirModal(
            "Modificar Alumno",
            [
                {
                    id:"Nombre",
                    label:"Nombre"
                },
                {
                    id:"Apellido_Paterno",
                    label:"Apellido Paterno"
                },
                {
                    id:"Apellido_Materno",
                    label:"Apellido Materno"
                },
                {
                    id:"GrupoId_Grupo",
                    label:"ID Grupo"
                },
                {
                    id:"Fecha_nacimiento",
                    label:"Fecha"
                }
            ],

            async (datos) => {

                await fetch(
                    `http://localhost:3000/api/alumnos/${id}`,
                    {
                        method:"PUT",
                        headers:{
                            "Content-Type":
                            "application/json"
                        },
                        body:JSON.stringify(
                            datos
                        )
                    }
                );

                cargarAlumnos();
            }
        );

    });
    
document
    .getElementById("btnEliminarAlumno")
    .addEventListener("click", async () => {

        const id =
            prompt(
                "ID Alumno"
            );

        if(!id) return;

        if(
            !confirm(
                "¿Eliminar alumno?"
            )
        ){
            return;
        }

        await fetch(
            `http://localhost:3000/api/alumnos/${id}`,
            {
                method:"DELETE"
            }
        );

        cargarAlumnos();

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
                "http://localhost:3000/api/docentes",
                {
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify(datos)
                }
            );

            cargarDocentes();
        }
    );

});

document
.getElementById("btnModificarDocente")
.addEventListener("click",()=>{

    const id = prompt("ID Docente");

    if(!id) return;

    abrirModal(
        "Modificar Docente",
        [
            {id:"Nombre",label:"Nombre"},
            {id:"Apellido_Paterno",label:"Apellido Paterno"},
            {id:"Apellido_Materno",label:"Apellido Materno"},
            {id:"Contrasena",label:"Contraseña"}
        ],

        async(datos)=>{

            await fetch(
                `http://localhost:3000/api/docentes/${id}`,
                {
                    method:"PUT",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify(datos)
                }
            );

            cargarDocentes();
        }
    );

});

document
.getElementById("btnEliminarDocente")
.addEventListener("click", async()=>{

    const id = prompt("ID Docente");

    if(!id) return;

    await fetch(
        `http://localhost:3000/api/docentes/${id}`,
        {
            method:"DELETE"
        }
    );

    cargarDocentes();

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
                "http://localhost:3000/api/tutores",
                {
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify(datos)
                }
            );

            cargarTutores();
        }
    );

});

document
.getElementById("btnModificarTutor")
.addEventListener("click",()=>{

    const id = prompt("ID Tutor");

    if(!id) return;

    abrirModal(
        "Modificar Tutor",
        [
            {id:"Nombre",label:"Nombre"},
            {id:"Telefono",label:"Teléfono"},
            {id:"Direccion",label:"Dirección"}
        ],

        async(datos)=>{

            await fetch(
                `http://localhost:3000/api/tutores/${id}`,
                {
                    method:"PUT",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify(datos)
                }
            );

            cargarTutores();
        }
    );
});

document
.getElementById("btnEliminarTutor")
.addEventListener("click",async()=>{

    const id = prompt("ID Tutor");

    if(!id) return;

    await fetch(
        `http://localhost:3000/api/tutores/${id}`,
        {
            method:"DELETE"
        }
    );

    cargarTutores();
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
                "http://localhost:3000/api/grupos",
                {
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify(datos)
                }
            );

            cargarGrupos();
        }
    );

});

document
.getElementById("btnModificarGrupo")
.addEventListener("click",()=>{

    const id = prompt("ID Grupo");

    if(!id) return;

    abrirModal(
        "Modificar Grupo",
        [
            {id:"DocenteId_Docente",label:"ID Docente"},
            {id:"Grado",label:"Grado"},
            {id:"Grupo",label:"Grupo"}
        ],

        async(datos)=>{

            await fetch(
                `http://localhost:3000/api/grupos/${id}`,
                {
                    method:"PUT",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify(datos)
                }
            );

            cargarGrupos();
        }
    );
});

document
.getElementById("btnEliminarGrupo")
.addEventListener("click",async()=>{

    const id = prompt("ID Grupo");

    if(!id) return;

    await fetch(
        `http://localhost:3000/api/grupos/${id}`,
        {
            method:"DELETE"
        }
    );

    cargarGrupos();
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
                "http://localhost:3000/api/materias",
                {
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify(datos)
                }
            );

            cargarMaterias();
        }
    );

});

document
.getElementById("btnModificarMateria")
.addEventListener("click",()=>{

    const id = prompt("ID Materia");

    if(!id) return;

    abrirModal(
        "Modificar Materia",
        [
            {
                id:"Nombre_Materia",
                label:"Materia"
            }
        ],

        async(datos)=>{

            await fetch(
                `http://localhost:3000/api/materias/${id}`,
                {
                    method:"PUT",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify(datos)
                }
            );

            cargarMaterias();
        }
    );
});

document
.getElementById("btnEliminarMateria")
.addEventListener("click",async()=>{

    const id = prompt("ID Materia");

    if(!id) return;

    await fetch(
        `http://localhost:3000/api/materias/${id}`,
        {
            method:"DELETE"
        }
    );

    cargarMaterias();
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
                "http://localhost:3000/api/calificaciones",
                {
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify(datos)
                }
            );

            cargarCalificaciones();
        }
    );

});

document
.getElementById("btnModificarCalificacion")
.addEventListener("click",()=>{

    const alumno =
        prompt("ID Alumno");

    const materia =
        prompt("ID Materia");

    if(!alumno || !materia)
        return;

    abrirModal(
        "Modificar Calificación",
        [
            {
                id:"Calificacion",
                label:"Calificación"
            }
        ],

        async(datos)=>{

            await fetch(
                `http://localhost:3000/api/calificaciones/${alumno}/${materia}`,
                {
                    method:"PUT",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify(datos)
                }
            );

            cargarCalificaciones();
        }
    );
});

document
.getElementById("btnEliminarCalificacion")
.addEventListener("click",async()=>{

    const alumno =
        prompt("ID Alumno");

    const materia =
        prompt("ID Materia");

    if(!alumno || !materia)
        return;

    await fetch(
        `http://localhost:3000/api/calificaciones/${alumno}/${materia}`,
        {
            method:"DELETE"
        }
    );

    cargarCalificaciones();
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
                label:"Fecha"
            },
            {
                id:"Categoria",
                label:"Categoría"
            }
        ],

        async(datos)=>{

            await fetch(
                "http://localhost:3000/api/avisos",
                {
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify(datos)
                }
            );

            cargarAvisos();
        }
    );

});

document
.getElementById("btnModificarAviso")
.addEventListener("click",()=>{

    const id = prompt("ID Aviso");

    if(!id) return;

    abrirModal(
        "Modificar Aviso",
        [
            {id:"DocenteId_Docente",label:"ID Docente"},
            {id:"Titulo",label:"Título"},
            {id:"Mensaje",label:"Mensaje"},
            {id:"Fecha",label:"Fecha"},
            {id:"Categoria",label:"Categoría"}
        ],

        async(datos)=>{

            await fetch(
                `http://localhost:3000/api/avisos/${id}`,
                {
                    method:"PUT",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify(datos)
                }
            );

            cargarAvisos();
        }
    );
});

document
.getElementById("btnEliminarAviso")
.addEventListener("click",async()=>{

    const id = prompt("ID Aviso");

    if(!id) return;

    await fetch(
        `http://localhost:3000/api/avisos/${id}`,
        {
            method:"DELETE"
        }
    );

    cargarAvisos();
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
                label:"Fecha"
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
.addEventListener("click",()=>{

    const id = prompt("ID Cita");

    if(!id) return;

    abrirModal(
        "Modificar Cita",
        [
            {id:"DocenteId_Docente",label:"ID Docente"},
            {id:"TutorId_Tutor",label:"ID Tutor"},
            {id:"Hora",label:"Hora"},
            {id:"Fecha",label:"Fecha"},
            {id:"Estado",label:"Estado",tipo:"select",opciones:["Agendada","No agendada"]}
        ],

        async(datos)=>{

            await fetch(
                `http://localhost:3000/api/citas/${id}`,
                {
                    method:"PUT",
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
.getElementById("btnEliminarCita")
.addEventListener("click",async()=>{

    const id = prompt("ID Cita");

    if(!id) return;

    await fetch(
        `http://localhost:3000/api/citas/${id}`,
        {
            method:"DELETE"
        }
    );

    cargarCitas();
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
                label:"Fecha"
            },
            {
                id:"Observaciones",
                label:"Observaciones"
            }
        ],

        async(datos)=>{

            await fetch(
                "http://localhost:3000/api/registros",
                {
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify(datos)
                }
            );

            cargarRegistros();
        }
    );

});

document
.getElementById("btnModificarRegistro")
.addEventListener("click",()=>{

    const id = prompt("ID Registro");

    if(!id) return;

    abrirModal(
        "Modificar Registro",
        [
            {id:"AlumnoId_Alumno",label:"ID Alumno"},
            {id:"Comportamiento",label:"Comportamiento"},
            {id:"Asistencia",label:"Asistencia",tipo:"select",opciones:["Presente","Ausente","Justificado"]},
            {id:"Fecha",label:"Fecha"},
            {id:"Observaciones",label:"Observaciones"}
        ],

        async(datos)=>{

            await fetch(
                `http://localhost:3000/api/registros/${id}`,
                {
                    method:"PUT",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify(datos)
                }
            );

            cargarRegistros();
        }
    );
});

document
.getElementById("btnEliminarRegistro")
.addEventListener("click",async()=>{

    const id = prompt("ID Registro");

    if(!id) return;

    await fetch(
        `http://localhost:3000/api/registros/${id}`,
        {
            method:"DELETE"
        }
    );

    cargarRegistros();
});
