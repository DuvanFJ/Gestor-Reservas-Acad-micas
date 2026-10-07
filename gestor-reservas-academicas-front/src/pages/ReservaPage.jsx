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

    // ==========================================
    // ESTADOS
    // ==========================================

    const [reservas, setReservas] = useState([]);

    const [reservaEditar, setReservaEditar] = useState(null);

    const [busqueda, setBusqueda] = useState("");

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

        } catch (e) {

            console.error(
                "No se pudo obtener el rol:",
                e
            );

            return "";
        }
    }

    const rolUsuario = obtenerRolUsuario();

    const esAdmin = rolUsuario === "ADMIN";

    // ==========================================
    // CARGAR RESERVAS
    // ==========================================

    useEffect(() => {

        cargarReservas();

    }, []);

    async function cargarReservas() {

        try {

            const datos = await obtenerReservas();

            setReservas(datos);

        } catch (e) {

            console.error(
                "Error al cargar las reservas:",
                e
            );
        }
    }

    // ==========================================
    // ACTUALIZAR TABLA DESPUÉS DE GUARDAR
    // ==========================================

    async function agregarReserva() {

        await cargarReservas();

        setReservaEditar(null);

    }

    // ==========================================
    // EDITAR RESERVA
    // ==========================================

    function editarReserva(reserva) {

        setReservaEditar(reserva);

    }

    // ==========================================
    // ELIMINAR RESERVA
    // ==========================================

    async function borrarReserva(id) {

        const ok = await confirmar(
            "Esta reserva será eliminada."
        );

        if (!ok) return;

        try {

            await eliminarReserva(id);

            setReservas(
                reservas.filter(
                    r => r.idReserva !== id
                )
            );

            exito(
                "Reserva eliminada correctamente."
            );

        } catch (e) {

            console.error(
                "Error al eliminar la reserva:",
                e
            );
        }
    }

    // ==========================================
    // BUSCADOR
    // ==========================================

    const reservasFiltradas = reservas.filter(
        (reserva) =>

            reserva.nombreSolicitante
                .toLowerCase()
                .includes(
                    busqueda.toLowerCase()
                ) ||

            reserva.estado
                .toLowerCase()
                .includes(
                    busqueda.toLowerCase()
                ) ||

            (
                reserva.sala &&
                reserva.sala.nombreSala
                    .toLowerCase()
                    .includes(
                        busqueda.toLowerCase()
                    )
            )
    );

    // ==========================================
    // INTERFAZ
    // ==========================================

    return (

        <>

            {/* Encabezado */}

            <Header />

            {/* Menú */}

            <Navbar />

            <div className="contenido">

                <h2>

                    <FaCalendarCheck
                        style={{
                            marginRight: "8px"
                        }}
                    />

                    {esAdmin
                        ? "Gestión de Reservas"
                        : "Mis Reservas"}

                </h2>

                {/* Buscador */}

                <input
                    className="buscador"
                    type="text"
                    placeholder="🔎 Buscar..."
                    value={busqueda}
                    onChange={(e) =>
                        setBusqueda(
                            e.target.value
                        )
                    }
                />

                {/* Formulario */}

                <FormularioReserva
                    agregarReserva={
                        agregarReserva
                    }
                    reservaEditar={
                        reservaEditar
                    }
                />

                {/* Tabla */}

                <TablaReserva
                    reservas={
                        reservasFiltradas
                    }
                    editarReserva={
                        editarReserva
                    }
                    borrarReserva={
                        borrarReserva
                    }
                />

            </div>

            {/* Pie de página */}

            <Footer />

        </>

    );
}

export default ReservaPage;