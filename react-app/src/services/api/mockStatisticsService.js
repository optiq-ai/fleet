import { delay } from '../../utils';
import { mockDashboardService } from './mockDashboardService';

// Importy mockowych serwisów
const mockFuelAnalysisService = {
  getKpiData: async () => ({
    averageFuelConsumption: 8.5,
    fuelConsumptionChange: -2.3,
    totalFuelCost: 12500,
    fuelCostChange: 3.2,
    potentialSavings: 1800,
    savingsChange: 5.4,
    co2Emission: 2150,
    co2EmissionChange: -1.8
  })
};

const mockFleetManagementService = {
  getFleetKPIs: async () => ({
    activeVehicles: 42,
    activeVehiclesTrend: 2.4,
    totalVehicles: 45,
    availableVehicles: 38,
    maintenanceVehicles: 4,
    utilization: 84.5
  })
};

/**
 * Mock service for Statistics module
 * Provides mock data for the Statistics components during development
 */
class MockStatisticsService {
  /**
   * Get KPI data for statistics dashboard
   * @param {string} timeRange - Time range for data
   * @returns {Promise<Array>} KPI data
   */
  async getKPIData(timeRange = 'month') {
    await delay(800);
    
    // Pobierz dane z różnych serwisów
    const dashboardKPI = await mockDashboardService.getKPIData();
    const fuelKPI = await mockFuelAnalysisService.getKpiData();
    const fleetKPI = await mockFleetManagementService.getFleetKPIs();
    
    return [
      {
        id: 'active-vehicles',
        name: 'Aktywne pojazdy',
        value: fleetKPI.activeVehicles,
        unit: 'szt.',
        trend: fleetKPI.activeVehiclesTrend,
        trendPeriod: timeRange,
        status: this._getStatusFromTrend(fleetKPI.activeVehiclesTrend, true)
      },
      {
        id: 'fuel-consumption',
        name: 'Średnie zużycie paliwa',
        value: fuelKPI.averageFuelConsumption,
        unit: 'l/100km',
        trend: fuelKPI.fuelConsumptionChange,
        trendPeriod: timeRange,
        status: this._getStatusFromTrend(fuelKPI.fuelConsumptionChange, false)
      },
      {
        id: 'operational-costs',
        name: 'Koszty operacyjne',
        value: fuelKPI.totalFuelCost,
        unit: 'PLN',
        trend: fuelKPI.fuelCostChange,
        trendPeriod: timeRange,
        status: this._getStatusFromTrend(fuelKPI.fuelCostChange, false)
      },
      {
        id: 'potential-savings',
        name: 'Potencjalne oszczędności',
        value: fuelKPI.potentialSavings,
        unit: 'PLN',
        trend: fuelKPI.savingsChange,
        trendPeriod: timeRange,
        status: this._getStatusFromTrend(fuelKPI.savingsChange, true)
      },
      {
        id: 'safety-index',
        name: 'Indeks bezpieczeństwa',
        value: dashboardKPI.safetyIndex,
        unit: '%',
        trend: 2.1,
        trendPeriod: timeRange,
        status: 'good'
      },
      {
        id: 'co2-emission',
        name: 'Emisja CO2',
        value: fuelKPI.co2Emission,
        unit: 'kg',
        trend: fuelKPI.co2EmissionChange,
        trendPeriod: timeRange,
        status: this._getStatusFromTrend(fuelKPI.co2EmissionChange, false)
      },
      {
        id: 'maintenance-forecast',
        name: 'Prognoza konserwacji',
        value: dashboardKPI.maintenanceForecast,
        unit: 'szt.',
        trend: -5.3,
        trendPeriod: timeRange,
        status: 'warning'
      },
      {
        id: 'driver-performance',
        name: 'Wydajność kierowców',
        value: 82,
        unit: '%',
        trend: 1.8,
        trendPeriod: timeRange,
        status: 'good'
      }
    ];
  }
  
