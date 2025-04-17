// Mock data service for Fraud Detection
// This file provides enhanced mock data for the Fraud Detection section

/**
 * @typedef {Object} FraudAlert
 * @property {string} id - Alert ID
 * @property {string} title - Alert title
 * @property {string} details - Alert details
 * @property {string} priority - Alert priority (high, medium, low)
 * @property {string} date - Alert date
 * @property {string} location - Alert location
 * @property {string} vehicle - Vehicle ID
 * @property {string} driver - Driver name
 * @property {number} amount - Transaction amount
 * @property {string} status - Alert status
 */

/**
 * @typedef {Object} FraudTransaction
 * @property {string} id - Transaction ID
 * @property {string} date - Transaction date
 * @property {string} driver - Driver name
 * @property {string} vehicle - Vehicle ID
 * @property {string} location - Transaction location
 * @property {number} amount - Transaction amount
 * @property {string} currency - Currency code
 * @property {string} status - Transaction status (suspicious, verified, flagged)
 * @property {Object} coordinates - Location coordinates
 * @property {number} coordinates.lat - Latitude
 * @property {number} coordinates.lng - Longitude
 * @property {string} fuelType - Type of fuel
 * @property {number} quantity - Fuel quantity
 * @property {string} stationName - Gas station name
 * @property {Array} anomalies - List of anomalies
 */

/**
 * @typedef {Object} PatternAnalysis
 * @property {Array} timePatterns - Time-based patterns
 * @property {Array} locationPatterns - Location-based patterns
 * @property {Array} amountPatterns - Amount-based patterns
 * @property {Array} driverPatterns - Driver-based patterns
 * @property {Object} riskScores - Risk scores by category
 */

/**
 * @typedef {Object} FuelQualityTest
 * @property {string} id - Test ID
 * @property {string} date - Test date
 * @property {string} location - Test location
 * @property {string} vehicle - Vehicle ID
 * @property {string} fuelType - Type of fuel
 * @property {string} result - Test result
 * @property {Object} parameters - Test parameters
 * @property {Array} history - Test history
 */

// Mock fraud alerts
const mockFraudAlerts = [
  {
    id: "alert1",
    title: "Podejrzana transakcja paliwa",
    details: "Ilość zatankowanego paliwa przekracza pojemność zbiornika pojazdu o 35%",
    priority: "high",
    date: "2025-04-17 08:23:15",
    location: "Warszawa, Stacja Orlen S.A.",
    vehicle: "WA12345",
    driver: "Jan Kowalski",
    amount: 850.75,
    status: "new"
  },
  {
    id: "alert2",
    title: "Nietypowa lokalizacja tankowania",
    details: "Tankowanie poza standardową trasą, 45 km od wyznaczonego korytarza",
    priority: "medium",
    date: "2025-04-16 19:45:22",
    location: "Radom, BP Station",
    vehicle: "WA54321",
    driver: "Anna Nowak",
    amount: 420.30,
    status: "investigating"
  },
  {
    id: "alert3",
    title: "Wielokrotne tankowanie w krótkim czasie",
    details: "3 tankowania w ciągu 4 godzin w różnych lokalizacjach",
    priority: "high",
    date: "2025-04-16 14:12:08",
    location: "Różne lokalizacje",
    vehicle: "WA98765",
    driver: "Piotr Wiśniewski",
    amount: 1250.45,
    status: "new"
  },
  {
    id: "alert4",
    title: "Tankowanie poza godzinami pracy",
    details: "Transakcja zarejestrowana o 02:15, poza dozwolonymi godzinami (6:00-22:00)",
    priority: "medium",
    date: "2025-04-15 02:15:33",
    location: "Łódź, Shell Station",
    vehicle: "WA24680",
    driver: "Tomasz Lewandowski",
    amount: 380.90,
    status: "resolved"
  },
  {
    id: "alert5",
    title: "Niezgodność typu paliwa",
    details: "Zatankowano benzynę do pojazdu z silnikiem Diesel",
    priority: "high",
    date: "2025-04-14 11:05:47",
    location: "Kraków, Stacja Circle K",
    vehicle: "WA13579",
    driver: "Katarzyna Dąbrowska",
    amount: 520.15,
    status: "investigating"
  },
  {
    id: "alert6",
    title: "Podejrzenie manipulacji odczytem przebiegu",
    details: "Odczyt przebiegu niższy o 5000 km od poprzedniego tankowania",
    priority: "high",
    date: "2025-04-13 16:38:29",
    location: "Poznań, Amic Energy",
    vehicle: "WA36925",
    driver: "Michał Kowalczyk",
    amount: 450.60,
    status: "new"
  },
  {
    id: "alert7",
    title: "Nietypowy wzrost zużycia paliwa",
    details: "Zużycie paliwa wzrosło o 35% w porównaniu do średniej z ostatnich 3 miesięcy",
    priority: "medium",
    date: "2025-04-12 09:27:14",
    location: "Gdańsk, Stacja Lotos",
    vehicle: "WA75319",
    driver: "Agnieszka Kamińska",
    amount: 680.25,
    status: "investigating"
  }
];

