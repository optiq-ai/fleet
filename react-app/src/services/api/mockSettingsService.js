/**
 * Mock Settings Service
 * 
 * This service provides mock data for the Settings section of the application.
 * It simulates API responses for various settings categories including:
 * - Personalization
 * - User Preferences
 * - Fleet Configuration
 * - Integrations
 * - Security & Permissions
 * - Alerts & Thresholds
 * - Automation
 * - Backups & History
 */

// Personalization settings
const personalizationSettings = {
  theme: 'light', // light, dark, blue, green
  dashboardLayout: [
    { id: 'kpi-summary', enabled: true, order: 1 },
    { id: 'fleet-status', enabled: true, order: 2 },
    { id: 'recent-alerts', enabled: true, order: 3 },
    { id: 'fuel-consumption', enabled: true, order: 4 },
    { id: 'maintenance-schedule', enabled: false, order: 5 },
    { id: 'driver-performance', enabled: true, order: 6 },
    { id: 'weather-conditions', enabled: false, order: 7 },
    { id: 'route-efficiency', enabled: true, order: 8 }
  ],
  informationDensity: 'standard', // compact, standard, expanded
  language: 'pl', // pl, en, de, fr, es
  availableLanguages: [
    { code: 'pl', name: 'Polski' },
    { code: 'en', name: 'English' },
    { code: 'de', name: 'Deutsch' },
    { code: 'fr', name: 'Français' },
    { code: 'es', name: 'Español' }
  ],
  availableThemes: [
    { id: 'light', name: 'Jasny', primaryColor: '#ffffff', secondaryColor: '#f0f2f5' },
    { id: 'dark', name: 'Ciemny', primaryColor: '#1f1f1f', secondaryColor: '#2d2d2d' },
    { id: 'blue', name: 'Niebieski', primaryColor: '#e6f7ff', secondaryColor: '#bae7ff' },
    { id: 'green', name: 'Zielony', primaryColor: '#f6ffed', secondaryColor: '#d9f7be' }
  ]
};

// User preferences
const userPreferences = {
  notifications: {
    email: {
      enabled: true,
      types: [
        { id: 'alert', name: 'Alerty', enabled: true },
        { id: 'report', name: 'Raporty', enabled: true },
        { id: 'maintenance', name: 'Konserwacja', enabled: false },
        { id: 'system', name: 'Systemowe', enabled: true }
      ]
    },
    push: {
      enabled: true,
      types: [
        { id: 'alert', name: 'Alerty', enabled: true },
        { id: 'report', name: 'Raporty', enabled: false },
        { id: 'maintenance', name: 'Konserwacja', enabled: true },
        { id: 'system', name: 'Systemowe', enabled: false }
      ]
    },
    sms: {
      enabled: false,
      types: [
        { id: 'alert', name: 'Alerty', enabled: false },
        { id: 'report', name: 'Raporty', enabled: false },
        { id: 'maintenance', name: 'Konserwacja', enabled: false },
        { id: 'system', name: 'Systemowe', enabled: false }
      ]
    }
  },
  reportFrequency: 'weekly', // daily, weekly, monthly
  dataFormat: {
    distance: 'km', // km, miles
    volume: 'liters', // liters, gallons
    currency: 'PLN', // PLN, EUR, USD
    temperature: 'celsius' // celsius, fahrenheit
  },
  timezone: {
    automatic: true,
    selected: 'Europe/Warsaw'
  },
  availableTimezones: [
    { id: 'Europe/Warsaw', name: 'Warszawa (GMT+2)' },
    { id: 'Europe/London', name: 'Londyn (GMT+1)' },
    { id: 'Europe/Berlin', name: 'Berlin (GMT+2)' },
    { id: 'Europe/Paris', name: 'Paryż (GMT+2)' },
    { id: 'America/New_York', name: 'Nowy Jork (GMT-4)' }
  ]
};

