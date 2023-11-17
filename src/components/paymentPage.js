import Header from "./header";
import LogoSection from "./logoSection";
import PaymentItemList from "./paymentItemList";
import PaymentTotalSection from "./paymentTotalSection";

function PaymentPage({cartElementList, dispatch}) {
  return (
    <>
      <header className="p-3 header_container w-100">
        <Header numberOfItems={cartElementList.length} />
      </header>
      <main>
        <LogoSection />
        <div className="container">
            <PaymentItemList cartElementList={cartElementList} dispatch={dispatch}/>
            <PaymentTotalSection />
        </div>
      </main>
    </>
  );
}

export default PaymentPage;
