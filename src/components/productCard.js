import { Link } from "react-router-dom";
import { formatPriceForColonCurrency } from "../service/priceService";
import "../styles/productCard.css";
import { useDispatch } from "react-redux";
import { addCartElement } from "../store";

function ProductCard({ productInformation }) {
  const dispatch = useDispatch();
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
            <strong>{formatPriceForColonCurrency(productInformation.price)}</strong>
          </p>
        </div>
      </Link>
      <p>
        <button disabled={!productInformation.ableToAddCard}
          onClick={() => {
            dispatch(addCartElement(productInformation));
          }}
        className="btn-add-to-cart">
          {buttonText}
        </button>
      </p>
    </div>
  );
}

export default ProductCard;
