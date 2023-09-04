import Home from "./pages/home";
import Confirmar from "./pages/confirmar";

import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:nombre/:hora/:cancha/:dia/:fecha" element={<Confirmar />} />
      </Routes>
    </div>
  );
}

export default App;
