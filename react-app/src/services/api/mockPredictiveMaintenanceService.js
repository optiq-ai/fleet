import { delay } from '../../utils';

/**
 * Mock service for Predictive Maintenance data
 * This service provides mock data for the PredictiveMaintenance component
 */
class MockPredictiveMaintenanceService {
  /**
   * Get maintenance alerts
   * @param {string} [priority] - Alert priority filter
   * @param {string} [vehicle] - Vehicle filter
   * @param {string} [component] - Component filter
   * @param {string} [status] - Status filter
   * @param {number} [page=1] - Page number
   * @param {number} [limit=10] - Results per page
   * @returns {Promise<Object>} Maintenance alerts response
   */
  async getAlerts(
    priority,
    vehicle,
    component,
    status,
    page = 1,
    limit = 10
  ) {
    await delay(500);
    
    let alerts = [
      {
        id: 'ALT-001',
        priority: 'high',
        vehicle: 'WDB9061331N123456',
        component: 'Układ hamulcowy',
        forecast: 'Zużycie klocków hamulcowych',
        confidence: '95%',
        status: 'new'
      },
      {
        id: 'ALT-002',
        priority: 'medium',
        vehicle: 'WDB9634031L654321',
        component: 'Akumulator',
        forecast: 'Spadek pojemności akumulatora',
        confidence: '82%',
        status: 'scheduled'
      },
      {
        id: 'ALT-003',
        priority: 'low',
        vehicle: 'WDB9634031L654321',
        component: 'Filtr powietrza',
        forecast: 'Zanieczyszczenie filtra powietrza',
        confidence: '78%',
        status: 'inProgress'
      },
      {
        id: 'ALT-004',
        priority: 'high',
        vehicle: 'WDB9061331N123456',
        component: 'Alternator',
        forecast: 'Awaria alternatora',
        confidence: '91%',
        status: 'new'
      },
      {
        id: 'ALT-005',
        priority: 'medium',
        vehicle: 'WDB9634031L987654',
        component: 'Układ chłodzenia',
        forecast: 'Wyciek płynu chłodzącego',
        confidence: '85%',
        status: 'new'
      },
      {
        id: 'ALT-006',
        priority: 'low',
        vehicle: 'WDB9634031L987654',
        component: 'Pasek klinowy',
        forecast: 'Zużycie paska klinowego',
        confidence: '72%',
        status: 'completed'
      },
      {
        id: 'ALT-007',
        priority: 'high',
        vehicle: 'WDB9061331N123456',
        component: 'Turbosprężarka',
        forecast: 'Uszkodzenie turbosprężarki',
        confidence: '88%',
        status: 'scheduled'
      },
      {
        id: 'ALT-008',
        priority: 'medium',
        vehicle: 'WDB9634031L654321',
        component: 'Wtryskiwacze',
        forecast: 'Nieefektywna praca wtryskiwaczy',
        confidence: '79%',
        status: 'new'
      },
      {
        id: 'ALT-009',
        priority: 'low',
        vehicle: 'WDB9634031L987654',
        component: 'Filtr paliwa',
        forecast: 'Zanieczyszczenie filtra paliwa',
        confidence: '75%',
        status: 'inProgress'
      },
      {
        id: 'ALT-010',
        priority: 'high',
        vehicle: 'WDB9061331N123456',
        component: 'Sprzęgło',
        forecast: 'Zużycie tarczy sprzęgła',
        confidence: '93%',
        status: 'new'
      },
      {
        id: 'ALT-011',
        priority: 'medium',
        vehicle: 'WDB9634031L654321',
        component: 'Amortyzatory',
        forecast: 'Zużycie amortyzatorów',
        confidence: '81%',
        status: 'scheduled'
      },
      {
        id: 'ALT-012',
        priority: 'low',
        vehicle: 'WDB9634031L987654',
        component: 'Łożyska kół',
        forecast: 'Zużycie łożysk kół',
        confidence: '76%',
        status: 'completed'
      }
    ];
    
    // Apply filters
    if (priority && priority !== 'all') {
      alerts = alerts.filter(alert => alert.priority === priority);
    }
    
    if (vehicle) {
      alerts = alerts.filter(alert => alert.vehicle.includes(vehicle));
    }
    
    if (component) {
      alerts = alerts.filter(alert => alert.component.toLowerCase().includes(component.toLowerCase()));
    }
    
    if (status && status !== 'all') {
      alerts = alerts.filter(alert => alert.status === status);
    }
    
    // Calculate pagination
    const total = alerts.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedAlerts = alerts.slice(startIndex, endIndex);
    
    return {
      total,
      page,
      limit,
      alerts: paginatedAlerts
    };
  }
  
