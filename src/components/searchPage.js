// SearchPage.js
import React, { useState, useEffect } from "react";
import LogoSection from "./logoSection";
import ProductList from "./productList";
import Header from "./header";
import Footer from './footer';
import ColorFilter from "./colorFilter";
import {
  formatProductListForSearchPage,
  getSummaryProductListAsync,
} from "../service/productService";
import { useSelector } from "react-redux";

function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [productsToShow, setProductsToShow] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const cartElementList = useSelector((state) => state.cart.list);
  const cartProductIdList = cartElementList.map((element) => element.id);
 
  // Función para filtrar por color
const handleColorFilter = (color) => {
  const normalizedColor = color.toLowerCase();
  if (normalizedColor === searchTerm) {
    // Si se hace clic en el mismo color, limpiar los filtros
    setSearchTerm("");
  } else {
    setSearchTerm(normalizedColor);
  }
};

  // Filtrar productos por término de búsqueda y/o color
  const searchProductList = productsToShow.filter((product) => {
    const matchesSearchTerm = product.name.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearchTerm;
  });

  // Obtener y establecer la lista de productos al cargar la página
  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getSummaryProductListAsync();
      setProductsToShow(products);
      setFilteredProducts(products); // Inicializar la lista filtrada con todos los productos
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      let filtered = productsToShow;
  
      // Aplicar filtro por término de búsqueda
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
  
      console.log('Filtered Products:', filtered); // Mostrar los productos filtrados

      // Establecer los productos filtrados
      setFilteredProducts(filtered);
    };
  
    applyFilters();
  }, [searchTerm, productsToShow]);
  return (
    <>
      <header className="p-3 header_container w-100">
        <Header />
      </header>
      <main>
        <LogoSection />
        <div className="search-container">
        {/* Cuadro de texto para buscar productos */}
        <input
          type="text"
          className="searchBar"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
            <button type="button" className="search-button">
      <img src="https://cdn.dribbble.com/users/1785190/screenshots/3906047/search.gif" alt="Buscar" />
    </button>
  </div>
        {/* Botones para filtrar por color */}
        <div>
          <ColorFilter handleColorFilter={handleColorFilter} />
        </div>

        <div className="container">
          {/* Lista de productos filtrados */}
          <ProductList productList={searchProductList} />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default SearchPage;
