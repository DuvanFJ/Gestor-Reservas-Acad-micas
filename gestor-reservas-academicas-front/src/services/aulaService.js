// URL base del controlador de Aulas en el backend
const URL = "http://localhost:8080/api/aulas";

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

// Obtiene todas las aulas registradas
export async function obtenerAulas() {

    const respuesta = await fetch(URL, {
        method: "GET",
        headers: obtenerHeaders()
    });

    if (!respuesta.ok) {
        throw new Error("No se pudieron obtener las aulas.");
    }

    return await respuesta.json();

}

// Guarda una nueva aula
export async function guardarAula(aula) {

    const respuesta = await fetch(URL, {

        method: "POST",

        headers: obtenerHeaders(),

        body: JSON.stringify(aula)

    });

    if (!respuesta.ok) {
        throw new Error("No se pudo guardar el aula.");
    }

    return await respuesta.json();

}

// Actualiza un aula existente
export async function actualizarAula(id, aula) {

    const respuesta = await fetch(`${URL}/${id}`, {

        method: "PUT",

        headers: obtenerHeaders(),

        body: JSON.stringify(aula)

    });

    if (!respuesta.ok) {
        throw new Error("No se pudo actualizar el aula.");
    }

    return await respuesta.json();

}

// Elimina un aula
export async function eliminarAula(id) {

    const respuesta = await fetch(`${URL}/${id}`, {

        method: "DELETE",

        headers: obtenerHeaders()

    });

    if (!respuesta.ok) {
        throw new Error("No se pudo eliminar el aula.");
    }

}
