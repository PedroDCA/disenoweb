import { useEffect, useState } from "react";
import { formatPriceForColonCurrency } from "../service/priceService";
import { useDispatch } from "react-redux";
import { removeCartElement, updateCartProductQuantity } from "../store";
import "../styles/checkoutItem.css";
import { getTotalPrice } from "../service/productService";

// Definición del componente CheckoutItem que recibe información sobre un elemento del carrito
function CheckoutItem({ itemInformation }) {
  // Estados locales para la cantidad de artículo y su precio total
  const [itemQuantity, setItemQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(itemInformation.totalPrice); // Precio total inicial del artículo
  const id = itemInformation.id; // ID del artículo
  const dispatch = useDispatch(); // Método dispatch de Redux para despachar acciones

  // Efecto para recalcular el precio total cuando cambia la cantidad del artículo o su información
  useEffect(() => {
    setTotalPrice(getTotalPrice(itemQuantity, itemInformation.price)); // Calcula el precio total basado en la cantidad
  }, [itemQuantity, itemInformation]);

  // Efecto para actualizar la cantidad del producto en el carrito en el Redux store
  useEffect(() => {
    // Verifica si el ID existe y envía la acción para actualizar la cantidad en el carrito
    if (id) {
      dispatch(
        updateCartProductQuantity({
          id,
          amount: itemQuantity,
        })
      );
    }
  }, [itemQuantity, id, dispatch]);

  // Función para manejar los cambios en la cantidad del artículo
  const onChangeHandler = (event) => {
    setItemQuantity(event.target.value); // Actualiza la cantidad del artículo
  };

  // Renderizado del componente CheckoutItem
  return (
    <tr>
      {/* Botón para eliminar el artículo del carrito */}
      <td>
        <button className="customXbutton" onClick={() => dispatch(removeCartElement(itemInformation.id))}>
          X
        </button>
      </td>
      {/* Imagen del artículo */}
      <td>
        <img src={itemInformation.imageUrl} alt="Item example" className="imgProduct" />
      </td>
      {/* Nombre del artículo */}
      <td>{itemInformation.name}</td>
      {/* Precio unitario del artículo */}
      <td>
        <strong>{formatPriceForColonCurrency(itemInformation.price)}</strong>
      </td>
      {/* Input para editar la cantidad del artículo */}
      <td>
        <input
          defaultValue={itemQuantity}
          type="number"
          min="1"
          onChange={onChangeHandler}
        />
      </td>
      {/* Precio total por artículo */}
      <td>
        <strong>{formatPriceForColonCurrency(totalPrice)}</strong>
      </td>
    </tr>
  );
}

export default CheckoutItem; // Exporta el componente CheckoutItem para su uso en otros archivos