import { delay } from '../../utils';

/**
 * Mock data service for Vehicles Overview
 * Provides test data for the Vehicles Overview component
 */
class MockVehiclesService {
  /**
   * Get vehicles list
   * @param {string} [status] - Status filter
   * @param {string} [search] - Search term
   * @param {string} [sortBy='id'] - Sort field
   * @param {string} [sortOrder='asc'] - Sort order
   * @param {number} [page=1] - Page number
   * @param {number} [limit=10] - Results per page
   * @returns {Promise<Object>} Vehicles data
   */
  async getVehicles(
    status,
    search,
    sortBy = 'id',
    sortOrder = 'asc',
    page = 1,
    limit = 10
  ) {
    // Simulate API delay
    await delay(800);
    
    // Generate mock vehicles data
    let vehicles = this.generateVehicles();
    
    // Apply filters
    if (status && status !== 'all') {
      vehicles = vehicles.filter(vehicle => vehicle.status === status);
    }
    
    if (search) {
      const searchLower = search.toLowerCase();
      vehicles = vehicles.filter(vehicle => 
        vehicle.id.toLowerCase().includes(searchLower) ||
        vehicle.make.toLowerCase().includes(searchLower) ||
        vehicle.model.toLowerCase().includes(searchLower) ||
        vehicle.driver.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply sorting
    vehicles.sort((a, b) => {
      let valueA = a[sortBy];
      let valueB = b[sortBy];
      
      // Handle numeric values
      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
      }
      
      // Handle string values
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return sortOrder === 'asc' 
          ? valueA.localeCompare(valueB) 
          : valueB.localeCompare(valueA);
      }
      
      return 0;
    });
    
    // Apply pagination
    const total = vehicles.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedVehicles = vehicles.slice(startIndex, endIndex);
    
    return {
      total,
      page,
      limit,
      data: paginatedVehicles
    };
  }
  
  /**
   * Get vehicle details
   * @param {string} id - Vehicle ID
   * @returns {Promise<Object>} Vehicle details
   */
  async getVehicleDetails(id) {
    // Simulate API delay
    await delay(1000);
    
    // Find vehicle by ID
    const vehicles = this.generateVehicles();
    const vehicle = vehicles.find(v => v.id === id) || vehicles[0];
    
    // Add additional details
    return {
      ...vehicle,
      vin: `VIN${Math.floor(Math.random() * 10000000000)}`,
      registrationNumber: `WA${Math.floor(Math.random() * 100000)}`,
      registrationDate: `${Math.floor(Math.random() * 28) + 1}.${Math.floor(Math.random() * 12) + 1}.${Math.floor(Math.random() * 5) + 2018}`,
      bodyType: ['Sedan', 'SUV', 'Van', 'Truck', 'Hatchback'][Math.floor(Math.random() * 5)],
      fuelType: ['Diesel', 'Petrol', 'Hybrid', 'Electric'][Math.floor(Math.random() * 4)],
      engineCapacity: Math.floor(Math.random() * 3000) + 1000,
      enginePower: Math.floor(Math.random() * 200) + 100,
      transmission: ['Manual', 'Automatic'][Math.floor(Math.random() * 2)],
      driveType: ['FWD', 'RWD', 'AWD', '4x4'][Math.floor(Math.random() * 4)],
      weight: Math.floor(Math.random() * 2000) + 1000,
      loadCapacity: Math.floor(Math.random() * 1000) + 500,
      components: [
        { name: 'Silnik', health: Math.floor(Math.random() * 100) + 1 },
        { name: 'Układ hamulcowy', health: Math.floor(Math.random() * 100) + 1 },
        { name: 'Układ kierowniczy', health: Math.floor(Math.random() * 100) + 1 },
        { name: 'Zawieszenie', health: Math.floor(Math.random() * 100) + 1 },
        { name: 'Układ elektryczny', health: Math.floor(Math.random() * 100) + 1 },
        { name: 'Układ paliwowy', health: Math.floor(Math.random() * 100) + 1 },
        { name: 'Układ chłodzenia', health: Math.floor(Math.random() * 100) + 1 },
        { name: 'Układ wydechowy', health: Math.floor(Math.random() * 100) + 1 }
      ],
      maintenanceHistory: this.generateMaintenanceHistory(),
      driverHistory: this.generateDriverHistory(),
      fuelConsumption: this.generateFuelConsumption(),
      mileageHistory: this.generateMileageHistory(),
      documents: this.generateDocuments(),
      averageFuelConsumption: (Math.random() * 5 + 5).toFixed(1),
      totalFuelConsumption: Math.floor(Math.random() * 5000) + 1000,
      totalFuelCost: Math.floor(Math.random() * 20000) + 5000,
      co2Emission: Math.floor(Math.random() * 10000) + 2000,
      averageMonthlyMileage: Math.floor(Math.random() * 3000) + 1000,
      projectedAnnualMileage: Math.floor(Math.random() * 30000) + 10000
    };
  }
  
