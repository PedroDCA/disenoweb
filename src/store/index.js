import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartReducer, {
  addCartElement,
  removeCartElement,
  updateTotalPrice,
} from "./cart";
import profileReducer, { logIn, logOut } from "./profile";
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

const combinedReducers = combineReducers({
  cart: cartReducer,
  profile: profileReducer,
})

const persistedReducer = persistReducer(persistConfiguration, combinedReducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export default store;

export { addCartElement, removeCartElement, updateTotalPrice, logIn, logOut, persistor };
