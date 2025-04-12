import apiClient from './apiClient';

// Interfejsy dla typów danych
export interface KPIData {
  activeVehicles: number;
  activeDrivers: number;
  dailyCosts: number;
  potentialSavings: number;
  safetyIndex: number;
  maintenanceForecast: number;
}

export interface Alert {
  id: string;
  priority?: string;
  type?: string;
  vehicle?: string;
  driver?: string;
  description: string;
  date?: string;
  time?: string;
  location?: string;
  status: string;
  component?: string;
  forecast?: string;
  confidence?: string;
}

export interface MapPoint {
  id: string;
  type: string;
  latitude: number;
  longitude: number;
  label: string;
}

export interface MapData {
  points: MapPoint[];
}

export interface AlertsResponse {
  fraudAlerts: Alert[];
  safetyAlerts: Alert[];
  maintenanceAlerts: Alert[];
}

// Klasa serwisu API dla dashboardu
class DashboardService {
  // Pobieranie danych KPI
  public async getKPIData(dateFrom?: string, dateTo?: string): Promise<KPIData> {
    const params = {
      date_from: dateFrom,
      date_to: dateTo
    };
    
    return apiClient.get<KPIData>('/dashboard/kpi', params);
  }
  
  // Pobieranie alertów
  public async getAlerts(type?: string, limit: number = 10): Promise<AlertsResponse> {
    const params = {
      type,
      limit
    };
    
    return apiClient.get<AlertsResponse>('/dashboard/alerts', params);
  }
  
  // Pobieranie danych mapy
  public async getMapData(type?: string): Promise<MapData> {
    const params = {
      type
    };
    
    return apiClient.get<MapData>('/dashboard/map', params);
  }
}

// Eksport instancji serwisu
export const dashboardService = new DashboardService();
export default dashboardService;
