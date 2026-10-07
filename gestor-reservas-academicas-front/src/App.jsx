import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import DashboardPage from "./pages/DashboardPage";
import AulaPage from "./pages/AulaPage";
import SalaPage from "./pages/SalaPage";
import ReservaPage from "./pages/ReservaPage";
import Login from "./pages/Login";
import Usuario from "./pages/Usuario";

import RutaProtegida from "./components/RutaProtegida";

// ==========================================
// OBTENER ROL DESDE EL TOKEN JWT
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

    } catch (error) {

        console.error(
            "No se pudo obtener el rol del usuario:",
            error
        );

        return "";
    }
}


// ==========================================
// RUTA EXCLUSIVA PARA ADMIN
// ==========================================

function RutaAdmin({ children }) {

    const token = localStorage.getItem("token");

    // Si no existe token, volver al login
    if (!token) {

        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }

    const rol = obtenerRolUsuario();

    // Si no es ADMIN, volver al inicio
    if (rol !== "ADMIN") {

        return (
            <Navigate
                to="/"
                replace
            />
        );
    }

    return children;
}


// ==========================================
// APP
// ==========================================

function App() {

    return (

        <BrowserRouter>

            <Routes>

                {/* ==================================
                    LOGIN
                    PÚBLICO
                   ================================== */}

                <Route
                    path="/login"
                    element={
                        <Login />
                    }
                />


                {/* ==================================
                    DASHBOARD
                    PROTEGIDO
                   ================================== */}

                <Route
                    path="/"
                    element={
                        <RutaProtegida>
                            <DashboardPage />
                        </RutaProtegida>
                    }
                />


                {/* ==================================
                    SALAS
                    PROTEGIDO
                   ================================== */}

                <Route
                    path="/salas"
                    element={
                        <RutaProtegida>
                            <SalaPage />
                        </RutaProtegida>
                    }
                />


                {/* ==================================
                    AULAS
                    PROTEGIDO
                   ================================== */}

                <Route
                    path="/aulas"
                    element={
                        <RutaProtegida>
                            <AulaPage />
                        </RutaProtegida>
                    }
                />


                {/* ==================================
                    RESERVAS
                    PROTEGIDO
                   ================================== */}

                <Route
                    path="/reservas"
                    element={
                        <RutaProtegida>
                            <ReservaPage />
                        </RutaProtegida>
                    }
                />


                {/* ==================================
                    USUARIOS
                    SOLO ADMIN
                   ================================== */}

                <Route
                    path="/usuarios"
                    element={
                        <RutaAdmin>
                            <Usuario />
                        </RutaAdmin>
                    }
                />


                {/* ==================================
                    RUTA DESCONOCIDA
                   ================================== */}

                <Route
                    path="*"
                    element={
                        <Navigate
                            to="/"
                            replace
                        />
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;