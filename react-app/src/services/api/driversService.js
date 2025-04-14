import apiClient from './apiClient';

/**
 * Service for fetching drivers data from the API
 */
const driversService = {
  /**
   * Get drivers list with filtering and pagination
   * @param {string} status - Filter by status (active, inactive, on_leave)
   * @param {string} vehicle - Filter by vehicle assignment (assigned, unassigned)
   * @param {string} search - Search term
   * @param {number} page - Page number
   * @param {number} limit - Items per page
   * @returns {Promise<Object>} Drivers data
   */
  getDrivers: async (status, vehicle, search, page = 1, limit = 10) => {
    try {
      const response = await apiClient.get('/drivers', {
        params: { status, vehicle, search, page, limit }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching drivers:', error);
      throw error;
    }
  },

  /**
   * Get driver details by ID
   * @param {string} id - Driver ID
   * @returns {Promise<Object>} Driver details
   */
  getDriverDetails: async (id) => {
    try {
      const response = await apiClient.get(`/drivers/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching driver details for ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * Get driver documents
   * @param {string} id - Driver ID
   * @returns {Promise<Object>} Driver documents
   */
  getDriverDocuments: async (id) => {
    try {
      const response = await apiClient.get(`/drivers/${id}/documents`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching documents for driver ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * Get driver performance data
   * @param {string} id - Driver ID
   * @returns {Promise<Object>} Driver performance data
   */
  getDriverPerformance: async (id) => {
    try {
      const response = await apiClient.get(`/drivers/${id}/performance`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching performance data for driver ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * Get driver schedule
   * @param {string} id - Driver ID
   * @returns {Promise<Object>} Driver schedule
   */
  getDriverSchedule: async (id) => {
    try {
      const response = await apiClient.get(`/drivers/${id}/schedule`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching schedule for driver ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * Get drivers KPI data
   * @returns {Promise<Object>} Drivers KPI data
   */
  getDriversKPI: async () => {
    try {
      const response = await apiClient.get('/drivers/kpi');
      return response.data;
    } catch (error) {
      console.error('Error fetching drivers KPI:', error);
      throw error;
    }
  }
};

export default driversService;
