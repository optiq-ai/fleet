/**
 * Road Tolls Service
 * 
 * Service for managing road tolls data, including toll expenses, transponders,
 * violations, and analytics.
 */

import apiClient from './apiClient';

/**
 * Get road tolls dashboard data including KPIs, toll activities, and expense trends
 * @param {Object} params - Query parameters
 * @param {string} params.timeRange - Time range for data (day, week, month, year)
 * @returns {Promise<Object>} Dashboard data
 */
export const getRoadTollsDashboard = async (params = {}) => {
  try {
    const response = await apiClient.get('/road-tolls/dashboard', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching road tolls dashboard data:', error);
    throw error;
  }
};

/**
 * Get transponder inventory data
 * @param {Object} params - Query parameters
 * @param {string} params.status - Filter by transponder status
 * @param {string} params.search - Search term
 * @param {number} params.page - Page number
 * @param {number} params.limit - Items per page
 * @returns {Promise<Object>} Transponder data
 */
export const getTransponders = async (params = {}) => {
  try {
    const response = await apiClient.get('/road-tolls/transponders', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching transponders data:', error);
    throw error;
  }
};

/**
 * Get transponder details by ID
 * @param {string} id - Transponder ID
 * @returns {Promise<Object>} Transponder details
 */
export const getTransponderDetails = async (id) => {
  try {
    const response = await apiClient.get(`/road-tolls/transponders/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching transponder details for ID ${id}:`, error);
    throw error;
  }
};

/**
 * Get violations and penalties data
 * @param {Object} params - Query parameters
 * @param {string} params.status - Filter by violation status
 * @param {string} params.search - Search term
 * @param {number} params.page - Page number
 * @param {number} params.limit - Items per page
 * @returns {Promise<Object>} Violations data
 */
export const getViolations = async (params = {}) => {
  try {
    const response = await apiClient.get('/road-tolls/violations', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching violations data:', error);
    throw error;
  }
};

/**
 * Get violation details by ID
 * @param {string} id - Violation ID
 * @returns {Promise<Object>} Violation details
 */
export const getViolationDetails = async (id) => {
  try {
    const response = await apiClient.get(`/road-tolls/violations/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching violation details for ID ${id}:`, error);
    throw error;
  }
};

/**
 * Get expense reports data
 * @param {Object} params - Query parameters
 * @param {string} params.timeRange - Time range for data (day, week, month, year)
 * @param {string} params.groupBy - Group by vehicle, driver, route, etc.
 * @returns {Promise<Object>} Expense reports data
 */
export const getExpenseReports = async (params = {}) => {
  try {
    const response = await apiClient.get('/road-tolls/expense-reports', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching expense reports data:', error);
    throw error;
  }
};

/**
 * Get toll operators data
 * @returns {Promise<Object>} Toll operators data
 */
export const getTollOperators = async () => {
  try {
    const response = await apiClient.get('/road-tolls/operators');
    return response.data;
  } catch (error) {
    console.error('Error fetching toll operators data:', error);
    throw error;
  }
};

/**
 * Get route optimization data with toll costs
 * @param {Object} params - Query parameters
 * @param {string} params.origin - Origin location
 * @param {string} params.destination - Destination location
 * @returns {Promise<Object>} Route optimization data
 */
export const getRouteOptimization = async (params = {}) => {
  try {
    const response = await apiClient.get('/road-tolls/route-optimization', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching route optimization data:', error);
    throw error;
  }
};

const roadTollsService = {
  getRoadTollsDashboard,
  getTransponders,
  getTransponderDetails,
  getViolations,
  getViolationDetails,
  getExpenseReports,
  getTollOperators,
  getRouteOptimization
};

export default roadTollsService;