// Mock fraud transactions with coordinates for map
const mockFraudTransactions = [
  {
    id: "tx1",
    date: "2025-04-17 08:23:15",
    driver: "Jan Kowalski",
    vehicle: "WA12345",
    location: "Warszawa, Stacja Orlen S.A.",
    amount: 850.75,
    currency: "PLN",
    status: "suspicious",
    coordinates: { lat: 52.2297, lng: 21.0122 },
    fuelType: "Diesel",
    quantity: 135.0,
    stationName: "Orlen S.A.",
    anomalies: ["excessive_quantity", "price_deviation"]
  },
  {
    id: "tx2",
    date: "2025-04-16 19:45:22",
    driver: "Anna Nowak",
    vehicle: "WA54321",
    location: "Radom, BP Station",
    amount: 420.30,
    currency: "PLN",
    status: "suspicious",
    coordinates: { lat: 51.4027, lng: 21.1470 },
    fuelType: "Diesel",
    quantity: 65.5,
    stationName: "BP",
    anomalies: ["location_deviation"]
  },
  {
    id: "tx3",
    date: "2025-04-16 14:12:08",
    driver: "Piotr Wiśniewski",
    vehicle: "WA98765",
    location: "Łódź, Shell Station",
    amount: 380.45,
    currency: "PLN",
    status: "suspicious",
    coordinates: { lat: 51.7592, lng: 19.4560 },
    fuelType: "Diesel",
    quantity: 58.2,
    stationName: "Shell",
    anomalies: ["multiple_transactions"]
  },
  {
    id: "tx4",
    date: "2025-04-16 12:35:18",
    driver: "Piotr Wiśniewski",
    vehicle: "WA98765",
    location: "Piotrków Trybunalski, Orlen",
    amount: 420.50,
    currency: "PLN",
    status: "suspicious",
    coordinates: { lat: 51.4048, lng: 19.7030 },
    fuelType: "Diesel",
    quantity: 65.8,
    stationName: "Orlen",
    anomalies: ["multiple_transactions"]
  },
  {
    id: "tx5",
    date: "2025-04-16 10:08:42",
    driver: "Piotr Wiśniewski",
    vehicle: "WA98765",
    location: "Częstochowa, Circle K",
    amount: 450.50,
    currency: "PLN",
    status: "suspicious",
    coordinates: { lat: 50.8118, lng: 19.1203 },
    fuelType: "Diesel",
    quantity: 70.2,
    stationName: "Circle K",
    anomalies: ["multiple_transactions"]
  },
  {
    id: "tx6",
    date: "2025-04-15 02:15:33",
    driver: "Tomasz Lewandowski",
    vehicle: "WA24680",
    location: "Łódź, Shell Station",
    amount: 380.90,
    currency: "PLN",
    status: "suspicious",
    coordinates: { lat: 51.7592, lng: 19.4560 },
    fuelType: "Diesel",
    quantity: 59.5,
    stationName: "Shell",
    anomalies: ["off_hours"]
  },
  {
    id: "tx7",
    date: "2025-04-14 11:05:47",
    driver: "Katarzyna Dąbrowska",
    vehicle: "WA13579",
    location: "Kraków, Stacja Circle K",
    amount: 520.15,
    currency: "PLN",
    status: "suspicious",
    coordinates: { lat: 50.0647, lng: 19.9450 },
    fuelType: "Gasoline 95",
    quantity: 75.8,
    stationName: "Circle K",
    anomalies: ["fuel_type_mismatch"]
  },
  {
    id: "tx8",
    date: "2025-04-13 16:38:29",
    driver: "Michał Kowalczyk",
    vehicle: "WA36925",
    location: "Poznań, Amic Energy",
    amount: 450.60,
    currency: "PLN",
    status: "suspicious",
    coordinates: { lat: 52.4064, lng: 16.9252 },
    fuelType: "Diesel",
    quantity: 70.4,
    stationName: "Amic Energy",
    anomalies: ["odometer_manipulation"]
  },
  {
    id: "tx9",
    date: "2025-04-12 09:27:14",
    driver: "Agnieszka Kamińska",
    vehicle: "WA75319",
    location: "Gdańsk, Stacja Lotos",
    amount: 680.25,
    currency: "PLN",
    status: "suspicious",
    coordinates: { lat: 54.3520, lng: 18.6466 },
    fuelType: "Diesel",
    quantity: 106.3,
    stationName: "Lotos",
    anomalies: ["consumption_increase"]
  },
  {
    id: "tx10",
    date: "2025-04-11 14:52:36",
    driver: "Marek Zieliński",
    vehicle: "WA45678",
    location: "Wrocław, BP Station",
    amount: 390.80,
    currency: "PLN",
    status: "verified",
    coordinates: { lat: 51.1079, lng: 17.0385 },
    fuelType: "Diesel",
    quantity: 61.0,
    stationName: "BP",
    anomalies: []
  },
  {
    id: "tx11",
    date: "2025-04-10 18:15:09",
    driver: "Joanna Wójcik",
    vehicle: "WA87654",
    location: "Szczecin, Shell Station",
    amount: 410.25,
    currency: "PLN",
    status: "verified",
    coordinates: { lat: 53.4289, lng: 14.5530 },
    fuelType: "Diesel",
    quantity: 64.1,
    stationName: "Shell",
    anomalies: []
  },
  {
    id: "tx12",
    date: "2025-04-09 11:30:42",
    driver: "Robert Szymański",
    vehicle: "WA23456",
    location: "Bydgoszcz, Orlen Station",
    amount: 350.40,
    currency: "PLN",
    status: "verified",
    coordinates: { lat: 53.1235, lng: 18.0084 },
    fuelType: "Diesel",
    quantity: 54.8,
    stationName: "Orlen",
    anomalies: []
  }
];

