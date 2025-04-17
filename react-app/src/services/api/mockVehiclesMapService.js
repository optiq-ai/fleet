// Mock data service for Vehicles Map
// This file provides mock data for the fleet map in the Vehicles Overview section

/**
 * @typedef {Object} VehicleLocation
 * @property {string} id - Vehicle ID
 * @property {string} make - Vehicle make
 * @property {string} model - Vehicle model
 * @property {string} status - Vehicle status
 * @property {Object} coordinates - Vehicle coordinates
 * @property {number} coordinates.lat - Latitude
 * @property {number} coordinates.lng - Longitude
 * @property {string} driver - Driver name
 * @property {string} lastUpdate - Last update timestamp
 */

// Mock vehicle locations with realistic coordinates in Poland
const mockVehicleLocations = [
  {
    id: "VEH001",
    make: "Volkswagen",
    model: "Passat",
    status: "active",
    coordinates: { lat: 52.2297, lng: 21.0122 },
    driver: "Jan Kowalski",
    lastUpdate: "2025-04-17 15:45:22",
    amount: 85, // Fuel level as percentage
    currency: "%",
    vehicle: "Volkswagen Passat",
    location: "Warszawa - Centrala",
    date: "17.04.2025"
  },
  {
    id: "VEH002",
    make: "Ford",
    model: "Transit",
    status: "active",
    coordinates: { lat: 51.7592, lng: 19.4560 },
    driver: "Anna Nowak",
    lastUpdate: "2025-04-17 15:42:18",
    amount: 45,
    currency: "%",
    vehicle: "Ford Transit",
    location: "Łódź - Magazyn",
    date: "17.04.2025"
  },
  {
    id: "VEH003",
    make: "Toyota",
    model: "Corolla",
    status: "inService",
    coordinates: { lat: 50.0647, lng: 19.9450 },
    driver: "Piotr Wiśniewski",
    lastUpdate: "2025-04-17 15:30:05",
    amount: 25,
    currency: "%",
    vehicle: "Toyota Corolla",
    location: "Kraków - Serwis",
    date: "17.04.2025"
  },
  {
    id: "VEH004",
    make: "Renault",
    model: "Master",
    status: "active",
    coordinates: { lat: 53.4289, lng: 14.5530 },
    driver: "Tomasz Lewandowski",
    lastUpdate: "2025-04-17 15:40:33",
    amount: 68,
    currency: "%",
    vehicle: "Renault Master",
    location: "Szczecin - Klient",
    date: "17.04.2025"
  },
  {
    id: "VEH005",
    make: "Mercedes",
    model: "Sprinter",
    status: "inactive",
    coordinates: { lat: 54.3520, lng: 18.6466 },
    driver: "Katarzyna Dąbrowska",
    lastUpdate: "2025-04-17 15:15:47",
    amount: 12,
    currency: "%",
    vehicle: "Mercedes Sprinter",
    location: "Gdańsk - Magazyn",
    date: "17.04.2025"
  },
  {
    id: "VEH006",
    make: "BMW",
    model: "Seria 3",
    status: "active",
    coordinates: { lat: 51.1079, lng: 17.0385 },
    driver: "Michał Kowalczyk",
    lastUpdate: "2025-04-17 15:38:29",
    amount: 58,
    currency: "%",
    vehicle: "BMW Seria 3",
    location: "Wrocław - Klient",
    date: "17.04.2025"
  },
  {
    id: "VEH007",
    make: "Audi",
    model: "A4",
    status: "active",
    coordinates: { lat: 53.1235, lng: 18.0084 },
    driver: "Agnieszka Kamińska",
    lastUpdate: "2025-04-17 15:37:14",
    amount: 80,
    currency: "%",
    vehicle: "Audi A4",
    location: "Bydgoszcz - Klient",
    date: "17.04.2025"
  },
  {
    id: "VEH008",
    make: "Skoda",
    model: "Octavia",
    status: "inService",
    coordinates: { lat: 52.4064, lng: 16.9252 },
    driver: "Marek Zieliński",
    lastUpdate: "2025-04-17 15:20:36",
    amount: 35,
    currency: "%",
    vehicle: "Skoda Octavia",
    location: "Poznań - Serwis",
    date: "17.04.2025"
  },
  {
    id: "VEH009",
    make: "Opel",
    model: "Astra",
    status: "active",
    coordinates: { lat: 51.2465, lng: 22.5684 },
    driver: "Joanna Wójcik",
    lastUpdate: "2025-04-17 15:44:09",
    amount: 62,
    currency: "%",
    vehicle: "Opel Astra",
    location: "Lublin - Klient",
    date: "17.04.2025"
  },
  {
    id: "VEH010",
    make: "Fiat",
    model: "Ducato",
    status: "active",
    coordinates: { lat: 50.6751, lng: 17.9213 },
    driver: "Robert Szymański",
    lastUpdate: "2025-04-17 15:41:42",
    amount: 55,
    currency: "%",
    vehicle: "Fiat Ducato",
    location: "Opole - Magazyn",
    date: "17.04.2025"
  },
  {
    id: "VEH011",
    make: "Volkswagen",
    model: "Golf",
    status: "active",
    coordinates: { lat: 50.8118, lng: 19.1203 },
    driver: "Magdalena Kaczmarek",
    lastUpdate: "2025-04-17 15:39:55",
    amount: 72,
    currency: "%",
    vehicle: "Volkswagen Golf",
    location: "Częstochowa - Klient",
    date: "17.04.2025"
  },
  {
    id: "VEH012",
    make: "Ford",
    model: "Focus",
    status: "active",
    coordinates: { lat: 53.7784, lng: 20.4801 },
    driver: "Krzysztof Grabowski",
    lastUpdate: "2025-04-17 15:36:28",
    amount: 48,
    currency: "%",
    vehicle: "Ford Focus",
    location: "Olsztyn - Klient",
    date: "17.04.2025"
  },
  {
    id: "VEH013",
    make: "Toyota",
    model: "Avensis",
    status: "inactive",
    coordinates: { lat: 51.4027, lng: 21.1470 },
    driver: "Monika Pawlak",
    lastUpdate: "2025-04-17 15:10:12",
    amount: 15,
    currency: "%",
    vehicle: "Toyota Avensis",
    location: "Radom - Magazyn",
    date: "17.04.2025"
  },
  {
    id: "VEH014",
    make: "Renault",
    model: "Trafic",
    status: "active",
    coordinates: { lat: 49.6311, lng: 20.7144 },
    driver: "Dariusz Michalski",
    lastUpdate: "2025-04-17 15:43:07",
    amount: 65,
    currency: "%",
    vehicle: "Renault Trafic",
    location: "Nowy Sącz - Klient",
    date: "17.04.2025"
  },
  {
    id: "VEH015",
    make: "Mercedes",
    model: "Vito",
    status: "inService",
    coordinates: { lat: 51.7833, lng: 19.4667 },
    driver: "Natalia Witkowska",
    lastUpdate: "2025-04-17 15:25:19",
    amount: 30,
    currency: "%",
    vehicle: "Mercedes Vito",
    location: "Łódź - Serwis",
    date: "17.04.2025"
  }
];

