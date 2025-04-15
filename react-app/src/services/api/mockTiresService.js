import { delay } from '../../utils';

/**
 * Mock data service for tires management
 * Provides mock data for all tire-related functionality
 */

// Mock tires inventory data
const mockTires = {
  total: 24,
  data: [
    {
      id: "T001",
      brand: "Michelin",
      model: "X Line Energy",
      size: "315/70 R22.5",
      type: "summer",
      treadDepth: 7.2,
      manufactureDate: "2023-06-15",
      mileage: 45000,
      status: "mounted",
      vehicleId: "V001",
      vehicleName: "Mercedes Actros",
      position: "front-left",
      notes: "Premium tire with excellent fuel efficiency"
    },
    {
      id: "T002",
      brand: "Michelin",
      model: "X Line Energy",
      size: "315/70 R22.5",
      type: "summer",
      treadDepth: 7.0,
      manufactureDate: "2023-06-15",
      mileage: 45000,
      status: "mounted",
      vehicleId: "V001",
      vehicleName: "Mercedes Actros",
      position: "front-right",
      notes: "Premium tire with excellent fuel efficiency"
    },
    {
      id: "T003",
      brand: "Continental",
      model: "Conti EcoPlus HD3",
      size: "315/70 R22.5",
      type: "summer",
      treadDepth: 6.5,
      manufactureDate: "2023-05-20",
      mileage: 52000,
      status: "mounted",
      vehicleId: "V001",
      vehicleName: "Mercedes Actros",
      position: "rear-left-outer",
      notes: "Good all-around performance"
    },
    {
      id: "T004",
      brand: "Continental",
      model: "Conti EcoPlus HD3",
      size: "315/70 R22.5",
      type: "summer",
      treadDepth: 6.3,
      manufactureDate: "2023-05-20",
      mileage: 52000,
      status: "mounted",
      vehicleId: "V001",
      vehicleName: "Mercedes Actros",
      position: "rear-left-inner",
      notes: "Good all-around performance"
    },
    {
      id: "T005",
      brand: "Continental",
      model: "Conti EcoPlus HD3",
      size: "315/70 R22.5",
      type: "summer",
      treadDepth: 6.4,
      manufactureDate: "2023-05-20",
      mileage: 52000,
      status: "mounted",
      vehicleId: "V001",
      vehicleName: "Mercedes Actros",
      position: "rear-right-inner",
      notes: "Good all-around performance"
    },
    {
      id: "T006",
      brand: "Continental",
      model: "Conti EcoPlus HD3",
      size: "315/70 R22.5",
      type: "summer",
      treadDepth: 6.6,
      manufactureDate: "2023-05-20",
      mileage: 52000,
      status: "mounted",
      vehicleId: "V001",
      vehicleName: "Mercedes Actros",
      position: "rear-right-outer",
      notes: "Good all-around performance"
    },
    {
      id: "T007",
      brand: "Bridgestone",
      model: "Ecopia H-Drive 001",
      size: "315/70 R22.5",
      type: "summer",
      treadDepth: 8.1,
      manufactureDate: "2023-08-10",
      mileage: 32000,
      status: "mounted",
      vehicleId: "V002",
      vehicleName: "Volvo FH",
      position: "front-left",
      notes: "Excellent wet grip and durability"
    },
    {
      id: "T008",
      brand: "Bridgestone",
      model: "Ecopia H-Drive 001",
      size: "315/70 R22.5",
      type: "summer",
      treadDepth: 8.0,
      manufactureDate: "2023-08-10",
      mileage: 32000,
      status: "mounted",
      vehicleId: "V002",
      vehicleName: "Volvo FH",
      position: "front-right",
      notes: "Excellent wet grip and durability"
    },
    {
      id: "T009",
      brand: "Goodyear",
      model: "FUELMAX S",
      size: "315/70 R22.5",
      type: "all_season",
      treadDepth: 5.2,
      manufactureDate: "2022-11-05",
      mileage: 78000,
      status: "mounted",
      vehicleId: "V003",
      vehicleName: "Scania R",
      position: "front-left",
      notes: "Scheduled for replacement in next 10,000 km"
    },
    {
      id: "T010",
      brand: "Goodyear",
      model: "FUELMAX S",
      size: "315/70 R22.5",
      type: "all_season",
      treadDepth: 5.0,
      manufactureDate: "2022-11-05",
      mileage: 78000,
      status: "mounted",
      vehicleId: "V003",
      vehicleName: "Scania R",
      position: "front-right",
      notes: "Scheduled for replacement in next 10,000 km"
    },
    {
      id: "T011",
      brand: "Pirelli",
      model: "TR01 Triathlon",
      size: "315/80 R22.5",
      type: "winter",
      treadDepth: 9.5,
      manufactureDate: "2023-09-20",
      mileage: 12000,
      status: "mounted",
      vehicleId: "V004",
      vehicleName: "MAN TGX",
      position: "front-left",
      notes: "New winter tires with excellent snow traction"
    },
    {
      id: "T012",
      brand: "Pirelli",
      model: "TR01 Triathlon",
      size: "315/80 R22.5",
      type: "winter",
      treadDepth: 9.5,
      manufactureDate: "2023-09-20",
      mileage: 12000,
      status: "mounted",
      vehicleId: "V004",
      vehicleName: "MAN TGX",
      position: "front-right",
      notes: "New winter tires with excellent snow traction"
    },
    {
      id: "T013",
      brand: "Michelin",
      model: "X Multi Winter Z",
      size: "315/70 R22.5",
      type: "winter",
      treadDepth: 8.8,
      manufactureDate: "2023-09-05",
      mileage: 0,
      status: "warehouse",
      vehicleId: null,
      vehicleName: null,
      position: null,
      notes: "Winter tires for V001, stored in Warehouse A, Rack 3"
    },
    {
      id: "T014",
      brand: "Michelin",
      model: "X Multi Winter Z",
      size: "315/70 R22.5",
      type: "winter",
      treadDepth: 8.8,
      manufactureDate: "2023-09-05",
      mileage: 0,
      status: "warehouse",
      vehicleId: null,
      vehicleName: null,
      position: null,
      notes: "Winter tires for V001, stored in Warehouse A, Rack 3"
    },
    {
      id: "T015",
      brand: "Michelin",
      model: "X Multi Winter D",
      size: "315/70 R22.5",
      type: "winter",
      treadDepth: 8.8,
      manufactureDate: "2023-09-05",
      mileage: 0,
      status: "warehouse",
      vehicleId: null,
      vehicleName: null,
      position: null,
      notes: "Winter tires for V001, stored in Warehouse A, Rack 3"
    },
    {
      id: "T016",
      brand: "Michelin",
      model: "X Multi Winter D",
      size: "315/70 R22.5",
      type: "winter",
      treadDepth: 8.8,
      manufactureDate: "2023-09-05",
      mileage: 0,
      status: "warehouse",
      vehicleId: null,
      vehicleName: null,
      position: null,
      notes: "Winter tires for V001, stored in Warehouse A, Rack 3"
    },
    {
      id: "T017",
      brand: "Continental",
      model: "HDW2 Scandinavia",
      size: "315/70 R22.5",
      type: "winter",
      treadDepth: 8.5,
      manufactureDate: "2023-08-15",
      mileage: 0,
      status: "warehouse",
      vehicleId: null,
      vehicleName: null,
      position: null,
      notes: "Winter tires for V002, stored in Warehouse B, Rack 7"
    },
    {
      id: "T018",
      brand: "Continental",
      model: "HDW2 Scandinavia",
      size: "315/70 R22.5",
      type: "winter",
      treadDepth: 8.5,
      manufactureDate: "2023-08-15",
      mileage: 0,
      status: "warehouse",
      vehicleId: null,
      vehicleName: null,
      position: null,
      notes: "Winter tires for V002, stored in Warehouse B, Rack 7"
    },
    {
      id: "T019",
      brand: "Goodyear",
      model: "Ultra Grip Max S",
      size: "315/70 R22.5",
      type: "winter",
      treadDepth: 8.7,
      manufactureDate: "2023-09-10",
      mileage: 0,
      status: "warehouse",
      vehicleId: null,
      vehicleName: null,
      position: null,
      notes: "Winter tires for V003, stored in Warehouse A, Rack 5"
    },
    {
      id: "T020",
      brand: "Goodyear",
      model: "Ultra Grip Max S",
      size: "315/70 R22.5",
      type: "winter",
      treadDepth: 8.7,
      manufactureDate: "2023-09-10",
      mileage: 0,
      status: "warehouse",
      vehicleId: null,
      vehicleName: null,
      position: null,
      notes: "Winter tires for V003, stored in Warehouse A, Rack 5"
    },
    {
      id: "T021",
      brand: "Bridgestone",
      model: "W990",
      size: "315/70 R22.5",
      type: "summer",
      treadDepth: 2.1,
      manufactureDate: "2021-03-15",
      mileage: 120000,
      status: "worn",
      vehicleId: null,
      vehicleName: null,
      position: null,
      notes: "Scheduled for recycling"
    },
    {
      id: "T022",
      brand: "Bridgestone",
      model: "W990",
      size: "315/70 R22.5",
      type: "summer",
      treadDepth: 2.3,
      manufactureDate: "2021-03-15",
      mileage: 120000,
      status: "worn",
      vehicleId: null,
      vehicleName: null,
      position: null,
      notes: "Scheduled for recycling"
    },
    {
      id: "T023",
      brand: "Continental",
      model: "Conti EcoPlus HD3",
      size: "315/70 R22.5",
      type: "summer",
      treadDepth: 1.8,
      manufactureDate: "2021-05-10",
      mileage: 135000,
      status: "worn",
      vehicleId: null,
      vehicleName: null,
      position: null,
      notes: "Scheduled for recycling"
    },
    {
      id: "T024",
      brand: "Continental",
      model: "Conti EcoPlus HD3",
      size: "315/70 R22.5",
      type: "summer",
      treadDepth: 1.9,
      manufactureDate: "2021-05-10",
      mileage: 135000,
      status: "worn",
      vehicleId: null,
      vehicleName: null,
      position: null,
      notes: "Scheduled for recycling"
    }
  ]
};

