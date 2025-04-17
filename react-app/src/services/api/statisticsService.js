import { apiClient } from './apiClient';

/**
 * Service for Statistics module
 * Provides methods to fetch and manipulate statistics data
 */
class StatisticsService {
  /**
   * Get KPI data for statistics dashboard
   * @param {string} timeRange - Time range for data
   * @returns {Promise<Array>} KPI data
   */
  async getKPIData(timeRange = 'month') {
    try {
      const response = await apiClient.get(`/statistics/kpi?timeRange=${timeRange}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching KPI data:', error);
      throw error;
    }
  }
  
  /**
   * Get trend data for statistics
   * @param {string} timeRange - Time range for data
   * @param {Array} metrics - Metrics to include
   * @returns {Promise<Object>} Trend data
   */
  async getTrendData(timeRange = 'month', metrics = ['fuelConsumption']) {
    try {
      const metricsParam = metrics.join(',');
      const response = await apiClient.get(`/statistics/trends?timeRange=${timeRange}&metrics=${metricsParam}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching trend data:', error);
      throw error;
    }
  }
  
  /**
   * Get comparison data for statistics
   * @param {string} comparisonType - Type of comparison (vehicle, driver, route)
   * @param {string} metric - Metric to compare
   * @param {string} timeRange - Time range for data
   * @returns {Promise<Array>} Comparison data
   */
  async getComparisonData(comparisonType = 'vehicle', metric = 'fuelConsumption', timeRange = 'month') {
    try {
      const response = await apiClient.get(
        `/statistics/comparison?type=${comparisonType}&metric=${metric}&timeRange=${timeRange}`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching comparison data:', error);
      throw error;
    }
  }
  
  /**
   * Get anomaly data for statistics
   * @param {string} timeRange - Time range for data
   * @param {string} severity - Severity filter
   * @param {number} page - Page number
   * @param {number} limit - Items per page
   * @returns {Promise<Object>} Anomaly data
   */
  async getAnomalyData(timeRange = 'month', severity = 'all', page = 1, limit = 10) {
    try {
      const response = await apiClient.get(
        `/statistics/anomalies?timeRange=${timeRange}&severity=${severity}&page=${page}&limit=${limit}`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching anomaly data:', error);
      throw error;
    }
  }
  
  /**
   * Get forecast data for statistics
   * @param {string} metric - Metric to forecast
   * @param {string} timeRange - Time range for historical data
   * @param {string} forecastPeriod - Period to forecast
   * @returns {Promise<Object>} Forecast data
   */
  async getForecastData(metric = 'fuelConsumption', timeRange = 'month', forecastPeriod = 'month') {
    try {
      const response = await apiClient.get(
        `/statistics/forecast?metric=${metric}&timeRange=${timeRange}&forecastPeriod=${forecastPeriod}`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching forecast data:', error);
      throw error;
    }
  }
  
  /**
   * Get cost analysis data for statistics
   * @param {string} timeRange - Time range for data
   * @param {string} costType - Type of cost
   * @returns {Promise<Object>} Cost analysis data
   */
  async getCostAnalysisData(timeRange = 'month', costType = 'all') {
    try {
      const response = await apiClient.get(
        `/statistics/costs?timeRange=${timeRange}&costType=${costType}`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching cost analysis data:', error);
      throw error;
    }
  }
  
  /**
   * Export trend data
   * @param {string} timeRange - Time range for data
   * @param {Array} metrics - Metrics to include
   * @param {string} format - Export format
   */
  exportTrendData(timeRange, metrics, format = 'csv') {
    const url = `/statistics/export/trends?timeRange=${timeRange}&metrics=${metrics.join(',')}&format=${format}`;
    window.open(url, '_blank');
  }
  
  /**
   * Export comparison data
   * @param {string} comparisonType - Type of comparison
   * @param {string} metric - Metric to compare
   * @param {string} timeRange - Time range for data
   * @param {string} format - Export format
   */
  exportComparisonData(comparisonType, metric, timeRange, format = 'csv') {
    const url = `/statistics/export/comparison?type=${comparisonType}&metric=${metric}&timeRange=${timeRange}&format=${format}`;
    window.open(url, '_blank');
  }
}

export const statisticsService = new StatisticsService();
export default statisticsService;
