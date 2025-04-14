// Common types for the Fleet App

// Driver types
export interface Driver {
  name: string;
  id: string;
  vehicle: string;
  shift: DriverShift;
  metrics: DriverMetrics;
}

export interface DriverShift {
  start: string;
  end: string;
  duration: number;
  remaining: number;
}

export interface DriverMetrics {
  blinkRate: number;
  yawns: number;
  headPosition: string;
  eyesClosed: number;
  distractions: number;
  focusScore: number;
}

// Alert types
export type AlertSeverity = 'low' | 'medium' | 'high';
export type MonitoringStatus = 'normal' | 'warning' | 'danger' | 'inactive';

export interface Alert {
  id: string;
  title: string;
  details: string;
  severity: AlertSeverity;
  timestamp: string;
}

// Settings types
export interface FatigueMonitoringSettings {
  enableFatigueDetection: boolean;
  enableDistractionDetection: boolean;
  enableAlerts: boolean;
  alertSensitivity: number;
  blinkRateThreshold: number;
  yawnThreshold: number;
  eyesClosedThreshold: number;
  distractionThreshold: number;
}

// Vehicle types
export interface Vehicle {
  id: string;
  registrationNumber: string;
  make: string;
  model: string;
  year: number;
  status: string;
}

// Fraud types
export interface FraudAlert {
  id: string;
  priority: string;
  vehicle: string;
  description: string;
  date: string;
  location: string;
  status: string;
  details: FraudAlertDetails;
}

export interface FraudAlertDetails {
  transactionId: string;
  amount: number;
  fuelType: string;
  quantity: number;
  driverId: string;
  locationCoordinates?: {
    latitude: number;
    longitude: number;
  };
}

// Safety types
export interface SafetyAlert {
  id: string;
  type: string;
  driver: string;
  description: string;
  time: string;
  location: string;
  status: string;
  details: SafetyAlertDetails;
}

export interface SafetyAlertDetails {
  incidentType: string;
  severity: string;
  driverState: string;
  vehicleSpeed: number;
  videoUrl?: string;
  locationCoordinates?: {
    latitude: number;
    longitude: number;
  };
}

// Maintenance types
export interface MaintenanceForecast {
  id: string;
  vehicle: string;
  component: string;
  forecast: string;
  confidence: string;
  details: MaintenanceForecastDetails;
}

export interface MaintenanceForecastDetails {
  componentId: string;
  currentHealth: number;
  predictedFailureDate: string;
  recommendedAction: string;
}

// View customization types
export interface View {
  id: string;
  name: string;
  description: string;
  isDefault: boolean;
  sections: ViewSection[];
  userGroups: string[];
}

export interface ViewSection {
  id: string;
  name: string;
  type: string;
  visible: boolean;
  order: number;
}
