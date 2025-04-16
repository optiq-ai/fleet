/**
 * Mock Geofencing Service
 * 
 * Mock service for geofencing functionality during development.
 */

import { generateId } from '../../utils/index';

// Mock data for geofences
const mockGeofences = [
  {
    id: "geo-001",
    name: "Magazyn Główny",
    description: "Główny magazyn firmy",
    type: "polygon",
    coordinates: [
      { lat: 52.2297, lng: 21.0122 },
      { lat: 52.2298, lng: 21.0127 },
      { lat: 52.2295, lng: 21.0130 },
      { lat: 52.2292, lng: 21.0125 },
      { lat: 52.2297, lng: 21.0122 }
    ],
    radius: null,
    category: "warehouse",
    status: "active",
    schedule: {
      monday: { start: "08:00", end: "18:00" },
      tuesday: { start: "08:00", end: "18:00" },
      wednesday: { start: "08:00", end: "18:00" },
      thursday: { start: "08:00", end: "18:00" },
      friday: { start: "08:00", end: "18:00" },
      saturday: { start: null, end: null },
      sunday: { start: null, end: null }
    },
    createdAt: "2025-01-15T10:30:00Z",
    updatedAt: "2025-03-20T14:45:00Z",
    metadata: {
      address: "ul. Przykładowa 123, Warszawa",
      contactPerson: "Jan Kowalski",
      contactPhone: "+48 123 456 789"
    }
  },
  {
    id: "geo-002",
    name: "Strefa Klienta A",
    description: "Lokalizacja klienta A",
    type: "circle",
    coordinates: [{ lat: 52.4297, lng: 21.1122 }],
    radius: 500,
    category: "customer",
    status: "active",
    schedule: {
      monday: { start: "09:00", end: "17:00" },
      tuesday: { start: "09:00", end: "17:00" },
      wednesday: { start: "09:00", end: "17:00" },
      thursday: { start: "09:00", end: "17:00" },
      friday: { start: "09:00", end: "17:00" },
      saturday: { start: null, end: null },
      sunday: { start: null, end: null }
    },
    createdAt: "2025-01-20T11:15:00Z",
    updatedAt: "2025-03-15T09:30:00Z",
    metadata: {
      address: "ul. Klientowska 45, Warszawa",
      contactPerson: "Anna Nowak",
      contactPhone: "+48 987 654 321"
    }
  },
  {
    id: "geo-003",
    name: "Strefa Zakazana",
    description: "Obszar z ograniczeniami dla pojazdów ciężarowych",
    type: "polygon",
    coordinates: [
      { lat: 52.3297, lng: 21.2122 },
      { lat: 52.3298, lng: 21.2127 },
      { lat: 52.3295, lng: 21.2130 },
      { lat: 52.3292, lng: 21.2125 },
      { lat: 52.3297, lng: 21.2122 }
    ],
    radius: null,
    category: "restricted",
    status: "active",
    schedule: {
      monday: { start: "00:00", end: "23:59" },
      tuesday: { start: "00:00", end: "23:59" },
      wednesday: { start: "00:00", end: "23:59" },
      thursday: { start: "00:00", end: "23:59" },
      friday: { start: "00:00", end: "23:59" },
      saturday: { start: "00:00", end: "23:59" },
      sunday: { start: "00:00", end: "23:59" }
    },
    createdAt: "2025-02-05T08:45:00Z",
    updatedAt: "2025-02-05T08:45:00Z",
    metadata: {
      reason: "Ograniczenia tonażowe",
      maxWeight: "3.5t"
    }
  },
  {
    id: "geo-004",
    name: "Strefa Niebezpieczna",
    description: "Obszar z materiałami niebezpiecznymi",
    type: "circle",
    coordinates: [{ lat: 52.5297, lng: 21.3122 }],
    radius: 300,
    category: "hazardous",
    status: "active",
    schedule: {
      monday: { start: "00:00", end: "23:59" },
      tuesday: { start: "00:00", end: "23:59" },
      wednesday: { start: "00:00", end: "23:59" },
      thursday: { start: "00:00", end: "23:59" },
      friday: { start: "00:00", end: "23:59" },
      saturday: { start: "00:00", end: "23:59" },
      sunday: { start: "00:00", end: "23:59" }
    },
    createdAt: "2025-02-10T14:20:00Z",
    updatedAt: "2025-03-01T10:15:00Z",
    metadata: {
      hazardType: "Chemikalia",
      requiredPermissions: "ADR"
    }
  },
  {
    id: "geo-005",
    name: "Korytarz Transportowy",
    description: "Preferowana trasa dla pojazdów firmowych",
    type: "polygon",
    coordinates: [
      { lat: 52.1297, lng: 21.4122 },
      { lat: 52.1298, lng: 21.4127 },
      { lat: 52.1295, lng: 21.4130 },
      { lat: 52.1292, lng: 21.4125 },
      { lat: 52.1297, lng: 21.4122 }
    ],
    radius: null,
    category: "corridor",
    status: "active",
    schedule: {
      monday: { start: "00:00", end: "23:59" },
      tuesday: { start: "00:00", end: "23:59" },
      wednesday: { start: "00:00", end: "23:59" },
      thursday: { start: "00:00", end: "23:59" },
      friday: { start: "00:00", end: "23:59" },
      saturday: { start: "00:00", end: "23:59" },
      sunday: { start: "00:00", end: "23:59" }
    },
    createdAt: "2025-02-15T09:30:00Z",
    updatedAt: "2025-02-15T09:30:00Z",
    metadata: {
      reason: "Optymalizacja tras",
      priority: "high"
    }
  }
];

