import { delay } from '../../utils';

/**
 * Mock data service for Fuel Analysis
 * Provides test data for the Fuel Analysis component
 */
class MockFuelAnalysisService {
  /**
   * Get fuel analysis KPIs
   * @returns {Promise<Object>} Fuel analysis KPI data
   */
  async getKpiData() {
    // Simulate API delay
    await delay(600);
    
    return {
      averageFuelConsumption: 8.7,
      totalFuelCost: 125780,
      potentialSavings: 12450,
      co2Emission: 28750,
      fuelConsumptionChange: -2.3,
      fuelCostChange: 5.7,
      savingsChange: 8.2,
      co2EmissionChange: -3.1
    };
  }
  
  /**
   * Get fuel consumption data
   * @param {Object} filters - Filters for data
   * @returns {Promise<Object>} Fuel consumption data
   */
  async getFuelConsumptionData(filters) {
    // Simulate API delay
    await delay(800);
    
    const { period = 'month', vehicleId, driverId, startDate, endDate } = filters;
    
    // Generate consumption data based on period
    let data;
    
    switch (period) {
      case 'day':
        data = this.generateDailyConsumption();
        break;
      case 'week':
        data = this.generateWeeklyConsumption();
        break;
      case 'year':
        data = this.generateYearlyConsumption();
        break;
      case 'month':
      default:
        data = this.generateMonthlyConsumption();
        break;
    }
    
    // Apply vehicle filter if provided
    if (vehicleId) {
      // In a real implementation, this would filter data by vehicle ID
      // For mock data, we'll just return a subset
      data = data.slice(0, Math.floor(data.length * 0.7));
    }
    
    // Apply driver filter if provided
    if (driverId) {
      // In a real implementation, this would filter data by driver ID
      // For mock data, we'll just return a subset
      data = data.slice(0, Math.floor(data.length * 0.8));
    }
    
    // Apply date filters if provided
    if (startDate || endDate) {
      // In a real implementation, this would filter data by date range
      // For mock data, we'll just return a subset
      data = data.slice(0, Math.floor(data.length * 0.9));
    }
    
    return {
      period,
      data,
      summary: {
        totalConsumption: data.reduce((sum, item) => sum + item.consumption, 0).toFixed(1),
        totalDistance: data.reduce((sum, item) => sum + item.distance, 0),
        totalCost: data.reduce((sum, item) => sum + item.cost, 0),
        averageConsumption: (data.reduce((sum, item) => sum + item.consumption, 0) / data.length).toFixed(1)
      }
    };
  }
  
  /**
   * Get fuel consumption comparison data
   * @param {Object} filters - Filters for data
   * @returns {Promise<Object>} Fuel consumption comparison data
   */
  async getFuelComparisonData(filters) {
    // Simulate API delay
    await delay(700);
    
    const { compareBy = 'vehicle', period = 'month', page = 1, limit = 10 } = filters;
    
    let data;
    
    switch (compareBy) {
      case 'driver':
        data = this.generateDriverComparison();
        break;
      case 'route':
        data = this.generateRouteComparison();
        break;
      case 'vehicle':
      default:
        data = this.generateVehicleComparison();
        break;
    }
    
    // Apply pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = data.slice(startIndex, Math.min(endIndex, data.length));
    
    return {
      compareBy,
      period,
      data: paginatedData,
      total: data.length
    };
  }
  
  /**
   * Get fuel anomalies data
   * @param {Object} filters - Filters for data
   * @returns {Promise<Object>} Fuel anomalies data
   */
  async getAnomaliesData(filters) {
    // Simulate API delay
    await delay(900);
    
    const { period = 'month', severity = 'all', page = 1, limit = 10 } = filters;
    
    // Generate anomalies data
    let anomalies = this.generateAnomalies();
    
    // Apply severity filter
    if (severity !== 'all') {
      anomalies = anomalies.filter(anomaly => anomaly.severity === severity);
    }
    
    // Apply pagination
    const total = anomalies.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedAnomalies = anomalies.slice(startIndex, endIndex);
    
    return {
      period,
      total,
      page,
      limit,
      data: paginatedAnomalies
    };
  }
  