// Fleet configuration
const fleetConfiguration = {
  vehicleCategories: [
    { id: 1, name: 'Dostawcze', description: 'Pojazdy dostawcze do 3.5t', count: 12 },
    { id: 2, name: 'Ciężarowe', description: 'Pojazdy ciężarowe powyżej 3.5t', count: 8 },
    { id: 3, name: 'Osobowe', description: 'Samochody osobowe', count: 5 },
    { id: 4, name: 'Specjalistyczne', description: 'Pojazdy specjalistyczne', count: 3 }
  ],
  vehicleParameters: {
    fuelConsumptionThresholds: {
      dostawcze: 9.5, // l/100km
      ciezarowe: 28.0, // l/100km
      osobowe: 7.5, // l/100km
      specjalistyczne: 15.0 // l/100km
    },
    mileageLimits: {
      dostawcze: 50000, // km/rok
      ciezarowe: 120000, // km/rok
      osobowe: 30000, // km/rok
      specjalistyczne: 20000 // km/rok
    },
    serviceCycles: {
      dostawcze: 15000, // km
      ciezarowe: 30000, // km
      osobowe: 15000, // km
      specjalistyczne: 10000 // km
    }
  },
  driverGroups: [
    { id: 1, name: 'Kierowcy lokalni', description: 'Dostawy lokalne', count: 10 },
    { id: 2, name: 'Kierowcy międzynarodowi', description: 'Trasy międzynarodowe', count: 8 },
    { id: 3, name: 'Kierowcy specjalistyczni', description: 'Pojazdy specjalistyczne', count: 4 }
  ],
  operationalRegions: [
    { id: 1, name: 'Polska', active: true },
    { id: 2, name: 'Niemcy', active: true },
    { id: 3, name: 'Czechy', active: true },
    { id: 4, name: 'Słowacja', active: false },
    { id: 5, name: 'Litwa', active: false }
  ]
};

// Integrations
const integrations = {
  apiKeys: [
    { id: 1, name: 'API klucz produkcyjny', key: 'pk_prod_7f8a9b3c2d1e', active: true, created: '2024-01-15', lastUsed: '2025-04-16' },
    { id: 2, name: 'API klucz testowy', key: 'pk_test_3e4d5f6g7h8i', active: true, created: '2024-01-15', lastUsed: '2025-03-22' },
    { id: 3, name: 'API klucz deweloperski', key: 'pk_dev_9i8u7y6t5r4e', active: false, created: '2024-01-15', lastUsed: '2024-11-05' }
  ],
  externalSystems: [
    { id: 1, name: 'System księgowy', type: 'accounting', status: 'connected', lastSync: '2025-04-16 08:30' },
    { id: 2, name: 'CRM', type: 'crm', status: 'disconnected', lastSync: '2025-03-10 14:15' },
    { id: 3, name: 'System ERP', type: 'erp', status: 'connected', lastSync: '2025-04-15 23:45' }
  ],
  mapProviders: [
    { id: 'google', name: 'Google Maps', active: true, apiKey: 'gm_api_1a2b3c4d5e' },
    { id: 'osm', name: 'OpenStreetMap', active: false, apiKey: '' },
    { id: 'tomtom', name: 'TomTom', active: false, apiKey: '' }
  ],
  dataExportImport: {
    automaticExport: {
      enabled: true,
      frequency: 'daily', // daily, weekly, monthly
      format: 'csv', // csv, json, xml
      destination: 'ftp', // ftp, email, api
      lastExport: '2025-04-16 01:00'
    },
    automaticImport: {
      enabled: false,
      frequency: 'daily', // daily, weekly, monthly
      source: 'api', // ftp, api
      lastImport: '2025-04-10 01:00'
    }
  }
};

