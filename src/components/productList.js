import "../styles/productList.css";
import ProductCard from "./productCard";

function ProductList({ productList }) {
  // Recibe un arreglo de productos y los muestra en tarjetas individuales
  return (
    <>
      {/* Título de la lista de productos */}
      <h1 className="text-center p-5 subtitle">Nuestros productos</h1>
      
      {/* Contenedor flexible que muestra las tarjetas de producto */}
      <div className="d-flex flex-wrap product_list justify-content-center">
        {/* Mapea cada producto en un componente ProductCard */}
        {productList.map((productInformation, index) => (
          <ProductCard productInformation={productInformation} key={index}/>
        ))}
      </div>
    </>
  );
}

export default ProductList;