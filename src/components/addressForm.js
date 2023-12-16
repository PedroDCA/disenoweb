import React, { useState, useEffect } from 'react';
import "../styles/addressForm.css";

function AddressForm({ setAddressFormValid }) {
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [province, setProvince] = useState('');
  const [canton, setCanton] = useState('');

  useEffect(() => {
    const isFormValid = fullName !== '' && address !== '' && province !== '' && canton !== '';
    setAddressFormValid(isFormValid);
  }, [fullName, address, province, canton, setAddressFormValid]);

  return (
    <>
      <h3 className="address-title">Dirección de Entrega</h3>
      <h4 className="subtitles">Nombre completo</h4>
      <input
        type="text"
        placeholder="Carlos Brenes Barrantes"
        className="inputs"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />
      <h4 className="subtitles">Dirección</h4>
      <input
        type="text"
        placeholder="San José, San Sebastián"
        className="inputs"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <div className="container-address">
        <div>
          <h4 className="subtitles">Provincia</h4>
          <input
            type="text"
            placeholder="San José"
            className="inputs-addr"
            value={province}
            onChange={(e) => setProvince(e.target.value)}
          />
        </div>
        <div>
          <h4 className="subtitles">Cantón</h4>
          <input
            type="text"
            placeholder="Central"
            className="inputs-addr"
            value={canton}
            onChange={(e) => setCanton(e.target.value)}
          />
        </div>
      </div>
    </>
  );
}

export default AddressForm;