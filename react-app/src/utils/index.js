/**
 * Utility functions for the application
 */

/**
 * Delay execution for a specified time
 * @param {number} ms - Milliseconds to delay
 * @returns {Promise} Promise that resolves after the delay
 */
export const delay = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Format date to a readable string
 * @param {Date|string} date - Date to format
 * @param {string} [format='dd.MM.yyyy'] - Format string
 * @returns {string} Formatted date string
 */
export const formatDate = (date, format = 'dd.MM.yyyy') => {
  if (!date) return '';
  
  const d = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(d.getTime())) return '';
  
  const day = d.getDate().toString().padStart(2, '0');
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const year = d.getFullYear();
  
  return format
    .replace('dd', day)
    .replace('MM', month)
    .replace('yyyy', year);
};

/**
 * Format number with thousand separators
 * @param {number} number - Number to format
 * @param {number} [decimals=0] - Number of decimal places
 * @param {string} [decimalSeparator=','] - Decimal separator
 * @param {string} [thousandSeparator=' '] - Thousand separator
 * @returns {string} Formatted number string
 */
export const formatNumber = (
  number,
  decimals = 0,
  decimalSeparator = ',',
  thousandSeparator = ' '
) => {
  if (number === null || number === undefined) return '';
  
  const num = Number(number);
  
  if (isNaN(num)) return '';
  
  return num
    .toFixed(decimals)
    .replace('.', decimalSeparator)
    .replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator);
};

/**
 * Generate a random ID
 * @param {number} [length=8] - Length of the ID
 * @returns {string} Random ID
 */
export const generateId = (length = 8) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let id = '';
  
  for (let i = 0; i < length; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return id;
};
