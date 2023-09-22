import Complejo from "./pages/complejo";
import Confirmar from "./pages/confirmar";
import Gestionar from "./pages/gestionar";
import Login from "./pages/login";

import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/:nombre" element={<Complejo />} />
        <Route path="/:nombre/login/:hora/:cancha/:dia/:fecha" element={<Login />} />
        <Route
          path="/:nombre/:hora/:cancha/:dia/:fecha"
          element={<Confirmar />}
        />
        <Route path="/:nombre/gestionar" element={<Gestionar />} />
      </Routes>
    </div>
  );
}

export default App;
