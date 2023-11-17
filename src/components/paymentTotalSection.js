import { formatPriceForColonCurrency } from "../service/priceService";

function PaymentTotalSection({totalToPay}) {
    return (
        <div>
            Total
            <p>Subtotal - {formatPriceForColonCurrency(totalToPay)}</p>
            <p>Total - {formatPriceForColonCurrency(totalToPay)}</p>
            <button disabled={totalToPay <= 0}>Checkout</button>
        </div>
    )
}

export default PaymentTotalSection;