// Mock tire conditions data
const mockTireConditions = {
  total: 12,
  data: [
    {
      tireId: "T001",
      vehicleId: "V001",
      vehicleName: "Mercedes Actros",
      position: "front-left",
      treadDepth: 7.2,
      pressure: 8.5,
      wearPattern: "even",
      condition: "good",
      recommendedAction: "No action needed",
      lastCheckDate: "2024-04-01",
      nextCheckDate: "2024-05-01"
    },
    {
      tireId: "T002",
      vehicleId: "V001",
      vehicleName: "Mercedes Actros",
      position: "front-right",
      treadDepth: 7.0,
      pressure: 8.5,
      wearPattern: "even",
      condition: "good",
      recommendedAction: "No action needed",
      lastCheckDate: "2024-04-01",
      nextCheckDate: "2024-05-01"
    },
    {
      tireId: "T003",
      vehicleId: "V001",
      vehicleName: "Mercedes Actros",
      position: "rear-left-outer",
      treadDepth: 6.5,
      pressure: 8.3,
      wearPattern: "even",
      condition: "good",
      recommendedAction: "No action needed",
      lastCheckDate: "2024-04-01",
      nextCheckDate: "2024-05-01"
    },
    {
      tireId: "T004",
      vehicleId: "V001",
      vehicleName: "Mercedes Actros",
      position: "rear-left-inner",
      treadDepth: 6.3,
      pressure: 8.3,
      wearPattern: "even",
      condition: "good",
      recommendedAction: "No action needed",
      lastCheckDate: "2024-04-01",
      nextCheckDate: "2024-05-01"
    },
    {
      tireId: "T005",
      vehicleId: "V001",
      vehicleName: "Mercedes Actros",
      position: "rear-right-inner",
      treadDepth: 6.4,
      pressure: 8.4,
      wearPattern: "even",
      condition: "good",
      recommendedAction: "No action needed",
      lastCheckDate: "2024-04-01",
      nextCheckDate: "2024-05-01"
    },
    {
      tireId: "T006",
      vehicleId: "V001",
      vehicleName: "Mercedes Actros",
      position: "rear-right-outer",
      treadDepth: 6.6,
      pressure: 8.4,
      wearPattern: "even",
      condition: "good",
      recommendedAction: "No action needed",
      lastCheckDate: "2024-04-01",
      nextCheckDate: "2024-05-01"
    },
    {
      tireId: "T007",
      vehicleId: "V002",
      vehicleName: "Volvo FH",
      position: "front-left",
      treadDepth: 8.1,
      pressure: 8.6,
      wearPattern: "even",
      condition: "good",
      recommendedAction: "No action needed",
      lastCheckDate: "2024-04-03",
      nextCheckDate: "2024-05-03"
    },
    {
      tireId: "T008",
      vehicleId: "V002",
      vehicleName: "Volvo FH",
      position: "front-right",
      treadDepth: 8.0,
      pressure: 8.6,
      wearPattern: "even",
      condition: "good",
      recommendedAction: "No action needed",
      lastCheckDate: "2024-04-03",
      nextCheckDate: "2024-05-03"
    },
    {
      tireId: "T009",
      vehicleId: "V003",
      vehicleName: "Scania R",
      position: "front-left",
      treadDepth: 5.2,
      pressure: 8.2,
      wearPattern: "edges",
      condition: "warning",
      recommendedAction: "Check alignment and schedule replacement within 10,000 km",
      lastCheckDate: "2024-04-02",
      nextCheckDate: "2024-04-16"
    },
    {
      tireId: "T010",
      vehicleId: "V003",
      vehicleName: "Scania R",
      position: "front-right",
      treadDepth: 5.0,
      pressure: 8.1,
      wearPattern: "edges",
      condition: "warning",
      recommendedAction: "Check alignment and schedule replacement within 10,000 km",
      lastCheckDate: "2024-04-02",
      nextCheckDate: "2024-04-16"
    },
    {
      tireId: "T011",
      vehicleId: "V004",
      vehicleName: "MAN TGX",
      position: "front-left",
      treadDepth: 9.5,
      pressure: 8.7,
      wearPattern: "even",
      condition: "good",
      recommendedAction: "No action needed",
      lastCheckDate: "2024-04-05",
      nextCheckDate: "2024-05-05"
    },
    {
      tireId: "T012",
      vehicleId: "V004",
      vehicleName: "MAN TGX",
      position: "front-right",
      treadDepth: 9.5,
      pressure: 8.7,
      wearPattern: "even",
      condition: "good",
      recommendedAction: "No action needed",
      lastCheckDate: "2024-04-05",
      nextCheckDate: "2024-05-05"
    }
  ]
};