  /**
   * Get cost optimization data
   * @returns {Promise<Object>} Cost optimization data
   */
  async getCostOptimizationData() {
    // Simulate API delay
    await delay(750);
    
    return {
      fuelPriceComparison: this.generateFuelPriceComparison(),
      routeOptimization: this.generateRouteOptimization(),
      drivingBehavior: this.generateDrivingBehavior(),
      maintenanceImpact: this.generateMaintenanceImpact(),
      recommendations: this.generateRecommendations()
    };
  }
  
  /**
   * Get CO2 emission data
   * @param {Object} filters - Filters for data
   * @returns {Promise<Object>} CO2 emission data
   */
  async getCo2EmissionData(filters) {
    // Simulate API delay
    await delay(650);
    
    const { period = 'month' } = filters;
    
    let data;
    
    switch (period) {
      case 'day':
        data = this.generateDailyCO2Emission();
        break;
      case 'week':
        data = this.generateWeeklyCO2Emission();
        break;
      case 'year':
        data = this.generateYearlyCO2Emission();
        break;
      case 'month':
      default:
        data = this.generateMonthlyCO2Emission();
        break;
    }
    
    // Generate vehicle-specific CO2 emission data for the table
    const vehicles = this.generateVehicleCO2Data();
    
    return {
      period,
      data,
      summary: {
        totalEmission: data.reduce((sum, item) => sum + item.emission, 0),
        averageEmission: data.reduce((sum, item) => sum + item.emission, 0) / data.length,
        emissionPerKm: data.reduce((sum, item) => sum + item.emissionPerKm, 0) / data.length,
        emissionTrend: -3.2
      },
      vehicles,
      standards: [
        {
          standard: 'Euro 6',
          limit: 80,
          current: 92,
          status: 'Non-compliant',
          compliance: 87
        },
        {
          standard: 'Euro 5',
          limit: 100,
          current: 92,
          status: 'Compliant',
          compliance: 108
        },
        {
          standard: 'Corporate Goal 2025',
          limit: 70,
          current: 92,
          status: 'Non-compliant',
          compliance: 76
        }
      ],
      reductionGoals: [
        {
          name: 'Redukcja 2025',
          target: 70,
          current: 92,
          deadline: '2025-12-31',
          progress: 35
        },
        {
          name: 'Redukcja 2030',
          target: 50,
          current: 92,
          deadline: '2030-12-31',
          progress: 15
        }
      ]
    };
  }
  
  // Helper methods to generate mock data
  
  /**
   * Generate daily fuel consumption data
   * @returns {Array} Array of daily fuel consumption objects
   */
  generateDailyConsumption() {
    const data = [];
    
    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(date.getDate() - 29 + i);
      
      data.push({
        date: date.toLocaleDateString('pl-PL'),
        consumption: parseFloat((Math.random() * 3 + 7).toFixed(1)),
        distance: Math.floor(Math.random() * 300) + 100,
        cost: Math.floor(Math.random() * 500) + 200
      });
    }
    
