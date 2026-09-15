// Componentes
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import FormularioAula from "../components/FormularioAula";
import TablaAula from "../components/TablaAula";

// Hooks de React
import {
    useState,
    useEffect
} from "react";

// Alertas
import {
    exito,
    confirmar
} from "../utils/alertas";

// Icono
import {
    FaDoorOpen
} from "react-icons/fa";

// Servicios
import {
    obtenerAulas,
    eliminarAula
} from "../services/aulaService";

// Estilos
import "../styles/pagina.css";

function AulaPage() {

    // Lista de aulas
    const [aulas, setAulas] = useState([]);

    // Aula que se está editando
    const [aulaEditar, setAulaEditar] = useState(null);

    // Texto de búsqueda
    const [busqueda, setBusqueda] = useState("");

    // Cargar aulas al abrir la página
    useEffect(() => {

        cargarAulas();

    }, []);

    // Consultar aulas
    async function cargarAulas() {

        try {

            const datos = await obtenerAulas();

            setAulas(datos);

        } catch (error) {

            console.error(
                "Error al cargar aulas:",
                error
            );

        }

    }

    // Agregar o actualizar aula en la lista
    function agregarAula(aula) {

        const existe = aulas.find(
            a => a.idAula === aula.idAula
        );

        if (existe) {

            setAulas(

                aulas.map(a =>

                    a.idAula === aula.idAula
                        ? aula
                        : a

                )

            );

        } else {

            setAulas([
                ...aulas,
                aula
            ]);

        }

    }

    // Seleccionar aula para editar
    function editarAula(aula) {

        setAulaEditar(aula);

    }

    // Eliminar aula
    async function borrarAula(id) {

        const ok = await confirmar(
            "Esta aula será eliminada."
        );

        if (!ok) return;

        try {

            await eliminarAula(id);

            setAulas(

                aulas.filter(
                    a => a.idAula !== id
                )

            );

            exito(
                "Aula eliminada correctamente."
            );

        } catch (error) {

            console.error(
                "Error al eliminar aula:",
                error
            );

        }

    }

    // Filtrar aulas
    const aulasFiltradas = aulas.filter((aula) => {

        const texto =
            busqueda.toLowerCase();

        return (

            aula.nombre
                .toLowerCase()
                .includes(texto)

            ||

            aula.edificio
                .toLowerCase()
                .includes(texto)

            ||

            aula.tipo
                .toLowerCase()
                .includes(texto)

            ||

            (aula.departamento || "")
                .toLowerCase()
                .includes(texto)

            ||

            (aula.municipio || "")
                .toLowerCase()
                .includes(texto)

        );

    });

    return (

        <>

            <Header />

            <Navbar />

            <div className="contenido">

                <h2>

                    <FaDoorOpen
                        style={{
                            marginRight: "8px"
                        }}
                    />

                    Gestión de Aulas

                </h2>

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

                <FormularioAula

                    agregarAula={agregarAula}

                    aulaEditar={aulaEditar}

                    setAulaEditar={
                        setAulaEditar
                    }

                />

                <TablaAula

                    aulas={aulasFiltradas}

                    editarAula={editarAula}

                    borrarAula={borrarAula}

                />

            </div>

            <Footer />

        </>

    );

}

export default AulaPage;