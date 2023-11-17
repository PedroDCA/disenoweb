import Header from "./header";
import "../styles/signPage.css";
import { useState } from "react";

function SignPage() {
  const [containerClasses, setContainerClasses] = useState("");
  return (
    <>
      <header className="p-3 header_container w-100">
        <Header />
      </header>
      <main>
        <div className={`container ${containerClasses}`} id="container">
          <div className="form-container register-container">
            <div className="form">
              <h1 className="loginTitle">Registrese aquí</h1>
              <input id="register_firstName" type="text" placeholder="Nombre" className="inputsLogin"/>
              <input
                id="register_lastName"
                type="text"
                placeholder="Apellido"
                className="inputsLogin"
              />
              <input id="register_email" type="email" placeholder="Correo" className="inputsLogin"/>
              <input
                id="register_password"
                type="password"
                placeholder="Contraseña"
                className="inputsLogin"
              />
              <button className="loginButton">Registrarse</button>
              <div className="social-container">
                <a
                  href="https://shorturl.at/qzAZ3"
                  className="social"
                >
                  <i className="lni lni-facebook-fill"></i>
                </a>
                <a
                  href="https://shorturl.at/qzAZ3"
                  className="social"
                >
                  <i className="lni lni-pinterest-fill"></i>
                </a>
                <a
                  href="https://shorturl.at/qzAZ3"
                  className="social"
                >
                  <i className="lni lni-website-fill"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="form-container login-container">
            <div className="form">
              <h1 className="loginTitle">Iniciar Sesión</h1>
              <input id="login_email" type="email" placeholder="Correo" className="inputsLogin"/>
              <input
                id="login_password"
                type="password"
                placeholder="Contraseña"
                className="inputsLogin"
              />
              <button className="loginButton">Ingresar</button>
              <div className="social-container">
                <a
                  href="https://shorturl.at/qzAZ3"
                  className="social"
                >
                  <i className="lni lni-facebook-fill"></i>
                </a>
                <a
                  href="https://shorturl.at/qzAZ3"
                  className="social"
                >
                  <i className="lni lni-pinterest-fill"></i>
                </a>
                <a
                  href="https://shorturl.at/qzAZ3"
                  className="social"
                >
                  <i className="lni lni-website-fill"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1 className="title">
                  ¿Ya tienes <br /> una cuenta?
                </h1>
                <p>
                  Si es así
                  <br /> ¡Inicia sesión aquí!
                </p>
                <button
                  className="ghost"
                  id="login"
                  onClick={() => setContainerClasses("")}
                >
                  Ingresar
                  <i className="lni lni-arrow-left login"></i>
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1 className="title">
                  Crea tu <br /> cuenta aquí
                </h1>
                <p>
                  Si todavía no tienes una cuenta,  únete para empezar a crear
                  tus productos
                </p>
                <button
                  className="ghost"
                  id="register"
                  onClick={() => setContainerClasses("right-panel-active")}
                >
                  Registrarse 
                  <i className="lni lni-arrow-right register"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default SignPage;
