import axios from "axios";

// Function to send forgot password email
// Function to send forgot password email based on role
export const sendForgotPasswordEmail = async (role, email) => {
  const endpointMap = {
    student: "http://localhost:8080/api/students/forgot-password",
    professor: "http://localhost:8080/api/professors/forgot-password",
    hod: "http://localhost:8080/api/hods/forgot-password",
  };

  try {
    const response = await axios.post(endpointMap[role], { email });
    return response.data;
  } catch (error) {
    throw error.response?.data || "An error occurred";
  }
};

// export const sendForgotPasswordEmail = async (email) => {
//   try {
//     const response = await axios.post('/forgot-password', { email });
//     return response.data;
//   } catch (error) {
//     throw new Error(error.response?.data || 'An error occurred');
//   }
// };

// Function to verify OTP
export const verifyOTP = async (email, otp) => {
  try {
    const response = await axios.post(
      `http://localhost:8080/api/students/verify-otp?email=${encodeURIComponent(
        email
      )}&otp=${encodeURIComponent(otp)}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data || "An error occurred");
  }
};

// Function to reset password
export const resetPassword = async ({ email, password }) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/students/reset-password",
      {
        email,
        newPassword: password,
      }
    );
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data || "An error occurred";
    throw new Error(errorMessage);
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/students/register",
      userData
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data || "An error occurred");
  }
};
