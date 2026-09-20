import { useState, useEffect } from "react";
import { guardarReserva, actualizarReserva } from "../services/reservaService";
import { obtenerSalas } from "../services/salaService";
import { exito, advertencia, error } from "../utils/alertas";
import { FaSave, FaEdit } from "react-icons/fa";
import "../styles/formulario.css";

function FormularioReserva({ agregarReserva, reservaEditar }) {

    const [nombreSolicitante, setNombreSolicitante] = useState("");
    const [fechaReserva, setFechaReserva] = useState("");
    const [horaInicio, setHoraInicio] = useState("");
    const [horaFin, setHoraFin] = useState("");
    const [estado, setEstado] = useState("Pendiente");
    const [idSala, setIdSala] = useState("");
    const [salas, setSalas] = useState([]);

    useEffect(() => {
        cargarSalas();
    }, []);

    async function cargarSalas() {
        try {
            const datos = await obtenerSalas();
            setSalas(datos);
        } catch (e) {
            console.error("Error al cargar las salas:", e);
            error("No se pudieron cargar las salas.");
        }
    }

    useEffect(() => {

        if (reservaEditar) {

            setNombreSolicitante(reservaEditar.nombreSolicitante);
            setFechaReserva(reservaEditar.fechaReserva);
            setHoraInicio(reservaEditar.horaInicio);
            setHoraFin(reservaEditar.horaFin);
            setEstado(reservaEditar.estado);
            setIdSala(reservaEditar.sala?.idSala || "");
        }

    }, [reservaEditar]);

    async function guardarReservaFormulario(e) {

        e.preventDefault();

        // ==============================
        // VALIDACIONES DEL FORMULARIO
        // ==============================

        if (nombreSolicitante.trim() === "") {
            advertencia("Ingrese el nombre del solicitante.");
            return;
        }

        if (fechaReserva === "") {
            advertencia("Seleccione una fecha.");
            return;
        }

        if (horaInicio === "") {
            advertencia("Seleccione la hora de inicio.");
            return;
        }

        if (horaFin === "") {
            advertencia("Seleccione la hora de fin.");
            return;
        }

        if (horaInicio >= horaFin) {
            advertencia("La hora de fin debe ser mayor que la hora de inicio.");
            return;
        }

        if (estado === "") {
            advertencia("Seleccione un estado.");
            return;
        }

        if (idSala === "") {
            advertencia("Seleccione una sala.");
            return;
        }

        // ==============================
        // OBJETO DE LA RESERVA
        // ==============================

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

        // ==============================
        // GUARDAR O ACTUALIZAR
        // ==============================

        try {

            if (reservaEditar) {

                const reservaActualizada = await actualizarReserva(
                    reservaEditar.idReserva,
                    nuevaReserva
                );

                await agregarReserva(reservaActualizada);

                exito("Reserva actualizada correctamente.");

            } else {

                const reservaGuardada = await guardarReserva(nuevaReserva);

                await agregarReserva(reservaGuardada);

                exito("Reserva guardada correctamente.");
            }

            // ==============================
            // LIMPIAR FORMULARIO
            // ==============================

            setNombreSolicitante("");
            setFechaReserva("");
            setHoraInicio("");
            setHoraFin("");
            setEstado("Pendiente");
            setIdSala("");

        } catch (e) {

            console.error("Error al guardar la reserva:", e);

            // ==============================
            // RESERVA DUPLICADA / HORARIO OCUPADO
            // ==============================

            if (e.message.includes("sala ya tiene una reserva")) {

                advertencia(
                    "La sala ya tiene una reserva en ese horario. Seleccione otro horario."
                );

                return;
            }

            // ==============================
            // OTROS ERRORES
            // ==============================

            error(
                "No se pudo guardar la reserva. Verifique los datos e inténtelo nuevamente."
            );
        }
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
                <option value="">
                    Seleccione una sala
                </option>

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