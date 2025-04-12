import apiClient from './apiClient';

// Interfejsy dla typów danych
export interface SafetyAlert {
  id: string;
  type: string;
  driver: string;
  description: string;
  time: string;
  location: string;
  status: string;
  details?: {
    incidentType: string;
    severity: string;
    driverState: string;
    vehicleSpeed: number;
    videoUrl: string;
    locationCoordinates: {
      latitude: number;
      longitude: number;
    };
  };
}

export interface SafetyAlertsResponse {
  total: number;
  page: number;
  limit: number;
  alerts: SafetyAlert[];
}

export interface DriverRanking {
  driver: string;
  score: number;
  trend: string;
  details: {
    fatigueScore: number;
    distractionScore: number;
    drivingStyleScore: number;
    collisionRiskScore: number;
  };
}

export interface DriverRankingResponse {
  rankings: DriverRanking[];
}

export interface DrivingStyleCategory {
  category: string;
  value: number;
  angle: number;
  labelPosition: {
    x: number;
    y: number;
  };
}

export interface DrivingStyleHistory {
  date: string;
  score: number;
}

export interface DrivingStyleRecommendation {
  category: string;
  recommendation: string;
}

export interface DrivingStyleResponse {
  driver: string;
  overallScore: number;
  drivingStyle: DrivingStyleCategory[];
  history: DrivingStyleHistory[];
  recommendations: DrivingStyleRecommendation[];
}

export interface CoachingSession {
  id: string;
  driver: string;
  type: string;
  topic: string;
  date: string;
  status: string;
}

export interface CoachingSessionsResponse {
  sessions: CoachingSession[];
}

// Klasa serwisu API dla bezpieczeństwa kierowcy
class DriverSafetyService {
  // Pobieranie alertów bezpieczeństwa
  public async getAlerts(
    type?: string,
    time?: string,
    search?: string,
    page: number = 1,
    limit: number = 10
  ): Promise<SafetyAlertsResponse> {
    const params = {
      type,
      time,
      search,
      page,
      limit
    };
    
    return apiClient.get<SafetyAlertsResponse>('/safety/alerts', params);
  }
  
  // Pobieranie szczegółów alertu bezpieczeństwa
  public async getAlertDetails(id: string): Promise<SafetyAlert> {
    return apiClient.get<SafetyAlert>(`/safety/alerts/${id}`);
  }
  
  // Pobieranie rankingu bezpieczeństwa kierowców
  public async getDriverRanking(
    limit: number = 10,
    sort: string = 'score_desc'
  ): Promise<DriverRankingResponse> {
    const params = {
      limit,
      sort
    };
    
    return apiClient.get<DriverRankingResponse>('/safety/drivers/ranking', params);
  }
  
  // Pobieranie analizy stylu jazdy kierowcy
  public async getDriverStyle(driverId: string): Promise<DrivingStyleResponse> {
    return apiClient.get<DrivingStyleResponse>(`/safety/drivers/${driverId}/style`);
  }
  
  // Pobieranie sesji coachingowych
  public async getCoachingSessions(
    driver?: string,
    status?: string
  ): Promise<CoachingSessionsResponse> {
    const params = {
      driver,
      status
    };
    
    return apiClient.get<CoachingSessionsResponse>('/safety/coaching', params);
  }
}

// Eksport instancji serwisu
export const driverSafetyService = new DriverSafetyService();
export default driverSafetyService;
