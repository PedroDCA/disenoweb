import { useSelector } from "react-redux";
import Header from "./header";
import LogoSection from "./logoSection";
import CheckoutItemList from "./checkoutItemList";
import CheckoutTotalSection from "./checkoutTotalSection";
import { useEffect, useState } from "react";
import Footer from './footer';
import { getTotalPrice } from "../service/productService";

function CheckoutPage() {
  const cartElementList = useSelector((state) => state.cart.list);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const newTotal = cartElementList.reduce(
      (total, cartElement) => total + getTotalPrice(cartElement.amount, cartElement.price),
      0
    );

    setTotal(newTotal);
  }, [cartElementList]);
  return (
    <>
      <header className="p-3 header_container w-100">
        <Header />
      </header>
      <main>
        <LogoSection />
        <div className="container">
          <CheckoutItemList cartElementList={cartElementList} />
          <CheckoutTotalSection totalToPay={total} elementList={cartElementList}/>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default CheckoutPage;
