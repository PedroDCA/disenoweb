import { useDispatch } from "react-redux";
import { formatPriceForColonCurrency } from "../service/priceService";
import { addCartElement } from "../store"
import "../styles/productDetail.css"
import Star from "./star";

function ProductDetail({ productInformation }) {
  const dispatch = useDispatch();
  if (!productInformation?.id) {
    return (<h1>Cargando</h1>);
  }
  const buttonText = productInformation.ableToAddCard
    ? "Agregar al carrito"
    : "En carrito";

    const renderStars = () => {
      let stars = [];
      for (let i = 1; i <= 5; i++) {
        stars.push(<Star key={i} filled={i <= productInformation.ratingAverage} />);
      }
      return stars;
    };

  return (
    <div className="product detail d-flex">
      <div>
        <img src={productInformation.imageUrl} alt="Product" className="product-image"/>
      </div>
      <div>
        <div>
          <p id="categories-title">Categorias</p>
          <div>
            <p id="categories">Categoria 1</p>
            <p id="categories">Categoria 2</p>
          </div>
        </div>
        <h2 className="product-title">{productInformation.name}</h2>
        <div className="star-section">
          <p>{renderStars()}</p>
          <p>
            {productInformation.ratingAverage} (
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
          <p>Descripcion</p>
          <p>{productInformation.descripcion}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
