import { API_BASE_URL } from "./apiConfig";

// URL base del controlador de Reservas
const URL = `${API_BASE_URL}/reservas`;

// Obtener el token JWT
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

// Obtiene todas las reservas
export async function obtenerReservas() {
    const respuesta = await fetch(URL, {
        method: "GET",
        headers: obtenerHeaders()
    });

    if (!respuesta.ok) {
        throw new Error("No se pudieron obtener las reservas.");
    }

    return await respuesta.json();
}

// Guarda una nueva reserva
export async function guardarReserva(reserva) {
    const respuesta = await fetch(URL, {
        method: "POST",
        headers: obtenerHeaders(),
        body: JSON.stringify(reserva)
    });

    if (!respuesta.ok) {
        throw new Error("No se pudo guardar la reserva.");
    }

    return await respuesta.json();
}

// Actualiza una reserva existente
export async function actualizarReserva(id, reserva) {
    const respuesta = await fetch(`${URL}/${id}`, {
        method: "PUT",
        headers: obtenerHeaders(),
        body: JSON.stringify(reserva)
    });

    if (!respuesta.ok) {
        throw new Error("No se pudo actualizar la reserva.");
    }

    return await respuesta.json();
}

// Elimina una reserva
export async function eliminarReserva(id) {
    const respuesta = await fetch(`${URL}/${id}`, {
        method: "DELETE",
        headers: obtenerHeaders()
    });

    if (!respuesta.ok) {
        throw new Error("No se pudo eliminar la reserva.");
    }
}