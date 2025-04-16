/**
 * Mock Ferry Bookings Service
 * 
 * Mock service providing simulated data for ferry bookings functionality
 * including reservations, operators, routes, and analytics.
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
  activeBookings: 42,
  upcomingDepartures: 15,
  monthlyExpenses: 28750.50,
  totalSavings: 4320.75
};

// Mock data for ferry activity map
const mockMapData = [
  { id: '1', lat: 54.3520, lng: 18.6466, type: 'ferry_port', name: 'Gdańsk', country: 'Poland', activeBookings: 8 },
  { id: '2', lat: 55.6761, lng: 12.5683, type: 'ferry_port', name: 'Copenhagen', country: 'Denmark', activeBookings: 5 },
  { id: '3', lat: 59.3293, lng: 18.0686, type: 'ferry_port', name: 'Stockholm', country: 'Sweden', activeBookings: 7 },
  { id: '4', lat: 60.1699, lng: 24.9384, type: 'ferry_port', name: 'Helsinki', country: 'Finland', activeBookings: 4 },
  { id: '5', lat: 59.4369, lng: 24.7535, type: 'ferry_port', name: 'Tallinn', country: 'Estonia', activeBookings: 6 },
  { id: '6', lat: 56.9496, lng: 24.1052, type: 'ferry_port', name: 'Riga', country: 'Latvia', activeBookings: 3 },
  { id: '7', lat: 53.5511, lng: 9.9937, type: 'ferry_port', name: 'Hamburg', country: 'Germany', activeBookings: 5 },
  { id: '8', lat: 57.7089, lng: 11.9746, type: 'ferry_port', name: 'Gothenburg', country: 'Sweden', activeBookings: 4 },
  { id: '9', lat: 54.6872, lng: 20.5149, type: 'ferry_port', name: 'Kaliningrad', country: 'Russia', activeBookings: 2 },
  { id: '10', lat: 55.7558, lng: 21.1247, type: 'ferry_port', name: 'Klaipeda', country: 'Lithuania', activeBookings: 3 }
];

// Mock data for ferry routes
const mockFerryRoutes = [
  { id: 'route-001', origin: 'Gdańsk', destination: 'Stockholm', operator: 'Baltic Ferries', distance: 520, duration: '18h', frequency: 'Daily' },
  { id: 'route-002', origin: 'Gdańsk', destination: 'Copenhagen', operator: 'Baltic Ferries', distance: 480, duration: '16h', frequency: 'Daily' },
  { id: 'route-003', origin: 'Gdynia', destination: 'Karlskrona', operator: 'Stena Line', distance: 350, duration: '12h', frequency: 'Daily' },
  { id: 'route-004', origin: 'Świnoujście', destination: 'Ystad', operator: 'Polferries', distance: 280, duration: '8h', frequency: 'Daily' },
  { id: 'route-005', origin: 'Świnoujście', destination: 'Copenhagen', operator: 'Scandlines', distance: 310, duration: '10h', frequency: 'Daily' },
  { id: 'route-006', origin: 'Helsinki', destination: 'Tallinn', operator: 'Viking Line', distance: 80, duration: '2h', frequency: 'Multiple daily' },
  { id: 'route-007', origin: 'Stockholm', destination: 'Helsinki', operator: 'Viking Line', distance: 480, duration: '16h', frequency: 'Daily' },
  { id: 'route-008', origin: 'Kiel', destination: 'Oslo', operator: 'Color Line', distance: 670, duration: '20h', frequency: 'Daily' },
  { id: 'route-009', origin: 'Rostock', destination: 'Gedser', operator: 'Scandlines', distance: 120, duration: '2h', frequency: 'Multiple daily' },
  { id: 'route-010', origin: 'Travemünde', destination: 'Helsinki', operator: 'Finnlines', distance: 1150, duration: '30h', frequency: '3 times weekly' }
];

// Mock data for ferry operators
const mockFerryOperators = [
  { 
    id: 'op-001', 
    name: 'Baltic Ferries', 
    country: 'Poland', 
    website: 'https://balticferries.com', 
    supportPhone: '+48 123 456 789', 
    supportEmail: 'support@balticferries.com',
    routes: ['route-001', 'route-002'],
    fleetSize: 8,
    foundedYear: 1995,
    headquarters: 'Gdańsk, Poland',
    logo: 'https://example.com/logos/baltic-ferries.png'
  },
  { 
    id: 'op-002', 
    name: 'Stena Line', 
    country: 'Sweden', 
    website: 'https://stenaline.com', 
    supportPhone: '+46 123 456 789', 
    supportEmail: 'support@stenaline.com',
    routes: ['route-003'],
    fleetSize: 35,
    foundedYear: 1962,
    headquarters: 'Gothenburg, Sweden',
    logo: 'https://example.com/logos/stena-line.png'
  },
  { 
    id: 'op-003', 
    name: 'Polferries', 
    country: 'Poland', 
    website: 'https://polferries.pl', 
    supportPhone: '+48 987 654 321', 
    supportEmail: 'support@polferries.pl',
    routes: ['route-004'],
    fleetSize: 5,
    foundedYear: 1976,
    headquarters: 'Kołobrzeg, Poland',
    logo: 'https://example.com/logos/polferries.png'
  },
  { 
    id: 'op-004', 
    name: 'Scandlines', 
    country: 'Denmark', 
    website: 'https://scandlines.com', 
    supportPhone: '+45 123 456 789', 
    supportEmail: 'support@scandlines.com',
    routes: ['route-005', 'route-009'],
    fleetSize: 12,
    foundedYear: 1998,
    headquarters: 'Copenhagen, Denmark',
    logo: 'https://example.com/logos/scandlines.png'
  },
  { 
    id: 'op-005', 
    name: 'Viking Line', 
    country: 'Finland', 
    website: 'https://vikingline.com', 
    supportPhone: '+358 123 456 789', 
    supportEmail: 'support@vikingline.com',
    routes: ['route-006', 'route-007'],
    fleetSize: 7,
    foundedYear: 1959,
    headquarters: 'Mariehamn, Åland, Finland',
    logo: 'https://example.com/logos/viking-line.png'
  },
  { 
    id: 'op-006', 
    name: 'Color Line', 
    country: 'Norway', 
    website: 'https://colorline.com', 
    supportPhone: '+47 123 456 789', 
    supportEmail: 'support@colorline.com',
    routes: ['route-008'],
    fleetSize: 6,
    foundedYear: 1990,
    headquarters: 'Oslo, Norway',
    logo: 'https://example.com/logos/color-line.png'
  },
  { 
    id: 'op-007', 
    name: 'Finnlines', 
    country: 'Finland', 
    website: 'https://finnlines.com', 
    supportPhone: '+358 987 654 321', 
    supportEmail: 'support@finnlines.com',
    routes: ['route-010'],
    fleetSize: 21,
    foundedYear: 1947,
    headquarters: 'Helsinki, Finland',
    logo: 'https://example.com/logos/finnlines.png'
  }
];

// Mock data for bookings
const bookingStatuses = ['confirmed', 'pending', 'cancelled', 'completed'];
const vehicleTypes = ['truck', 'van', 'car', 'bus'];
const paymentMethods = ['credit_card', 'bank_transfer', 'invoice', 'company_account'];

const mockBookings = Array(50).fill().map((_, i) => {
  const departureDate = randomDate(new Date(2025, 3, 1), new Date(2025, 9, 30));
  const route = randomElement(mockFerryRoutes);
  const operator = mockFerryOperators.find(op => op.routes.includes(route.id));
  const status = randomElement(bookingStatuses);
  const vehicleType = randomElement(vehicleTypes);
  const vehicleId = `VEH-${1000 + Math.floor(i / 2)}`;
  const driverId = `driver-${(i % 15) + 1}`.padStart(9, '0');
  
  // Calculate price based on vehicle type and route distance
  let basePrice;
  switch(vehicleType) {
    case 'truck': basePrice = route.distance * 0.5; break;
    case 'van': basePrice = route.distance * 0.3; break;
    case 'car': basePrice = route.distance * 0.2; break;
    case 'bus': basePrice = route.distance * 0.4; break;
    default: basePrice = route.distance * 0.3;
  }
  
  // Add random variation to price
  const price = basePrice * (0.9 + Math.random() * 0.2);
  
  return {
    id: `FERRY-${10000 + i}`,
    route: {
      id: route.id,
      origin: route.origin,
      destination: route.destination,
      distance: route.distance,
      duration: route.duration
    },
    operator: {
      id: operator.id,
      name: operator.name,
      country: operator.country
    },
    departureDate: departureDate.toISOString(),
    arrivalDate: new Date(departureDate.getTime() + (parseInt(route.duration) * 3600000)).toISOString(),
    status: status,
    vehicle: {
      id: vehicleId,
      type: vehicleType,
      plate: `WZ ${10000 + Math.floor(i / 2)}`,
      length: vehicleType === 'truck' ? randomNumber(12, 18, 1) : 
              vehicleType === 'van' ? randomNumber(5, 7, 1) : 
              vehicleType === 'bus' ? randomNumber(9, 14, 1) : 
              randomNumber(4, 5, 1),
      weight: vehicleType === 'truck' ? randomNumber(10, 40, 1) : 
              vehicleType === 'van' ? randomNumber(2, 3.5, 1) : 
              vehicleType === 'bus' ? randomNumber(8, 15, 1) : 
              randomNumber(1.5, 2.5, 1)
    },
    driver: {
      id: driverId,
      name: `Driver ${(i % 15) + 1}`,
      licenseNumber: `DRV/202${Math.floor(Math.random() * 5)}/0${(i % 15) + 1}`,
      phone: `+48 ${600000000 + i}`
    },
    price: {
      amount: price.toFixed(2),
      currency: 'EUR',
      paymentMethod: randomElement(paymentMethods),
      paymentStatus: status === 'cancelled' ? 'refunded' : 
                    status === 'completed' || status === 'confirmed' ? 'paid' : 
                    'pending'
    },
    cabinType: vehicleType === 'truck' || vehicleType === 'bus' ? 'driver_cabin' : 'standard',
    mealPlan: randomElement(['none', 'breakfast', 'full_board']),
    bookingDate: randomDate(new Date(2025, 0, 1), new Date(2025, 3, 1)).toISOString(),
    lastModified: new Date().toISOString(),
    notes: i % 5 === 0 ? 'Special requirements for loading/unloading' : ''
  };
});

// Mock data for alerts
const mockAlerts = [
  { id: '1', type: 'departure_soon', title: 'Upcoming Departure', message: 'Ferry to Stockholm departs in 24 hours', severity: 'medium', date: new Date().toISOString() },
  { id: '2', type: 'booking_confirmation', title: 'Booking Confirmed', message: 'Your booking FERRY-10012 has been confirmed', severity: 'info', date: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString() },
  { id: '3', type: 'schedule_change', title: 'Schedule Change', message: 'Departure time changed for booking FERRY-10008', severity: 'high', date: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString() },
  { id: '4', type: 'payment_due', title: 'Payment Due', message: 'Payment for booking FERRY-10025 due in 3 days', severity: 'high', date: new Date(new Date().setDate(new Date().getDate() - 3)).toISOString() },
  { id: '5', type: 'price_alert', title: 'Price Alert', message: 'Price drop detected on Gdańsk-Stockholm route', severity: 'info', date: new Date(new Date().setDate(new Date().getDate() - 4)).toISOString() }
];

// Mock data for expense trends
const mockExpenseTrends = {
  daily: Array(30).fill().map((_, i) => ({
    date: new Date(new Date().setDate(new Date().getDate() - 29 + i)).toISOString().split('T')[0],
    amount: randomNumber(500, 1200, 2)
  })),
  weekly: Array(12).fill().map((_, i) => ({
    week: `Week ${i + 1}`,
    amount: randomNumber(3000, 7000, 2)
  })),
  monthly: Array(12).fill().map((_, i) => ({
    month: new Date(0, i).toLocaleString('default', { month: 'short' }),
    amount: randomNumber(12000, 25000, 2)
  })),
  quarterly: Array(4).fill().map((_, i) => ({
    quarter: `Q${i + 1}`,
    amount: randomNumber(35000, 70000, 2)
  }))
};

// Mock data for expense reports
const mockExpenseReports = {
  byVehicle: Array(15).fill().map((_, i) => ({
    vehicleId: `VEH-${1000 + i}`,
    vehiclePlate: `WZ ${10000 + i}`,
    vehicleType: randomElement(vehicleTypes),
    totalExpense: randomNumber(2000, 8000, 2),
    bookingsCount: randomNumber(3, 12),
    mostFrequentRoute: randomElement([
      'Gdańsk-Stockholm', 'Gdańsk-Copenhagen', 'Świnoujście-Ystad', 
      'Helsinki-Tallinn', 'Stockholm-Helsinki', 'Kiel-Oslo'
    ])
  })),
  byDriver: Array(10).fill().map((_, i) => ({
    driverId: `driver-${i + 1}`.padStart(9, '0'),
    driverName: `Driver ${i + 1}`,
    totalExpense: randomNumber(1500, 6000, 2),
    bookingsCount: randomNumber(2, 10),
    assignedVehicles: randomNumber(1, 3)
  })),
  byRoute: Array(8).fill().map((_, i) => {
    const route = mockFerryRoutes[i];
    return {
      routeId: route.id,
      routeName: `${route.origin}-${route.destination}`,
      operator: route.operator,
      totalExpense: randomNumber(5000, 15000, 2),
      frequency: randomNumber(8, 25),
      averageCostPerTrip: randomNumber(300, 800, 2)
    };
  }),
  byPeriod: {
    daily: Array(30).fill().map((_, i) => ({
      date: new Date(new Date().setDate(new Date().getDate() - 29 + i)).toISOString().split('T')[0],
      amount: randomNumber(300, 900, 2)
    })),
    weekly: Array(12).fill().map((_, i) => ({
      week: `Week ${i + 1}`,
      amount: randomNumber(2000, 5000, 2)
    })),
    monthly: Array(12).fill().map((_, i) => ({
      month: new Date(0, i).toLocaleString('default', { month: 'short' }),
      amount: randomNumber(8000, 18000, 2)
    }))
  }
};

// Mock data for calendar events
const mockCalendarEvents = Array(30).fill().map((_, i) => {
  const booking = mockBookings[i % mockBookings.length];
  return {
    id: `event-${i + 1}`,
    title: `${booking.route.origin} to ${booking.route.destination}`,
    start: booking.departureDate,
    end: booking.arrivalDate,
    bookingId: booking.id,
    vehicle: booking.vehicle.plate,
    driver: booking.driver.name,
    status: booking.status,
    type: 'ferry_booking'
  };
});

// Mock data for available connections search results
const generateConnectionResults = (origin, destination, departureDate) => {
  // Find matching routes
  const matchingRoutes = mockFerryRoutes.filter(route => 
    (route.origin.toLowerCase().includes(origin.toLowerCase()) || origin.toLowerCase().includes(route.origin.toLowerCase())) &&
    (route.destination.toLowerCase().includes(destination.toLowerCase()) || destination.toLowerCase().includes(route.destination.toLowerCase()))
  );
  
  if (matchingRoutes.length === 0) {
    // If no direct routes, try to find routes with similar names
    return mockFerryRoutes.slice(0, 3).map(route => {
      const operator = mockFerryOperators.find(op => op.routes.includes(route.id));
      const departureTime = new Date(departureDate);
      departureTime.setHours(Math.floor(Math.random() * 24));
      
      return {
        id: `conn-${generateId()}`,
        route: {
          id: route.id,
          origin: route.origin,
          destination: route.destination,
          distance: route.distance,
          duration: route.duration
        },
        operator: {
          id: operator.id,
          name: operator.name,
          logo: operator.logo
        },
        departureDate: departureTime.toISOString(),
        arrivalDate: new Date(departureTime.getTime() + (parseInt(route.duration) * 3600000)).toISOString(),
        availability: {
          car: randomNumber(0, 20),
          truck: randomNumber(0, 10),
          van: randomNumber(0, 15),
          bus: randomNumber(0, 5)
        },
        prices: {
          car: randomNumber(80, 150, 2),
          truck: randomNumber(200, 400, 2),
          van: randomNumber(120, 250, 2),
          bus: randomNumber(180, 350, 2)
        },
        amenities: ['restaurant', 'shop', 'wifi'],
        recommended: Math.random() > 0.7
      };
    });
  }
  
  // Generate 3-5 connections for each matching route with different times
  return matchingRoutes.flatMap(route => {
    const operator = mockFerryOperators.find(op => op.routes.includes(route.id));
    const connections = [];
    
    const numConnections = randomNumber(3, 5);
    for (let i = 0; i < numConnections; i++) {
      const departureTime = new Date(departureDate);
      departureTime.setHours((6 + i * 4) % 24); // Spread departures throughout the day
      
      connections.push({
        id: `conn-${generateId()}`,
        route: {
          id: route.id,
          origin: route.origin,
          destination: route.destination,
          distance: route.distance,
          duration: route.duration
        },
        operator: {
          id: operator.id,
          name: operator.name,
          logo: operator.logo
        },
        departureDate: departureTime.toISOString(),
        arrivalDate: new Date(departureTime.getTime() + (parseInt(route.duration) * 3600000)).toISOString(),
        availability: {
          car: randomNumber(0, 20),
          truck: randomNumber(0, 10),
          van: randomNumber(0, 15),
          bus: randomNumber(0, 5)
        },
        prices: {
          car: randomNumber(80, 150, 2),
          truck: randomNumber(200, 400, 2),
          van: randomNumber(120, 250, 2),
          bus: randomNumber(180, 350, 2)
        },
        amenities: ['restaurant', 'shop', 'wifi'],
        recommended: i === 1 // Mark one connection as recommended
      });
    }
    
    return connections;
  });
};

// Mock data for booking documents
const documentTypes = ['booking_confirmation', 'invoice', 'receipt', 'ticket', 'vehicle_declaration'];
const documentStatuses = ['valid', 'pending', 'expired'];

const generateBookingDocuments = (bookingId) => {
  return Array(randomNumber(2, 5)).fill().map((_, i) => {
    const type = documentTypes[i % documentTypes.length];
    return {
      id: `doc-${bookingId}-${i + 1}`,
      type: type,
      name: `${type.replace('_', ' ').toUpperCase()} - ${bookingId}`,
      uploadDate: randomDate(new Date(2025, 0, 1), new Date()).toISOString(),
      status: randomElement(documentStatuses),
      fileSize: randomNumber(100, 5000),
      fileType: 'pdf',
      url: `https://example.com/documents/${bookingId}/${type}.pdf`
    };
  });
};

/**
 * Get ferry bookings dashboard data
 * @param {Object} params - Query parameters
 * @param {string} params.timeRange - Time range for data (day, week, month, year)
 * @returns {Promise<Object>} Dashboard data including KPIs, map data, and alerts
 */
