import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { registerUser } from '../../services/api';

// Create async thunk for registration
export const registerUserAsync = createAsyncThunk(
  'registration/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await registerUser(userData);
      return response;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const initialState = {
  userData: null,
  loading: false,
  error: null
};

const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    clearUserData: (state) => {
      state.userData = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUserAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
        state.error = null;
      })
      .addCase(registerUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearUserData } = registrationSlice.actions;
export default registrationSlice.reducer;
