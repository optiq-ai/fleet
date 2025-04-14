// Mock data service for Monitoring
// This file provides mock data for the Monitoring section when the backend is not available

/**
 * @typedef {Object} Vehicle
 * @property {string} id - Vehicle ID
 * @property {string} name - Vehicle name
 * @property {string} type - Vehicle type
 * @property {string} status - Vehicle status
 * @property {Object} location - Vehicle location
 * @property {number} location.lat - Latitude
 * @property {number} location.lng - Longitude
 * @property {string} driver - Driver name
 * @property {Object} fuelData - Fuel data
 * @property {number} fuelData.level - Current fuel level (%)
 * @property {number} fuelData.consumption - Average consumption (l/100km)
 * @property {number} fuelData.range - Estimated range (km)
 * @property {Object} performance - Performance data
 * @property {number} performance.speed - Current speed (km/h)
 * @property {number} performance.engineTemp - Engine temperature (°C)
 * @property {number} performance.oilPressure - Oil pressure (bar)
 * @property {number} performance.batteryVoltage - Battery voltage (V)
 */

/**
 * @typedef {Object} Alert
 * @property {string} id - Alert ID
 * @property {string} vehicleId - Vehicle ID
 * @property {string} type - Alert type
 * @property {string} severity - Alert severity
 * @property {string} message - Alert message
 * @property {string} timestamp - Alert timestamp
 * @property {boolean} acknowledged - Whether the alert has been acknowledged
 */

/**
 * @typedef {Object} FuelConsumptionData
 * @property {string} vehicleId - Vehicle ID
 * @property {string} period - Data period
 * @property {Array<Object>} data - Consumption data points
 * @property {string} data[].date - Date
 * @property {number} data[].consumption - Consumption value
 * @property {number} averageConsumption - Average consumption for the period
 * @property {number} totalConsumption - Total consumption for the period
 * @property {number} costPerLiter - Cost per liter
 * @property {number} totalCost - Total cost for the period
 */

/**
 * @typedef {Object} KPIData
 * @property {number} totalVehicles - Total number of vehicles
 * @property {number} activeVehicles - Number of active vehicles
 * @property {number} inactiveVehicles - Number of inactive vehicles
 * @property {number} alertsCount - Number of active alerts
 * @property {number} averageFuelConsumption - Average fuel consumption
 * @property {number} totalDistance - Total distance traveled
 * @property {number} averageSpeed - Average speed
 * @property {number} idleTime - Total idle time
 */

/**
 * @typedef {Object} TrendData
 * @property {string} period - Data period
 * @property {Array<Object>} fuelConsumption - Fuel consumption trend
 * @property {Array<Object>} distance - Distance traveled trend
 * @property {Array<Object>} alerts - Alerts trend
 * @property {Array<Object>} idleTime - Idle time trend
 */

