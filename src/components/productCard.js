import { Link } from "react-router-dom";
import { formatPriceForCard } from "../service/priceService";
import "../styles/productCard.css";
import { AddCartElement } from "../store/actions";

function ProductCard({ productInformation, dispatch }) {
  const buttonText = productInformation.ableToAddCard ? 'Agregar al carrito' : 'En carrito';
  return (
    <div className="productCard">
      <Link to={`/product/${productInformation.id}`}>
        <img
          src={productInformation.imageUrl}
          className="photo mx-auto"
          alt={`${productInformation.name} example`}
        />
        <div>
          <p>{productInformation.name}</p>
          <p>
            <strong>{formatPriceForCard(productInformation.price)}</strong>
          </p>
        </div>
      </Link>
      <p>
        <button disabled={!productInformation.ableToAddCard}
          onClick={() => {
            dispatch({ type: AddCartElement, payload: productInformation });
          }}
        >
          {buttonText}
        </button>
      </p>
    </div>
  );
}

export default ProductCard;
