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

const loadCurrentUser = (): User | null => {
  try {
    if (typeof window === "undefined") return null;
    const raw = sessionStorage.getItem("kambaz.currentUser");
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
};

const initialState: AccountState = {
  currentUser: loadCurrentUser(),
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