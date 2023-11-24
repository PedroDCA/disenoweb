import { formatToSpanishFullDate } from "../service/dateService";
import { formatPriceForColonCurrency } from "../service/priceService";
import '../styles/userOrder.css' ; 

function UserOrder({ orderInformation }) {
  return (
    <div className="order-container">
      <div className="order-details">
      <div className="order-header">
        <div className="order-section">
          <p className="section-title">Fecha</p>
          <p>{formatToSpanishFullDate(orderInformation.date)}</p>
        </div>
        <div className="order-section">
        <p className="section-title">Total</p>
          <p>₡{orderInformation.totalPrice}</p>
        </div>
        </div>
        <div className="order-section">
        <p className="status">{orderInformation.status}</p>
          <div className="product-info">
            <img className="product-image" src={orderInformation.imageUrl} alt="Order information" />
            <p className="product-name">{orderInformation.name}</p>
            <p className="product-vendor">Vendido por {orderInformation.vendor}</p>
            <p className="product-quantity">Cantidad: {orderInformation.quantity}</p>
            <p className="product-price">
              Precio Unitario: {formatPriceForColonCurrency(orderInformation.individualPrice)}
            </p>
          </div>
          <button className="order-button">Ordenar nuevamente</button>
        </div>
      </div>
    </div>
  );
}

export default UserOrder;
