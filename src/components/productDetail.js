import { useDispatch } from "react-redux";
import { formatPriceForColonCurrency } from "../service/priceService";
import { addCartElement } from "../store"

function ProductDetail({ productInformation }) {
  const dispatch = useDispatch();
  if (!productInformation?.id) {
    return (<h1>Cargando</h1>);
  }
  const buttonText = productInformation.ableToAddCard
    ? "Agregar al carrito"
    : "En carrito";
  return (
    <div className="d-flex">
      <div>
        <img src={productInformation.imageUrl} alt="Product" />
      </div>
      <div>
        <div>
          <p>Categorias</p>
          <div>
            <p>Categoria 1</p>
            <p>Categoria 2</p>
          </div>
        </div>
        <h2>{productInformation.name}</h2>
        <div>
          <p>Star section</p>
          <p>
            {productInformation.ratingAverage} (
            {productInformation.reviewQuantity} reviews)
          </p>
        </div>
        <p>{formatPriceForColonCurrency(productInformation.price)}</p>
        <div>
          <p>{productInformation.vendor.name}</p>
          <p>{productInformation.vendor.ratingAverage}</p>
        </div>
        <button
          disabled={!productInformation.ableToAddCard}
          onClick={() => {
            dispatch(addCartElement(productInformation));
          }}
        >
          {buttonText}
        </button>
        <div>
          <p>Descripcion</p>
          <p>{productInformation.descripcion}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
