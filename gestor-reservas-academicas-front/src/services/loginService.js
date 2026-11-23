import { API_BASE_URL } from "./apiConfig";

// URL del inicio de sesión
const URL = `${API_BASE_URL}/api/auth/login`;

// Inicia sesión y obtiene el token JWT
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