import { useEffect, useState } from "react";
import { formatPriceForColonCurrency } from "../service/priceService";
import { useDispatch } from "react-redux";
import { removeCartElement, updateCartProductQuantity } from "../store";
import "../styles/checkoutItem.css";
import { getTotalPrice } from "../service/productService";

function CheckoutItem({ itemInformation }) {
  const [itemQuantity, setItemQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(itemInformation.totalPrice);
  const id = itemInformation.id;
  const dispatch = useDispatch();

  useEffect(() => {
    setTotalPrice(getTotalPrice(itemQuantity, itemInformation.price));
  }, [itemQuantity, itemInformation]);

  useEffect(() => {
    if (!id) {
      return;
    }
    dispatch(
      updateCartProductQuantity({
        id,
        amount: itemQuantity,
      })
    );
  }, [itemQuantity, id, dispatch]);

  const onChangeHandler = (event) => {
    setItemQuantity(event.target.value);
  };
  return (
    <tr>
      <td>
        <button className="customXbutton" onClick={() => dispatch(removeCartElement(itemInformation.id))}>
          X
        </button>
      </td>
      <td>
        <img src={itemInformation.imageUrl} alt="Item example" className="imgProduct" />
      </td>
      <td>{itemInformation.name}</td>
      <td>
        <strong>{formatPriceForColonCurrency(itemInformation.price)}</strong>
      </td>
      <td>
        <input
          defaultValue={itemQuantity}
          type="number"
          min="1"
          onChange={onChangeHandler}
        />
      </td>
      <td>
        <strong>{formatPriceForColonCurrency(totalPrice)}</strong>
      </td>
    </tr>
  );
}

export default CheckoutItem;
