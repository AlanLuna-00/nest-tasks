import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  id: string;
  name: string;
  email: string;
  username: string;
  password: string;
}

const initialState: UserState = {
  id: "",
  name: "",
  email: "",
  username: "",
  password: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.password = action.payload.password;
    },
    setLogout: (state) => {
      state.id = "";
      state.name = "";
      state.email = "";
      state.username = "";
      state.password = "";
    },
  },
});

export const { setUser, setLogout } = userSlice.actions;

export default userSlice.reducer;
