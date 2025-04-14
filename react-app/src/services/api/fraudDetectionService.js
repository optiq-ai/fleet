import apiClient from './apiClient';

/**
 * @typedef {Object} FraudAlert
 * @property {string} id - Alert ID
 * @property {string} priority - Alert priority
 * @property {string} vehicle - Vehicle ID
 * @property {string} description - Alert description
 * @property {string} date - Alert date
 * @property {string} location - Alert location
 * @property {string} status - Alert status
 * @property {Object} [details] - Alert details
 * @property {string} details.transactionId - Transaction ID
 * @property {number} details.amount - Transaction amount
 * @property {string} details.fuelType - Type of fuel
 * @property {number} details.quantity - Fuel quantity
 * @property {string} details.driverId - Driver ID
 * @property {Object} [details.locationCoordinates] - Location coordinates
 * @property {number} details.locationCoordinates.latitude - Latitude
 * @property {number} details.locationCoordinates.longitude - Longitude
 * @property {Object} [details.cardVerification] - Card verification details
 * @property {string} details.cardVerification.status - Verification status
 * @property {Object} details.cardVerification.cardLocation - Card location
 * @property {number} details.cardVerification.cardLocation.latitude - Latitude
 * @property {number} details.cardVerification.cardLocation.longitude - Longitude
 * @property {number} details.cardVerification.distanceFromVehicle - Distance from vehicle
 * @property {Array} [details.transactionHistory] - Transaction history
 * @property {string} details.transactionHistory.date - Transaction date
 * @property {number} details.transactionHistory.amount - Transaction amount
 * @property {number} details.transactionHistory.quantity - Fuel quantity
 * @property {string} details.transactionHistory.location - Transaction location
 */

/**
 * @typedef {Object} FraudAlertsResponse
 * @property {number} total - Total number of alerts
 * @property {number} page - Current page
 * @property {number} limit - Page size limit
 * @property {FraudAlert[]} alerts - List of fraud alerts
 */

/**
 * @typedef {Object} TransactionPattern
 * @property {string} date - Transaction date
 * @property {string} vehicle - Vehicle ID
 * @property {string} driver - Driver ID
 * @property {string} amount - Transaction amount
 * @property {string} quantity - Fuel quantity
 * @property {string} location - Transaction location
 * @property {string} riskLevel - Risk level
 */

/**
 * @typedef {Object} TransactionAnalysis
 * @property {number} averageAmount - Average transaction amount
 * @property {number} averageQuantity - Average fuel quantity
 * @property {Array} frequentLocations - Frequent transaction locations
 * @property {string} frequentLocations.location - Location name
 * @property {number} frequentLocations.count - Number of transactions
 * @property {Array} riskDistribution - Risk distribution
 * @property {string} riskDistribution.category - Risk category
 * @property {number} riskDistribution.percentage - Percentage
 * @property {string} riskDistribution.color - Display color
 */

/**
 * @typedef {Object} TransactionPatternsResponse
 * @property {TransactionPattern[]} patterns - Transaction patterns
 * @property {TransactionAnalysis} analysis - Transaction analysis
 */

/**
 * @typedef {Object} AlertStatusUpdate
 * @property {string} status - New status
 * @property {string} [comment] - Optional comment
 */

/**
 * @typedef {Object} AlertStatusUpdateResponse
 * @property {string} id - Alert ID
 * @property {string} status - Updated status
 * @property {string} updatedAt - Update timestamp
 */

/**
 * Fraud detection service class for API interactions
 */
class FraudDetectionService {
  /**
   * Get fraud alerts
   * @param {string} [priority] - Alert priority filter
   * @param {string} [status] - Alert status filter
   * @param {string} [dateFrom] - Start date
   * @param {string} [dateTo] - End date
   * @param {string} [search] - Search term
   * @param {number} [page=1] - Page number
   * @param {number} [limit=10] - Results per page
   * @returns {Promise<FraudAlertsResponse>} Fraud alerts response
   */
  async getAlerts(
    priority,
    status,
    dateFrom,
    dateTo,
    search,
    page = 1,
    limit = 10
  ) {
    const params = {
      priority,
      status,
      date_from: dateFrom,
      date_to: dateTo,
      search,
      page,
      limit
    };
    
    return apiClient.get('/fraud/alerts', params);
  }
  
  /**
   * Get alert details
   * @param {string} id - Alert ID
   * @returns {Promise<FraudAlert>} Fraud alert details
   */
  async getAlertDetails(id) {
    return apiClient.get(`/fraud/alerts/${id}`);
  }
  
  /**
   * Update alert status
   * @param {string} id - Alert ID
   * @param {AlertStatusUpdate} statusUpdate - Status update data
   * @returns {Promise<AlertStatusUpdateResponse>} Status update response
   */
  async updateAlertStatus(id, statusUpdate) {
    return apiClient.put(
      `/fraud/alerts/${id}/status`, 
      statusUpdate
    );
  }
  
  /**
   * Get transaction patterns
   * @param {string} [vehicle] - Vehicle ID filter
   * @param {string} [driver] - Driver ID filter
   * @param {string} [dateFrom] - Start date
   * @param {string} [dateTo] - End date
   * @returns {Promise<TransactionPatternsResponse>} Transaction patterns response
   */
  async getTransactionPatterns(
    vehicle,
    driver,
    dateFrom,
    dateTo
  ) {
    const params = {
      vehicle,
      driver,
      date_from: dateFrom,
      date_to: dateTo
    };
    
    return apiClient.get('/fraud/transactions/patterns', params);
  }
  
  /**
   * Mock method for verifying card presence
   * @param {string} transactionId - Transaction ID
   * @returns {Promise<Object>} Verification results
   */
  async verifyCardPresence(transactionId) {
    // This is a mock implementation since the original doesn't have this method
    return Promise.resolve({
      transactionId,
      verified: true,
      distance: 0.2,
      timestamp: new Date().toISOString()
    });
  }
  
  /**
   * Mock method for getting fraud transactions
   * @param {Object} filters - Filter parameters
   * @returns {Promise<Object>} Transactions response
   */
  async getFraudTransactions(filters) {
    // This is a mock implementation since the original doesn't have this method
    return Promise.resolve({
      transactions: [
        {
          id: "tx1",
          date: "2025-04-14",
          driver: "John Doe",
          vehicle: "ABC123",
          location: "Warsaw",
          amount: 250.50,
          currency: "PLN",
          status: "suspicious"
        },
        {
          id: "tx2",
          date: "2025-04-13",
          driver: "Jane Smith",
          vehicle: "XYZ789",
          location: "Krakow",
          amount: 180.75,
          currency: "PLN",
          status: "verified"
        }
      ]
    });
  }
}

// Export service instance
export const fraudDetectionService = new FraudDetectionService();
export default fraudDetectionService;
