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
  const { productId } = useParams();
  const [productInformation, setProductInformation] = useState({});
  const [detailPageInformation, setDetailPageInformation] = useState({});
  const cartElementList = useSelector((state) => state.cart.list);

  useEffect(() => {
    const updatedProductInformation = getProductDetailByIdAsync(productId);
    updatedProductInformation.then((information) => setProductInformation(updatedProductInformation));
  }, [productId]);

  useEffect(() => {
    const cartItemIdList = cartElementList.map((item) => item.id);
    const formatedProductInformation = formatProductForDetailPage(
      { ...productInformation },
      cartItemIdList
    );
    setDetailPageInformation(formatedProductInformation);
  }, [productInformation, cartElementList]);

  return (
    <div className="main-container">
      <header className="p-3 header_container w-100">
        <Header numberOfItems={cartElementList.length} />
      </header>
      <main>
        <div>
        <LogoSection />
        </div>
        <div className="product-detail">
        <ProductDetail productInformation={detailPageInformation} />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ProductDetailPage;