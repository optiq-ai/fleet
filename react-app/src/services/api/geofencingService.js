/**
 * Geofencing Service
 * 
 * Service for managing geofences, monitoring zone violations, and generating alerts.
 */

/**
 * Get geofencing dashboard data
 * @param {Object} params - Query parameters
 * @param {string} params.timeRange - Time range for data (day, week, month, year)
 * @returns {Promise<Object>} Dashboard data including KPIs, map data, and alerts
 */
export const getGeofencingDashboard = async (params = {}) => {
  try {
    const response = await fetch(`/api/geofencing/dashboard?${new URLSearchParams(params)}`);
    if (!response.ok) {
      throw new Error('Failed to fetch geofencing dashboard data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching geofencing dashboard data:', error);
    throw error;
  }
};

/**
 * Get list of geofences
 * @param {Object} params - Query parameters
 * @param {string} params.category - Filter by category
 * @param {string} params.status - Filter by status
 * @param {string} params.search - Search term
 * @param {number} params.page - Page number
 * @param {number} params.limit - Items per page
 * @returns {Promise<Object>} Geofences data
 */
export const getGeofences = async (params = {}) => {
  try {
    const response = await fetch(`/api/geofencing/geofences?${new URLSearchParams(params)}`);
    if (!response.ok) {
      throw new Error('Failed to fetch geofences');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching geofences:', error);
    throw error;
  }
};

/**
 * Get geofence details
 * @param {string} id - Geofence ID
 * @returns {Promise<Object>} Geofence details
 */
export const getGeofenceDetails = async (id) => {
  try {
    const response = await fetch(`/api/geofencing/geofences/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch geofence details for ID ${id}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching geofence details for ID ${id}:`, error);
    throw error;
  }
};

/**
 * Create new geofence
 * @param {Object} geofenceData - Geofence data
 * @returns {Promise<Object>} Created geofence
 */
export const createGeofence = async (geofenceData) => {
  try {
    const response = await fetch('/api/geofencing/geofences', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(geofenceData),
    });
    if (!response.ok) {
      throw new Error('Failed to create geofence');
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating geofence:', error);
    throw error;
  }
};

/**
 * Update geofence
 * @param {string} id - Geofence ID
 * @param {Object} geofenceData - Updated geofence data
 * @returns {Promise<Object>} Updated geofence
 */
export const updateGeofence = async (id, geofenceData) => {
  try {
    const response = await fetch(`/api/geofencing/geofences/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(geofenceData),
    });
    if (!response.ok) {
      throw new Error(`Failed to update geofence with ID ${id}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error updating geofence with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Delete geofence
 * @param {string} id - Geofence ID
 * @returns {Promise<Object>} Deletion result
 */
export const deleteGeofence = async (id) => {
  try {
    const response = await fetch(`/api/geofencing/geofences/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Failed to delete geofence with ID ${id}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error deleting geofence with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Get geofence violations
 * @param {Object} params - Query parameters
 * @param {string} params.geofenceId - Filter by geofence ID
 * @param {string} params.vehicleId - Filter by vehicle ID
 * @param {string} params.driverId - Filter by driver ID
 * @param {string} params.dateFrom - Filter by date from
 * @param {string} params.dateTo - Filter by date to
 * @param {string} params.violationType - Filter by violation type (entry, exit, dwell)
 * @param {number} params.page - Page number
 * @param {number} params.limit - Items per page
 * @returns {Promise<Object>} Violations data
 */
export const getGeofenceViolations = async (params = {}) => {
  try {
    const response = await fetch(`/api/geofencing/violations?${new URLSearchParams(params)}`);
    if (!response.ok) {
      throw new Error('Failed to fetch geofence violations');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching geofence violations:', error);
    throw error;
  }
};

/**
 * Get time in zone report
 * @param {Object} params - Query parameters
 * @param {string} params.geofenceId - Filter by geofence ID
 * @param {string} params.vehicleId - Filter by vehicle ID
 * @param {string} params.driverId - Filter by driver ID
 * @param {string} params.dateFrom - Filter by date from
 * @param {string} params.dateTo - Filter by date to
 * @param {string} params.groupBy - Group by (vehicle, driver, geofence, day, week, month)
 * @returns {Promise<Object>} Time in zone report data
 */
export const getTimeInZoneReport = async (params = {}) => {
  try {
    const response = await fetch(`/api/geofencing/reports/time-in-zone?${new URLSearchParams(params)}`);
    if (!response.ok) {
      throw new Error('Failed to fetch time in zone report');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching time in zone report:', error);
    throw error;
  }
};

/**
 * Configure alert rule
 * @param {Object} ruleData - Alert rule data
 * @returns {Promise<Object>} Configured alert rule
 */
export const configureAlertRule = async (ruleData) => {
  try {
    const response = await fetch('/api/geofencing/alert-rules', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ruleData),
    });
    if (!response.ok) {
      throw new Error('Failed to configure alert rule');
    }
    return await response.json();
  } catch (error) {
    console.error('Error configuring alert rule:', error);
    throw error;
  }
};

/**
 * Get alert rules
 * @param {Object} params - Query parameters
 * @param {string} params.geofenceId - Filter by geofence ID
 * @returns {Promise<Object>} Alert rules data
 */
export const getAlertRules = async (params = {}) => {
  try {
    const response = await fetch(`/api/geofencing/alert-rules?${new URLSearchParams(params)}`);
    if (!response.ok) {
      throw new Error('Failed to fetch alert rules');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching alert rules:', error);
    throw error;
  }
};

/**
 * Update alert rule
 * @param {string} id - Alert rule ID
 * @param {Object} ruleData - Updated alert rule data
 * @returns {Promise<Object>} Updated alert rule
 */
export const updateAlertRule = async (id, ruleData) => {
  try {
    const response = await fetch(`/api/geofencing/alert-rules/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ruleData),
    });
    if (!response.ok) {
      throw new Error(`Failed to update alert rule with ID ${id}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error updating alert rule with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Delete alert rule
 * @param {string} id - Alert rule ID
 * @returns {Promise<Object>} Deletion result
 */
export const deleteAlertRule = async (id) => {
  try {
    const response = await fetch(`/api/geofencing/alert-rules/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Failed to delete alert rule with ID ${id}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error deleting alert rule with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Optimize route with geofences
 * @param {Object} params - Route parameters
 * @param {string} params.origin - Origin location
 * @param {string} params.destination - Destination location
 * @param {Array} params.avoidGeofences - Array of geofence IDs to avoid
 * @returns {Promise<Object>} Optimized route data
 */
export const optimizeRouteWithGeofences = async (params = {}) => {
  try {
    const response = await fetch('/api/geofencing/routes/optimize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
    if (!response.ok) {
      throw new Error('Failed to optimize route with geofences');
    }
    return await response.json();
  } catch (error) {
    console.error('Error optimizing route with geofences:', error);
    throw error;
  }
};

/**
 * Export geofencing report
 * @param {Object} params - Report parameters
 * @param {string} params.reportType - Report type (violations, timeInZone)
 * @param {string} params.dateFrom - Start date
 * @param {string} params.dateTo - End date
 * @param {string} params.format - Report format (pdf, csv, xlsx)
 * @returns {Promise<Object>} Report data or download URL
 */
export const exportGeofencingReport = async (params = {}) => {
  try {
    const response = await fetch('/api/geofencing/reports/export', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
    if (!response.ok) {
      throw new Error('Failed to export geofencing report');
    }
    return await response.json();
  } catch (error) {
    console.error('Error exporting geofencing report:', error);
    throw error;
  }
};
