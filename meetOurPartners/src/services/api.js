import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'https://masterid.in';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const registerUser = async (userData) => {
  try {
    const response = await api.post('/api/user/register', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getCountries = async () => {
  try {
    const response = await api.get('/api/country/all');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getStates = async (countryId) => {
  try {
    const response = await api.get(`/api/country/${countryId}/states`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getCities = async (stateId) => {
  try {
    const response = await api.get(`/api/country/states/${stateId}/cities`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getGuardianRelations = async () => {
  try {
    const response = await api.get('/api/guardianrelations');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const validateMasterUserId = async (masterUserId) => {
  try {
    const response = await api.get(`/api/user/validate-master-userid?masterUserId=${masterUserId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const sendOtp = async (data) => {
  const response = await api.post('/api/otp/send-otp', data);
  return response.data;
};

export const verifyOtp = async (data) => {
  const response = await api.post('/api/otp/verify-otp', data);
  return response.data;
};

export const validateRegistration = async (data) => {
  const response = await api.post('/api/user/validate-register', {
    ...data,
    isEmailVerified: false,
    isPhoneNumberVerified: false,
    validateRequest: true
  });
  return response.data;
};

export const getNamePrefixes = async () => {
  const response = await api.get('/api/nameprefixes');
  return response.data;
};

export const getDocumentTypes = async () => {
  const response = await api.get('/api/documentTypes');
  return response.data;
};

export const login = async (credentials) => {
  try {
    // Transform credentials to match API expectations
    const loginData = {
      email: credentials.email,
      password: credentials.password,
      userType: "User"
    };
    
    const response = await api.post('/api/user/user-login', loginData);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error('Login service is not available. Please try again later.');
    }
    if (error.response?.status === 400) {
      throw new Error(error.response?.data?.message || 'Invalid credentials. Please check your email and password.');
    }
    throw error.response?.data || error.message;
  }
};

export const refreshUserToken = async (refreshToken) => {
  try {
    const response = await api.post('/api/user/refresh-token', { refreshToken });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const forgotPassword = async (email) => {
  try {
    const response = await api.post('/api/user/forgot-password', { email });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const resetPassword = async (email, otp, newPassword) => {
  try {
    const response = await api.post('/api/user/reset-password', {
      email,
      otp,
      newPassword,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export default api;
