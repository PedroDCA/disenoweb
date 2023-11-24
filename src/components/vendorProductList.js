import VendorProduct from "./vendorProduct";

function VendorProductList({ productList }) {
  return (
    <div className="vendor-product-container">
      {productList?.map?.((product, index) => (
        <div key={index} className="vendor-product-details">
          <div className="vendor-product-header">
            <table>
              <thead>
                <tr>
                  <td></td>
                  <td>Producto</td>
                  <td>Precio</td>
                  <td>Color</td>
                  <td>Tamano</td>
                  <td>Vendedor</td>
                  <td>Etiquetas</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <VendorProduct productInformation={product} />
                </tr>
                <tr>
                  <td>
                    <button className="vendor-product-button">Actualizar</button>
                    <button className="vendor-product-button">Desactivar</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}

export default VendorProductList;