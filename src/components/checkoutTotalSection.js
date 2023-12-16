import { Link } from "react-router-dom";
import { formatPriceForColonCurrency } from "../service/priceService";
import "../styles/checkoutTotalSection.css";

function CheckoutTotalSection({ totalToPay, elementList }) {
  let errorMessage = "";

    if (totalToPay <= 0) {
      errorMessage = "El total a pagar debe ser mayor que cero.";
    }
  

  return (
    <div className="checkout-container">
      <p className="total-label">Total</p>
      <div className="subtotal-container">
        <p>Subtotal</p>
        <p className="subtotal-amount">
          {formatPriceForColonCurrency(totalToPay)}
        </p>
      </div>
      <div className="total-container">
        <p>Total</p>
        <p className="total-amount">
          {formatPriceForColonCurrency(totalToPay)}
        </p>
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <Link to="/pay" state={{ total: totalToPay, itemList: elementList }}>
        <button disabled={totalToPay <= 0} className="btnCheckout">
          Checkout
        </button>
      </Link>
    </div>
  );
}

export default CheckoutTotalSection;
