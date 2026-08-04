import "../styles/tabla.css";
import { FaEdit, FaTrash } from "react-icons/fa";

function TablaReserva({ reservas, editarReserva, borrarReserva }) {

    return (

        <div className="tabla-container">

            <h3>📋 Listado de Reservas</h3>

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

                    {/* Recorrer todas las reservas registradas */}
                    {reservas.map((reserva) => (

                        <tr key={reserva.idReserva}>

                            <td>{reserva.nombreSolicitante}</td>

                            <td>{reserva.fechaReserva}</td>

                            <td>{reserva.horaInicio}</td>

                            <td>{reserva.horaFin}</td>

                            <td>

                                {/* Mostrar el estado con el estilo correspondiente */}
                                <span
                                    className={`estado ${reserva.estado.toLowerCase()}`}
                                >

                                    {reserva.estado}

                                </span>

                            </td>

                            <td>

                                {/* Mostrar el nombre de la sala asociada */}
                                {reserva.sala
                                    ? reserva.sala.nombreSala
                                    : "Sin sala"}

                            </td>

                            <td>

                                {/* Botón para editar la reserva */}
                                <button
                                    className="editar"
                                    onClick={() => editarReserva(reserva)}
                                >
                                    <FaEdit />
                                    Editar
                                </button>

                                {/* Botón para eliminar la reserva */}
                                <button
                                    className="eliminar"
                                    onClick={() => borrarReserva(reserva.idReserva)}
                                >
                                    <FaTrash />
                                    Eliminar
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default TablaReserva;