  /**
   * Get trend data for statistics
   * @param {string} timeRange - Time range for data
   * @param {Array} metrics - Metrics to include
   * @returns {Promise<Object>} Trend data
   */
  async getTrendData(timeRange = 'month', metrics = ['fuelConsumption']) {
    await delay(1000);
    
    // Generate dates based on time range
    const dates = this._generateDates(timeRange);
    
    // Generate data for each metric
    const result = {};
    
    metrics.forEach(metric => {
      // Generowanie danych z trendem, aby wykresy były bardziej realistyczne
      const trendFactor = Math.random() * 0.2 - 0.1; // Losowy trend między -0.1 a 0.1
      let baseValue;
      
      switch (metric) {
        case 'fuelConsumption':
          baseValue = 8;
          break;
        case 'operationalCosts':
          baseValue = 10000;
          break;
        case 'co2Emission':
          baseValue = 2000;
          break;
        case 'safetyIndex':
          baseValue = 75;
          break;
        case 'maintenanceCosts':
          baseValue = 2000;
          break;
        case 'vehicleUtilization':
          baseValue = 60;
          break;
        case 'driverPerformance':
          baseValue = 70;
          break;
        default:
          baseValue = 50;
      }
      
      result[metric] = dates.map((date, index) => {
        // Dodanie trendu i losowych wahań
        const trendValue = baseValue * (1 + trendFactor * index / dates.length);
        const randomVariation = trendValue * (Math.random() * 0.2 - 0.1); // Losowe wahania ±10%
        let value = trendValue + randomVariation;
        
        // Dodanie sezonowości dla niektórych metryk
        if (['fuelConsumption', 'operationalCosts', 'co2Emission'].includes(metric)) {
          // Dodanie wzorca sezonowego (np. wyższe wartości w środku okresu)
          const seasonalFactor = Math.sin(Math.PI * index / dates.length);
          value += baseValue * 0.15 * seasonalFactor;
        }
        
        return {
          date,
          value: parseFloat(value.toFixed(2))
        };
      });
    });
    
    return result;
  }
  
  /**
   * Get comparison data for statistics
   * @param {string} comparisonType - Type of comparison (vehicle, driver, route)
   * @param {string} metric - Metric to compare
   * @param {string} timeRange - Time range for data
   * @returns {Promise<Array>} Comparison data
   */
  async getComparisonData(comparisonType = 'vehicle', metric = 'fuelConsumption', timeRange = 'month') {
    await delay(900);
    
    let items;
    
    switch (comparisonType) {
      case 'vehicle':
        items = [
          { id: 'v1', name: 'Mercedes Actros' },
          { id: 'v2', name: 'Volvo FH' },
          { id: 'v3', name: 'Scania R' },
          { id: 'v4', name: 'MAN TGX' },
          { id: 'v5', name: 'DAF XF' },
          { id: 'v6', name: 'Renault T' },
          { id: 'v7', name: 'Iveco Stralis' },
          { id: 'v8', name: 'Mercedes Atego' },
          { id: 'v9', name: 'Volvo FM' },
          { id: 'v10', name: 'Scania S' },
          { id: 'v11', name: 'MAN TGS' },
          { id: 'v12', name: 'DAF CF' },
          { id: 'v13', name: 'Renault D' },
          { id: 'v14', name: 'Iveco Daily' },
          { id: 'v15', name: 'Mercedes Arocs' }
        ];
        break;
      case 'driver':
        items = [
          { id: 'd1', name: 'Jan Kowalski' },
          { id: 'd2', name: 'Anna Nowak' },
          { id: 'd3', name: 'Piotr Wiśniewski' },
          { id: 'd4', name: 'Katarzyna Dąbrowska' },
          { id: 'd5', name: 'Tomasz Lewandowski' },
          { id: 'd6', name: 'Małgorzata Wójcik' },
          { id: 'd7', name: 'Michał Kamiński' },
          { id: 'd8', name: 'Agnieszka Kowalczyk' },
          { id: 'd9', name: 'Krzysztof Zieliński' },
          { id: 'd10', name: 'Monika Szymańska' },
          { id: 'd11', name: 'Grzegorz Woźniak' },
          { id: 'd12', name: 'Barbara Kaczmarek' },
          { id: 'd13', name: 'Andrzej Piotrowski' },
          { id: 'd14', name: 'Ewa Grabowska' },
          { id: 'd15', name: 'Robert Michalski' }
        ];
        break;
      case 'route':
        items = [
          { id: 'r1', name: 'Warszawa - Kraków' },
          { id: 'r2', name: 'Warszawa - Gdańsk' },
          { id: 'r3', name: 'Warszawa - Poznań' },
          { id: 'r4', name: 'Warszawa - Wrocław' },
          { id: 'r5', name: 'Kraków - Gdańsk' },
          { id: 'r6', name: 'Kraków - Poznań' },
          { id: 'r7', name: 'Kraków - Wrocław' },
          { id: 'r8', name: 'Gdańsk - Poznań' },
          { id: 'r9', name: 'Gdańsk - Wrocław' },
          { id: 'r10', name: 'Poznań - Wrocław' },
          { id: 'r11', name: 'Warszawa - Łódź' },
          { id: 'r12', name: 'Kraków - Łódź' },
          { id: 'r13', name: 'Gdańsk - Łódź' },
          { id: 'r14', name: 'Poznań - Łódź' },
          { id: 'r15', name: 'Wrocław - Łódź' }
        ];
        break;
      default:
        items = [];
    }
    
    // Generate values for each item based on metric
    return items.map((item, index) => {
      let value, change, status;
      
      // Generowanie bardziej realistycznych danych z pewnym wzorcem
      // Dla każdego typu porównania używamy innego wzorca, aby dane były zróżnicowane
      const baseValue = this._getBaseValueForMetric(metric);
      const variationFactor = comparisonType === 'vehicle' ? 0.5 : 
                             comparisonType === 'driver' ? 0.3 : 0.4;
      
      // Generowanie wartości z pewnym wzorcem (np. pierwsze elementy mają lepsze wyniki)
      const patternFactor = 1 + (index / items.length) * variationFactor;
      
      // Dodanie losowego czynnika, aby dane nie były zbyt przewidywalne
      const randomFactor = 1 + (Math.random() * 0.4 - 0.2);
      
      value = baseValue * patternFactor * randomFactor;
      
      // Formatowanie wartości w zależności od metryki
      switch (metric) {
        case 'fuelConsumption':
          value = parseFloat(value.toFixed(1));
          change = parseFloat((Math.random() * 10 - 5).toFixed(1));
          status = value < 8 ? 'good' : value < 10 ? 'warning' : 'critical';
          break;
        case 'operationalCosts':
          value = Math.floor(value);
          change = parseFloat((Math.random() * 10 - 5).toFixed(1));
          status = value < 10000 ? 'good' : value < 11000 ? 'warning' : 'critical';
          break;
        case 'co2Emission':
          value = Math.floor(value);
          change = parseFloat((Math.random() * 10 - 5).toFixed(1));
          status = value < 2000 ? 'good' : value < 2300 ? 'warning' : 'critical';
          break;
        case 'efficiency':
          value = parseFloat(value.toFixed(1));
          change = parseFloat((Math.random() * 10 - 5).toFixed(1));
          status = value > 85 ? 'good' : value > 75 ? 'warning' : 'critical';
          break;
        case 'utilization':
          value = parseFloat(value.toFixed(1));
          change = parseFloat((Math.random() * 10 - 5).toFixed(1));
          status = value > 80 ? 'good' : value > 70 ? 'warning' : 'critical';
          break;
        case 'maintenanceCosts':
          value = Math.floor(value);
          change = parseFloat((Math.random() * 10 - 5).toFixed(1));
          status = value < 1500 ? 'good' : value < 2500 ? 'warning' : 'critical';
          break;
        default:
          value = parseFloat(value.toFixed(1));
          change = parseFloat((Math.random() * 10 - 5).toFixed(1));
          status = 'good';
      }
      
      return {
        ...item,
        value,
        change,
        status,
        rank: index + 1
      };
    }).sort((a, b) => {
      // Sort based on metric (some metrics are better when lower, some when higher)
      if (['fuelConsumption', 'operationalCosts', 'co2Emission', 'maintenanceCosts'].includes(metric)) {
        return a.value - b.value; // Lower is better
      } else {
        return b.value - a.value; // Higher is better
      }
    }).map((item, index) => ({
      ...item,
      rank: index + 1
    }));
  }
  
