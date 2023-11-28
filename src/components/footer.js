import React from 'react';
import { Link } from "react-router-dom";
import '../styles/footer.css';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-content">
      <div className="row">
          <div className="col-sm-12 col-md-6">
            <h6 id='title-page'>bottle up.</h6>
            <p className="text-justify">Botellas, para cada momento, en toda ocasión.</p>
          </div>

          <div className="col-xs-6 col-md-3">
            <h6>Categorias</h6>
            <ul className="footer-links">
              <li><Link to="/search"><p>Deportivas</p></Link></li>
              <li><Link to="/search"><p>Rosadas</p></Link></li>
              <li><Link to="/search"><p>Vidrio</p></Link></li>
              <li><Link to="/search"><p>Térmicas</p></Link></li>
            </ul>
          </div>

          <div className="col-xs-6 col-md-3">
            <h6>ACCESO RÁPIDO</h6>
            <ul className="footer-links">
              <li><Link to="/search"><p>Productos</p></Link></li>
            </ul>
          </div>
        </div>
        <hr/>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-sm-6 col-xs-12">
            <p className="copyright-text">Copyright &copy; 2023 Todos los derechos de bottle up.
            </p>
          </div>

          <div className="col-md-4 col-sm-6 col-xs-12">
            <ul className="social-icons">
              <li><a id="facebook" href="https://shorturl.at/qzAZ3" ><i className="lni lni-facebook-fill"></i></a></li>
              <li><a id="pinterest" href="https://shorturl.at/qzAZ3" ><i className="lni lni-pinterest-fill"></i></a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