// Mock data for violations
const mockViolations = [
  {
    id: "vio-001",
    geofenceId: "geo-003",
    geofenceName: "Strefa Zakazana",
    vehicleId: "veh-001",
    vehiclePlate: "WA 12345",
    driverId: "drv-001",
    driverName: "Adam Nowak",
    type: "entry",
    timestamp: "2025-04-15T14:30:00Z",
    coordinates: { lat: 52.3297, lng: 21.2122 },
    dwellTime: null,
    speed: 15.5,
    heading: 90,
    acknowledged: false,
    acknowledgedBy: null,
    acknowledgedAt: null
  },
  {
    id: "vio-002",
    geofenceId: "geo-003",
    geofenceName: "Strefa Zakazana",
    vehicleId: "veh-001",
    vehiclePlate: "WA 12345",
    driverId: "drv-001",
    driverName: "Adam Nowak",
    type: "exit",
    timestamp: "2025-04-15T14:45:00Z",
    coordinates: { lat: 52.3295, lng: 21.2130 },
    dwellTime: 900,
    speed: 12.0,
    heading: 180,
    acknowledged: true,
    acknowledgedBy: "usr-001",
    acknowledgedAt: "2025-04-15T15:00:00Z"
  },
  {
    id: "vio-003",
    geofenceId: "geo-004",
    geofenceName: "Strefa Niebezpieczna",
    vehicleId: "veh-002",
    vehiclePlate: "WA 54321",
    driverId: "drv-002",
    driverName: "Piotr Kowalski",
    type: "entry",
    timestamp: "2025-04-16T09:15:00Z",
    coordinates: { lat: 52.5297, lng: 21.3122 },
    dwellTime: null,
    speed: 8.2,
    heading: 270,
    acknowledged: false,
    acknowledgedBy: null,
    acknowledgedAt: null
  },
  {
    id: "vio-004",
    geofenceId: "geo-004",
    geofenceName: "Strefa Niebezpieczna",
    vehicleId: "veh-002",
    vehiclePlate: "WA 54321",
    driverId: "drv-002",
    driverName: "Piotr Kowalski",
    type: "exit",
    timestamp: "2025-04-16T09:30:00Z",
    coordinates: { lat: 52.5297, lng: 21.3122 },
    dwellTime: 900,
    speed: 10.5,
    heading: 90,
    acknowledged: false,
    acknowledgedBy: null,
    acknowledgedAt: null
  },
  {
    id: "vio-005",
    geofenceId: "geo-001",
    geofenceName: "Magazyn Główny",
    vehicleId: "veh-003",
    vehiclePlate: "WA 98765",
    driverId: "drv-003",
    driverName: "Katarzyna Wiśniewska",
    type: "dwell",
    timestamp: "2025-04-16T13:45:00Z",
    coordinates: { lat: 52.2297, lng: 21.0122 },
    dwellTime: 7200,
    speed: 0,
    heading: 0,
    acknowledged: true,
    acknowledgedBy: "usr-002",
    acknowledgedAt: "2025-04-16T14:00:00Z"
  }
];

