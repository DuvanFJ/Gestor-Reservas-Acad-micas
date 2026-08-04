// URL base del controlador de Reservas en el backend
const URL = "http://localhost:8080/reservas";

// Obtiene todas las reservas registradas
export async function obtenerReservas() {

    const respuesta = await fetch(URL);

    return await respuesta.json();

}

// Envía una nueva reserva al servidor
export async function guardarReserva(reserva) {

    const respuesta = await fetch(URL, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(reserva)

    });

    return await respuesta.json();

}

// Actualiza la información de una reserva existente
export async function actualizarReserva(id, reserva) {

    const respuesta = await fetch(`${URL}/${id}`, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(reserva)

    });

    return await respuesta.json();

}

// Elimina una reserva según su identificador
export async function eliminarReserva(id) {

    await fetch(`${URL}/${id}`, {

        method: "DELETE"

    });

}