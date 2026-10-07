import Header from "../components/Header";
import FormularioSala from "../components/FormularioSala";
import TablaSala from "../components/TablaSala";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { useState, useEffect } from "react";

import { exito, confirmar } from "../utils/alertas";

import { FaDoorOpen } from "react-icons/fa";

import {
    obtenerSalas,
    eliminarSala
} from "../services/salaService";

import "../styles/pagina.css";

function SalaPage() {

    // Estados principales
    const [salas, setSalas] = useState([]);
    const [salaEditar, setSalaEditar] = useState(null);
    const [busqueda, setBusqueda] = useState("");

    // Obtener el rol del usuario desde el JWT
    function obtenerRolUsuario() {

        const token = localStorage.getItem("token");

        if (!token) {
            return null;
        }

        try {

            const partes = token.split(".");

            if (partes.length !== 3) {
                return null;
            }

            const payload = JSON.parse(
                atob(partes[1])
            );

            return payload.rol;

        } catch (error) {

            console.error(
                "No se pudo obtener el rol del usuario:",
                error
            );

            return null;
        }
    }

    const rolUsuario = obtenerRolUsuario();

    const esAdmin = rolUsuario === "ADMIN";

    // Al iniciar la página se cargan las salas registradas
    useEffect(() => {

        cargarSalas();

    }, []);

    // Consulta las salas desde la API
    async function cargarSalas() {

        try {

            const datos = await obtenerSalas();

            setSalas(datos);

        } catch (error) {

            console.error(
                "Error al cargar las salas:",
                error
            );

        }
    }

    // Agrega una nueva sala o actualiza una existente
    function agregarSala(sala) {

        const existe = salas.find(
            s => s.idSala === sala.idSala
        );

        if (existe) {

            setSalas(

                salas.map(s =>

                    s.idSala === sala.idSala
                        ? sala
                        : s

                )

            );

        } else {

            setSalas([
                ...salas,
                sala
            ]);

        }
    }

    // Envía la sala seleccionada al formulario
    function editarSala(sala) {

        setSalaEditar(sala);

    }

    // Elimina una sala después de confirmación
    async function borrarSala(id) {

        const ok = await confirmar(
            "Esta sala será eliminada."
        );

        if (!ok) return;

        try {

            await eliminarSala(id);

            setSalas(

                salas.filter(
                    s => s.idSala !== id
                )

            );

            exito(
                "Sala eliminada correctamente."
            );

        } catch (error) {

            console.error(
                "Error al eliminar la sala:",
                error
            );

        }
    }

    // Filtrado por nombre, tipo o ubicación
    const salasFiltradas = salas.filter((sala) =>

        sala.nombreSala
            .toLowerCase()
            .includes(
                busqueda.toLowerCase()
            ) ||

        sala.tipoSala
            .toLowerCase()
            .includes(
                busqueda.toLowerCase()
            ) ||

        sala.ubicacion
            .toLowerCase()
            .includes(
                busqueda.toLowerCase()
            )

    );

    return (

        <>

            {/* Encabezado */}
            <Header />

            {/* Barra de navegación */}
            <Navbar />

            <div className="contenido">

                <h2>

                    <FaDoorOpen
                        style={{
                            marginRight: "8px"
                        }}
                    />

                    {esAdmin
                        ? "Gestión de Salas"
                        : "Salas disponibles"}

                </h2>

                {/* Campo de búsqueda */}
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

                {/* 
                    El formulario solamente se muestra
                    para los administradores.
                */}
                {esAdmin && (

                    <FormularioSala

                        agregarSala={agregarSala}

                        salaEditar={salaEditar}

                        setSalaEditar={
                            setSalaEditar
                        }

                    />

                )}

                {/* Tabla con los registros */}
                <TablaSala

                    salas={salasFiltradas}

                    editarSala={editarSala}

                    borrarSala={borrarSala}

                />

            </div>

            {/* Pie de página */}
            <Footer />

        </>

    );

}

export default SalaPage;