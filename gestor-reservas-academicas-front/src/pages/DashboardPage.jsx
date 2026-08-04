// Componentes de la interfaz
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Iconos
import { FaDoorOpen, FaCalendarCheck } from "react-icons/fa";

// Hooks de React
import { useEffect, useState } from "react";

// Servicios para consumir la API
import { obtenerSalas } from "../services/salaService";
import { obtenerReservas } from "../services/reservaService";

// Navegación
import { Link } from "react-router-dom";

// Estilos
import "../styles/dashboard.css";

function DashboardPage() {

    // Estados para almacenar estadísticas generales
    const [totalSalas, setTotalSalas] = useState(0);
    const [totalReservas, setTotalReservas] = useState(0);

    // Al cargar la página se consultan las estadísticas
    useEffect(() => {

        cargarDatos();

    }, []);

    // Obtiene la cantidad de salas y reservas registradas
    async function cargarDatos() {

        const salas = await obtenerSalas();
        const reservas = await obtenerReservas();

        setTotalSalas(salas.length);
        setTotalReservas(reservas.length);

    }

    return (

        <>

            {/* Encabezado principal */}
            <Header />

            {/* Barra de navegación */}
            <Navbar />

            <div className="dashboard">

                <h2>Bienvenido al Gestor de Reservas Académicas</h2>

                <p>

                    Sistema para la administración de salas y reservas académicas.

                </p>

                {/* Tarjetas con estadísticas generales */}
                <div className="estadisticas">

                    <div className="estadistica">

                        <FaDoorOpen className="estadistica-icono" />

                        <h2>{totalSalas}</h2>

                        <span>Salas registradas</span>

                    </div>

                    <div className="estadistica">

                        <FaCalendarCheck className="estadistica-icono" />

                        <h2>{totalReservas}</h2>

                        <span>Reservas registradas</span>

                    </div>

                </div>

                {/* Accesos rápidos */}
                <div className="cards">

                    <Link to="/salas" className="card">

                        <FaDoorOpen className="icono" />

                        <h3>Gestión de Salas</h3>

                        <p>

                            Registrar, editar y eliminar salas.

                        </p>

                    </Link>

                    <Link to="/reservas" className="card">

                        <FaCalendarCheck className="icono" />

                        <h3>Gestión de Reservas</h3>

                        <p>

                            Administrar reservas académicas.

                        </p>

                    </Link>

                </div>

            </div>

            {/* Pie de página */}
            <Footer />

        </>

    );

}

export default DashboardPage;