export const getFerryBookingsDashboard = async (params = {}) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Return mock dashboard data
  return {
    kpi: mockKpiData,
    mapData: mockMapData,
    expenseTrends: mockExpenseTrends,
    alerts: mockAlerts,
    upcomingDepartures: mockBookings
      .filter(booking => booking.status === 'confirmed' && new Date(booking.departureDate) > new Date())
      .sort((a, b) => new Date(a.departureDate) - new Date(b.departureDate))
      .slice(0, 5)
  };
};

/**
 * Search for available ferry connections
 * @param {Object} params - Search parameters
 * @param {string} params.origin - Origin location
 * @param {string} params.destination - Destination location
 * @param {string} params.departureDate - Departure date
 * @param {string} params.returnDate - Return date (optional)
 * @param {string} params.vehicleType - Vehicle type
 * @returns {Promise<Object>} Available ferry connections
 */
export const searchFerryConnections = async (params = {}) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Generate outbound connections
  const outboundConnections = generateConnectionResults(
    params.origin || 'Gdańsk',
    params.destination || 'Stockholm',
    params.departureDate || new Date().toISOString()
  );
  
  // Generate return connections if returnDate is provided
  let returnConnections = [];
  if (params.returnDate) {
    returnConnections = generateConnectionResults(
      params.destination || 'Stockholm',
      params.origin || 'Gdańsk',
      params.returnDate
    );
  }
  
  return {
    outbound: outboundConnections,
    return: returnConnections,
    vehicleType: params.vehicleType || 'truck'
  };
};

