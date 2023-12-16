import React, { useState } from 'react';
import VendorProduct from './vendorProduct';
import { updateOrderStatusAsync } from '../service/orderService';
import '../styles/vendorOrderHistory.css';

function VendorOrderHistorySection({ orderList, getCurrentUser }) {
  const [statuses, setStatuses] = useState({});

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

  const handleStatusChange = (index, status, orderId) => {
    const currentUser = getCurrentUser(); // Obtener el usuario actual
    if (!currentUser.canUpdateOrders) {
      alert('No tienes permisos para actualizar el estado de la orden.');
      return;
    }

    const currentStatus = statuses[index] || orderList[index].state;

    if (currentStatus === 'pending' && status !== 'sent') {
      alert('No se puede cambiar el estado de "pending" a otro estado que no sea "sent".');
      return;
    }

    const confirmed = window.confirm('¿Estás seguro de cambiar el estado?');
    if (!confirmed) {
      return;
    }

    const updatedStatuses = { ...statuses };
    updatedStatuses[index] = status;
    setStatuses(updatedStatuses);
    updateOrderStatusAsync(orderId, status);
  };

  return (
    <div className="vendor-product-container">
      {orderList?.map?.((order, index) => {
        const vendorProductInformation = order.products[0];

        return (
          <div key={index} className="order-item">
            <strong className="order-id">Order ID: {order.id}</strong>
            <VendorProduct productInformation={vendorProductInformation} />
            <div className="order-details">
              <p>Dirección: {order.address}</p>
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
            <hr className="separator" />
          </div>
        );
      })}
    </div>
  );
}

export default VendorOrderHistorySection;