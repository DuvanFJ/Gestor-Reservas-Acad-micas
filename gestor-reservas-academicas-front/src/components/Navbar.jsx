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

    // ==========================================
    // OBTENER ROL DEL USUARIO DESDE EL JWT
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

        } catch (e) {

            console.error(
                "No se pudo obtener el rol del usuario:",
                e
            );

            return "";
        }
    }

    const rolUsuario = obtenerRolUsuario();

    const esAdmin = rolUsuario === "ADMIN";

    // ==========================================
    // CERRAR SESIÓN
    // ==========================================

    function cerrarSesion() {

        localStorage.removeItem("token");

        navigate("/login");
    }

    return (

        <nav className="navbar">

            {/* ==================================
                INICIO
                ================================== */}

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


            {/* ==================================
                SALAS
                ADMIN Y USUARIO
                ================================== */}

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


            {/* ==================================
                AULAS
                ADMIN Y USUARIO
                ================================== */}

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


            {/* ==================================
                RESERVAS
                ADMIN Y USUARIO
                ================================== */}

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


            {/* ==================================
                USUARIOS
                SOLO ADMIN
                ================================== */}

            {esAdmin && (

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

            )}


            {/* ==================================
                CERRAR SESIÓN
                ================================== */}

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