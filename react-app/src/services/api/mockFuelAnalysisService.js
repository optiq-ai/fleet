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
  async getFuelKPIs() {
    // Simulate API delay
    await delay(600);
    
    return {
      averageFuelConsumption: 8.7,
      totalFuelCost: 125780,
      potentialSavings: 12450,
      co2Emission: 28750,
      averageFuelConsumptionTrend: -2.3,
      totalFuelCostTrend: 5.7,
      potentialSavingsTrend: 8.2,
      co2EmissionTrend: -3.1
    };
  }
  
  /**
   * Get fuel consumption data
   * @param {string} [period='month'] - Period for data aggregation (day, week, month, year)
   * @param {string} [vehicleId] - Optional vehicle ID filter
   * @param {string} [driverId] - Optional driver ID filter
   * @param {string} [startDate] - Optional start date filter
   * @param {string} [endDate] - Optional end date filter
   * @returns {Promise<Object>} Fuel consumption data
   */
  async getFuelConsumption(
    period = 'month',
    vehicleId,
    driverId,
    startDate,
    endDate
  ) {
    // Simulate API delay
    await delay(800);
    
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
   * @param {string} [compareBy='vehicle'] - Comparison type (vehicle, driver, route)
   * @param {string} [period='month'] - Period for data aggregation
   * @returns {Promise<Object>} Fuel consumption comparison data
   */
  async getFuelConsumptionComparison(
    compareBy = 'vehicle',
    period = 'month'
  ) {
    // Simulate API delay
    await delay(700);
    
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
    
    return {
      compareBy,
      period,
      data
    };
  }
  
  /**
   * Get fuel anomalies data
   * @param {string} [period='month'] - Period for data aggregation
   * @param {string} [severity='all'] - Severity filter (all, high, medium, low)
   * @param {number} [page=1] - Page number
   * @param {number} [limit=10] - Results per page
   * @returns {Promise<Object>} Fuel anomalies data
   */
  async getFuelAnomalies(
    period = 'month',
    severity = 'all',
    page = 1,
    limit = 10
  ) {
    // Simulate API delay
    await delay(900);
    
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
  async getCostOptimization() {
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
   * @param {string} [period='month'] - Period for data aggregation
   * @returns {Promise<Object>} CO2 emission data
   */
  async getCO2Emission(period = 'month') {
    // Simulate API delay
    await delay(650);
    
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
    
    return {
      period,
      data,
      summary: {
        totalEmission: data.reduce((sum, item) => sum + item.emission, 0),
        averageEmission: data.reduce((sum, item) => sum + item.emission, 0) / data.length,
        emissionPerKm: data.reduce((sum, item) => sum + item.emissionPerKm, 0) / data.length,
        emissionTrend: -3.2
      },
      complianceStatus: {
        currentStandard: 'Euro 6',
        fleetCompliance: 87,
        targetEmission: 25000,
        currentEmission: 28750,
        reductionNeeded: 3750
      }
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
        vehicle: vehicles[Math.floor(Math.random() * vehicles.length)],
        driver: drivers[Math.floor(Math.random() * drivers.length)],
        severity,
        impact: Math.floor(Math.random() * 1000) + 100,
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
      { id: 'ST001', name: 'Orlen', price: 5.89, savings: 0 },
      { id: 'ST002', name: 'BP', price: 5.99, savings: 1200 },
      { id: 'ST003', name: 'Shell', price: 6.05, savings: 1920 },
      { id: 'ST004', name: 'Circle K', price: 5.92, savings: 360 },
      { id: 'ST005', name: 'Lotos', price: 5.85, savings: -480 }
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
        type: 'Gwałtowne przyspieszanie',
        impact: 12.5,
        frequency: 'Wysoka',
        potentialSavings: 1875
      },
      {
        type: 'Gwałtowne hamowanie',
        impact: 8.3,
        frequency: 'Średnia',
        potentialSavings: 1245
      },
      {
        type: 'Nadmierna prędkość',
        impact: 15.2,
        frequency: 'Średnia',
        potentialSavings: 2280
      },
      {
        type: 'Zbyt długi czas pracy silnika na biegu jałowym',
        impact: 6.8,
        frequency: 'Wysoka',
        potentialSavings: 1020
      }
    ];
    
    return {
      behaviors,
      totalImpact: parseFloat(behaviors.reduce((sum, behavior) => sum + behavior.impact, 0).toFixed(1)),
      totalPotentialSavings: behaviors.reduce((sum, behavior) => sum + behavior.potentialSavings, 0),
      driverTrainingROI: 320
    };
  }
  
  /**
   * Generate maintenance impact data
   * @returns {Object} Maintenance impact data
   */
  generateMaintenanceImpact() {
    const factors = [
      {
        factor: 'Ciśnienie w oponach',
        impact: 3.5,
        status: 'Wymaga uwagi',
        potentialSavings: 525
      },
      {
        factor: 'Filtry powietrza',
        impact: 2.8,
        status: 'Dobry',
        potentialSavings: 420
      },
      {
        factor: 'Olej silnikowy',
        impact: 4.2,
        status: 'Wymaga uwagi',
        potentialSavings: 630
      },
      {
        factor: 'Geometria kół',
        impact: 3.0,
        status: 'Dobry',
        potentialSavings: 450
      }
    ];
    
    return {
      factors,
      totalImpact: parseFloat(factors.reduce((sum, factor) => sum + factor.impact, 0).toFixed(1)),
      totalPotentialSavings: factors.reduce((sum, factor) => sum + factor.potentialSavings, 0),
      maintenanceROI: 280
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
        title: 'Optymalizacja tras',
        description: 'Wdrożenie optymalizacji tras może zmniejszyć zużycie paliwa o 5-7%.',
        impact: 'Wysoki',
        difficulty: 'Średnia',
        estimatedSavings: 3750,
        implementationCost: 1200,
        roi: 312.5
      },
      {
        id: 'REC002',
        title: 'Szkolenia z eco-drivingu',
        description: 'Szkolenia kierowców z technik eco-drivingu mogą zmniejszyć zużycie paliwa o 10-15%.',
        impact: 'Wysoki',
        difficulty: 'Niska',
        estimatedSavings: 4500,
        implementationCost: 2000,
        roi: 225
      },
      {
        id: 'REC003',
        title: 'Regularne kontrole ciśnienia w oponach',
        description: 'Utrzymywanie prawidłowego ciśnienia w oponach może zmniejszyć zużycie paliwa o 3%.',
        impact: 'Średni',
        difficulty: 'Niska',
        estimatedSavings: 1125,
        implementationCost: 0,
        roi: 'Nieskończony'
      },
      {
        id: 'REC004',
        title: 'Tankowanie na rekomendowanych stacjach',
        description: 'Korzystanie z rekomendowanych stacji paliw może zmniejszyć koszty o 2-4%.',
        impact: 'Średni',
        difficulty: 'Niska',
        estimatedSavings: 1500,
        implementationCost: 0,
        roi: 'Nieskończony'
      },
      {
        id: 'REC005',
        title: 'Modernizacja starszych pojazdów',
        description: 'Modernizacja starszych pojazdów lub wymiana na nowsze modele może zmniejszyć zużycie paliwa o 10-20%.',
        impact: 'Wysoki',
        difficulty: 'Wysoka',
        estimatedSavings: 7500,
        implementationCost: 50000,
        roi: 15
      }
    ];
  }
  
  /**
   * Generate daily CO2 emission data
   * @returns {Array} Array of daily CO2 emission objects
   */
  generateDailyCO2Emission() {
    const data = [];
    
    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(date.getDate() - 29 + i);
      
      const emission = Math.floor(Math.random() * 300) + 700;
      const distance = Math.floor(Math.random() * 300) + 100;
      
      data.push({
        date: date.toLocaleDateString('pl-PL'),
        emission,
        distance,
        emissionPerKm: parseFloat((emission / distance).toFixed(2))
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
      
      const emission = Math.floor(Math.random() * 1500) + 4000;
      const distance = Math.floor(Math.random() * 1500) + 500;
      
      data.push({
        date: `${date.toLocaleDateString('pl-PL')} - ${endDate.toLocaleDateString('pl-PL')}`,
        emission,
        distance,
        emissionPerKm: parseFloat((emission / distance).toFixed(2))
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
      
      const emission = Math.floor(Math.random() * 5000) + 15000;
      const distance = Math.floor(Math.random() * 6000) + 2000;
      
      data.push({
        date: date.toLocaleDateString('pl-PL', { month: 'long', year: 'numeric' }),
        emission,
        distance,
        emissionPerKm: parseFloat((emission / distance).toFixed(2))
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
      
      const emission = Math.floor(Math.random() * 50000) + 200000;
      const distance = Math.floor(Math.random() * 60000) + 20000;
      
      data.push({
        date: date.getFullYear().toString(),
        emission,
        distance,
        emissionPerKm: parseFloat((emission / distance).toFixed(2))
      });
    }
    
    return data;
  }
}

// Export service instance
export const mockFuelAnalysisService = new MockFuelAnalysisService();
export default mockFuelAnalysisService;
