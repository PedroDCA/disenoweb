import "../styles/productList.css";
import ProductCard from "./productCard";

function ProductList({ productList, dispatch }) {
  return (
    <>
      <h1 className="text-center p-5 subtitle">Nuestros productos</h1>
      <div className="d-flex flex-wrap product_list justify-content-center">
        {productList.map((productInformation, index) => (
          <ProductCard productInformation={productInformation} key={index} dispatch={dispatch} />
        ))}
      </div>
    </>
  );
}

export default ProductList;
