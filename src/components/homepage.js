import Header from "./header";
import LogoSection from "./logoSection";

function Homepage() {
  return (
    <>
      <header className="p-3 header_container w-100">
        <Header />
      </header>
      <main>
        <LogoSection />
      </main>
    </>
  );
}

export default Homepage;