// Mock rotation schedules data
const mockRotationSchedules = {
  total: 5,
  data: [
    {
      id: "RS001",
      vehicleId: "V001",
      vehicleName: "Mercedes Actros",
      lastRotationDate: "2023-12-15",
      nextRotationDate: "2024-06-15",
      status: "scheduled",
      mileageSinceRotation: 25000,
      history: [
        {
          date: "2023-12-15",
          technician: "Jan Kowalski",
          pattern: "Cross rotation",
          notes: "Standard rotation performed"
        },
        {
          date: "2023-06-10",
          technician: "Piotr Nowak",
          pattern: "Front-to-rear",
          notes: "Rotation with tire replacement"
        }
      ]
    },
    {
      id: "RS002",
      vehicleId: "V002",
      vehicleName: "Volvo FH",
      lastRotationDate: "2024-01-20",
      nextRotationDate: "2024-07-20",
      status: "scheduled",
      mileageSinceRotation: 18000,
      history: [
        {
          date: "2024-01-20",
          technician: "Adam Wiśniewski",
          pattern: "Cross rotation",
          notes: "Standard rotation performed"
        },
        {
          date: "2023-07-15",
          technician: "Jan Kowalski",
          pattern: "Front-to-rear",
          notes: "Standard rotation performed"
        }
      ]
    },
    {
      id: "RS003",
      vehicleId: "V003",
      vehicleName: "Scania R",
      lastRotationDate: "2023-11-05",
      nextRotationDate: "2024-05-05",
      status: "scheduled",
      mileageSinceRotation: 32000,
      history: [
        {
          date: "2023-11-05",
          technician: "Piotr Nowak",
          pattern: "Cross rotation",
          notes: "Standard rotation performed"
        },
        {
          date: "2023-05-10",
          technician: "Adam Wiśniewski",
          pattern: "Front-to-rear",
          notes: "Standard rotation performed"
        }
      ]
    },
    {
      id: "RS004",
      vehicleId: "V004",
      vehicleName: "MAN TGX",
      lastRotationDate: "2024-02-10",
      nextRotationDate: "2024-08-10",
      status: "scheduled",
      mileageSinceRotation: 12000,
      history: [
        {
          date: "2024-02-10",
          technician: "Jan Kowalski",
          pattern: "Cross rotation",
          notes: "Standard rotation performed"
        },
        {
          date: "2023-08-15",
          technician: "Piotr Nowak",
          pattern: "Front-to-rear",
          notes: "Standard rotation performed"
        }
      ]
    },
    {
      id: "RS005",
      vehicleId: "V005",
      vehicleName: "DAF XF",
      lastRotationDate: "2023-10-20",
      nextRotationDate: "2024-04-20",
      status: "overdue",
      mileageSinceRotation: 40000,
      history: [
        {
          date: "2023-10-20",
          technician: "Adam Wiśniewski",
          pattern: "Cross rotation",
          notes: "Standard rotation performed"
        },
        {
          date: "2023-04-15",
          technician: "Jan Kowalski",
          pattern: "Front-to-rear",
          notes: "Standard rotation performed"
        }
      ]
    }
  ]
};

