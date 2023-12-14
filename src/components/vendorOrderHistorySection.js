import VendorProduct from "./vendorProduct";
import '../styles/vendorOrderHistory.css' ;
import { useState } from 'react';
import { updateOrderStatusAsync } from "../service/orderService";

function VendorOrderHistorySection({ orderList }) {
// Se inicializa un estado llamado 'statuses' para almacenar los estados de los pedidos y una función 'setStatuses' para actualizar este estado.
const [statuses, setStatuses] = useState({});

// Esta función getStatusClass recibe un estado ('ready', 'pending' o 'sent') y devuelve una clase CSS correspondiente.
const getStatusClass = (status) => {
  switch (status) {
    case 'ready':
      return 'completed';
    case 'pending':
      return 'pending';
    case 'sent':
      return 'sent';
    default:
      return '';
  }
};

// La función handleStatusChange se llama cuando se cambia el estado en un select.
// Actualiza el estado 'statuses' con el nuevo estado del pedido en la posición index.
const handleStatusChange = (index, status, orderId) => {
  const updatedStatuses = { ...statuses }; // Se crea una copia del estado 'statuses'.
  updatedStatuses[index] = status; // Se actualiza el estado del pedido en la posición 'index'.
  setStatuses(updatedStatuses); // Se actualiza el estado 'statuses' con el nuevo estado del pedido.
  updateOrderStatusAsync(orderId, status);
};

// Se renderiza la lista de pedidos con la función map().
// Para cada pedido en orderList, se crea un div que contiene la información del pedido y un select para cambiar su estado.
return (
  <div className="vendor-product-container">
    {orderList?.map?.((order, index) => {
      // Se crea un objeto 'vendorProductInformation' con los detalles del pedido para pasar al componente VendorProduct.
      const vendorProductInformation = order.products[0];

      return (
        <div key={index} className="order-item"> 
          <strong className="order-id">Order ID: {order.id}</strong>
          <VendorProduct productInformation={vendorProductInformation} />
          <div className="order-details">
            <p>Direccion: {order.address}</p>
            <select
              // El valor del select se establece según el estado del pedido en 'statuses' o el estado original del pedido.
              value={statuses[index] || order.state} 
              // Se llama a handleStatusChange cuando se cambia el valor del select.
              onChange={(e) => {
                handleStatusChange(index, e.target.value, order.id);
              }}
              // La clase del select se establece según el estado del pedido en 'statuses' o el estado original del pedido.
              className={
                statuses[index]
                  ? getStatusClass(statuses[index]) 
                  : getStatusClass(order.state) 
              }
            >
              <option value="ready">Completado</option>
              <option value="sent">Enviado</option>
              <option value="pending">Pendiente</option>
            </select>
          </div>
          <hr className="separator" />
        </div>
      );
    })}
  </div>
);
}

export default VendorOrderHistorySection;
