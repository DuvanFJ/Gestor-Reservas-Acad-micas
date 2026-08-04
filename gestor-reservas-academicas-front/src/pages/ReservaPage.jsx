// Componentes reutilizables de la interfaz
import Header from "../components/Header";
import FormularioReserva from "../components/FormularioReserva";
import TablaReserva from "../components/TablaReserva";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Alertas personalizadas
import { exito, confirmar } from "../utils/alertas";

// Icono para el título
import { FaCalendarCheck } from "react-icons/fa";

// Hooks de React
import { useState, useEffect } from "react";

// Servicios para consumir la API
import {
    obtenerReservas,
    eliminarReserva
} from "../services/reservaService";

// Estilos de la página
import "../styles/pagina.css";

function ReservaPage() {

    // Lista de reservas
    const [reservas, setReservas] = useState([]);

    // Reserva seleccionada para editar
    const [reservaEditar, setReservaEditar] = useState(null);

    // Texto del buscador
    const [busqueda, setBusqueda] = useState("");

    // Cargar reservas al iniciar la página
    useEffect(() => {

        cargarReservas();

    }, []);

    // Obtener todas las reservas desde el backend
    async function cargarReservas() {

        const datos = await obtenerReservas();

        setReservas(datos);

    }

    // Actualizar la tabla después de guardar o editar
    async function agregarReserva() {

        await cargarReservas();

        // Salir del modo edición
        setReservaEditar(null);

    }

    // Enviar la reserva seleccionada al formulario
    function editarReserva(reserva) {

        setReservaEditar(reserva);

    }

    // Eliminar una reserva
    async function borrarReserva(id) {

        const ok = await confirmar("Esta reserva será eliminada.");

        if (!ok) return;

        await eliminarReserva(id);

        setReservas(

            reservas.filter(r => r.idReserva !== id)

        );

        exito("Reserva eliminada correctamente.");

    }

    // Filtrar reservas según el texto ingresado
    const reservasFiltradas = reservas.filter((reserva) =>

        reserva.nombreSolicitante
            .toLowerCase()
            .includes(busqueda.toLowerCase()) ||

        reserva.estado
            .toLowerCase()
            .includes(busqueda.toLowerCase()) ||

        (reserva.sala &&
            reserva.sala.nombreSala
                .toLowerCase()
                .includes(busqueda.toLowerCase()))

    );

    return (

        <>

            {/* Encabezado */}
            <Header />

            {/* Menú de navegación */}
            <Navbar />

            <div className="contenido">

                <h2>
                    <FaCalendarCheck style={{ marginRight: "8px" }} />
                    Gestión de Reservas
                </h2>

                {/* Buscador */}
                <input
                    className="buscador"
                    type="text"
                    placeholder="🔎 Buscar..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                />

                {/* Formulario */}
                <FormularioReserva
                    agregarReserva={agregarReserva}
                    reservaEditar={reservaEditar}
                />

                {/* Tabla */}
                <TablaReserva
                    reservas={reservasFiltradas}
                    editarReserva={editarReserva}
                    borrarReserva={borrarReserva}
                />

            </div>

            {/* Pie de página */}
            <Footer />

        </>

    );

}

export default ReservaPage;