// Mock seasonal changes data
const mockSeasonalChanges = {
  total: 5,
  data: [
    {
      id: "SC001",
      vehicleId: "V001",
      vehicleName: "Mercedes Actros",
      currentSetType: "summer",
      lastChangeDate: "2024-03-15",
      nextChangeDate: "2024-11-15",
      status: "completed",
      storageLocation: "Warehouse A, Rack 3",
      history: [
        {
          date: "2024-03-15",
          changeType: "winter_to_summer",
          technician: "Jan Kowalski",
          notes: "Standard seasonal change"
        },
        {
          date: "2023-11-10",
          changeType: "summer_to_winter",
          technician: "Piotr Nowak",
          notes: "Standard seasonal change"
        }
      ]
    },
    {
      id: "SC002",
      vehicleId: "V002",
      vehicleName: "Volvo FH",
      currentSetType: "summer",
      lastChangeDate: "2024-03-20",
      nextChangeDate: "2024-11-20",
      status: "completed",
      storageLocation: "Warehouse B, Rack 7",
      history: [
        {
          date: "2024-03-20",
          changeType: "winter_to_summer",
          technician: "Adam Wiśniewski",
          notes: "Standard seasonal change"
        },
        {
          date: "2023-11-15",
          changeType: "summer_to_winter",
          technician: "Jan Kowalski",
          notes: "Standard seasonal change"
        }
      ]
    },
    {
      id: "SC003",
      vehicleId: "V003",
      vehicleName: "Scania R",
      currentSetType: "all_season",
      lastChangeDate: "2023-05-10",
      nextChangeDate: null,
      status: "completed",
      storageLocation: null,
      history: [
        {
          date: "2023-05-10",
          changeType: "winter_to_all_season",
          technician: "Piotr Nowak",
          notes: "Changed to all-season tires"
        },
        {
          date: "2022-11-05",
          changeType: "summer_to_winter",
          technician: "Adam Wiśniewski",
          notes: "Standard seasonal change"
        }
      ]
    },
    {
      id: "SC004",
      vehicleId: "V004",
      vehicleName: "MAN TGX",
      currentSetType: "winter",
      lastChangeDate: "2023-11-25",
      nextChangeDate: "2024-04-25",
      status: "overdue",
      storageLocation: "Warehouse C, Rack 2",
      history: [
        {
          date: "2023-11-25",
          changeType: "summer_to_winter",
          technician: "Jan Kowalski",
          notes: "Standard seasonal change"
        },
        {
          date: "2023-03-20",
          changeType: "winter_to_summer",
          technician: "Piotr Nowak",
          notes: "Standard seasonal change"
        }
      ]
    },
    {
      id: "SC005",
      vehicleId: "V005",
      vehicleName: "DAF XF",
      currentSetType: "summer",
      lastChangeDate: "2024-03-30",
      nextChangeDate: "2024-11-30",
      status: "completed",
      storageLocation: "Warehouse A, Rack 8",
      history: [
        {
          date: "2024-03-30",
          changeType: "winter_to_summer",
          technician: "Adam Wiśniewski",
          notes: "Standard seasonal change"
        },
        {
          date: "2023-11-20",
          changeType: "summer_to_winter",
          technician: "Jan Kowalski",
          notes: "Standard seasonal change"
        }
      ]
    }
  ]
};

