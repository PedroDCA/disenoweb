import React, { useState, useEffect } from "react";
import CartModal from "./cartModal"; // Importa el componente modal

function CartModalWrapper({ children, cartElementList }) {
  const [showModal, setShowModal] = useState(false);
  const [previewData, setPreviewData] = useState(null);
  let timeout;

  const handleMouseEnter = () => {
    clearTimeout(timeout);
    setShowModal(true);
    setPreviewData(cartElementList);
  };

  const handleMouseLeave = () => {
    timeout = setTimeout(() => {
      setShowModal(false);
      setPreviewData(null);
    }, 500); // Adjust this timeout value as needed
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeout);
    };
  }, [timeout]);

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="cart-preview-wrapper"
    >
      {showModal && (
        <CartModal previewInfo={previewData} />
      )}
      {children}
    </div>
  );
}

export default CartModalWrapper;
