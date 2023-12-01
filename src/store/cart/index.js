import { createSlice } from "@reduxjs/toolkit";

const getNewCartElement = (elementInformation) => ({
  id: elementInformation.id,
  imageUrl: elementInformation.imageUrl,
  name: elementInformation.name,
  price: elementInformation.price,
  totalPrice: elementInformation.price,
});

const cartSlice = createSlice({
  name: "cartList",
  initialState: { list: [] },
  reducers: {
    addCartElement: (state, action) => {
      const newCartItem = getNewCartElement(action.payload);
      state.list.push(newCartItem);
    },
    removeCartElement: (state, action) => {
      state.list = state.list.filter(
        (element) => element.id !== action.payload
      );
    },
    updateCartProductQuantity: (state, action) => {
      const cartItemIndex = state.list.findIndex(
        (cartItem) => cartItem.id === action.payload.id
      );
      if (cartItemIndex > -1) {
        state.list[cartItemIndex].amount = action.payload.amount;
      }
    },
    clear: () => {
      return { list: [] };
    },
  },
});

export default cartSlice.reducer;

export const { removeCartElement, addCartElement, updateCartProductQuantity } =
  cartSlice.actions;
