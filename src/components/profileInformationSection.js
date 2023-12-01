import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import '../styles/profile.css' ; // Import the stylesheet


function ProfileInformationSection({ userInformation }) {
  return (
    <div className="container-profile">
      <div className="welcome-section">
      <FontAwesomeIcon icon={faUser} /> Bienvenido {userInformation.name}
      </div>
      <div className="profile-section">
      <div>
        <input
          className="profile-input"
          type="text"
          defaultValue={userInformation.name || ""}
          placeholder="Nombre"
        />
        <br/>
        {userInformation.lastName !== undefined ? (
          <input
            className="profile-input"
            type="text"
            defaultValue={userInformation.lastName || ""}
            placeholder="Apellido"
          />
        ) : (
          <> </>
        )}
        <br/>
        {userInformation.phoneNumber !== undefined ? (
          <input
            className="profile-input"
            type="text"
            defaultValue={userInformation.phoneNumber}
            placeholder="Telefono"
          />
        ) : (
          <> </>
        )}
        <input
          className="profile-input"
          type="text"
          value={userInformation.email || ""}
          disabled
        /><br/>
        <button className="profile-button">Actualizar</button>
      </div>
    </div>
    </div>

  );
  
}


export default ProfileInformationSection;
