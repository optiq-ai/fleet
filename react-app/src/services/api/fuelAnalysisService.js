/**
 * Fuel Analysis API Service
 * Provides methods to interact with the Fuel Analysis API
 */
class FuelAnalysisService {
  /**
   * Base URL for API
   * @type {string}
   */
  baseUrl = '/api/fuel-analysis';

  /**
   * Get fuel analysis KPIs
   * @returns {Promise<Object>} Fuel analysis KPI data
   */
  async getFuelKPIs() {
    try {
      const response = await fetch(`${this.baseUrl}/kpis`);
      if (!response.ok) throw new Error('Failed to fetch fuel KPIs');
      return await response.json();
    } catch (error) {
      console.error('Error fetching fuel KPIs:', error);
      throw error;
    }
  }
  
  /**
   * Get fuel consumption data
   * @param {string} [period='month'] - Period for data aggregation (day, week, month, year)
   * @param {string} [vehicleId] - Optional vehicle ID filter
   * @param {string} [driverId] - Optional driver ID filter
   * @param {string} [startDate] - Optional start date filter
   * @param {string} [endDate] - Optional end date filter
   * @returns {Promise<Object>} Fuel consumption data
   */
  async getFuelConsumption(
    period = 'month',
    vehicleId,
    driverId,
    startDate,
    endDate
  ) {
    try {
      let url = `${this.baseUrl}/consumption?period=${period}`;
      
      if (vehicleId) url += `&vehicleId=${vehicleId}`;
      if (driverId) url += `&driverId=${driverId}`;
      if (startDate) url += `&startDate=${startDate}`;
      if (endDate) url += `&endDate=${endDate}`;
      
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch fuel consumption data');
      return await response.json();
    } catch (error) {
      console.error('Error fetching fuel consumption data:', error);
      throw error;
    }
  }
  
  /**
   * Get fuel consumption comparison data
   * @param {string} [compareBy='vehicle'] - Comparison type (vehicle, driver, route)
   * @param {string} [period='month'] - Period for data aggregation
   * @returns {Promise<Object>} Fuel consumption comparison data
   */
  async getFuelConsumptionComparison(
    compareBy = 'vehicle',
    period = 'month'
  ) {
    try {
      const url = `${this.baseUrl}/comparison?compareBy=${compareBy}&period=${period}`;
      
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch fuel consumption comparison data');
      return await response.json();
    } catch (error) {
      console.error('Error fetching fuel consumption comparison data:', error);
      throw error;
    }
  }
  
  /**
   * Get fuel anomalies data
   * @param {string} [period='month'] - Period for data aggregation
   * @param {string} [severity='all'] - Severity filter (all, high, medium, low)
   * @param {number} [page=1] - Page number
   * @param {number} [limit=10] - Results per page
   * @returns {Promise<Object>} Fuel anomalies data
   */
  async getFuelAnomalies(
    period = 'month',
    severity = 'all',
    page = 1,
    limit = 10
  ) {
    try {
      const url = `${this.baseUrl}/anomalies?period=${period}&severity=${severity}&page=${page}&limit=${limit}`;
      
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch fuel anomalies data');
      return await response.json();
    } catch (error) {
      console.error('Error fetching fuel anomalies data:', error);
      throw error;
    }
  }
  
  /**
   * Get cost optimization data
   * @returns {Promise<Object>} Cost optimization data
   */
  async getCostOptimization() {
    try {
      const response = await fetch(`${this.baseUrl}/optimization`);
      if (!response.ok) throw new Error('Failed to fetch cost optimization data');
      return await response.json();
    } catch (error) {
      console.error('Error fetching cost optimization data:', error);
      throw error;
    }
  }
  
  /**
   * Get CO2 emission data
   * @param {string} [period='month'] - Period for data aggregation
   * @returns {Promise<Object>} CO2 emission data
   */
  async getCO2Emission(period = 'month') {
    try {
      const url = `${this.baseUrl}/co2-emission?period=${period}`;
      
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch CO2 emission data');
      return await response.json();
    } catch (error) {
      console.error('Error fetching CO2 emission data:', error);
      throw error;
    }
  }
}

// Export service instance
export const fuelAnalysisService = new FuelAnalysisService();
export default fuelAnalysisService;
