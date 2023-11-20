import { useLocation, useNavigate } from "react-router-dom";
import Header from "./header";
import LogoSection from "./logoSection";
import { useEffect } from "react";
import BankCardForm from "./bankCardForm";
import AddressForm from "./addressForm";
import "../styles/paymentPage.css";
import Img1 from "../images/MASTECARD.png";
import Img2 from "../images/VISA.png";

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
          <h1 className="payment-title">Método de pago</h1>
          <div className="payment-options">
            <div className="payment-visa">
              <img src={Img2} alt="Imagen 2" className="Img2" />
                <input
                  type="radio"
                  name="paymentType"
                  value="visa"
                  id="paymentVisa"
                />
                <label htmlFor="paymentVisa">VISA</label>
              </div>
            <div className="payment-mastercard">
              <img src={Img1} alt="Imagen 1" className="Img1" />
                <input
                  type="radio"
                  name="paymentType"
                  value="mastercard"
                  id="paymentMastercard"
                />
                <label htmlFor="paymentMastercard">MASTER CARD</label>
              </div>
            </div>
          <div className="payment-container">
            <div className="bank-container">
              <BankCardForm />
            </div>
            <div className="address-container">
              <AddressForm />
            </div>
          </div>
          <div className="container-btn">
            <button className="btn-comprar">Comprar</button>
          </div>
        </div>
      </main>
    </>
  );
}

export default PaymentPage;
