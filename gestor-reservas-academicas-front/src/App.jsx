import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardPage from "./pages/DashboardPage";
import SalaPage from "./pages/SalaPage";
import ReservaPage from "./pages/ReservaPage";

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

            </Routes>

        </BrowserRouter>

    );

}

export default App;