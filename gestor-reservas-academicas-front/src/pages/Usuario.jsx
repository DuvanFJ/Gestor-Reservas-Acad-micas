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

    // Texto utilizado para buscar usuarios
    const [busqueda, setBusqueda] = useState("");

    // Usuario que se está editando
    const [usuarioEditando, setUsuarioEditando] = useState(null);

    useEffect(() => {
        cargarUsuarios();
    }, []);

    async function cargarUsuarios() {

        try {

            setCargando(true);
            setError("");

            const datos = await obtenerUsuarios();

            // Verificamos que realmente recibimos una lista
            if (Array.isArray(datos)) {
                setUsuarios(datos);
            } else {
                setUsuarios([]);
                setError("El servidor no devolvió una lista de usuarios.");
            }

        } catch (error) {

            console.error("Error al cargar usuarios:", error);

            setError(
                "No se pudieron cargar los usuarios. Verifica que hayas iniciado sesión y que el backend esté funcionando."
            );

        } finally {

            setCargando(false);
        }
    }

    // Filtrar usuarios por nombre o correo
    const usuariosFiltrados = usuarios.filter((usuario) => {

        const texto = busqueda.trim().toLowerCase();

        const nombre = usuario.nombre
            ? usuario.nombre.toLowerCase()
            : "";

        const correo = usuario.correo
            ? usuario.correo.toLowerCase()
            : "";

        return (
            nombre.includes(texto) ||
            correo.includes(texto)
        );
    });

    // Se ejecuta cuando presionamos Editar
    function manejarEditar(usuario) {

        setUsuarioEditando(usuario);

        // Lleva el formulario hacia la parte superior de la página
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    // Se ejecuta cuando terminamos de guardar
    async function manejarUsuarioGuardado() {

        setUsuarioEditando(null);

        await cargarUsuarios();
    }

    // Cancelar edición
    function cancelarEdicion() {

        setUsuarioEditando(null);
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
                            usuarioEditando={usuarioEditando}
                            onUsuarioGuardado={manejarUsuarioGuardado}
                            onCancelarEdicion={cancelarEdicion}
                        />

                    </div>


                    <div className="usuarios-listado">

                        <div className="usuarios-listado-header">

                            <h2>
                                Usuarios registrados
                            </h2>

                            <span>
                                {usuariosFiltrados.length} usuario(s)
                            </span>

                        </div>


                        {/* Barra de búsqueda */}

                        <div className="usuarios-busqueda">

                            <input
                                type="text"
                                placeholder="Buscar por nombre o correo..."
                                value={busqueda}
                                onChange={(e) => setBusqueda(e.target.value)}
                            />

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

                            usuariosFiltrados.length === 0 ? (

                                <p className="usuarios-mensaje">
                                    No se encontraron usuarios.
                                </p>

                            ) : (

                                <UsuarioTable
                                    usuarios={usuariosFiltrados}
                                    onEditar={manejarEditar}
                                    onUsuarioEliminado={cargarUsuarios}
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