// This is for mobile number
export const validatePhone = phoneNumber => {
  const phoneNumberPattern = /^\(?(9\d{2})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
  return phoneNumberPattern.test(phoneNumber);
};
