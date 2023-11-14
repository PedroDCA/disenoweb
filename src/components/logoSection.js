import "../styles/logoSection.css";
import Logo from "../images/logo.png";
import Background from "../images/background.jpg";
import { Link } from "react-router-dom";

function LogoSection() 
{
  return (
  <div className="logo_section_container">
      <div className="d-flex justify-content-center ">
          <img src={Logo} alt="Logo" className="w-25 logo" />
      </div>
      <div className="d-flex justify-content-center pt-3">
          <span>Explorar🠻</span>
          <span>Mejor vendidas</span>
      </div>
        <Link to="/home" className="d-flex align-items-center mb-2 mb-lg-0 bootle-up-link">
          bottle up.
        </Link>
        <img src={Background} className="w-100 background" alt="Background"/>
  </div>
  );
}

export default LogoSection;
