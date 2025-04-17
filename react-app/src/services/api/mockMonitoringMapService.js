// Mock data service for Monitoring Maps
// This file provides mock data for maps in the Monitoring section

import { mockFraudTransactions } from './mockFraudDetectionService';

/**
 * @typedef {Object} VehicleLocation
 * @property {string} id - Vehicle ID
 * @property {string} name - Vehicle name
 * @property {string} status - Vehicle status
 * @property {Object} location - Vehicle location
 * @property {number} location.lat - Latitude
 * @property {number} location.lng - Longitude
 * @property {string} driver - Driver name
 * @property {string} lastUpdate - Last update timestamp
 * @property {number} speed - Current speed
 * @property {number} fuel - Current fuel level
 * @property {string} destination - Current destination
 */

// Mock vehicle locations with realistic coordinates in Poland
const mockVehicleLocations = [
  {
    id: "V001",
    name: "Pojazd WA12345",
    status: "active",
    location: { lat: 52.2297, lng: 21.0122 },
    driver: "Jan Kowalski",
    lastUpdate: "2025-04-17 15:45:22",
    speed: 65,
    fuel: 72,
    destination: "Warszawa - Centrala"
  },
  {
    id: "V002",
    name: "Pojazd WA54321",
    status: "active",
    location: { lat: 51.7592, lng: 19.4560 },
    driver: "Anna Nowak",
    lastUpdate: "2025-04-17 15:42:18",
    speed: 78,
    fuel: 45,
    destination: "Łódź - Magazyn"
  },
  {
    id: "V003",
    name: "Pojazd WA98765",
    status: "maintenance",
    location: { lat: 50.0647, lng: 19.9450 },
    driver: "Piotr Wiśniewski",
    lastUpdate: "2025-04-17 15:30:05",
    speed: 0,
    fuel: 25,
    destination: "Kraków - Serwis"
  },
  {
    id: "V004",
    name: "Pojazd WA24680",
    status: "active",
    location: { lat: 53.4289, lng: 14.5530 },
    driver: "Tomasz Lewandowski",
    lastUpdate: "2025-04-17 15:40:33",
    speed: 82,
    fuel: 68,
    destination: "Szczecin - Klient"
  },
  {
    id: "V005",
    name: "Pojazd WA13579",
    status: "inactive",
    location: { lat: 54.3520, lng: 18.6466 },
    driver: "Katarzyna Dąbrowska",
    lastUpdate: "2025-04-17 15:15:47",
    speed: 0,
    fuel: 12,
    destination: "Gdańsk - Magazyn"
  },
  {
    id: "V006",
    name: "Pojazd WA36925",
    status: "active",
    location: { lat: 51.1079, lng: 17.0385 },
    driver: "Michał Kowalczyk",
    lastUpdate: "2025-04-17 15:38:29",
    speed: 75,
    fuel: 58,
    destination: "Wrocław - Klient"
  },
  {
    id: "V007",
    name: "Pojazd WA75319",
    status: "active",
    location: { lat: 53.1235, lng: 18.0084 },
    driver: "Agnieszka Kamińska",
    lastUpdate: "2025-04-17 15:37:14",
    speed: 62,
    fuel: 80,
    destination: "Bydgoszcz - Klient"
  },
  {
    id: "V008",
    name: "Pojazd WA45678",
    status: "maintenance",
    location: { lat: 52.4064, lng: 16.9252 },
    driver: "Marek Zieliński",
    lastUpdate: "2025-04-17 15:20:36",
    speed: 0,
    fuel: 35,
    destination: "Poznań - Serwis"
  },
  {
    id: "V009",
    name: "Pojazd WA87654",
    status: "active",
    location: { lat: 51.2465, lng: 22.5684 },
    driver: "Joanna Wójcik",
    lastUpdate: "2025-04-17 15:44:09",
    speed: 70,
    fuel: 62,
    destination: "Lublin - Klient"
  },
  {
    id: "V010",
    name: "Pojazd WA23456",
    status: "active",
    location: { lat: 50.6751, lng: 17.9213 },
    driver: "Robert Szymański",
    lastUpdate: "2025-04-17 15:41:42",
    speed: 68,
    fuel: 55,
    destination: "Opole - Magazyn"
  }
];

// Convert vehicle locations to format compatible with SuspiciousTransactionsMap
const convertVehiclesToMapFormat = (vehicles) => {
  return vehicles.map(vehicle => ({
    id: vehicle.id,
    date: vehicle.lastUpdate,
    driver: vehicle.driver,
    vehicle: vehicle.name,
    location: vehicle.destination,
    amount: vehicle.fuel, // Using fuel level as amount
    currency: "L",
    status: vehicle.status === "active" ? "verified" : 
            vehicle.status === "maintenance" ? "flagged" : "suspicious",
    coordinates: vehicle.location,
    fuelType: "Diesel",
    quantity: vehicle.fuel,
    stationName: vehicle.destination,
    anomalies: vehicle.status === "inactive" ? ["low_fuel"] : []
  }));
};

/**
 * Mock monitoring map service class
 */
class MockMonitoringMapService {
  /**
   * Get vehicle locations for map display
   * @returns {Promise<Array>} Vehicle locations with coordinates
   */
  async getVehicleLocationsForMap() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(mockVehicleLocations);
      }, 500); // Symulacja opóźnienia sieciowego
    });
  }
  
  /**
   * Get vehicle locations in format compatible with SuspiciousTransactionsMap
   * @returns {Promise<Array>} Vehicle locations formatted for map
   */
  async getVehicleLocationsForMapComponent() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(convertVehiclesToMapFormat(mockVehicleLocations));
      }, 500); // Symulacja opóźnienia sieciowego
    });
  }
  
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
export const mockMonitoringMapService = new MockMonitoringMapService();
export default mockMonitoringMapService;
