import { Link } from "react-router-dom";
import { formatPriceForColonCurrency } from "../service/priceService";

function PaymentTotalSection({ totalToPay, elementList }) {
  return (
    <div>
      Total
      <p>Subtotal - {formatPriceForColonCurrency(totalToPay)}</p>
      <p>Total - {formatPriceForColonCurrency(totalToPay)}</p>
      <Link to="/pay" state={{ total: totalToPay, itemList: elementList }}>
        <button disabled={totalToPay <= 0}>Checkout</button>
      </Link>
    </div>
  );
}

export default PaymentTotalSection;
