import VendorProduct from "./vendorProduct";

function VendorOrderHistorySection({ orderList }) {
  return (
    <div>
      {orderList?.map?.((order, index) => {
        const vendorProductInformation = {
          name: order.name,
          imageUrl: order.imageUrl,
          price: order.totalPrice,
          color: order.color,
          storage: order.storage,
          vendor: { name: order.vendor },
          labels: order.labels,
        };
        return (
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
                <VendorProduct
                  productInformation={vendorProductInformation}
                  key={index}
                />
              </tr>
              <tr>
                <td>
                  <strong>Order ID: {order.id}</strong>
                  <p>Direccion: {order.address}</p>
                  <select defaultValue={order.status}>
                    <option value="ready">Completado</option>
                    <option value="sent">Enviado</option>
                    <option value="pending">Pendiente</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        );
      })}
    </div>
  );
}

export default VendorOrderHistorySection;
