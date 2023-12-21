// Importación de React desde la biblioteca 'react'
import React from "react";
// Importación de una imagen de un carrito desde el directorio de imágenes
import Cart from "../images/cart-img.png";
// Importación de una función llamada formatPriceForColonCurrency desde un servicio de precios
import { formatPriceForColonCurrency } from "../service/priceService";
// Importación del archivo CSS para estilos
import "../styles/cartModal.css";

// Definición del componente funcional CartModal que recibe previewInfo como prop
const CartModal = ({ previewInfo }) => {
  return (
    // Estructura del componente CartModal
    <div className="cart-preview-modal">
      {/* Imagen del carrito */}
      <img src={Cart} alt="Cart" className="img-cart"></img>
      {/* Título del carrito */}
      <h2 className="cart-title">Mi carrito</h2>
      {/* Lista de elementos en el carrito */}
      <ul>
        {/* Mapeo de la información de vista previa (si existe) para mostrar los elementos en el carrito */}
        {previewInfo &&
          previewInfo.map((item) => (
            <li key={item.id}>
              {/* Imagen del producto */}
              <img src={item.imageUrl} alt={item.name} />
              {/* Precio del producto formateado con la moneda colón */}
              <p id="price">Price: {formatPriceForColonCurrency(item.price)}</p>
              {/* Nombre del producto */}
              <p>{item.name}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};

// Exportación del componente CartModal para su uso en otros archivos
export default CartModal;