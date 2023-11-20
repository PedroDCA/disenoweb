import { useParams } from "react-router-dom";
import Header from "./header";
import LogoSection from "./logoSection";
import ProductDetail from "./productDetail";
import { useEffect, useState } from "react";
import {
  formatProductForDetailPage,
  getProductDetailById,
} from "../service/productService";
import { useSelector } from "react-redux";

function ProductDetailPage() {
  const { productId } = useParams();
  const [productInformation, setProductInformation] = useState({});
  const [detailPageInformation, setDetailPageInformation] = useState({});
  const cartElementList = useSelector((state) => state.cart.list);

  useEffect(() => {
    const updatedProductInformation = getProductDetailById(productId);
    setProductInformation(updatedProductInformation);
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
    <>
      <header className="p-3 header_container w-100">
        <Header numberOfItems={cartElementList.length} />
      </header>
      <main>
        <LogoSection />
        <ProductDetail productInformation={detailPageInformation} />
      </main>
    </>
  );
}

export default ProductDetailPage;