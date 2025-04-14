import apiClient from './apiClient';

/**
 * @typedef {Object} MaintenanceAlert
 * @property {string} id - Alert ID
 * @property {string} priority - Alert priority
 * @property {string} vehicle - Vehicle ID
 * @property {string} component - Component name
 * @property {string} description - Alert description
 * @property {string} forecastDate - Forecast date
 * @property {string} confidence - Confidence level
 * @property {string} status - Alert status
 * @property {Object} [details] - Alert details
 * @property {string} details.componentId - Component ID
 * @property {string} details.componentType - Component type
 * @property {string} details.lastMaintenance - Last maintenance date
 * @property {string} details.currentCondition - Current condition
 * @property {string} details.estimatedLifeRemaining - Estimated life remaining
 * @property {number} details.failureProbability - Failure probability
 * @property {string} details.recommendedAction - Recommended action
 * @property {number} details.estimatedCost - Estimated cost
 * @property {Array} [details.sensorData] - Sensor data
 * @property {string} details.sensorData.sensorId - Sensor ID
 * @property {string} details.sensorData.sensorType - Sensor type
 * @property {Array} details.sensorData.readings - Sensor readings
 * @property {string} details.sensorData.readings.timestamp - Reading timestamp
 * @property {number} details.sensorData.readings.value - Reading value
 * @property {number} details.sensorData.threshold - Sensor threshold
 * @property {string} details.sensorData.unit - Measurement unit
 */

/**
 * @typedef {Object} MaintenanceAlertsResponse
 * @property {number} total - Total number of alerts
 * @property {number} page - Current page
 * @property {number} limit - Page size limit
 * @property {MaintenanceAlert[]} alerts - List of maintenance alerts
 */

/**
 * @typedef {Object} VehicleHealth
 * @property {string} vehicle - Vehicle ID
 * @property {number} overallHealth - Overall health percentage
 * @property {Array} components - Component health data
 * @property {string} components.name - Component name
 * @property {number} components.health - Component health percentage
 * @property {string} components.status - Component status
 * @property {string} lastMaintenance - Last maintenance date
 * @property {string} nextScheduledMaintenance - Next scheduled maintenance date
 */

/**
 * @typedef {Object} VehicleHealthResponse
 * @property {VehicleHealth[]} vehicles - Vehicle health data
 */

/**
 * @typedef {Object} MaintenanceHistory
 * @property {string} id - History ID
 * @property {string} vehicle - Vehicle ID
 * @property {string} date - Maintenance date
 * @property {string} type - Maintenance type
 * @property {string[]} components - Components maintained
 * @property {number} cost - Maintenance cost
 * @property {string} technician - Technician name
 * @property {string} notes - Maintenance notes
 */

/**
 * @typedef {Object} MaintenanceHistoryResponse
 * @property {number} total - Total number of records
 * @property {number} page - Current page
 * @property {number} limit - Page size limit
 * @property {MaintenanceHistory[]} history - Maintenance history
 */

/**
 * @typedef {Object} MaintenanceSchedule
 * @property {string} id - Schedule ID
 * @property {string} vehicle - Vehicle ID
 * @property {string} scheduledDate - Scheduled date
 * @property {string} type - Maintenance type
 * @property {string[]} components - Components to maintain
 * @property {string} estimatedDuration - Estimated duration
 * @property {number} estimatedCost - Estimated cost
 * @property {string} status - Schedule status
 */

/**
 * @typedef {Object} MaintenanceScheduleResponse
 * @property {number} total - Total number of records
 * @property {number} page - Current page
 * @property {number} limit - Page size limit
 * @property {MaintenanceSchedule[]} schedule - Maintenance schedule
 */

/**
 * @typedef {Object} PartInventory
 * @property {string} id - Part ID
 * @property {string} name - Part name
 * @property {string} partNumber - Part number
 * @property {number} quantity - Quantity in stock
 * @property {number} reorderLevel - Reorder level
 * @property {string} supplier - Supplier name
 * @property {string} lastOrderDate - Last order date
 * @property {number} price - Part price
 */

/**
 * @typedef {Object} PartInventoryResponse
 * @property {number} total - Total number of parts
 * @property {number} page - Current page
 * @property {number} limit - Page size limit
 * @property {PartInventory[]} inventory - Parts inventory
 */

/**
 * @typedef {Object} MaintenanceCostAnalysis
 * @property {number} totalCost - Total maintenance cost
 * @property {Array} costByVehicle - Cost by vehicle
 * @property {string} costByVehicle.vehicle - Vehicle ID
 * @property {number} costByVehicle.cost - Vehicle maintenance cost
 * @property {Array} costByComponent - Cost by component
 * @property {string} costByComponent.component - Component name
 * @property {number} costByComponent.cost - Component maintenance cost
 * @property {Array} costByMonth - Cost by month
 * @property {string} costByMonth.month - Month
 * @property {number} costByMonth.cost - Monthly maintenance cost
 * @property {Object} preventiveVsCorrective - Preventive vs corrective costs
 * @property {number} preventiveVsCorrective.preventive - Preventive maintenance cost
 * @property {number} preventiveVsCorrective.corrective - Corrective maintenance cost
 */

