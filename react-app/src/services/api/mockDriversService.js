/**
 * Mock service for providing test data for the Drivers component
 */
const mockDriversService = {
  /**
   * Get drivers list with filtering and pagination
   * @param {string} status - Filter by status (active, inactive, on_leave)
   * @param {string} vehicle - Filter by vehicle assignment (assigned, unassigned)
   * @param {string} search - Search term
   * @param {number} page - Page number
   * @param {number} limit - Items per page
   * @returns {Promise<Object>} Drivers data
   */
  getDrivers: async (status, vehicle, search, page = 1, limit = 10) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock data
    const allDrivers = [
      {
        id: 'driver-001',
        name: 'Jan Kowalski',
        licenseNumber: 'DRV/2020/001',
        status: 'active',
        safetyScore: 92,
        currentVehicle: 'VEH-2023-001',
        currentLocation: { latitude: 52.2297, longitude: 21.0122 },
        lastUpdate: '2025-04-14T08:30:00Z'
      },
      {
        id: 'driver-002',
        name: 'Anna Nowak',
        licenseNumber: 'DRV/2021/045',
        status: 'active',
        safetyScore: 88,
        currentVehicle: 'VEH-2022-015',
        currentLocation: { latitude: 52.4064, longitude: 16.9252 },
        lastUpdate: '2025-04-14T09:15:00Z'
      },
      {
        id: 'driver-003',
        name: 'Piotr Wiśniewski',
        licenseNumber: 'DRV/2019/078',
        status: 'on_leave',
        safetyScore: 75,
        currentVehicle: null,
        currentLocation: null,
        lastUpdate: '2025-04-10T14:45:00Z'
      },
      {
        id: 'driver-004',
        name: 'Magdalena Dąbrowska',
        licenseNumber: 'DRV/2022/102',
        status: 'active',
        safetyScore: 95,
        currentVehicle: 'VEH-2023-008',
        currentLocation: { latitude: 50.0647, longitude: 19.9450 },
        lastUpdate: '2025-04-14T08:45:00Z'
      },
      {
        id: 'driver-005',
        name: 'Tomasz Lewandowski',
        licenseNumber: 'DRV/2020/056',
        status: 'inactive',
        safetyScore: 62,
        currentVehicle: null,
        currentLocation: null,
        lastUpdate: '2025-04-05T11:20:00Z'
      },
      {
        id: 'driver-006',
        name: 'Katarzyna Wójcik',
        licenseNumber: 'DRV/2021/089',
        status: 'active',
        safetyScore: 87,
        currentVehicle: 'VEH-2022-042',
        currentLocation: { latitude: 51.1079, longitude: 17.0385 },
        lastUpdate: '2025-04-14T09:30:00Z'
      },
      {
        id: 'driver-007',
        name: 'Michał Kamiński',
        licenseNumber: 'DRV/2019/034',
        status: 'active',
        safetyScore: 79,
        currentVehicle: 'VEH-2021-027',
        currentLocation: { latitude: 53.1235, longitude: 18.0084 },
        lastUpdate: '2025-04-14T08:15:00Z'
      },
      {
        id: 'driver-008',
        name: 'Aleksandra Zielińska',
        licenseNumber: 'DRV/2022/115',
        status: 'on_leave',
        safetyScore: 91,
        currentVehicle: null,
        currentLocation: null,
        lastUpdate: '2025-04-12T16:40:00Z'
      },
      {
        id: 'driver-009',
        name: 'Krzysztof Szymański',
        licenseNumber: 'DRV/2020/067',
        status: 'active',
        safetyScore: 84,
        currentVehicle: 'VEH-2023-019',
        currentLocation: { latitude: 54.3520, longitude: 18.6466 },
        lastUpdate: '2025-04-14T09:00:00Z'
      },
      {
        id: 'driver-010',
        name: 'Monika Woźniak',
        licenseNumber: 'DRV/2021/092',
        status: 'inactive',
        safetyScore: 58,
        currentVehicle: null,
        currentLocation: null,
        lastUpdate: '2025-04-08T10:25:00Z'
      },
      {
        id: 'driver-011',
        name: 'Grzegorz Duda',
        licenseNumber: 'DRV/2019/023',
        status: 'active',
        safetyScore: 89,
        currentVehicle: 'VEH-2022-031',
        currentLocation: { latitude: 51.7592, longitude: 19.4560 },
        lastUpdate: '2025-04-14T08:50:00Z'
      },
      {
        id: 'driver-012',
        name: 'Joanna Mazur',
        licenseNumber: 'DRV/2022/108',
        status: 'active',
        safetyScore: 93,
        currentVehicle: 'VEH-2023-005',
        currentLocation: { latitude: 50.2649, longitude: 19.0238 },
        lastUpdate: '2025-04-14T09:20:00Z'
      },
      {
        id: 'driver-013',
        name: 'Marcin Kaczmarek',
        licenseNumber: 'DRV/2020/049',
        status: 'on_leave',
        safetyScore: 81,
        currentVehicle: null,
        currentLocation: null,
        lastUpdate: '2025-04-11T15:10:00Z'
      },
      {
        id: 'driver-014',
        name: 'Natalia Piotrowska',
        licenseNumber: 'DRV/2021/076',
        status: 'active',
        safetyScore: 86,
        currentVehicle: 'VEH-2022-038',
        currentLocation: { latitude: 52.4064, longitude: 16.9252 },
        lastUpdate: '2025-04-14T08:40:00Z'
      },
      {
        id: 'driver-015',
        name: 'Damian Michalski',
        licenseNumber: 'DRV/2019/061',
        status: 'inactive',
        safetyScore: 65,
        currentVehicle: null,
        currentLocation: null,
        lastUpdate: '2025-04-07T12:35:00Z'
      }
    ];
    
    // Apply filters
    let filteredDrivers = [...allDrivers];
    
    if (status && status !== 'all') {
      filteredDrivers = filteredDrivers.filter(driver => driver.status === status);
    }
    
    if (vehicle && vehicle !== 'all') {
      if (vehicle === 'assigned') {
        filteredDrivers = filteredDrivers.filter(driver => driver.currentVehicle !== null);
      } else if (vehicle === 'unassigned') {
        filteredDrivers = filteredDrivers.filter(driver => driver.currentVehicle === null);
      }
    }
    
    if (search) {
      const searchLower = search.toLowerCase();
      filteredDrivers = filteredDrivers.filter(driver => 
        driver.name.toLowerCase().includes(searchLower) || 
        driver.licenseNumber.toLowerCase().includes(searchLower) ||
        (driver.currentVehicle && driver.currentVehicle.toLowerCase().includes(searchLower))
      );
    }
    
    // Calculate pagination
    const total = filteredDrivers.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedDrivers = filteredDrivers.slice(startIndex, endIndex);
    
    return {
      total,
      page,
      limit,
      drivers: paginatedDrivers
    };
  },

  /**
   * Get driver details by ID
   * @param {string} id - Driver ID
   * @returns {Promise<Object>} Driver details
   */
  getDriverDetails: async (id) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Mock data
    const driverDetails = {
      id,
      personalInfo: {
        name: id === 'driver-001' ? 'Jan Kowalski' : 
              id === 'driver-002' ? 'Anna Nowak' : 
              id === 'driver-003' ? 'Piotr Wiśniewski' : 'Kierowca',
        dateOfBirth: '1985-06-15',
        phoneNumber: '+48 123 456 789',
        email: 'jan.kowalski@fleetapp.com',
        address: 'ul. Przykładowa 123, 00-001 Warszawa',
        emergencyContact: 'Maria Kowalska, +48 987 654 321'
      },
      employmentInfo: {
        employeeId: 'EMP-2020-001',
        hireDate: '2020-03-10',
        position: 'Kierowca kategorii C+E',
        department: 'Transport międzynarodowy',
        supervisor: 'Adam Nowak',
        contractType: 'Umowa o pracę',
        workSchedule: 'Pełny etat'
      },
      qualifications: {
        licenseNumber: 'DRV/2020/001',
        licenseType: 'C+E',
        licenseIssueDate: '2018-05-20',
        licenseExpiryDate: '2028-05-19',
        additionalCertificates: [
          { name: 'Świadectwo kwalifikacji zawodowej', issueDate: '2019-01-15', expiryDate: '2024-01-14' },
          { name: 'ADR - przewóz materiałów niebezpiecznych', issueDate: '2021-03-10', expiryDate: '2026-03-09' }
        ]
      }
    };
    
    return driverDetails;
  },

  /**
   * Get driver documents
   * @param {string} id - Driver ID
   * @returns {Promise<Object>} Driver documents
   */
  getDriverDocuments: async (id) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 400));
    
    // Mock data
    const documents = {
      documents: [
        {
          id: 'doc-001',
          type: 'Prawo jazdy',
          number: 'DRV/2020/001',
          issuedDate: '2018-05-20',
          expiryDate: '2028-05-19',
          status: 'valid'
        },
        {
          id: 'doc-002',
          type: 'Świadectwo kwalifikacji zawodowej',
          number: 'CPC/2019/123',
          issuedDate: '2019-01-15',
          expiryDate: '2024-01-14',
          status: 'valid'
        },
        {
          id: 'doc-003',
          type: 'ADR - przewóz materiałów niebezpiecznych',
          number: 'ADR/2021/456',
          issuedDate: '2021-03-10',
          expiryDate: '2026-03-09',
          status: 'valid'
        },
        {
          id: 'doc-004',
          type: 'Badania lekarskie',
          number: 'MED/2023/789',
          issuedDate: '2023-02-05',
          expiryDate: '2025-02-04',
          status: 'valid'
        },
        {
          id: 'doc-005',
          type: 'Badania psychologiczne',
          number: 'PSY/2023/321',
          issuedDate: '2023-02-10',
          expiryDate: '2025-02-09',
          status: 'valid'
        }
      ],
      upcomingExpirations: [
        {
          id: 'doc-002',
          type: 'Świadectwo kwalifikacji zawodowej',
          expiryDate: '2024-01-14',
          daysRemaining: 275
        }
      ]
    };
    
    return documents;
  },

  /**
   * Get driver performance data
   * @param {string} id - Driver ID
   * @returns {Promise<Object>} Driver performance data
   */
  getDriverPerformance: async (id) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Mock data
    const performanceData = {
      driver: id,
      overallScore: 85,
      mileage: {
        current: {
          month: 'Kwiecień 2025',
          value: 4250,
          target: 5000,
          unit: 'km'
        },
        history: [
          { month: 'Styczeń 2025', value: 4800 },
          { month: 'Luty 2025', value: 4500 },
          { month: 'Marzec 2025', value: 4900 },
          { month: 'Kwiecień 2025', value: 4250 }
        ]
      },
      fuelConsumption: {
        current: {
          month: 'Kwiecień 2025',
          value: 28.5,
          target: 30,
          unit: 'l/100km'
        },
        history: [
          { month: 'Styczeń 2025', value: 31.2 },
          { month: 'Luty 2025', value: 30.5 },
          { month: 'Marzec 2025', value: 29.8 },
          { month: 'Kwiecień 2025', value: 28.5 }
        ]
      },
      deliveryTimes: {
        current: {
          month: 'Kwiecień 2025',
          value: 92,
          target: 90,
          unit: '%'
        },
        history: [
          { month: 'Styczeń 2025', value: 88 },
          { month: 'Luty 2025', value: 90 },
          { month: 'Marzec 2025', value: 91 },
          { month: 'Kwiecień 2025', value: 92 }
        ]
      },
      drivingStyle: [
        { category: 'Hamowanie', value: 82 },
        { category: 'Przyspieszanie', value: 78 },
        { category: 'Prędkość', value: 90 },
        { category: 'Obroty silnika', value: 85 },
        { category: 'Czas pracy', value: 95 }
      ],
      ratings: {
        current: {
          month: 'Kwiecień 2025',
          value: 4.7,
          target: 4.5,
          unit: '/5'
        },
        history: [
          { month: 'Styczeń 2025', value: 4.5 },
          { month: 'Luty 2025', value: 4.6 },
          { month: 'Marzec 2025', value: 4.6 },
          { month: 'Kwiecień 2025', value: 4.7 }
        ]
      },
      recommendations: [
        { category: 'Hamowanie', recommendation: 'Unikaj gwałtownego hamowania, planuj zatrzymania z wyprzedzeniem.' },
        { category: 'Przyspieszanie', recommendation: 'Stosuj bardziej płynne przyspieszanie, unikaj gwałtownego wciskania pedału gazu.' }
      ]
    };
    
    return performanceData;
  },

  /**
   * Get driver schedule
   * @param {string} id - Driver ID
   * @returns {Promise<Object>} Driver schedule
   */
  getDriverSchedule: async (id) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 350));
    
    // Mock data
    const schedule = {
      driver: id,
      schedule: [
        {
          id: 'sch-001',
          type: 'Trasa',
          startDate: '2025-04-15T06:00:00Z',
          endDate: '2025-04-15T14:00:00Z',
          status: 'scheduled',
          description: 'Warszawa - Poznań, dostawa towarów'
        },
        {
          id: 'sch-002',
          type: 'Trasa',
          startDate: '2025-04-16T07:00:00Z',
          endDate: '2025-04-16T15:00:00Z',
          status: 'scheduled',
          description: 'Poznań - Wrocław, dostawa towarów'
        },
        {
          id: 'sch-003',
          type: 'Szkolenie',
          startDate: '2025-04-17T09:00:00Z',
          endDate: '2025-04-17T13:00:00Z',
          status: 'scheduled',
          description: 'Szkolenie z bezpieczeństwa jazdy'
        },
        {
          id: 'sch-004',
          type: 'Urlop',
          startDate: '2025-04-18T00:00:00Z',
          endDate: '2025-04-20T23:59:59Z',
          status: 'scheduled',
          description: 'Urlop wypoczynkowy'
        },
        {
          id: 'sch-005',
          type: 'Trasa',
          startDate: '2025-04-21T06:00:00Z',
          endDate: '2025-04-21T16:00:00Z',
          status: 'scheduled',
          description: 'Warszawa - Gdańsk, dostawa towarów'
        },
        {
          id: 'sch-006',
          type: 'Przegląd',
          startDate: '2025-04-22T08:00:00Z',
          endDate: '2025-04-22T10:00:00Z',
          status: 'scheduled',
          description: 'Przegląd techniczny pojazdu'
        },
        {
          id: 'sch-007',
          type: 'Trasa',
          startDate: '2025-04-22T12:00:00Z',
          endDate: '2025-04-22T20:00:00Z',
          status: 'scheduled',
          description: 'Warszawa - Łódź, dostawa towarów'
        }
      ]
    };
    
    return schedule;
  },

  /**
   * Get drivers KPI data
   * @returns {Promise<Object>} Drivers KPI data
   */
  getDriversKPI: async () => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 450));
    
    // Mock data
    const kpiData = {
      activeDrivers: 10,
      activeDriversTrend: 5,
      averagePerformance: 85,
      averagePerformanceTrend: 2,
      validDocumentsPercentage: 92,
      validDocumentsTrend: -1,
      absenceRate: 8,
      absenceRateTrend: -3
    };
    
    return kpiData;
  }
};

export default mockDriversService;