  /**
   * Get alert details
   * @param {string} id - Alert ID
   * @returns {Promise<Object>} Maintenance alert details
   */
  async getAlertDetails(id) {
    await delay(300);
    
    const alertDetails = {
      'ALT-001': {
        id: 'ALT-001',
        priority: 'high',
        vehicle: 'WDB9061331N123456',
        component: 'Układ hamulcowy',
        forecast: 'Zużycie klocków hamulcowych',
        confidence: '95%',
        status: 'new',
        details: {
          predictedFailureDate: '2025-05-15',
          currentHealth: 25,
          recommendedAction: 'Wymiana klocków hamulcowych',
          estimatedRepairCost: 1200,
          estimatedRepairTime: 2
        }
      },
      'ALT-002': {
        id: 'ALT-002',
        priority: 'medium',
        vehicle: 'WDB9634031L654321',
        component: 'Akumulator',
        forecast: 'Spadek pojemności akumulatora',
        confidence: '82%',
        status: 'scheduled',
        details: {
          predictedFailureDate: '2025-06-10',
          currentHealth: 40,
          recommendedAction: 'Wymiana akumulatora',
          estimatedRepairCost: 800,
          estimatedRepairTime: 1
        }
      },
      'ALT-003': {
        id: 'ALT-003',
        priority: 'low',
        vehicle: 'WDB9634031L654321',
        component: 'Filtr powietrza',
        forecast: 'Zanieczyszczenie filtra powietrza',
        confidence: '78%',
        status: 'inProgress',
        details: {
          predictedFailureDate: '2025-05-25',
          currentHealth: 55,
          recommendedAction: 'Wymiana filtra powietrza',
          estimatedRepairCost: 200,
          estimatedRepairTime: 0.5
        }
      },
      'ALT-004': {
        id: 'ALT-004',
        priority: 'high',
        vehicle: 'WDB9061331N123456',
        component: 'Alternator',
        forecast: 'Awaria alternatora',
        confidence: '91%',
        status: 'new',
        details: {
          predictedFailureDate: '2025-05-05',
          currentHealth: 30,
          recommendedAction: 'Wymiana alternatora',
          estimatedRepairCost: 1500,
          estimatedRepairTime: 3
        }
      },
      'ALT-005': {
        id: 'ALT-005',
        priority: 'medium',
        vehicle: 'WDB9634031L987654',
        component: 'Układ chłodzenia',
        forecast: 'Wyciek płynu chłodzącego',
        confidence: '85%',
        status: 'new',
        details: {
          predictedFailureDate: '2025-05-20',
          currentHealth: 45,
          recommendedAction: 'Naprawa wycieku płynu chłodzącego',
          estimatedRepairCost: 600,
          estimatedRepairTime: 2
        }
      }
    };
    
    return alertDetails[id] || null;
  }
  
  /**
   * Update alert status
   * @param {string} id - Alert ID
   * @param {string} status - New status
   * @returns {Promise<Object>} Updated maintenance alert
   */
  async updateAlertStatus(id, status) {
    await delay(300);
    
    return {
      id,
      status,
      updated: true
    };
  }
  
