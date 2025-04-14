import apiClient from './apiClient';

/**
 * @typedef {Object} SafetyAlert
 * @property {string} id - Alert ID
 * @property {string} type - Alert type
 * @property {string} driver - Driver name
 * @property {string} description - Alert description
 * @property {string} time - Alert time
 * @property {string} location - Alert location
 * @property {string} status - Alert status
 * @property {Object} [details] - Alert details
 * @property {string} details.incidentType - Type of incident
 * @property {string} details.severity - Incident severity
 * @property {string} details.driverState - State of the driver
 * @property {number} details.vehicleSpeed - Vehicle speed
 * @property {string} details.videoUrl - URL to incident video
 * @property {Object} details.locationCoordinates - Location coordinates
 * @property {number} details.locationCoordinates.latitude - Latitude
 * @property {number} details.locationCoordinates.longitude - Longitude
 */

/**
 * @typedef {Object} SafetyAlertsResponse
 * @property {number} total - Total number of alerts
 * @property {number} page - Current page
 * @property {number} limit - Page size limit
 * @property {SafetyAlert[]} alerts - List of safety alerts
 */

/**
 * @typedef {Object} DriverRanking
 * @property {string} driver - Driver name
 * @property {number} score - Safety score
 * @property {string} trend - Score trend
 * @property {Object} details - Score details
 * @property {number} details.fatigueScore - Fatigue score
 * @property {number} details.distractionScore - Distraction score
 * @property {number} details.drivingStyleScore - Driving style score
 * @property {number} details.collisionRiskScore - Collision risk score
 */

/**
 * @typedef {Object} DriverRankingResponse
 * @property {DriverRanking[]} rankings - Driver rankings
 */

/**
 * @typedef {Object} DrivingStyleCategory
 * @property {string} category - Category name
 * @property {number} value - Category value
 * @property {number} angle - Angle on radar chart
 * @property {Object} labelPosition - Label position
 * @property {number} labelPosition.x - X coordinate
 * @property {number} labelPosition.y - Y coordinate
 */

/**
 * @typedef {Object} DrivingStyleHistory
 * @property {string} date - History date
 * @property {number} score - History score
 */

/**
 * @typedef {Object} DrivingStyleRecommendation
 * @property {string} category - Recommendation category
 * @property {string} recommendation - Recommendation text
 */

/**
 * @typedef {Object} DrivingStyleResponse
 * @property {string} driver - Driver name
 * @property {number} overallScore - Overall score
 * @property {DrivingStyleCategory[]} drivingStyle - Driving style categories
 * @property {DrivingStyleHistory[]} history - Score history
 * @property {DrivingStyleRecommendation[]} recommendations - Recommendations
 */

/**
 * @typedef {Object} CoachingSession
 * @property {string} id - Session ID
 * @property {string} driver - Driver name
 * @property {string} type - Session type
 * @property {string} topic - Session topic
 * @property {string} date - Session date
 * @property {string} status - Session status
 */

/**
 * @typedef {Object} CoachingSessionsResponse
 * @property {CoachingSession[]} sessions - Coaching sessions
 */

/**
 * Driver safety service class for API interactions
 */
class DriverSafetyService {
  /**
   * Get safety alerts
   * @param {string} [type] - Alert type filter
   * @param {string} [time] - Time filter
   * @param {string} [search] - Search term
   * @param {number} [page=1] - Page number
   * @param {number} [limit=10] - Results per page
   * @returns {Promise<SafetyAlertsResponse>} Safety alerts response
   */
  async getAlerts(
    type,
    time,
    search,
    page = 1,
    limit = 10
  ) {
    const params = {
      type,
      time,
      search,
      page,
      limit
    };
    
    return apiClient.get('/safety/alerts', params);
  }
  
  /**
   * Get alert details
   * @param {string} id - Alert ID
   * @returns {Promise<SafetyAlert>} Safety alert details
   */
  async getAlertDetails(id) {
    return apiClient.get(`/safety/alerts/${id}`);
  }
  
  /**
   * Get driver safety ranking
   * @param {number} [limit=10] - Results limit
   * @param {string} [sort='score_desc'] - Sort order
   * @returns {Promise<DriverRankingResponse>} Driver ranking response
   */
  async getDriverRanking(
    limit = 10,
    sort = 'score_desc'
  ) {
    const params = {
      limit,
      sort
    };
    
    return apiClient.get('/safety/drivers/ranking', params);
  }
  
  /**
   * Get driver style analysis
   * @param {string} driverId - Driver ID
   * @returns {Promise<DrivingStyleResponse>} Driving style response
   */
  async getDriverStyle(driverId) {
    return apiClient.get(`/safety/drivers/${driverId}/style`);
  }
  
  /**
   * Get coaching sessions
   * @param {string} [driver] - Driver filter
   * @param {string} [status] - Status filter
   * @returns {Promise<CoachingSessionsResponse>} Coaching sessions response
   */
  async getCoachingSessions(
    driver,
    status
  ) {
    const params = {
      driver,
      status
    };
    
    return apiClient.get('/safety/coaching', params);
  }
}

// Export service instance
export const driverSafetyService = new DriverSafetyService();
export default driverSafetyService;
