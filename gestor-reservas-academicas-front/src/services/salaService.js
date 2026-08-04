// URL base del controlador de Salas en el backend
const URL = "http://localhost:8080/salas";

// Obtiene todas las salas registradas
export async function obtenerSalas() {

    const respuesta = await fetch(URL);

    return await respuesta.json();

}

// Envía una nueva sala al servidor
export async function guardarSala(sala){

    const respuesta = await fetch(URL,{

        method:"POST",

        headers:{

            "Content-Type":"application/json"

        },

        body:JSON.stringify(sala)

    });

    return await respuesta.json();

}

// Actualiza la información de una sala existente
export async function actualizarSala(id, sala){

    const respuesta = await fetch(`${URL}/${id}`,{

        method:"PUT",

        headers:{
            "Content-Type":"application/json"
        },

        body: JSON.stringify(sala)

    });

    return await respuesta.json();

}

// Elimina una sala según su identificador
export async function eliminarSala(id){

    await fetch(`${URL}/${id}`,{

        method:"DELETE"

    });

}