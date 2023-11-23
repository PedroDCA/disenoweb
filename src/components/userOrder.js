import { formatToSpanishFullDate } from "../service/dateService";
import { formatPriceForColonCurrency } from "../service/priceService";

function UserOrder({ orderInformation }) {
  return (
    <div>
      <div>
        <div>
          <p>Fecha</p>
          <p>{formatToSpanishFullDate(orderInformation.date)}</p>
        </div>
        <div>
          <p>TOTAL</p>
          <p>{orderInformation.totalPrice}</p>
        </div>
        <div>
          <p>{orderInformation.status}</p>
          <div>
            <img src={orderInformation.imageUrl} alt="Order information" />
            <p>{orderInformation.name}</p>
            <p>Vendidor por {orderInformation.vendor}</p>
            <p>Cantidad: {orderInformation.quantity}</p>
            <p>
              Precio Unitario:{" "}
              {formatPriceForColonCurrency(orderInformation.individualPrice)}
            </p>
          </div>
          <button>Ordenar nuevamente</button>
        </div>
      </div>
    </div>
  );
}

export default UserOrder;