// Security and permissions
const securityPermissions = {
  userRoles: [
    { id: 1, name: 'Administrator', description: 'Pełny dostęp do systemu', userCount: 2 },
    { id: 2, name: 'Manager', description: 'Zarządzanie flotą i raportowanie', userCount: 5 },
    { id: 3, name: 'Dyspozytor', description: 'Planowanie tras i komunikacja', userCount: 8 },
    { id: 4, name: 'Kierowca', description: 'Dostęp do aplikacji mobilnej', userCount: 22 }
  ],
  permissions: {
    dashboard: {
      view: ['administrator', 'manager', 'dyspozytor', 'kierowca'],
      edit: ['administrator', 'manager']
    },
    fleetManagement: {
      view: ['administrator', 'manager', 'dyspozytor'],
      edit: ['administrator', 'manager'],
      delete: ['administrator']
    },
    driverManagement: {
      view: ['administrator', 'manager', 'dyspozytor'],
      edit: ['administrator', 'manager'],
      delete: ['administrator']
    },
    reports: {
      view: ['administrator', 'manager', 'dyspozytor'],
      create: ['administrator', 'manager'],
      export: ['administrator', 'manager']
    },
    settings: {
      view: ['administrator'],
      edit: ['administrator']
    }
  },
  passwordPolicy: {
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
    expiryDays: 90,
    preventReuse: 5
  },
  twoFactorAuth: {
    enabled: true,
    methods: [
      { id: 'app', name: 'Aplikacja uwierzytelniająca', enabled: true },
      { id: 'sms', name: 'SMS', enabled: true },
      { id: 'email', name: 'Email', enabled: false }
    ],
    requiredFor: ['administrator', 'manager']
  }
};

// Alerts and thresholds
const alertsThresholds = {
  fuelConsumption: [
    { id: 1, name: 'Wysokie zużycie paliwa', threshold: 15, unit: '%', condition: 'above_average', severity: 'warning', enabled: true },
    { id: 2, name: 'Krytyczne zużycie paliwa', threshold: 30, unit: '%', condition: 'above_average', severity: 'critical', enabled: true },
    { id: 3, name: 'Niskie zużycie paliwa', threshold: 15, unit: '%', condition: 'below_average', severity: 'info', enabled: false }
  ],
  costs: [
    { id: 1, name: 'Przekroczenie budżetu paliwowego', threshold: 10, unit: '%', condition: 'above_budget', severity: 'warning', enabled: true },
    { id: 2, name: 'Przekroczenie budżetu serwisowego', threshold: 20, unit: '%', condition: 'above_budget', severity: 'warning', enabled: true },
    { id: 3, name: 'Przekroczenie budżetu ogólnego', threshold: 15, unit: '%', condition: 'above_budget', severity: 'critical', enabled: true }
  ],
  safety: [
    { id: 1, name: 'Przekroczenie prędkości', threshold: 10, unit: 'km/h', condition: 'above_limit', severity: 'warning', enabled: true },
    { id: 2, name: 'Gwałtowne hamowanie', threshold: 3, unit: 'incidents', condition: 'per_day', severity: 'warning', enabled: true },
    { id: 3, name: 'Długi czas jazdy', threshold: 4, unit: 'hours', condition: 'continuous', severity: 'critical', enabled: true }
  ],
  alertSchedule: {
    active: true,
    workingDays: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: false,
      sunday: false
    },
    workingHours: {
      start: '08:00',
      end: '18:00'
    },
    exceptions: [
      { date: '2025-05-01', active: false, reason: 'Święto' },
      { date: '2025-05-03', active: false, reason: 'Święto' }
    ]
  }
};

