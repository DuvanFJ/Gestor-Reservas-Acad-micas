import { useState } from "react";
import { guardarUsuario } from "../services/usuarioService";

function FormularioUsuario({ onUsuarioGuardado }) {

    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const [rol, setRol] = useState("USUARIO");

    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState("");

    async function manejarSubmit(e) {

        e.preventDefault();

        setMensaje("");
        setError("");

        const usuario = {
            nombre,
            correo,
            password,
            rol
        };

        try {

            await guardarUsuario(usuario);

            setMensaje("Usuario registrado correctamente.");

            setNombre("");
            setCorreo("");
            setPassword("");
            setRol("USUARIO");

            if (onUsuarioGuardado) {
                onUsuarioGuardado();
            }

        } catch (error) {

            console.error(error);
            setError("No se pudo registrar el usuario.");
        }
    }

    return (
        <form onSubmit={manejarSubmit}>

            <h2>Registrar usuario</h2>

            <div>
                <label>Nombre:</label>

                <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                />
            </div>

            <div>
                <label>Correo:</label>

                <input
                    type="email"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    required
                />
            </div>

            <div>
                <label>Contraseña:</label>

                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>

            <div>
                <label>Rol:</label>

                <select
                    value={rol}
                    onChange={(e) => setRol(e.target.value)}
                >
                    <option value="USUARIO">USUARIO</option>
                    <option value="ADMIN">ADMIN</option>
                </select>
            </div>

            <button type="submit">
                Registrar usuario
            </button>

            {mensaje && (
                <p>{mensaje}</p>
            )}

            {error && (
                <p>{error}</p>
            )}

        </form>
    );
}

export default FormularioUsuario;