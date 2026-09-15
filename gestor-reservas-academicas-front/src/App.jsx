import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardPage from "./pages/DashboardPage";
import AulaPage from "./pages/AulaPage";
import SalaPage from "./pages/SalaPage";
import ReservaPage from "./pages/ReservaPage";
import Login from "./pages/Login";
import Usuario from "./pages/Usuario";

import RutaProtegida from "./components/RutaProtegida";

function App() {

    return (
        <BrowserRouter>

            <Routes>

                {/* Login: página pública */}
                <Route
                    path="/login"
                    element={<Login />}
                />

                {/* Dashboard: página protegida */}
                <Route
                    path="/"
                    element={
                        <RutaProtegida>
                            <DashboardPage />
                        </RutaProtegida>
                    }
                />

                {/* Salas: página protegida */}
                <Route
                    path="/salas"
                    element={
                        <RutaProtegida>
                            <SalaPage />
                        </RutaProtegida>
                    }
                />

                {/* Aulas: página protegida */}
                <Route
                    path="/aulas"
                    element={
                        <RutaProtegida>
                            <AulaPage />
                        </RutaProtegida>
                    }
                />

                {/* Reservas: página protegida */}
                <Route
                    path="/reservas"
                    element={
                        <RutaProtegida>
                            <ReservaPage />
                        </RutaProtegida>
                    }
                />

                {/* Usuarios: página protegida */}
                <Route
                    path="/usuarios"
                    element={
                        <RutaProtegida>
                            <Usuario />
                        </RutaProtegida>
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;