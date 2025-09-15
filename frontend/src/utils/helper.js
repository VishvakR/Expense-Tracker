import { data } from "react-router-dom";

export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export const isValidPassword = (password) => {
  // Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}

export const getInitials = (name) => {
  if(!name) return "";
  const word = name.split(" ");
  let initials = ""

  if (word.length === 1) {
    // Single word → take first 2 letters
    initials = word[0].slice(0, 2);
  } else {
    // Multiple words → take first letter of first 2 words
    for (let i = 0; i < Math.min(word.length, 2); i++) {
      initials += word[i][0];
    }
  }
  return initials.toUpperCase();
}


export const addThousandSeparator = (num) => {
  if (num == null || isNaN(num)) return "";

  const [integerPart, fractionalPart] = num.toString().split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return fractionalPart ? `${formattedInteger}.${fractionalPart}` : formattedInteger;
};


export const prepareExpenseBarChart = (data = []) => {
  const chartData = data.map((items) => ({
    category : items?.category,
    amount : items?.amount
  }))

  return chartData
}