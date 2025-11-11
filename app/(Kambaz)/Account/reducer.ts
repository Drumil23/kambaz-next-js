import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type User = {
  _id?: string;
  firstName?: string;
  lastName?: string;
  loginId?: string;
  section?: string;
  role?: string;
  lastActivity?: string;
  totalActivity?: string;
  [key: string]: unknown;
};

interface AccountState {
  currentUser: User | null;
}

const initialState: AccountState = {
  currentUser: null,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User | null>) => {
      state.currentUser = action.payload;
    },
  },
});

export const { setCurrentUser } = accountSlice.actions;
export default accountSlice.reducer;