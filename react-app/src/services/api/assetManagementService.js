/**
 * Asset Management Service
 * 
 * Service for managing all fleet assets including vehicles, equipment, tools, parts, and accessories.
 */

import apiClient from './apiClient';

/**
 * Get asset management dashboard data
 * @param {Object} params - Query parameters
 * @param {string} params.timeRange - Time range for data (day, week, month, year)
 * @returns {Promise<Object>} Dashboard data including asset counts, alerts, and statistics
 */
export const getAssetDashboard = async (params = {}) => {
  try {
    const response = await apiClient.get('/assets/dashboard', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching asset dashboard:', error);
    throw error;
  }
};

/**
 * Get list of assets
 * @param {Object} params - Query parameters
 * @param {string} params.type - Filter by asset type (vehicle, equipment, tool, part, accessory)
 * @param {string} params.category - Filter by asset category
 * @param {string} params.status - Filter by asset status
 * @param {string} params.location - Filter by asset location
 * @param {string} params.search - Search term
 * @param {number} params.page - Page number
 * @param {number} params.limit - Items per page
 * @returns {Promise<Object>} Assets data with pagination
 */
export const getAssets = async (params = {}) => {
  try {
    const response = await apiClient.get('/assets', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching assets:', error);
    throw error;
  }
};

/**
 * Get asset details
 * @param {string} assetId - Asset ID
 * @returns {Promise<Object>} Asset details
 */
export const getAssetDetails = async (assetId) => {
  try {
    const response = await apiClient.get(`/assets/${assetId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching asset details for ID ${assetId}:`, error);
    throw error;
  }
};

/**
 * Create new asset
 * @param {Object} assetData - Asset data
 * @param {File} file - Asset image or document file (optional)
 * @returns {Promise<Object>} Created asset data
 */
export const createAsset = async (assetData, file = null) => {
  try {
    let response;
    
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('data', JSON.stringify(assetData));
      
      response = await apiClient.post('/assets', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    } else {
      response = await apiClient.post('/assets', assetData);
    }
    
    return response.data;
  } catch (error) {
    console.error('Error creating asset:', error);
    throw error;
  }
};

/**
 * Update existing asset
 * @param {string} assetId - Asset ID
 * @param {Object} assetData - Updated asset data
 * @param {File} file - Updated asset image or document file (optional)
 * @returns {Promise<Object>} Updated asset data
 */
export const updateAsset = async (assetId, assetData, file = null) => {
  try {
    let response;
    
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('data', JSON.stringify(assetData));
      
      response = await apiClient.put(`/assets/${assetId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    } else {
      response = await apiClient.put(`/assets/${assetId}`, assetData);
    }
    
    return response.data;
  } catch (error) {
    console.error(`Error updating asset with ID ${assetId}:`, error);
    throw error;
  }
};

/**
 * Delete asset
 * @param {string} assetId - Asset ID
 * @returns {Promise<Object>} Result of deletion
 */
export const deleteAsset = async (assetId) => {
  try {
    const response = await apiClient.delete(`/assets/${assetId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting asset with ID ${assetId}:`, error);
    throw error;
  }
};

/**
 * Assign asset to vehicle, driver, or location
 * @param {string} assetId - Asset ID
 * @param {Object} assignmentData - Assignment data
 * @param {string} assignmentData.type - Type of assignment (vehicle, driver, location, department)
 * @param {string} assignmentData.id - ID of entity to assign to
 * @param {string} assignmentData.startDate - Start date of assignment
 * @param {string} assignmentData.endDate - End date of assignment (optional)
 * @param {string} assignmentData.notes - Assignment notes (optional)
 * @returns {Promise<Object>} Assignment result
 */
export const assignAsset = async (assetId, assignmentData) => {
  try {
    const response = await apiClient.post(`/assets/${assetId}/assign`, assignmentData);
    return response.data;
  } catch (error) {
    console.error(`Error assigning asset with ID ${assetId}:`, error);
    throw error;
  }
};

/**
 * Unassign asset
 * @param {string} assetId - Asset ID
 * @param {string} assignmentId - Assignment ID
 * @returns {Promise<Object>} Unassignment result
 */
export const unassignAsset = async (assetId, assignmentId) => {
  try {
    const response = await apiClient.post(`/assets/${assetId}/unassign`, { assignmentId });
    return response.data;
  } catch (error) {
    console.error(`Error unassigning asset with ID ${assetId}:`, error);
    throw error;
  }
};

/**
 * Get asset maintenance schedule
 * @param {string} assetId - Asset ID
 * @returns {Promise<Array<Object>>} Maintenance schedule
 */
export const getAssetMaintenanceSchedule = async (assetId) => {
  try {
    const response = await apiClient.get(`/assets/${assetId}/maintenance/schedule`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching maintenance schedule for asset with ID ${assetId}:`, error);
    throw error;
  }
};

/**
 * Get asset maintenance history
 * @param {string} assetId - Asset ID
 * @param {Object} params - Query parameters
 * @param {string} params.startDate - Start date for history
 * @param {string} params.endDate - End date for history
 * @param {string} params.type - Filter by maintenance type
 * @param {number} params.page - Page number
 * @param {number} params.limit - Items per page
 * @returns {Promise<Object>} Maintenance history with pagination
 */
export const getAssetMaintenanceHistory = async (assetId, params = {}) => {
  try {
    const response = await apiClient.get(`/assets/${assetId}/maintenance/history`, { params });
    return response.data;
  } catch (error) {
    console.error(`Error fetching maintenance history for asset with ID ${assetId}:`, error);
    throw error;
  }
};

/**
 * Schedule asset maintenance
 * @param {string} assetId - Asset ID
 * @param {Object} maintenanceData - Maintenance data
 * @returns {Promise<Object>} Scheduled maintenance data
 */
export const scheduleAssetMaintenance = async (assetId, maintenanceData) => {
  try {
    const response = await apiClient.post(`/assets/${assetId}/maintenance/schedule`, maintenanceData);
    return response.data;
  } catch (error) {
    console.error(`Error scheduling maintenance for asset with ID ${assetId}:`, error);
    throw error;
  }
};

/**
 * Record asset maintenance
 * @param {string} assetId - Asset ID
 * @param {Object} maintenanceData - Maintenance data
 * @param {File} file - Maintenance document file (optional)
 * @returns {Promise<Object>} Recorded maintenance data
 */
export const recordAssetMaintenance = async (assetId, maintenanceData, file = null) => {
  try {
    let response;
    
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('data', JSON.stringify(maintenanceData));
      
      response = await apiClient.post(`/assets/${assetId}/maintenance/record`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    } else {
      response = await apiClient.post(`/assets/${assetId}/maintenance/record`, maintenanceData);
    }
    
    return response.data;
  } catch (error) {
    console.error(`Error recording maintenance for asset with ID ${assetId}:`, error);
    throw error;
  }
};

/**
 * Get asset categories
 * @param {Object} params - Query parameters
 * @param {string} params.type - Filter by asset type
 * @returns {Promise<Array<Object>>} Asset categories
 */
export const getAssetCategories = async (params = {}) => {
  try {
    const response = await apiClient.get('/assets/categories', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching asset categories:', error);
    throw error;
  }
};

/**
 * Get asset locations
 * @returns {Promise<Array<Object>>} Asset locations
 */
export const getAssetLocations = async () => {
  try {
    const response = await apiClient.get('/assets/locations');
    return response.data;
  } catch (error) {
    console.error('Error fetching asset locations:', error);
    throw error;
  }
};

/**
 * Get asset utilization data
 * @param {Object} params - Query parameters
 * @param {string} params.assetId - Filter by asset ID (optional)
 * @param {string} params.type - Filter by asset type
 * @param {string} params.category - Filter by asset category
 * @param {string} params.timeRange - Time range for data (day, week, month, year)
 * @returns {Promise<Object>} Asset utilization data
 */
export const getAssetUtilization = async (params = {}) => {
  try {
    const response = await apiClient.get('/assets/utilization', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching asset utilization data:', error);
    throw error;
  }
};

/**
 * Get asset depreciation data
 * @param {Object} params - Query parameters
 * @param {string} params.assetId - Filter by asset ID (optional)
 * @param {string} params.type - Filter by asset type
 * @param {string} params.category - Filter by asset category
 * @returns {Promise<Object>} Asset depreciation data
 */
export const getAssetDepreciation = async (params = {}) => {
  try {
    const response = await apiClient.get('/assets/depreciation', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching asset depreciation data:', error);
    throw error;
  }
};

/**
 * Get asset costs data
 * @param {Object} params - Query parameters
 * @param {string} params.assetId - Filter by asset ID (optional)
 * @param {string} params.type - Filter by asset type
 * @param {string} params.category - Filter by asset category
 * @param {string} params.costType - Filter by cost type
 * @param {string} params.startDate - Start date for costs
 * @param {string} params.endDate - End date for costs
 * @returns {Promise<Object>} Asset costs data
 */
export const getAssetCosts = async (params = {}) => {
  try {
    const response = await apiClient.get('/assets/costs', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching asset costs data:', error);
    throw error;
  }
};

/**
 * Calculate asset total cost of ownership (TCO)
 * @param {string} assetId - Asset ID
 * @param {Object} params - Calculation parameters
 * @returns {Promise<Object>} TCO calculation result
 */
export const calculateAssetTCO = async (assetId, params = {}) => {
  try {
    const response = await apiClient.get(`/assets/${assetId}/tco`, { params });
    return response.data;
  } catch (error) {
    console.error(`Error calculating TCO for asset with ID ${assetId}:`, error);
    throw error;
  }
};

/**
 * Forecast asset replacement
 * @param {string} assetId - Asset ID
 * @param {Object} params - Forecast parameters
 * @returns {Promise<Object>} Replacement forecast result
 */
export const forecastAssetReplacement = async (assetId, params = {}) => {
  try {
    const response = await apiClient.get(`/assets/${assetId}/replacement-forecast`, { params });
    return response.data;
  } catch (error) {
    console.error(`Error forecasting replacement for asset with ID ${assetId}:`, error);
    throw error;
  }
};

/**
 * Track asset location
 * @param {string} assetId - Asset ID
 * @returns {Promise<Object>} Asset location data
 */
export const trackAssetLocation = async (assetId) => {
  try {
    const response = await apiClient.get(`/assets/${assetId}/location`);
    return response.data;
  } catch (error) {
    console.error(`Error tracking location for asset with ID ${assetId}:`, error);
    throw error;
  }
};

/**
 * Generate asset report
 * @param {Object} params - Report parameters
 * @param {string} params.reportType - Type of report
 * @param {string} params.format - Report format (PDF, CSV, XLSX)
 * @param {Object} params.filters - Filters for report data
 * @returns {Promise<Object>} Generated report data
 */
export const generateAssetReport = async (params = {}) => {
  try {
    const response = await apiClient.post('/assets/reports', params);
    return response.data;
  } catch (error) {
    console.error('Error generating asset report:', error);
    throw error;
  }
};

/**
 * Export asset data
 * @param {Object} params - Export parameters
 * @param {Array<string>} params.assetIds - IDs of assets to export
 * @param {string} params.format - Export format (PDF, CSV, XLSX)
 * @returns {Promise<Object>} Export result with download URL
 */
export const exportAssetData = async (params = {}) => {
  try {
    const response = await apiClient.post('/assets/export', params);
    return response.data;
  } catch (error) {
    console.error('Error exporting asset data:', error);
    throw error;
  }
};

/**
 * Import asset data
 * @param {File} file - File with asset data
 * @param {Object} params - Import parameters
 * @param {boolean} params.updateExisting - Whether to update existing assets
 * @returns {Promise<Object>} Import result
 */
export const importAssetData = async (file, params = {}) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('params', JSON.stringify(params));
    
    const response = await apiClient.post('/assets/import', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error importing asset data:', error);
    throw error;
  }
};

export default {
  getAssetDashboard,
  getAssets,
  getAssetDetails,
  createAsset,
  updateAsset,
  deleteAsset,
  assignAsset,
  unassignAsset,
  getAssetMaintenanceSchedule,
  getAssetMaintenanceHistory,
  scheduleAssetMaintenance,
  recordAssetMaintenance,
  getAssetCategories,
  getAssetLocations,
  getAssetUtilization,
  getAssetDepreciation,
  getAssetCosts,
  calculateAssetTCO,
  forecastAssetReplacement,
  trackAssetLocation,
  generateAssetReport,
  exportAssetData,
  importAssetData
};