/**
 * Get ferry bookings list
 * @param {Object} params - Query parameters
 * @param {string} params.status - Filter by booking status
 * @param {string} params.search - Search term
 * @param {string} params.dateFrom - Filter by date from
 * @param {string} params.dateTo - Filter by date to
 * @param {number} params.page - Page number
 * @param {number} params.limit - Items per page
 * @returns {Promise<Object>} Ferry bookings data
 */
export const getFerryBookings = async (params = {}) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  let filteredBookings = [...mockBookings];
  
  // Apply status filter
  if (params.status && params.status !== 'all') {
    filteredBookings = filteredBookings.filter(b => b.status === params.status);
  }
  
  // Apply date range filter
  if (params.dateFrom) {
    const dateFrom = new Date(params.dateFrom);
    filteredBookings = filteredBookings.filter(b => new Date(b.departureDate) >= dateFrom);
  }
  
  if (params.dateTo) {
    const dateTo = new Date(params.dateTo);
    filteredBookings = filteredBookings.filter(b => new Date(b.departureDate) <= dateTo);
  }
  
  // Apply search filter
  if (params.search) {
    const searchLower = params.search.toLowerCase();
    filteredBookings = filteredBookings.filter(b => 
      b.id.toLowerCase().includes(searchLower) ||
      b.route.origin.toLowerCase().includes(searchLower) ||
      b.route.destination.toLowerCase().includes(searchLower) ||
      b.operator.name.toLowerCase().includes(searchLower) ||
      b.vehicle.plate.toLowerCase().includes(searchLower) ||
      b.driver.name.toLowerCase().includes(searchLower)
    );
  }
  
  // Calculate pagination
  const page = params.page || 1;
  const limit = params.limit || 10;
  const totalItems = filteredBookings.length;
  const totalPages = Math.ceil(totalItems / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedBookings = filteredBookings.slice(startIndex, endIndex);
  
  return {
    items: paginatedBookings,
    pagination: {
      page,
      limit,
      totalItems,
      totalPages
    }
  };
};