// Convert vehicle status to map status
const convertVehicleStatusToMapStatus = (status) => {
  switch (status) {
    case 'active':
      return 'verified';
    case 'inService':
      return 'flagged';
    case 'inactive':
      return 'suspicious';
    default:
      return 'verified';
  }
};

// Convert vehicles to format compatible with SuspiciousTransactionsMap
const convertVehiclesToMapFormat = (vehicles) => {
  return vehicles.map(vehicle => ({
    id: vehicle.id,
    date: vehicle.lastUpdate,
    driver: vehicle.driver,
    vehicle: `${vehicle.make} ${vehicle.model}`,
    location: vehicle.location,
    amount: vehicle.amount,
    currency: vehicle.currency,
    status: convertVehicleStatusToMapStatus(vehicle.status),
    coordinates: vehicle.coordinates,
    anomalies: vehicle.status === 'inactive' ? ['low_fuel'] : []
  }));
};

/**
 * Mock vehicles map service class
 */
class MockVehiclesMapService {
  /**
   * Get vehicle locations for map display
   * @returns {Promise<Array>} Vehicle locations with coordinates
   */
  async getVehicleLocationsForMap() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(mockVehicleLocations);
      }, 500); // Simulate network delay
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
      }, 500); // Simulate network delay
    });
  }
}

// Export service instance
export const mockVehiclesMapService = new MockVehiclesMapService();
export default mockVehiclesMapService;
