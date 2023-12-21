import "../styles/signPage.css";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { logIn } from "../store";
import { useNavigate } from "react-router-dom";
import { signInProfile, signUpProfile } from "../service/signingService";
function SignPage() {
  const dispatch = useDispatch(); // Inicializa useDispatch
  const navigate = useNavigate(); // Inicializa useNavigate
  const [containerClasses, setContainerClasses] = useState(""); // Estado para las clases del contenedor
  const [signInformation, setSignInformation] = useState({}); // Estado para la información de inicio de sesión
  const [formInformation, setFormInformation] = useState({}); // Estado para la información del formulario

  // Efecto para manejar la información de inicio de sesión
  useEffect(() => {
    if (signInformation.error) {
      Swal.fire(signInformation.error); // Muestra un mensaje de error si hay errores de inicio de sesión
      return;
    }

    if (signInformation.id) {
      Swal.fire("Iniciando sesion...").then(() => {
        dispatch(logIn({ id: signInformation.id, type: signInformation.type })); // Inicia sesión con la información obtenida
        navigate("/profile"); // Redirige al perfil del usuario
      });
    }
  }, [signInformation, dispatch, navigate]);

  // Efecto para manejar el inicio de sesión o registro según el tipo de formulario
  useEffect(() => {
    const { type, properties } = formInformation;
    if (type === "signIn") {
      signInProfile(
        properties.email,
        properties.password,
        properties.type
      ).then((newSignInformation) => setSignInformation(newSignInformation)); // Llama a la función para iniciar sesión
    }

    if (type === "signUp") {
      signUpProfile(
        properties.fullName,
        properties.email,
        properties.password,
        properties.type
      ).then((newSignUpIformation) => setSignInformation(newSignUpIformation)); // Llama a la función para registrarse
    }
  }, [formInformation]);

  // Función para obtener las propiedades del formulario
  const getFormProperties = (formElement) => {
    const inputElements = Array.from(formElement.querySelectorAll("input")); // Obtiene todos los elementos de input dentro del formulario
    const filteredInputElements = inputElements.filter((inputElement) => {
      const inputType = inputElement.type;

      if (inputType === "radio") {
        return inputElement.checked; // Verifica si los radio buttons están seleccionados
      }

      return inputElement.value; // Obtiene los valores de los inputs
    });

    const formProperties = filteredInputElements.reduce(
      (accumulator, inputElement) => ({
        ...accumulator,
        [inputElement.name]: inputElement.value, // Crea un objeto con las propiedades del formulario
      }),
      {}
    );

    return formProperties;
  };

  // Funciones para manejar los eventos de clic para iniciar sesión o registrarse
  const signInClickHandler = (event) => {
    event.preventDefault();
    const form = event.target.closest("[data-form]");
    const formProperties = getFormProperties(form);

    // Aquí debería estar la validación.

    setFormInformation({ type: "signIn", properties: formProperties });
  };

  const signUpClickHandler = (event) => {
    event.preventDefault();
    const form = event.target.closest("[data-form]");
    const formProperties = getFormProperties(form);

    // Aquí debería estar la validación.

    setFormInformation({ type: "signUp", properties: formProperties });
  };

  return (
    <>
      {/* Estructura del formulario para iniciar sesión y registrarse */}
      <main>
        <div className={`container ${containerClasses}`} id="container">
          {/* Formulario de inicio de sesión */}
          <div className="form-container login-container">
            <div className="form">
              <h1 className="loginTitle">Iniciar Sesión</h1>
              <form data-form>
                {/* Inputs para el inicio de sesión */}
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
              {/* Redes sociales para iniciar sesión */}
              {/* ... */}
            </div>
          </div>

          {/* Formulario de registro */}
          <div className="form-container register-container">
            <div className="form">
              <form data-form>
                {/* Inputs para el registro */}
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
                <div />
                <button className="loginButton" onClick={signUpClickHandler}>
                  Registrarse
                </button>
              </form>
              {/* Redes sociales para registrarse */}
              {/* ... */}
            </div>
          </div>

          {/* Overlay para cambiar entre iniciar sesión y registrarse */}
          <div className="overlay-container">
            <div className="overlay">
              {/* Panel izquierdo: Iniciar sesión */}
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
              {/* Panel derecho: Registrarse */}
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