import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import {
    FaDoorOpen,
    FaCalendarCheck,
    FaSchool,
    FaUsers
} from "react-icons/fa";

import { useEffect, useState } from "react";

import {
    obtenerSalas
} from "../services/salaService";

import {
    obtenerReservas
} from "../services/reservaService";

import { Link } from "react-router-dom";

import "../styles/dashboard.css";

function DashboardPage() {

    const [totalSalas, setTotalSalas] = useState(0);
    const [totalReservas, setTotalReservas] = useState(0);

    // ==========================================
    // OBTENER ROL DEL USUARIO
    // ==========================================

    function obtenerRolUsuario() {

        const token = localStorage.getItem("token");

        if (!token) {
            return "";
        }

        try {

            const partes = token.split(".");

            if (partes.length !== 3) {
                return "";
            }

            const payload = JSON.parse(
                atob(partes[1])
            );

            return payload.rol || "";

        } catch (error) {

            console.error(
                "No se pudo obtener el rol del usuario:",
                error
            );

            return "";
        }
    }

    const rolUsuario = obtenerRolUsuario();

    const esAdmin = rolUsuario === "ADMIN";


    // ==========================================
    // CARGAR DATOS
    // ==========================================

    useEffect(() => {

        cargarDatos();

    }, []);


    async function cargarDatos() {

        try {

            const salas = await obtenerSalas();

            const reservas = await obtenerReservas();

            setTotalSalas(
                salas.length
            );

            setTotalReservas(
                reservas.length
            );

        } catch (error) {

            console.error(
                "Error cargando estadísticas:",
                error
            );

        }
    }


    return (

        <>

            {/* =================================
                ENCABEZADO
               ================================= */}

            <Header />


            {/* =================================
                NAVEGACIÓN
               ================================= */}

            <Navbar />


            {/* =================================
                DASHBOARD
               ================================= */}

            <main className="dashboard">


                {/* =================================
                    BIENVENIDA
                   ================================= */}

                <section className="dashboard-bienvenida">

                    <span className="dashboard-etiqueta">
                        PANEL PRINCIPAL
                    </span>

                    <h2>
                        Bienvenido al Gestor de
                        Reservas Académicas
                    </h2>

                    <p>
                        Sistema para la administración
                        de espacios académicos, salas,
                        aulas y reservas.
                    </p>

                </section>


                {/* =================================
                    ESTADÍSTICAS
                   ================================= */}

                <section className="estadisticas">


                    <div className="estadistica">

                        <div className="estadistica-icono-contenedor">

                            <FaDoorOpen />

                        </div>

                        <div>

                            <h2>
                                {totalSalas}
                            </h2>

                            <span>
                                Salas registradas
                            </span>

                        </div>

                    </div>


                    <div className="estadistica">

                        <div className="estadistica-icono-contenedor">

                            <FaCalendarCheck />

                        </div>

                        <div>

                            <h2>
                                {totalReservas}
                            </h2>

                            <span>
                                {esAdmin
                                    ? "Reservas registradas"
                                    : "Mis reservas"}
                            </span>

                        </div>

                    </div>


                </section>


                {/* =================================
                    ACCESOS RÁPIDOS
                   ================================= */}

                <section className="dashboard-seccion">

                    <h3>
                        Accesos rápidos
                    </h3>

                    <p>
                        Selecciona una opción para
                        administrar el sistema.
                    </p>


                    <div className="cards">


                        {/* =================================
                            SALAS
                           ================================= */}

                        <Link
                            to="/salas"
                            className="card"
                        >

                            <FaDoorOpen
                                className="icono"
                            />

                            <h3>
                                {esAdmin
                                    ? "Gestión de Salas"
                                    : "Consultar Salas"}
                            </h3>

                            <p>
                                {esAdmin
                                    ? "Registrar, editar y eliminar salas."
                                    : "Consultar las salas disponibles."}
                            </p>

                        </Link>


                        {/* =================================
                            AULAS
                           ================================= */}

                        <Link
                            to="/aulas"
                            className="card"
                        >

                            <FaSchool
                                className="icono"
                            />

                            <h3>
                                {esAdmin
                                    ? "Gestión de Aulas"
                                    : "Consultar Aulas"}
                            </h3>

                            <p>
                                {esAdmin
                                    ? "Administrar las aulas disponibles."
                                    : "Consultar las aulas disponibles."}
                            </p>

                        </Link>


                        {/* =================================
                            RESERVAS
                           ================================= */}

                        <Link
                            to="/reservas"
                            className="card"
                        >

                            <FaCalendarCheck
                                className="icono"
                            />

                            <h3>
                                {esAdmin
                                    ? "Gestión de Reservas"
                                    : "Mis Reservas"}
                            </h3>

                            <p>
                                {esAdmin
                                    ? "Administrar reservas académicas."
                                    : "Consultar y gestionar mis reservas."}
                            </p>

                        </Link>


                        {/* =================================
                            USUARIOS
                            SOLO ADMIN
                           ================================= */}

                        {esAdmin && (

                            <Link
                                to="/usuarios"
                                className="card"
                            >

                                <FaUsers
                                    className="icono"
                                />

                                <h3>
                                    Gestión de Usuarios
                                </h3>

                                <p>
                                    Administrar los usuarios
                                    del sistema.
                                </p>

                            </Link>

                        )}


                    </div>

                </section>


            </main>


            {/* =================================
                FOOTER
               ================================= */}

            <Footer />

        </>

    );

}

export default DashboardPage;