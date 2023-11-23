function ProfileInformationSection({ userInformation }) {
  return (
    <div>
      <div>Bienvenido {userInformation.name}</div>
      <div>
        <input
          type="text"
          defaultValue={userInformation.name || ""}
          placeholder="Nombre"
        />
        <input
          type="text"
          defaultValue={userInformation.lastName || ""}
          placeholder="Apellido"
        />
        {userInformation.phoneNumber !== undefined ? (
          <input
            type="text"
            defaultValue={userInformation.phoneNumber}
            placeholder="Telefono"
          />
        ) : (
          <> </>
        )}
        <input type="text" value={userInformation.email || ""} disabled />
        <button>Actualizar</button>
      </div>
    </div>
  );
}

export default ProfileInformationSection;
