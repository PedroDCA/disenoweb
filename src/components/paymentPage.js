import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { completePaymentOrderAsync } from "../service/paymentService";
import { clearCart } from "../store";
import Swal from "sweetalert2";
import Header from "./header";
import LogoSection from "./logoSection";
import BankCardForm from "./bankCardForm";
import AddressForm from "./addressForm";
import Footer from "./footer";
import "../styles/paymentPage.css";
import Img1 from "../images/MASTECARD.png";
import Img2 from "../images/VISA.png";

function PaymentPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const itemList = useSelector((state) => state.cart.list);
  const userId = useSelector((state) => state.profile.id);
  const [selectedPaymentInformation, setSelectedPaymentInformation] = useState("");
  const [bankFormValid, setBankFormValid] = useState(false);
  const [addressFormValid, setAddressFormValid] = useState(false);

  useEffect(() => {
    if (!(state?.total > 0 && state?.itemList?.length > 0)) {
      navigate("/");
    }
  }, [state, navigate]);

  const handlePayment = async () => {
    if (!selectedPaymentInformation || itemList.length < 1 || !bankFormValid || !addressFormValid) {
      // Mensaje de error usando SweetAlert
      if (!selectedPaymentInformation) {
        await Swal.fire({
          icon: 'error',
          title: '¡Error!',
          text: 'Por favor, selecciona un método de pago.',
        });
      }
      if (itemList.length < 1) {
        await Swal.fire({
          icon: 'error',
          title: '¡Error!',
          text: 'Tu carrito está vacío. Agrega elementos antes de realizar el pago.',
        });
      }
      if (!bankFormValid || !addressFormValid) {
        await Swal.fire({
          icon: 'error',
          title: '¡Error!',
          text: 'Por favor, completa todos los campos en los formularios.',
        });
      }
      return;
    }

    try {
      await completePaymentOrderAsync(userId, selectedPaymentInformation, itemList);
      Swal.fire("¡Compra completada!");
      dispatch(clearCart());
      navigate("/");
    } catch (error) {
      console.error("Error al completar la compra:", error);
      Swal.fire("Hubo un error al completar la compra.");
    }
  };

  const checkedHandler = (event) => {
    if (event.target.checked) {
      setSelectedPaymentInformation({ type: event.target.value });
    }
  };

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
                onChange={checkedHandler}
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
                onChange={checkedHandler}
              />
              <label htmlFor="paymentMastercard">MASTER CARD</label>
            </div>
          </div>
          <div className="payment-container">
            <div className="bank-container">
              <BankCardForm setBankFormValid={setBankFormValid} />
            </div>
            <div className="address-container">
              <AddressForm setAddressFormValid={setAddressFormValid} />
            </div>
          </div>
          <div className="container-btn">
            <button className="btn-comprar" onClick={handlePayment}>
              Comprar
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default PaymentPage;