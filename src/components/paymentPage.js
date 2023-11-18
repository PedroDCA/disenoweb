import { useLocation, useNavigate } from "react-router-dom";
import Header from "./header";
import LogoSection from "./logoSection";
import { useEffect } from "react";
import BankCardForm from "./bankCardForm";
import AddressForm from "./addressForm";

function PaymentPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const isTotalPriceValid = state?.total > 0;
  const isItemListValid = state?.itemList?.length > 0;

  useEffect(() => {
    if (!isTotalPriceValid || !isItemListValid) {
      navigate("/");
      return;
    }
  }, [isTotalPriceValid, isItemListValid, navigate]);

  return (
    <>
      <header className="p-3 header_container w-100">
        <Header />
      </header>
      <main>
        <LogoSection />
        <div className="container">
          <h1>Metodo de pago</h1>
          <div>
            <input
              type="radio"
              name="paymentType"
              value="visa"
              id="paymentVisa"
            />
            <label for="paymentVisa">VISA</label>
            <input
              type="radio"
              name="paymentType"
              value="mastercard"
              id="paymentMastercard"
            />
            <label for="paymentVisa">MASTER CARD</label>
          </div>
          <BankCardForm />
          <AddressForm />
          <button>Comprar</button>
        </div>
      </main>
    </>
  );
}

export default PaymentPage;
