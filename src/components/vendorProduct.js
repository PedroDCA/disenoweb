import { formatPriceForColonCurrency } from "../service/priceService";
import '../styles/vendorProductList.css' ; 

function VendorProduct({ productInformation }) {
  return (
    <>
      {/* Celdas que muestran la información del producto */}
      <td>
        <div className="vendor-product-image">
          <img src={productInformation.imageUrl} alt="Vendor order information" /> {/* Imagen del producto */}
        </div>
      </td>
      <td>{productInformation.name}</td> {/* Nombre del producto */}
      <td className="vendor-product-price">{formatPriceForColonCurrency(productInformation.price)}</td> {/* Precio del producto */}
      <td>{productInformation.color}</td> {/* Color del producto */}
      <td>{productInformation.storage}ml</td> {/* Capacidad de almacenamiento */}
      <td>{productInformation.vendorName}</td> {/* Nombre del vendedor */}
    </>
  );
}

export default VendorProduct;
