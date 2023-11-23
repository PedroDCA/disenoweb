import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
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
      return { id: undefined };
    },
  },
});

export default userSlice.reducer;

export const { logIn, logOut } = userSlice.actions;