// Automation
const automation = {
  automationRules: [
    { 
      id: 1, 
      name: 'Automatyczne planowanie tras', 
      description: 'Automatycznie planuje trasy dla kierowców na następny dzień',
      trigger: 'schedule',
      schedule: '22:00',
      active: true,
      lastRun: '2025-04-16 22:00',
      nextRun: '2025-04-17 22:00'
    },
    { 
      id: 2, 
      name: 'Powiadomienie o przeglądzie', 
      description: 'Wysyła powiadomienie o zbliżającym się przeglądzie',
      trigger: 'condition',
      condition: 'service_due_in_days < 7',
      active: true,
      lastRun: '2025-04-15 08:00',
      nextRun: 'On condition'
    },
    { 
      id: 3, 
      name: 'Raport tygodniowy', 
      description: 'Generuje i wysyła raport tygodniowy',
      trigger: 'schedule',
      schedule: 'Monday 06:00',
      active: true,
      lastRun: '2025-04-15 06:00',
      nextRun: '2025-04-22 06:00'
    }
  ],
  taskSchedules: [
    { id: 1, name: 'Codzienny backup', time: '01:00', days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'], active: true },
    { id: 2, name: 'Synchronizacja danych', time: '04:00', days: ['monday', 'wednesday', 'friday'], active: true },
    { id: 3, name: 'Czyszczenie logów', time: '02:00', days: ['sunday'], active: true }
  ],
  triggerConditions: [
    { id: 1, name: 'Niski poziom paliwa', description: 'Poziom paliwa poniżej 20%', active: true },
    { id: 2, name: 'Przekroczenie prędkości', description: 'Prędkość przekracza dozwolony limit o 10km/h', active: true },
    { id: 3, name: 'Opuszczenie strefy', description: 'Pojazd opuszcza zdefiniowaną strefę geograficzną', active: false }
  ],
  messageTemplates: [
    { id: 1, name: 'Powiadomienie o przeglądzie', subject: 'Zbliżający się przegląd pojazdu', body: 'Przypominamy o zbliżającym się przeglądzie pojazdu {vehicle_id}. Zaplanowany termin: {service_date}.', active: true },
    { id: 2, name: 'Raport dzienny', subject: 'Dzienny raport floty', body: 'Dzień dobry,\n\nW załączeniu przesyłamy dzienny raport floty za dzień {report_date}.\n\nPozdrawiamy,\nSystem Fleet', active: true },
    { id: 3, name: 'Alert bezpieczeństwa', subject: 'Alert bezpieczeństwa', body: 'Uwaga! Wykryto zdarzenie bezpieczeństwa dla pojazdu {vehicle_id}: {alert_description}.', active: true }
  ]
};

// Backups and history
const backupsHistory = {
  backupSchedule: {
    frequency: 'daily', // hourly, daily, weekly, monthly
    time: '01:00',
    retentionPeriod: 30, // days
    lastBackup: '2025-04-17 01:00',
    nextBackup: '2025-04-18 01:00',
    backupLocation: 'cloud', // local, cloud, both
    encryptBackups: true
  },
  dataRetention: {
    operationalData: 365, // days
    analyticsData: 730, // days
    systemLogs: 90, // days
    userActivityLogs: 180, // days
    automaticPurge: true
  },
  historyExport: {
    formats: ['csv', 'json', 'pdf'],
    scheduledExports: [
      { id: 1, name: 'Miesięczny eksport danych operacyjnych', frequency: 'monthly', format: 'csv', destination: 'email', recipients: ['archiwum@firma.pl'], active: true },
      { id: 2, name: 'Kwartalny eksport analityki', frequency: 'quarterly', format: 'json', destination: 'ftp', server: 'ftp.firma.pl', active: true }
    ]
  },
  archiving: {
    automaticArchiving: true,
    archiveAfter: 365, // days
    archiveLocation: 'cloud', // local, cloud, both
    compressArchives: true,
    lastArchive: '2025-04-01 01:30',
    nextArchive: '2025-05-01 01:30'
  }
};

/**
 * Get personalization settings
 * @returns {Promise} Promise resolving to personalization settings
 */
const getPersonalizationSettings = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(personalizationSettings);
    }, 300);
  });
};

/**
 * Update personalization settings
 * @param {Object} settings - Updated personalization settings
 * @returns {Promise} Promise resolving to updated personalization settings
 */
const updatePersonalizationSettings = (settings) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real implementation, we would merge the settings with the existing ones
      // For mock purposes, we'll just return the provided settings
      resolve({
        ...settings,
        updated: true,
        timestamp: new Date().toISOString()
      });
    }, 500);
  });
};

/**
 * Get user preferences
 * @returns {Promise} Promise resolving to user preferences
 */
const getUserPreferences = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(userPreferences);
    }, 300);
  });
};

/**
 * Update user preferences
 * @param {Object} preferences - Updated user preferences
 * @returns {Promise} Promise resolving to updated user preferences
 */
const updateUserPreferences = (preferences) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ...preferences,
        updated: true,
        timestamp: new Date().toISOString()
      });
    }, 500);
  });
};

