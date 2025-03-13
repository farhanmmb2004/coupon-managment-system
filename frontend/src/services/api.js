import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
  baseURL: 'https://coupon-managment-system.onrender.com/api/v1',
  withCredentials: true, // Important for cookies to be sent
  timeout: 50000, // 50 seconds timeout
});

// Service for coupon operations
export const couponService = {
  /**
   * Claim a coupon for the current user
   * @returns {Promise} Result of the API call
   */
  claimCoupon: async () => {
    try {
      const response = await api.get('/coupons/claim');
      return response.data;
    } catch (error) {
      if (error.response) {
        console.log(error);
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        return error.response.data;
      } else if (error.request) {
        // The request was made but no response was received
        throw new Error('Server did not respond. Please try again later.');
      } else {
        // Something happened in setting up the request that triggered an Error
        throw new Error('Error setting up request: ' + error.message);
      }
    }
  }
};

export default api;