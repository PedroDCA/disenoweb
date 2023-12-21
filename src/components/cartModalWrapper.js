// Importación de React y los hooks useState y useEffect desde la biblioteca 'react'
import React, { useState, useEffect } from "react";
// Importa el componente CartModal desde el archivo 'cartModal.js'
import CartModal from "./cartModal";

// Definición del componente funcional CartModalWrapper que recibe children y cartElementList como props
function CartModalWrapper({ children, cartElementList }) {
  // Declaración de estados: showModal para controlar la visualización del modal y previewData para la información de vista previa
  const [showModal, setShowModal] = useState(false);
  const [previewData, setPreviewData] = useState(null);
  let timeout;

  // Función para manejar el evento de entrada del mouse
  const handleMouseEnter = () => {
    clearTimeout(timeout);
    setShowModal(true);
    setPreviewData(cartElementList);
  };

  // Función para manejar el evento de salida del mouse
  const handleMouseLeave = () => {
    timeout = setTimeout(() => {
      setShowModal(false);
      setPreviewData(null);
    }, 500); // Ajusta este valor de tiempo según sea necesario
  };

  // Efecto para limpiar el timeout al desmontar el componente
  useEffect(() => {
    return () => {
      clearTimeout(timeout);
    };
  }, [timeout]);

  // Renderizado del componente
  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="cart-preview-wrapper"
    >
      {/* Renderiza el componente CartModal si showModal es true */}
      {showModal && (
        <CartModal previewInfo={previewData} />
      )}
      {/* Renderiza los elementos hijos del componente */}
      {children}
    </div>
  );
}

// Exportación del componente CartModalWrapper para su uso en otros archivos
export default CartModalWrapper;