// Mock data for alert rules
const mockAlertRules = [
  {
    id: "rule-001",
    geofenceId: "geo-001",
    geofenceName: "Magazyn Główny",
    name: "Alert wjazdu do magazynu",
    description: "Powiadomienie o wjeździe pojazdu do magazynu głównego",
    triggerOn: "entry",
    dwellThreshold: null,
    schedule: {
      active: true,
      days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
      startTime: "08:00",
      endTime: "18:00"
    },
    recipients: [
      { type: "email", value: "manager@example.com" },
      { type: "sms", value: "+48 123 456 789" }
    ],
    priority: "medium",
    status: "active",
    createdAt: "2025-01-15T10:30:00Z",
    updatedAt: "2025-03-20T14:45:00Z"
  },
  {
    id: "rule-002",
    geofenceId: "geo-003",
    geofenceName: "Strefa Zakazana",
    name: "Alert wjazdu do strefy zakazanej",
    description: "Powiadomienie o wjeździe pojazdu do strefy zakazanej",
    triggerOn: "entry",
    dwellThreshold: null,
    schedule: {
      active: true,
      days: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
      startTime: "00:00",
      endTime: "23:59"
    },
    recipients: [
      { type: "email", value: "security@example.com" },
      { type: "sms", value: "+48 987 654 321" }
    ],
    priority: "high",
    status: "active",
    createdAt: "2025-02-05T08:45:00Z",
    updatedAt: "2025-02-05T08:45:00Z"
  },
  {
    id: "rule-003",
    geofenceId: "geo-004",
    geofenceName: "Strefa Niebezpieczna",
    name: "Alert przekroczenia czasu w strefie niebezpiecznej",
    description: "Powiadomienie o przekroczeniu dozwolonego czasu pobytu w strefie niebezpiecznej",
    triggerOn: "dwell",
    dwellThreshold: 900,
    schedule: {
      active: true,
      days: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
      startTime: "00:00",
      endTime: "23:59"
    },
    recipients: [
      { type: "email", value: "safety@example.com" },
      { type: "sms", value: "+48 111 222 333" }
    ],
    priority: "high",
    status: "active",
    createdAt: "2025-02-10T14:20:00Z",
    updatedAt: "2025-03-01T10:15:00Z"
  }
];

