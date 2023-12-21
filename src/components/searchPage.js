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
  const [fullProductList, setFullProductList] = useState([]);
  const [productsToShow, setProductsToShow] = useState([]);

  // Obtener la lista de productos en el carrito del estado global
  const cartElementList = useSelector((state) => state.cart.list);
  const cartProductIdList = cartElementList.map((element) => element.id);
  
  // Función para manejar el filtro por color
  const handleColorFilter = (color) => {
    const normalizedColor = color.toLowerCase();
    if (normalizedColor === searchTerm) {
      // Si se hace clic en el mismo color, limpiar los filtros
      setSearchTerm("");
    } else {
      setSearchTerm(normalizedColor);
    }
  };

  // Obtener y establecer la lista de productos al cargar la página
  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getSummaryProductListAsync();
      setFullProductList(products);
    };

    fetchProducts();
  }, []);

  // Filtrar los productos según el término de búsqueda y los productos en el carrito
  useEffect(() => {
    if (fullProductList.length === 0) return;
  
    let filtered = fullProductList.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    const formattedProducts = formatProductListForSearchPage(filtered, cartProductIdList);
    
    setProductsToShow(formattedProducts);
  }, [searchTerm, fullProductList, cartProductIdList]);

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
          {/* Botón de búsqueda */}
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
          <ProductList productList={productsToShow} />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default SearchPage;