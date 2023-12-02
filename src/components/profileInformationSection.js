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

  const updateButtonClickHandler = (event) => {
    const form = event.target.closest('[data-form]');
    const properties = getFormProperties(form);

    updateProfileAsync(profileId, profileType, properties).then(() => Swal.fire("Cuenta actualizada"));        
  }

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
        <FontAwesomeIcon icon={faUser} /> Bienvenido {userInformation.name}
      </div>
      <div className="profile-section" data-form>
        <div>
          <input
            className="profile-input"
            type="text"
            name="name"
            defaultValue={userInformation.name || ""}
            placeholder="Nombre"
          />
          <br />
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
          <input
            className="profile-input"
            type="text"
            name="email"
            value={userInformation.email || ""}
            disabled
          />
          <br />
          <button className="profile-button" onClick={updateButtonClickHandler}>Actualizar</button>
        </div>
        <button onClick={() => {
          dispatch(logOut());
          navigate("/");
        }}>Salir de sesion</button>
      </div>
    </div>
  );
}

export default ProfileInformationSection;
