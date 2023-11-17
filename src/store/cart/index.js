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
  initialState: [],
  reducers: {
    addCartElement: (state, action) => {
      const newCartItem = getNewCartElement(action.payload);
      state.push(newCartItem);
    },
    removeCartElement: (state, action) => {
      return state.filter((element) => element.id !== action.payload);
    },
    updateTotalPrice: (state, action) => {
      const cartItemIndex = state.findIndex(
        (cartItem) => cartItem.id === action.payload.id
      );
      if (cartItemIndex > -1) {
        state[cartItemIndex].totalPrice = action.payload.totalPrice;
      }
    },
  },
});

export default cartSlice.reducer;

export const { removeCartElement, addCartElement, updateTotalPrice } =
  cartSlice.actions;
