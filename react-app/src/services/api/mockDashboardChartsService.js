// Mock data service for Dashboard Charts
// This file provides mock data for charts on the Dashboard page

/**
 * @typedef {Object} FraudRiskData
 * @property {string} date - Date label
 * @property {number} value - Risk value
 * @property {string} category - Risk category
 */

/**
 * @typedef {Object} FuelConsumptionData
 * @property {string} date - Date label
 * @property {number} value - Consumption value
 * @property {string} vehicle - Vehicle identifier (optional)
 */

/**
 * @typedef {Object} OperationalCostData
 * @property {string} category - Cost category
 * @property {number} value - Cost value
 * @property {string} color - Color for chart display
 */

// Mock data for Fraud Risk Indicator chart
const mockFraudRiskData = {
  trend: [
    { date: 'Sty', value: 42, category: 'Średnie' },
    { date: 'Lut', value: 38, category: 'Niskie' },
    { date: 'Mar', value: 45, category: 'Średnie' },
    { date: 'Kwi', value: 53, category: 'Wysokie' },
    { date: 'Maj', value: 48, category: 'Średnie' },
    { date: 'Cze', value: 51, category: 'Wysokie' },
    { date: 'Lip', value: 47, category: 'Średnie' },
    { date: 'Sie', value: 35, category: 'Niskie' },
    { date: 'Wrz', value: 42, category: 'Średnie' },
    { date: 'Paź', value: 57, category: 'Wysokie' },
    { date: 'Lis', value: 45, category: 'Średnie' },
    { date: 'Gru', value: 39, category: 'Niskie' }
  ],
  categories: {
    low: { min: 0, max: 40, color: '#4caf50' },
    medium: { min: 40, max: 50, color: '#ff9800' },
    high: { min: 50, max: 100, color: '#f44336' }
  },
  current: 45,
  previous: 51,
  change: -11.8,
  fraudTypes: [
    { type: 'Tankowanie poza trasą', percentage: 35, color: '#f44336' },
    { type: 'Nietypowe zużycie paliwa', percentage: 25, color: '#ff9800' },
    { type: 'Podejrzane transakcje', percentage: 20, color: '#2196f3' },
    { type: 'Manipulacja przebiegiem', percentage: 15, color: '#9c27b0' },
    { type: 'Inne', percentage: 5, color: '#607d8b' }
  ]
};

// Mock data for Fuel Consumption chart
const mockFuelConsumptionData = {
  trend: [
    { date: 'Sty', value: 9.2 },
    { date: 'Lut', value: 9.1 },
    { date: 'Mar', value: 9.0 },
    { date: 'Kwi', value: 8.9 },
    { date: 'Maj', value: 8.8 },
    { date: 'Cze', value: 8.7 },
    { date: 'Lip', value: 8.6 },
    { date: 'Sie', value: 8.5 },
    { date: 'Wrz', value: 8.4 },
    { date: 'Paź', value: 8.3 },
    { date: 'Lis', value: 8.2 },
    { date: 'Gru', value: 8.1 }
  ],
  current: 8.1,
  previous: 9.2,
  change: -11.9,
  unit: 'l/100km',
  target: 8.0,
  vehicleComparison: [
    { vehicle: 'Mercedes Actros', value: 7.8 },
    { vehicle: 'Volvo FH', value: 8.2 },
    { vehicle: 'Scania R', value: 8.5 },
    { vehicle: 'MAN TGX', value: 8.7 },
    { vehicle: 'DAF XF', value: 9.1 }
  ]
};

// Mock data for Operational Costs chart
const mockOperationalCostsData = {
  breakdown: [
    { category: 'Paliwo', value: 45000, percentage: 36, color: '#f44336' },
    { category: 'Utrzymanie', value: 30000, percentage: 24, color: '#2196f3' },
    { category: 'Ubezpieczenie', value: 25000, percentage: 20, color: '#4caf50' },
    { category: 'Opłaty drogowe', value: 15000, percentage: 12, color: '#ff9800' },
    { category: 'Inne', value: 10000, percentage: 8, color: '#9c27b0' }
  ],
  total: 125000,
  previousTotal: 132000,
  change: -5.3,
  trend: [
    { date: 'Sty', value: 132000 },
    { date: 'Lut', value: 130000 },
    { date: 'Mar', value: 128000 },
    { date: 'Kwi', value: 129000 },
    { date: 'Maj', value: 127000 },
    { date: 'Cze', value: 126000 },
    { date: 'Lip', value: 125000 },
    { date: 'Sie', value: 124000 },
    { date: 'Wrz', value: 123000 },
    { date: 'Paź', value: 125000 },
    { date: 'Lis', value: 124000 },
    { date: 'Gru', value: 125000 }
  ],
  unit: 'PLN'
};

/**
 * Mock dashboard charts service class
 */
class MockDashboardChartsService {
  /**
   * Get fraud risk indicator data
   * @returns {Promise<Object>} Fraud risk data
   */
  async getFraudRiskData() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(mockFraudRiskData);
      }, 500); // Simulate network delay
    });
  }
  
  /**
   * Get fuel consumption data
   * @returns {Promise<Object>} Fuel consumption data
   */
  async getFuelConsumptionData() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(mockFuelConsumptionData);
      }, 500); // Simulate network delay
    });
  }
  
  /**
   * Get operational costs data
   * @returns {Promise<Object>} Operational costs data
   */
  async getOperationalCostsData() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(mockOperationalCostsData);
      }, 500); // Simulate network delay
    });
  }
}

// Export service instance
export const mockDashboardChartsService = new MockDashboardChartsService();
export default mockDashboardChartsService;
