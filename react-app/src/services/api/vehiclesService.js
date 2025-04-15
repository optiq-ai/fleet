// Import delay utility if needed for future use
// import { delay } from '../../utils';

/**
 * Service for Vehicles Overview data
 * This service provides data for the Vehicles Overview component
 */
class VehiclesService {
  /**
   * Get vehicles list
   * @param {string} [status] - Status filter
   * @param {string} [search] - Search term
   * @param {string} [sortBy='id'] - Sort field
   * @param {string} [sortOrder='asc'] - Sort order
   * @param {number} [page=1] - Page number
   * @param {number} [limit=10] - Results per page
   * @returns {Promise<Object>} Vehicles data
   */
  async getVehicles(
    status,
    search,
    sortBy = 'id',
    sortOrder = 'asc',
    page = 1,
    limit = 10
  ) {
    try {
      const response = await fetch('/api/vehicles', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        params: {
          status,
          search,
          sortBy,
          sortOrder,
          page,
          limit
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch vehicles data');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching vehicles:', error);
      throw error;
    }
  }
  
  /**
   * Get vehicle details
   * @param {string} id - Vehicle ID
   * @returns {Promise<Object>} Vehicle details
   */
  async getVehicleDetails(id) {
    try {
      const response = await fetch(`/api/vehicles/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch vehicle details');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching vehicle details:', error);
      throw error;
    }
  }
  
  /**
   * Get fleet KPIs
   * @returns {Promise<Object>} Fleet KPI data
   */
  async getFleetKPIs() {
    try {
      const response = await fetch('/api/vehicles/kpis', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch fleet KPIs');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching fleet KPIs:', error);
      throw error;
    }
  }
  
  /**
   * Get vehicle locations for map
   * @returns {Promise<Array>} Vehicle location data
   */
  async getVehicleLocations() {
    try {
      const response = await fetch('/api/vehicles/locations', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch vehicle locations');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching vehicle locations:', error);
      throw error;
    }
  }
  
  /**
   * Get fleet statistics
   * @returns {Promise<Object>} Fleet statistics data
   */
  async getFleetStatistics() {
    try {
      const response = await fetch('/api/vehicles/statistics', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch fleet statistics');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching fleet statistics:', error);
      throw error;
    }
  }
}

// Export service instance
export const vehiclesService = new VehiclesService();
export default vehiclesService;