  /**
   * Get vehicle health data
   * @param {string} [vehicle] - Vehicle filter
   * @returns {Promise<Object>} Vehicle health response
   */
  async getVehicleHealth(vehicle) {
    await delay(500);
    
    const vehicles = [
      {
        vehicle: 'WDB9061331N123456',
        overallHealth: 72,
        components: {
          'Układ hamulcowy': 25,
          'Alternator': 30,
          'Turbosprężarka': 65,
          'Sprzęgło': 60,
          'Układ kierowniczy': 85,
          'Układ zawieszenia': 90,
          'Układ paliwowy': 95,
          'Układ wydechowy': 80
        }
      },
      {
        vehicle: 'WDB9634031L654321',
        overallHealth: 85,
        components: {
          'Akumulator': 40,
          'Filtr powietrza': 55,
          'Wtryskiwacze': 75,
          'Amortyzatory': 70,
          'Układ hamulcowy': 95,
          'Układ kierowniczy': 90,
          'Układ paliwowy': 95,
          'Układ wydechowy': 85
        }
      },
      {
        vehicle: 'WDB9634031L987654',
        overallHealth: 78,
        components: {
          'Układ chłodzenia': 45,
          'Pasek klinowy': 65,
          'Filtr paliwa': 60,
          'Łożyska kół': 70,
          'Układ hamulcowy': 85,
          'Układ kierowniczy': 90,
          'Układ paliwowy': 85,
          'Układ wydechowy': 80
        }
      }
    ];
    
    if (vehicle) {
      return {
        vehicles: vehicles.filter(v => v.vehicle.includes(vehicle))
      };
    }
    
    return { vehicles };
  }
  
  /**
   * Get maintenance history
   * @param {string} [vehicle] - Vehicle filter
   * @param {string} [dateFrom] - Start date
   * @param {string} [dateTo] - End date
   * @param {string} [type] - Maintenance type filter
   * @param {number} [page=1] - Page number
   * @param {number} [limit=10] - Results per page
   * @returns {Promise<Object>} Maintenance history response
   */
  async getMaintenanceHistory(
    vehicle,
    dateFrom,
    dateTo,
    type,
    page = 1,
    limit = 10
  ) {
    await delay(400);
    
    const history = [
      {
        id: 'MH-001',
        date: '2025-03-15',
        vehicle: 'WDB9061331N123456',
        component: 'Układ hamulcowy',
        description: 'Wymiana klocków hamulcowych',
        type: 'preventive',
        cost: 1200,
        duration: 2
      },
      {
        id: 'MH-002',
        date: '2025-03-10',
        vehicle: 'WDB9634031L654321',
        component: 'Olej silnikowy',
        description: 'Wymiana oleju i filtra',
        type: 'preventive',
        cost: 500,
        duration: 1
      },
      {
        id: 'MH-003',
        date: '2025-03-05',
        vehicle: 'WDB9634031L987654',
        component: 'Alternator',
        description: 'Naprawa alternatora',
        type: 'corrective',
        cost: 1500,
        duration: 3
      },
      {
        id: 'MH-004',
        date: '2025-02-28',
        vehicle: 'WDB9061331N123456',
        component: 'Układ chłodzenia',
        description: 'Wymiana płynu chłodzącego',
        type: 'preventive',
        cost: 300,
        duration: 1
      },
      {
        id: 'MH-005',
        date: '2025-02-20',
        vehicle: 'WDB9634031L654321',
        component: 'Turbosprężarka',
        description: 'Naprawa turbosprężarki',
        type: 'corrective',
        cost: 2500,
        duration: 4
      }
    ];
    
    let filteredHistory = [...history];
    
    if (vehicle) {
      filteredHistory = filteredHistory.filter(h => h.vehicle.includes(vehicle));
    }
    
    if (type) {
      filteredHistory = filteredHistory.filter(h => h.type === type);
    }
    
    if (dateFrom) {
      const fromDate = new Date(dateFrom);
      filteredHistory = filteredHistory.filter(h => new Date(h.date) >= fromDate);
    }
    
    if (dateTo) {
      const toDate = new Date(dateTo);
      filteredHistory = filteredHistory.filter(h => new Date(h.date) <= toDate);
    }
    
    const total = filteredHistory.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedHistory = filteredHistory.slice(startIndex, endIndex);
    
    return {
      total,
      page,
      limit,
      history: paginatedHistory
    };
  }
  
