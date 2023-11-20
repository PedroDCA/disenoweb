import CheckoutItem from "./checkoutItem";
import "../styles/checkoutItemList.css";

function CheckoutItemList({ cartElementList }) {
  return (
    <div className="cartContainer">
      <h1 className="titleCarritoCompras">CARRITO DE COMPRAS</h1>
      <table className="cartTable">
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
        <tbody>
          {cartElementList?.map?.((cartElement, index) => (
            <CheckoutItem itemInformation={cartElement} key={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CheckoutItemList;
