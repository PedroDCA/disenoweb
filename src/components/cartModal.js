import React from "react";
import Cart from "../images/cart-img.png";

import "../styles/cartModal.css";

const CartModal = ({ previewInfo }) => {
  return (
    <div className="cart-preview-modal">
      <img img src={Cart} alt="Cart" className="img-cart"></img>
      <h2 className="cart-title">Mi carrito</h2>
      <ul>
        {previewInfo &&
          previewInfo.map((item) => (
            <li key={item.id}>
              <img src={item.imageUrl} alt={item.name} />
              <p id="price">Price: ₡{item.price}</p>
              <p>{item.name}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default CartModal;
