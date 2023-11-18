import { useSelector } from "react-redux";
import Header from "./header";
import LogoSection from "./logoSection";
import PaymentItemList from "./paymentItemList";
import PaymentTotalSection from "./paymentTotalSection";
import { useEffect, useState } from "react";

function CartPage() {
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
          <PaymentItemList cartElementList={cartElementList} />
          <PaymentTotalSection totalToPay={total} elementList={cartElementList}/>
        </div>
      </main>
    </>
  );
}

export default CartPage;