// Mock pattern analysis data
const mockPatternAnalysis = {
  timePatterns: [
    { 
      title: "Tankowania nocne",
      description: "Tankowania między 22:00 a 6:00",
      count: 3,
      percentage: 8.5,
      riskLevel: "high",
      transactions: ["tx6"],
      chart: {
        labels: ["6-10", "10-14", "14-18", "18-22", "22-6"],
        data: [12, 15, 18, 10, 3],
        colors: ["#4caf50", "#4caf50", "#4caf50", "#4caf50", "#f44336"]
      }
    },
    {
      title: "Wielokrotne tankowania",
      description: "Więcej niż 2 tankowania w ciągu 24h",
      count: 1,
      percentage: 2.8,
      riskLevel: "high",
      transactions: ["tx3", "tx4", "tx5"],
      chart: {
        labels: ["1 dziennie", "2 dziennie", "3+ dziennie"],
        data: [32, 3, 1],
        colors: ["#4caf50", "#ff9800", "#f44336"]
      }
    }
  ],
  locationPatterns: [
    {
      title: "Tankowania poza trasą",
      description: "Tankowania poza wyznaczonym korytarzem trasy",
      count: 2,
      percentage: 5.7,
      riskLevel: "medium",
      transactions: ["tx2"],
      chart: {
        labels: ["Na trasie", "Poza trasą"],
        data: [33, 2],
        colors: ["#4caf50", "#f44336"]
      }
    },
    {
      title: "Nowe stacje",
      description: "Tankowania na wcześniej nieużywanych stacjach",
      count: 4,
      percentage: 11.4,
      riskLevel: "low",
      transactions: ["tx7", "tx8"],
      chart: {
        labels: ["Znane stacje", "Nowe stacje"],
        data: [31, 4],
        colors: ["#4caf50", "#ff9800"]
      }
    }
  ],
  amountPatterns: [
    {
      title: "Nadmierne ilości",
      description: "Ilość paliwa przekracza pojemność zbiornika",
      count: 2,
      percentage: 5.7,
      riskLevel: "high",
      transactions: ["tx1", "tx9"],
      chart: {
        labels: ["Normalne", "Nadmierne"],
        data: [33, 2],
        colors: ["#4caf50", "#f44336"]
      }
    },
    {
      title: "Odchylenia cenowe",
      description: "Cena za litr odbiega od średniej o >15%",
      count: 1,
      percentage: 2.8,
      riskLevel: "medium",
      transactions: ["tx1"],
      chart: {
        labels: ["Normalna cena", "Zawyżona cena"],
        data: [34, 1],
        colors: ["#4caf50", "#f44336"]
      }
    }
  ],
  driverPatterns: [
    {
      title: "Kierowcy wysokiego ryzyka",
      description: "Kierowcy z historią podejrzanych transakcji",
      count: 3,
      percentage: 30.0,
      riskLevel: "high",
      drivers: ["Piotr Wiśniewski", "Jan Kowalski", "Michał Kowalczyk"],
      chart: {
        labels: ["Niskie ryzyko", "Średnie ryzyko", "Wysokie ryzyko"],
        data: [5, 2, 3],
        colors: ["#4caf50", "#ff9800", "#f44336"]
      }
    }
  ],
  riskScores: {
    overall: 68,
    byCategory: [
      { category: "Czas", score: 75, color: "#f44336" },
      { category: "Lokalizacja", score: 62, color: "#ff9800" },
      { category: "Ilość", score: 70, color: "#f44336" },
      { category: "Kierowca", score: 65, color: "#ff9800" }
    ]
  }
};