// Mock vehicles data
const mockVehicles = [
  {
    id: 'V001',
    name: 'Truck 001',
    type: 'Heavy Truck',
    status: 'Active',
    location: { lat: 52.2297, lng: 21.0122 },
    driver: 'Jan Kowalski',
    fuelData: {
      level: 78,
      consumption: 32.5,
      range: 450
    },
    performance: {
      speed: 72,
      engineTemp: 92,
      oilPressure: 5.2,
      batteryVoltage: 12.7
    }
  },
  {
    id: 'V002',
    name: 'Truck 002',
    type: 'Heavy Truck',
    status: 'Active',
    location: { lat: 52.4064, lng: 16.9252 },
    driver: 'Anna Nowak',
    fuelData: {
      level: 45,
      consumption: 34.2,
      range: 280
    },
    performance: {
      speed: 85,
      engineTemp: 95,
      oilPressure: 4.9,
      batteryVoltage: 12.5
    }
  },
  {
    id: 'V003',
    name: 'Van 001',
    type: 'Delivery Van',
    status: 'Maintenance',
    location: { lat: 51.7592, lng: 19.4560 },
    driver: 'Piotr Wiśniewski',
    fuelData: {
      level: 12,
      consumption: 12.8,
      range: 65
    },
    performance: {
      speed: 0,
      engineTemp: 45,
      oilPressure: 3.8,
      batteryVoltage: 11.9
    }
  },
  {
    id: 'V004',
    name: 'Truck 003',
    type: 'Medium Truck',
    status: 'Active',
    location: { lat: 50.0647, lng: 19.9450 },
    driver: 'Katarzyna Dąbrowska',
    fuelData: {
      level: 92,
      consumption: 28.5,
      range: 620
    },
    performance: {
      speed: 65,
      engineTemp: 88,
      oilPressure: 5.0,
      batteryVoltage: 12.8
    }
  },
  {
    id: 'V005',
    name: 'Van 002',
    type: 'Delivery Van',
    status: 'Inactive',
    location: { lat: 53.1235, lng: 18.0084 },
    driver: 'Unassigned',
    fuelData: {
      level: 35,
      consumption: 11.2,
      range: 180
    },
    performance: {
      speed: 0,
      engineTemp: 25,
      oilPressure: 0,
      batteryVoltage: 12.2
    }
  },
  {
    id: 'V006',
    name: 'Truck 004',
    type: 'Heavy Truck',
    status: 'Active',
    location: { lat: 51.1079, lng: 17.0385 },
    driver: 'Tomasz Lewandowski',
    fuelData: {
      level: 65,
      consumption: 33.1,
      range: 380
    },
    performance: {
      speed: 78,
      engineTemp: 90,
      oilPressure: 5.1,
      batteryVoltage: 12.6
    }
  },
  {
    id: 'V007',
    name: 'Van 003',
    type: 'Delivery Van',
    status: 'Active',
    location: { lat: 54.3520, lng: 18.6466 },
    driver: 'Michał Kowalczyk',
    fuelData: {
      level: 55,
      consumption: 12.0,
      range: 280
    },
    performance: {
      speed: 45,
      engineTemp: 82,
      oilPressure: 4.5,
      batteryVoltage: 12.4
    }
  },
  {
    id: 'V008',
    name: 'Truck 005',
    type: 'Medium Truck',
    status: 'Active',
    location: { lat: 53.4289, lng: 14.5530 },
    driver: 'Agnieszka Kamińska',
    fuelData: {
      level: 82,
      consumption: 27.8,
      range: 550
    },
    performance: {
      speed: 92,
      engineTemp: 94,
      oilPressure: 5.3,
      batteryVoltage: 12.9
    }
  }
];

// Mock alerts data
const mockAlerts = [
  {
    id: 'A001',
    vehicleId: 'V001',
    type: 'Fuel',
    severity: 'Low',
    message: 'Fuel consumption above average',
    timestamp: '2025-04-14T10:23:15',
    acknowledged: false
  },
  {
    id: 'A002',
    vehicleId: 'V003',
    type: 'Maintenance',
    severity: 'High',
    message: 'Oil pressure low',
    timestamp: '2025-04-14T08:45:22',
    acknowledged: true
  },
  {
    id: 'A003',
    vehicleId: 'V002',
    type: 'Speed',
    severity: 'Medium',
    message: 'Speed limit exceeded',
    timestamp: '2025-04-14T11:12:05',
    acknowledged: false
  },
  {
    id: 'A004',
    vehicleId: 'V006',
    type: 'Engine',
    severity: 'High',
    message: 'Engine temperature high',
    timestamp: '2025-04-14T09:37:48',
    acknowledged: false
  },
  {
    id: 'A005',
    vehicleId: 'V004',
    type: 'Battery',
    severity: 'Low',
    message: 'Battery voltage fluctuation',
    timestamp: '2025-04-14T07:55:30',
    acknowledged: true
  },
  {
    id: 'A006',
    vehicleId: 'V007',
    type: 'Geofence',
    severity: 'Medium',
    message: 'Vehicle outside designated area',
    timestamp: '2025-04-14T12:05:18',
    acknowledged: false
  },
  {
    id: 'A007',
    vehicleId: 'V008',
    type: 'Idle',
    severity: 'Low',
    message: 'Excessive idle time',
    timestamp: '2025-04-14T10:48:33',
    acknowledged: false
  }
];

// Mock fuel consumption data
const mockFuelConsumptionData = {
  vehicleId: 'all',
  period: 'last_month',
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
  totalConsumption: 973.4,
  costPerLiter: 5.85,
  totalCost: 5694.39
};

// Mock KPI data
const mockKPIData = {
  totalVehicles: 8,
  activeVehicles: 6,
  inactiveVehicles: 2,
  alertsCount: 7,
  averageFuelConsumption: 31.4,
  totalDistance: 12580,
  averageSpeed: 72.5,
  idleTime: 345
};

