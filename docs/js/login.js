const loginForm =
    document.getElementById("loginForm");

loginForm.addEventListener(
    "submit",
    async (e) => {

        e.preventDefault();

        const tipoUsuario =
            document
                .getElementById("tipoUsuario")
                .value;

        const usuario =
            document
                .getElementById("usuario")
                .value
                .trim();

        const password =
            document
                .getElementById("password")
                .value
                .trim();

        if (
            !tipoUsuario ||
            !usuario ||
            !password
        ) {

            alert(
                "Completa todos los campos."
            );

            return;

        }

        try {

            const response =
                await fetch(
                    "https://proyectofinal-bd.onrender.com/api/auth/login",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type":
                                "application/json"
                        },
                        body: JSON.stringify({
                            tipoUsuario,
                            usuario,
                            password
                        })
                    }
                );

            const data =
                await response.json();

            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Error al iniciar sesión"
                );

            }

            // Guardar sesión

            localStorage.setItem(
                "usuario",
                JSON.stringify(
                    data.usuario
                )
            );

            localStorage.setItem(
                "token",
                data.token
            );

            localStorage.setItem(
                "tipoUsuario",
                tipoUsuario
            );

            // Redirección

            if (
                tipoUsuario ===
                "docente"
            ) {

                window.location.replace(
                    "docente.html"
                );

            } else {

                window.location.replace(
                    "alumno.html"
                );

            }

        } catch (error) {

            console.error(
                "Error login:",
                error
            );

            alert(
                error.message ||
                "Error al iniciar sesión"
            );

        }

    }
);