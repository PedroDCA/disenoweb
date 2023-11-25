import VendorProduct from "./vendorProduct";
import '../styles/vendorProductList.css' ; 


function VendorProductList({ productList }) {
  return (
    <div className="vendor-product-container">
      {productList?.map?.((product, index) => (
        <div key={index} className="vendor-product-details">
          <div className="vendor-product-header">
            <table>
              <thead>
                <tr className="vendor-product-tr">
                  <td className="vendor-product-title"></td>
                  <td className="vendor-product-title">Producto</td>
                  <td className="vendor-product-title">Precio</td>
                  <td className="vendor-product-title">Color</td>
                  <td className="vendor-product-title">Tamano</td>
                  <td className="vendor-product-title">Vendedor</td>
                  <td className="vendor-product-title">Etiquetas</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <VendorProduct productInformation={product} />
                </tr>
                </tbody>
            </table>
            <div className="button-container">
                      <button className="vendor-product-button-update">Actualizar</button>
                      <button className="vendor-product-button-deactivate">Desactivar</button>
                  </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default VendorProductList;