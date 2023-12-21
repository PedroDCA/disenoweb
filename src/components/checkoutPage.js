import { useSelector } from "react-redux";
import Header from "./header";
import LogoSection from "./logoSection";
import CheckoutItemList from "./checkoutItemList";
import CheckoutTotalSection from "./checkoutTotalSection";
import { useEffect, useState } from "react";
import Footer from './footer';
import { getTotalPrice } from "../service/productService";

// Definición del componente CheckoutPage
function CheckoutPage() {
  // Obtiene la lista de elementos del carrito del estado de Redux utilizando useSelector
  const cartElementList = useSelector((state) => state.cart.list);
  // Estado local para el total a pagar en la página de checkout
  const [total, setTotal] = useState(0);

  // Efecto para calcular el total a pagar basado en la lista de elementos del carrito
  useEffect(() => {
    // Calcula el nuevo total sumando los precios de cada elemento del carrito
    const newTotal = cartElementList.reduce(
      (total, cartElement) => total + getTotalPrice(cartElement.amount, cartElement.price),
      0
    );

    // Actualiza el estado local con el nuevo total
    setTotal(newTotal);
  }, [cartElementList]); // Se ejecuta cuando cambia la lista de elementos del carrito

  // Renderizado del componente CheckoutPage
  return (
    <>
      {/* Encabezado de la página */}
      <header className="p-3 header_container w-100">
        <Header />
      </header>
      {/* Contenido principal */}
      <main>
        <LogoSection /> {/* Sección del logo */}
        <div className="container">
          {/* Lista de elementos del carrito */}
          <CheckoutItemList cartElementList={cartElementList} />
          {/* Sección con el total a pagar */}
          <CheckoutTotalSection totalToPay={total} elementList={cartElementList}/>
        </div>
      </main>
      {/* Pie de página */}
      <Footer />
    </>
  );
}

export default CheckoutPage; // Exporta el componente CheckoutPage