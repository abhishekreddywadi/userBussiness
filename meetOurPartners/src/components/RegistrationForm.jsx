import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, getCountries, getStates, getCities, getGuardianRelations, validateMasterUserId, validateRegistration, getNamePrefixes, getDocumentTypes, verifyOtp, sendOtp } from '../services/api';
import { mapFormToApiData } from '../utils/formMapper';
import { registerUserAsync } from '../redux/slices/registrationSlice';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { ageGroup } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [guardianRelations, setGuardianRelations] = useState([]);
  const [namePrefixes, setNamePrefixes] = useState([]);
  const [documentTypes, setDocumentTypes] = useState([]);
  const [formData, setFormData] = useState({
    legalName: '',
    surname: '',
    gender: 'Male',
    phone: '',
    hasPhone: false,
    email: '',
    hasEmail: false,
    guardianName: '',
    guardianEmail: '',
    guardianPhone: '',
    guardianRelation: '',
    idProof: 'Aadhar Number',
    aadharNumber: '',
    contactNumber: '',
    countryId: '',
    stateId: '',
    cityId: '',
    postcode: '',
    schoolName: '',
    nickname: '',
    dob: '',
    termsAccepted: false,
    localAddress: '',
    namePrefixId: '',
    documentTypeId: '',
    guardianId: '',
    password: ''
  });
  const [masterUserId, setMasterUserId] = useState('');
  const [masterUserIdStatus, setMasterUserIdStatus] = useState({ verified: false, message: '' });
  const [validating, setValidating] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpValues, setOtpValues] = useState({
    userOtp: '',
    guardianOtp: ''
  });
  const [otpVerified, setOtpVerified] = useState({
    user: false,
    guardian: false
  });
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [otpTimer, setOtpTimer] = useState({
    user: 300, // 5 minutes in seconds
    guardian: 300
  });
  const [otpTimerActive, setOtpTimerActive] = useState({
    user: false,
    guardian: false
  });
  const [initialOtpSent, setInitialOtpSent] = useState({
    user: false,
    guardian: false
  });
  const [otpSending, setOtpSending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const registrationData = useSelector(state => state.registration.userData);

  useEffect(() => {
    loadCountries();
    loadGuardianRelations();
    loadNamePrefixes();
    loadDocumentTypes();
  }, []);

  useEffect(() => {
    if (formData.countryId) {
      loadStates(formData.countryId);
    }
  }, [formData.countryId]);

  useEffect(() => {
    if (formData.stateId) {
      loadCities(formData.stateId);
    }
  }, [formData.stateId]);

  useEffect(() => {
    const intervals = {};

    if (otpTimerActive.user && otpTimer.user > 0) {
      intervals.user = setInterval(() => {
        setOtpTimer(prev => ({
          ...prev,
          user: prev.user - 1
        }));
      }, 1000);
    }

    if (otpTimerActive.guardian && otpTimer.guardian > 0) {
      intervals.guardian = setInterval(() => {
        setOtpTimer(prev => ({
          ...prev,
          guardian: prev.guardian - 1
        }));
      }, 1000);
    }

    return () => {
      if (intervals.user) clearInterval(intervals.user);
      if (intervals.guardian) clearInterval(intervals.guardian);
    };
  }, [otpTimerActive, otpTimer]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setValidationErrors({});

    if ((formData.hasPhone || formData.hasEmail) && !masterUserIdStatus.verified) {
      setError('Please verify the Master User ID before submitting');
      return;
    }

    try {
      const validationPayload = {
        firstName: formData.legalName || '',
        lastName: formData.surname || '',
        email: formData.email || '',
        nickName: formData.nickname || '',
        namePrefixId: formData.namePrefixId || 0,
        namePrefix: '',
        gender: formData.gender === 'Male' ? 1 : formData.gender === 'Female' ? 2 : 3,
        birthDate: formData.dob || '',
        phoneNumber: formData.phone || '',
        password: formData.password || '',
        schoolName: formData.schoolName || '',
        documentTypeId: formData.documentTypeId || 0,
        documentNumber: formData.aadharNumber || '',
        countryId: formData.countryId || 0,
        stateId: formData.stateId || 0,
        cityId: formData.cityId || 0,
        postcode: formData.postcode || '',
        localAddress: formData.localAddress || '',
        careOfNumber: formData.contactNumber || '',
        guardianId: formData.guardianId || 0,
        guardianRelationId: formData.guardianRelation || 0,
        guardianEmail: formData.guardianEmail || ''
      };

      await validateRegistration(validationPayload);
      
      // After validation success, show modal
      setShowOtpModal(true);
      
      // Send OTP to user's email if provided
      if (!initialOtpSent.user && formData.email) {
        await handleSendOtp('user');
        setInitialOtpSent(prev => ({ ...prev, user: true }));
      }

      // Send OTP to guardian's email if provided and different from user's email
      if (!initialOtpSent.guardian && formData.guardianEmail && formData.guardianEmail !== formData.email) {
        await handleSendOtp('guardian');
        setInitialOtpSent(prev => ({ ...prev, guardian: true }));
      }
    } catch (err) {
      console.error('Validation error:', err);
      if (err.response?.data?.errors) {
        const errors = err.response.data.errors.reduce((acc, error) => {
          acc[error.propertyName.toLowerCase()] = error.errorMessage;
          return acc;
        }, {});
        setValidationErrors(errors);
        setError(err.response.data.errors[0].errorMessage);
      } else {
        setError('Validation failed. Please try again.');
      }
    }
  };

  const handleSendOtp = async (type) => {
    if (otpSending) {
      return;
    }

    try {
      setOtpSending(true);
      let emailToUse = type === 'user' ? formData.email : formData.guardianEmail;

      if (!emailToUse) {
        setError('No email address available to send OTP');
        return;
      }

      const otpPayload = {
        email: emailToUse,
        phoneNumber: '',
        masterUserId: masterUserIdStatus.verified ? parseInt(masterUserId) : 0
      };

      await sendOtp(otpPayload);
      
      // Reset timer and start countdown
      setOtpTimer(prev => ({
        ...prev,
        [type]: 300
      }));
      setOtpTimerActive(prev => ({
        ...prev,
        [type]: true
      }));

      // Reset verification status
      setOtpVerified(prev => ({
        ...prev,
        [type]: false
      }));

      // Clear any existing error
      setError('');
    } catch (err) {
      console.error('Failed to send OTP:', err);
      setError('Failed to send OTP. Please try again.');
    } finally {
      setOtpSending(false);
    }
  };

  const loadCountries = async () => {
    try {
      const data = await getCountries();
      setCountries(data);
    } catch (err) {
      console.error('Error loading countries:', err);
    }
  };

  const loadStates = async (countryId) => {
    try {
      const data = await getStates(countryId);
      setStates(data);
      setFormData(prev => ({ ...prev, stateId: '', cityId: '' }));
    } catch (err) {
      console.error('Error loading states:', err);
    }
  };

  const loadCities = async (stateId) => {
    try {
      const data = await getCities(stateId);
      setCities(data);
      setFormData(prev => ({ ...prev, cityId: '' }));
    } catch (err) {
      console.error('Error loading cities:', err);
    }
  };

  const loadGuardianRelations = async () => {
    try {
      const data = await getGuardianRelations();
      setGuardianRelations(data);
    } catch (err) {
      console.error('Error loading guardian relations:', err);
    }
  };

  const loadNamePrefixes = async () => {
    try {
      const data = await getNamePrefixes();
      setNamePrefixes(data);
    } catch (err) {
      console.error('Failed to load name prefixes:', err);
    }
  };

  const loadDocumentTypes = async () => {
    try {
      const data = await getDocumentTypes();
      const filteredTypes = data.filter(type => 
        ageGroup === 'below16' ? type.isAvailableToBelow16 : type.isAvailableToAbove16
      );
      setDocumentTypes(filteredTypes);
    } catch (err) {
      console.error('Failed to load document types:', err);
    }
  };

  const handleVerifyOtp = async (type) => {
    try {
      const otpPayload = {
        email: type === 'user' ? formData.email : formData.guardianEmail,
        phoneNumber: '',
        otp: type === 'user' ? otpValues.userOtp : otpValues.guardianOtp
      };

      await verifyOtp(otpPayload);
      
      if (type === 'user') {
        setOtpVerified(prev => ({ ...prev, user: true }));
      } else {
        setOtpVerified(prev => ({ ...prev, guardian: true }));
      }

      // Show success message
      setError(`${type === 'user' ? 'User' : 'Guardian'} OTP verified successfully!`);
    } catch (err) {
      console.error('OTP verification failed:', err);
      setError('OTP verification failed. Please try again.');
    }
  };

  const handleRegistration = async () => {
    try {
      setLoading(true);
      setError('');

      const apiData = mapFormToApiData(formData, true);
      if (masterUserIdStatus.verified) {
        apiData.masterUserId = masterUserId;
      }
      
      const resultAction = await dispatch(registerUserAsync(apiData));
      
      if (registerUserAsync.fulfilled.match(resultAction)) {
        console.log('Registration successful:', resultAction.payload);
        setRegistrationSuccess(true);
        setTimeout(() => {
          setShowOtpModal(false);
        }, 2000);
      } else {
        throw new Error(resultAction.error?.message || 'Registration failed');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleMasterUserIdValidation = async () => {
    try {
      const response = await validateMasterUserId(masterUserId);
      setMasterUserIdStatus({
        verified: true,
        message: 'Master User ID verified successfully'
      });
      
      // Update form data with guardian details
      setFormData(prev => ({
        ...prev,
        guardianId: response.id || 0, // Set the guardian ID from the response
        guardianEmail: response.email || '',
        guardianRelation: response.relationId || 0
      }));
    } catch (err) {
      console.error('Master User ID validation failed:', err);
      setMasterUserIdStatus({
        verified: false,
        message: err.response?.data?.message || 'Invalid Master User ID'
      });
    }
  };

  const showGuardianInfo = formData.hasPhone || formData.hasEmail;

  const getFieldError = (fieldName) => {
    return validationErrors[fieldName.toLowerCase()];
  };

  const handleCloseModal = () => {
    setShowOtpModal(false);
    setOtpValues({ userOtp: '', guardianOtp: '' });
    setOtpTimer({ user: 300, guardian: 300 });
    setOtpTimerActive({ user: false, guardian: false });
    setOtpVerified({ user: false, guardian: false });
    setInitialOtpSent({ user: false, guardian: false });
    setError('');
  };

  return (
    <div className="min-h-screen py-8 w-screen bg-gradient-to-br from-green-400 via-green-300 to-green-100 overflow-x-hidden">
      {showOtpModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">OTP Verification</h2>
            <div className="space-y-4">
              {/* Guardian Email OTP Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Enter OTP sent to Guardian's Email ({formData.guardianEmail})
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={otpValues.guardianOtp}
                    onChange={(e) => setOtpValues(prev => ({ ...prev, guardianOtp: e.target.value }))}
                    className="flex-1 p-2 border rounded"
                    placeholder="Enter Guardian OTP"
                  />
                  <button
                    onClick={() => handleVerifyOtp('guardian')}
                    disabled={!otpValues.guardianOtp}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
                  >
                    Verify
                  </button>
                </div>
                {otpVerified.guardian && (
                  <p className="text-green-500 text-sm mt-1">Guardian OTP verified successfully!</p>
                )}
                {/* Resend Guardian OTP Button */}
                <div className="flex justify-between items-center mt-2">
                  <button
                    onClick={() => handleSendOtp('guardian')}
                    disabled={otpTimer.guardian > 0 || otpSending}
                    className="text-blue-500 disabled:text-gray-400"
                  >
                    Resend OTP
                  </button>
                  {otpTimer.guardian > 0 && (
                    <span className="text-sm text-gray-500">
                      Resend in {formatTime(otpTimer.guardian)}
                    </span>
                  )}
                </div>
              </div>

              {error && (
                <p className={`text-sm ${error.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>
                  {error}
                </p>
              )}

              {/* Submit Button */}
              <div className="mt-4 flex justify-end gap-2">
                <button
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRegistration}
                  disabled={!otpVerified.guardian || loading}
                  className={`px-4 py-2 rounded ${
                    !otpVerified.guardian || loading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-green-500 hover:bg-green-600'
                  } text-white`}
                >
                  {loading ? 'Signing up...' : 'Sign Up'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <div className="px-8 my-4 rounded-lg shadow-lg py-6 bg-green-500 text-white">
          <h1 className="text-3xl font-bold text-center">Register Here</h1>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        </div>
        

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-x-6 gap-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Name Prefix *</label>
            <select
              name="namePrefixId"
              value={formData.namePrefixId}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md bg-[#f0f9f0] ${getFieldError('namePrefixId') ? 'border-red-500' : ''}`}
              required
            >
              <option value="">Select Prefix</option>
              {namePrefixes.map(prefix => (
                <option key={prefix.id} value={prefix.id}>
                  {prefix.name}
                </option>
              ))}
            </select>
            {getFieldError('namePrefixId') && (
              <p className="text-red-500 text-sm mt-1">{getFieldError('namePrefixId')}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Legal Name *</label>
            <input
              type="text"
              name="legalName"
              className={`w-full p-2 border rounded-md bg-[#f0f9f0] ${getFieldError('legalName') ? 'border-red-500' : ''}`}
              value={formData.legalName}
              onChange={handleChange}
              required
            />
            {getFieldError('legalName') && (
              <p className="text-red-500 text-sm mt-1">{getFieldError('legalName')}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Surname/Last Name *</label>
            <input
              type="text"
              name="surname"
              className={`w-full p-2 border rounded-md bg-[#f0f9f0] ${getFieldError('surname') ? 'border-red-500' : ''}`}
              value={formData.surname}
              onChange={handleChange}
              required
            />
            {getFieldError('surname') && (
              <p className="text-red-500 text-sm mt-1">{getFieldError('surname')}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Gender *</label>
            <select
              name="gender"
              className={`w-full p-2 border rounded-md bg-[#f0f9f0] ${getFieldError('gender') ? 'border-red-500' : ''}`}
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {getFieldError('gender') && (
              <p className="text-red-500 text-sm mt-1">{getFieldError('gender')}</p>
            )}
          </div>

          <div className="col-span-2 grid grid-cols-2 gap-x-6">
            {/* Phone Number Section */}
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id="hasPhone"
                  name="hasPhone"
                  checked={formData.hasPhone}
                  onChange={(e) => {
                    handleChange({
                      target: {
                        name: 'hasPhone',
                        value: e.target.checked
                      }
                    });
                    if (e.target.checked) {
                      setFormData(prev => ({ ...prev, phone: '' }));
                    } else {
                      setFormData(prev => ({ ...prev, guardianPhone: '', guardianRelation: '' }));
                    }
                  }}
                  className="mr-2"
                />
                <label htmlFor="hasPhone" className="text-gray-700 text-sm">Don't have phone number</label>
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  className={`w-full p-2 border rounded-md bg-gray-100 ${getFieldError('phone') ? 'border-red-500' : ''}`}
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={formData.hasPhone}
                  required={!formData.hasPhone}
                />
                {getFieldError('phone') && (
                  <p className="text-red-500 text-sm mt-1">{getFieldError('phone')}</p>
                )}
              </div>

              {formData.hasPhone && (
                <>
                  <div className="mt-4">
                    <label className="block text-gray-700 mb-1">Guardian Phone Number *</label>
                    <input
                      type="tel"
                      name="guardianPhone"
                      className={`w-full p-2 border rounded-md bg-[#f0f9f0] ${getFieldError('guardianPhone') ? 'border-red-500' : ''}`}
                      value={formData.guardianPhone}
                      onChange={handleChange}
                      required
                    />
                    {getFieldError('guardianPhone') && (
                      <p className="text-red-500 text-sm mt-1">{getFieldError('guardianPhone')}</p>
                    )}
                  </div>
                  <div className="mt-4">
                    <label className="block text-gray-700 mb-1">Guardian Relation *</label>
                    <select
                      name="guardianRelation"
                      className={`w-full p-2 border rounded-md bg-[#f0f9f0] ${getFieldError('guardianRelation') ? 'border-red-500' : ''}`}
                      value={formData.guardianRelation}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a Relation</option>
                      {guardianRelations.map(relation => (
                        <option key={relation.id} value={relation.id}>
                          {relation.name}
                        </option>
                      ))}
                    </select>
                    {getFieldError('guardianRelation') && (
                      <p className="text-red-500 text-sm mt-1">{getFieldError('guardianRelation')}</p>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Email Section */}
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id="hasEmail"
                  name="hasEmail"
                  checked={formData.hasEmail}
                  onChange={(e) => {
                    handleChange({
                      target: {
                        name: 'hasEmail',
                        value: e.target.checked
                      }
                    });
                    if (e.target.checked) {
                      setFormData(prev => ({ ...prev, email: '' }));
                    } else {
                      setFormData(prev => ({ ...prev, guardianEmail: '', guardianRelation: '' }));
                    }
                  }}
                  className="mr-2"
                />
                <label htmlFor="hasEmail" className="text-gray-700 text-sm ">Don't have email</label>
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  className={`w-full p-2 border rounded-md bg-gray-100 ${getFieldError('email') ? 'border-red-500' : ''}`}
                  value={formData.email}
                  onChange={handleChange}
                  disabled={formData.hasEmail}
                  required={!formData.hasEmail}
                />
                {getFieldError('email') && (
                  <p className="text-red-500 text-sm mt-1">{getFieldError('email')}</p>
                )}
              </div>

              {formData.hasEmail && (
                <>
                  <div className="mt-4">
                    <label className="block text-gray-700 mb-1">Guardian Email *</label>
                    <input
                      type="email"
                      name="guardianEmail"
                      className={`w-full p-2 border rounded-md bg-[#f0f9f0] ${getFieldError('guardianEmail') ? 'border-red-500' : ''}`}
                      value={formData.guardianEmail}
                      onChange={handleChange}
                      required
                    />
                    {getFieldError('guardianEmail') && (
                      <p className="text-red-500 text-sm mt-1">{getFieldError('guardianEmail')}</p>
                    )}
                  </div>
                  <div className="mt-4">
                    <label className="block text-gray-700 mb-1">Guardian Relation *</label>
                    <select
                      name="guardianRelation"
                      className={`w-full p-2 border rounded-md bg-[#f0f9f0] ${getFieldError('guardianRelation') ? 'border-red-500' : ''}`}
                      value={formData.guardianRelation}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a Relation</option>
                      {guardianRelations.map(relation => (
                        <option key={relation.id} value={relation.id}>
                          {relation.name}
                        </option>
                      ))}
                    </select>
                    {getFieldError('guardianRelation') && (
                      <p className="text-red-500 text-sm mt-1">{getFieldError('guardianRelation')}</p>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>

          {(formData.hasPhone || formData.hasEmail) && (
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Care of Individual Master ID *</label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={masterUserId}
                  onChange={(e) => {
                    setMasterUserId(e.target.value);
                    setMasterUserIdStatus({ verified: false, message: '' });
                  }}
                  className={`flex-1 p-2 border rounded-md  bg-[#f0f9f0] ${
                    masterUserIdStatus.verified ? 'bg-green-50 border-green-500' : 'bg-white'
                  } ${getFieldError('masterUserId') ? 'border-red-500' : ''}`}
                  placeholder="Enter Master User ID"
                  required={(formData.hasPhone || formData.hasEmail)}
                />
                {getFieldError('masterUserId') && (
                  <p className="text-red-500 text-sm mt-1">{getFieldError('masterUserId')}</p>
                )}
                <button
                  type="button"
                  onClick={handleMasterUserIdValidation}
                  disabled={validating || !masterUserId}
                  className={`px-4 py-2 rounded-md text-white ${
                    validating || !masterUserId
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-blue-500 hover:bg-blue-600'
                  }`}
                >
                  {validating ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Validating...
                    </span>
                  ) : (
                    'Validate'
                  )}
                </button>
              </div>
              {masterUserIdStatus.message && (
                <p className={`mt-1 text-sm ${
                  masterUserIdStatus.verified ? 'text-green-600' : 'text-red-600'
                }`}>
                  {masterUserIdStatus.verified && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                  {masterUserIdStatus.message}
                </p>
              )}
            </div>
          )}

          <div>
            <label className="block text-gray-700 mb-1">Select ID Proof *</label>
            <select
              name="documentTypeId"
              value={formData.documentTypeId}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md bg-[#f0f9f0] ${getFieldError('documentTypeId') ? 'border-red-500' : ''}`}
              required
            >
              <option value="">Select Document Type</option>
              {documentTypes.map(docType => (
                <option key={docType.id} value={docType.id}>
                  {docType.name}
                </option>
              ))}
            </select>
            {getFieldError('documentTypeId') && (
              <p className="text-red-500 text-sm mt-1">{getFieldError('documentTypeId')}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-1">ID Number *</label>
            <input
              type="text"
              name="aadharNumber"
              className={`w-full p-2 border rounded-md bg-[#f0f9f0] ${getFieldError('aadharNumber') ? 'border-red-500' : ''}`}
              value={formData.aadharNumber}
              onChange={handleChange}
              required
              placeholder="Enter your ID number"
            />
            {getFieldError('aadharNumber') && (
              <p className="text-red-500 text-sm mt-1">{getFieldError('aadharNumber')}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-1">
              Care of Contact Number *
              <span className="inline-block ml-1 cursor-help" title="Required for emergency contact">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 inline">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                </svg>
              </span>
            </label>
            <input
              type="tel"
              name="contactNumber"
              className={`w-full p-2 border rounded-md bg-[#f0f9f0] ${getFieldError('contactNumber') ? 'border-red-500' : ''}`}
              value={formData.contactNumber}
              onChange={handleChange}
              required
            />
            {getFieldError('contactNumber') && (
              <p className="text-red-500 text-sm mt-1">{getFieldError('contactNumber')}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Select Country *</label>
            <select
              name="countryId"
              className={`w-full p-2 border rounded-md bg-[#f0f9f0] ${getFieldError('countryId') ? 'border-red-500' : ''}`}
              value={formData.countryId}
              onChange={handleChange}
              required
            >
              <option value="">Select Country</option>
              {countries.map(country => (
                <option key={country.id} value={country.id}>
                  {country.name}
                </option>
              ))}
            </select>
            {getFieldError('countryId') && (
              <p className="text-red-500 text-sm mt-1">{getFieldError('countryId')}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Select State *</label>
            <select
              name="stateId"
              className={`w-full p-2 border rounded-md bg-[#f0f9f0] ${getFieldError('stateId') ? 'border-red-500' : ''}`}
              value={formData.stateId}
              onChange={handleChange}
              required
              disabled={!formData.countryId}
            >
              <option value="">Select State</option>
              {states.map(state => (
                <option key={state.id} value={state.id}>
                  {state.name}
                </option>
              ))}
            </select>
            {getFieldError('stateId') && (
              <p className="text-red-500 text-sm mt-1">{getFieldError('stateId')}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Select City *</label>
            <select
              name="cityId"
              className={`w-full p-2 border rounded-md bg-[#f0f9f0] ${getFieldError('cityId') ? 'border-red-500' : ''}`}
              value={formData.cityId}
              onChange={handleChange}
              required
              disabled={!formData.stateId}
            >
              <option value="">Select City</option>
              {cities.map(city => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
            {getFieldError('cityId') && (
              <p className="text-red-500 text-sm mt-1">{getFieldError('cityId')}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Postcode *</label>
            <input
              type="text"
              name="postcode"
              className={`w-full p-2 border rounded-md bg-[#f0f9f0] ${getFieldError('postcode') ? 'border-red-500' : ''}`}
              value={formData.postcode}
              onChange={handleChange}
              required
            />
            {getFieldError('postcode') && (
              <p className="text-red-500 text-sm mt-1">{getFieldError('postcode')}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-1">
              Enter your School Name
              <span className="inline-block ml-1 cursor-help" title="Name of your current school">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 inline">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                </svg>
              </span>
            </label>
            <input
              type="text"
              name="schoolName"
              className={`w-full p-2 border rounded-md bg-[#f0f9f0] ${getFieldError('schoolName') ? 'border-red-500' : ''}`}
              value={formData.schoolName}
              onChange={handleChange}
            />
            {getFieldError('schoolName') && (
              <p className="text-red-500 text-sm mt-1">{getFieldError('schoolName')}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-1">User Nickname</label>
            <input
              type="text"
              name="nickname"
              className={`w-full p-2 border rounded-md bg-[#f0f9f0] ${getFieldError('nickname') ? 'border-red-500' : ''}`}
              value={formData.nickname}
              onChange={handleChange}
            />
            {getFieldError('nickname') && (
              <p className="text-red-500 text-sm mt-1">{getFieldError('nickname')}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-1">DOB *</label>
            <input
              type="date"
              name="dob"
              className={`w-full p-2 border rounded-md bg-[#f0f9f0] ${getFieldError('dob') ? 'border-red-500' : ''}`}
              value={formData.dob}
              onChange={handleChange}
              required
              placeholder="dd-mm-yyyy"
            />
            {getFieldError('dob') && (
              <p className="text-red-500 text-sm mt-1">{getFieldError('dob')}</p>
            )}
          </div>

         

          <div className="mb-4 col-span-1">
            <label className="block text-gray-700 mb-1">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative group">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md bg-[#f0f9f0] ${getFieldError('password') ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200 ease-in-out text-gray-900 placeholder-gray-400`}
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500 hover:text-gray-700 transition-colors duration-200">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500 hover:text-gray-700 transition-colors duration-200">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </button>
              {getFieldError('password') && (
                <p className="absolute -bottom-5 left-0 text-xs text-red-500">
                  {getFieldError('password')}
                </p>
              )}
            </div>
          </div>
          
          <div className="col-span-2 mt-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
                required
                className={`mr-2 ${getFieldError('termsAccepted') ? 'border-red-500' : ''}`}
              />
              <span>Terms & conditions *</span>
            </label>
            {getFieldError('termsAccepted') && (
              <p className="text-red-500 text-sm mt-1">{getFieldError('termsAccepted')}</p>
            )}
          </div>

          <div className="col-span-2 flex flex-col items-center gap-4 mt-4">
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={loading || ((formData.hasPhone || formData.hasEmail) && !masterUserIdStatus.verified)}
              className={`w-full p-2 text-white rounded-md ${
                loading || ((formData.hasPhone || formData.hasEmail) && !masterUserIdStatus.verified)
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              {loading ? 'Submitting...' : otpVerified.user ? 'Sign Up' : 'Submit'}
            </button>
            <p className="text-center">
              Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
            </p>
          </div>
        </form>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Meet Our Partners</h2>
          <p className="text-gray-600 mb-6">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam cupiditate nemo...
          </p>
          <div className="grid grid-cols-3 gap-4">
            <img src="/partner1.png" alt="Partner 1" className="w-full" />
            <img src="/partner2.png" alt="Partner 2" className="w-full" />
            <img src="/partner3.png" alt="Partner 3" className="w-full" />
            <img src="/partner4.png" alt="Partner 4" className="w-full" />
            <img src="/partner5.png" alt="Partner 5" className="w-full" />
            <img src="/partner6.png" alt="Partner 6" className="w-full" />
            <img src="/partner7.png" alt="Partner 7" className="w-full" />
            <img src="/partner8.png" alt="Partner 8" className="w-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