  /**
   * Get distribution data for statistics
   * @param {string} distributionType - Type of distribution (fuelByRoute, costsByVehicle, etc.)
   * @param {string} timeRange - Time range for data
   * @returns {Promise<Array>} Distribution data
   */
  async getDistributionData(distributionType = 'fuelByRoute', timeRange = 'month') {
    await delay(800);
    
    let data = [];
    
    switch (distributionType) {
      case 'fuelByRoute':
        data = [
          { category: 'Trasy miejskie', value: 35 },
          { category: 'Trasy międzymiastowe', value: 45 },
          { category: 'Autostrady', value: 20 }
        ];
        break;
      case 'costsByCategory':
        data = [
          { category: 'Paliwo', value: 65 },
          { category: 'Konserwacja', value: 15 },
          { category: 'Ubezpieczenie', value: 10 },
          { category: 'Opłaty drogowe', value: 5 },
          { category: 'Inne', value: 5 }
        ];
        break;
      case 'vehiclesByType':
        data = [
          { category: 'Ciężarowe', value: 60 },
          { category: 'Dostawcze', value: 25 },
          { category: 'Osobowe', value: 15 }
        ];
        break;
      case 'emissionsBySource':
        data = [
          { category: 'Transport', value: 75 },
          { category: 'Magazyny', value: 15 },
          { category: 'Biura', value: 10 }
        ];
        break;
      default:
        data = [
          { category: 'Kategoria 1', value: 30 },
          { category: 'Kategoria 2', value: 40 },
          { category: 'Kategoria 3', value: 30 }
        ];
    }
    
    return data;
  }
  
