import { useLocation, useNavigate } from "react-router-dom";
import Header from "./header";
import LogoSection from "./logoSection";
import { useEffect } from "react";

function PaymentPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const isTotalPriceValid = state?.total > 0;
  const isItemListValid = state?.itemList?.length > 0;

  useEffect(() => {
    if (!isTotalPriceValid || !isItemListValid) {
      navigate('/');
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
        <div className="container"></div>
      </main>
    </>
  );
}

export default PaymentPage;