/**
 * Get ferry booking details
 * @param {string} id - Booking ID
 * @returns {Promise<Object>} Booking details
 */
export const getFerryBookingDetails = async (id) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Find booking by ID
  const booking = mockBookings.find(b => b.id === id);
  
  if (!booking) {
    throw new Error(`Booking with ID ${id} not found`);
  }
  
  // Generate additional details
  const documents = generateBookingDocuments(id);
  
  // Return booking with additional details
  return {
    ...booking,
    documents,
    checkInInfo: {
      checkInTime: new Date(new Date(booking.departureDate).getTime() - 2 * 60 * 60 * 1000).toISOString(),
      terminal: `Terminal ${Math.floor(Math.random() * 5) + 1}`,
      boardingTime: new Date(new Date(booking.departureDate).getTime() - 30 * 60 * 1000).toISOString(),
      specialInstructions: booking.vehicle.type === 'truck' ? 'Please arrive 3 hours before departure for customs clearance' : ''
    },
    vessel: {
      name: `${booking.operator.name} ${['Star', 'Explorer', 'Navigator', 'Voyager', 'Princess'][Math.floor(Math.random() * 5)]}`,
      capacity: randomNumber(800, 2500),
      builtYear: randomNumber(2000, 2020),
      facilities: ['restaurant', 'cafe', 'shop', 'wifi', 'cabin accommodation']
    },
    history: [
      { date: booking.bookingDate, action: 'Booking created', user: 'System' },
      { date: new Date(new Date(booking.bookingDate).getTime() + 1 * 24 * 60 * 60 * 1000).toISOString(), action: 'Payment received', user: 'System' },
      { date: new Date(new Date(booking.bookingDate).getTime() + 1 * 24 * 60 * 60 * 1000 + 30 * 60 * 1000).toISOString(), action: 'Booking confirmed', user: 'System' },
      { date: booking.lastModified, action: 'Booking updated', user: 'Admin' }
    ]
  };
};

