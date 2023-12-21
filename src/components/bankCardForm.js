// Importación de React y los hooks useState y useEffect desde la biblioteca 'react'
import React, { useState, useEffect } from 'react';
// Importación del archivo CSS para estilos
import "../styles/bankCardForm.css";

// Definición del componente funcional BankCardForm que recibe setBankFormValid como prop
function BankCardForm({ setBankFormValid }) {
  // Declaración de variables de estado y funciones para actualizarlas utilizando useState
  const [cardHolderName, setCardHolderName] = useState(''); // Estado para el nombre del titular de la tarjeta
  const [cardNumber, setCardNumber] = useState(''); // Estado para el número de tarjeta
  const [expiryDate, setExpiryDate] = useState(''); // Estado para la fecha de vencimiento
  const [cvc, setCvc] = useState(''); // Estado para el código de seguridad de la tarjeta

  // useEffect se utiliza para realizar acciones después de que el componente se renderiza
  useEffect(() => {
    // Comprobación de si el formulario está completo y válido
    const isFormValid = cardHolderName !== '' && cardNumber !== '' && expiryDate !== '' && cvc !== '';
    // Actualización del estado de la validez del formulario utilizando setBankFormValid
    setBankFormValid(isFormValid);
  }, [cardHolderName, cardNumber, expiryDate, cvc, setBankFormValid]);

  // Renderizado de elementos JSX que representan el formulario de información de tarjeta
  return (
    <>
      {/* Títulos para el formulario */}
      <h3 className="infocard-title">Información Tarjeta</h3>
      <h4 className="subtitles">Nombre Titular</h4>
      {/* Campo de entrada para el nombre del titular de la tarjeta */}
      <input
        type="text"
        placeholder="Carlos Brenes Barrantes"
        className="inputs"
        value={cardHolderName}
        // Evento onChange para actualizar el estado cardHolderName
        onChange={(e) => setCardHolderName(e.target.value)}
      />
      <h4 className="subtitles">Número de Tarjeta</h4>
      {/* Campo de entrada para el número de tarjeta */}
      <input
        type="text"
        placeholder="5512456324315432"
        className="inputs"
        value={cardNumber}
        // Evento onChange para actualizar el estado cardNumber
        onChange={(e) => setCardNumber(e.target.value)}
      />
      <h4 className="subtitles">Fecha de Expiración</h4>
      <div className="container-cardinfo">
        {/* Campos de entrada para la fecha de vencimiento y el código de seguridad */}
        <input
          type="text"
          placeholder="MM/AA"
          className="inputs-card"
          value={expiryDate}
          // Evento onChange para actualizar el estado expiryDate
          onChange={(e) => setExpiryDate(e.target.value)}
        />
        <input
          type="text"
          placeholder="CVC"
          className="inputs-card"
          value={cvc}
          // Evento onChange para actualizar el estado cvc
          onChange={(e) => setCvc(e.target.value)}
        />
      </div>
    </>
  );
}

// Exportación del componente BankCardForm para su uso en otros archivos
export default BankCardForm;