import { Link } from "react-router-dom";
import { formatPriceForColonCurrency } from "../service/priceService";
import "../styles/productCard.css";
import { useDispatch } from "react-redux";
import { addCartElement } from "../store";

function ProductCard({ productInformation }) {
  // Inicialización del despachador de acciones Redux
  const dispatch = useDispatch();

  // Determina el texto del botón en base a la disponibilidad del producto en el carrito
  const buttonText = productInformation.ableToAddCard ? 'Agregar al carrito' : 'En carrito';

  return (
    <div className="productCard">
      {/* Enlace a la página de detalles del producto */}
      <Link to={`/product/${productInformation.id}`}>
        {/* Imagen del producto */}
        <img
          src={productInformation.imageUrl}
          className="photo mx-auto"
          alt={`${productInformation.name} example`}
        />
        {/* Nombre y precio del producto */}
        <div>
          <p>{productInformation.name}</p>
          <p>
            <strong>{formatPriceForColonCurrency(productInformation.price)}</strong>
          </p>
        </div>
      </Link>
      {/* Botón para agregar al carrito */}
      <p>
        <button
          // El botón está deshabilitado si no se puede agregar al carrito
          disabled={!productInformation.ableToAddCard}
          onClick={() => {
            // Dispara la acción para agregar el producto al carrito cuando se hace clic en el botón
            dispatch(addCartElement(productInformation));
          }}
          className="btn-add-to-cart"
        >
          {buttonText}
        </button>
      </p>
    </div>
  );
}

export default ProductCard;