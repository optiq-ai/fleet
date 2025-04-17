// Mock data service for Vehicles Charts
// This file provides mock data for charts in the Vehicles Overview section

/**
 * @typedef {Object} FleetStructureData
 * @property {string} name - Category name
 * @property {number} value - Category value
 * @property {string} color - Category color (hex code)
 */

/**
 * @typedef {Object} TrendData
 * @property {string} month - Month and year
 * @property {number} value - Value for the month
 */

// Mock data for fleet structure by brand with colors
const mockFleetByBrand = [
  { name: 'Volkswagen', value: 32, color: '#1f77b4' },
  { name: 'Ford', value: 28, color: '#ff7f0e' },
  { name: 'Toyota', value: 22, color: '#2ca02c' },
  { name: 'Renault', value: 18, color: '#d62728' },
  { name: 'Mercedes', value: 12, color: '#9467bd' },
  { name: 'Inne', value: 8, color: '#8c564b' }
];

// Mock data for fleet structure by age with colors
const mockFleetByAge = [
  { name: '< 1 rok', value: 15, color: '#1f77b4' },
  { name: '1-2 lata', value: 35, color: '#ff7f0e' },
  { name: '3-4 lata', value: 42, color: '#2ca02c' },
  { name: '5-6 lat', value: 20, color: '#d62728' },
  { name: '> 6 lat', value: 8, color: '#9467bd' }
];

// Mock data for fuel consumption trend
const mockFuelConsumptionTrend = [
  { month: 'Maj 2024', value: 8.2 },
  { month: 'Czerwiec 2024', value: 8.5 },
  { month: 'Lipiec 2024', value: 8.7 },
  { month: 'Sierpień 2024', value: 8.9 },
  { month: 'Wrzesień 2024', value: 8.6 },
  { month: 'Październik 2024', value: 8.3 },
  { month: 'Listopad 2024', value: 8.1 },
  { month: 'Grudzień 2024', value: 8.4 },
  { month: 'Styczeń 2025', value: 8.8 },
  { month: 'Luty 2025', value: 8.5 },
  { month: 'Marzec 2025', value: 8.2 },
  { month: 'Kwiecień 2025', value: 7.9 }
];

// Mock data for maintenance cost trend
const mockMaintenanceCostTrend = [
  { month: 'Maj 2024', value: 3200 },
  { month: 'Czerwiec 2024', value: 2800 },
  { month: 'Lipiec 2024', value: 3500 },
  { month: 'Sierpień 2024', value: 4200 },
  { month: 'Wrzesień 2024', value: 3800 },
  { month: 'Październik 2024', value: 3100 },
  { month: 'Listopad 2024', value: 2900 },
  { month: 'Grudzień 2024', value: 3300 },
  { month: 'Styczeń 2025', value: 4500 },
  { month: 'Luty 2025', value: 3900 },
  { month: 'Marzec 2025', value: 3400 },
  { month: 'Kwiecień 2025', value: 3100 }
];

/**
 * Mock vehicles charts service class
 */
class MockVehiclesChartsService {
  /**
   * Get fleet structure by brand
   * @returns {Promise<Array<FleetStructureData>>} Fleet structure by brand data
   */
  async getFleetStructureByBrand() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(mockFleetByBrand);
      }, 500); // Simulate network delay
    });
  }
  
  /**
   * Get fleet structure by age
   * @returns {Promise<Array<FleetStructureData>>} Fleet structure by age data
   */
  async getFleetStructureByAge() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(mockFleetByAge);
      }, 500); // Simulate network delay
    });
  }
  
  /**
   * Get fuel consumption trend
   * @returns {Promise<Array<TrendData>>} Fuel consumption trend data
   */
  async getFuelConsumptionTrend() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(mockFuelConsumptionTrend);
      }, 500); // Simulate network delay
    });
  }
  
  /**
   * Get maintenance cost trend
   * @returns {Promise<Array<TrendData>>} Maintenance cost trend data
   */
  async getMaintenanceCostTrend() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(mockMaintenanceCostTrend);
      }, 500); // Simulate network delay
    });
  }
}

// Export service instance
export const mockVehiclesChartsService = new MockVehiclesChartsService();
export default mockVehiclesChartsService;
