import PaymentItem from "./paymentItem";

function PaymentItemList({ cartElementList }) {
  return (
    <div>
      <h1>CARRITO DE COMPRAS</h1>
      <table>
        <thead>
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
            <PaymentItem itemInformation={cartElement} key={index}/>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PaymentItemList;