// Mock tire analytics data
const mockTireAnalytics = {
  lifespanByBrand: [
    { brand: "Michelin", averageLifespan: 120000, costPerKm: 0.00075 },
    { brand: "Continental", averageLifespan: 110000, costPerKm: 0.00070 },
    { brand: "Bridgestone", averageLifespan: 115000, costPerKm: 0.00072 },
    { brand: "Goodyear", averageLifespan: 105000, costPerKm: 0.00068 },
    { brand: "Pirelli", averageLifespan: 100000, costPerKm: 0.00080 }
  ],
  costAnalysis: [
    { category: "Purchase", amount: 125000, percentage: 65 },
    { category: "Maintenance", amount: 35000, percentage: 18 },
    { category: "Rotation", amount: 15000, percentage: 8 },
    { category: "Storage", amount: 10000, percentage: 5 },
    { category: "Disposal", amount: 8000, percentage: 4 }
  ],
  fuelEfficiency: [
    { brand: "Michelin", model: "X Line Energy", fuelSavings: 4.2 },
    { brand: "Continental", model: "Conti EcoPlus HD3", fuelSavings: 3.8 },
    { brand: "Bridgestone", model: "Ecopia H-Drive 001", fuelSavings: 3.5 },
    { brand: "Goodyear", model: "FUELMAX S", fuelSavings: 3.2 },
    { brand: "Pirelli", model: "TR01 Triathlon", fuelSavings: 2.8 }
  ],
  recommendations: [
    {
      brand: "Michelin",
      model: "X Line Energy",
      size: "315/70 R22.5",
      rating: 4.8,
      averageLifespan: 120000,
      fuelEfficiencyImpact: 4.2
    },
    {
      brand: "Continental",
      model: "Conti EcoPlus HD3",
      size: "315/70 R22.5",
      rating: 4.6,
      averageLifespan: 110000,
      fuelEfficiencyImpact: 3.8
    },
    {
      brand: "Bridgestone",
      model: "Ecopia H-Drive 001",
      size: "315/70 R22.5",
      rating: 4.5,
      averageLifespan: 115000,
      fuelEfficiencyImpact: 3.5
    },
    {
      brand: "Goodyear",
      model: "FUELMAX S",
      size: "315/70 R22.5",
      rating: 4.3,
      averageLifespan: 105000,
      fuelEfficiencyImpact: 3.2
    },
    {
      brand: "Pirelli",
      model: "TR01 Triathlon",
      size: "315/80 R22.5",
      rating: 4.2,
      averageLifespan: 100000,
      fuelEfficiencyImpact: 2.8
    }
  ]
};

