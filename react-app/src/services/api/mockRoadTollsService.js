/**
 * Mock Road Tolls Service
 * 
 * Mock service providing simulated data for road tolls functionality
 * including toll expenses, transponders, violations, and analytics.
 */

// Helper function to generate random date within a range
const randomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

// Helper function to generate random number within a range
const randomNumber = (min, max, decimals = 0) => {
  const num = Math.random() * (max - min) + min;
  return Number(num.toFixed(decimals));
};

// Helper function to generate random element from array
const randomElement = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

// Helper function to generate random ID
const generateId = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

// Mock data for dashboard KPIs
const mockKpiData = {
  totalTollExpenses: 128450.75,
  violationsCount: 37,
  potentialSavings: 15680.25,
  activeTransponders: 142
};

// Mock data for toll activity map
const mockMapData = [
  { id: '1', lat: 52.2297, lng: 21.0122, type: 'toll_point', name: 'Warsaw A2', amount: 1250.50, frequency: 85 },
  { id: '2', lat: 50.0647, lng: 19.9450, type: 'toll_point', name: 'Krakow A4', amount: 980.25, frequency: 62 },
  { id: '3', lat: 53.1235, lng: 18.0084, type: 'toll_point', name: 'Bydgoszcz S5', amount: 750.80, frequency: 48 },
  { id: '4', lat: 51.7592, lng: 19.4560, type: 'toll_point', name: 'Lodz A1', amount: 1100.40, frequency: 73 },
  { id: '5', lat: 54.3520, lng: 18.6466, type: 'toll_point', name: 'Gdansk A1', amount: 890.60, frequency: 58 },
  { id: '6', lat: 51.1079, lng: 17.0385, type: 'toll_point', name: 'Wroclaw A8', amount: 1050.30, frequency: 67 },
  { id: '7', lat: 52.4064, lng: 16.9252, type: 'toll_point', name: 'Poznan A2', amount: 1150.75, frequency: 76 },
  { id: '8', lat: 53.4289, lng: 14.5530, type: 'toll_point', name: 'Szczecin A6', amount: 680.90, frequency: 42 },
  { id: '9', lat: 51.2465, lng: 22.5684, type: 'toll_point', name: 'Lublin S12', amount: 520.45, frequency: 35 },
  { id: '10', lat: 53.7784, lng: 20.4801, type: 'toll_point', name: 'Olsztyn S51', amount: 480.20, frequency: 31 }
];

// Mock data for expense trends
const mockExpenseTrends = {
  daily: Array(30).fill().map((_, i) => ({
    date: new Date(new Date().setDate(new Date().getDate() - 29 + i)).toISOString().split('T')[0],
    amount: randomNumber(300, 800, 2)
  })),
  weekly: Array(12).fill().map((_, i) => ({
    week: `Week ${i + 1}`,
    amount: randomNumber(2000, 5000, 2)
  })),
  monthly: Array(12).fill().map((_, i) => ({
    month: new Date(0, i).toLocaleString('default', { month: 'short' }),
    amount: randomNumber(8000, 15000, 2)
  })),
  quarterly: Array(4).fill().map((_, i) => ({
    quarter: `Q${i + 1}`,
    amount: randomNumber(25000, 45000, 2)
  }))
};

// Mock data for alerts
const mockAlerts = [
  { id: '1', type: 'payment_due', title: 'Payment Due', message: 'A2 toll payment due in 3 days', severity: 'medium', date: new Date().toISOString() },
  { id: '2', type: 'transponder_inactive', title: 'Inactive Transponder', message: 'Transponder WX-45678 is inactive', severity: 'high', date: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString() },
  { id: '3', type: 'new_violation', title: 'New Violation', message: 'New toll violation on A4 highway', severity: 'high', date: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString() },
  { id: '4', type: 'transponder_expiring', title: 'Expiring Transponder', message: 'Transponder AB-12345 expires in 14 days', severity: 'low', date: new Date(new Date().setDate(new Date().getDate() - 3)).toISOString() },
  { id: '5', type: 'route_optimization', title: 'Route Optimization', message: 'Potential savings of 320€ on Warsaw-Berlin route', severity: 'info', date: new Date(new Date().setDate(new Date().getDate() - 4)).toISOString() }
];

