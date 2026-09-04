const URL = "http://localhost:8080/api/auth/login";

export async function iniciarSesion(correo, password) {

    const respuesta = await fetch(URL, {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            correo,
            password
        })
    });

    if (!respuesta.ok) {
        throw new Error("Correo o contraseña incorrectos");
    }

    return await respuesta.json();
}