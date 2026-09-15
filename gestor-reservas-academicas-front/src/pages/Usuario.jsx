import { useEffect, useState } from "react";

import { obtenerUsuarios } from "../services/usuarioService";

import UsuarioTable from "../components/UsuarioTable";
import FormularioUsuario from "../components/FormularioUsuario";

import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { FaUsers } from "react-icons/fa";

import "../styles/usuario.css";

function Usuario() {

    const [usuarios, setUsuarios] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        cargarUsuarios();
    }, []);

    async function cargarUsuarios() {

        try {

            setCargando(true);
            setError("");

            const datos = await obtenerUsuarios();

            setUsuarios(datos);

        } catch (error) {

            console.error(error);

            setError(
                "No se pudieron cargar los usuarios."
            );

        } finally {

            setCargando(false);
        }
    }

    return (
        <>
            <Header />

            <Navbar />

            <main className="usuarios-pagina">

                <section className="usuarios-encabezado">

                    <div className="usuarios-titulo-icono">
                        <FaUsers />
                    </div>

                    <div>
                        <h1>
                            Gestión de Usuarios
                        </h1>

                        <p>
                            Administración de usuarios
                            registrados en el sistema.
                        </p>
                    </div>

                </section>


                <section className="usuarios-contenido">

                    <div className="usuarios-formulario">

                        <FormularioUsuario
                            onUsuarioGuardado={cargarUsuarios}
                        />

                    </div>


                    <div className="usuarios-listado">

                        <div className="usuarios-listado-header">

                            <h2>
                                Usuarios registrados
                            </h2>

                            <span>
                                {usuarios.length} usuario(s)
                            </span>

                        </div>


                        {cargando && (
                            <p className="usuarios-mensaje">
                                Cargando usuarios...
                            </p>
                        )}


                        {error && (
                            <p className="usuarios-error">
                                {error}
                            </p>
                        )}


                        {!cargando && !error && (

                            usuarios.length === 0 ? (

                                <p className="usuarios-mensaje">
                                    No hay usuarios registrados.
                                </p>

                            ) : (

                                <UsuarioTable
                                    usuarios={usuarios}
                                />

                            )
                        )}

                    </div>

                </section>

            </main>

            <Footer />
        </>
    );
}

export default Usuario;