// Mock data for transponders
const transponderStatuses = ['active', 'inactive', 'expired', 'pending_activation'];
const vehicleTypes = ['truck', 'van', 'car', 'bus'];

const mockTransponders = Array(50).fill().map((_, i) => ({
  id: `TRANS-${10000 + i}`,
  serialNumber: `TP-${100000 + i}`,
  status: randomElement(transponderStatuses),
  vehicleId: `VEH-${1000 + Math.floor(i / 2)}`,
  vehiclePlate: `WZ ${10000 + Math.floor(i / 2)}`,
  vehicleType: randomElement(vehicleTypes),
  assignedDriver: `Driver ${1000 + Math.floor(i / 3)}`,
  validFrom: randomDate(new Date(2023, 0, 1), new Date(2024, 0, 1)).toISOString(),
  validTo: randomDate(new Date(2025, 0, 1), new Date(2026, 0, 1)).toISOString(),
  tollOperator: randomElement(['ViaTOLL', 'AutoStrade', 'EuroVignette', 'TollCollect']),
  lastUsed: randomDate(new Date(2024, 0, 1), new Date()).toISOString(),
  balance: randomNumber(0, 500, 2)
}));

// Mock data for violations
const violationTypes = ['missing_payment', 'expired_transponder', 'wrong_vehicle_class', 'unauthorized_lane_use'];
const violationStatuses = ['new', 'in_progress', 'paid', 'disputed', 'resolved'];

const mockViolations = Array(40).fill().map((_, i) => ({
  id: `VIOL-${20000 + i}`,
  date: randomDate(new Date(2024, 0, 1), new Date()).toISOString(),
  location: randomElement([
    'A2 Warsaw-Poznan', 'A4 Krakow-Katowice', 'A1 Gdansk-Torun', 
    'S8 Warsaw-Wroclaw', 'A8 Wroclaw Ring Road', 'S7 Warsaw-Krakow'
  ]),
  vehicleId: `VEH-${1000 + Math.floor(Math.random() * 25)}`,
  vehiclePlate: `WZ ${10000 + Math.floor(Math.random() * 25)}`,
  driverId: `DRV-${1000 + Math.floor(Math.random() * 15)}`,
  driverName: `Driver ${1000 + Math.floor(Math.random() * 15)}`,
  type: randomElement(violationTypes),
  amount: randomNumber(50, 500, 2),
  status: randomElement(violationStatuses),
  dueDate: randomDate(new Date(), new Date(new Date().setMonth(new Date().getMonth() + 3))).toISOString(),
  description: `Violation detected at toll gate. Reference number: REF-${100000 + i}`,
  evidenceUrl: `https://example.com/evidence/violation-${20000 + i}.jpg`
}));

// Mock data for expense reports
const mockExpenseReports = {
  byVehicle: Array(15).fill().map((_, i) => ({
    vehicleId: `VEH-${1000 + i}`,
    vehiclePlate: `WZ ${10000 + i}`,
    vehicleType: randomElement(vehicleTypes),
    totalExpense: randomNumber(500, 5000, 2),
    violationsCount: randomNumber(0, 5),
    violationsCost: randomNumber(0, 500, 2),
    mostFrequentRoute: randomElement([
      'Warsaw-Berlin', 'Krakow-Vienna', 'Gdansk-Warsaw', 
      'Poznan-Berlin', 'Warsaw-Vilnius', 'Wroclaw-Prague'
    ])
  })),
  byDriver: Array(10).fill().map((_, i) => ({
    driverId: `DRV-${1000 + i}`,
    driverName: `Driver ${1000 + i}`,
    totalExpense: randomNumber(300, 3000, 2),
    violationsCount: randomNumber(0, 4),
    violationsCost: randomNumber(0, 400, 2),
    assignedVehicles: randomNumber(1, 3)
  })),
  byRoute: Array(8).fill().map((_, i) => ({
    routeId: `ROUTE-${1000 + i}`,
    routeName: randomElement([
      'Warsaw-Berlin', 'Krakow-Vienna', 'Gdansk-Warsaw', 
      'Poznan-Berlin', 'Warsaw-Vilnius', 'Wroclaw-Prague',
      'Lodz-Warsaw', 'Katowice-Krakow'
    ]),
    totalExpense: randomNumber(1000, 8000, 2),
    frequency: randomNumber(5, 50),
    averageCostPerTrip: randomNumber(50, 300, 2),
    potentialSavings: randomNumber(100, 1000, 2)
  })),
  byPeriod: {
    daily: Array(30).fill().map((_, i) => ({
      date: new Date(new Date().setDate(new Date().getDate() - 29 + i)).toISOString().split('T')[0],
      amount: randomNumber(100, 500, 2)
    })),
    weekly: Array(12).fill().map((_, i) => ({
      week: `Week ${i + 1}`,
      amount: randomNumber(700, 3000, 2)
    })),
    monthly: Array(12).fill().map((_, i) => ({
      month: new Date(0, i).toLocaleString('default', { month: 'short' }),
      amount: randomNumber(3000, 10000, 2)
    }))
  }
};