// Mock trend data
const mockTrendData = {
  period: 'last_month',
  fuelConsumption: [
    { date: '2025-03-15', value: 31.2 },
    { date: '2025-03-22', value: 30.5 },
    { date: '2025-03-29', value: 31.7 },
    { date: '2025-04-05', value: 32.1 },
    { date: '2025-04-12', value: 31.5 },
    { date: '2025-04-14', value: 31.0 }
  ],
  distance: [
    { date: '2025-03-15', value: 2150 },
    { date: '2025-03-22', value: 2320 },
    { date: '2025-03-29', value: 2480 },
    { date: '2025-04-05', value: 2250 },
    { date: '2025-04-12', value: 2380 },
    { date: '2025-04-14', value: 1000 }
  ],
  alerts: [
    { date: '2025-03-15', value: 3 },
    { date: '2025-03-22', value: 5 },
    { date: '2025-03-29', value: 2 },
    { date: '2025-04-05', value: 4 },
    { date: '2025-04-12', value: 6 },
    { date: '2025-04-14', value: 7 }
  ],
  idleTime: [
    { date: '2025-03-15', value: 65 },
    { date: '2025-03-22', value: 58 },
    { date: '2025-03-29', value: 72 },
    { date: '2025-04-05', value: 63 },
    { date: '2025-04-12', value: 55 },
    { date: '2025-04-14', value: 32 }
  ]
};

/**
 * Mock monitoring service class
 */
class MockMonitoringService {
  /**
   * Get all vehicles
   * @returns {Promise<Vehicle[]>} Vehicles data
   */
  async getVehicles() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(mockVehicles);
      }, 500); // Symulacja opóźnienia sieciowego
    });
  }
  
  /**
   * Get vehicle by ID
   * @param {string} id - Vehicle ID
   * @returns {Promise<Vehicle>} Vehicle data
   */
  async getVehicleById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const vehicle = mockVehicles.find(v => v.id === id);
        if (vehicle) {
          resolve(vehicle);
        } else {
          reject(new Error('Vehicle not found'));
        }
      }, 300);
    });
  }
  
  /**
   * Get all alerts
   * @returns {Promise<Alert[]>} Alerts data
   */
  async getAlerts() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(mockAlerts);
      }, 400);
    });
  }
  
  /**
   * Get alerts for specific vehicle
   * @param {string} vehicleId - Vehicle ID
   * @returns {Promise<Alert[]>} Vehicle alerts
   */
  async getVehicleAlerts(vehicleId) {
    return new Promise(resolve => {
      setTimeout(() => {
        const vehicleAlerts = mockAlerts.filter(alert => alert.vehicleId === vehicleId);
        resolve(vehicleAlerts);
      }, 300);
    });
  }
  
  /**
   * Get fuel consumption data
   * @param {string} vehicleId - Vehicle ID or 'all' for fleet average
   * @param {string} period - Time period ('day', 'week', 'month', 'year')
   * @returns {Promise<FuelConsumptionData>} Fuel consumption data
   */
  async getFuelConsumptionData(vehicleId = 'all', period = 'last_month') {
    return new Promise(resolve => {
      setTimeout(() => {
        // In a real implementation, we would filter data based on vehicleId and period
        resolve(mockFuelConsumptionData);
      }, 600);
    });
  }
  
  /**
   * Get KPI data
   * @returns {Promise<KPIData>} KPI data
   */
  async getKPIData() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(mockKPIData);
      }, 350);
    });
  }
  
  /**
   * Get trend data
   * @param {string} period - Time period ('week', 'month', 'quarter', 'year')
   * @returns {Promise<TrendData>} Trend data
   */
  async getTrendData(period = 'last_month') {
    return new Promise(resolve => {
      setTimeout(() => {
        // In a real implementation, we would filter data based on period
        resolve(mockTrendData);
      }, 550);
    });
  }
  
  /**
   * Acknowledge alert
   * @param {string} alertId - Alert ID
   * @returns {Promise<boolean>} Success status
   */
  async acknowledgeAlert(alertId) {
    return new Promise(resolve => {
      setTimeout(() => {
        const alertIndex = mockAlerts.findIndex(alert => alert.id === alertId);
        if (alertIndex !== -1) {
          mockAlerts[alertIndex].acknowledged = true;
          resolve(true);
        } else {
          resolve(false);
        }
      }, 300);
    });
  }
}

// Export service instance
export const mockMonitoringService = new MockMonitoringService();
export default mockMonitoringService;
