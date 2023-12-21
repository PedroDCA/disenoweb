import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "../styles/profile.css"; // Import the stylesheet
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../store";
import { useNavigate } from "react-router-dom";
import { updateProfileAsync } from "../service/profileService";
import Swal from "sweetalert2";
function ProfileInformationSection({ userInformation }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profileId = useSelector((store) => store.profile.id);
  const profileType = useSelector((store) => store.profile.type);

  // Maneja el evento de clic en el botón de actualización
  const updateButtonClickHandler = (event) => {
    const form = event.target.closest('[data-form]');
    const properties = getFormProperties(form);

    // Llama a la función para actualizar el perfil
    updateProfileAsync(profileId, profileType, properties).then(() => Swal.fire("Cuenta actualizada"));
  }

  // Obtiene las propiedades del formulario
  const getFormProperties = (form) => {
    const inputElementList = Array.from(
      form.querySelectorAll("input[name]")
    );
    const productInformation = inputElementList.reduce(
      (accumulator, inputElement) => ({
        ...accumulator,
        [inputElement.name]: inputElement.value,
      }),
      {}
    );
    return productInformation;
  }

  return (
    <div className="container-profile">
      <div className="welcome-section">
        {/* Muestra el icono de usuario y el nombre */}
        <FontAwesomeIcon icon={faUser} /> Bienvenido {userInformation.name}
      </div>
      <div className="profile-section" data-form>
        <div>
          {/* Campos de entrada para editar la información */}
          <input
            className="profile-input"
            type="text"
            name="name"
            defaultValue={userInformation.name || ""}
            placeholder="Nombre"
          />
          <br />
          {/* Verifica y muestra campos opcionales */}
          {userInformation.lastName !== undefined ? (
            <input
              className="profile-input"
              type="text"
              name="lastName"
              defaultValue={userInformation.lastName || ""}
              placeholder="Apellido"
            />
          ) : (
            <> </>
          )}
          <br />
          {userInformation.phoneNumber !== undefined ? (
            <input
              className="profile-input"
              type="text"
              name="phoneNumber"
              defaultValue={userInformation.phoneNumber}
              placeholder="Telefono"
            />
          ) : (
            <> </>
          )}
          {/* Campo de correo electrónico deshabilitado */}
          <input
            className="profile-input"
            type="text"
            name="email"
            value={userInformation.email || ""}
            disabled
          />
          <br />
          {/* Botón para actualizar la información */}
          <button className="profile-button" onClick={updateButtonClickHandler}>Actualizar</button>
        </div>
        {/* Botón para cerrar sesión */}
        <button onClick={() => {
          dispatch(logOut()); // Realiza la acción de logout
          navigate("/"); // Redirige a la página principal
        }}>Salir de sesión</button>
      </div>
    </div>
  );
}

export default ProfileInformationSection;