/**
 * Get tires inventory with optional filtering
 * @param {string} brand - Filter by brand
 * @param {string} type - Filter by type (summer, winter, all_season)
 * @param {string} status - Filter by status (mounted, warehouse, worn)
 * @param {string} vehicle - Filter by vehicle ID
 * @param {string} search - Search term
 * @param {number} page - Page number
 * @param {number} limit - Items per page
 * @returns {Promise<Object>} Tires data
 */
const getTires = async (brand, type, status, vehicle, search, page = 1, limit = 10) => {
  await delay(500); // Simulate API delay
  
  let filteredData = [...mockTires.data];
  
  // Apply filters
  if (brand) {
    filteredData = filteredData.filter(tire => tire.brand.toLowerCase() === brand.toLowerCase());
  }
  
  if (type) {
    filteredData = filteredData.filter(tire => tire.type === type);
  }
  
  if (status) {
    filteredData = filteredData.filter(tire => tire.status === status);
  }
  
  if (vehicle) {
    filteredData = filteredData.filter(tire => tire.vehicleId === vehicle);
  }
  
  if (search) {
    const searchLower = search.toLowerCase();
    filteredData = filteredData.filter(tire => 
      tire.id.toLowerCase().includes(searchLower) ||
      tire.brand.toLowerCase().includes(searchLower) ||
      tire.model.toLowerCase().includes(searchLower) ||
      tire.size.toLowerCase().includes(searchLower)
    );
  }
  
  // Calculate pagination
  const total = filteredData.length;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = filteredData.slice(startIndex, endIndex);
  
  return {
    total,
    page,
    limit,
    data: paginatedData
  };
};

