import React, { useState } from 'react';
import VendorProduct from './vendorProduct';
import { updateOrderStatusAsync } from '../service/orderService';
import '../styles/vendorOrderHistory.css';
import Swal from "sweetalert2";
function VendorOrderHistorySection({ orderList, getCurrentUser }) {
  const [statuses, setStatuses] = useState({}); // Estado para almacenar los estados de las órdenes

  // Función para obtener la clase de estilo según el estado de la orden
  const getStatusClass = (status) => {
    switch (status) {
      case 'ready':
        return 'completed'; // Estilo para órdenes completadas
      case 'pending':
        return 'pending'; // Estilo para órdenes pendientes
      case 'sent':
        return 'sent'; // Estilo para órdenes enviadas
      default:
        return '';
    }
  };

  // Función para manejar el cambio de estado de la orden
  const handleStatusChange = (index, status, orderId) => {
    const currentUser = getCurrentUser ? getCurrentUser() : { canUpdateOrders: true };
    console.log('Current User:', currentUser); // Loguea el objeto currentUser

    // Verifica si el usuario actual tiene permiso para actualizar órdenes
    if (!currentUser.canUpdateOrders) {
      // Muestra una alerta si el usuario no tiene permisos
      Swal.fire({
        icon: 'error',
        title: 'Permiso denegado',
        text: 'No tienes permisos para actualizar el estado de la orden.',
      });
      return;
    }

    const currentStatus = statuses[index] || orderList[index].state;

    // Verifica restricciones al cambiar el estado de la orden
    if (currentStatus === 'pending' && status !== 'sent') {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se puede cambiar el estado de "pending" a otro estado que no sea "sent".',
      });
      return;
    }

    // Muestra una confirmación para cambiar el estado de la orden
    Swal.fire({
      icon: 'question',
      title: '¿Estás seguro de cambiar el estado?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedStatuses = { ...statuses };
        updatedStatuses[index] = status;
        setStatuses(updatedStatuses);
        updateOrderStatusAsync(orderId, status); // Actualiza el estado de la orden en el servicio
      }
    });
  };

  // Renderiza la lista de órdenes del vendedor con sus detalles y opción para cambiar el estado
  return (
    <div className="vendor-product-container">
      {orderList?.map?.((order, index) => {
        const vendorProductInformation = order.products[0]; // Información del producto del vendedor

        return (
          <div key={index} className="order-item">
            <strong className="order-id">Order ID: {order.id}</strong>
            <VendorProduct productInformation={vendorProductInformation} /> {/* Información del producto */}
            <div className="order-details">
              <p>Dirección: {order.address}</p> {/* Detalles de la orden */}
              {/* Selector para cambiar el estado de la orden */}
              <select
                value={statuses[index] || order.state}
                onChange={(e) => {
                  handleStatusChange(index, e.target.value, order.id);
                }}
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
            <hr className="separator" /> {/* Separador entre órdenes */}
          </div>
        );
      })}
    </div>
  );
}


export default VendorOrderHistorySection;