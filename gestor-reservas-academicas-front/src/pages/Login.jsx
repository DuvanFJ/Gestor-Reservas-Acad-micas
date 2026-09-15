import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    FaUniversity,
    FaLock,
    FaEnvelope
} from "react-icons/fa";

import { iniciarSesion } from "../services/loginService";

import "../styles/login.css";

function Login() {

    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    async function manejarLogin(e) {

        e.preventDefault();

        setError("");

        try {

            const respuesta = await iniciarSesion(
                correo,
                password
            );

            // Guardar el JWT recibido por el backend.
            localStorage.setItem(
                "token",
                respuesta.token
            );

            // Ir automáticamente al inicio.
            navigate("/");

        } catch (error) {

            console.error(error);

            setError(
                "Correo o contraseña incorrectos."
            );
        }
    }

    return (

        <div className="login-pagina">

            <div className="login-contenedor">

                {/* =================================
                    PANEL DE PRESENTACIÓN
                   ================================= */}

                <div className="login-presentacion">

                    <div className="login-icono-principal">
                        <FaUniversity />
                    </div>

                    <h1>
                        Gestor de Reservas Académicas
                    </h1>

                    <p>
                        Sistema de Gestión de Reservas
                        de Espacios Académicos
                    </p>

                    <div className="login-linea"></div>

                    <span>
                        Administración de salas, aulas
                        y reservas académicas.
                    </span>

                </div>


                {/* =================================
                    FORMULARIO DE LOGIN
                   ================================= */}

                <div className="login-formulario">

                    <h2>
                        Iniciar sesión
                    </h2>

                    <p className="login-subtitulo">
                        Accede al sistema para continuar
                    </p>

                    <form onSubmit={manejarLogin}>

                        {/* Correo */}

                        <div className="login-campo">

                            <label>
                                Correo electrónico
                            </label>

                            <div className="login-input-contenedor">

                                <FaEnvelope />

                                <input
                                    type="email"
                                    value={correo}
                                    onChange={(e) =>
                                        setCorreo(e.target.value)
                                    }
                                    placeholder="Ingrese su correo"
                                    required
                                />

                            </div>

                        </div>


                        {/* Contraseña */}

                        <div className="login-campo">

                            <label>
                                Contraseña
                            </label>

                            <div className="login-input-contenedor">

                                <FaLock />

                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    placeholder="Ingrese su contraseña"
                                    required
                                />

                            </div>

                        </div>


                        {/* Error */}

                        {error && (

                            <div className="login-error">
                                {error}
                            </div>

                        )}


                        {/* Botón */}

                        <button
                            type="submit"
                            className="login-boton"
                        >
                            Iniciar sesión
                        </button>

                    </form>


                    <p className="login-pie">
                        SENA · Análisis y Desarrollo de Software
                    </p>

                </div>

            </div>

        </div>
    );
}

export default Login;