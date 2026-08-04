import { Link, useLocation } from "react-router-dom";
import { FaHome, FaDoorOpen, FaCalendarAlt } from "react-icons/fa";

import "../styles/navbar.css";

// Barra de navegación principal del sistema
function Navbar() {

    // Obtiene la ruta actual para resaltar el menú activo
    const location = useLocation();

    return (

        <nav className="navbar">

            {/* Enlace al Dashboard */}
            <Link
                to="/"
                className={location.pathname === "/" ? "activo" : ""}
            >

                <FaHome /> Inicio

            </Link>

            {/* Enlace al módulo de gestión de salas */}
            <Link
                to="/salas"
                className={location.pathname === "/salas" ? "activo" : ""}
            >

                <FaDoorOpen /> Salas

            </Link>

            {/* Enlace al módulo de gestión de reservas */}
            <Link
                to="/reservas"
                className={location.pathname === "/reservas" ? "activo" : ""}
            >

                <FaCalendarAlt /> Reservas

            </Link>

        </nav>

    );

}

export default Navbar;