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
  // Hooks de React para manejar el estado y la navegación
  const { state } = useLocation(); // Obtiene el estado de la ubicación actual
  const navigate = useNavigate(); // Proporciona una función de navegación
  const dispatch = useDispatch(); // Permite despachar acciones de Redux
  // Selector de Redux para obtener datos del estado global
  const itemList = useSelector((state) => state.cart.list); // Obtiene la lista de elementos en el carrito
  const userId = useSelector((state) => state.profile.id); // Obtiene el ID del usuario
  // Estados locales para manejar la información de pago y la validación de formularios
  const [selectedPaymentInformation, setSelectedPaymentInformation] = useState(''); // Almacena la información de pago seleccionada
  const [bankFormValid, setBankFormValid] = useState(false); // Indica si el formulario bancario está válido
  const [addressFormValid, setAddressFormValid] = useState(false); // Indica si el formulario de dirección está válido

  // Efecto que verifica si hay datos suficientes para procesar el pago
  useEffect(() => {
    if (!(state?.total > 0 && state?.itemList?.length > 0)) {
      navigate('/'); // Redirige a la página principal si no hay suficientes datos para realizar el pago
    }
  }, [state, navigate]);

  // Función para manejar la lógica de pago
  const handlePayment = async () => {
    // Verifica si se cumplen las condiciones para realizar el pago
    if (!selectedPaymentInformation || itemList.length < 1 || !bankFormValid || !addressFormValid) {
      // Muestra mensajes de error utilizando SweetAlert si alguna condición no se cumple
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
      return; // Sale de la función si alguna condición no se cumple
    }

    try {
      // Intenta completar la orden de pago utilizando la función asincrónica
      await completePaymentOrderAsync(userId, selectedPaymentInformation, itemList);
      Swal.fire('¡Compra completada!'); // Muestra un mensaje de éxito
      dispatch(clearCart()); // Limpia el carrito utilizando la acción de Redux
      navigate('/'); // Redirige a la página principal después de completar la compra
    } catch (error) {
      console.error('Error al completar la compra:', error); // Registra un error si la compra falla
      Swal.fire('Hubo un error al completar la compra.'); // Muestra un mensaje de error
    }
  };

  // Maneja la selección del método de pago
  const checkedHandler = (event) => {
    if (event.target.checked) {
      setSelectedPaymentInformation({ type: event.target.value });
    }
  };

  return (
    <>
      {/* Componentes de la interfaz de usuario */}
      <header className="p-3 header_container w-100">
        <Header />
      </header>
      <main>
        <LogoSection />
        <div className="container">
          <h1 className="payment-title">Método de pago</h1>
          {/* Opciones de pago con radio buttons */}
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
          {/* Contenedor de formularios */}
          <div className="payment-container">
            <div className="bank-container">
              <BankCardForm setBankFormValid={setBankFormValid} />
            </div>
            <div className="address-container">
              <AddressForm setAddressFormValid={setAddressFormValid} />
            </div>
          </div>
          {/* Botón para procesar el pago */}
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