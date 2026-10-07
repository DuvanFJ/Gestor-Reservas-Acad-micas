import "../styles/tabla.css";
import { FaEdit, FaTrash } from "react-icons/fa";

function TablaSala({
    salas,
    editarSala,
    borrarSala
}) {

    // Obtener el rol desde el token JWT
    function obtenerRolUsuario() {

        const token = localStorage.getItem("token");

        if (!token) {
            return null;
        }

        try {

            const partes = token.split(".");

            if (partes.length !== 3) {
                return null;
            }

            const payload = JSON.parse(
                atob(partes[1])
            );

            return payload.rol;

        } catch (error) {

            console.error(
                "No se pudo obtener el rol del usuario:",
                error
            );

            return null;
        }
    }

    const rolUsuario = obtenerRolUsuario();

    const esAdmin = rolUsuario === "ADMIN";

    return (

        <div className="tabla-container">

            <h3>
                {esAdmin
                    ? "Listado de Salas"
                    : "Salas disponibles"}
            </h3>

            <table className="tabla">

                <thead>

                    <tr>

                        <th>Nombre</th>

                        <th>Tipo</th>

                        <th>Capacidad</th>

                        <th>Ubicación</th>

                        {esAdmin && (
                            <th>Acciones</th>
                        )}

                    </tr>

                </thead>

                <tbody>

                    {/* Recorrer todas las salas registradas */}
                    {salas.map((sala) => (

                        <tr key={sala.idSala}>

                            <td>
                                {sala.nombreSala}
                            </td>

                            <td>
                                {sala.tipoSala}
                            </td>

                            <td>
                                {sala.capacidad}
                            </td>

                            <td>
                                {sala.ubicacion}
                            </td>

                            {esAdmin && (

                                <td>

                                    {/* Botón para editar la sala */}
                                    <button
                                        className="editar"
                                        onClick={() =>
                                            editarSala(sala)
                                        }
                                    >
                                        <FaEdit />
                                        Editar
                                    </button>

                                    {/* Botón para eliminar la sala */}
                                    <button
                                        className="eliminar"
                                        onClick={() =>
                                            borrarSala(
                                                sala.idSala
                                            )
                                        }
                                    >
                                        <FaTrash />
                                        Eliminar
                                    </button>

                                </td>

                            )}

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );
}

export default TablaSala;