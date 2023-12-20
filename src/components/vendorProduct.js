import { formatPriceForColonCurrency } from "../service/priceService";
import '../styles/vendorProductList.css' ; 

function VendorProduct({ productInformation }) {
  return (
    <>
      <td >
        <div className="vendor-product-image">
        <img src={productInformation.imageUrl} alt="Vendor order information" />
        </div>
      </td>
      <td >{productInformation.name}</td>
      <td className="vendor-product-price">{formatPriceForColonCurrency(productInformation.price)}</td>
      <td>{productInformation.color}</td>
      <td>{productInformation.storage}ml</td>
      <td>{productInformation.vendorName}</td>
    </>
  );
}

export default VendorProduct;
