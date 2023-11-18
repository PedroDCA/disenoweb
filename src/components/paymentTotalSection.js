import { Link } from "react-router-dom";
import { formatPriceForColonCurrency } from "../service/priceService";
import "../styles/paymentTotalSection.css";

function PaymentTotalSection({ totalToPay, elementList }) {
  return (
    <div className="payment-container">
        <p className="total-label">Total</p>
        <div className="subtotal-container">
            <p>Subtotal</p>
            <p className="subtotal-amount">{formatPriceForColonCurrency(totalToPay)}</p>
        </div>
        <div className="total-container">
            <p>Total</p>
            <p className="total-amount">{formatPriceForColonCurrency(totalToPay)}</p>
        </div>
        <Link to="/pay" state={{ total: totalToPay, itemList: elementList }}>
        <button disabled={totalToPay <= 0} className="btnCheckout">Checkout</button>
      </Link>
    </div>
)
}

export default PaymentTotalSection;
