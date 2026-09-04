import { useEffect, useState } from "react";
import { obtenerUsuarios } from "../services/usuarioService";
import UsuarioTable from "../components/UsuarioTable";
import FormularioUsuario from "../components/FormularioUsuario";

function Usuario() {

    const [usuarios, setUsuarios] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        cargarUsuarios();
    }, []);

    async function cargarUsuarios() {

        try {
            setCargando(true);
            setError("");

            const datos = await obtenerUsuarios();

            setUsuarios(datos);

        } catch (error) {

            console.error(error);
            setError("No se pudieron cargar los usuarios.");

        } finally {

            setCargando(false);
        }
    }

    return (
        <div className="pagina">

            <FormularioUsuario onUsuarioGuardado={cargarUsuarios} />

            <h1>Usuarios</h1>

            {cargando && (
                <p>Cargando usuarios...</p>
            )}

            {error && (
                <p>{error}</p>
            )}

            {!cargando && !error && (
                <div>
                    {usuarios.length === 0 ? (
                        <p>No hay usuarios registrados.</p>
                    ) : (
                        <UsuarioTable usuarios={usuarios} />
                    )}
                </div>
            )}

        </div>
    );
}

export default Usuario;