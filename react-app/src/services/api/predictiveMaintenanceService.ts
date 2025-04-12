import apiClient from './apiClient';

// Interfejsy dla typów danych
export interface MaintenanceAlert {
  id: string;
  priority: string;
  vehicle: string;
  component: string;
  description: string;
  forecastDate: string;
  confidence: string;
  status: string;
  details?: {
    componentId: string;
    componentType: string;
    lastMaintenance: string;
    currentCondition: string;
    estimatedLifeRemaining: string;
    failureProbability: number;
    recommendedAction: string;
    estimatedCost: number;
    sensorData?: Array<{
      sensorId: string;
      sensorType: string;
      readings: Array<{
        timestamp: string;
        value: number;
      }>;
      threshold: number;
      unit: string;
    }>;
  };
}

export interface MaintenanceAlertsResponse {
  total: number;
  page: number;
  limit: number;
  alerts: MaintenanceAlert[];
}

export interface VehicleHealth {
  vehicle: string;
  overallHealth: number;
  components: Array<{
    name: string;
    health: number;
    status: string;
  }>;
  lastMaintenance: string;
  nextScheduledMaintenance: string;
}

export interface VehicleHealthResponse {
  vehicles: VehicleHealth[];
}

export interface MaintenanceHistory {
  id: string;
  vehicle: string;
  date: string;
  type: string;
  components: string[];
  cost: number;
  technician: string;
  notes: string;
}

export interface MaintenanceHistoryResponse {
  total: number;
  page: number;
  limit: number;
  history: MaintenanceHistory[];
}

export interface MaintenanceSchedule {
  id: string;
  vehicle: string;
  scheduledDate: string;
  type: string;
  components: string[];
  estimatedDuration: string;
  estimatedCost: number;
  status: string;
}

export interface MaintenanceScheduleResponse {
  total: number;
  page: number;
  limit: number;
  schedule: MaintenanceSchedule[];
}

export interface PartInventory {
  id: string;
  name: string;
  partNumber: string;
  quantity: number;
  reorderLevel: number;
  supplier: string;
  lastOrderDate: string;
  price: number;
}

export interface PartInventoryResponse {
  total: number;
  page: number;
  limit: number;
  inventory: PartInventory[];
}

export interface MaintenanceCostAnalysis {
  totalCost: number;
  costByVehicle: Array<{
    vehicle: string;
    cost: number;
  }>;
  costByComponent: Array<{
    component: string;
    cost: number;
  }>;
  costByMonth: Array<{
    month: string;
    cost: number;
  }>;
  preventiveVsCorrective: {
    preventive: number;
    corrective: number;
  };
}

// Klasa serwisu API dla konserwacji predykcyjnej
class PredictiveMaintenanceService {
  // Pobieranie alertów konserwacji
  public async getAlerts(
    priority?: string,
    vehicle?: string,
    component?: string,
    status?: string,
    page: number = 1,
    limit: number = 10
  ): Promise<MaintenanceAlertsResponse> {
    const params = {
      priority,
      vehicle,
      component,
      status,
      page,
      limit
    };
    
    return apiClient.get<MaintenanceAlertsResponse>('/maintenance/alerts', params);
  }
  
  // Pobieranie szczegółów alertu konserwacji
  public async getAlertDetails(id: string): Promise<MaintenanceAlert> {
    return apiClient.get<MaintenanceAlert>(`/maintenance/alerts/${id}`);
  }
  
  // Aktualizacja statusu alertu
  public async updateAlertStatus(
    id: string, 
    status: string
  ): Promise<MaintenanceAlert> {
    return apiClient.put<MaintenanceAlert>(
      `/maintenance/alerts/${id}/status`, 
      { status }
    );
  }
  
  // Pobieranie stanu technicznego pojazdów
  public async getVehicleHealth(
    vehicle?: string
  ): Promise<VehicleHealthResponse> {
    const params = {
      vehicle
    };
    
    return apiClient.get<VehicleHealthResponse>('/maintenance/vehicles/health', params);
  }
  
  // Pobieranie historii konserwacji
  public async getMaintenanceHistory(
    vehicle?: string,
    dateFrom?: string,
    dateTo?: string,
    type?: string,
    page: number = 1,
    limit: number = 10
  ): Promise<MaintenanceHistoryResponse> {
    const params = {
      vehicle,
      date_from: dateFrom,
      date_to: dateTo,
      type,
      page,
      limit
    };
    
    return apiClient.get<MaintenanceHistoryResponse>('/maintenance/history', params);
  }
  
  // Pobieranie harmonogramu konserwacji
  public async getMaintenanceSchedule(
    vehicle?: string,
    dateFrom?: string,
    dateTo?: string,
    status?: string,
    page: number = 1,
    limit: number = 10
  ): Promise<MaintenanceScheduleResponse> {
    const params = {
      vehicle,
      date_from: dateFrom,
      date_to: dateTo,
      status,
      page,
      limit
    };
    
    return apiClient.get<MaintenanceScheduleResponse>('/maintenance/schedule', params);
  }
  
  // Pobieranie inwentarza części
  public async getPartInventory(
    search?: string,
    lowStock?: boolean,
    page: number = 1,
    limit: number = 10
  ): Promise<PartInventoryResponse> {
    const params = {
      search,
      low_stock: lowStock,
      page,
      limit
    };
    
    return apiClient.get<PartInventoryResponse>('/maintenance/parts', params);
  }
  
  // Pobieranie analizy kosztów konserwacji
  public async getCostAnalysis(
    dateFrom?: string,
    dateTo?: string,
    vehicle?: string
  ): Promise<MaintenanceCostAnalysis> {
    const params = {
      date_from: dateFrom,
      date_to: dateTo,
      vehicle
    };
    
    return apiClient.get<MaintenanceCostAnalysis>('/maintenance/costs/analysis', params);
  }
}

// Eksport instancji serwisu
export const predictiveMaintenanceService = new PredictiveMaintenanceService();
export default predictiveMaintenanceService;
