/**
 * Service for Fleet Management data
 * This service provides data for the Fleet Management module
 */
const fleetManagementService = {
  /**
   * Get fleet KPIs
   * @returns {Promise<Object>} KPI data
   */
  getFleetKPIs: async () => {
    try {
      const response = await fetch('/api/fleet/kpis');
      return await response.json();
    } catch (error) {
      console.error('Error fetching fleet KPIs:', error);
      throw error;
    }
  },
  
  /**
   * Get vehicles list
   * @param {Object} filters - Filter parameters
   * @returns {Promise<Object>} Vehicles data
   */
  getVehicles: async (filters) => {
    try {
      const queryParams = new URLSearchParams({
        page: filters.page,
        limit: filters.limit,
        status: filters.status,
        type: filters.type,
        search: filters.search
      });
      
      const response = await fetch(`/api/fleet/vehicles?${queryParams}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching vehicles:', error);
      throw error;
    }
  },
  
  /**
   * Get vehicle details
   * @param {number} vehicleId - Vehicle ID
   * @returns {Promise<Object>} Vehicle details
   */
  getVehicleDetails: async (vehicleId) => {
    try {
      const response = await fetch(`/api/fleet/vehicles/${vehicleId}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching vehicle details:', error);
      throw error;
    }
  },
  
  /**
   * Get fuel consumption data
   * @param {Object} filters - Filter parameters
   * @returns {Promise<Object>} Fuel consumption data
   */
  getFuelConsumption: async (filters) => {
    try {
      const queryParams = new URLSearchParams({
        page: filters.page,
        limit: filters.limit,
        search: filters.search
      });
      
      const response = await fetch(`/api/fleet/fuel-consumption?${queryParams}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching fuel consumption data:', error);
      throw error;
    }
  },
  
  /**
   * Get vehicle performance data
   * @param {Object} filters - Filter parameters
   * @returns {Promise<Object>} Vehicle performance data
   */
  getVehiclePerformance: async (filters) => {
    try {
      const queryParams = new URLSearchParams({
        page: filters.page,
        limit: filters.limit,
        search: filters.search
      });
      
      const response = await fetch(`/api/fleet/performance?${queryParams}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching vehicle performance data:', error);
      throw error;
    }
  },
  
  /**
   * Get service history data
   * @param {Object} filters - Filter parameters
   * @returns {Promise<Object>} Service history data
   */
  getServiceHistory: async (filters) => {
    try {
      const queryParams = new URLSearchParams({
        page: filters.page,
        limit: filters.limit,
        search: filters.search
      });
      
      const response = await fetch(`/api/fleet/service-history?${queryParams}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching service history data:', error);
      throw error;
    }
  },
  
  /**
   * Get documents data
   * @param {Object} filters - Filter parameters
   * @returns {Promise<Object>} Documents data
   */
  getDocuments: async (filters) => {
    try {
      const queryParams = new URLSearchParams({
        page: filters.page,
        limit: filters.limit,
        search: filters.search
      });
      
      const response = await fetch(`/api/fleet/documents?${queryParams}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching documents data:', error);
      throw error;
    }
  },
  
  /**
   * Get non-vehicle assets data
   * @param {Object} filters - Filter parameters
   * @returns {Promise<Object>} Assets data
   */
  getNonVehicleAssets: async (filters) => {
    try {
      const queryParams = new URLSearchParams({
        page: filters.page,
        limit: filters.limit,
        search: filters.search
      });
      
      const response = await fetch(`/api/fleet/assets?${queryParams}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching assets data:', error);
      throw error;
    }
  },
  
  /**
   * Get route optimization data
   * @param {Object} filters - Filter parameters
   * @returns {Promise<Object>} Route optimization data
   */
  getRouteOptimization: async (filters) => {
    try {
      const queryParams = new URLSearchParams({
        page: filters.page,
        limit: filters.limit,
        search: filters.search
      });
      
      const response = await fetch(`/api/fleet/route-optimization?${queryParams}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching route optimization data:', error);
      throw error;
    }
  }
};

export default fleetManagementService;
