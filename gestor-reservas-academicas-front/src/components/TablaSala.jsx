import "../styles/tabla.css";
import { FaEdit, FaTrash } from "react-icons/fa";

function TablaSala({

    salas,

    editarSala,

    borrarSala

}) {

    return (

        <div className="tabla-container">

            <h3>Listado de Salas</h3>

            <table className="tabla">

                <thead>

                    <tr>

                        <th>Nombre</th>
                        <th>Tipo</th>
                        <th>Capacidad</th>
                        <th>Ubicación</th>
                        <th>Acciones</th>

                    </tr>

                </thead>

                <tbody>

                    {/* Recorrer todas las salas registradas */}
                    {salas.map((sala) => (

                        <tr key={sala.idSala}>

                            <td>{sala.nombreSala}</td>
                            <td>{sala.tipoSala}</td>
                            <td>{sala.capacidad}</td>
                            <td>{sala.ubicacion}</td>

                            <td>

                                {/* Botón para editar la sala */}
                                <button
                                    className="editar"
                                    onClick={() => editarSala(sala)}
                                >
                                    <FaEdit />
                                    Editar
                                </button>

                                {/* Botón para eliminar la sala */}
                                <button
                                    className="eliminar"
                                    onClick={() => borrarSala(sala.idSala)}
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

export default TablaSala;