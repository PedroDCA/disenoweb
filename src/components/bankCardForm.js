import React, { useState, useEffect } from 'react';
import "../styles/bankCardForm.css";

function BankCardForm({ setBankFormValid }) {
  const [cardHolderName, setCardHolderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');

  useEffect(() => {
    const isFormValid = cardHolderName !== '' && cardNumber !== '' && expiryDate !== '' && cvc !== '';
    setBankFormValid(isFormValid);
  }, [cardHolderName, cardNumber, expiryDate, cvc, setBankFormValid]);

  return (
    <>
      <h3 className="infocard-title">Información Tarjeta</h3>
      <h4 className="subtitles">Nombre Titular</h4>
      <input
        type="text"
        placeholder="Carlos Brenes Barrantes"
        className="inputs"
        value={cardHolderName}
        onChange={(e) => setCardHolderName(e.target.value)}
      />
      <h4 className="subtitles">Número de Tarjeta</h4>
      <input
        type="text"
        placeholder="5512456324315432"
        className="inputs"
        value={cardNumber}
        onChange={(e) => setCardNumber(e.target.value)}
      />
      <h4 className="subtitles">Fecha de Expiración</h4>
      <div className="container-cardinfo">
        <input
          type="text"
          placeholder="MM/AA"
          className="inputs-card"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
        />
        <input
          type="text"
          placeholder="CVC"
          className="inputs-card"
          value={cvc}
          onChange={(e) => setCvc(e.target.value)}
        />
      </div>
    </>
  );
}

export default BankCardForm;