/**
 * This function formats a phone number, removing invalid characters
 * and normalises numbers with country code
 */
const formatPhoneNumber = (phoneNumber: string) => {
  let formatted = phoneNumber.replace(/[^0-9]/gi, ""); // replace anything not a digit with empty string
  if (/^234(7|8|9)/.test(formatted)) {
    // starts with e.g 23490...
    return formatted.replace(/234/, "0");
  } else if (/^2340/.test(formatted)) {
    // starts with e.g 234090...
    return formatted.replace(/234/, "");
  }
  return formatted;
};

export default formatPhoneNumber;
