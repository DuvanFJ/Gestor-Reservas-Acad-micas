// URL base del controlador de Usuarios en el backend
const URL = "http://localhost:8080/api/usuarios";

// Obtiene el token JWT guardado en el navegador
function obtenerToken() {
    return localStorage.getItem("token");
}

// Obtiene todos los usuarios
export async function obtenerUsuarios() {

    const token = obtenerToken();

    const respuesta = await fetch(URL, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (!respuesta.ok) {
        throw new Error("No se pudieron obtener los usuarios");
    }

    return await respuesta.json();
}

// Obtiene un usuario por su ID
export async function obtenerUsuarioPorId(id) {

    const token = obtenerToken();

    const respuesta = await fetch(`${URL}/${id}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (!respuesta.ok) {
        throw new Error("No se pudo obtener el usuario");
    }

    return await respuesta.json();
}

// Registra un nuevo usuario
export async function guardarUsuario(usuario) {

    const token = obtenerToken();

    const respuesta = await fetch(URL, {
        method: "POST",

        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },

        body: JSON.stringify(usuario)
    });

    if (!respuesta.ok) {
        throw new Error("No se pudo registrar el usuario");
    }

    return await respuesta.json();
}

// Actualiza un usuario existente
export async function actualizarUsuario(id, usuario) {

    const token = obtenerToken();

    const respuesta = await fetch(`${URL}/${id}`, {
        method: "PUT",

        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },

        body: JSON.stringify(usuario)
    });

    if (!respuesta.ok) {
        throw new Error("No se pudo actualizar el usuario");
    }

    return await respuesta.json();
}

// Elimina un usuario
export async function eliminarUsuario(id) {

    const token = obtenerToken();

    const respuesta = await fetch(`${URL}/${id}`, {
        method: "DELETE",

        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (!respuesta.ok) {
        throw new Error("No se pudo eliminar el usuario");
    }
}