  /**
   * Get maintenance schedule
   * @param {string} [vehicle] - Vehicle filter
   * @param {string} [dateFrom] - Start date
   * @param {string} [dateTo] - End date
   * @param {string} [status] - Status filter
   * @param {number} [page=1] - Page number
   * @param {number} [limit=10] - Results per page
   * @returns {Promise<Object>} Maintenance schedule response
   */
  async getMaintenanceSchedule(
    vehicle,
    dateFrom,
    dateTo,
    status,
    page = 1,
    limit = 10
  ) {
    await delay(400);
    
    const schedule = [
      {
        id: 'MS-001',
        date: '2025-04-20',
        vehicle: 'WDB9061331N123456',
        component: 'Układ hamulcowy',
        description: 'Wymiana klocków hamulcowych',
        priority: 'high',
        estimatedCost: 1200,
        estimatedDuration: 2
      },
      {
        id: 'MS-002',
        date: '2025-04-25',
        vehicle: 'WDB9634031L654321',
        component: 'Akumulator',
        description: 'Wymiana akumulatora',
        priority: 'medium',
        estimatedCost: 800,
        estimatedDuration: 1
      },
      {
        id: 'MS-003',
        date: '2025-05-05',
        vehicle: 'WDB9634031L987654',
        component: 'Układ chłodzenia',
        description: 'Naprawa wycieku płynu chłodzącego',
        priority: 'medium',
        estimatedCost: 600,
        estimatedDuration: 2
      },
      {
        id: 'MS-004',
        date: '2025-05-10',
        vehicle: 'WDB9061331N123456',
        component: 'Turbosprężarka',
        description: 'Naprawa turbosprężarki',
        priority: 'high',
        estimatedCost: 2000,
        estimatedDuration: 4
      },
      {
        id: 'MS-005',
        date: '2025-05-15',
        vehicle: 'WDB9634031L654321',
        component: 'Amortyzatory',
        description: 'Wymiana amortyzatorów',
        priority: 'medium',
        estimatedCost: 1500,
        estimatedDuration: 3
      }
    ];
    
    let filteredSchedule = [...schedule];
    
    if (vehicle) {
      filteredSchedule = filteredSchedule.filter(s => s.vehicle.includes(vehicle));
    }
    
    if (status) {
      filteredSchedule = filteredSchedule.filter(s => s.status === status);
    }
    
    if (dateFrom) {
      const fromDate = new Date(dateFrom);
      filteredSchedule = filteredSchedule.filter(s => new Date(s.date) >= fromDate);
    }
    
    if (dateTo) {
      const toDate = new Date(dateTo);
      filteredSchedule = filteredSchedule.filter(s => new Date(s.date) <= toDate);
    }
    
    const total = filteredSchedule.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedSchedule = filteredSchedule.slice(startIndex, endIndex);
    
    return {
      total,
      page,
      limit,
      schedule: paginatedSchedule
    };
  }
  
  /**
   * Get maintenance cost analysis
   * @param {string} [dateFrom] - Start date
   * @param {string} [dateTo] - End date
   * @param {string} [vehicle] - Vehicle filter
   * @returns {Promise<Object>} Maintenance cost analysis
   */
  async getCostAnalysis(
    dateFrom,
    dateTo,
    vehicle
  ) {
    await delay(600);
    
    return {
      totalCost: 25000,
      savingsEstimate: 8500,
      costBreakdown: [
        {
          category: 'Układ hamulcowy',
          cost: 5000,
          percentage: 20,
          color: '#3f51b5'
        },
        {
          category: 'Układ napędowy',
          cost: 7500,
          percentage: 30,
          color: '#f44336'
        },
        {
          category: 'Układ elektryczny',
          cost: 3750,
          percentage: 15,
          color: '#4caf50'
        },
        {
          category: 'Układ chłodzenia',
          cost: 2500,
          percentage: 10,
          color: '#ff9800'
        },
        {
          category: 'Zawieszenie',
          cost: 3750,
          percentage: 15,
          color: '#9c27b0'
        },
        {
          category: 'Inne',
          cost: 2500,
          percentage: 10,
          color: '#607d8b'
        }
      ],
      monthlyCosts: [
        { month: 'Styczeń', cost: 3500 },
        { month: 'Luty', cost: 2800 },
        { month: 'Marzec', cost: 4200 },
        { month: 'Kwiecień', cost: 3100 },
        { month: 'Maj', cost: 3800 },
        { month: 'Czerwiec', cost: 2900 }
      ]
    };
  }
}

// Export service instance
export const mockPredictiveMaintenanceService = new MockPredictiveMaintenanceService();
export default mockPredictiveMaintenanceService;