/**
 * Predictive maintenance service class for API interactions
 */
class PredictiveMaintenanceService {
  /**
   * Get maintenance alerts
   * @param {string} [priority] - Alert priority filter
   * @param {string} [vehicle] - Vehicle filter
   * @param {string} [component] - Component filter
   * @param {string} [status] - Status filter
   * @param {number} [page=1] - Page number
   * @param {number} [limit=10] - Results per page
   * @returns {Promise<MaintenanceAlertsResponse>} Maintenance alerts response
   */
  async getAlerts(
    priority,
    vehicle,
    component,
    status,
    page = 1,
    limit = 10
  ) {
    const params = {
      priority,
      vehicle,
      component,
      status,
      page,
      limit
    };
    
    return apiClient.get('/maintenance/alerts', params);
  }
  
  /**
   * Get alert details
   * @param {string} id - Alert ID
   * @returns {Promise<MaintenanceAlert>} Maintenance alert details
   */
  async getAlertDetails(id) {
    return apiClient.get(`/maintenance/alerts/${id}`);
  }
  
  /**
   * Update alert status
   * @param {string} id - Alert ID
   * @param {string} status - New status
   * @returns {Promise<MaintenanceAlert>} Updated maintenance alert
   */
  async updateAlertStatus(id, status) {
    return apiClient.put(
      `/maintenance/alerts/${id}/status`, 
      { status }
    );
  }
  
  /**
   * Get vehicle health data
   * @param {string} [vehicle] - Vehicle filter
   * @returns {Promise<VehicleHealthResponse>} Vehicle health response
   */
  async getVehicleHealth(vehicle) {
    const params = {
      vehicle
    };
    
    return apiClient.get('/maintenance/vehicles/health', params);
  }
  
  /**
   * Get maintenance history
   * @param {string} [vehicle] - Vehicle filter
   * @param {string} [dateFrom] - Start date
   * @param {string} [dateTo] - End date
   * @param {string} [type] - Maintenance type filter
   * @param {number} [page=1] - Page number
   * @param {number} [limit=10] - Results per page
   * @returns {Promise<MaintenanceHistoryResponse>} Maintenance history response
   */
  async getMaintenanceHistory(
    vehicle,
    dateFrom,
    dateTo,
    type,
    page = 1,
    limit = 10
  ) {
    const params = {
      vehicle,
      date_from: dateFrom,
      date_to: dateTo,
      type,
      page,
      limit
    };
    
    return apiClient.get('/maintenance/history', params);
  }
  
  /**
   * Get maintenance schedule
   * @param {string} [vehicle] - Vehicle filter
   * @param {string} [dateFrom] - Start date
   * @param {string} [dateTo] - End date
   * @param {string} [status] - Status filter
   * @param {number} [page=1] - Page number
   * @param {number} [limit=10] - Results per page
   * @returns {Promise<MaintenanceScheduleResponse>} Maintenance schedule response
   */
  async getMaintenanceSchedule(
    vehicle,
    dateFrom,
    dateTo,
    status,
    page = 1,
    limit = 10
  ) {
    const params = {
      vehicle,
      date_from: dateFrom,
      date_to: dateTo,
      status,
      page,
      limit
    };
    
    return apiClient.get('/maintenance/schedule', params);
  }
  
  /**
   * Get parts inventory
   * @param {string} [search] - Search term
   * @param {boolean} [lowStock] - Low stock filter
   * @param {number} [page=1] - Page number
   * @param {number} [limit=10] - Results per page
   * @returns {Promise<PartInventoryResponse>} Parts inventory response
   */
  async getPartInventory(
    search,
    lowStock,
    page = 1,
    limit = 10
  ) {
    const params = {
      search,
      low_stock: lowStock,
      page,
      limit
    };
    
    return apiClient.get('/maintenance/parts', params);
  }
  
  /**
   * Get maintenance cost analysis
   * @param {string} [dateFrom] - Start date
   * @param {string} [dateTo] - End date
   * @param {string} [vehicle] - Vehicle filter
   * @returns {Promise<MaintenanceCostAnalysis>} Maintenance cost analysis
   */
  async getCostAnalysis(
    dateFrom,
    dateTo,
    vehicle
  ) {
    const params = {
      date_from: dateFrom,
      date_to: dateTo,
      vehicle
    };
    
    return apiClient.get('/maintenance/costs/analysis', params);
  }
}

// Export service instance
export const predictiveMaintenanceService = new PredictiveMaintenanceService();
export default predictiveMaintenanceService;
