// Mock data service for Dashboard Maps
// This file provides mock data for maps in the Dashboard section

import { mockFraudTransactions } from './mockFraudDetectionService';

/**
 * Mock dashboard map service class
 */
class MockDashboardMapService {
  /**
   * Get fraud transactions for map display
   * @returns {Promise<Array>} Fraud transactions with coordinates
   */
  async getFraudTransactionsForMap() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(mockFraudTransactions);
      }, 500); // Symulacja opóźnienia sieciowego
    });
  }
}

// Export service instance
export const mockDashboardMapService = new MockDashboardMapService();
export default mockDashboardMapService;