/**
 * Get fleet configuration
 * @returns {Promise} Promise resolving to fleet configuration
 */
const getFleetConfiguration = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(fleetConfiguration);
    }, 300);
  });
};

/**
 * Update fleet configuration
 * @param {Object} configuration - Updated fleet configuration
 * @returns {Promise} Promise resolving to updated fleet configuration
 */
const updateFleetConfiguration = (configuration) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ...configuration,
        updated: true,
        timestamp: new Date().toISOString()
      });
    }, 500);
  });
};

/**
 * Get integrations
 * @returns {Promise} Promise resolving to integrations
 */
const getIntegrations = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(integrations);
    }, 300);
  });
};

/**
 * Update integrations
 * @param {Object} updatedIntegrations - Updated integrations
 * @returns {Promise} Promise resolving to updated integrations
 */
const updateIntegrations = (updatedIntegrations) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ...updatedIntegrations,
        updated: true,
        timestamp: new Date().toISOString()
      });
    }, 500);
  });
};

/**
 * Get security and permissions
 * @returns {Promise} Promise resolving to security and permissions
 */
const getSecurityPermissions = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(securityPermissions);
    }, 300);
  });
};

/**
 * Update security and permissions
 * @param {Object} updatedSecurityPermissions - Updated security and permissions
 * @returns {Promise} Promise resolving to updated security and permissions
 */
const updateSecurityPermissions = (updatedSecurityPermissions) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ...updatedSecurityPermissions,
        updated: true,
        timestamp: new Date().toISOString()
      });
    }, 500);
  });
};

/**
 * Get alerts and thresholds
 * @returns {Promise} Promise resolving to alerts and thresholds
 */
const getAlertsThresholds = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(alertsThresholds);
    }, 300);
  });
};

/**
 * Update alerts and thresholds
 * @param {Object} updatedAlertsThresholds - Updated alerts and thresholds
 * @returns {Promise} Promise resolving to updated alerts and thresholds
 */
const updateAlertsThresholds = (updatedAlertsThresholds) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ...updatedAlertsThresholds,
        updated: true,
        timestamp: new Date().toISOString()
      });
    }, 500);
  });
};

/**
 * Get automation
 * @returns {Promise} Promise resolving to automation
 */
const getAutomation = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(automation);
    }, 300);
  });
};

/**
 * Update automation
 * @param {Object} updatedAutomation - Updated automation
 * @returns {Promise} Promise resolving to updated automation
 */
const updateAutomation = (updatedAutomation) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ...updatedAutomation,
        updated: true,
        timestamp: new Date().toISOString()
      });
    }, 500);
  });
};

/**
 * Get backups and history
 * @returns {Promise} Promise resolving to backups and history
 */
const getBackupsHistory = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(backupsHistory);
    }, 300);
  });
};

/**
 * Update backups and history
 * @param {Object} updatedBackupsHistory - Updated backups and history
 * @returns {Promise} Promise resolving to updated backups and history
 */
const updateBackupsHistory = (updatedBackupsHistory) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ...updatedBackupsHistory,
        updated: true,
        timestamp: new Date().toISOString()
      });
    }, 500);
  });
};

/**
 * Get all settings
 * @returns {Promise} Promise resolving to all settings
 */
const getAllSettings = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        personalization: personalizationSettings,
        userPreferences: userPreferences,
        fleetConfiguration: fleetConfiguration,
        integrations: integrations,
        securityPermissions: securityPermissions,
        alertsThresholds: alertsThresholds,
        automation: automation,
        backupsHistory: backupsHistory
      });
    }, 500);
  });
};

export default {
  getPersonalizationSettings,
  updatePersonalizationSettings,
  getUserPreferences,
  updateUserPreferences,
  getFleetConfiguration,
  updateFleetConfiguration,
  getIntegrations,
  updateIntegrations,
  getSecurityPermissions,
  updateSecurityPermissions,
  getAlertsThresholds,
  updateAlertsThresholds,
  getAutomation,
  updateAutomation,
  getBackupsHistory,
  updateBackupsHistory,
  getAllSettings
};
