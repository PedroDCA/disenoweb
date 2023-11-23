import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: { id: undefined, isLoggedIn: false },
  reducers: {
    logIn: (state, action) => {
      state.id = action.payload.id;
      state.type = action.payload.type;
      state.isLoggedIn = true;
    },
    logOut: (state) => {
      state.id = undefined;
      state.type = undefined;
      state.isLoggedIn = false;
    },
    clear: () => {
      return { id: undefined, isLoggedIn: false };
    },
  },
});

export default profileSlice.reducer;

export const { logIn, logOut } = profileSlice.actions;