// Mock data for toll operators
const mockTollOperators = [
  { id: '1', name: 'ViaTOLL', country: 'Poland', website: 'https://viatoll.pl', supportPhone: '+48 123 456 789', supportEmail: 'support@viatoll.pl' },
  { id: '2', name: 'AutoStrade', country: 'Italy', website: 'https://autostrade.it', supportPhone: '+39 123 456 789', supportEmail: 'support@autostrade.it' },
  { id: '3', name: 'EuroVignette', country: 'Multiple EU', website: 'https://eurovignette.eu', supportPhone: '+32 123 456 789', supportEmail: 'support@eurovignette.eu' },
  { id: '4', name: 'TollCollect', country: 'Germany', website: 'https://toll-collect.de', supportPhone: '+49 123 456 789', supportEmail: 'support@toll-collect.de' },
  { id: '5', name: 'ASFINAG', country: 'Austria', website: 'https://asfinag.at', supportPhone: '+43 123 456 789', supportEmail: 'support@asfinag.at' },
  { id: '6', name: 'MYTO CZ', country: 'Czech Republic', website: 'https://mytocz.eu', supportPhone: '+420 123 456 789', supportEmail: 'support@mytocz.eu' }
];

// Mock data for toll points
const mockTollPoints = [
  { id: 'TP-1001', name: 'Punkt poboru A2 - Konin', road: 'A2', country: 'Polska', operator: 'ViaTOLL', truckRate: 15.50, carRate: 9.90, paymentMethods: 'Transponder, Gotówka, Karta', coordinates: { lat: 52.223, lng: 18.251 } },
  { id: 'TP-1002', name: 'Punkt poboru A2 - Poznań Wschód', road: 'A2', country: 'Polska', operator: 'ViaTOLL', truckRate: 22.75, carRate: 12.50, paymentMethods: 'Transponder, Gotówka, Karta', coordinates: { lat: 52.401, lng: 17.068 } },
  { id: 'TP-1003', name: 'Punkt poboru A2 - Poznań Zachód', road: 'A2', country: 'Polska', operator: 'ViaTOLL', truckRate: 18.20, carRate: 10.30, paymentMethods: 'Transponder, Gotówka, Karta', coordinates: { lat: 52.390, lng: 16.711 } },
  { id: 'TP-1004', name: 'Punkt poboru A2 - Świecko', road: 'A2', country: 'Polska', operator: 'ViaTOLL', truckRate: 12.90, carRate: 8.50, paymentMethods: 'Transponder, Gotówka, Karta', coordinates: { lat: 52.294, lng: 14.685 } },
  { id: 'TP-1005', name: 'Punkt poboru A4 - Kraków', road: 'A4', country: 'Polska', operator: 'ViaTOLL', truckRate: 20.00, carRate: 10.00, paymentMethods: 'Transponder, Gotówka, Karta', coordinates: { lat: 50.010, lng: 19.994 } },
  { id: 'TP-1006', name: 'Punkt poboru A4 - Katowice', road: 'A4', country: 'Polska', operator: 'ViaTOLL', truckRate: 18.50, carRate: 9.50, paymentMethods: 'Transponder, Gotówka, Karta', coordinates: { lat: 50.214, lng: 19.134 } },
  { id: 'TP-1007', name: 'Punkt poboru A4 - Wrocław', road: 'A4', country: 'Polska', operator: 'ViaTOLL', truckRate: 19.30, carRate: 9.80, paymentMethods: 'Transponder, Gotówka, Karta', coordinates: { lat: 51.036, lng: 17.124 } },
  { id: 'TP-1008', name: 'Punkt poboru A1 - Gdańsk', road: 'A1', country: 'Polska', operator: 'ViaTOLL', truckRate: 16.70, carRate: 9.20, paymentMethods: 'Transponder, Gotówka, Karta', coordinates: { lat: 54.349, lng: 18.659 } },
  { id: 'TP-1009', name: 'Punkt poboru A1 - Toruń', road: 'A1', country: 'Polska', operator: 'ViaTOLL', truckRate: 17.40, carRate: 9.40, paymentMethods: 'Transponder, Gotówka, Karta', coordinates: { lat: 53.035, lng: 18.604 } },
  { id: 'TP-1010', name: 'Punkt poboru A1 - Łódź', road: 'A1', country: 'Polska', operator: 'ViaTOLL', truckRate: 18.10, carRate: 9.60, paymentMethods: 'Transponder, Gotówka, Karta', coordinates: { lat: 51.759, lng: 19.461 } },
  { id: 'TP-2001', name: 'Toll Point A9 - Berlin', road: 'A9', country: 'Germany', operator: 'TollCollect', truckRate: 25.80, carRate: 12.40, paymentMethods: 'Transponder, Cash, Card', coordinates: { lat: 52.520, lng: 13.405 } },
  { id: 'TP-2002', name: 'Toll Point A8 - Munich', road: 'A8', country: 'Germany', operator: 'TollCollect', truckRate: 24.50, carRate: 11.90, paymentMethods: 'Transponder, Cash, Card', coordinates: { lat: 48.137, lng: 11.576 } },
  { id: 'TP-3001', name: 'Toll Point A1 - Vienna', road: 'A1', country: 'Austria', operator: 'ASFINAG', truckRate: 22.30, carRate: 10.80, paymentMethods: 'Transponder, Cash, Card', coordinates: { lat: 48.208, lng: 16.372 } },
  { id: 'TP-4001', name: 'Toll Point D1 - Prague', road: 'D1', country: 'Czech Republic', operator: 'MYTO CZ', truckRate: 19.70, carRate: 9.90, paymentMethods: 'Transponder, Cash, Card', coordinates: { lat: 50.075, lng: 14.437 } },
  { id: 'TP-5001', name: 'Toll Point A1 - Milan', road: 'A1', country: 'Italy', operator: 'AutoStrade', truckRate: 28.40, carRate: 14.20, paymentMethods: 'Transponder, Cash, Card', coordinates: { lat: 45.464, lng: 9.190 } }
];

