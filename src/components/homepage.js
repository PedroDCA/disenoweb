import Header from "./header";
import LogoSection from "./logoSection";

function Homepage({cartElementList, dispatch}) {
  return (
    <>
      <header className="p-3 header_container w-100">
        <Header numberOfItems={cartElementList.length}/>
      </header>
      <main>
        <LogoSection />
      </main>
    </>
  );
}

export default Homepage;