// Mock data for time in zone reports
const mockTimeInZoneReports = [
  {
    geofenceId: "geo-001",
    geofenceName: "Magazyn Główny",
    vehicleId: "veh-001",
    vehiclePlate: "WA 12345",
    driverId: "drv-001",
    driverName: "Adam Nowak",
    date: "2025-04-15",
    entries: 3,
    exits: 3,
    totalTimeInZone: 7200,
    averageTimePerVisit: 2400,
    firstEntry: "2025-04-15T08:30:00Z",
    lastExit: "2025-04-15T16:45:00Z"
  },
  {
    geofenceId: "geo-001",
    geofenceName: "Magazyn Główny",
    vehicleId: "veh-002",
    vehiclePlate: "WA 54321",
    driverId: "drv-002",
    driverName: "Piotr Kowalski",
    date: "2025-04-15",
    entries: 2,
    exits: 2,
    totalTimeInZone: 5400,
    averageTimePerVisit: 2700,
    firstEntry: "2025-04-15T09:15:00Z",
    lastExit: "2025-04-15T15:30:00Z"
  },
  {
    geofenceId: "geo-002",
    geofenceName: "Strefa Klienta A",
    vehicleId: "veh-003",
    vehiclePlate: "WA 98765",
    driverId: "drv-003",
    driverName: "Katarzyna Wiśniewska",
    date: "2025-04-15",
    entries: 1,
    exits: 1,
    totalTimeInZone: 3600,
    averageTimePerVisit: 3600,
    firstEntry: "2025-04-15T10:00:00Z",
    lastExit: "2025-04-15T11:00:00Z"
  },
  {
    geofenceId: "geo-002",
    geofenceName: "Strefa Klienta A",
    vehicleId: "veh-001",
    vehiclePlate: "WA 12345",
    driverId: "drv-001",
    driverName: "Adam Nowak",
    date: "2025-04-16",
    entries: 1,
    exits: 1,
    totalTimeInZone: 1800,
    averageTimePerVisit: 1800,
    firstEntry: "2025-04-16T13:00:00Z",
    lastExit: "2025-04-16T13:30:00Z"
  },
  {
    geofenceId: "geo-001",
    geofenceName: "Magazyn Główny",
    vehicleId: "veh-003",
    vehiclePlate: "WA 98765",
    driverId: "drv-003",
    driverName: "Katarzyna Wiśniewska",
    date: "2025-04-16",
    entries: 1,
    exits: 1,
    totalTimeInZone: 7200,
    averageTimePerVisit: 7200,
    firstEntry: "2025-04-16T08:00:00Z",
    lastExit: "2025-04-16T10:00:00Z"
  }
];

// Mock data for dashboard
const mockDashboardData = {
  kpi: {
    activeGeofences: 5,
    violationsToday: 3,
    vehiclesInZones: 2,
    avgTimeInZones: 45
  },
  mapData: {
    geofences: mockGeofences,
    vehicles: [
      {
        id: "veh-001",
        plate: "WA 12345",
        type: "truck",
        coordinates: { lat: 52.2297, lng: 21.0122 },
        status: "in-zone",
        zone: "geo-001",
        driver: "Adam Nowak",
        speed: 0,
        heading: 0
      },
      {
        id: "veh-002",
        plate: "WA 54321",
        type: "van",
        coordinates: { lat: 52.4297, lng: 21.1122 },
        status: "in-zone",
        zone: "geo-002",
        driver: "Piotr Kowalski",
        speed: 0,
        heading: 0
      },
      {
        id: "veh-003",
        plate: "WA 98765",
        type: "truck",
        coordinates: { lat: 52.3000, lng: 21.1500 },
        status: "moving",
        zone: null,
        driver: "Katarzyna Wiśniewska",
        speed: 65,
        heading: 90
      }
    ]
  },
  alerts: [
    {
      id: "alert-001",
      type: "entry",
      geofenceId: "geo-001",
      geofenceName: "Magazyn Główny",
      vehicleId: "veh-001",
      vehiclePlate: "WA 12345",
      driverId: "drv-001",
      driverName: "Adam Nowak",
      timestamp: "2025-04-16T08:30:00Z",
      priority: "medium",
      status: "active"
    },
    {
      id: "alert-002",
      type: "entry",
      geofenceId: "geo-002",
      geofenceName: "Strefa Klienta A",
      vehicleId: "veh-002",
      vehiclePlate: "WA 54321",
      driverId: "drv-002",
      driverName: "Piotr Kowalski",
      timestamp: "2025-04-16T09:15:00Z",
      priority: "medium",
      status: "active"
    },
    {
      id: "alert-003",
      type: "dwell",
      geofenceId: "geo-001",
      geofenceName: "Magazyn Główny",
      vehicleId: "veh-001",
      vehiclePlate: "WA 12345",
      driverId: "drv-001",
      driverName: "Adam Nowak",
      timestamp: "2025-04-16T10:30:00Z",
      priority: "high",
      status: "active"
    }
  ],
  zoneUtilization: [
    {
      geofenceId: "geo-001",
      geofenceName: "Magazyn Główny",
      visits: 5,
      totalTime: 14400,
      avgTime: 2880
    },
    {
      geofenceId: "geo-002",
      geofenceName: "Strefa Klienta A",
      visits: 2,
      totalTime: 5400,
      avgTime: 2700
    },
    {
      geofenceId: "geo-003",
      geofenceName: "Strefa Zakazana",
      visits: 1,
      totalTime: 900,
      avgTime: 900
    }
  ],
  violationTrends: [
    { date: "2025-04-10", count: 2 },
    { date: "2025-04-11", count: 1 },
    { date: "2025-04-12", count: 0 },
    { date: "2025-04-13", count: 3 },
    { date: "2025-04-14", count: 2 },
    { date: "2025-04-15", count: 4 },
    { date: "2025-04-16", count: 3 }
  ]
};

