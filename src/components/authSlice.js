import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.error = null;
    },
    setError: (state, action) => {
      state.user = null;
      state.error = action.payload;
    },
  },
});

export const { setUser, setError } = authSlice.actions;
export default authSlice.reducer;
