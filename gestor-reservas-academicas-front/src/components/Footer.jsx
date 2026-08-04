import "../styles/footer.css";

// Componente que muestra el pie de página de la aplicación
function Footer() {

    return (

        <footer className="footer">

            {/* Información de derechos del sistema */}
            <p>

                © 2026 Gestor de Reservas Académicas

            </p>

            {/* Autor del proyecto */}
            <p>

                Desarrollado por Duvan FJ

            </p>

            {/* Información académica */}
            <p>

                SENA • Análisis y Desarrollo de Software

            </p>

        </footer>

    );

}

export default Footer;