
export const phoneNumberPattern = /^0[3-9]\d{8}$/

export const generateOTP = () => {
    let result = '';
    for (let i = 0; i < 6; i++) {
      const digit = Math.floor(Math.random() * 10); 
      result += digit;
    }
    return result;
  };