// Mock data for route optimization
const mockRouteOptimization = {
  routes: [
    {
      id: '1',
      origin: 'Warsaw, Poland',
      destination: 'Berlin, Germany',
      distance: 575,
      estimatedTime: '5h 45m',
      standardRoute: {
        tollCost: 89.50,
        fuelCost: 172.50,
        totalCost: 262.00,
        tollPoints: 4
      },
      alternativeRoute: {
        tollCost: 45.75,
        fuelCost: 195.25,
        totalCost: 241.00,
        tollPoints: 2
      },
      potentialSavings: 21.00
    },
    {
      id: '2',
      origin: 'Krakow, Poland',
      destination: 'Vienna, Austria',
      distance: 435,
      estimatedTime: '4h 30m',
      standardRoute: {
        tollCost: 76.25,
        fuelCost: 130.50,
        totalCost: 206.75,
        tollPoints: 3
      },
      alternativeRoute: {
        tollCost: 42.50,
        fuelCost: 143.75,
        totalCost: 186.25,
        tollPoints: 2
      },
      potentialSavings: 20.50
    },
    {
      id: '3',
      origin: 'Gdansk, Poland',
      destination: 'Warsaw, Poland',
      distance: 340,
      estimatedTime: '3h 15m',
      standardRoute: {
        tollCost: 65.30,
        fuelCost: 102.00,
        totalCost: 167.30,
        tollPoints: 3
      },
      alternativeRoute: {
        tollCost: 0,
        fuelCost: 127.50,
        totalCost: 127.50,
        tollPoints: 0
      },
      potentialSavings: 39.80
    }
  ]
};