// Mock fuel quality tests
const mockFuelQualityTests = [
  {
    id: "test1",
    date: "2025-04-17",
    location: "Warszawa, Stacja Orlen S.A.",
    vehicle: "WA12345",
    fuelType: "Diesel",
    result: "failed",
    parameters: {
      cetaneNumber: { value: 48.5, min: 51.0, max: null, status: "failed" },
      sulfurContent: { value: 12, min: null, max: 10, status: "failed" },
      density: { value: 0.845, min: 0.820, max: 0.845, status: "ok" },
      waterContent: { value: 220, min: null, max: 200, status: "failed" },
      particulates: { value: 18, min: null, max: 24, status: "ok" }
    },
    history: [
      { date: "2025-03-15", result: "passed", location: "Warszawa, BP" },
      { date: "2025-02-10", result: "passed", location: "Warszawa, Shell" },
      { date: "2025-01-05", result: "passed", location: "Warszawa, Orlen" }
    ]
  },
  {
    id: "test2",
    date: "2025-04-16",
    location: "Radom, BP Station",
    vehicle: "WA54321",
    fuelType: "Diesel",
    result: "passed",
    parameters: {
      cetaneNumber: { value: 52.5, min: 51.0, max: null, status: "ok" },
      sulfurContent: { value: 8, min: null, max: 10, status: "ok" },
      density: { value: 0.835, min: 0.820, max: 0.845, status: "ok" },
      waterContent: { value: 180, min: null, max: 200, status: "ok" },
      particulates: { value: 20, min: null, max: 24, status: "ok" }
    },
    history: [
      { date: "2025-03-20", result: "passed", location: "Warszawa, Orlen" },
      { date: "2025-02-15", result: "passed", location: "Radom, BP" },
      { date: "2025-01-10", result: "failed", location: "Kielce, Shell" }
    ]
  },
  {
    id: "test3",
    date: "2025-04-14",
    location: "Kraków, Stacja Circle K",
    vehicle: "WA13579",
    fuelType: "Gasoline 95",
    result: "failed",
    parameters: {
      octaneNumber: { value: 93.5, min: 95.0, max: null, status: "failed" },
      sulfurContent: { value: 12, min: null, max: 10, status: "failed" },
      density: { value: 0.755, min: 0.720, max: 0.775, status: "ok" },
      oxygenates: { value: 3.8, min: null, max: 2.7, status: "failed" },
      aromatics: { value: 32, min: null, max: 35, status: "ok" }
    },
    history: [
      { date: "2025-03-10", result: "passed", location: "Kraków, BP" },
      { date: "2025-02-05", result: "passed", location: "Kraków, Orlen" },
      { date: "2025-01-01", result: "passed", location: "Kraków, Shell" }
    ]
  },
  {
    id: "test4",
    date: "2025-04-12",
    location: "Gdańsk, Stacja Lotos",
    vehicle: "WA75319",
    fuelType: "Diesel",
    result: "suspicious",
    parameters: {
      cetaneNumber: { value: 51.2, min: 51.0, max: null, status: "ok" },
      sulfurContent: { value: 9, min: null, max: 10, status: "ok" },
      density: { value: 0.842, min: 0.820, max: 0.845, status: "ok" },
      waterContent: { value: 195, min: null, max: 200, status: "ok" },
      particulates: { value: 23, min: null, max: 24, status: "ok" },
      additives: { value: "detected", status: "suspicious" }
    },
    history: [
      { date: "2025-03-05", result: "passed", location: "Gdańsk, Shell" },
      { date: "2025-02-01", result: "passed", location: "Gdańsk, Orlen" },
      { date: "2025-01-15", result: "passed", location: "Gdańsk, BP" }
    ]
  },
  {
    id: "test5",
    date: "2025-04-10",
    location: "Szczecin, Shell Station",
    vehicle: "WA87654",
    fuelType: "Diesel",
    result: "passed",
    parameters: {
      cetaneNumber: { value: 53.0, min: 51.0, max: null, status: "ok" },
      sulfurContent: { value: 7, min: null, max: 10, status: "ok" },
      density: { value: 0.830, min: 0.820, max: 0.845, status: "ok" },
      waterContent: { value: 150, min: null, max: 200, status: "ok" },
      particulates: { value: 18, min: null, max: 24, status: "ok" }
    },
    history: [
      { date: "2025-03-25", result: "passed", location: "Szczecin, BP" },
      { date: "2025-02-20", result: "passed", location: "Szczecin, Shell" },
      { date: "2025-01-20", result: "passed", location: "Szczecin, Orlen" }
    ]
  }
];