/**
 * Get tire details by ID
 * @param {string} id - Tire ID
 * @returns {Promise<Object>} Tire details
 */
const getTireDetails = async (id) => {
  await delay(300); // Simulate API delay
  
  const tire = mockTires.data.find(t => t.id === id);
  
  if (!tire) {
    throw new Error(`Tire with ID ${id} not found`);
  }
  
  return tire;
};

/**
 * Get tire conditions with optional filtering
 * @param {string} vehicle - Filter by vehicle ID
 * @param {number} page - Page number
 * @param {number} limit - Items per page
 * @returns {Promise<Object>} Tire conditions data
 */
const getTireConditions = async (vehicle, page = 1, limit = 10) => {
  await delay(500); // Simulate API delay
  
  let filteredData = [...mockTireConditions.data];
  
  // Apply filters
  if (vehicle) {
    filteredData = filteredData.filter(condition => condition.vehicleId === vehicle);
  }
  
  // Calculate pagination
  const total = filteredData.length;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = filteredData.slice(startIndex, endIndex);
  
  return {
    total,
    page,
    limit,
    data: paginatedData
  };
};

/**
 * Get rotation schedules with optional filtering
 * @param {string} vehicle - Filter by vehicle ID
 * @param {number} page - Page number
 * @param {number} limit - Items per page
 * @returns {Promise<Object>} Rotation schedules data
 */
const getRotationSchedules = async (vehicle, page = 1, limit = 10) => {
  await delay(500); // Simulate API delay
  
  let filteredData = [...mockRotationSchedules.data];
  
  // Apply filters
  if (vehicle) {
    filteredData = filteredData.filter(schedule => schedule.vehicleId === vehicle);
  }
  
  // Calculate pagination
  const total = filteredData.length;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = filteredData.slice(startIndex, endIndex);
  
  return {
    total,
    page,
    limit,
    data: paginatedData
  };
};

/**
 * Get rotation details by ID
 * @param {string} id - Rotation schedule ID
 * @returns {Promise<Object>} Rotation schedule details
 */
const getRotationDetails = async (id) => {
  await delay(300); // Simulate API delay
  
  const rotation = mockRotationSchedules.data.find(r => r.id === id);
  
  if (!rotation) {
    throw new Error(`Rotation schedule with ID ${id} not found`);
  }
  
  return rotation;
};

/**
 * Get seasonal changes with optional filtering
 * @param {string} vehicle - Filter by vehicle ID
 * @param {number} page - Page number
 * @param {number} limit - Items per page
 * @returns {Promise<Object>} Seasonal changes data
 */
const getSeasonalChanges = async (vehicle, page = 1, limit = 10) => {
  await delay(500); // Simulate API delay
  
  let filteredData = [...mockSeasonalChanges.data];
  
  // Apply filters
  if (vehicle) {
    filteredData = filteredData.filter(change => change.vehicleId === vehicle);
  }
  
  // Calculate pagination
  const total = filteredData.length;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = filteredData.slice(startIndex, endIndex);
  
  return {
    total,
    page,
    limit,
    data: paginatedData
  };
};

/**
 * Get seasonal change details by ID
 * @param {string} id - Seasonal change ID
 * @returns {Promise<Object>} Seasonal change details
 */
const getSeasonalChangeDetails = async (id) => {
  await delay(300); // Simulate API delay
  
  const change = mockSeasonalChanges.data.find(c => c.id === id);
  
  if (!change) {
    throw new Error(`Seasonal change with ID ${id} not found`);
  }
  
  return change;
};

/**
 * Get tire analytics data
 * @returns {Promise<Object>} Tire analytics data
 */
const getTireAnalytics = async () => {
  await delay(700); // Simulate API delay
  
  return mockTireAnalytics;
};

// Create and export the mock service
const mockTiresService = {
  getTires,
  getTireDetails,
  getTireConditions,
  getRotationSchedules,
  getRotationDetails,
  getSeasonalChanges,
  getSeasonalChangeDetails,
  getTireAnalytics
};

export default mockTiresService;
