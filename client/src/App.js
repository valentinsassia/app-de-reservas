import Complejo from "./pages/complejo";
import Confirmar from "./pages/confirmar";
import Gestionar from "./pages/gestionar";
import Login from "./pages/login";
import Register from "./pages/register";

import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/:nombre/gestionar" element={<Gestionar />} />
        <Route path="/:nombre/login/gestionar" element={<Login />} />

        <Route path="/:nombre" element={<Complejo />} />

        <Route path="/register/misreservas" element={<Register />} />
        <Route path="/misreservas" element={<Register />} />

        <Route
          path="/:nombre/register/:hora/:cancha/:dia/:fecha"
          element={<Register />}
        />
        <Route
          path="/:nombre/:hora/:cancha/:dia/:fecha"
          element={<Confirmar />}
        />
      </Routes>
    </div>
  );
}

export default App;
