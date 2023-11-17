import { useSelector } from "react-redux";
import Header from "./header";
import LogoSection from "./logoSection";
import PaymentItemList from "./paymentItemList";
import PaymentTotalSection from "./paymentTotalSection";

function PaymentPage() {
  const cartElementList = useSelector((state) => state.cart);
  return (
    <>
      <header className="p-3 header_container w-100">
        <Header />
      </header>
      <main>
        <LogoSection />
        <div className="container">
          <PaymentItemList cartElementList={cartElementList} />
          <PaymentTotalSection />
        </div>
      </main>
    </>
  );
}

export default PaymentPage;
