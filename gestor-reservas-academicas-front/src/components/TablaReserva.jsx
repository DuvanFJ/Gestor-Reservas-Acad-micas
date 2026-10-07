import "../styles/tabla.css";
import { FaEdit, FaTrash } from "react-icons/fa";

function TablaReserva({
    reservas,
    editarReserva,
    borrarReserva
}) {

    // ==========================================
    // OBTENER ROL DEL USUARIO
    // ==========================================

    function obtenerRolUsuario() {

        const token = localStorage.getItem("token");

        if (!token) {
            return "";
        }

        try {

            const partes = token.split(".");

            if (partes.length !== 3) {
                return "";
            }

            const payload = JSON.parse(
                atob(partes[1])
            );

            return payload.rol || "";

        } catch (e) {

            console.error(
                "No se pudo obtener el rol:",
                e
            );

            return "";
        }
    }

    const rolUsuario = obtenerRolUsuario();

    const esAdmin = rolUsuario === "ADMIN";

    return (

        <div className="tabla-container">

            <h3>
                📋 {esAdmin
                    ? "Listado de Reservas"
                    : "Mis Reservas"}
            </h3>

            <table className="tabla">

                <thead>

                    <tr>

                        <th>Solicitante</th>

                        <th>Fecha</th>

                        <th>Hora Inicio</th>

                        <th>Hora Fin</th>

                        <th>Estado</th>

                        <th>Sala</th>

                        <th>Acciones</th>

                    </tr>

                </thead>

                <tbody>

                    {reservas.length === 0 ? (

                        <tr>

                            <td
                                colSpan="7"
                                style={{
                                    textAlign: "center"
                                }}
                            >
                                No hay reservas para mostrar.
                            </td>

                        </tr>

                    ) : (

                        reservas.map((reserva) => (

                            <tr
                                key={reserva.idReserva}
                            >

                                <td>
                                    {
                                        reserva.nombreSolicitante
                                    }
                                </td>

                                <td>
                                    {
                                        reserva.fechaReserva
                                    }
                                </td>

                                <td>
                                    {
                                        reserva.horaInicio
                                    }
                                </td>

                                <td>
                                    {
                                        reserva.horaFin
                                    }
                                </td>

                                <td>

                                    <span
                                        className={
                                            `estado ${reserva.estado
                                                .toLowerCase()}`
                                        }
                                    >
                                        {
                                            reserva.estado
                                        }
                                    </span>

                                </td>

                                <td>

                                    {
                                        reserva.sala
                                            ? reserva.sala.nombreSala
                                            : "Sin sala"
                                    }

                                </td>

                                <td>

                                    {/* ==============================
                                        EDITAR
                                        ============================== */}

                                    <button
                                        className="editar"
                                        onClick={() =>
                                            editarReserva(
                                                reserva
                                            )
                                        }
                                    >

                                        <FaEdit />

                                        Editar

                                    </button>

                                    {/* ==============================
                                        ELIMINAR
                                        ============================== */}

                                    <button
                                        className="eliminar"
                                        onClick={() =>
                                            borrarReserva(
                                                reserva.idReserva
                                            )
                                        }
                                    >

                                        <FaTrash />

                                        Eliminar

                                    </button>

                                </td>

                            </tr>

                        ))

                    )}

                </tbody>

            </table>

        </div>
    );
}

export default TablaReserva;