/**
 * Create new ferry booking
 * @param {Object} bookingData - Booking data
 * @returns {Promise<Object>} Created booking
 */
export const createFerryBooking = async (bookingData) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 700));
  
  // Generate new booking ID
  const newId = `FERRY-${10000 + mockBookings.length}`;
  
  // Create new booking
  const newBooking = {
    id: newId,
    ...bookingData,
    status: 'pending',
    bookingDate: new Date().toISOString(),
    lastModified: new Date().toISOString()
  };
  
  // In a real implementation, we would add the booking to the database
  // For mock purposes, we'll just return the new booking
  
  return {
    success: true,
    booking: newBooking
  };
};

/**
 * Update ferry booking
 * @param {string} id - Booking ID
 * @param {Object} bookingData - Updated booking data
 * @returns {Promise<Object>} Updated booking
 */
export const updateFerryBooking = async (id, bookingData) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Find booking by ID
  const bookingIndex = mockBookings.findIndex(b => b.id === id);
  
  if (bookingIndex === -1) {
    throw new Error(`Booking with ID ${id} not found`);
  }
  
  // In a real implementation, we would update the booking in the database
  // For mock purposes, we'll just return success
  
  return {
    success: true,
    booking: {
      ...mockBookings[bookingIndex],
      ...bookingData,
      lastModified: new Date().toISOString()
    }
  };
};

