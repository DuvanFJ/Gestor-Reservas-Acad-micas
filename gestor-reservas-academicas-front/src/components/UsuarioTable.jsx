import "../styles/tabla.css";

import { FaEdit, FaTrash } from "react-icons/fa";

import { eliminarUsuario } from "../services/usuarioService";

import {
    exito,
    confirmar,
    error
} from "../utils/alertas";


function UsuarioTable({
    usuarios,
    onEditar,
    onUsuarioEliminado
}) {

    async function manejarEliminar(usuario) {

        const ok = await confirmar(
            `El usuario "${usuario.nombre}" será eliminado.`
        );

        if (!ok) {
            return;
        }

        try {

            await eliminarUsuario(usuario.idUsuario);

            if (onUsuarioEliminado) {
                await onUsuarioEliminado();
            }

            exito(
                "Usuario eliminado correctamente."
            );

        } catch (error) {

            console.error(
                "Error al eliminar usuario:",
                error
            );

            error(
                "No se pudo eliminar el usuario."
            );
        }
    }


    return (

        <div className="tabla-container">

            <h3>
                Listado de Usuarios
            </h3>

            <table className="tabla">

                <thead>

                    <tr>

                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Rol</th>
                        <th>Acciones</th>

                    </tr>

                </thead>


                <tbody>

                    {usuarios.map((usuario) => (

                        <tr key={usuario.idUsuario}>

                            <td>
                                {usuario.idUsuario}
                            </td>

                            <td>
                                {usuario.nombre}
                            </td>

                            <td>
                                {usuario.correo}
                            </td>

                            <td>
                                {usuario.rol}
                            </td>

                            <td>

                                <div className="acciones">

                                    {/* Editar */}

                                    <button
                                        type="button"
                                        className="editar"
                                        onClick={() =>
                                            onEditar(usuario)
                                        }
                                    >

                                        <FaEdit />

                                        Editar

                                    </button>


                                    {/* Eliminar */}

                                    <button
                                        type="button"
                                        className="eliminar"
                                        onClick={() =>
                                            manejarEliminar(usuario)
                                        }
                                    >

                                        <FaTrash />

                                        Eliminar

                                    </button>

                                </div>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default UsuarioTable;