import "./home.css";

import Horarios from "./components/horarios";
import Slider from "./components/slider";
import Navegacion from "./components/navegacion";

function Home() {
  return (
    <div className="home">
      <div className="contenedor arriba">{<Navegacion />}</div>
      <div className="contenedor menu">
        <ion-icon name="chevron-down-outline"></ion-icon>
      </div>
      <div className="contenedor medio">{<Slider />}</div>
      <div className="contenedor abajo">{<Horarios />}</div>
    </div>
  );
}

export default Home;
