import { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUserAsync } from '../redux/slices/registrationSlice';
import { registerUser, getCountries, getStates, getCities, getNamePrefixes, getDocumentTypes, validateRegistration, sendOtp, verifyOtp } from '../services/api';
import { mapAdultFormToApiData } from '../utils/adultFormMapper';

const AdultRegistrationForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error: reduxError } = useSelector((state) => state.registration);
  const { ageGroup } = useParams();
  const [error, setError] = useState('');
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [namePrefixes, setNamePrefixes] = useState([]);
  const [documentTypes, setDocumentTypes] = useState([]);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const [validatedData, setValidatedData] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [otpTimer, setOtpTimer] = useState(300); // 5 minutes in seconds
  const [otpTimerActive, setOtpTimerActive] = useState(false);
  const [otpSending, setOtpSending] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const [formData, setFormData] = useState({
    legalName: '',
    surname: '',
    gender: 'Male',
    phone: '',
    email: '',
    countryId: '',
    stateId: '',
    cityId: '',
    postcode: '',
    idProof: 'Aadhar Number',
    aadharNumber: '',
    nickname: '',
    dob: '',
    localAddress: '',
    contactNumber: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    let interval;
    if (otpTimerActive && otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer(prev => prev - 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [otpTimerActive, otpTimer]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSendOtp = async () => {
    if (otpSending) return;
    
    try {
      setOtpSending(true);
      
      if (!formData.email) {
        setError('No email address available to send OTP');
        return;
      }

      const otpPayload = {
        email: formData.email,
        phoneNumber: '',
        masterUserId: 0
      };

      await sendOtp(otpPayload);
      
      setOtpTimer(300);
      setOtpTimerActive(true);
      setOtpVerified(false);
      setError('OTP sent successfully!');
    } catch (err) {
      console.error('Failed to send OTP:', err);
      if (err.response?.data?.errors) {
        const errors = err.response.data.errors.reduce((acc, error) => {
          acc[error.propertyName.toLowerCase()] = error.errorMessage;
          return acc;
        }, {});
        setValidationErrors(errors);
        setError(err.response.data.errors[0].errorMessage);
      } else {
        setError('Failed to send OTP. Please try again.');
      }
    } finally {
      setOtpSending(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isProcessing) return;
    
    setError('');
    setValidationErrors({});
    setIsProcessing(true);

    try {
      const apiData = mapAdultFormToApiData(formData);
      
      // First validate registration
      const validationResponse = await validateRegistration(apiData);
      console.log('Validation successful:', validationResponse);
      
      // Store validated data for later use
      setValidatedData(apiData);
      
      // Show OTP modal
      setShowOtpModal(true);
      // Don't send OTP here since validateRegistration already sends it
      setOtpTimer(300);
      setOtpTimerActive(true);
      setError('OTP sent successfully!');
      
    } catch (err) {
      console.error('Validation error:', err);
      if (err.response?.data?.errors) {
        // Transform errors to match the format used in RegistrationForm
        const errors = err.response.data.errors.reduce((acc, error) => {
          acc[error.propertyName.toLowerCase()] = error.errorMessage;
          return acc;
        }, {});
        setValidationErrors(errors);
        // Set the first error message as the main error
        setError(err.response.data.errors[0].errorMessage);
      } else {
        setError(err?.message || 'Validation failed. Please try again.');
      }
      console.error('Validation error:', err);
      setShowOtpModal(false);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleResendOtp = async () => {
    if (isProcessing || otpSending || otpTimer > 0) return;
    await handleSendOtp();
  };

  const handleVerifyOtp = async () => {
    if (!otpValue) {
      setError('Please enter OTP');
      return;
    }

    setIsProcessing(true);
    try {
      const verifyPayload = {
        email: formData.email,
        phoneNumber: formData.phone,
        otp: otpValue
      };
      
      // Verify OTP
      await verifyOtp(verifyPayload);
      setOtpVerified(true);
      setError('OTP verified successfully!');
      
      // If OTP verification successful, proceed with registration
      if (validatedData) {
        // Dispatch the registration action
        const resultAction = await dispatch(registerUserAsync(validatedData));
        
        if (registerUserAsync.fulfilled.match(resultAction)) {
          console.log('Registration successful:', resultAction.payload);
          alert('Registration successful! You will be redirected to the login page.');
          navigate('/login');
        } else {
          throw new Error(resultAction.error?.message || 'Registration failed');
        }
      }
    } catch (err) {
      setError(err?.message || 'OTP verification failed. Please try again.');
      console.error('Verification error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRegistration = async () => {
    try {
      setIsProcessing(true);
      const mappedData = mapAdultFormToApiData(formData);
      console.log('Mapped adult form data:', mappedData);
      
      const response = await registerUser(mappedData);
      if (response.success) {
        setError('Registration successful!');
        dispatch(setUserData(response.data));
        setTimeout(() => {
          // navigate('/dashboard');
        }, 1500);
      } else {
        setError(response.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setError(err.message || 'An error occurred during registration');
    } finally {
      setIsProcessing(false);
      setShowOtpModal(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getFieldError = (fieldName) => {
    return validationErrors[fieldName];
  };

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [countriesRes, prefixesRes, documentTypesRes] = await Promise.all([
          getCountries(),
          getNamePrefixes(),
          getDocumentTypes()
        ]);
        setCountries(countriesRes);
        setNamePrefixes(prefixesRes);
        setDocumentTypes(documentTypesRes);
      } catch (err) {
        console.error('Error loading initial data:', err);
        setError('Failed to load form data. Please refresh the page.');
      }
    };

    loadInitialData();
  }, []);

  useEffect(() => {
    const loadStates = async () => {
      if (formData.countryId) {
        try {
          const statesData = await getStates(formData.countryId);
          setStates(statesData);
        } catch (err) {
          console.error('Error loading states:', err);
        }
      }
    };

    loadStates();
  }, [formData.countryId]);

  useEffect(() => {
    const loadCities = async () => {
      if (formData.stateId) {
        try {
          const citiesData = await getCities(formData.stateId);
          setCities(citiesData);
        } catch (err) {
          console.error('Error loading cities:', err);
        }
      }
    };

    loadCities();
  }, [formData.stateId]);

  return (
    <div className="min-h-screen w-screen bg-gradient-to-b from-green-400 to-green-100 py-12 px-4 sm:px-6 lg:px-8">
      {showOtpModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full shadow-2xl transform transition-all">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">OTP Verification</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter OTP sent to your email
                </label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={otpValue}
                    onChange={(e) => setOtpValue(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter OTP"
                  />
                  <button
                    onClick={handleVerifyOtp}
                    disabled={!otpValue}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    Verify
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <button
                  onClick={handleResendOtp}
                  disabled={otpTimer > 0 || otpSending}
                  className="text-green-600 hover:text-green-700 disabled:text-gray-400 text-sm font-medium transition-colors duration-200"
                >
                  Resend OTP
                </button>
                {otpTimer > 0 && (
                  <span className="text-sm text-gray-500">
                    Resend in {Math.floor(otpTimer / 60)}:{(otpTimer % 60).toString().padStart(2, '0')}
                  </span>
                )}
              </div>

              {error && (
                <p className={`text-sm ${error.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
                  {error}
                </p>
              )}

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowOtpModal(false)}
                  className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRegistration}
                  disabled={!otpVerified || isProcessing}
                  className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {isProcessing ? 'Processing...' : 'Complete Registration'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="px-8 py-6 bg-green-500 text-white">
          <h1 className="text-3xl font-bold text-center">Register Here</h1>
        </div>

        <div className="p-8">
          {error && (
            <div className={`mb-6 px-4 py-3 rounded-lg ${
              error.includes('successfully') 
                ? 'bg-green-50 border border-green-400 text-green-700' 
                : 'bg-red-50 border border-red-400 text-red-700'
            }`} role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Prefix and Legal Name */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Name Prefix <span className="text-red-500">*</span>
                </label>
                <select
                  name="namePrefixId"
                  value={formData.namePrefixId}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    getFieldError('namePrefixId') ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white`}
                  required
                >
                  <option value="">Select Prefix</option>
                  {namePrefixes.map(prefix => (
                    <option key={prefix.id} value={prefix.id}>{prefix.name}</option>
                  ))}
                </select>
                {getFieldError('namePrefixId') && (
                  <p className="text-xs text-red-500 mt-1">{getFieldError('namePrefixId')}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Legal Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="legalName"
                  value={formData.legalName}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    getFieldError('legalName') ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                  required
                  autoComplete="name"
                />
                {getFieldError('legalName') && (
                  <p className="text-xs text-red-500 mt-1">{getFieldError('legalName')}</p>
                )}
              </div>

              {/* Surname and Gender */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Surname <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="surname"
                  value={formData.surname}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    getFieldError('surname') ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                  required
                  autoComplete="family-name"
                />
                {getFieldError('surname') && (
                  <p className="text-xs text-red-500 mt-1">{getFieldError('surname')}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Gender <span className="text-red-500">*</span>
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    getFieldError('gender') ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white`}
                  required
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {getFieldError('gender') && (
                  <p className="text-xs text-red-500 mt-1">{getFieldError('gender')}</p>
                )}
              </div>

              {/* Phone and Email */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    getFieldError('phone') ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                  required
                  autoComplete="tel"
                />
                {getFieldError('phone') && (
                  <p className="text-xs text-red-500 mt-1">{getFieldError('phone')}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    getFieldError('email') ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                  required
                  autoComplete="email"
                />
                {getFieldError('email') && (
                  <p className="text-xs text-red-500 mt-1">{getFieldError('email')}</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      getFieldError('password') ? 'border-red-500' : 'border-gray-300'
                    } focus:ring-2 focus:ring-green-500 focus:border-transparent pr-10`}
                    placeholder="Enter your password"
                    required
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                        <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                      </svg>
                    )}
                  </button>
                </div>
                {getFieldError('password') && (
                  <p className="text-xs text-red-500 mt-1">{getFieldError('password')}</p>
                )}
              </div>

              {/* Document Type and Number */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  ID Proof Type <span className="text-red-500">*</span>
                </label>
                <select
                  name="documentTypeId"
                  value={formData.documentTypeId}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    getFieldError('documentTypeId') ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white`}
                  required
                >
                  <option value="">Select Document Type</option>
                  {documentTypes.map(type => (
                    <option key={type.id} value={type.id}>{type.name}</option>
                  ))}
                </select>
                {getFieldError('documentTypeId') && (
                  <p className="text-xs text-red-500 mt-1">{getFieldError('documentTypeId')}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  ID Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="aadharNumber"
                  value={formData.aadharNumber}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    getFieldError('aadharNumber') ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                  required
                />
                {getFieldError('aadharNumber') && (
                  <p className="text-xs text-red-500 mt-1">{getFieldError('aadharNumber')}</p>
                )}
              </div>

              {/* Location Fields */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Country <span className="text-red-500">*</span>
                </label>
                <select
                  name="countryId"
                  value={formData.countryId}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    getFieldError('countryId') ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white`}
                  required
                >
                  <option value="">Select Country</option>
                  {countries.map(country => (
                    <option key={country.id} value={country.id}>{country.name}</option>
                  ))}
                </select>
                {getFieldError('countryId') && (
                  <p className="text-xs text-red-500 mt-1">{getFieldError('countryId')}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  State <span className="text-red-500">*</span>
                </label>
                <select
                  name="stateId"
                  value={formData.stateId}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    getFieldError('stateId') ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white`}
                  required
                >
                  <option value="">Select State</option>
                  {states.map(state => (
                    <option key={state.id} value={state.id}>{state.name}</option>
                  ))}
                </select>
                {getFieldError('stateId') && (
                  <p className="text-xs text-red-500 mt-1">{getFieldError('stateId')}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  City <span className="text-red-500">*</span>
                </label>
                <select
                  name="cityId"
                  value={formData.cityId}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    getFieldError('cityId') ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white`}
                  required
                >
                  <option value="">Select City</option>
                  {cities.map(city => (
                    <option key={city.id} value={city.id}>{city.name}</option>
                  ))}
                </select>
                {getFieldError('cityId') && (
                  <p className="text-xs text-red-500 mt-1">{getFieldError('cityId')}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Postcode <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="postcode"
                  value={formData.postcode}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    getFieldError('postcode') ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                  required
                  autoComplete="postal-code"
                />
                {getFieldError('postcode') && (
                  <p className="text-xs text-red-500 mt-1">{getFieldError('postcode')}</p>
                )}
              </div>

              {/* Additional Fields */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Nickname
                </label>
                <input
                  type="text"
                  name="nickname"
                  value={formData.nickname}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    getFieldError('dob') ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                  required
                />
                {getFieldError('dob') && (
                  <p className="text-xs text-red-500 mt-1">{getFieldError('dob')}</p>
                )}
              </div>
            </div>

            {/* Full Width Fields */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Local Address
              </label>
              <textarea
                name="localAddress"
                value={formData.localAddress}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                rows="3"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-6">
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full sm:w-auto px-8 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {isProcessing ? 'Processing...' : 'Register'}
              </button>
            </div>
          </form>

          {/* Login Link */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-green-600 hover:text-green-700 font-medium">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdultRegistrationForm;
