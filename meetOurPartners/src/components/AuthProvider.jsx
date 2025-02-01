import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateTokens, logout } from '../redux/slices/authSlice';
import { refreshUserToken } from '../services/api';
import api from '../services/api';

const REFRESH_INTERVAL = 25 * 60 * 1000; // 25 minutes in milliseconds

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const shouldRefreshToken = () => {
    const lastRefreshTime = localStorage.getItem('lastTokenRefresh');
    if (!lastRefreshTime) return true;

    const timeSinceLastRefresh = Date.now() - parseInt(lastRefreshTime);
    return timeSinceLastRefresh >= REFRESH_INTERVAL;
  };

  const refreshToken = async (force = false) => {
    try {
      const storedRefreshToken = localStorage.getItem('refreshToken');
      if (!storedRefreshToken) return false;
      // Only refresh if forced or if it's time to refresh
      if (!force && !shouldRefreshToken()) return true;

      const response = await refreshUserToken(storedRefreshToken);
      dispatch(updateTokens(response));
      localStorage.setItem('lastTokenRefresh', Date.now().toString());
      return true;
    } catch (error) {
      console.error('Token refresh failed:', error);
      dispatch(logout());
      navigate('/login');
      return false;
    }
  };

  useEffect(() => {
    let refreshInterval;

    if (isAuthenticated) {
      // Only refresh on mount if needed
      if (shouldRefreshToken()) {
        refreshToken();
      }

      // Set up token refresh interval
      refreshInterval = setInterval(() => refreshToken(), REFRESH_INTERVAL);

      // Set up axios interceptor for 401 responses
      const interceptor = api.interceptors.response.use(
        (response) => response,
        async (error) => {
          const originalRequest = error.config;

          // If the error is 401 and we haven't tried to refresh the token yet
          if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            // Force refresh token on 401 error
            const refreshed = await refreshToken(true);
            if (refreshed) {
              // Retry the original request with the new token
              const token = localStorage.getItem('token');
              originalRequest.headers['Authorization'] = `Bearer ${token}`;
              return api(originalRequest);
            }
          }

          return Promise.reject(error);
        }
      );

      return () => {
        clearInterval(refreshInterval);
        api.interceptors.response.eject(interceptor);
      };
    }
  }, [isAuthenticated, dispatch, navigate]);

  return children;
};

export default AuthProvider;
