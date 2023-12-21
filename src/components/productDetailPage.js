import { useParams } from "react-router-dom";
import Header from "./header";
import LogoSection from "./logoSection";
import ProductDetail from "./productDetail";
import { useEffect, useState } from "react";
import {
  formatProductForDetailPage,
  getProductDetailByIdAsync,
} from "../service/productService";
import { useSelector } from "react-redux";
import "../styles/productDetailPage.css"
import Footer from './footer';

function ProductDetailPage() {
  // Obtiene el ID del producto de los parámetros de la URL
  const { productId } = useParams();
  
  // Estado para almacenar la información del producto
  const [productInformation, setProductInformation] = useState({});
  const [detailPageInformation, setDetailPageInformation] = useState({});

  // Obtiene la lista de elementos en el carrito utilizando useSelector de Redux
  const cartElementList = useSelector((state) => state.cart.list);

  // Efecto para obtener la información del producto basado en el ID de la URL
  useEffect(() => {
    // Verifica si hay un productId válido
    if (!productId){
      return;
    }

    // Llama a una función asincrónica para obtener la información del producto
    const updatedProductInformation = getProductDetailByIdAsync(productId);

    // Actualiza el estado con la información del producto
    updatedProductInformation.then((information) => setProductInformation(information));
  }, [productId]);

  // Efecto para formatear la información del producto para la página de detalle
  useEffect(() => {
    // Crea una lista de IDs de elementos en el carrito
    const cartItemIdList = cartElementList.map((item) => item.id);

    // Formatea la información del producto para la página de detalle
    const formatedProductInformation = formatProductForDetailPage(
      { ...productInformation },
      cartItemIdList
    );

    // Actualiza el estado con la información formateada
    setDetailPageInformation(formatedProductInformation);
  }, [productInformation, cartElementList]);

  return (
    <div className="main-container">
      {/* Encabezado con la cantidad de elementos en el carrito */}
      <header className="p-3 header_container w-100">
        <Header numberOfItems={cartElementList.length} />
      </header>
      <main>
        <LogoSection /> {/* Sección del logo */}
        <div className="product-detail">
          {/* Componente para mostrar los detalles del producto */}
          <ProductDetail productInformation={detailPageInformation} />
        </div>
      </main>
      <Footer /> {/* Pie de página */}
    </div>
  );
}

export default ProductDetailPage;