// Mock data for optimized routes
const mockOptimizedRoutes = {
  origin: "Warszawa, Polska",
  destination: "Kraków, Polska",
  distance: 295.4,
  duration: 180,
  avoidedGeofences: ["geo-003", "geo-004"],
  waypoints: [
    { lat: 52.2297, lng: 21.0122 },
    { lat: 51.9194, lng: 20.1455 },
    { lat: 51.4027, lng: 19.7031 },
    { lat: 50.8661, lng: 19.1203 },
    { lat: 50.0647, lng: 19.9450 }
  ],
  alternativeRoutes: [
    {
      distance: 310.2,
      duration: 195,
      avoidedGeofences: ["geo-003"],
      waypoints: [
        { lat: 52.2297, lng: 21.0122 },
        { lat: 51.4027, lng: 20.7031 },
        { lat: 50.8661, lng: 20.1203 },
        { lat: 50.0647, lng: 19.9450 }
      ]
    }
  ]
};

/**
 * Get geofencing dashboard data
 * @param {Object} params - Query parameters
 * @returns {Promise<Object>} Dashboard data
 */
export const getGeofencingDashboard = async (params = {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockDashboardData);
    }, 500);
  });
};

/**
 * Get list of geofences
 * @param {Object} params - Query parameters
 * @returns {Promise<Object>} Geofences data
 */
export const getGeofences = async (params = {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filteredGeofences = [...mockGeofences];
      
      // Apply category filter
      if (params.category && params.category !== 'all') {
        filteredGeofences = filteredGeofences.filter(g => g.category === params.category);
      }
      
      // Apply status filter
      if (params.status && params.status !== 'all') {
        filteredGeofences = filteredGeofences.filter(g => g.status === params.status);
      }
      
      // Apply search filter
      if (params.search) {
        const searchLower = params.search.toLowerCase();
        filteredGeofences = filteredGeofences.filter(g => 
          g.name.toLowerCase().includes(searchLower) || 
          g.description.toLowerCase().includes(searchLower)
        );
      }
      
      // Apply pagination
      const page = params.page || 1;
      const limit = params.limit || 10;
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const paginatedGeofences = filteredGeofences.slice(startIndex, endIndex);
      
      resolve({
        items: paginatedGeofences,
        total: filteredGeofences.length,
        page: page,
        limit: limit,
        totalPages: Math.ceil(filteredGeofences.length / limit)
      });
    }, 500);
  });
};

/**
 * Get geofence details
 * @param {string} id - Geofence ID
 * @returns {Promise<Object>} Geofence details
 */
export const getGeofenceDetails = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const geofence = mockGeofences.find(g => g.id === id);
      if (geofence) {
        resolve(geofence);
      } else {
        reject(new Error(`Geofence with ID ${id} not found`));
      }
    }, 500);
  });
};

/**
 * Create new geofence
 * @param {Object} geofenceData - Geofence data
 * @returns {Promise<Object>} Created geofence
 */
