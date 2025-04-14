import { delay } from '../../utils';

/**
 * Mock service for Fleet Management data
 * This service provides mock data for the Fleet Management module
 */
const mockFleetManagementService = {
  /**
   * Get fleet KPIs
   * @returns {Promise<Object>} KPI data
   */
  getFleetKPIs: async () => {
    await delay(800);
    
    return {
      activeVehicles: 87,
      activeVehiclesTrend: 3.5,
      averageMileage: 45678,
      averageMileageTrend: 2.1,
      averageFuelConsumption: 8.7,
      averageFuelConsumptionTrend: -1.2,
      vehiclesNeedingService: 12,
      vehiclesNeedingServiceTrend: -5.3
    };
  },
  
  /**
   * Get vehicles list
   * @param {Object} filters - Filter parameters
   * @returns {Promise<Object>} Vehicles data
   */
  getVehicles: async (filters) => {
    await delay(1000);
    
    // Generate mock vehicles data
    const allVehicles = Array(120).fill().map((_, index) => {
      const id = index + 1;
      const statusOptions = ['active', 'inactive', 'maintenance'];
      const status = statusOptions[Math.floor(Math.random() * statusOptions.length)];
      const typeOptions = ['truck', 'van', 'car', 'special'];
      const type = typeOptions[Math.floor(Math.random() * typeOptions.length)];
      const makeOptions = ['Volvo', 'Mercedes', 'MAN', 'Scania', 'DAF', 'Iveco', 'Renault'];
      const make = makeOptions[Math.floor(Math.random() * makeOptions.length)];
      const modelOptions = {
        'Volvo': ['FH16', 'FM', 'FMX', 'FE', 'FL'],
        'Mercedes': ['Actros', 'Arocs', 'Atego', 'Econic'],
        'MAN': ['TGX', 'TGS', 'TGM', 'TGL'],
        'Scania': ['R Series', 'S Series', 'G Series', 'P Series'],
        'DAF': ['XF', 'CF', 'LF'],
        'Iveco': ['S-Way', 'X-Way', 'Eurocargo', 'Daily'],
        'Renault': ['T Series', 'D Series', 'C Series', 'K Series']
      };
      const model = modelOptions[make][Math.floor(Math.random() * modelOptions[make].length)];
      const year = 2015 + Math.floor(Math.random() * 9);
      const registrationNumber = `WA${Math.floor(10000 + Math.random() * 90000)}`;
      const mileage = Math.floor(10000 + Math.random() * 290000);
      const lastService = `${Math.floor(1 + Math.random() * 28)}.${Math.floor(1 + Math.random() * 12)}.${2023 + Math.floor(Math.random() * 2)}`;
      
      return {
        id,
        make,
        model,
        year,
        type,
        registrationNumber,
        status,
        mileage,
        lastService
      };
    });
    
    // Apply filters
    let filteredVehicles = [...allVehicles];
    
    if (filters.status !== 'all') {
      filteredVehicles = filteredVehicles.filter(vehicle => vehicle.status === filters.status);
    }
    
    if (filters.type !== 'all') {
      filteredVehicles = filteredVehicles.filter(vehicle => vehicle.type === filters.type);
    }
    
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredVehicles = filteredVehicles.filter(vehicle => 
        vehicle.make.toLowerCase().includes(searchLower) ||
        vehicle.model.toLowerCase().includes(searchLower) ||
        vehicle.registrationNumber.toLowerCase().includes(searchLower) ||
        vehicle.id.toString().includes(searchLower)
      );
    }
    
    // Apply pagination
    const startIndex = (filters.page - 1) * filters.limit;
    const paginatedVehicles = filteredVehicles.slice(startIndex, startIndex + filters.limit);
    
    return {
      vehicles: paginatedVehicles,
      total: filteredVehicles.length,
      page: filters.page,
      limit: filters.limit,
      totalPages: Math.ceil(filteredVehicles.length / filters.limit)
    };
  },
  
  /**
   * Get vehicle details
   * @param {number} vehicleId - Vehicle ID
   * @returns {Promise<Object>} Vehicle details
   */
  getVehicleDetails: async (vehicleId) => {
    await delay(800);
    
    // Generate mock vehicle details
    return {
      id: vehicleId,
      make: 'Volvo',
      model: 'FH16',
      year: 2020,
      type: 'truck',
      registrationNumber: 'WA12345',
      vin: 'YV4A22RK1L1234567',
      status: 'active',
      mileage: 78500,
      lastService: '15.03.2024',
      nextServiceDue: '15.09.2024',
      fuelType: 'diesel',
      tankCapacity: 600,
      averageFuelConsumption: 32.5,
      engineHours: 3450,
      tires: {
        front: {
          brand: 'Michelin',
          model: 'X Line Energy',
          installDate: '10.01.2023',
          treadDepth: 7.5,
          pressure: 8.5
        },
        rear: {
          brand: 'Michelin',
          model: 'X Multi Energy',
          installDate: '10.01.2023',
          treadDepth: 8.0,
          pressure: 9.0
        }
      },
      assignedDriver: {
        id: 12,
        name: 'Jan Kowalski',
        licenseNumber: 'ABC123456',
        phone: '+48 123 456 789'
      },
      insurance: {
        provider: 'PZU',
        policyNumber: 'POL-12345-2024',
        validUntil: '31.12.2024',
        coverage: 'Pełne AC/OC'
      },
      technicalInspection: {
        lastDate: '15.02.2024',
        validUntil: '15.02.2025',
        result: 'Pozytywny',
        notes: 'Brak uwag'
      },
      dimensions: {
        length: 16.5,
        width: 2.55,
        height: 4.0,
        weight: 18000,
        maxPayload: 24000
      },
      purchaseInfo: {
        date: '10.01.2020',
        price: 450000,
        dealer: 'Volvo Truck Center Warszawa',
        warrantyEnd: '10.01.2025'
      },
      maintenanceHistory: [
        {
          date: '15.03.2024',
          type: 'Przegląd okresowy',
          mileage: 75000,
          cost: 3500,
          description: 'Wymiana oleju, filtrów, kontrola układu hamulcowego'
        },
        {
          date: '15.09.2023',
          type: 'Przegląd okresowy',
          mileage: 50000,
          cost: 3200,
          description: 'Wymiana oleju, filtrów, kontrola układu hamulcowego'
        },
        {
          date: '20.05.2023',
          type: 'Naprawa',
          mileage: 42000,
          cost: 1800,
          description: 'Wymiana alternatora'
        }
      ]
    };
  },
  
  /**
   * Get fuel consumption data
   * @param {Object} filters - Filter parameters
   * @returns {Promise<Object>} Fuel consumption data
   */
  getFuelConsumption: async (filters) => {
    await delay(1000);
    
    // Generate mock fuel consumption data
    const allVehicles = Array(100).fill().map((_, index) => {
      const id = index + 1;
      const makeOptions = ['Volvo', 'Mercedes', 'MAN', 'Scania', 'DAF', 'Iveco', 'Renault'];
      const make = makeOptions[Math.floor(Math.random() * makeOptions.length)];
      const modelOptions = {
        'Volvo': ['FH16', 'FM', 'FMX', 'FE', 'FL'],
        'Mercedes': ['Actros', 'Arocs', 'Atego', 'Econic'],
        'MAN': ['TGX', 'TGS', 'TGM', 'TGL'],
        'Scania': ['R Series', 'S Series', 'G Series', 'P Series'],
        'DAF': ['XF', 'CF', 'LF'],
        'Iveco': ['S-Way', 'X-Way', 'Eurocargo', 'Daily'],
        'Renault': ['T Series', 'D Series', 'C Series', 'K Series']
      };
      const model = modelOptions[make][Math.floor(Math.random() * modelOptions[make].length)];
      const registrationNumber = `WA${Math.floor(10000 + Math.random() * 90000)}`;
      const averageConsumption = 25 + Math.random() * 15;
      const totalDistance = Math.floor(10000 + Math.random() * 90000);
      const totalFuelUsed = Math.floor(averageConsumption * totalDistance / 100);
      const efficiency = Math.floor(70 + Math.random() * 30);
      
      return {
        id,
        make,
        model,
        registrationNumber,
        averageConsumption,
        totalFuelUsed,
        totalDistance,
        efficiency
      };
    });
    
    // Apply filters
    let filteredVehicles = [...allVehicles];
    
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredVehicles = filteredVehicles.filter(vehicle => 
        vehicle.make.toLowerCase().includes(searchLower) ||
        vehicle.model.toLowerCase().includes(searchLower) ||
        vehicle.registrationNumber.toLowerCase().includes(searchLower) ||
        vehicle.id.toString().includes(searchLower)
      );
    }
    
    // Apply pagination
    const startIndex = (filters.page - 1) * filters.limit;
    const paginatedVehicles = filteredVehicles.slice(startIndex, startIndex + filters.limit);
    
    return {
      vehicles: paginatedVehicles,
      total: filteredVehicles.length,
      page: filters.page,
      limit: filters.limit,
      totalPages: Math.ceil(filteredVehicles.length / filters.limit)
    };
  },
  
  /**
   * Get vehicle performance data
   * @param {Object} filters - Filter parameters
   * @returns {Promise<Object>} Vehicle performance data
   */
  getVehiclePerformance: async (filters) => {
    await delay(1000);
    
    // Generate mock vehicle performance data
    const allVehicles = Array(100).fill().map((_, index) => {
      const id = index + 1;
      const makeOptions = ['Volvo', 'Mercedes', 'MAN', 'Scania', 'DAF', 'Iveco', 'Renault'];
      const make = makeOptions[Math.floor(Math.random() * makeOptions.length)];
      const modelOptions = {
        'Volvo': ['FH16', 'FM', 'FMX', 'FE', 'FL'],
        'Mercedes': ['Actros', 'Arocs', 'Atego', 'Econic'],
        'MAN': ['TGX', 'TGS', 'TGM', 'TGL'],
        'Scania': ['R Series', 'S Series', 'G Series', 'P Series'],
        'DAF': ['XF', 'CF', 'LF'],
        'Iveco': ['S-Way', 'X-Way', 'Eurocargo', 'Daily'],
        'Renault': ['T Series', 'D Series', 'C Series', 'K Series']
      };
      const model = modelOptions[make][Math.floor(Math.random() * modelOptions[make].length)];
      const registrationNumber = `WA${Math.floor(10000 + Math.random() * 90000)}`;
      const utilization = Math.floor(60 + Math.random() * 40);
      const downtime = Math.floor(Math.random() * 100);
      const maintenanceCost = Math.floor(5000 + Math.random() * 15000);
      const performanceScore = Math.floor(50 + Math.random() * 50);
      
      return {
        id,
        make,
        model,
        registrationNumber,
        utilization,
        downtime,
        maintenanceCost,
        performanceScore
      };
    });
    
    // Apply filters
    let filteredVehicles = [...allVehicles];
    
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredVehicles = filteredVehicles.filter(vehicle => 
        vehicle.make.toLowerCase().includes(searchLower) ||
        vehicle.model.toLowerCase().includes(searchLower) ||
        vehicle.registrationNumber.toLowerCase().includes(searchLower) ||
        vehicle.id.toString().includes(searchLower)
      );
    }
    
    // Apply pagination
    const startIndex = (filters.page - 1) * filters.limit;
    const paginatedVehicles = filteredVehicles.slice(startIndex, startIndex + filters.limit);
    
    return {
      vehicles: paginatedVehicles,
      total: filteredVehicles.length,
      page: filters.page,
      limit: filters.limit,
      totalPages: Math.ceil(filteredVehicles.length / filters.limit)
    };
  },
  
  /**
   * Get service history data
   * @param {Object} filters - Filter parameters
   * @returns {Promise<Object>} Service history data
   */
  getServiceHistory: async (filters) => {
    await delay(1000);
    
    // Generate mock service history data
    const allServices = Array(150).fill().map((_, index) => {
      const id = index + 1;
      const vehicleId = Math.floor(1 + Math.random() * 100);
      const makeOptions = ['Volvo', 'Mercedes', 'MAN', 'Scania', 'DAF', 'Iveco', 'Renault'];
      const vehicleMake = makeOptions[Math.floor(Math.random() * makeOptions.length)];
      const modelOptions = {
        'Volvo': ['FH16', 'FM', 'FMX', 'FE', 'FL'],
        'Mercedes': ['Actros', 'Arocs', 'Atego', 'Econic'],
        'MAN': ['TGX', 'TGS', 'TGM', 'TGL'],
        'Scania': ['R Series', 'S Series', 'G Series', 'P Series'],
        'DAF': ['XF', 'CF', 'LF'],
        'Iveco': ['S-Way', 'X-Way', 'Eurocargo', 'Daily'],
        'Renault': ['T Series', 'D Series', 'C Series', 'K Series']
      };
      const vehicleModel = modelOptions[vehicleMake][Math.floor(Math.random() * modelOptions[vehicleMake].length)];
      const registrationNumber = `WA${Math.floor(10000 + Math.random() * 90000)}`;
      const serviceTypeOptions = ['Przegląd okresowy', 'Naprawa', 'Wymiana oleju', 'Wymiana opon', 'Kontrola techniczna'];
      const serviceType = serviceTypeOptions[Math.floor(Math.random() * serviceTypeOptions.length)];
      const day = Math.floor(1 + Math.random() * 28);
      const month = Math.floor(1 + Math.random() * 12);
      const year = 2023 + Math.floor(Math.random() * 2);
      const serviceDate = `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${year}`;
      const mileage = Math.floor(10000 + Math.random() * 290000);
      const cost = Math.floor(500 + Math.random() * 9500);
      const statusOptions = ['completed', 'scheduled', 'in_progress'];
      const status = statusOptions[Math.floor(Math.random() * statusOptions.length)];
      
      return {
        id,
        vehicleId,
        vehicleMake,
        vehicleModel,
        registrationNumber,
        serviceType,
        serviceDate,
        mileage,
        cost,
        status
      };
    });
    
    // Apply filters
    let filteredServices = [...allServices];
    
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredServices = filteredServices.filter(service => 
        service.vehicleMake.toLowerCase().includes(searchLower) ||
        service.vehicleModel.toLowerCase().includes(searchLower) ||
        service.registrationNumber.toLowerCase().includes(searchLower) ||
        service.serviceType.toLowerCase().includes(searchLower) ||
        service.id.toString().includes(searchLower) ||
        service.vehicleId.toString().includes(searchLower)
      );
    }
    
    // Apply pagination
    const startIndex = (filters.page - 1) * filters.limit;
    const paginatedServices = filteredServices.slice(startIndex, startIndex + filters.limit);
    
    return {
      services: paginatedServices,
      total: filteredServices.length,
      page: filters.page,
      limit: filters.limit,
      totalPages: Math.ceil(filteredServices.length / filters.limit)
    };
  },
  
  /**
   * Get documents data
   * @param {Object} filters - Filter parameters
   * @returns {Promise<Object>} Documents data
   */
  getDocuments: async (filters) => {
    await delay(1000);
    
    // Generate mock documents data
    const allDocuments = Array(120).fill().map((_, index) => {
      const id = index + 1;
      const vehicleId = Math.floor(1 + Math.random() * 100);
      const makeOptions = ['Volvo', 'Mercedes', 'MAN', 'Scania', 'DAF', 'Iveco', 'Renault'];
      const vehicleMake = makeOptions[Math.floor(Math.random() * makeOptions.length)];
      const modelOptions = {
        'Volvo': ['FH16', 'FM', 'FMX', 'FE', 'FL'],
        'Mercedes': ['Actros', 'Arocs', 'Atego', 'Econic'],
        'MAN': ['TGX', 'TGS', 'TGM', 'TGL'],
        'Scania': ['R Series', 'S Series', 'G Series', 'P Series'],
        'DAF': ['XF', 'CF', 'LF'],
        'Iveco': ['S-Way', 'X-Way', 'Eurocargo', 'Daily'],
        'Renault': ['T Series', 'D Series', 'C Series', 'K Series']
      };
      const vehicleModel = modelOptions[vehicleMake][Math.floor(Math.random() * modelOptions[vehicleMake].length)];
      const registrationNumber = `WA${Math.floor(10000 + Math.random() * 90000)}`;
      const documentTypeOptions = ['Dowód rejestracyjny', 'Ubezpieczenie OC', 'Ubezpieczenie AC', 'Przegląd techniczny', 'Karta pojazdu', 'Licencja transportowa'];
      const documentType = documentTypeOptions[Math.floor(Math.random() * documentTypeOptions.length)];
      const documentNumber = `DOC-${Math.floor(10000 + Math.random() * 90000)}`;
      
      // Issue date
      const issueDay = Math.floor(1 + Math.random() * 28);
      const issueMonth = Math.floor(1 + Math.random() * 12);
      const issueYear = 2022 + Math.floor(Math.random() * 2);
      const issueDate = `${issueDay < 10 ? '0' + issueDay : issueDay}.${issueMonth < 10 ? '0' + issueMonth : issueMonth}.${issueYear}`;
      
      // Expiry date
      const expiryDay = Math.floor(1 + Math.random() * 28);
      const expiryMonth = Math.floor(1 + Math.random() * 12);
      const expiryYear = 2024 + Math.floor(Math.random() * 2);
      const expiryDate = `${expiryDay < 10 ? '0' + expiryDay : expiryDay}.${expiryMonth < 10 ? '0' + expiryMonth : expiryMonth}.${expiryYear}`;
      
      // Status based on expiry date
      const today = new Date();
      const expiry = new Date(expiryYear, expiryMonth - 1, expiryDay);
      const diffTime = expiry - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      let status;
      if (diffDays < 0) {
        status = 'expired';
      } else if (diffDays < 30) {
        status = 'expiring';
      } else {
        status = 'valid';
      }
      
      return {
        id,
        vehicleId,
        vehicleMake,
        vehicleModel,
        registrationNumber,
        documentType,
        documentNumber,
        issueDate,
        expiryDate,
        status
      };
    });
    
    // Apply filters
    let filteredDocuments = [...allDocuments];
    
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredDocuments = filteredDocuments.filter(document => 
        document.vehicleMake.toLowerCase().includes(searchLower) ||
        document.vehicleModel.toLowerCase().includes(searchLower) ||
        document.registrationNumber.toLowerCase().includes(searchLower) ||
        document.documentType.toLowerCase().includes(searchLower) ||
        document.documentNumber.toLowerCase().includes(searchLower) ||
        document.id.toString().includes(searchLower) ||
        document.vehicleId.toString().includes(searchLower)
      );
    }
    
    // Apply pagination
    const startIndex = (filters.page - 1) * filters.limit;
    const paginatedDocuments = filteredDocuments.slice(startIndex, startIndex + filters.limit);
    
    return {
      documents: paginatedDocuments,
      total: filteredDocuments.length,
      page: filters.page,
      limit: filters.limit,
      totalPages: Math.ceil(filteredDocuments.length / filters.limit)
    };
  },
  
  /**
   * Get non-vehicle assets data
   * @param {Object} filters - Filter parameters
   * @returns {Promise<Object>} Assets data
   */
  getNonVehicleAssets: async (filters) => {
    await delay(1000);
    
    // Generate mock assets data
    const allAssets = Array(80).fill().map((_, index) => {
      const id = index + 1;
      const assetTypeOptions = ['Przyczepa', 'Naczepa', 'Wózek widłowy', 'Podnośnik', 'Terminal mobilny', 'System GPS', 'Kontener'];
      const assetType = assetTypeOptions[Math.floor(Math.random() * assetTypeOptions.length)];
      
      const nameOptions = {
        'Przyczepa': ['Przyczepa Krone', 'Przyczepa Schmitz', 'Przyczepa Wielton', 'Przyczepa Kogel'],
        'Naczepa': ['Naczepa Krone', 'Naczepa Schmitz', 'Naczepa Wielton', 'Naczepa Kogel'],
        'Wózek widłowy': ['Wózek Toyota', 'Wózek Linde', 'Wózek Still', 'Wózek Jungheinrich'],
        'Podnośnik': ['Podnośnik Genie', 'Podnośnik JLG', 'Podnośnik Haulotte', 'Podnośnik Skyjack'],
        'Terminal mobilny': ['Terminal Zebra', 'Terminal Honeywell', 'Terminal Datalogic', 'Terminal Panasonic'],
        'System GPS': ['GPS Trimble', 'GPS Garmin', 'GPS TomTom', 'GPS Webfleet'],
        'Kontener': ['Kontener 20ft', 'Kontener 40ft', 'Kontener chłodniczy', 'Kontener specjalny']
      };
      const name = nameOptions[assetType][Math.floor(Math.random() * nameOptions[assetType].length)];
      
      const serialNumber = `SN-${Math.floor(10000 + Math.random() * 90000)}`;
      
      // Purchase date
      const purchaseDay = Math.floor(1 + Math.random() * 28);
      const purchaseMonth = Math.floor(1 + Math.random() * 12);
      const purchaseYear = 2018 + Math.floor(Math.random() * 6);
      const purchaseDate = `${purchaseDay < 10 ? '0' + purchaseDay : purchaseDay}.${purchaseMonth < 10 ? '0' + purchaseMonth : purchaseMonth}.${purchaseYear}`;
      
      const purchasePrice = Math.floor(5000 + Math.random() * 95000);
      const currentValue = Math.floor(purchasePrice * (0.5 + Math.random() * 0.5));
      const statusOptions = ['active', 'inactive', 'maintenance'];
      const status = statusOptions[Math.floor(Math.random() * statusOptions.length)];
      
      return {
        id,
        assetType,
        name,
        serialNumber,
        purchaseDate,
        purchasePrice,
        currentValue,
        status
      };
    });
    
    // Apply filters
    let filteredAssets = [...allAssets];
    
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredAssets = filteredAssets.filter(asset => 
        asset.assetType.toLowerCase().includes(searchLower) ||
        asset.name.toLowerCase().includes(searchLower) ||
        asset.serialNumber.toLowerCase().includes(searchLower) ||
        asset.id.toString().includes(searchLower)
      );
    }
    
    // Apply pagination
    const startIndex = (filters.page - 1) * filters.limit;
    const paginatedAssets = filteredAssets.slice(startIndex, startIndex + filters.limit);
    
    return {
      assets: paginatedAssets,
      total: filteredAssets.length,
      page: filters.page,
      limit: filters.limit,
      totalPages: Math.ceil(filteredAssets.length / filters.limit)
    };
  },
  
  /**
   * Get route optimization data
   * @param {Object} filters - Filter parameters
   * @returns {Promise<Object>} Route optimization data
   */
  getRouteOptimization: async (filters) => {
    await delay(1000);
    
    // Generate mock route optimization data
    const allRoutes = Array(90).fill().map((_, index) => {
      const id = index + 1;
      const vehicleId = Math.floor(1 + Math.random() * 100);
      const makeOptions = ['Volvo', 'Mercedes', 'MAN', 'Scania', 'DAF', 'Iveco', 'Renault'];
      const vehicleMake = makeOptions[Math.floor(Math.random() * makeOptions.length)];
      const modelOptions = {
        'Volvo': ['FH16', 'FM', 'FMX', 'FE', 'FL'],
        'Mercedes': ['Actros', 'Arocs', 'Atego', 'Econic'],
        'MAN': ['TGX', 'TGS', 'TGM', 'TGL'],
        'Scania': ['R Series', 'S Series', 'G Series', 'P Series'],
        'DAF': ['XF', 'CF', 'LF'],
        'Iveco': ['S-Way', 'X-Way', 'Eurocargo', 'Daily'],
        'Renault': ['T Series', 'D Series', 'C Series', 'K Series']
      };
      const vehicleModel = modelOptions[vehicleMake][Math.floor(Math.random() * modelOptions[vehicleMake].length)];
      const registrationNumber = `WA${Math.floor(10000 + Math.random() * 90000)}`;
      
      const startLocationOptions = ['Warszawa', 'Kraków', 'Poznań', 'Wrocław', 'Gdańsk', 'Łódź', 'Katowice'];
      const startLocation = startLocationOptions[Math.floor(Math.random() * startLocationOptions.length)];
      
      const endLocationOptions = ['Berlin', 'Praga', 'Wiedeń', 'Bratysława', 'Budapeszt', 'Wilno', 'Kijów'];
      const endLocation = endLocationOptions[Math.floor(Math.random() * endLocationOptions.length)];
      
      const distance = Math.floor(200 + Math.random() * 1800);
      const estimatedFuel = distance * (25 + Math.random() * 15) / 100;
      const optimizationScore = Math.floor(50 + Math.random() * 50);
      
      return {
        id,
        vehicleId,
        vehicleMake,
        vehicleModel,
        registrationNumber,
        startLocation,
        endLocation,
        distance,
        estimatedFuel,
        optimizationScore
      };
    });
    
    // Apply filters
    let filteredRoutes = [...allRoutes];
    
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredRoutes = filteredRoutes.filter(route => 
        route.vehicleMake.toLowerCase().includes(searchLower) ||
        route.vehicleModel.toLowerCase().includes(searchLower) ||
        route.registrationNumber.toLowerCase().includes(searchLower) ||
        route.startLocation.toLowerCase().includes(searchLower) ||
        route.endLocation.toLowerCase().includes(searchLower) ||
        route.id.toString().includes(searchLower) ||
        route.vehicleId.toString().includes(searchLower)
      );
    }
    
    // Apply pagination
    const startIndex = (filters.page - 1) * filters.limit;
    const paginatedRoutes = filteredRoutes.slice(startIndex, startIndex + filters.limit);
    
    return {
      routes: paginatedRoutes,
      total: filteredRoutes.length,
      page: filters.page,
      limit: filters.limit,
      totalPages: Math.ceil(filteredRoutes.length / filters.limit)
    };
  }
};

export default mockFleetManagementService;
