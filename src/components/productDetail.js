import { useDispatch } from "react-redux";
import { formatPriceForColonCurrency } from "../service/priceService";
import { addCartElement } from "../store"
import "../styles/productDetail.css"
import Star from "./star";

function ProductDetail({ productInformation }) {
  const dispatch = useDispatch();
  if (!productInformation?.id) {
    return (<h1 className="cargando">Cargando</h1>);
  }
  const buttonText = productInformation.ableToAddCard
    ? "Agregar al carrito"
    : "En carrito";

    const renderStars = () => {
      return [1, 2, 3, 4, 5].map(index => {
        const filled = index <= Math.floor(productInformation.averageRating);
        const half = index === Math.ceil(productInformation.averageRating) && productInformation.averageRating % 1 !== 0;
        return <Star key={index} filled={filled} half={half} />;
      });
    };

  return (
    <div className="product detail d-flex">
      <div>
        <img src={productInformation.imageUrl} alt="Product" className="product-image"/>
      </div>
      <div>
        <div>
          <p id="categories-title">Categorías</p>
          <div>
            <p id="categories">Categoría 1</p>
            <p id="categories">Categoría 2</p>
          </div>
        </div>
        <h2 className="product-title">{productInformation.name}</h2>
        <div className="star-section">
          <p>{renderStars()}</p>
          <p>
            {productInformation.averageRating} (
            {productInformation.reviewQuantity} reviews)
          </p>
        </div>
        <p className="price">{formatPriceForColonCurrency(productInformation.price)}</p>
        <div className="vendor">
          <p>{productInformation.vendorName}</p>
          <p>{productInformation.vendorAverageRating}</p>
        </div>
        <button
          disabled={!productInformation.ableToAddCard}
          onClick={() => {
            dispatch(addCartElement(productInformation));
          }}
       className="add-to-cart" >
          {buttonText}
        </button>
        <div className="description">
          <p>Descripción</p>
          <p>{productInformation.details}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
