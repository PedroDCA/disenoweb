import CheckoutItem from "./checkoutItem";
import "../styles/checkoutItemList.css";
// Definición del componente CheckoutItemList que recibe cartElementList como prop
function CheckoutItemList({ cartElementList }) {
  return (
    // Contenedor principal del carrito de compras
    <div className="cartContainer">
      {/* Título del carrito de compras */}
      <h1 className="titleCarritoCompras">CARRITO DE COMPRAS</h1>
      {/* Tabla para mostrar los elementos del carrito */}
      <table className="cartTable">
        {/* Encabezados de la tabla */}
        <thead className="theadColor">
          <tr>
            <th></th>
            <th></th>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        {/* Cuerpo de la tabla */}
        <tbody>
          {/* Mapeo de los elementos del carrito para mostrar cada CheckoutItem */}
          {cartElementList?.map?.((cartElement, index) => (
            <CheckoutItem itemInformation={cartElement} key={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CheckoutItemList; // Exporta el componente CheckoutItemList