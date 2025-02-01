import { configureStore } from '@reduxjs/toolkit';
import registrationReducer from './slices/registrationSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    registration: registrationReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
