import { getCSRF } from "src/authentication/Authentication";
import axios from "axios";
import { getCookie } from "./getCookie";
import apiConfig from "./apiConfig";
export const feedback = async ({ content, file_or_image }) => {
  try {
    await getCSRF();

    // Create a FormData object to handle file upload
    const formData = new FormData();
    formData.append("content", content);

    // Check if file_or_image is not empty and append the first file
    if (file_or_image && file_or_image.length > 0) {
      formData.append("file_or_image", file_or_image[0]);
    }
    const response = await axios.post(
      `${apiConfig.apiURL}api/feedback/`,
      formData,
      {
        headers: {
          "X-CSRFToken": getCookie("csrftoken"),
        },
        timeout: 5000,
      }
    );

    const responseData = response.data;
    // Handle response data here
  } catch (error) {
    // Handle error here
    throw error;
  }
};
