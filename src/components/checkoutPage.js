import { useSelector } from "react-redux";
import Header from "./header";
import LogoSection from "./logoSection";
import CheckoutItemList from "./checkoutItemList";
import CheckoutTotalSection from "./checkoutTotalSection";
import { useEffect, useState } from "react";

function CheckoutPage() {
  const cartElementList = useSelector((state) => state.cart.list);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const newTotal = cartElementList.reduce(
      (total, cartElement) => total + cartElement.totalPrice,
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
    </>
  );
}

export default CheckoutPage;
