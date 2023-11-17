import { configureStore } from "@reduxjs/toolkit";
import cartReducer, {
  addCartElement,
  removeCartElement,
  updateTotalPrice,
} from "./cart";

export default configureStore({
  reducer: { cart: cartReducer },
});

export { addCartElement, removeCartElement, updateTotalPrice };
