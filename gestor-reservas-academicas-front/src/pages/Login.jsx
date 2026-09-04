import { useState } from "react";
import { iniciarSesion } from "../services/loginService";

function Login() {

    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function manejarLogin(e) {

        e.preventDefault();

        setError("");

        try {

            const respuesta = await iniciarSesion(correo, password);

            // Guardar el JWT recibido por el backend.
            localStorage.setItem("token", respuesta.token);

            alert("Inicio de sesión exitoso.");

        } catch (error) {

            console.error(error);
            setError("Correo o contraseña incorrectos.");
        }
    }

    return (
        <div className="pagina">

            <h1>Iniciar sesión</h1>

            <form onSubmit={manejarLogin}>

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

                <button type="submit">
                    Iniciar sesión
                </button>

                {error && (
                    <p>{error}</p>
                )}

            </form>

        </div>
    );
}

export default Login;