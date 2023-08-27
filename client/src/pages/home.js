import "./home.css";

import Horarios from "./components/horarios";
import Slider from "./components/slider";

function Home() {
  return (
    <div className="home">
      <div className="contenedor arriba"></div>
      <div className="contenedor medio">{<Slider />}</div>
      <div className="contenedor abajo">{<Horarios />}</div>
    </div>
  );
}

export default Home;
