// Map gender string to ID
const genderMap = {
  'Male': 1,
  'Female': 2,
  'Other': 3,
};

// Map name prefix to ID
const namePrefixMap = {
  'Shri': 1,
  'Smt': 2,
  'Other': 3,
};

// Map document type to ID
const documentTypeMap = {
  'Aadhar Number': 1,
  'PAN Card': 2,
  'Driving License': 3,
  'Voter ID': 4,
  'Passport': 5
};

export const mapAdultFormToApiData = (formData) => {
  // Ensure we have a valid document type
  const documentType = formData.idProof || 'Aadhar Number';
  const documentTypeId = documentTypeMap[documentType];

  if (!documentTypeId) {
    throw new Error('Invalid document type selected');
  }

  // Convert IDs to numbers
  const countryId = parseInt(formData.countryId) || 101;
  const stateId = parseInt(formData.stateId) || 4015;
  const cityId = parseInt(formData.cityId) || 47476;

  const apiData = {
    firstName: formData.legalName,
    lastName: formData.surname,
    email: formData.email,
    nickName: formData.nickname || '',
    namePrefixId: namePrefixMap[formData.gender] || 1,
    namePrefix: formData.gender,
    gender: genderMap[formData.gender] || 1,
    birthDate: formData.dob,
    phoneNumber: formData.phone,
    password: formData.password,
    schoolName: formData.schoolName || '',
    documentTypeId: documentTypeId,
    documentNumber: formData.aadharNumber || '',
    countryId: countryId,
    stateId: stateId,
    cityId: cityId,
    postcode: formData.postcode || '',
    localAddress: formData.localAddress || '',
    careOfNumber: formData.contactNumber || '',
    guardianId: 0,
    guardianRelationId: 0,
    guardianEmail: '',
    isEmailVerified: true,
    isPhoneNumberVerified: false,
    validateRequest: true
  };

  console.log('Mapped adult form data:', {
    originalDocType: formData.idProof,
    mappedDocTypeId: documentTypeId,
    location: {
      country: countryId,
      state: stateId,
      city: cityId
    },
    fullData: apiData
  });

  return apiData;
};
