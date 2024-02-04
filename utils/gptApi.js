import axios from 'axios';

const GPT_API_URL = process.env.NEXT_PUBLIC_GPT_API_URL;
const GPT_API_KEY = process.env.NEXT_PUBLIC_GPT_API_KEY;

/**
 * Function to estimate the weight/size of the packed cone from the photo using GPT-4-Turbo API.
 * @param {File} photo - The photo file of the packed cone.
 * @returns {Promise<Object>} - The estimated weight/size and any additional information.
 */
export async function estimateConeWeightSize(photo) {
  try {
    const formData = new FormData();
    formData.append('file', photo);

    // Assuming the GPT-4-Turbo API has an endpoint for analyzing images and returning estimates
    const response = await axios.post(`${GPT_API_URL}/estimateCone`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${GPT_API_KEY}`,
      },
    });

    if (response.status === 200 && response.data) {
      return {
        success: true,
        data: response.data,
      };
    } else {
      return {
        success: false,
        message: 'Failed to get an estimate from the GPT-4-Turbo API.',
      };
    }
  } catch (error) {
    console.error('Error estimating cone weight/size:', error);
    return {
      success: false,
      message: 'An error occurred while trying to estimate the cone weight/size.',
    };
  }
}
