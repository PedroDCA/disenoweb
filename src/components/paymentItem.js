import { useEffect, useState } from "react";
import { formatPriceForColonCurrency } from "../service/priceService";
import { RemoveCartElement, UpdatePrice } from "../store/actions";

function PaymentItem({ itemInformation, dispatch }) {
  const [itemQuantity, setItemQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  const getTotalPrice = (itemQuantity, price) => itemQuantity * price;

  useEffect(() => {
    setTotalPrice(getTotalPrice(itemQuantity, itemInformation.price));
  }, [itemQuantity, itemInformation]);

  useEffect(() => {
    dispatch({
      type: UpdatePrice,
      payload: {
        id: itemInformation.id,
        totalPrice,
      },
    });
  }, [totalPrice, itemInformation, dispatch]);

  const onChangeHandler = (event) => {
    setItemQuantity(event.target.value);
  };
  return (
    <tr>
      <td>
        <button
          onClick={() =>
            dispatch({ type: RemoveCartElement, payload: itemInformation })
          }
        >
          X
        </button>
      </td>
      <td>
        <img src={itemInformation.imageUrl} alt="Item example" />
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

export default PaymentItem;
