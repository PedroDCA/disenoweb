import Header from "./header";
import LogoSection from "./logoSection";
import Img1 from "../images/blackBottle.png";
import Img2 from "../images/purpleBottle.png";
import Img3 from "../images/metalBottle.png";
import { Link } from "react-router-dom";

function Homepage({ cartElementList, dispatch }) {
  return (
    <>
      <header className="p-3 header_container w-100">
        <Header numberOfItems={cartElementList.length} />
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
            <img src={Img1} alt="Imagen 1" className="Img1" />
            <p>Deportivas</p>
          </Link>     
          <Link to="/search" >
            <img src={Img2} alt="Imagen 2" className="Img2" />
            <p>Térmicas</p>
          </Link>
          <Link to="/search" >
            <img src={Img3} alt="Imagen 3" className="Img3" />
            <p>Hiking</p>
          </Link>
        </div>
      </main>
    </>
  );
}

export default Homepage;