  /**
   * Get fleet KPIs
   * @returns {Promise<Object>} Fleet KPI data
   */
  async getFleetKPIs() {
    // Simulate API delay
    await delay(600);
    
    return {
      totalVehicles: 120,
      activeVehicles: 98,
      inServiceVehicles: 12,
      inactiveVehicles: 10,
      averageAge: 3.5,
      averageMileage: 78500,
      utilizationRate: 87,
      maintenanceComplianceRate: 94,
      activeVehiclesTrend: 2.5,
      inServiceVehiclesTrend: -1.2,
      averageAgeTrend: 0.3,
      averageMileageTrend: 5.7,
      utilizationRateTrend: 1.8,
      maintenanceComplianceRateTrend: 2.1
    };
  }
  
  /**
   * Get vehicle locations for map
   * @returns {Promise<Array>} Vehicle location data
   */
  async getVehicleLocations() {
    // Simulate API delay
    await delay(700);
    
    // Generate random vehicle locations
    const vehicles = this.generateVehicles().slice(0, 30);
    
    return vehicles.map(vehicle => ({
      id: vehicle.id,
      make: vehicle.make,
      model: vehicle.model,
      status: vehicle.status,
      coordinates: {
        x: Math.floor(Math.random() * 80) + 10, // 10-90% of map width
        y: Math.floor(Math.random() * 80) + 10  // 10-90% of map height
      }
    }));
  }
  
  /**
   * Get fleet statistics
   * @returns {Promise<Object>} Fleet statistics data
   */
  async getFleetStatistics() {
    // Simulate API delay
    await delay(900);
    
    return {
      fleetByMake: [
        { name: 'Volkswagen', value: 32 },
        { name: 'Ford', value: 28 },
        { name: 'Toyota', value: 22 },
        { name: 'Renault', value: 18 },
        { name: 'Mercedes', value: 12 },
        { name: 'Inne', value: 8 }
      ],
      fleetByAge: [
        { name: '< 1 rok', value: 15 },
        { name: '1-2 lata', value: 35 },
        { name: '3-4 lata', value: 42 },
        { name: '5-6 lat', value: 20 },
        { name: '> 6 lat', value: 8 }
      ],
      fuelConsumptionTrend: this.generateMonthlyTrend(12, 7, 9),
      maintenanceCostTrend: this.generateMonthlyTrend(12, 2000, 5000)
    };
  }
  
  // Helper methods to generate mock data
  
