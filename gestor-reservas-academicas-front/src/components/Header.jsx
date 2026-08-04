import { FaUniversity } from "react-icons/fa";

// Componente que muestra el encabezado principal de la aplicación
function Header() {

    return (

        <header className="header">

            <h1>

                {/* Icono y nombre de la aplicación */}
                <FaUniversity style={{ marginRight: "10px" }} />
                Gestor de Reservas Académicas

            </h1>

            {/* Descripción del sistema */}
            <p>

                Sistema de Gestión de Reservas de Espacios Académicos

            </p>

        </header>

    );

}

export default Header;