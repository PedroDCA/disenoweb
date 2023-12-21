import UserOrder from "./userOrder";

// Componente funcional que recibe una lista de pedidos (orderList) como propiedad
function UserOrderHistorySection({ orderList }) {
  return (
    <div>
      {/* Mapea la lista de pedidos y renderiza el componente UserOrder para cada pedido */}
      {orderList?.map?.((order, index) => (
        <UserOrder orderInformation={order} key={index} />
        // Cada elemento de la lista recibe la información del pedido y una clave única (key) para su identificación
      ))}
    </div>
  );
}


export default UserOrderHistorySection;
