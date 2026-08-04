import { useState, useEffect } from "react";
import { guardarReserva, actualizarReserva } from "../services/reservaService";
import { obtenerSalas } from "../services/salaService";
import { exito, advertencia } from "../utils/alertas";
import { FaSave, FaEdit } from "react-icons/fa";

import "../styles/formulario.css";

function FormularioReserva({ agregarReserva, reservaEditar }) {

    // Estados del formulario
    const [nombreSolicitante, setNombreSolicitante] = useState("");
    const [fechaReserva, setFechaReserva] = useState("");
    const [horaInicio, setHoraInicio] = useState("");
    const [horaFin, setHoraFin] = useState("");
    const [estado, setEstado] = useState("Pendiente");
    const [idSala, setIdSala] = useState("");

    // Lista de salas disponibles
    const [salas, setSalas] = useState([]);

    // Cargar las salas cuando el componente inicia
    useEffect(() => {

        cargarSalas();

    }, []);

    // Obtener las salas desde el backend
    async function cargarSalas() {

        const datos = await obtenerSalas();

        setSalas(datos);

    }

    // Cargar los datos de la reserva cuando se selecciona para editar
    useEffect(() => {

        if (reservaEditar) {

            setNombreSolicitante(reservaEditar.nombreSolicitante);
            setFechaReserva(reservaEditar.fechaReserva);
            setHoraInicio(reservaEditar.horaInicio);
            setHoraFin(reservaEditar.horaFin);
            setEstado(reservaEditar.estado);
            setIdSala(reservaEditar.sala.idSala);

        }

    }, [reservaEditar]);

    // Guardar o actualizar una reserva
    async function guardarReservaFormulario(e) {

        e.preventDefault();

        // Validaciones del formulario

        if (nombreSolicitante.trim() === "") {

            advertencia("Ingrese el nombre del solicitante");
            return;

        }

        if (fechaReserva === "") {

            advertencia("Seleccione una fecha");
            return;

        }

        if (horaInicio === "") {

            advertencia("Seleccione la hora de inicio");
            return;

        }

        if (horaFin === "") {

            advertencia("Seleccione la hora de fin");
            return;

        }

        if (horaInicio >= horaFin) {

            advertencia("La hora de fin debe ser mayor que la hora de inicio");
            return;

        }

        if (estado === "") {

            advertencia("Seleccione un estado");
            return;

        }

        if (idSala === "") {

            advertencia("Seleccione una sala");
            return;

        }

        // Crear el objeto que será enviado al backend
        const nuevaReserva = {

            nombreSolicitante,

            fechaReserva,

            horaInicio,

            horaFin,

            estado,

            sala: {

                idSala: Number(idSala)

            }

        };

        // Verificar si la operación corresponde a editar o registrar
        if (reservaEditar) {

            const reservaActualizada = await actualizarReserva(

                reservaEditar.idReserva,

                nuevaReserva

            );

            agregarReserva(reservaActualizada);

            exito("Reserva actualizada correctamente.");

        } else {

            const reservaGuardada = await guardarReserva(nuevaReserva);

            agregarReserva(reservaGuardada);

            exito("Reserva guardada correctamente.");

        }

        // Limpiar el formulario
        setNombreSolicitante("");
        setFechaReserva("");
        setHoraInicio("");
        setHoraFin("");
        setEstado("Pendiente");
        setIdSala("");

    }

    return (

        <form className="formulario" onSubmit={guardarReservaFormulario}>

            <h3>

                {reservaEditar ? "Editar Reserva" : "Registrar Reserva"}

            </h3>

            <input
                type="text"
                placeholder="Nombre del solicitante"
                value={nombreSolicitante}
                onChange={(e) => setNombreSolicitante(e.target.value)}
            />

            <input
                type="date"
                value={fechaReserva}
                onChange={(e) => setFechaReserva(e.target.value)}
            />

            <input
                type="time"
                value={horaInicio}
                onChange={(e) => setHoraInicio(e.target.value)}
            />

            <input
                type="time"
                value={horaFin}
                onChange={(e) => setHoraFin(e.target.value)}
            />

            <select
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
            >

                <option value="Pendiente">Pendiente</option>
                <option value="Aprobada">Aprobada</option>
                <option value="Rechazada">Rechazada</option>

            </select>

            <select
                value={idSala}
                onChange={(e) => setIdSala(e.target.value)}
            >

                <option value="">Seleccione una sala</option>

                {salas.map((sala) => (

                    <option
                        key={sala.idSala}
                        value={sala.idSala}
                    >

                        {sala.nombreSala}

                    </option>

                ))}

            </select>

            <button type="submit">

                {reservaEditar ? (
                    <>
                        <FaEdit /> Actualizar Reserva
                    </>
                ) : (
                    <>
                        <FaSave /> Guardar Reserva
                    </>
                )}

            </button>

        </form>

    );

}

export default FormularioReserva;