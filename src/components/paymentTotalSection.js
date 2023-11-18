import { formatPriceForColonCurrency } from "../service/priceService";
import "../styles/paymentTotalSection.css";

function PaymentTotalSection({totalToPay}) {
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
            <button className="btnCheckout" disabled={totalToPay <= 0}>
                Checkout
            </button>
        </div>
    )
}

export default PaymentTotalSection;