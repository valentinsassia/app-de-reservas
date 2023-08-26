import "./home.css";

function Home() {
  return (
    <div className="home">
      <div className="contenedor arriba"></div>
      <div className="contenedor menu">
        <div className="menu_oculto"></div>
        <div className="menu_flecha"></div>
      </div>
      <div className="contenedor medio"></div>
      <div className="contenedor abajo"></div>
    </div>
  );
}

export default Home;
