import "../styles/logoSection.css";
import Logo from "../images/logo.png";
import Background from "../images/background.jpg";

function LogoSection() {
  return (
    <div className="logo_section_container">
      <div className="d-flex justify-content-center ">
          <img src={Logo} alt="Logo" className="w-25 logo" />
        </div>
      <div className="d-flex justify-content-center pt-3">
          <span>Explorar</span>
          <span>Mejor vendidas</span>
      </div>
        <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 bootle-up-link">
          bootle up.
        </a>
        <img src={Background} className="w-100 background" alt="Background"/>
        <div>
          <span className="text-down">¿Cuál es tu estilo? ¡Elige tu botella!</span>
          <span style={{ display: 'block' }}>Bienvenid@ a nuestra tienda de botellas únicas.</span>
        </div>
    </div>
  );
}

export default LogoSection;
