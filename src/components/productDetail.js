import { useDispatch } from "react-redux";
import { formatPriceForColonCurrency } from "../service/priceService";
import { addCartElement } from "../store"
import "../styles/productDetail.css"

function ProductDetail({ productInformation }) {
  const dispatch = useDispatch();
  if (!productInformation?.id) {
    return (<h1>Cargando</h1>);
  }
  const buttonText = productInformation.ableToAddCard
    ? "Agregar al carrito"
    : "En carrito";
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
          <p>★★★★☆</p>
          <p>
            {productInformation.ratingAverage} (
            {productInformation.reviewQuantity} reviews)
          </p>
        </div>
        <p className="price">{formatPriceForColonCurrency(productInformation.price)}</p>
        <div className="vendor">
          <p>{productInformation.vendor.name}</p>
          <p>{productInformation.vendor.ratingAverage}</p>
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
