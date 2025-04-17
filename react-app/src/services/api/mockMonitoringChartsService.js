// Mock data service for Monitoring Charts
// This file provides enhanced mock data for charts in the Monitoring section

/**
 * @typedef {Object} FuelConsumptionChartData
 * @property {Array<Object>} data - Daily consumption data points
 * @property {string} data[].date - Date
 * @property {number} data[].consumption - Consumption value
 * @property {number} averageConsumption - Average consumption for the period
 * @property {number} previousAverageConsumption - Previous period average consumption
 * @property {number} change - Percentage change from previous period
 * @property {string} unit - Unit of measurement
 * @property {Object} target - Target consumption data
 * @property {number} target.value - Target consumption value
 * @property {string} target.label - Target label
 */

/**
 * @typedef {Object} TrendChartData
 * @property {string} period - Data period
 * @property {Array<Object>} data - Trend data points
 * @property {string} data[].date - Date
 * @property {number} data[].value - Value
 * @property {number} current - Current value
 * @property {number} previous - Previous value
 * @property {number} change - Percentage change
 * @property {string} unit - Unit of measurement
 * @property {Object} colors - Chart colors
 */

// Enhanced mock data for vehicle monitoring fuel consumption chart
const mockVehicleFuelConsumptionChart = {
  data: [
    { date: '2025-03-15', consumption: 31.2 },
    { date: '2025-03-16', consumption: 32.5 },
    { date: '2025-03-17', consumption: 30.8 },
    { date: '2025-03-18', consumption: 33.1 },
    { date: '2025-03-19', consumption: 32.7 },
    { date: '2025-03-20', consumption: 31.9 },
    { date: '2025-03-21', consumption: 30.5 },
    { date: '2025-03-22', consumption: 29.8 },
    { date: '2025-03-23', consumption: 31.0 },
    { date: '2025-03-24', consumption: 32.2 },
    { date: '2025-03-25', consumption: 33.5 },
    { date: '2025-03-26', consumption: 32.8 },
    { date: '2025-03-27', consumption: 31.5 },
    { date: '2025-03-28', consumption: 30.9 },
    { date: '2025-03-29', consumption: 31.7 },
    { date: '2025-03-30', consumption: 32.0 },
    { date: '2025-03-31', consumption: 31.2 },
    { date: '2025-04-01', consumption: 30.5 },
    { date: '2025-04-02', consumption: 29.8 },
    { date: '2025-04-03', consumption: 30.2 },
    { date: '2025-04-04', consumption: 31.5 },
    { date: '2025-04-05', consumption: 32.1 },
    { date: '2025-04-06', consumption: 31.8 },
    { date: '2025-04-07', consumption: 30.7 },
    { date: '2025-04-08', consumption: 29.9 },
    { date: '2025-04-09', consumption: 30.5 },
    { date: '2025-04-10', consumption: 31.2 },
    { date: '2025-04-11', consumption: 32.0 },
    { date: '2025-04-12', consumption: 31.5 },
    { date: '2025-04-13', consumption: 30.8 },
    { date: '2025-04-14', consumption: 31.0 }
  ],
  averageConsumption: 31.4,
  previousAverageConsumption: 32.8,
  change: -4.3,
  unit: 'l/100km',
  target: {
    value: 30.0,
    label: 'Cel'
  },
  colors: {
    line: '#2196f3',
    area: 'rgba(33, 150, 243, 0.1)',
    target: '#4caf50'
  }
};

// Enhanced mock data for fuel consumption trend chart
const mockFuelConsumptionTrendChart = {
  period: 'last_6_months',
  data: [
    { date: 'Listopad', value: 33.2 },
    { date: 'Grudzień', value: 34.5 },
    { date: 'Styczeń', value: 33.8 },
    { date: 'Luty', value: 32.5 },
    { date: 'Marzec', value: 31.7 },
    { date: 'Kwiecień', value: 31.0 }
  ],
  current: 31.0,
  previous: 33.2,
  change: -6.6,
  unit: 'l/100km',
  target: 30.0,
  colors: {
    primary: '#2196f3',
    secondary: '#4caf50',
    background: 'rgba(33, 150, 243, 0.1)'
  },
  vehicleComparison: [
    { vehicle: 'Heavy Truck', value: 33.5 },
    { vehicle: 'Medium Truck', value: 28.2 },
    { vehicle: 'Delivery Van', value: 12.0 }
  ]
};

// Enhanced mock data for kilometers trend chart
const mockKilometersTrendChart = {
  period: 'last_6_months',
  data: [
    { date: 'Listopad', value: 12350 },
    { date: 'Grudzień', value: 11980 },
    { date: 'Styczeń', value: 10250 },
    { date: 'Luty', value: 11450 },
    { date: 'Marzec', value: 12580 },
    { date: 'Kwiecień', value: 13200 }
  ],
  current: 13200,
  previous: 12350,
  change: 6.9,
  unit: 'km',
  colors: {
    primary: '#ff9800',
    secondary: '#e91e63',
    background: 'rgba(255, 152, 0, 0.1)'
  },
  breakdown: [
    { category: 'Miasto', value: 3960, color: '#e91e63' },
    { category: 'Trasa', value: 9240, color: '#ff9800' }
  ]
};

// Enhanced mock data for alerts trend chart
const mockAlertsTrendChart = {
  period: 'last_6_months',
  data: [
    { date: 'Listopad', value: 12 },
    { date: 'Grudzień', value: 15 },
    { date: 'Styczeń', value: 9 },
    { date: 'Luty', value: 11 },
    { date: 'Marzec', value: 8 },
    { date: 'Kwiecień', value: 7 }
  ],
  current: 7,
  previous: 12,
  change: -41.7,
  unit: '',
  colors: {
    primary: '#f44336',
    secondary: '#9c27b0',
    background: 'rgba(244, 67, 54, 0.1)'
  },
  breakdown: [
    { category: 'Paliwo', value: 2, color: '#ff9800' },
    { category: 'Silnik', value: 1, color: '#f44336' },
    { category: 'Prędkość', value: 3, color: '#9c27b0' },
    { category: 'Inne', value: 1, color: '#607d8b' }
  ]
};

/**
 * Mock monitoring charts service class
 */
class MockMonitoringChartsService {
  /**
   * Get vehicle fuel consumption chart data
   * @returns {Promise<FuelConsumptionChartData>} Vehicle fuel consumption chart data
   */
  async getVehicleFuelConsumptionChart() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(mockVehicleFuelConsumptionChart);
      }, 500); // Simulate network delay
    });
  }
  
  /**
   * Get fuel consumption trend chart data
   * @returns {Promise<TrendChartData>} Fuel consumption trend chart data
   */
  async getFuelConsumptionTrendChart() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(mockFuelConsumptionTrendChart);
      }, 500); // Simulate network delay
    });
  }
  
  /**
   * Get kilometers trend chart data
   * @returns {Promise<TrendChartData>} Kilometers trend chart data
   */
  async getKilometersTrendChart() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(mockKilometersTrendChart);
      }, 500); // Simulate network delay
    });
  }
  
  /**
   * Get alerts trend chart data
   * @returns {Promise<TrendChartData>} Alerts trend chart data
   */
  async getAlertsTrendChart() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(mockAlertsTrendChart);
      }, 500); // Simulate network delay
    });
  }
}

// Export service instance
export const mockMonitoringChartsService = new MockMonitoringChartsService();
export default mockMonitoringChartsService;
