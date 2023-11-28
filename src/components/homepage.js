import Header from "./header";
import LogoSection from "./logoSection";
import Img1 from "../images/filter1.png";
import Img2 from "../images/filter2.png";
import Img3 from "../images/filter3.png";
import Img4 from "../images/filter4.png";
import { Link } from "react-router-dom";
import Footer from './footer';

function Homepage() {
  return (
    <>
      <header className="p-3 header_container w-100">
        <Header />
      </header>
      <main>
        <LogoSection />
        <div className="textAligment">
          <span className="text-down">
            ¿Cuál es tu estilo? ¡Elige tu botella!
          </span>
          <span className="textBienvenido">
            Bienvenid@ a nuestra tienda de botellas únicas.
          </span>
        </div>
        <div className="imageContainer">
          <Link to="/search" >
            <img src={Img1} alt="Imagen 1" className="Img-filter" />
            <p>Deportivas</p>
          </Link>     
          <Link to="/search" >
            <img src={Img2} alt="Imagen 2" className="Img-filter" />
            <p>Rosadas</p>
          </Link>
          <Link to="/search" >
            <img src={Img3} alt="Imagen 3" className="Img-filter" />
            <p>Vidrio</p>
          </Link>
          <Link to="/search" >
            <img src={Img4} alt="Imagen 4" className="Img-filter" />
            <p>Térmicas</p>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Homepage;
