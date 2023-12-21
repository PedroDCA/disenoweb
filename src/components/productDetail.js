import { useDispatch } from "react-redux";
import { formatPriceForColonCurrency } from "../service/priceService";
import { addCartElement } from "../store"
import "../styles/productDetail.css"
import Star from "./star";
function ProductDetail({ productInformation }) {
  const dispatch = useDispatch();

  // Si no hay información del producto, se muestra un mensaje de carga
  if (!productInformation?.id) {
    return <h1 className="cargando">Cargando</h1>;
  }

  // Determina el texto del botón en base a la disponibilidad del producto en el carrito
  const buttonText = productInformation.ableToAddCard
    ? "Agregar al carrito"
    : "En carrito";

  // Función para renderizar las estrellas de calificación
  const renderStars = () => {
    return [1, 2, 3, 4, 5].map(index => {
      const filled = index <= Math.floor(productInformation.averageRating);
      const half =
        index === Math.ceil(productInformation.averageRating) &&
        productInformation.averageRating % 1 !== 0;
      return <Star key={index} filled={filled} half={half} />;
    });
  };

  return (
    <div className="product detail d-flex">
      <div>
        {/* Imagen del producto */}
        <img
          src={productInformation.imageUrl}
          alt="Product"
          className="product-image"
        />
      </div>
      <div>
        {/* Título del producto */}
        <h2 className="product-title">{productInformation.name}</h2>
        {/* Sección de calificación con estrellas */}
        <div className="star-section">
          <p>{renderStars()}</p>
          <p>
            {/* Calificación promedio y cantidad de reseñas */}
            {productInformation.averageRating} (
            {productInformation.reviewQuantity} reviews)
          </p>
        </div>
        {/* Precio del producto */}
        <p className="price">
          {formatPriceForColonCurrency(productInformation.price)}
        </p>
        <div className="vendor">
          {/* Información del vendedor */}
          <p>{productInformation.vendorName}</p>
          <p>{productInformation.vendorAverageRating}</p>
        </div>
        {/* Botón para agregar al carrito */}
        <button
          disabled={!productInformation.ableToAddCard}
          onClick={() => {
            dispatch(addCartElement(productInformation));
          }}
          className="add-to-cart"
        >
          {buttonText}
        </button>
        {/* Descripción del producto */}
        <div className="description">
          <p>Descripción</p>
          <p>{productInformation.details}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;