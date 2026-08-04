// Componentes
import Header from "../components/Header";
import FormularioSala from "../components/FormularioSala";
import TablaSala from "../components/TablaSala";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Hooks de React
import { useState, useEffect } from "react";

// Alertas personalizadas
import { exito, confirmar } from "../utils/alertas";

// Icono del título
import { FaDoorOpen } from "react-icons/fa";

// Servicios para consumir la API
import {
    obtenerSalas,
    eliminarSala
} from "../services/salaService";

// Estilos
import "../styles/pagina.css";

function SalaPage() {

    // Estados principales
    const [salas, setSalas] = useState([]);
    const [salaEditar, setSalaEditar] = useState(null);
    const [busqueda, setBusqueda] = useState("");

    // Al iniciar la página se cargan las salas registradas
    useEffect(() => {

        cargarSalas();

    }, []);

    // Consulta las salas desde la API
    async function cargarSalas() {

        const datos = await obtenerSalas();

        setSalas(datos);

    }

    // Agrega una nueva sala o actualiza una existente
    function agregarSala(sala) {

        const existe = salas.find(s => s.idSala === sala.idSala);

        if (existe) {

            setSalas(

                salas.map(s =>

                    s.idSala === sala.idSala ? sala : s

                )

            );

        } else {

            setSalas([...salas, sala]);

        }

    }

    // Envía la sala seleccionada al formulario
    function editarSala(sala) {

        setSalaEditar(sala);

    }

    // Elimina una sala después de confirmación
    async function borrarSala(id) {

        const ok = await confirmar("Esta sala será eliminada.");

        if (!ok) return;

        await eliminarSala(id);

        setSalas(

            salas.filter(s => s.idSala !== id)

        );

        exito("Sala eliminada correctamente.");

    }

    // Filtrado por nombre, tipo o ubicación
    const salasFiltradas = salas.filter((sala) =>

        sala.nombreSala.toLowerCase().includes(busqueda.toLowerCase()) ||

        sala.tipoSala.toLowerCase().includes(busqueda.toLowerCase()) ||

        sala.ubicacion.toLowerCase().includes(busqueda.toLowerCase())

    );

    return (

        <>

            {/* Encabezado */}
            <Header />

            {/* Barra de navegación */}
            <Navbar />

            <div className="contenido">

                <h2>

                    <FaDoorOpen style={{ marginRight: "8px" }} />

                    Gestión de Salas

                </h2>

                {/* Campo de búsqueda */}
                <input

                    className="buscador"

                    type="text"

                    placeholder="🔎 Buscar..."

                    value={busqueda}

                    onChange={(e) => setBusqueda(e.target.value)}

                />

                {/* Formulario para registrar o editar */}
                <FormularioSala

                    agregarSala={agregarSala}

                    salaEditar={salaEditar}

                    setSalaEditar={setSalaEditar}

                />

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