import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginStart, loginSuccess, loginFailure } from '../redux/slices/authSlice';
import { login } from '../services/api';
import QRCode from '../assets/qr-code';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    dispatch(loginStart());
    try {
      const response = await login(formData);
      if (response && response.tokenData) {
        const userData = {
          userCode: response.userCode,
          firstName: response.firstName,
          lastName: response.lastName,
          roles: response.roles,
          tokenData: response.tokenData
        };
        dispatch(loginSuccess(userData));
        navigate('/dashboard', { replace: true });
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Login failed';
      dispatch(loginFailure(errorMessage));
    }
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-green-400 via-green-300 to-green-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden flex">
        {/* Left side - Partners */}
        <div className="w-1/2 p-8 bg-white">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Meet Our Partners</h2>
          <p className="text-gray-600 mb-8">
            Connect with our network of trusted partners and expand your opportunities.
          </p>
          <div className="grid grid-cols-3 gap-4">
            {/* Partner logos */}
            <div className="p-2 hover:shadow-md transition-shadow duration-200 rounded-lg">
              <img src="/partner1.png" alt="Partner 1" className="w-full h-auto" />
            </div>
            {/* Add more partner logos similarly */}
          </div>
        </div>

        {/* Right side - Login Form */}
        <div className="w-1/2 p-8 bg-white border-l">
          <div className="flex justify-end mb-6">
            <QRCode />
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full p-3 rounded-md text-white font-medium ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-green-500 hover:bg-green-600'
              }`}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <div className="text-center">
              <a href="/forgot-password" className="text-gray-600 hover:text-gray-800">
                Forgot password?
              </a>
            </div>

            <div className="text-center">
              <span className="text-gray-600">Don't have an account? </span>
              <a href="/signup" className="text-green-500 hover:text-green-600 font-medium">
                Signup
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