    return data;
  }
  
  /**
   * Generate weekly fuel consumption data
   * @returns {Array} Array of weekly fuel consumption objects
   */
  generateWeeklyConsumption() {
    const data = [];
    
    for (let i = 0; i < 12; i++) {
      const date = new Date();
      date.setDate(date.getDate() - 7 * 11 + i * 7);
      
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 6);
      
      data.push({
        date: `${date.toLocaleDateString('pl-PL')} - ${endDate.toLocaleDateString('pl-PL')}`,
        consumption: parseFloat((Math.random() * 5 + 45).toFixed(1)),
        distance: Math.floor(Math.random() * 1500) + 500,
        cost: Math.floor(Math.random() * 2500) + 1000
      });
    }
    
    return data;
  }
  
  /**
   * Generate monthly fuel consumption data
   * @returns {Array} Array of monthly fuel consumption objects
   */
  generateMonthlyConsumption() {
    const data = [];
    
    for (let i = 0; i < 12; i++) {
      const date = new Date();
      date.setMonth(date.getMonth() - 11 + i);
      
      data.push({
        date: date.toLocaleDateString('pl-PL', { month: 'long', year: 'numeric' }),
        consumption: parseFloat((Math.random() * 20 + 180).toFixed(1)),
        distance: Math.floor(Math.random() * 6000) + 2000,
        cost: Math.floor(Math.random() * 10000) + 4000
      });
    }
    
    return data;
  }
  
  /**
   * Generate yearly fuel consumption data
   * @returns {Array} Array of yearly fuel consumption objects
   */
  generateYearlyConsumption() {
    const data = [];
    
    for (let i = 0; i < 5; i++) {
      const date = new Date();
      date.setFullYear(date.getFullYear() - 4 + i);
      
      data.push({
        date: date.getFullYear().toString(),
        consumption: parseFloat((Math.random() * 200 + 2000).toFixed(1)),
        distance: Math.floor(Math.random() * 60000) + 20000,
        cost: Math.floor(Math.random() * 100000) + 40000
      });
    }
    
    return data;
  }
  
  /**
   * Generate vehicle comparison data
   * @returns {Array} Array of vehicle comparison objects
   */
  generateVehicleComparison() {
    const vehicles = [
      { id: 'VEH001', name: 'Mercedes Actros' },
      { id: 'VEH002', name: 'Volvo FH' },
      { id: 'VEH003', name: 'Scania R' },
      { id: 'VEH004', name: 'MAN TGX' },
      { id: 'VEH005', name: 'DAF XF' },
      { id: 'VEH006', name: 'Renault T' },
      { id: 'VEH007', name: 'Iveco Stralis' },
      { id: 'VEH008', name: 'Mercedes Atego' }
    ];
    
    return vehicles.map(vehicle => ({
      id: vehicle.id,
      name: vehicle.name,
      consumption: parseFloat((Math.random() * 5 + 6).toFixed(1)),
      distance: Math.floor(Math.random() * 10000) + 5000,
      cost: Math.floor(Math.random() * 20000) + 10000,
      efficiency: parseFloat((Math.random() * 20 + 70).toFixed(1))
    }));
  }
  
  /**
   * Generate driver comparison data
   * @returns {Array} Array of driver comparison objects
   */
  generateDriverComparison() {
    const drivers = [
      { id: 'DRV001', name: 'Jan Kowalski' },
      { id: 'DRV002', name: 'Anna Nowak' },
      { id: 'DRV003', name: 'Piotr Wiśniewski' },
      { id: 'DRV004', name: 'Katarzyna Dąbrowska' },
      { id: 'DRV005', name: 'Tomasz Lewandowski' },
      { id: 'DRV006', name: 'Małgorzata Wójcik' },
      { id: 'DRV007', name: 'Michał Kamiński' },
      { id: 'DRV008', name: 'Agnieszka Kowalczyk' }
    ];
    
    return drivers.map(driver => ({
      id: driver.id,
      name: driver.name,
      consumption: parseFloat((Math.random() * 5 + 6).toFixed(1)),
      distance: Math.floor(Math.random() * 10000) + 5000,
      cost: Math.floor(Math.random() * 20000) + 10000,
      efficiency: parseFloat((Math.random() * 20 + 70).toFixed(1)),
      drivingScore: Math.floor(Math.random() * 30) + 70
    }));
  }
  
  /**
   * Generate route comparison data
   * @returns {Array} Array of route comparison objects
   */
  generateRouteComparison() {
    const routes = [
      { id: 'RT001', name: 'Warszawa - Kraków' },
      { id: 'RT002', name: 'Warszawa - Gdańsk' },
      { id: 'RT003', name: 'Warszawa - Poznań' },
      { id: 'RT004', name: 'Warszawa - Wrocław' },
      { id: 'RT005', name: 'Kraków - Gdańsk' },
      { id: 'RT006', name: 'Kraków - Poznań' },
      { id: 'RT007', name: 'Kraków - Wrocław' },
      { id: 'RT008', name: 'Gdańsk - Poznań' }
    ];
    
    return routes.map(route => ({
      id: route.id,
      name: route.name,
      consumption: parseFloat((Math.random() * 5 + 6).toFixed(1)),
      distance: Math.floor(Math.random() * 500) + 200,
      cost: Math.floor(Math.random() * 2000) + 1000,
      efficiency: parseFloat((Math.random() * 20 + 70).toFixed(1)),
      trafficScore: Math.floor(Math.random() * 30) + 70
    }));
  }
  
  /**
   * Generate anomalies data
   * @returns {Array} Array of anomaly objects
   */
  generateAnomalies() {
    const types = ['Nagły wzrost zużycia', 'Nietypowy wzorzec tankowania', 'Podejrzenie kradzieży', 'Nieefektywna trasa', 'Styl jazdy'];
    const vehicles = ['VEH001', 'VEH002', 'VEH003', 'VEH004', 'VEH005', 'VEH006', 'VEH007', 'VEH008'];
    const drivers = ['Jan Kowalski', 'Anna Nowak', 'Piotr Wiśniewski', 'Katarzyna Dąbrowska', 'Tomasz Lewandowski'];
    const severities = ['high', 'medium', 'low'];
    const statuses = ['new', 'investigating', 'resolved'];
    
    const anomalies = [];
    
    for (let i = 0; i < 25; i++) {
      const date = new Date();
      date.setDate(date.getDate() - Math.floor(Math.random() * 30));
      
      const type = types[Math.floor(Math.random() * types.length)];
      const severity = severities[Math.floor(Math.random() * severities.length)];
      
      let description;
      switch (type) {
        case 'Nagły wzrost zużycia':
          description = `Wzrost zużycia paliwa o ${Math.floor(Math.random() * 30) + 10}% w porównaniu do średniej.`;
          break;
        case 'Nietypowy wzorzec tankowania':
          description = `Tankowanie ${Math.floor(Math.random() * 50) + 20}L poza standardowym harmonogramem.`;
          break;
        case 'Podejrzenie kradzieży':
          description = `Brak ${Math.floor(Math.random() * 40) + 20}L paliwa w porównaniu do przewidywanego poziomu.`;
          break;
        case 'Nieefektywna trasa':
          description = `Trasa dłuższa o ${Math.floor(Math.random() * 30) + 10}% od optymalnej.`;
          break;
        case 'Styl jazdy':
          description = `Gwałtowne przyspieszenia i hamowania zwiększające zużycie paliwa o ${Math.floor(Math.random() * 20) + 5}%.`;
          break;
        default:
          description = 'Wykryto anomalię w zużyciu paliwa.';
      }
      
      anomalies.push({
        id: `ANO${(i + 1).toString().padStart(3, '0')}`,
        date: date.toLocaleDateString('pl-PL'),
        type,
        description,
        vehicleId: vehicles[Math.floor(Math.random() * vehicles.length)],
        driverId: drivers[Math.floor(Math.random() * drivers.length)],
        severity,
        potentialLoss: Math.floor(Math.random() * 1000) + 100,
        status: statuses[Math.floor(Math.random() * statuses.length)]
      });
    }
    
    return anomalies;
  }
  
  /**
   * Generate fuel price comparison data
   * @returns {Object} Fuel price comparison data
   */
  generateFuelPriceComparison() {
    const stations = [
      { id: 'ST001', stationName: 'Orlen', price: 5.89, distance: 2.5, rating: 4.5, savings: 0 },
      { id: 'ST002', stationName: 'BP', price: 5.99, distance: 1.8, rating: 4.2, savings: 1200 },
      { id: 'ST003', stationName: 'Shell', price: 6.05, distance: 3.2, rating: 4.7, savings: 1920 },
      { id: 'ST004', stationName: 'Circle K', price: 5.92, distance: 4.1, rating: 4.0, savings: 360 },
      { id: 'ST005', stationName: 'Lotos', price: 5.85, distance: 5.3, rating: 4.3, savings: -480 }
    ];
    
    // Calculate savings compared to average price
    const avgPrice = stations.reduce((sum, station) => sum + station.price, 0) / stations.length;
    
    stations.forEach(station => {
      if (station.savings === 0) {
        station.savings = Math.floor((avgPrice - station.price) * 12000);
      }
    });
    
    return {
      stations,
      recommendedStation: stations.sort((a, b) => a.price - b.price)[0],
      averagePrice: avgPrice,
      potentialAnnualSavings: Math.floor(Math.random() * 5000) + 3000
    };
  }
  
  /**
   * Generate route optimization data
   * @returns {Object} Route optimization data
   */
  generateRouteOptimization() {
    const routes = [
      {
        id: 'RT001',
        name: 'Warszawa - Kraków',
        currentDistance: 295,
        optimizedDistance: 290,
        currentFuelConsumption: 88.5,
        optimizedFuelConsumption: 84.1,
        savings: 525
      },
      {
        id: 'RT002',
        name: 'Warszawa - Gdańsk',
        currentDistance: 340,
        optimizedDistance: 330,
        currentFuelConsumption: 102.0,
        optimizedFuelConsumption: 95.7,
        savings: 756
      },
      {
        id: 'RT003',
        name: 'Warszawa - Poznań',
        currentDistance: 310,
        optimizedDistance: 305,
        currentFuelConsumption: 93.0,
        optimizedFuelConsumption: 88.5,
        savings: 540
      }
    ];
    
    return {
      routes,
      totalSavings: routes.reduce((sum, route) => sum + route.savings, 0),
      averageSavings: routes.reduce((sum, route) => sum + route.savings, 0) / routes.length,
      totalDistanceReduction: routes.reduce((sum, route) => sum + (route.currentDistance - route.optimizedDistance), 0),
      averageFuelSaving: parseFloat((routes.reduce((sum, route) => sum + (route.currentFuelConsumption - route.optimizedFuelConsumption), 0) / routes.length).toFixed(1)),
      averageDistanceSaving: parseFloat((routes.reduce((sum, route) => sum + (route.currentDistance - route.optimizedDistance), 0) / routes.length).toFixed(1))
    };
  }
  
  /**
   * Generate driving behavior data
   * @returns {Object} Driving behavior data
   */
  generateDrivingBehavior() {
    const behaviors = [
      {
        id: 'BEH001',
        name: 'Gwałtowne przyspieszanie',
        impact: 'Zwiększone zużycie paliwa o 15-20%',
        recommendation: 'Szkolenie z eco-drivingu',
        potentialSavings: 3200
      },
      {
        id: 'BEH002',
        name: 'Nadmierna prędkość',
        impact: 'Zwiększone zużycie paliwa o 10-15%',
        recommendation: 'Ograniczniki prędkości',
        potentialSavings: 2800
      },
      {
        id: 'BEH003',
        name: 'Długi czas pracy na biegu jałowym',
        impact: 'Marnowanie 0.5-1L paliwa na godzinę',
        recommendation: 'Automatyczne wyłączanie silnika',
        potentialSavings: 1900
      }
    ];
    
    return {
      behaviors,
      totalPotentialSavings: behaviors.reduce((sum, behavior) => sum + behavior.potentialSavings, 0),
      topIssue: behaviors.sort((a, b) => b.potentialSavings - a.potentialSavings)[0]
    };
  }
  
  /**
   * Generate maintenance impact data
   * @returns {Object} Maintenance impact data
   */
  generateMaintenanceImpact() {
    const issues = [
      {
        id: 'MI001',
        name: 'Nieprawidłowe ciśnienie w oponach',
        impact: 'Zwiększone zużycie paliwa o 3-5%',
        recommendation: 'Regularne kontrole ciśnienia',
        potentialSavings: 1500
      },
      {
        id: 'MI002',
        name: 'Zanieczyszczone filtry powietrza',
        impact: 'Zwiększone zużycie paliwa o 2-3%',
        recommendation: 'Częstsza wymiana filtrów',
        potentialSavings: 950
      },
      {
        id: 'MI003',
        name: 'Niewyregulowany silnik',
        impact: 'Zwiększone zużycie paliwa o 4-8%',
        recommendation: 'Regularne przeglądy silnika',
        potentialSavings: 2100
      }
    ];
    
    return {
      issues,
      totalPotentialSavings: issues.reduce((sum, issue) => sum + issue.potentialSavings, 0),
      topIssue: issues.sort((a, b) => b.potentialSavings - a.potentialSavings)[0]
    };
  }
  
  /**
   * Generate recommendations data
   * @returns {Array} Array of recommendation objects
   */
  generateRecommendations() {
    return [
      {
        id: 'REC001',
        category: 'Optymalizacja tras',
        currentCost: 85000,
        potentialCost: 72500,
        savings: 12500,
        savingsPercent: 14.7,
        implementation: 'Średnia',
        roi: 156,
        description: 'Wdrożenie systemu optymalizacji tras w oparciu o dane historyczne i ruch drogowy w czasie rzeczywistym.',
        priority: 'High'
      },
      {
        id: 'REC002',
        category: 'Szkolenia z eco-drivingu',
        currentCost: 62000,
        potentialCost: 53300,
        savings: 8700,
        savingsPercent: 14.0,
        implementation: 'Łatwa',
        roi: 249,
        description: 'Program szkoleń dla kierowców z technik eco-drivingu i monitorowanie wyników.',
        priority: 'High'
      },
      {
        id: 'REC003',
        category: 'Modernizacja floty',
        currentCost: 245000,
        potentialCost: 210000,
        savings: 35000,
        savingsPercent: 14.3,
        implementation: 'Trudna',
        roi: 29,
        description: 'Wymiana najstarszych pojazdów na modele o niższym zużyciu paliwa.',
        priority: 'Medium'
      },
      {
        id: 'REC004',
        category: 'System monitorowania ciśnienia w oponach',
        currentCost: 38500,
        potentialCost: 34000,
        savings: 4500,
        savingsPercent: 11.7,
        implementation: 'Średnia',
        roi: 75,
        description: 'Instalacja systemu TPMS we wszystkich pojazdach floty.',
        priority: 'Medium'
      },
      {
        id: 'REC005',
        category: 'Karty paliwowe z rabatem',
        currentCost: 128000,
        potentialCost: 120200,
        savings: 7800,
        savingsPercent: 6.1,
        implementation: 'Łatwa',
        roi: 780,
        description: 'Negocjacja umowy z siecią stacji paliw na karty z rabatem.',
        priority: 'High'
      }
    ];
  }
  
  /**
   * Generate vehicle CO2 emission data for the table
   * @returns {Array} Array of vehicle CO2 emission objects
   */
  generateVehicleCO2Data() {
    const vehicles = [
      { id: 'VEH001', name: 'Mercedes Actros' },
      { id: 'VEH002', name: 'Volvo FH' },
      { id: 'VEH003', name: 'Scania R' },
      { id: 'VEH004', name: 'MAN TGX' },
      { id: 'VEH005', name: 'DAF XF' },
      { id: 'VEH006', name: 'Renault T' },
      { id: 'VEH007', name: 'Iveco Stralis' },
      { id: 'VEH008', name: 'Mercedes Atego' }
    ];
    
    return vehicles.map(vehicle => {
      const distance = Math.floor(Math.random() * 10000) + 5000;
      const fuelConsumption = parseFloat((Math.random() * 500 + 1000).toFixed(1));
      const emission = parseFloat((Math.random() * 5000 + 10000).toFixed(1));
      const emissionPerKm = parseFloat((emission / distance).toFixed(2));
      const emissionTarget = parseFloat((emission * 0.85).toFixed(1));
      
      return {
        vehicleId: vehicle.id,
        vehicleName: vehicle.name,
        emission,
        distance,
        emissionPerKm,
        fuelConsumption,
        emissionTarget,
        status: emission > emissionTarget ? 'Przekroczony limit' : 'W normie',
        difference: parseFloat(((emission - emissionTarget) / emissionTarget * 100).toFixed(1)),
        trend: parseFloat((Math.random() * 10 - 5).toFixed(1))
      };
    });
  }
  generateDailyCO2Emission() {
    const data = [];
    
    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(date.getDate() - 29 + i);
      
      const distance = Math.floor(Math.random() * 300) + 100;
      const emissionPerKm = parseFloat((Math.random() * 0.1 + 0.7).toFixed(2));
      
      data.push({
        date: date.toLocaleDateString('pl-PL'),
        emission: parseFloat((distance * emissionPerKm).toFixed(1)),
        distance,
        emissionPerKm
      });
    }
    
    return data;
  }
  
  /**
   * Generate weekly CO2 emission data
   * @returns {Array} Array of weekly CO2 emission objects
   */
  generateWeeklyCO2Emission() {
    const data = [];
    
    for (let i = 0; i < 12; i++) {
      const date = new Date();
      date.setDate(date.getDate() - 7 * 11 + i * 7);
      
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 6);
      
      const distance = Math.floor(Math.random() * 1500) + 500;
      const emissionPerKm = parseFloat((Math.random() * 0.1 + 0.7).toFixed(2));
      
      data.push({
        date: `${date.toLocaleDateString('pl-PL')} - ${endDate.toLocaleDateString('pl-PL')}`,
        emission: parseFloat((distance * emissionPerKm).toFixed(1)),
        distance,
        emissionPerKm
      });
    }
    
    return data;
  }
  
  /**
   * Generate monthly CO2 emission data
   * @returns {Array} Array of monthly CO2 emission objects
   */
  generateMonthlyCO2Emission() {
    const data = [];
    
    for (let i = 0; i < 12; i++) {
      const date = new Date();
      date.setMonth(date.getMonth() - 11 + i);
      
      const distance = Math.floor(Math.random() * 6000) + 2000;
      const emissionPerKm = parseFloat((Math.random() * 0.1 + 0.7).toFixed(2));
      
      data.push({
        date: date.toLocaleDateString('pl-PL', { month: 'long', year: 'numeric' }),
        emission: parseFloat((distance * emissionPerKm).toFixed(1)),
        distance,
        emissionPerKm
      });
    }
    
    return data;
  }
  
  /**
   * Generate yearly CO2 emission data
   * @returns {Array} Array of yearly CO2 emission objects
   */
  generateYearlyCO2Emission() {
    const data = [];
    
    for (let i = 0; i < 5; i++) {
      const date = new Date();
      date.setFullYear(date.getFullYear() - 4 + i);
      
      const distance = Math.floor(Math.random() * 60000) + 20000;
      const emissionPerKm = parseFloat((Math.random() * 0.1 + 0.7).toFixed(2));
      
      data.push({
        date: date.getFullYear().toString(),
        emission: parseFloat((distance * emissionPerKm).toFixed(1)),
        distance,
        emissionPerKm
      });
    }
    
    return data;
  }
}

// Create and export an instance of the service
const mockFuelAnalysisService = new MockFuelAnalysisService();
export default mockFuelAnalysisService;
