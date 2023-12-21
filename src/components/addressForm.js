// Importación de React y los hooks useState y useEffect desde la biblioteca 'react'
import React, { useState, useEffect } from 'react';
// Importación del archivo CSS para estilos
import "../styles/addressForm.css";

// Definición del componente funcional AddressForm que recibe setAddressFormValid como prop
function AddressForm({ setAddressFormValid }) {
  // Declaración de variables de estado y funciones para actualizarlas utilizando useState
  const [fullName, setFullName] = useState(''); // Estado para el nombre completo
  const [address, setAddress] = useState(''); // Estado para la dirección
  const [province, setProvince] = useState(''); // Estado para la provincia
  const [canton, setCanton] = useState(''); // Estado para el cantón

  // useEffect se utiliza para realizar acciones después de que el componente se renderiza
  useEffect(() => {
    // Comprobación de si el formulario está completo y válido
    const isFormValid = fullName !== '' && address !== '' && province !== '' && canton !== '';
    // Actualización del estado de la validez del formulario utilizando setAddressFormValid
    setAddressFormValid(isFormValid);
  }, [fullName, address, province, canton, setAddressFormValid]);

  // Renderizado de elementos JSX que representan el formulario de dirección
  return (
    <>
      {/* Títulos para el formulario */}
      <h3 className="address-title">Dirección de Entrega</h3>
      <h4 className="subtitles">Nombre completo</h4>
      {/* Campo de entrada para el nombre completo */}
      <input
        type="text"
        placeholder="Carlos Brenes Barrantes"
        className="inputs"
        value={fullName}
        // Evento onChange para actualizar el estado fullName
        onChange={(e) => setFullName(e.target.value)}
      />
      <h4 className="subtitles">Dirección</h4>
      {/* Campo de entrada para la dirección */}
      <input
        type="text"
        placeholder="San José, San Sebastián"
        className="inputs"
        value={address}
        // Evento onChange para actualizar el estado address
        onChange={(e) => setAddress(e.target.value)}
      />
      <div className="container-address">
        <div>
          <h4 className="subtitles">Provincia</h4>
          {/* Campo de entrada para la provincia */}
          <input
            type="text"
            placeholder="San José"
            className="inputs-addr"
            value={province}
            // Evento onChange para actualizar el estado province
            onChange={(e) => setProvince(e.target.value)}
          />
        </div>
        <div>
          <h4 className="subtitles">Cantón</h4>
          {/* Campo de entrada para el cantón */}
          <input
            type="text"
            placeholder="Central"
            className="inputs-addr"
            value={canton}
            // Evento onChange para actualizar el estado canton
            onChange={(e) => setCanton(e.target.value)}
          />
        </div>
      </div>
    </>
  );
}

// Exportación del componente AddressForm para su uso en otros archivos
export default AddressForm;