export const createGeofence = async (geofenceData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newGeofence = {
        id: `geo-${generateId(6)}`,
        ...geofenceData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      mockGeofences.push(newGeofence);
      resolve(newGeofence);
    }, 500);
  });
};

/**
 * Update geofence
 * @param {string} id - Geofence ID
 * @param {Object} geofenceData - Updated geofence data
 * @returns {Promise<Object>} Updated geofence
 */
export const updateGeofence = async (id, geofenceData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = mockGeofences.findIndex(g => g.id === id);
      if (index !== -1) {
        const updatedGeofence = {
          ...mockGeofences[index],
          ...geofenceData,
          updatedAt: new Date().toISOString()
        };
        mockGeofences[index] = updatedGeofence;
        resolve(updatedGeofence);
      } else {
        reject(new Error(`Geofence with ID ${id} not found`));
      }
    }, 500);
  });
};

/**
 * Delete geofence
 * @param {string} id - Geofence ID
 * @returns {Promise<Object>} Deletion result
 */
export const deleteGeofence = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = mockGeofences.findIndex(g => g.id === id);
      if (index !== -1) {
        mockGeofences.splice(index, 1);
        resolve({ success: true, message: `Geofence with ID ${id} deleted successfully` });
      } else {
        reject(new Error(`Geofence with ID ${id} not found`));
      }
    }, 500);
  });
};

/**
 * Get geofence violations
 * @param {Object} params - Query parameters
 * @returns {Promise<Object>} Violations data
 */
export const getGeofenceViolations = async (params = {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filteredViolations = [...mockViolations];
      
      // Apply geofence filter
      if (params.geofenceId) {
        filteredViolations = filteredViolations.filter(v => v.geofenceId === params.geofenceId);
      }
      
      // Apply vehicle filter
      if (params.vehicleId) {
        filteredViolations = filteredViolations.filter(v => v.vehicleId === params.vehicleId);
      }
      
      // Apply driver filter
      if (params.driverId) {
        filteredViolations = filteredViolations.filter(v => v.driverId === params.driverId);
      }
      
      // Apply date range filter
      if (params.dateFrom) {
        const dateFrom = new Date(params.dateFrom);
        filteredViolations = filteredViolations.filter(v => new Date(v.timestamp) >= dateFrom);
      }
      
      if (params.dateTo) {
        const dateTo = new Date(params.dateTo);
        filteredViolations = filteredViolations.filter(v => new Date(v.timestamp) <= dateTo);
      }
      
      // Apply violation type filter
      if (params.violationType) {
        filteredViolations = filteredViolations.filter(v => v.type === params.violationType);
      }
      
      // Apply pagination
      const page = params.page || 1;
      const limit = params.limit || 10;
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const paginatedViolations = filteredViolations.slice(startIndex, endIndex);
      
      resolve({
        items: paginatedViolations,
        total: filteredViolations.length,
        page: page,
        limit: limit,
        totalPages: Math.ceil(filteredViolations.length / limit)
      });
    }, 500);
  });
};

/**
 * Get time in zone report
 * @param {Object} params - Query parameters
 * @returns {Promise<Object>} Time in zone report data
 */
export const getTimeInZoneReport = async (params = {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filteredReports = [...mockTimeInZoneReports];
      
      // Apply geofence filter
      if (params.geofenceId) {
        filteredReports = filteredReports.filter(r => r.geofenceId === params.geofenceId);
      }
      
      // Apply vehicle filter
      if (params.vehicleId) {
        filteredReports = filteredReports.filter(r => r.vehicleId === params.vehicleId);
      }
      
      // Apply driver filter
      if (params.driverId) {
        filteredReports = filteredReports.filter(r => r.driverId === params.driverId);
      }
      
      // Apply date range filter
      if (params.dateFrom) {
        const dateFrom = params.dateFrom;
        filteredReports = filteredReports.filter(r => r.date >= dateFrom);
      }
      
      if (params.dateTo) {
        const dateTo = params.dateTo;
        filteredReports = filteredReports.filter(r => r.date <= dateTo);
      }
      
      // Apply grouping
      if (params.groupBy) {
        // Simplified grouping logic for mock data
        // In a real implementation, this would be more sophisticated
        switch (params.groupBy) {
          case 'vehicle':
            // Group by vehicle
            break;
          case 'driver':
            // Group by driver
            break;
          case 'geofence':
            // Group by geofence
            break;
          case 'day':
            // Group by day
            break;
          case 'week':
            // Group by week
            break;
          case 'month':
            // Group by month
            break;
          default:
            // No grouping
        }
      }
      
      // Apply pagination
      const page = params.page || 1;
      const limit = params.limit || 10;
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const paginatedReports = filteredReports.slice(startIndex, endIndex);
      
      resolve({
        items: paginatedReports,
        total: filteredReports.length,
        page: page,
        limit: limit,
        totalPages: Math.ceil(filteredReports.length / limit)
      });
    }, 500);
  });
};

