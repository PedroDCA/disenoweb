import VendorProduct from "./vendorProduct";

function VendorProductList({ productList }) {
  return (
    <div>
      {productList?.map?.((product, index) => (
        <table key={index}>
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
              <VendorProduct productInformation={product} key={index} />
            </tr>
            <tr>
              <td>
                <button>Actualizar</button>
                <button>Desactivar</button>
              </td>
            </tr>
          </tbody>
        </table>
      ))}
    </div>
  );
}

export default VendorProductList;