  /**
   * Generate mock vehicles data
   * @returns {Array} Array of vehicle objects
   */
  generateVehicles() {
    const makes = ['Volkswagen', 'Ford', 'Toyota', 'Renault', 'Mercedes', 'BMW', 'Audi', 'Skoda', 'Opel', 'Fiat'];
    const models = {
      'Volkswagen': ['Passat', 'Golf', 'Transporter', 'Caddy', 'Crafter'],
      'Ford': ['Transit', 'Focus', 'Mondeo', 'Ranger', 'Custom'],
      'Toyota': ['Corolla', 'Avensis', 'Hilux', 'Proace', 'RAV4'],
      'Renault': ['Master', 'Trafic', 'Kangoo', 'Clio', 'Megane'],
      'Mercedes': ['Sprinter', 'Vito', 'Actros', 'Atego', 'Citan'],
      'BMW': ['Seria 3', 'Seria 5', 'X3', 'X5', 'X1'],
      'Audi': ['A4', 'A6', 'Q5', 'Q7', 'A3'],
      'Skoda': ['Octavia', 'Superb', 'Kodiaq', 'Fabia', 'Karoq'],
      'Opel': ['Astra', 'Insignia', 'Vivaro', 'Movano', 'Combo'],
      'Fiat': ['Ducato', 'Doblo', 'Tipo', 'Talento', 'Scudo']
    };
    const statuses = ['active', 'inService', 'inactive'];
    const drivers = ['Jan Kowalski', 'Anna Nowak', 'Piotr Wiśniewski', 'Katarzyna Dąbrowska', 'Tomasz Lewandowski', 'Małgorzata Wójcik', 'Michał Kamiński', 'Agnieszka Kowalczyk', 'Grzegorz Zieliński', 'Monika Szymańska'];
    
    const vehicles = [];
    
    for (let i = 1; i <= 120; i++) {
      const make = makes[Math.floor(Math.random() * makes.length)];
      const model = models[make][Math.floor(Math.random() * models[make].length)];
      const year = Math.floor(Math.random() * 7) + 2017;
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const healthPercentage = Math.floor(Math.random() * 100) + 1;
      
      vehicles.push({
        id: `VEH${i.toString().padStart(3, '0')}`,
        make,
        model,
        year,
        mileage: Math.floor(Math.random() * 150000) + 10000,
        status,
        healthPercentage,
        driver: drivers[Math.floor(Math.random() * drivers.length)],
        lastMaintenance: `${Math.floor(Math.random() * 28) + 1}.${Math.floor(Math.random() * 12) + 1}.${Math.floor(Math.random() * 2) + 2023}`,
        nextMaintenance: `${Math.floor(Math.random() * 28) + 1}.${Math.floor(Math.random() * 12) + 1}.${Math.floor(Math.random() * 2) + 2024}`
      });
    }
    
    return vehicles;
  }
  
  /**
   * Generate maintenance history
   * @returns {Array} Array of maintenance history objects
   */
  generateMaintenanceHistory() {
    const types = ['Przegląd okresowy', 'Naprawa awaryjna', 'Wymiana oleju', 'Wymiana opon', 'Inne'];
    const providers = ['Serwis Główny', 'Auto Serwis Plus', 'Mechanik 24h', 'Mobilny Serwis', 'Dealer'];
    
    const history = [];
    
    for (let i = 0; i < 8; i++) {
      const date = new Date();
      date.setMonth(date.getMonth() - i * 3);
      
      history.push({
        date: date.toLocaleDateString('pl-PL'),
        type: types[Math.floor(Math.random() * types.length)],
        description: `Wykonano ${types[Math.floor(Math.random() * types.length)].toLowerCase()} oraz dodatkowe czynności serwisowe.`,
        cost: Math.floor(Math.random() * 2000) + 200,
        mileage: Math.floor(Math.random() * 150000) + 10000,
        provider: providers[Math.floor(Math.random() * providers.length)]
      });
    }
    
    return history.sort((a, b) => new Date(b.date) - new Date(a.date));
  }
  