/**
 * Configure alert rule
 * @param {Object} ruleData - Alert rule data
 * @returns {Promise<Object>} Configured alert rule
 */
export const configureAlertRule = async (ruleData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newRule = {
        id: `rule-${generateId(6)}`,
        ...ruleData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      mockAlertRules.push(newRule);
      resolve(newRule);
    }, 500);
  });
};

/**
 * Get alert rules
 * @param {Object} params - Query parameters
 * @returns {Promise<Object>} Alert rules data
 */
export const getAlertRules = async (params = {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filteredRules = [...mockAlertRules];
      
      // Apply geofence filter
      if (params.geofenceId) {
        filteredRules = filteredRules.filter(r => r.geofenceId === params.geofenceId);
      }
      
      // Apply pagination
      const page = params.page || 1;
      const limit = params.limit || 10;
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const paginatedRules = filteredRules.slice(startIndex, endIndex);
      
      resolve({
        items: paginatedRules,
        total: filteredRules.length,
        page: page,
        limit: limit,
        totalPages: Math.ceil(filteredRules.length / limit)
      });
    }, 500);
  });
};

/**
 * Update alert rule
 * @param {string} id - Alert rule ID
 * @param {Object} ruleData - Updated alert rule data
 * @returns {Promise<Object>} Updated alert rule
 */
export const updateAlertRule = async (id, ruleData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = mockAlertRules.findIndex(r => r.id === id);
      if (index !== -1) {
        const updatedRule = {
          ...mockAlertRules[index],
          ...ruleData,
          updatedAt: new Date().toISOString()
        };
        mockAlertRules[index] = updatedRule;
        resolve(updatedRule);
      } else {
        reject(new Error(`Alert rule with ID ${id} not found`));
      }
    }, 500);
  });
};

/**
 * Delete alert rule
 * @param {string} id - Alert rule ID
 * @returns {Promise<Object>} Deletion result
 */
export const deleteAlertRule = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = mockAlertRules.findIndex(r => r.id === id);
      if (index !== -1) {
        mockAlertRules.splice(index, 1);
        resolve({ success: true, message: `Alert rule with ID ${id} deleted successfully` });
      } else {
        reject(new Error(`Alert rule with ID ${id} not found`));
      }
    }, 500);
  });
};

/**
 * Optimize route with geofences
 * @param {Object} params - Route parameters
 * @returns {Promise<Object>} Optimized route data
 */
export const optimizeRouteWithGeofences = async (params = {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // For mock data, we just return the pre-defined optimized route
      resolve(mockOptimizedRoutes);
    }, 500);
  });
};

/**
 * Export geofencing report
 * @param {Object} params - Report parameters
 * @returns {Promise<Object>} Report data or download URL
 */
export const exportGeofencingReport = async (params = {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // For mock data, we just return a fake download URL
      resolve({
        success: true,
        downloadUrl: `https://example.com/reports/${params.reportType}_${params.dateFrom}_${params.dateTo}.${params.format}`,
        fileName: `${params.reportType}_${params.dateFrom}_${params.dateTo}.${params.format}`
      });
    }, 500);
  });
};
