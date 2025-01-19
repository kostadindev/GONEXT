import { AxiosError } from "axios";

/**
 * Logs detailed information about an Axios error.
 * @param {AxiosError} error - The error object from axios.
 */
export const handleAxiosError = (error: AxiosError): void => {
  const { response, request, message, config } = error;

  if (response) {
    console.error(
      `HTTP error: ${response.status} - ${response.statusText} (URL: ${config?.url})`
    );
    console.error("Response data:", JSON.stringify(response.data));
  } else if (request) {
    console.error(`No response received from the API (URL: ${config?.url}).`);
    console.error("Request details:", request);
  } else {
    console.error(`An error occurred: ${message}`);
  }
};