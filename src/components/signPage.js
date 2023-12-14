import "../styles/signPage.css";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { logIn } from "../store";
import { useNavigate } from "react-router-dom";
import { signInProfile, signUpProfile } from "../service/signingService";

function SignPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [containerClasses, setContainerClasses] = useState("");
  const [signInformation, setSignInformation] = useState({});
  const [formInformation, setFormInformation] = useState({});

  useEffect(() => {
    if (signInformation.error) {
      Swal.fire(signInformation.error);
      return;
    }

    if (signInformation.id) {
      Swal.fire("Iniciando sesion...").then(() => {
        dispatch(logIn({ id: signInformation.id, type: signInformation.type }));
        navigate("/profile");
      });
    }
  }, [signInformation, dispatch, navigate]);

  useEffect(() => {
    const { type, properties } = formInformation;
    if (type === "signIn") {
      signInProfile(
        properties.email,
        properties.password,
        properties.type
      ).then((newSignInformation) => setSignInformation(newSignInformation));
    }

    if (type === "signUp") {
      signUpProfile(
        properties.fullName,
        properties.email,
        properties.password,
        properties.type
      ).then((newSignUpIformation) => setSignInformation(newSignUpIformation));
    }
  }, [formInformation]);

  const getFormProperties = (formElement) => {
    const inputElements = Array.from(formElement.querySelectorAll("input"));
    const filteredInputElements = inputElements.filter((inputElement) => {
      const inputType = inputElement.type;

      if (inputType === "radio") {
        return inputElement.checked;
      }

      return inputElement.value;
    });

    const formProperties = filteredInputElements.reduce(
      (accumulator, inputElement) => ({
        ...accumulator,
        [inputElement.name]: inputElement.value,
      }),
      {}
    );

    return formProperties;
  };

  const signInClickHandler = (event) => {
    event.preventDefault();
    const form = event.target.closest("[data-form]");
    const formProperties = getFormProperties(form);

    // Here should be the validation.

    setFormInformation({ type: "signIn", properties: formProperties });
  };

  const signUpClickHandler = (event) => {
    event.preventDefault();
    const form = event.target.closest("[data-form]");
    const formProperties = getFormProperties(form);

    // Here should be the validation.

    setFormInformation({ type: "signUp", properties: formProperties });
  };

  return (
    <>
      <main>
        <div className={`container ${containerClasses}`} id="container">
        <div className="form-container login-container">
            <div className="form">
                <h1 className="loginTitle">Iniciar Sesión</h1>
                <form data-form>
                  <div className="input-container">
                      <input
                          id="login_email"
                          type="email"
                          name="email"
                          placeholder="Correo"
                          className="inputsLogin"
                      />
                    </div>
                    <div className="input-container">
                        <input
                          id="login_password"
                          type="password"
                          name="password"
                          placeholder="Contraseña"
                          className="inputsLogin"
                        />
                    </div>
                  <div className="user-type">
                      <input
                        type="radio"
                        id="signUpUser"
                        name="type"
                        value="user"
                        defaultChecked
                      />
                      <label htmlFor="signUpUser">Como usuario</label>
                      <input
                        type="radio"
                        id="signUpVendor"
                        name="type"
                        value="vendor"
                      />
                      <label htmlFor="signUpVendor">Como vendedor</label>
                  </div>
                  <button className="loginButton" onClick={signInClickHandler}>
                      Ingresar
                  </button>
                </form>
                <div className="social-container">
                  <a href="https://shorturl.at/qzAZ3" className="social">
                      <i className="lni lni-facebook-fill"></i>
                  </a>
                  <a href="https://shorturl.at/qzAZ3" className="social">
                      <i className="lni lni-pinterest-fill"></i>
                  </a>
                  <a href="https://shorturl.at/qzAZ3" className="social">
                      <i className="lni lni-website-fill"></i>
                  </a>
                </div>
            </div>
          </div>

          <div className="form-container register-container">
            <div className="form">
              <form data-form>
                <h1 className="loginTitle">Registrese aquí</h1>
                <input
                  id="register_fullName"
                  type="text"
                  name="fullName"
                  placeholder="Nombre y Apellido (Mario Barrantes)"
                  className="inputsLogin"
                />
                <input
                  id="register_email"
                  type="email"
                  name="email"
                  placeholder="Correo"
                  className="inputsLogin"
                />
                <input
                  id="register_password"
                  type="password"
                  name="password"
                  placeholder="Contraseña"
                  className="inputsLogin"
                />
                <div className="user-type"></div>
                <input
                  type="radio"
                  id="signInUser"
                  name="type"
                  value="user"
                  defaultChecked
                />
                <label htmlFor="signInUser">Como usuario</label>
                <input
                  type="radio"
                  id="signInVendor"
                  name="type"
                  value="vendor"
                />
                <label htmlFor="signInVendor">Como vendedor</label>
                <div/>
                <button className="loginButton" onClick={signUpClickHandler}>
                  Registrarse
                </button>
              </form>
              <div className="social-container">
                <a href="https://shorturl.at/qzAZ3" className="social">
                  <i className="lni lni-facebook-fill"></i>
                </a>
                <a href="https://shorturl.at/qzAZ3" className="social">
                  <i className="lni lni-pinterest-fill"></i>
                </a>
                <a href="https://shorturl.at/qzAZ3" className="social">
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
                  Si todavía no tienes una cuenta, únete para empezar a crear
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
