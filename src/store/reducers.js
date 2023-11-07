import { AddCartElement, RemoveCartElement } from "./actions";

const getNewCartElement = (elementInformation) => ({
  id: elementInformation.id,
  imageUrl: elementInformation.imageUrl,
  name: elementInformation.name,
  price: elementInformation.price,
});

function addCartElement(cartList, elementInformation) {
  const newCartElement = getNewCartElement(elementInformation);
  return cartList.push(newCartElement);
}

const removeCartElement = (cartList, elementInformation) =>
  cartList.filter((element) => element.id !== elementInformation.id);

function StoreReducer(state, action) {
  const cartList = [...state];
  switch (action.type) {
    case AddCartElement:
      return addCartElement(cartList, action.payload);
    case RemoveCartElement:
      return removeCartElement(cartList, action.payload);
    default:
      return state;
  }
}

export default StoreReducer;