/**
 * Get road tolls dashboard data including KPIs, toll activities, and expense trends
 * @param {Object} params - Query parameters
 * @param {string} params.timeRange - Time range for data (day, week, month, year)
 * @returns {Promise<Object>} Dashboard data
 */
export const getRoadTollsDashboard = async (params = {}) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Return mock dashboard data
  return {
    kpi: mockKpiData,
    mapData: mockMapData,
    expenseTrends: mockExpenseTrends,
    alerts: mockAlerts
  };
};

/**
 * Get transponder inventory data
 * @param {Object} params - Query parameters
 * @param {string} params.status - Filter by transponder status
 * @param {string} params.search - Search term
 * @param {number} params.page - Page number
 * @param {number} params.limit - Items per page
 * @returns {Promise<Object>} Transponder data
 */
export const getTransponders = async (params = {}) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  let filteredTransponders = [...mockTransponders];
  
  // Apply status filter
  if (params.status && params.status !== 'all') {
    filteredTransponders = filteredTransponders.filter(t => t.status === params.status);
  }
  
  // Apply search filter
  if (params.search) {
    const searchLower = params.search.toLowerCase();
    filteredTransponders = filteredTransponders.filter(t => 
      t.id.toLowerCase().includes(searchLower) ||
      t.serialNumber.toLowerCase().includes(searchLower) ||
      t.vehiclePlate.toLowerCase().includes(searchLower) ||
      t.assignedDriver.toLowerCase().includes(searchLower)
    );
  }
  
  // Calculate pagination
  const page = params.page || 1;
  const limit = params.limit || 10;
  const totalItems = filteredTransponders.length;
  const totalPages = Math.ceil(totalItems / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedTransponders = filteredTransponders.slice(startIndex, endIndex);
  
  return {
    items: paginatedTransponders,
    pagination: {
      page,
      limit,
      totalItems,
      totalPages
    }
  };
};

/**
 * Get transponder details by ID
 * @param {string} id - Transponder ID
 * @returns {Promise<Object>} Transponder details
 */
export const getTransponderDetails = async (id) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const transponder = mockTransponders.find(t => t.id === id);
  
  if (!transponder) {
    throw new Error(`Transponder with ID ${id} not found`);
  }
  
  // Add additional details for the specific transponder
  return {
    ...transponder,
    usageHistory: Array(10).fill().map((_, i) => ({
      id: generateId(),
      date: randomDate(new Date(2024, 0, 1), new Date()).toISOString(),
      location: randomElement([
        'A2 Warsaw-Poznan', 'A4 Krakow-Katowice', 'A1 Gdansk-Torun', 
        'S8 Warsaw-Wroclaw', 'A8 Wroclaw Ring Road', 'S7 Warsaw-Krakow'
      ]),
      amount: randomNumber(5, 50, 2)
    })),
    maintenanceHistory: Array(3).fill().map((_, i) => ({
      id: generateId(),
      date: randomDate(new Date(2023, 0, 1), new Date()).toISOString(),
      type: randomElement(['activation', 'battery_replacement', 'software_update', 'hardware_repair']),
      performedBy: `Technician ${1000 + i}`,
      notes: `Routine ${randomElement(['activation', 'maintenance', 'repair', 'update'])} of transponder`
    }))
  };
};

/**
 * Get violations and penalties data
 * @param {Object} params - Query parameters
 * @param {string} params.status - Filter by violation status
 * @param {string} params.search - Search term
 * @param {number} params.page - Page number
 * @param {number} params.limit - Items per page
 * @returns {Promise<Object>} Violations data
 */