/**
 * Cancel ferry booking
 * @param {string} id - Booking ID
 * @returns {Promise<Object>} Cancellation result
 */
export const cancelFerryBooking = async (id) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 400));
  
  // Find booking by ID
  const bookingIndex = mockBookings.findIndex(b => b.id === id);
  
  if (bookingIndex === -1) {
    throw new Error(`Booking with ID ${id} not found`);
  }
  
  // In a real implementation, we would update the booking status in the database
  // For mock purposes, we'll just return success
  
  return {
    success: true,
    booking: {
      ...mockBookings[bookingIndex],
      status: 'cancelled',
      lastModified: new Date().toISOString()
    }
  };
};

/**
 * Get ferry operators
 * @param {Object} params - Query parameters
 * @param {string} params.country - Filter by country
 * @param {string} params.search - Search term
 * @param {number} params.page - Page number
 * @param {number} params.limit - Items per page
 * @returns {Promise<Object>} Ferry operators data
 */
export const getFerryOperators = async (params = {}) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 400));
  
  let filteredOperators = [...mockFerryOperators];
  
  // Apply country filter
  if (params.country && params.country !== 'all') {
    filteredOperators = filteredOperators.filter(op => op.country === params.country);
  }
  
  // Apply search filter
  if (params.search) {
    const searchLower = params.search.toLowerCase();
    filteredOperators = filteredOperators.filter(op => 
      op.name.toLowerCase().includes(searchLower) ||
      op.country.toLowerCase().includes(searchLower)
    );
  }
  
  // Calculate pagination
  const page = params.page || 1;
  const limit = params.limit || 10;
  const totalItems = filteredOperators.length;
  const totalPages = Math.ceil(totalItems / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedOperators = filteredOperators.slice(startIndex, endIndex);
  
  return {
    items: paginatedOperators,
    pagination: {
      page,
      limit,
      totalItems,
      totalPages
    }
  };
};

/**
 * Get ferry operator details
 * @param {string} id - Operator ID
 * @returns {Promise<Object>} Operator details
 */
