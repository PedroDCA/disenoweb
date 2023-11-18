import { configureStore } from "@reduxjs/toolkit";
import cartReducer, {
  addCartElement,
  removeCartElement,
  updateTotalPrice,
} from "./cart";
import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";

const persistConfiguration = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfiguration, cartReducer);

const store = configureStore({
  reducer: {
    cart: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export default store;

export { addCartElement, removeCartElement, updateTotalPrice, persistor };