/**
 * Mock fraud detection service class
 */
class MockFraudDetectionService {
  /**
   * Get fraud alerts
   * @returns {Promise<Object>} Fraud alerts response
   */
  async getFraudAlerts() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          total: mockFraudAlerts.length,
          page: 1,
          limit: 10,
          alerts: mockFraudAlerts
        });
      }, 500); // Simulate network delay
    });
  }
  
  /**
   * Get fraud transactions
   * @param {Object} filters - Filter parameters
   * @returns {Promise<Object>} Transactions response
   */
  async getFraudTransactions(filters) {
    return new Promise(resolve => {
      setTimeout(() => {
        // In a real implementation, we would filter based on the provided filters
        resolve({
          total: mockFraudTransactions.length,
          page: 1,
          limit: 20,
          transactions: mockFraudTransactions
        });
      }, 500); // Simulate network delay
    });
  }
  
  /**
   * Get transaction patterns analysis
   * @returns {Promise<Object>} Pattern analysis response
   */
  async getTransactionPatterns() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(mockPatternAnalysis);
      }, 500); // Simulate network delay
    });
  }
  
  /**
   * Get fuel quality tests
   * @returns {Promise<Object>} Fuel quality tests response
   */
  async getFuelQualityTests() {
    console.log('Mock fuel quality tests:', mockFuelQualityTests);
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          total: mockFuelQualityTests.length,
          page: 1,
          limit: 10,
          tests: mockFuelQualityTests
        });
      }, 500); // Simulate network delay
    });
  }
  
  /**
   * Verify card presence
   * @param {string} transactionId - Transaction ID
   * @returns {Promise<Object>} Verification results
   */
  async verifyCardPresence(transactionId) {
    return new Promise(resolve => {
      setTimeout(() => {
        const transaction = mockFraudTransactions.find(t => t.id === transactionId);
        
        if (transaction) {
          // Simulate verification result based on transaction status
          const verified = transaction.status === 'verified';
          
          resolve({
            transactionId,
            verified,
            distance: verified ? 0.2 : 45.8,
            timestamp: new Date().toISOString(),
            cardLocation: {
              lat: verified ? transaction.coordinates.lat : transaction.coordinates.lat + 0.4,
              lng: verified ? transaction.coordinates.lng : transaction.coordinates.lng - 0.3
            },
            vehicleLocation: {
              lat: transaction.coordinates.lat,
              lng: transaction.coordinates.lng
            }
          });
        } else {
          resolve({
            transactionId,
            verified: false,
            error: "Transaction not found"
          });
        }
      }, 800); // Simulate network delay
    });
  }
}

// Export service instance
export const mockFraudDetectionService = new MockFraudDetectionService();
export default mockFraudDetectionService;
