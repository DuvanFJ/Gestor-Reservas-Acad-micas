import { useEffect, useState } from "react";

import {
    guardarUsuario,
    actualizarUsuario
} from "../services/usuarioService";

import {
    exito,
    error
} from "../utils/alertas";


function FormularioUsuario({
    usuarioEditando,
    onUsuarioGuardado,
    onCancelarEdicion
}) {

    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const [rol, setRol] = useState("USUARIO");


    // Cuando seleccionamos un usuario para editar,
    // cargamos sus datos en el formulario.
    useEffect(() => {

        if (usuarioEditando) {

            setNombre(usuarioEditando.nombre || "");
            setCorreo(usuarioEditando.correo || "");
            setPassword("");
            setRol(usuarioEditando.rol || "USUARIO");

        } else {

            limpiarFormulario();

        }

    }, [usuarioEditando]);


    function limpiarFormulario() {

        setNombre("");
        setCorreo("");
        setPassword("");
        setRol("USUARIO");

    }


    async function manejarSubmit(e) {

        e.preventDefault();


        try {

            // ==========================================
            // MODO EDITAR
            // ==========================================

            if (usuarioEditando) {

                const usuarioActualizado = {
                    nombre,
                    correo,
                    rol
                };


                // Si se escribió una contraseña,
                // también la enviamos para actualizarla.
                if (password.trim() !== "") {

                    usuarioActualizado.password = password;

                }


                await actualizarUsuario(
                    usuarioEditando.idUsuario,
                    usuarioActualizado
                );


                exito(
                    "Usuario actualizado correctamente."
                );

            }


            // ==========================================
            // MODO CREAR
            // ==========================================

            else {

                const usuario = {
                    nombre,
                    correo,
                    password,
                    rol
                };


                await guardarUsuario(usuario);


                exito(
                    "Usuario registrado correctamente."
                );

            }


            // Limpiar formulario
            limpiarFormulario();


            // Actualizar listado
            if (onUsuarioGuardado) {

                await onUsuarioGuardado();

            }


            // Salir del modo edición
            if (usuarioEditando && onCancelarEdicion) {

                onCancelarEdicion();

            }


        } catch (e) {

            console.error(
                "Error al guardar usuario:",
                e
            );


            error(
                usuarioEditando
                    ? "No se pudo actualizar el usuario."
                    : "No se pudo registrar el usuario."
            );

        }

    }


    return (

        <form onSubmit={manejarSubmit}>

            <h2>

                {usuarioEditando
                    ? "Editar usuario"
                    : "Registrar usuario"
                }

            </h2>


            <div>

                <label>
                    Nombre:
                </label>

                <input
                    type="text"
                    value={nombre}
                    onChange={(e) =>
                        setNombre(e.target.value)
                    }
                    required
                />

            </div>


            <div>

                <label>
                    Correo:
                </label>

                <input
                    type="email"
                    value={correo}
                    onChange={(e) =>
                        setCorreo(e.target.value)
                    }
                    required
                />

            </div>


            <div>

                <label>
                    Contraseña:
                </label>

                <input
                    type="password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                    required={!usuarioEditando}
                    placeholder={
                        usuarioEditando
                            ? "Dejar vacío para conservar la actual"
                            : ""
                    }
                />

            </div>


            <div>

                <label>
                    Rol:
                </label>

                <select
                    value={rol}
                    onChange={(e) =>
                        setRol(e.target.value)
                    }
                >

                    <option value="USUARIO">
                        USUARIO
                    </option>

                    <option value="ADMIN">
                        ADMIN
                    </option>

                </select>

            </div>


            <button type="submit">

                {usuarioEditando
                    ? "Actualizar usuario"
                    : "Registrar usuario"
                }

            </button>


            {usuarioEditando && (

                <button
                    type="button"
                    onClick={onCancelarEdicion}
                >
                    Cancelar
                </button>

            )}

        </form>
    );
}

export default FormularioUsuario;