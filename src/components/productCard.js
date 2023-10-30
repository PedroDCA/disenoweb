import { formatPriceForCard } from "../service/priceService";
import "../styles/productCard.css";

function ProductCard({ productInformation }) {
  return (
    <div className="productCard">
      <a href={`/product/${productInformation.id}`}>
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
      </a>
    </div>
  );
}

export default ProductCard;
