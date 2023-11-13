import Header from "./header";
import LogoSection from "./logoSection";

function Homepage({ cartElementList, dispatch }) {
  return (
    <>
      <header className="p-3 header_container w-100">
        <Header numberOfItems={cartElementList.length} />
      </header>
      <main>
        <LogoSection />
        <div>
          <span className="text-down">
            ¿Cuál es tu estilo? ¡Elige tu botella!
          </span>
          <span style={{ display: "block" }}>
            Bienvenid@ a nuestra tienda de botellas únicas.
          </span>
        </div>
      </main>
    </>
  );
}

export default Homepage;