export const getFerryOperatorDetails = async (id) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Find operator by ID
  const operator = mockFerryOperators.find(op => op.id === id);
  
  if (!operator) {
    throw new Error(`Operator with ID ${id} not found`);
  }
  
  // Find routes for this operator
  const routes = mockFerryRoutes.filter(route => operator.routes.includes(route.id));
  
  // Return operator with routes
  return {
    ...operator,
    routes,
    contactInfo: {
      address: `${operator.headquarters}`,
      phone: operator.supportPhone,
      email: operator.supportEmail,
      website: operator.website
    },
    serviceQuality: {
      punctuality: randomNumber(70, 95),
      cleanliness: randomNumber(75, 95),
      customerService: randomNumber(70, 95),
      overallRating: randomNumber(3.5, 4.8, 1)
    }
  };
};

/**
 * Get ferry routes for operator
 * @param {string} operatorId - Operator ID
 * @returns {Promise<Object>} Ferry routes
 */
export const getFerryRoutes = async (operatorId) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 400));
  
  // Find operator by ID
  const operator = mockFerryOperators.find(op => op.id === operatorId);
  
  if (!operator) {
    throw new Error(`Operator with ID ${operatorId} not found`);
  }
  
  // Find routes for this operator
  const routes = mockFerryRoutes.filter(route => operator.routes.includes(route.id));
  
  // Return routes with additional details
  return {
    operator: {
      id: operator.id,
      name: operator.name
    },
    routes: routes.map(route => ({
      ...route,
      schedule: [
        { day: 'Monday', departures: ['08:00', '16:00', '23:00'] },
        { day: 'Tuesday', departures: ['08:00', '16:00', '23:00'] },
        { day: 'Wednesday', departures: ['08:00', '16:00', '23:00'] },
        { day: 'Thursday', departures: ['08:00', '16:00', '23:00'] },
        { day: 'Friday', departures: ['08:00', '14:00', '18:00', '23:00'] },
        { day: 'Saturday', departures: ['10:00', '18:00', '23:00'] },
        { day: 'Sunday', departures: ['10:00', '16:00', '23:00'] }
      ],
      prices: {
        car: randomNumber(80, 150, 2),
        truck: randomNumber(200, 400, 2),
        van: randomNumber(120, 250, 2),
        bus: randomNumber(180, 350, 2)
      }
    }))
  };
};

/**
 * Get available vehicles for booking
 * @param {Object} params - Query parameters
 * @param {string} params.date - Date of availability
 * @param {string} params.vehicleType - Filter by vehicle type
 * @returns {Promise<Object>} Available vehicles
 */
export const getAvailableVehicles = async (params = {}) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Use mockVehicles from Road Tolls service if available, otherwise generate mock data
  const mockVehicles = Array(20).fill().map((_, i) => ({
    id: `VEH-${1000 + i}`,
    plate: `WZ ${10000 + i}`,
    type: randomElement(vehicleTypes),
    model: randomElement(['Volvo FH16', 'Mercedes Actros', 'Scania R450', 'DAF XF', 'MAN TGX']),
    year: randomNumber(2018, 2025),
    length: randomNumber(4, 18, 1),
    weight: randomNumber(1.5, 40, 1),
    status: 'active',
    currentLocation: randomElement([
      'Warsaw, Poland', 'Poznań, Poland', 'Gdańsk, Poland', 
      'Berlin, Germany', 'Prague, Czech Republic', 'Vienna, Austria'
    ])
  }));
  
  let filteredVehicles = [...mockVehicles];
  
  // Apply vehicle type filter
  if (params.vehicleType && params.vehicleType !== 'all') {
    filteredVehicles = filteredVehicles.filter(v => v.type === params.vehicleType);
  }
  
  // Apply date filter (simulate some vehicles being unavailable on certain dates)
  if (params.date) {
    const dateObj = new Date(params.date);
    const dayOfWeek = dateObj.getDay();
    
    // Make some vehicles unavailable on weekends
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      filteredVehicles = filteredVehicles.filter((_, i) => i % 3 !== 0);
    }
    
    // Make some vehicles unavailable on specific dates (e.g., first day of month)
    if (dateObj.getDate() === 1) {
      filteredVehicles = filteredVehicles.filter((_, i) => i % 4 !== 0);
    }
  }
  
  return {
    date: params.date || new Date().toISOString().split('T')[0],
    vehicles: filteredVehicles
  };
};

/**
 * Get available drivers for booking
 * @param {Object} params - Query parameters
 * @param {string} params.date - Date of availability
 * @param {string} params.licenseType - Filter by license type
 * @returns {Promise<Object>} Available drivers
 */
