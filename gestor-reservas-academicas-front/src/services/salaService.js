// URL base del controlador de Salas en el backend
const URL = "http://localhost:8080/salas";

// Obtener el token JWT guardado durante el inicio de sesión
function obtenerToken() {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("No hay un token JWT disponible.");
    }

    return token;
}

// Configuración de autorización
function obtenerHeaders() {
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${obtenerToken()}`
    };
}

// Obtiene todas las salas registradas
export async function obtenerSalas() {

    const respuesta = await fetch(URL, {
        method: "GET",
        headers: obtenerHeaders()
    });

    if (!respuesta.ok) {
        throw new Error("No se pudieron obtener las salas.");
    }

    return await respuesta.json();
}

// Guarda una nueva sala
export async function guardarSala(sala) {

    const respuesta = await fetch(URL, {
        method: "POST",
        headers: obtenerHeaders(),
        body: JSON.stringify(sala)
    });

    if (!respuesta.ok) {
        throw new Error("No se pudo guardar la sala.");
    }

    return await respuesta.json();
}

// Actualiza una sala existente
export async function actualizarSala(id, sala) {

    const respuesta = await fetch(`${URL}/${id}`, {
        method: "PUT",
        headers: obtenerHeaders(),
        body: JSON.stringify(sala)
    });

    if (!respuesta.ok) {
        throw new Error("No se pudo actualizar la sala.");
    }

    return await respuesta.json();
}

// Elimina una sala
export async function eliminarSala(id) {

    const respuesta = await fetch(`${URL}/${id}`, {
        method: "DELETE",
        headers: obtenerHeaders()
    });

    if (!respuesta.ok) {
        throw new Error("No se pudo eliminar la sala.");
    }
}