export const getViolations = async (params = {}) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  let filteredViolations = [...mockViolations];
  
  // Apply status filter
  if (params.status && params.status !== 'all') {
    filteredViolations = filteredViolations.filter(v => v.status === params.status);
  }
  
  // Apply search filter
  if (params.search) {
    const searchLower = params.search.toLowerCase();
    filteredViolations = filteredViolations.filter(v => 
      v.id.toLowerCase().includes(searchLower) ||
      v.vehiclePlate.toLowerCase().includes(searchLower) ||
      v.driverName.toLowerCase().includes(searchLower) ||
      v.location.toLowerCase().includes(searchLower)
    );
  }
  
  // Calculate pagination
  const page = params.page || 1;
  const limit = params.limit || 10;
  const totalItems = filteredViolations.length;
  const totalPages = Math.ceil(totalItems / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedViolations = filteredViolations.slice(startIndex, endIndex);
  
  return {
    items: paginatedViolations,
    pagination: {
      page,
      limit,
      totalItems,
      totalPages
    }
  };
};

/**
 * Get violation details by ID
 * @param {string} id - Violation ID
 * @returns {Promise<Object>} Violation details
 */
export const getViolationDetails = async (id) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const violation = mockViolations.find(v => v.id === id);
  
  if (!violation) {
    throw new Error(`Violation with ID ${id} not found`);
  }
  
  // Add additional details for the specific violation
  return {
    ...violation,
    disputeHistory: violation.status === 'disputed' || violation.status === 'resolved' ? [
      {
        id: generateId(),
        date: randomDate(new Date(new Date(violation.date).getTime()), new Date()).toISOString(),
        action: 'dispute_filed',
        reason: randomElement(['incorrect_vehicle_data', 'payment_already_made', 'exempt_vehicle', 'technical_error']),
        submittedBy: violation.driverName,
        status: violation.status === 'resolved' ? 'accepted' : 'pending'
      },
      ...(violation.status === 'resolved' ? [{
        id: generateId(),
        date: randomDate(new Date(new Date(violation.date).getTime() + 86400000), new Date()).toISOString(),
        action: 'dispute_resolved',
        outcome: randomElement(['accepted', 'partially_accepted', 'rejected']),
        notes: 'Dispute reviewed and processed',
        processedBy: 'Toll Authority'
      }] : [])
    ] : [],
    paymentHistory: violation.status === 'paid' || violation.status === 'resolved' ? [
      {
        id: generateId(),
        date: randomDate(new Date(new Date(violation.date).getTime()), new Date()).toISOString(),
        amount: violation.amount,
        method: randomElement(['credit_card', 'bank_transfer', 'direct_debit', 'company_account']),
        reference: `PAY-${Math.floor(Math.random() * 1000000)}`
      }
    ] : []
  };
};

/**
 * Get expense reports data
 * @param {Object} params - Query parameters
 * @param {string} params.timeRange - Time range for data (day, week, month, year)
 * @param {string} params.groupBy - Group by vehicle, driver, route, etc.
 * @returns {Promise<Object>} Expense reports data
 */
export const getExpenseReports = async (params = {}) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const groupBy = params.groupBy || 'vehicle';
  const timeRange = params.timeRange || 'month';
  
  let reportData;
  
  switch (groupBy) {
    case 'vehicle':
      reportData = mockExpenseReports.byVehicle;
      break;
    case 'driver':
      reportData = mockExpenseReports.byDriver;
      break;
    case 'route':
      reportData = mockExpenseReports.byRoute;
      break;
    case 'period':
      switch (timeRange) {
        case 'day':
          reportData = mockExpenseReports.byPeriod.daily;
          break;
        case 'week':
          reportData = mockExpenseReports.byPeriod.weekly;
          break;
        case 'month':
        default:
          reportData = mockExpenseReports.byPeriod.monthly;
          break;
      }
      break;
    default:
      reportData = mockExpenseReports.byVehicle;
  }
  
  return {
    groupBy,
    timeRange,
    data: reportData,
    summary: {
      totalExpense: reportData.reduce((sum, item) => sum + (item.totalExpense || item.amount), 0),
      averageExpense: reportData.reduce((sum, item) => sum + (item.totalExpense || item.amount), 0) / reportData.length,
      highestExpense: Math.max(...reportData.map(item => item.totalExpense || item.amount)),
      lowestExpense: Math.min(...reportData.map(item => item.totalExpense || item.amount))
    }
  };
};

