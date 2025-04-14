import apiClient from './apiClient';

/**
 * @typedef {Object} KPIData
 * @property {number} activeVehicles - Number of active vehicles
 * @property {number} activeDrivers - Number of active drivers
 * @property {number} dailyCosts - Daily costs
 * @property {number} potentialSavings - Potential savings
 * @property {number} safetyIndex - Safety index
 * @property {number} maintenanceForecast - Maintenance forecast
 */

/**
 * @typedef {Object} Alert
 * @property {string} id - Alert ID
 * @property {string} [priority] - Alert priority
 * @property {string} [type] - Alert type
 * @property {string} [vehicle] - Vehicle ID
 * @property {string} [driver] - Driver ID
 * @property {string} description - Alert description
 * @property {string} [date] - Alert date
 * @property {string} [time] - Alert time
 * @property {string} [location] - Alert location
 * @property {string} status - Alert status
 * @property {string} [component] - Component name
 * @property {string} [forecast] - Forecast description
 * @property {string} [confidence] - Confidence level
 */

/**
 * @typedef {Object} MapPoint
 * @property {string} id - Point ID
 * @property {string} type - Point type
 * @property {number} latitude - Latitude
 * @property {number} longitude - Longitude
 * @property {string} label - Point label
 */

/**
 * @typedef {Object} MapData
 * @property {MapPoint[]} points - Map points
 */

/**
 * @typedef {Object} AlertsResponse
 * @property {Alert[]} fraudAlerts - Fraud alerts
 * @property {Alert[]} safetyAlerts - Safety alerts
 * @property {Alert[]} maintenanceAlerts - Maintenance alerts
 */

/**
 * Dashboard service class for API interactions
 */
class DashboardService {
  /**
   * Get KPI data
   * @param {string} [dateFrom] - Start date
   * @param {string} [dateTo] - End date
   * @returns {Promise<KPIData>} KPI data
   */
  async getKPIData(dateFrom, dateTo) {
    const params = {
      date_from: dateFrom,
      date_to: dateTo
    };
    
    return apiClient.get('/dashboard/kpi', params);
  }
  
  /**
   * Get alerts
   * @param {string} [type] - Alert type
   * @param {number} [limit=10] - Result limit
   * @returns {Promise<AlertsResponse>} Alerts response
   */
  async getAlerts(type, limit = 10) {
    const params = {
      type,
      limit
    };
    
    return apiClient.get('/dashboard/alerts', params);
  }
  
  /**
   * Get map data
   * @param {string} [type] - Map data type
   * @returns {Promise<MapData>} Map data
   */
  async getMapData(type) {
    const params = {
      type
    };
    
    return apiClient.get('/dashboard/map', params);
  }
}

// Export service instance
export const dashboardService = new DashboardService();
export default dashboardService;
