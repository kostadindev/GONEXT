import { AxiosError } from "axios";

/**
 * Logs detailed information about an Axios error.
 * @param {AxiosError} error - The error object from axios.
 */
export const handleAxiosError = (error: AxiosError): void => {
  const { response, request, message } = error;

  if (response) {
    console.error(`HTTP error: ${response.status} - ${response.statusText}`);
    console.error("Response data:", response.data);
  } else if (request) {
    console.error("No response received from the API.");
    console.error("Request details:", request);
  } else {
    console.error(`An error occurred: ${message}`);
  }
};
