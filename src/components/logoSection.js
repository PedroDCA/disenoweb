import "../styles/logoSection.css";
import Logo from "../images/logo.png";
import Background from "../images/background.jpg";

function LogoSection() {
  return (
    <div className="logo_section_container">
      <img src={Background} className="w-100 background" alt="Background" />
      <div className="centered pt-5 w-100">
        <div className="d-flex justify-content-center ">
          <img src={Logo} alt="Logo" className="w-25 logo" />
        </div>
        <div className="d-flex justify-content-center pt-5">
          <span>Explorar</span>
          <span>Mejor vendidas</span>
        </div>
      </div>
    </div>
  );
}

export default LogoSection;
