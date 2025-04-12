import apiClient from './apiClient';

// Interfejsy dla typów danych
export interface FraudAlert {
  id: string;
  priority: string;
  vehicle: string;
  description: string;
  date: string;
  location: string;
  status: string;
  details?: {
    transactionId: string;
    amount: number;
    fuelType: string;
    quantity: number;
    driverId: string;
    locationCoordinates?: {
      latitude: number;
      longitude: number;
    };
    cardVerification?: {
      status: string;
      cardLocation: {
        latitude: number;
        longitude: number;
      };
      distanceFromVehicle: number;
    };
    transactionHistory?: Array<{
      date: string;
      amount: number;
      quantity: number;
      location: string;
    }>;
  };
}

export interface FraudAlertsResponse {
  total: number;
  page: number;
  limit: number;
  alerts: FraudAlert[];
}

export interface TransactionPattern {
  date: string;
  vehicle: string;
  driver: string;
  amount: string;
  quantity: string;
  location: string;
  riskLevel: string;
}

export interface TransactionAnalysis {
  averageAmount: number;
  averageQuantity: number;
  frequentLocations: Array<{
    location: string;
    count: number;
  }>;
  riskDistribution: Array<{
    category: string;
    percentage: number;
    color: string;
  }>;
}

export interface TransactionPatternsResponse {
  patterns: TransactionPattern[];
  analysis: TransactionAnalysis;
}

export interface AlertStatusUpdate {
  status: string;
  comment?: string;
}

export interface AlertStatusUpdateResponse {
  id: string;
  status: string;
  updatedAt: string;
}

// Klasa serwisu API dla wykrywania oszustw
class FraudDetectionService {
  // Pobieranie alertów oszustw
  public async getAlerts(
    priority?: string,
    status?: string,
    dateFrom?: string,
    dateTo?: string,
    search?: string,
    page: number = 1,
    limit: number = 10
  ): Promise<FraudAlertsResponse> {
    const params = {
      priority,
      status,
      date_from: dateFrom,
      date_to: dateTo,
      search,
      page,
      limit
    };
    
    return apiClient.get<FraudAlertsResponse>('/fraud/alerts', params);
  }
  
  // Pobieranie szczegółów alertu
  public async getAlertDetails(id: string): Promise<FraudAlert> {
    return apiClient.get<FraudAlert>(`/fraud/alerts/${id}`);
  }
  
  // Aktualizacja statusu alertu
  public async updateAlertStatus(
    id: string, 
    statusUpdate: AlertStatusUpdate
  ): Promise<AlertStatusUpdateResponse> {
    return apiClient.put<AlertStatusUpdateResponse>(
      `/fraud/alerts/${id}/status`, 
      statusUpdate
    );
  }
  
  // Pobieranie wzorców transakcji
  public async getTransactionPatterns(
    vehicle?: string,
    driver?: string,
    dateFrom?: string,
    dateTo?: string
  ): Promise<TransactionPatternsResponse> {
    const params = {
      vehicle,
      driver,
      date_from: dateFrom,
      date_to: dateTo
    };
    
    return apiClient.get<TransactionPatternsResponse>('/fraud/transactions/patterns', params);
  }
}

// Eksport instancji serwisu
export const fraudDetectionService = new FraudDetectionService();
export default fraudDetectionService;
