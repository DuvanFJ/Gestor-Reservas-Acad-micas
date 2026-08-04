import Swal from "sweetalert2";

export function exito(mensaje) {

    Swal.fire({
        icon: "success",
        title: "Correcto",
        text: mensaje,
        timer: 1800,
        showConfirmButton: false
    });

}

export function advertencia(mensaje) {

    Swal.fire({
        icon: "warning",
        title: "Atención",
        text: mensaje
    });

}

export function error(mensaje) {

    Swal.fire({
        icon: "error",
        title: "Error",
        text: mensaje
    });

}

export async function confirmar(mensaje) {

    const resultado = await Swal.fire({

        title: "¿Está seguro?",
        text: mensaje,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Sí",
        cancelButtonText: "Cancelar"

    });

    return resultado.isConfirmed;

}