/**
 * Get toll operators data
 * @returns {Promise<Object>} Toll operators data
 */
export const getTollOperators = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    operators: mockTollOperators,
    count: mockTollOperators.length
  };
};

/**
 * Get toll points data
 * @param {Object} params - Query parameters
 * @param {string} params.country - Filter by country
 * @param {string} params.operator - Filter by operator
 * @param {string} params.search - Search term
 * @returns {Promise<Array>} Toll points data
 */
export const getTollPoints = async (params = {}) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  let filteredTollPoints = [...mockTollPoints];
  
  // Apply country filter
  if (params.country && params.country !== 'all') {
    filteredTollPoints = filteredTollPoints.filter(tp => tp.country === params.country);
  }
  
  // Apply operator filter
  if (params.operator && params.operator !== 'all') {
    filteredTollPoints = filteredTollPoints.filter(tp => tp.operator === params.operator);
  }
  
  // Apply search filter
  if (params.search) {
    const searchLower = params.search.toLowerCase();
    filteredTollPoints = filteredTollPoints.filter(tp => 
      tp.name.toLowerCase().includes(searchLower) ||
      tp.road.toLowerCase().includes(searchLower) ||
      tp.country.toLowerCase().includes(searchLower)
    );
  }
  
  return filteredTollPoints;
};

/**
 * Get route optimization data with toll costs
 * @param {Object} params - Query parameters
 * @param {string} params.origin - Origin location
 * @param {string} params.destination - Destination location
 * @returns {Promise<Object>} Route optimization data
 */
export const getRouteOptimization = async (params = {}) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // If specific origin and destination are provided, filter routes
  if (params.origin && params.destination) {
    const filteredRoutes = mockRouteOptimization.routes.filter(route => 
      route.origin.toLowerCase().includes(params.origin.toLowerCase()) &&
      route.destination.toLowerCase().includes(params.destination.toLowerCase())
    );
    
    if (filteredRoutes.length > 0) {
      return {
        routes: filteredRoutes,
        count: filteredRoutes.length
      };
    }
    
    // If no matching routes, generate a new one
    const newRoute = {
      id: generateId(),
      origin: params.origin,
      destination: params.destination,
      distance: randomNumber(100, 1000),
      estimatedTime: `${randomNumber(1, 10)}h ${randomNumber(0, 59)}m`,
      standardRoute: {
        tollCost: randomNumber(20, 100, 2),
        fuelCost: randomNumber(50, 300, 2),
        totalCost: 0, // Will be calculated
        tollPoints: randomNumber(1, 5)
      },
      alternativeRoute: {
        tollCost: randomNumber(0, 50, 2),
        fuelCost: randomNumber(60, 350, 2),
        totalCost: 0, // Will be calculated
        tollPoints: randomNumber(0, 3)
      },
      potentialSavings: 0 // Will be calculated
    };
    
    // Calculate totals
    newRoute.standardRoute.totalCost = newRoute.standardRoute.tollCost + newRoute.standardRoute.fuelCost;
    newRoute.alternativeRoute.totalCost = newRoute.alternativeRoute.tollCost + newRoute.alternativeRoute.fuelCost;
    newRoute.potentialSavings = Math.max(0, newRoute.standardRoute.totalCost - newRoute.alternativeRoute.totalCost);
    
    return {
      routes: [newRoute],
      count: 1
    };
  }
  
  // Return all routes if no specific origin/destination
  return {
    routes: mockRouteOptimization.routes,
    count: mockRouteOptimization.routes.length
  };
};

export default {
  getRoadTollsDashboard,
  getTransponders,
  getTransponderDetails,
  getViolations,
  getViolationDetails,
  getExpenseReports,
  getTollOperators,
  getTollPoints,
  getRouteOptimization
};
