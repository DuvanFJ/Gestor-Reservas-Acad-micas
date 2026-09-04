import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardPage from "./pages/DashboardPage";
import SalaPage from "./pages/SalaPage";
import ReservaPage from "./pages/ReservaPage";
import Login from "./pages/Login";
import Usuario from "./pages/Usuario";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                {/* Página principal */}
                <Route path="/" element={<DashboardPage />} />

                {/* Gestión de Salas */}
                <Route path="/salas" element={<SalaPage />} />

                {/* Gestión de Reservas */}
                <Route path="/reservas" element={<ReservaPage />} />

                <Route path="/login" element={<Login />} />

                <Route path="/usuarios" element={<Usuario />} />

            </Routes>

        </BrowserRouter>

    );

}

export default App;