import "../styles/tabla.css";

import {
    FaEdit,
    FaTrash
} from "react-icons/fa";

function TablaAula({
    aulas,
    editarAula,
    borrarAula
}) {

    return (

        <div className="tabla-container">

            <h3>Listado de Aulas</h3>

            <table className="tabla">

                <thead>

                    <tr>

                        <th>Nombre</th>
                        <th>Edificio</th>
                        <th>Capacidad</th>
                        <th>Tipo</th>
                        <th>Departamento</th>
                        <th>Municipio</th>
                        <th>Estado</th>
                        <th>Acciones</th>

                    </tr>

                </thead>

                <tbody>

                    {aulas.map((aula) => (

                        <tr key={aula.idAula}>

                            <td>
                                {aula.nombre}
                            </td>

                            <td>
                                {aula.edificio}
                            </td>

                            <td>
                                {aula.capacidad}
                            </td>

                            <td>
                                {aula.tipo}
                            </td>

                            <td>
                                {aula.departamento}
                            </td>

                            <td>
                                {aula.municipio}
                            </td>

                            <td>
                                {aula.activa
                                    ? "Activa"
                                    : "Inactiva"}
                            </td>

                            <td>

                                <button
                                    className="editar"
                                    onClick={() =>
                                        editarAula(aula)
                                    }
                                >

                                    <FaEdit />

                                    Editar

                                </button>

                                <button
                                    className="eliminar"
                                    onClick={() =>
                                        borrarAula(aula.idAula)
                                    }
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

export default TablaAula;