export const getAvailableDrivers = async (params = {}) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Generate mock drivers data
  const mockDrivers = Array(15).fill().map((_, i) => ({
    id: `driver-${i + 1}`.padStart(9, '0'),
    name: `Driver ${i + 1}`,
    licenseNumber: `DRV/202${Math.floor(Math.random() * 5)}/0${i + 1}`,
    licenseType: randomElement(['B', 'C', 'C+E', 'D']),
    status: 'active',
    experience: randomNumber(1, 15),
    languages: randomElement([
      ['Polish', 'English'],
      ['Polish', 'English', 'German'],
      ['Polish', 'English', 'Russian'],
      ['Polish', 'German']
    ]),
    currentLocation: randomElement([
      'Warsaw, Poland', 'Poznań, Poland', 'Gdańsk, Poland', 
      'Berlin, Germany', 'Prague, Czech Republic', 'Vienna, Austria'
    ])
  }));
  
  let filteredDrivers = [...mockDrivers];
  
  // Apply license type filter
  if (params.licenseType && params.licenseType !== 'all') {
    filteredDrivers = filteredDrivers.filter(d => d.licenseType === params.licenseType);
  }
  
  // Apply date filter (simulate some drivers being unavailable on certain dates)
  if (params.date) {
    const dateObj = new Date(params.date);
    const dayOfWeek = dateObj.getDay();
    
    // Make some drivers unavailable on weekends
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      filteredDrivers = filteredDrivers.filter((_, i) => i % 3 !== 0);
    }
    
    // Make some drivers unavailable on specific dates (e.g., first day of month)
    if (dateObj.getDate() === 1) {
      filteredDrivers = filteredDrivers.filter((_, i) => i % 4 !== 0);
    }
  }
  
  return {
    date: params.date || new Date().toISOString().split('T')[0],
    drivers: filteredDrivers
  };
};

/**
 * Generate ferry bookings report
 * @param {Object} params - Report parameters
 * @param {string} params.dateFrom - Start date
 * @param {string} params.dateTo - End date
 * @param {string} params.groupBy - Group by (vehicle, driver, route, operator)
 * @param {string} params.format - Report format (pdf, csv, xlsx)
 * @returns {Promise<Object>} Report data or download URL
 */
export const generateFerryBookingsReport = async (params = {}) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Determine which report data to return based on groupBy parameter
  let reportData;
  switch (params.groupBy) {
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
      reportData = mockExpenseReports.byPeriod;
      break;
    default:
      reportData = mockExpenseReports.byVehicle;
  }
  
  // Return report data and mock download URL
  return {
    success: true,
    reportData,
    downloadUrl: `https://example.com/reports/ferry_bookings_${params.groupBy}_${params.dateFrom}_${params.dateTo}.${params.format || 'pdf'}`
  };
};

/**
 * Get ferry booking documents
 * @param {string} id - Booking ID
 * @returns {Promise<Object>} Booking documents
 */
export const getFerryBookingDocuments = async (id) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Generate documents for this booking
  const documents = generateBookingDocuments(id);
  
  return {
    bookingId: id,
    documents
  };
};

/**
 * Upload ferry booking document
 * @param {string} id - Booking ID
 * @param {Object} documentData - Document data
 * @returns {Promise<Object>} Upload result
 */
export const uploadFerryBookingDocument = async (id, documentData) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 600));
  
  // In a real implementation, we would upload the document and add it to the database
  // For mock purposes, we'll just return success
  
  return {
    success: true,
    document: {
      id: `doc-${id}-${generateId().substring(0, 8)}`,
      type: documentData.type || 'other',
      name: documentData.name || `Document ${new Date().toISOString()}`,
      uploadDate: new Date().toISOString(),
      status: 'valid',
      fileSize: documentData.fileSize || randomNumber(100, 5000),
      fileType: documentData.fileType || 'pdf',
      url: `https://example.com/documents/${id}/${documentData.name || 'document'}.${documentData.fileType || 'pdf'}`
    }
  };
};

/**
 * Get calendar events for ferry bookings
 * @param {Object} params - Query parameters
 * @param {string} params.start - Start date
 * @param {string} params.end - End date
 * @returns {Promise<Object>} Calendar events
 */
export const getCalendarEvents = async (params = {}) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 400));
  
  let filteredEvents = [...mockCalendarEvents];
  
  // Apply date range filter
  if (params.start) {
    const startDate = new Date(params.start);
    filteredEvents = filteredEvents.filter(event => new Date(event.start) >= startDate);
  }
  
  if (params.end) {
    const endDate = new Date(params.end);
    filteredEvents = filteredEvents.filter(event => new Date(event.start) <= endDate);
  }
  
  return {
    events: filteredEvents
  };
};