  /**
   * Generate driver history
   * @returns {Array} Array of driver history objects
   */
  generateDriverHistory() {
    const drivers = ['Jan Kowalski', 'Anna Nowak', 'Piotr Wiśniewski', 'Katarzyna Dąbrowska', 'Tomasz Lewandowski', 'Małgorzata Wójcik', 'Michał Kamiński', 'Agnieszka Kowalczyk', 'Grzegorz Zieliński', 'Monika Szymańska'];
    
    const history = [];
    
    for (let i = 0; i < 5; i++) {
      const startDate = new Date();
      startDate.setMonth(startDate.getMonth() - (i + 1) * 6);
      
      const endDate = new Date(startDate);
      endDate.setMonth(endDate.getMonth() + 6);
      
      // For the current driver, end date is null
      const currentEndDate = i === 0 ? null : endDate.toLocaleDateString('pl-PL');
      
      history.push({
        name: drivers[Math.floor(Math.random() * drivers.length)],
        startDate: startDate.toLocaleDateString('pl-PL'),
        endDate: currentEndDate,
        mileageDriven: Math.floor(Math.random() * 30000) + 5000,
        incidents: Math.floor(Math.random() * 3)
      });
    }
    
    return history;
  }
  
  /**
   * Generate fuel consumption data
   * @returns {Array} Array of fuel consumption objects
   */
  generateFuelConsumption() {
    const data = [];
    
    for (let i = 0; i < 12; i++) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      
      data.push({
        month: date.toLocaleDateString('pl-PL', { month: 'long', year: 'numeric' }),
        consumption: (Math.random() * 3 + 6).toFixed(1),
        distance: Math.floor(Math.random() * 3000) + 1000,
        cost: Math.floor(Math.random() * 1500) + 500
      });
    }
    
    return data.reverse();
  }
  
  /**
   * Generate mileage history
   * @returns {Array} Array of mileage history objects
   */
  generateMileageHistory() {
    const data = [];
    let mileage = Math.floor(Math.random() * 50000) + 10000;
    
    for (let i = 0; i < 24; i++) {
      const date = new Date();
      date.setMonth(date.getMonth() - 23 + i);
      
      const monthlyMileage = Math.floor(Math.random() * 3000) + 500;
      mileage += monthlyMileage;
      
      data.push({
        month: date.toLocaleDateString('pl-PL', { month: 'long', year: 'numeric' }),
        mileage,
        monthlyMileage
      });
    }
    
    return data;
  }
  
  /**
   * Generate documents
   * @returns {Array} Array of document objects
   */
  generateDocuments() {
    const types = ['registration', 'insurance', 'technical', 'leasing', 'other'];
    const titles = {
      'registration': 'Dowód rejestracyjny',
      'insurance': 'Polisa ubezpieczeniowa',
      'technical': 'Przegląd techniczny',
      'leasing': 'Umowa leasingowa',
      'other': 'Inny dokument'
    };
    
    const documents = [];
    
    for (let i = 0; i < 5; i++) {
      const type = types[i];
      const addedDate = new Date();
      addedDate.setMonth(addedDate.getMonth() - Math.floor(Math.random() * 12));
      
      const expiryDate = new Date();
      expiryDate.setFullYear(expiryDate.getFullYear() + 1);
      expiryDate.setMonth(expiryDate.getMonth() + Math.floor(Math.random() * 12) - 6);
      
      documents.push({
        id: `DOC${i + 1}`,
        type,
        title: titles[type],
        addedDate: addedDate.toLocaleDateString('pl-PL'),
        expiryDate: expiryDate.toLocaleDateString('pl-PL'),
        fileUrl: `/documents/${type}_example.pdf`
      });
    }
    
    return documents;
  }
  
  /**
   * Generate monthly trend data
   * @param {number} months - Number of months
   * @param {number} min - Minimum value
   * @param {number} max - Maximum value
   * @returns {Array} Array of trend data objects
   */
  generateMonthlyTrend(months, min, max) {
    const data = [];
    
    for (let i = 0; i < months; i++) {
      const date = new Date();
      date.setMonth(date.getMonth() - months + i + 1);
      
      data.push({
        month: date.toLocaleDateString('pl-PL', { month: 'long', year: 'numeric' }),
        value: Math.floor(Math.random() * (max - min)) + min
      });
    }
    
    return data;
  }
}

// Export service instance
export const mockVehiclesService = new MockVehiclesService();
export default mockVehiclesService;
