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

    useEffect(() => {

        cargarDatos();

    }, []);


    async function cargarDatos() {

        try {

            const salas = await obtenerSalas();

            const reservas = await obtenerReservas();

            setTotalSalas(salas.length);

            setTotalReservas(reservas.length);

        } catch (error) {

            console.error(
                "Error cargando estadísticas:",
                error
            );

        }
    }


    return (

        <>

            {/* Encabezado */}

            <Header />


            {/* Navegación */}

            <Navbar />


            {/* Dashboard */}

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
                                Reservas registradas
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


                        {/* Salas */}

                        <Link
                            to="/salas"
                            className="card"
                        >

                            <FaDoorOpen
                                className="icono"
                            />

                            <h3>
                                Gestión de Salas
                            </h3>

                            <p>
                                Registrar, editar y
                                eliminar salas.
                            </p>

                        </Link>


                        {/* Aulas */}

                        <Link
                            to="/aulas"
                            className="card"
                        >

                            <FaSchool
                                className="icono"
                            />

                            <h3>
                                Gestión de Aulas
                            </h3>

                            <p>
                                Administrar las aulas
                                disponibles.
                            </p>

                        </Link>


                        {/* Reservas */}

                        <Link
                            to="/reservas"
                            className="card"
                        >

                            <FaCalendarCheck
                                className="icono"
                            />

                            <h3>
                                Gestión de Reservas
                            </h3>

                            <p>
                                Administrar reservas
                                académicas.
                            </p>

                        </Link>


                        {/* Usuarios */}

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


                    </div>

                </section>


            </main>


            {/* Footer */}

            <Footer />

        </>

    );

}

export default DashboardPage;