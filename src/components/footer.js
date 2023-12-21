import React from 'react';
import { Link } from "react-router-dom";
import '../styles/footer.css';

// Definición del componente Footer
function Footer() {
  // Renderizado del pie de página
  return (
    <footer className="site-footer">
      <div className="footer-content">
        {/* Contenido del pie de página */}
        <div className="row">
          {/* Columna con el título y la descripción */}
          <div className="col-sm-12 col-md-6">
            <h6 id='title-page'>bottle up.</h6>
            <p className="text-justify">Botellas, para cada momento, en toda ocasión.</p>
          </div>

          {/* Columna para las categorías */}
          <div className="col-xs-6 col-md-3">
            <h6>Categorías</h6>
            <ul className="footer-links">
              {/* Enlaces a las categorías con redirección a la página de búsqueda */}
              <li><Link to="/search"><p>Deportivas</p></Link></li>
              <li><Link to="/search"><p>Rosadas</p></Link></li>
              <li><Link to="/search"><p>Vidrio</p></Link></li>
              <li><Link to="/search"><p>Térmicas</p></Link></li>
            </ul>
          </div>

          {/* Columna para acceso rápido */}
          <div className="col-xs-6 col-md-3">
            <h6>ACCESO RÁPIDO</h6>
            <ul className="footer-links">
              {/* Enlace rápido a la sección de productos */}
              <li><Link to="/search"><p>Productos</p></Link></li>
            </ul>
          </div>
        </div>
        {/* Línea divisoria */}
        <hr />
      </div>

      {/* Contenedor secundario */}
      <div className="container">
        <div className="row">
          {/* Columna para el texto de derechos de autor */}
          <div className="col-md-8 col-sm-6 col-xs-12">
            <p className="copyright-text">
              {/* Texto de derechos de autor */}
              Copyright &copy; 2023 Todos los derechos de bottle up.
            </p>
          </div>

          {/* Columna para íconos sociales */}
          <div className="col-md-4 col-sm-6 col-xs-12">
            <ul className="social-icons">
              {/* Enlaces a las redes sociales */}
              <li><a id="facebook" href="https://shorturl.at/qzAZ3" ><i className="lni lni-facebook-fill"></i></a></li>
              <li><a id="pinterest" href="https://shorturl.at/qzAZ3" ><i className="lni lni-pinterest-fill"></i></a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer; // Exporta el componente Footer