// Mock data service for Dashboard
// This file provides mock data when the backend is not available

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
 * @property {string} priority - Alert priority
 * @property {string} description - Alert description
 * @property {string} vehicle - Vehicle ID
 * @property {string} date - Alert date
 * @property {string} status - Alert status
 */

/**
 * @typedef {Object} MapPoint
 * @property {string} id - Point ID
 * @property {string} type - Point type
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

// Mock KPI data
const mockKPIData = {
  activeVehicles: 125,
  activeDrivers: 98,
  dailyCosts: 12500,
  potentialSavings: 3200,
  safetyIndex: 87,
  maintenanceForecast: 15
};

// Mock alerts data
const mockAlerts = {
  fraudAlerts: [
    { id: 'F001', priority: 'WYS', description: 'Nietypowa transakcja paliwowa', vehicle: 'ABC1234', date: '2025-04-14', status: 'Nowy' },
    { id: 'F002', priority: 'ŚRE', description: 'Podejrzana lokalizacja tankowania', vehicle: 'DEF5678', date: '2025-04-13', status: 'W trakcie' },
    { id: 'F003', priority: 'NIS', description: 'Niezgodność w ilości paliwa', vehicle: 'GHI9012', date: '2025-04-12', status: 'Zamknięty' },
    { id: 'F004', priority: 'WYS', description: 'Wielokrotne tankowanie w krótkim czasie', vehicle: 'JKL3456', date: '2025-04-11', status: 'Nowy' },
    { id: 'F005', priority: 'ŚRE', description: 'Tankowanie poza trasą', vehicle: 'MNO7890', date: '2025-04-10', status: 'W trakcie' },
    { id: 'F006', priority: 'NIS', description: 'Nieautoryzowana karta paliwowa', vehicle: 'PQR1234', date: '2025-04-09', status: 'Zamknięty' }
  ],
  safetyAlerts: [
    { id: 'S001', priority: 'WYS', description: 'Przekroczenie prędkości', vehicle: 'ABC1234', date: '2025-04-14', status: 'Nowy' },
    { id: 'S002', priority: 'ŚRE', description: 'Gwałtowne hamowanie', vehicle: 'DEF5678', date: '2025-04-13', status: 'W trakcie' },
    { id: 'S003', priority: 'NIS', description: 'Długi czas jazdy', vehicle: 'GHI9012', date: '2025-04-12', status: 'Zamknięty' },
    { id: 'S004', priority: 'WYS', description: 'Jazda nocna', vehicle: 'JKL3456', date: '2025-04-11', status: 'Nowy' }
  ],
  maintenanceAlerts: [
    { id: 'M001', priority: 'WYS', description: 'Przegląd okresowy', vehicle: 'ABC1234', date: '2025-04-14', status: 'Nowy' },
    { id: 'M002', priority: 'ŚRE', description: 'Wymiana oleju', vehicle: 'DEF5678', date: '2025-04-13', status: 'W trakcie' },
    { id: 'M003', priority: 'NIS', description: 'Sprawdzenie hamulców', vehicle: 'GHI9012', date: '2025-04-12', status: 'Zamknięty' },
    { id: 'M004', priority: 'WYS', description: 'Wymiana opon', vehicle: 'JKL3456', date: '2025-04-11', status: 'Nowy' },
    { id: 'M005', priority: 'ŚRE', description: 'Kontrola akumulatora', vehicle: 'MNO7890', date: '2025-04-10', status: 'W trakcie' }
  ]
};

// Mock map data
const mockMapData = {
  vehicles: {
    points: [
      { id: 'V001', type: 'vehicle', label: 'Pojazd ABC1234' },
      { id: 'V002', type: 'vehicle', label: 'Pojazd DEF5678' },
      { id: 'V003', type: 'vehicle', label: 'Pojazd GHI9012' },
      { id: 'V004', type: 'vehicle', label: 'Pojazd JKL3456' },
      { id: 'V005', type: 'vehicle', label: 'Pojazd MNO7890' },
      { id: 'V006', type: 'vehicle', label: 'Pojazd PQR1234' },
      { id: 'V007', type: 'vehicle', label: 'Pojazd STU5678' },
      { id: 'V008', type: 'vehicle', label: 'Pojazd VWX9012' }
    ]
  },
  fraud: {
    points: [
      { id: 'F001', type: 'fraud', label: 'Oszustwo w lokalizacji A' },
      { id: 'F002', type: 'fraud', label: 'Oszustwo w lokalizacji B' },
      { id: 'F003', type: 'fraud', label: 'Oszustwo w lokalizacji C' }
    ]
  },
  safety: {
    points: [
      { id: 'S001', type: 'safety', label: 'Zdarzenie bezpieczeństwa X' },
      { id: 'S002', type: 'safety', label: 'Zdarzenie bezpieczeństwa Y' },
      { id: 'S003', type: 'safety', label: 'Zdarzenie bezpieczeństwa Z' },
      { id: 'S004', type: 'safety', label: 'Zdarzenie bezpieczeństwa W' }
    ]
  }
};

/**
 * Mock dashboard service class
 */
class MockDashboardService {
  /**
   * Get KPI data
   * @returns {Promise<KPIData>} KPI data
   */
  async getKPIData() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(mockKPIData);
      }, 500); // Symulacja opóźnienia sieciowego
    });
  }
  
  /**
   * Get alerts
   * @returns {Promise<AlertsResponse>} Alerts response
   */
  async getAlerts() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(mockAlerts);
      }, 700); // Symulacja opóźnienia sieciowego
    });
  }
  
  /**
   * Get map data
   * @param {string} type - Map data type
   * @returns {Promise<MapData>} Map data
   */
  async getMapData(type) {
    return new Promise(resolve => {
      setTimeout(() => {
        switch (type) {
          case 'vehicles':
            resolve(mockMapData.vehicles);
            break;
          case 'fraud':
            resolve(mockMapData.fraud);
            break;
          case 'safety':
            resolve(mockMapData.safety);
            break;
          default:
            resolve(mockMapData.vehicles);
        }
      }, 600); // Symulacja opóźnienia sieciowego
    });
  }
}

// Export service instance
export const mockDashboardService = new MockDashboardService();
export default mockDashboardService;
