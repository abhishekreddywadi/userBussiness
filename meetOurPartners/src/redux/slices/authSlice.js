import { createSlice } from '@reduxjs/toolkit';

// Helper function to get stored user data
const getStoredUserData = () => {
  try {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error parsing stored user data:', error);
    return null;
  }
};

const initialState = {
  user: getStoredUserData(),
  token: localStorage.getItem('token'),
  refreshToken: localStorage.getItem('refreshToken'),
  isAuthenticated: !!(localStorage.getItem('token') && getStoredUserData()),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      const userData = {
        userCode: action.payload.userCode,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        roles: action.payload.roles,
      };
      
      state.loading = false;
      state.isAuthenticated = true;
      state.user = userData;
      state.token = action.payload.tokenData.token;
      state.refreshToken = action.payload.tokenData.refreshToken;
      
      // Store in localStorage
      localStorage.setItem('token', action.payload.tokenData.token);
      localStorage.setItem('refreshToken', action.payload.tokenData.refreshToken);
      localStorage.setItem('userData', JSON.stringify(userData));
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      
      // Clear localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('userData');
    },
    updateTokens: (state, action) => {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      
      // Update localStorage
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('refreshToken', action.payload.refreshToken);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.error = null;
      
      // Clear localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('userData');
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, updateTokens, logout } = authSlice.actions;
export default authSlice.reducer;
