import LogoSection from "./logoSection";
import ProductList from "./productList";
import Header from "./header";
import { formatProductListForSearchPage, getSummaryProductListAsync } from "../service/productService";
import { useSelector } from "react-redux";
import Footer from './footer';

const productsToShow = await getSummaryProductListAsync();

function SearchPage() {
  const cartElementList = useSelector((state) => state.cart.list);
  const cartProductIdList = cartElementList.map((element) => element.id);
  const searchProductList = formatProductListForSearchPage(productsToShow, cartProductIdList);
  return (
    <>
      <header className="p-3 header_container w-100">
        <Header />
      </header>
      <main>
        <LogoSection />
        <div className="container">
          <ProductList productList={searchProductList} />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default SearchPage;
