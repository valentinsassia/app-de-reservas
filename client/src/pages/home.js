import Slider from "./components/slider";
import "./home.css";

function Home() {
  return (
    <div className="home">
      <div className="contenedor arriba"></div>
      <div className="contenedor menu"></div>
      <div className="contenedor medio">
        {<Slider />}
      </div>
      <div className="contenedor abajo"></div>
    </div>
  );
}

export default Home;
