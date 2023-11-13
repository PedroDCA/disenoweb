import LogoSection from "./logoSection";
import ProductList from "./productList";
import Header from "./header";
import { formatProductListForSearchPage, getAllProducts } from "../service/productService";

const productsToShow = getAllProducts();

function SearchPage({ cartElementList, dispatch }) {
  const cartProductIdList = cartElementList.map((element) => element.id);
  const searchProductList = formatProductListForSearchPage(productsToShow, cartProductIdList);
  return (
    <>
      <header className="p-3 header_container w-100">
        <Header numberOfItems={cartElementList.length} />
      </header>
      <main>
        <LogoSection />
        <div className="container">
          <ProductList productList={searchProductList} dispatch={dispatch} />
        </div>
      </main>
    </>
  );
}

export default SearchPage;
