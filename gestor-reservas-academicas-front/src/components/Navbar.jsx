import {
    Link,
    useLocation,
    useNavigate
} from "react-router-dom";

import {
    FaHome,
    FaDoorOpen,
    FaCalendarAlt,
    FaSchool,
    FaUsers,
    FaSignOutAlt
} from "react-icons/fa";

import "../styles/navbar.css";

function Navbar() {

    const location = useLocation();
    const navigate = useNavigate();

    function cerrarSesion() {

        localStorage.removeItem("token");

        navigate("/login");
    }

    return (

        <nav className="navbar">

            {/* Inicio */}

            <Link
                to="/"
                className={
                    location.pathname === "/"
                        ? "activo"
                        : ""
                }
            >
                <FaHome />
                <span>Inicio</span>
            </Link>


            {/* Salas */}

            <Link
                to="/salas"
                className={
                    location.pathname === "/salas"
                        ? "activo"
                        : ""
                }
            >
                <FaDoorOpen />
                <span>Salas</span>
            </Link>


            {/* Aulas */}

            <Link
                to="/aulas"
                className={
                    location.pathname === "/aulas"
                        ? "activo"
                        : ""
                }
            >
                <FaSchool />
                <span>Aulas</span>
            </Link>


            {/* Reservas */}

            <Link
                to="/reservas"
                className={
                    location.pathname === "/reservas"
                        ? "activo"
                        : ""
                }
            >
                <FaCalendarAlt />
                <span>Reservas</span>
            </Link>


            {/* Usuarios */}

            <Link
                to="/usuarios"
                className={
                    location.pathname === "/usuarios"
                        ? "activo"
                        : ""
                }
            >
                <FaUsers />
                <span>Usuarios</span>
            </Link>


            {/* Cerrar sesión */}

            <button
                type="button"
                onClick={cerrarSesion}
                className="boton-cerrar-sesion"
            >
                <FaSignOutAlt />
                <span>Cerrar sesión</span>
            </button>

        </nav>
    );
}

export default Navbar;