  /**
   * Get radar chart data for statistics
   * @param {string} radarType - Type of radar chart (vehiclePerformance, driverSkills, etc.)
   * @param {string} entityId - ID of the entity to analyze
   * @returns {Promise<Object>} Radar chart data
   */
  async getRadarData(radarType = 'vehiclePerformance', entityId = null) {
    await delay(800);
    
    let categories = [];
    let values = [];
    let benchmarkValues = [];
    
    switch (radarType) {
      case 'vehiclePerformance':
        categories = ['Zużycie paliwa', 'Efektywność', 'Niezawodność', 'Koszty utrzymania', 'Emisja CO2'];
        values = [85, 70, 90, 65, 80];
        benchmarkValues = [75, 75, 75, 75, 75];
        break;
      case 'driverSkills':
        categories = ['Ekonomiczna jazda', 'Bezpieczeństwo', 'Punktualność', 'Dbałość o pojazd', 'Obsługa klienta'];
        values = [75, 85, 90, 70, 80];
        benchmarkValues = [70, 70, 70, 70, 70];
        break;
      case 'routeEfficiency':
        categories = ['Czas przejazdu', 'Zużycie paliwa', 'Koszty', 'Bezpieczeństwo', 'Obciążenie dróg'];
        values = [65, 80, 75, 90, 85];
        benchmarkValues = [80, 80, 80, 80, 80];
        break;
      default:
        categories = ['Kategoria 1', 'Kategoria 2', 'Kategoria 3', 'Kategoria 4', 'Kategoria 5'];
        values = [70, 70, 70, 70, 70];
        benchmarkValues = [60, 60, 60, 60, 60];
    }
    
    // Jeśli podano ID encji, dodaj losowe wahania do wartości
    if (entityId) {
      values = values.map(value => {
        const variation = Math.random() * 20 - 10; // Losowe wahania ±10
        return Math.min(100, Math.max(0, Math.round(value + variation)));
      });
    }
    
    return {
      categories,
      values,
      benchmarkValues
    };
  }
  
  /**
   * Get anomaly data for statistics
   * @param {string} timeRange - Time range for data
   * @param {string} severity - Severity filter
   * @param {number} page - Page number
   * @param {number} limit - Items per page
   * @returns {Promise<Object>} Anomaly data
   */
  async getAnomalyData(timeRange = 'month', severity = 'all', page = 1, limit = 10) {
    await delay(900);
    
    // Generate anomalies data
    let anomalies = this._generateAnomalies();
    
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
      period: timeRange,
      total,
      page,
      limit,
      data: paginatedAnomalies
    };
  }
  
  // Helper method to get base value for metric
  _getBaseValueForMetric(metric) {
    switch (metric) {
      case 'fuelConsumption':
        return 8;
      case 'operationalCosts':
        return 10000;
      case 'co2Emission':
        return 2000;
      case 'efficiency':
        return 80;
      case 'utilization':
        return 75;
      case 'maintenanceCosts':
        return 1500;
      default:
        return 50;
    }
  }
  
  // Helper method to generate dates based on time range
  _generateDates(timeRange) {
    const dates = [];
    const now = new Date();
    let count, interval, format;
    
    switch (timeRange) {
      case 'day':
        count = 24;
        interval = 60 * 60 * 1000; // 1 hour
        format = 'HH:00';
        break;
      case 'week':
        count = 7;
        interval = 24 * 60 * 60 * 1000; // 1 day
        format = 'DD.MM';
        break;
      case 'year':
        count = 12;
        interval = 30 * 24 * 60 * 60 * 1000; // ~1 month
        format = 'MM.YYYY';
        break;
      case 'month':
      default:
        count = 30;
        interval = 24 * 60 * 60 * 1000; // 1 day
        format = 'DD.MM';
    }
    
    for (let i = count - 1; i >= 0; i--) {
      const date = new Date(now.getTime() - i * interval);
      dates.push(this._formatDate(date, format));
    }
    
    return dates;
  }
  
  // Helper method to format date
  _formatDate(date, format) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    
    switch (format) {
      case 'HH:00':
        return `${hours}:00`;
      case 'DD.MM':
        return `${day}.${month}`;
      case 'MM.YYYY':
        return `${month}.${year}`;
      default:
        return `${day}.${month}.${year}`;
    }
  }
  
  // Helper method to generate anomalies
  _generateAnomalies() {
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
  
  // Helper method to determine status from trend
  _getStatusFromTrend(trend, higherIsBetter = true) {
    if (higherIsBetter) {
      return trend > 2 ? 'good' : trend > 0 ? 'warning' : 'critical';
    } else {
      return trend < -2 ? 'good' : trend < 0 ? 'warning' : 'critical';
    }
  }
}

export const mockStatisticsService = new MockStatisticsService();
export default mockStatisticsService;
