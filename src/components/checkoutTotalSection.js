import { Link } from "react-router-dom";
import { formatPriceForColonCurrency } from "../service/priceService";
import "../styles/checkoutTotalSection.css";

// Definición del componente CheckoutTotalSection
function CheckoutTotalSection({ totalToPay, elementList }) {
  let errorMessage = "";

  // Verifica si el total a pagar es menor o igual a cero y establece un mensaje de error si es así
  if (totalToPay <= 0) {
    errorMessage = "El total a pagar debe ser mayor que cero.";
  }

  // Renderizado de la sección de total en la página de checkout
  return (
    <div className="checkout-container">
      <p className="total-label">Total</p>
      {/* Sección para mostrar el subtotal */}
      <div className="subtotal-container">
        <p>Subtotal</p>
        <p className="subtotal-amount">
          {formatPriceForColonCurrency(totalToPay)}
        </p>
      </div>
      {/* Sección para mostrar el total */}
      <div className="total-container">
        <p>Total</p>
        <p className="total-amount">
          {formatPriceForColonCurrency(totalToPay)}
        </p>
      </div>
      {/* Renderiza el mensaje de error si existe */}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {/* Enlace para redirigir a la página de pago (con datos del total y la lista de elementos) */}
      <Link to="/pay" state={{ total: totalToPay, itemList: elementList }}>
        {/* Botón de checkout */}
        <button disabled={totalToPay <= 0} className="btnCheckout">
          Checkout
        </button>
      </Link>
    </div>
  );
}

export default CheckoutTotalSection; // Exporta el componente CheckoutTotalSection