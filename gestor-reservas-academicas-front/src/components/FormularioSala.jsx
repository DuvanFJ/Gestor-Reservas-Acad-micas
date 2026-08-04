import { useState, useEffect } from "react";
import { guardarSala, actualizarSala } from "../services/salaService";
import { exito, advertencia } from "../utils/alertas";
import { FaSave, FaEdit } from "react-icons/fa";

import "../styles/formulario.css";

function FormularioSala({ agregarSala, salaEditar, setSalaEditar }) {

    // Estados del formulario
    const [nombre, setNombre] = useState("");
    const [tipo, setTipo] = useState("");
    const [capacidad, setCapacidad] = useState("");
    const [ubicacion, setUbicacion] = useState("");

    // Cargar los datos de la sala cuando se selecciona para editar
    useEffect(() => {

        if (salaEditar) {

            setNombre(salaEditar.nombreSala);
            setTipo(salaEditar.tipoSala);
            setCapacidad(salaEditar.capacidad);
            setUbicacion(salaEditar.ubicacion);

        }

    }, [salaEditar]);

    // Guardar o actualizar una sala
    async function guardarSalaFormulario(e) {

        e.preventDefault();

        // Validaciones del formulario

        if (nombre.trim() === "") {
            advertencia("Ingrese el nombre de la sala");
            return;
        }

        if (tipo.trim() === "") {
            advertencia("Ingrese el tipo de sala");
            return;
        }

        if (capacidad === "" || Number(capacidad) <= 0) {
            advertencia("La capacidad debe ser mayor que cero");
            return;
        }

        if (ubicacion.trim() === "") {
            advertencia("Ingrese la ubicación");
            return;
        }

        // Crear el objeto que será enviado al backend
        const nuevaSala = {

            nombreSala: nombre,
            tipoSala: tipo,
            capacidad: Number(capacidad),
            ubicacion: ubicacion,
            disponible: true

        };

        // Verificar si se está editando o registrando una sala
        if (salaEditar) {

            const salaActualizada = await actualizarSala(
                salaEditar.idSala,
                nuevaSala
            );

            agregarSala(salaActualizada);

            exito("Sala actualizada correctamente.");

            // Salir del modo edición
            setSalaEditar(null);

        } else {

            const salaGuardada = await guardarSala(nuevaSala);

            agregarSala(salaGuardada);

            exito("Sala guardada correctamente.");

        }

        // Limpiar el formulario
        setNombre("");
        setTipo("");
        setCapacidad("");
        setUbicacion("");

    }

    return (

        <form className="formulario" onSubmit={guardarSalaFormulario}>

            <h3>

                {salaEditar ? "Editar Sala" : "Registrar Sala"}

            </h3>

            <input
                type="text"
                placeholder="Nombre de la sala"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
            />

            <input
                type="text"
                placeholder="Tipo de sala"
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
            />

            <input
                type="number"
                placeholder="Capacidad"
                value={capacidad}
                onChange={(e) => setCapacidad(e.target.value)}
            />

            <input
                type="text"
                placeholder="Ubicación"
                value={ubicacion}
                onChange={(e) => setUbicacion(e.target.value)}
            />

            <button type="submit">

                {salaEditar ? (
                    <>
                        <FaEdit /> Actualizar Sala
                    </>
                ) : (
                    <>
                        <FaSave /> Guardar Sala
                    </>
                )}

            </button>

        </form>

    );

}

export default FormularioSala;