import React from 'react';
import { Link } from "react-router-dom";
import '../styles/footer.css';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-content">
      <div class="row">
          <div class="col-sm-12 col-md-6">
            <h6 id='title-page'>bottle up.</h6>
            <p class="text-justify">Botellas, para cada momento, en toda ocasión.</p>
          </div>

          <div class="col-xs-6 col-md-3">
            <h6>Categorias</h6>
            <ul class="footer-links">
              <li><Link to="/search"><p>Deportivas</p></Link></li>
              <li><Link to="/search"><p>Rosadas</p></Link></li>
              <li><Link to="/search"><p>Vidrio</p></Link></li>
              <li><Link to="/search"><p>Térmicas</p></Link></li>
            </ul>
          </div>

          <div class="col-xs-6 col-md-3">
            <h6>ACCESO RÁPIDO</h6>
            <ul class="footer-links">
              <li><Link to="/search"><p>Productos</p></Link></li>
            </ul>
          </div>
        </div>
        <hr/>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-md-8 col-sm-6 col-xs-12">
            <p class="copyright-text">Copyright &copy; 2023 Todos los derechos de bottle up.
            </p>
          </div>

          <div class="col-md-4 col-sm-6 col-xs-12">
            <ul class="social-icons">
              <li><a class="facebook" href="https://www.facebook.com"><i class="fa fa-facebook"></i></a></li>
              <li><a class="twitter" href="https://www.twitter.com"><i class="fa fa-twitter"></i></a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
