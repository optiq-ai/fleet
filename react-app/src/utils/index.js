/**
 * Utility functions for the application
 */

/**
 * Delay execution for a specified time
 * @param {number} ms - Milliseconds to delay
 * @returns {Promise<void>} Promise that resolves after the delay
 */
export const delay = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};
