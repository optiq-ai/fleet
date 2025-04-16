import { v4 as uuidv4 } from 'uuid';

/**
 * Mock service for integrations functionality
 * This service provides mock data for all integration components
 */

// Mock data for integrations dashboard
const mockDashboardData = {
  stats: {
    totalIntegrations: 12,
    integrationsChange: 2,
    activeIntegrations: 8,
    activeIntegrationsChange: 1,
    integrationIssues: 3,
    integrationIssuesChange: -1,
    successfulSyncs24h: 142,
    successfulSyncsChange: 12,
    failedSyncs24h: 7,
    failedSyncsChange: -5,
    avgSyncTime: 3.2,
    avgSyncTimeChange: -8
  },
  integrationStatus: [
    {
      name: 'SAP ERP',
      type: 'ERP System',
      status: 'connected',
      lastSync: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
      nextSync: new Date(Date.now() + 1000 * 60 * 30).toISOString() // 30 minutes from now
    },
    {
      name: 'Salesforce CRM',
      type: 'CRM System',
      status: 'connected',
      lastSync: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 minutes ago
      nextSync: new Date(Date.now() + 1000 * 60 * 45).toISOString() // 45 minutes from now
    },
    {
      name: 'Xero Accounting',
      type: 'Accounting System',
      status: 'error',
      lastSync: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), // 3 hours ago
      nextSync: new Date(Date.now() + 1000 * 60 * 5).toISOString() // 5 minutes from now
    },
    {
      name: 'Geotab Telematics',
      type: 'Telematics System',
      status: 'connected',
      lastSync: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutes ago
      nextSync: new Date(Date.now() + 1000 * 60 * 10).toISOString() // 10 minutes from now
    },
    {
      name: 'Shell Fuel Cards',
      type: 'Fuel Card System',
      status: 'connected',
      lastSync: new Date(Date.now() - 1000 * 60 * 60 * 1).toISOString(), // 1 hour ago
      nextSync: new Date(Date.now() + 1000 * 60 * 60 * 23).toISOString() // 23 hours from now
    },
    {
      name: 'FleetCheck Maintenance',
      type: 'Maintenance System',
      status: 'connected',
      lastSync: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 minutes ago
      nextSync: new Date(Date.now() + 1000 * 60 * 60 * 2).toISOString() // 2 hours from now
    },
    {
      name: 'Custom Webhook',
      type: 'Custom Integration',
      status: 'inactive',
      lastSync: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
      nextSync: null
    },
    {
      name: 'Weather API',
      type: 'External API',
      status: 'connected',
      lastSync: new Date(Date.now() - 1000 * 60 * 20).toISOString(), // 20 minutes ago
      nextSync: new Date(Date.now() + 1000 * 60 * 40).toISOString() // 40 minutes from now
    },
    {
      name: 'Quickbooks',
      type: 'Accounting System',
      status: 'configuring',
      lastSync: null,
      nextSync: null
    }
  ],
  syncHistory: [
    {
      integrationName: 'Geotab Telematics',
      integrationType: 'Telematics System',
      status: 'success',
      startTime: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutes ago
      duration: 12,
      recordsProcessed: 156
    },
    {
      integrationName: 'Salesforce CRM',
      integrationType: 'CRM System',
      status: 'success',
      startTime: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 minutes ago
      duration: 8,
      recordsProcessed: 42
    },
    {
      integrationName: 'SAP ERP',
      integrationType: 'ERP System',
      status: 'success',
      startTime: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
      duration: 15,
      recordsProcessed: 78
    },
    {
      integrationName: 'Xero Accounting',
      integrationType: 'Accounting System',
      status: 'failed',
      startTime: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), // 3 hours ago
      duration: 5,
      recordsProcessed: 0
    },
    {
      integrationName: 'Shell Fuel Cards',
      integrationType: 'Fuel Card System',
      status: 'success',
      startTime: new Date(Date.now() - 1000 * 60 * 60 * 1).toISOString(), // 1 hour ago
      duration: 10,
      recordsProcessed: 23
    },
    {
      integrationName: 'FleetCheck Maintenance',
      integrationType: 'Maintenance System',
      status: 'success',
      startTime: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 minutes ago
      duration: 7,
      recordsProcessed: 15
    },
    {
      integrationName: 'Weather API',
      integrationType: 'External API',
      status: 'in_progress',
      startTime: new Date(Date.now() - 1000 * 60 * 1).toISOString(), // 1 minute ago
      duration: 1,
      recordsProcessed: 0
    }
  ],
  alerts: [
    {
      title: 'Xero Accounting Integration Failed',
      description: 'Authentication error: API key expired. Please update credentials.',
      priority: 'high',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString() // 3 hours ago
    },
    {
      title: 'Shell Fuel Cards Sync Warning',
      description: '3 transactions could not be processed due to missing vehicle information.',
      priority: 'medium',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1).toISOString() // 1 hour ago
    },
    {
      title: 'Geotab Telematics Rate Limit Warning',
      description: 'Approaching API rate limit (85% used). Consider adjusting sync frequency.',
      priority: 'low',
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString() // 30 minutes ago
    }
  ]
};

// Mock data for API keys
const mockAPIKeys = [
  {
    id: '1a2b3c4d',
    name: 'Mobile App Integration',
    key: 'sk_test_abcdefghijklmnopqrstuvwxyz123456',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(), // 30 days ago
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 335).toISOString(), // 335 days from now
    rateLimit: 100,
    active: true,
    permissions: {
      vehicles: {
        read: true,
        write: false
      },
      drivers: {
        read: true,
        write: false
      },
      routes: {
        read: true,
        write: false
      },
      maintenance: {
        read: true,
        write: false
      },
      telemetry: {
        read: true,
        write: false
      },
      fuel: {
        read: true,
        write: false
      }
    }
  },
  {
    id: '2e3f4g5h',
    name: 'Partner Integration',
    key: 'sk_test_zyxwvutsrqponmlkjihgfedcba654321',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60).toISOString(), // 60 days ago
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 305).toISOString(), // 305 days from now
    rateLimit: 500,
    active: true,
    permissions: {
      vehicles: {
        read: true,
        write: true
      },
      drivers: {
        read: true,
        write: true
      },
      routes: {
        read: true,
        write: true
      },
      maintenance: {
        read: true,
        write: true
      },
      telemetry: {
        read: true,
        write: false
      },
      fuel: {
        read: true,
        write: false
      }
    }
  },
  {
    id: '3i4j5k6l',
    name: 'Development API',
    key: 'sk_test_123456abcdefghijklmnopqrstuvwxyz',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(), // 10 days ago
    expiresAt: null, // Never expires
    rateLimit: 1000,
    active: true,
    permissions: {
      vehicles: {
        read: true,
        write: true
      },
      drivers: {
        read: true,
        write: true
      },
      routes: {
        read: true,
        write: true
      },
      maintenance: {
        read: true,
        write: true
      },
      telemetry: {
        read: true,
        write: true
      },
      fuel: {
        read: true,
        write: true
      }
    }
  },
  {
    id: '4m5n6o7p',
    name: 'Reporting Tool',
    key: 'sk_test_654321zyxwvutsrqponmlkjihgfedcba',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 90).toISOString(), // 90 days ago
    expiresAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // Expired 5 days ago
    rateLimit: 50,
    active: false,
    permissions: {
      vehicles: {
        read: true,
        write: false
      },
      drivers: {
        read: true,
        write: false
      },
      routes: {
        read: true,
        write: false
      },
      maintenance: {
        read: false,
        write: false
      },
      telemetry: {
        read: false,
        write: false
      },
      fuel: {
        read: false,
        write: false
      }
    }
  }
];

// Mock data for third-party connectors
const mockThirdPartyConnectors = [
  {
    id: 'erp-sap',
    name: 'SAP ERP',
    logoUrl: null,
    icon: 'building',
    description: 'Connect with SAP ERP to synchronize vehicle and maintenance data.',
    category: 'erp',
    type: 'api_key',
    status: 'connected',
    features: [
      'Bi-directional data synchronization',
      'Automatic asset creation and updates',
      'Maintenance schedule integration',
      'Cost center mapping'
    ],
    defaultApiUrl: 'https://api.sap.example.com/v1',
    config: {
      apiKey: 'sap_api_key_12345',
      apiUrl: 'https://api.sap.example.com/v1',
      autoSync: true,
      syncInterval: '60'
    }
  },
  {
    id: 'crm-salesforce',
    name: 'Salesforce CRM',
    logoUrl: null,
    icon: 'users',
    description: 'Integrate with Salesforce to manage customer relationships and vehicle assignments.',
    category: 'crm',
    type: 'oauth',
    status: 'connected',
    features: [
      'Customer account synchronization',
      'Vehicle assignment tracking',
      'Service history integration',
      'Opportunity management'
    ],
    config: {
      refreshToken: 'sf_refresh_token_67890',
      autoSync: true,
      syncInterval: '30'
    }
  },
  {
    id: 'accounting-xero',
    name: 'Xero Accounting',
    logoUrl: null,
    icon: 'file-invoice-dollar',
    description: 'Connect with Xero to automate financial tracking and expense management.',
    category: 'accounting',
    type: 'oauth',
    status: 'error',
    features: [
      'Automated invoice generation',
      'Expense categorization',
      'Cost tracking by vehicle',
      'Financial reporting'
    ],
    config: {
      refreshToken: 'xero_refresh_token_abcde',
      autoSync: true,
      syncInterval: '60'
    }
  },
  {
    id: 'accounting-quickbooks',
    name: 'QuickBooks',
    logoUrl: null,
    icon: 'file-invoice-dollar',
    description: 'Integrate with QuickBooks for comprehensive financial management.',
    category: 'accounting',
    type: 'oauth',
    status: 'disconnected',
    features: [
      'Automated expense tracking',
      'Invoice generation',
      'Tax calculation',
      'Financial reporting'
    ]
  },
  {
    id: 'iot-azure',
    name: 'Azure IoT Hub',
    logoUrl: null,
    icon: 'microchip',
    description: 'Connect IoT devices and sensors with Azure IoT Hub for real-time data processing.',
    category: 'iot',
    type: 'api_key',
    status: 'disconnected',
    features: [
      'Real-time device data collection',
      'Sensor data integration',
      'Event processing',
      'Data visualization'
    ]
  },
  {
    id: 'iot-aws',
    name: 'AWS IoT Core',
    logoUrl: null,
    icon: 'microchip',
    description: 'Use AWS IoT Core to connect and manage IoT devices across your fleet.',
    category: 'iot',
    type: 'credentials',
    status: 'disconnected',
    features: [
      'Device shadow management',
      'Secure device communication',
      'Rules engine for data processing',
      'Integration with AWS services'
    ]
  },
  {
    id: 'maintenance-fleetcheck',
    name: 'FleetCheck',
    logoUrl: null,
    icon: 'tools',
    description: 'Integrate with FleetCheck for comprehensive maintenance management.',
    category: 'maintenance',
    type: 'api_key',
    status: 'connected',
    features: [
      'Maintenance schedule tracking',
      'Service history records',
      'Compliance monitoring',
      'Defect reporting'
    ],
    config: {
      apiKey: 'fc_api_key_12345',
      apiUrl: 'https://api.fleetcheck.example.com/v2',
      autoSync: true,
      syncInterval: '60'
    }
  },
  {
    id: 'fuel-wex',
    name: 'WEX Fuel Cards',
    logoUrl: null,
    icon: 'gas-pump',
    description: 'Connect with WEX fuel card system for automated fuel expense tracking.',
    category: 'fuel',
    type: 'credentials',
    status: 'disconnected',
    features: [
      'Fuel transaction import',
      'Card management',
      'Expense categorization',
      'Fraud detection'
    ]
  }
];

// Mock data for telematics providers
const mockTelematicsData = {
  providers: [
    {
      id: 'geotab',
      name: 'Geotab',
      logoUrl: null,
      icon: 'satellite',
      type: 'GPS Telematics',
      description: 'Enterprise-grade telematics platform with comprehensive fleet management capabilities.',
      status: 'connected',
      authType: 'credentials',
      requiresAccountId: true,
      features: [
        'Real-time GPS tracking',
        'Driver behavior monitoring',
        'Engine diagnostics',
        'Fuel consumption tracking',
        'Custom reporting'
      ],
      config: {
        username: 'fleet_admin',
        password: '********',
        accountId: 'fleet123',
        apiUrl: 'https://my.geotab.com/apiv1',
        autoSync: true,
        syncInterval: '15',
        dataPoints: {
          location: true,
          speed: true,
          fuelLevel: true,
          engineStatus: true,
          diagnostics: true,
          driverBehavior: true,
          temperature: false
        }
      }
    },
    {
      id: 'fleetio',
      name: 'Fleetio',
      logoUrl: null,
      icon: 'truck',
      type: 'Fleet Management',
      description: 'Cloud-based fleet management system for maintenance, fuel, and operations tracking.',
      status: 'disconnected',
      authType: 'api_key',
      requiresAccountId: false,
      features: [
        'Maintenance scheduling',
        'Fuel tracking',
        'Vehicle inspections',
        'Work order management',
        'Parts inventory'
      ]
    },
    {
      id: 'samsara',
      name: 'Samsara',
      logoUrl: null,
      icon: 'satellite-dish',
      type: 'IoT Platform',
      description: 'Connected operations platform with real-time GPS tracking and IoT sensors.',
      status: 'disconnected',
      authType: 'oauth',
      requiresAccountId: false,
      features: [
        'Real-time GPS tracking',
        'Video-based safety',
        'Equipment monitoring',
        'Temperature monitoring',
        'ELD compliance'
      ]
    },
    {
      id: 'verizon-connect',
      name: 'Verizon Connect',
      logoUrl: null,
      icon: 'broadcast-tower',
      type: 'GPS Telematics',
      description: 'Fleet and mobile workforce management solution with GPS tracking.',
      status: 'error',
      authType: 'credentials',
      requiresAccountId: true,
      features: [
        'GPS fleet tracking',
        'Dashcam integration',
        'Fuel card management',
        'Driver behavior scoring',
        'Mobile workforce management'
      ],
      config: {
        username: 'admin_user',
        password: '********',
        accountId: 'vc789',
        apiUrl: 'https://api.verizonconnect.com/v3',
        autoSync: true,
        syncInterval: '30',
        dataPoints: {
          location: true,
          speed: true,
          fuelLevel: true,
          engineStatus: true,
          diagnostics: false,
          driverBehavior: true,
          temperature: false
        }
      }
    }
  ],
  deviceMappings: [
    {
      vehicleName: 'Truck #1234',
      deviceId: 'GT-456789',
      providerName: 'Geotab',
      lastDataReceived: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutes ago
      status: 'active'
    },
    {
      vehicleName: 'Van #5678',
      deviceId: 'GT-123456',
      providerName: 'Geotab',
      lastDataReceived: new Date(Date.now() - 1000 * 60 * 8).toISOString(), // 8 minutes ago
      status: 'active'
    },
    {
      vehicleName: 'Truck #2468',
      deviceId: 'GT-987654',
      providerName: 'Geotab',
      lastDataReceived: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
      status: 'inactive'
    },
    {
      vehicleName: 'Van #9012',
      deviceId: 'VC-123789',
      providerName: 'Verizon Connect',
      lastDataReceived: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
      status: 'error'
    }
  ]
};

// Mock data for fuel card providers
const mockFuelCardProviders = [
  {
    id: 'shell',
    name: 'Shell Fuel Cards',
    logoUrl: null,
    icon: 'credit-card',
    type: 'Fuel Card Provider',
    description: 'Manage Shell fuel cards for your fleet with automated expense tracking and reporting.',
    status: 'connected',
    authType: 'api_key',
    requiresAccountId: true,
    features: [
      'Transaction import',
      'Expense categorization',
      'Driver assignment',
      'Fraud detection',
      'Reporting'
    ],
    config: {
      apiKey: 'shell_api_key_12345',
      apiUrl: 'https://api.shell.example.com/v1',
      accountId: 'fleet456',
      autoSync: true,
      syncInterval: '60',
      autoExpenseMapping: true,
      defaultExpenseCategory: 'fuel',
      defaultTaxRate: '20'
    }
  },
  {
    id: 'bp',
    name: 'BP Fuel Plus',
    logoUrl: null,
    icon: 'credit-card',
    type: 'Fuel Card Provider',
    description: 'BP Fuel Plus cards with detailed transaction reporting and expense management.',
    status: 'disconnected',
    authType: 'credentials',
    requiresAccountId: true,
    features: [
      'Online account management',
      'Transaction reporting',
      'Expense categorization',
      'Tax reporting',
      'Driver PIN management'
    ]
  },
  {
    id: 'wex',
    name: 'WEX Fleet Cards',
    logoUrl: null,
    icon: 'credit-card',
    type: 'Fuel Card Provider',
    description: 'WEX fleet cards with purchase controls and detailed reporting.',
    status: 'disconnected',
    authType: 'credentials',
    requiresAccountId: true,
    features: [
      'Purchase controls',
      'Detailed reporting',
      'Expense management',
      'Driver ID tracking',
      'Maintenance purchase tracking'
    ]
  },
  {
    id: 'fleetcor',
    name: 'Fleetcor Fuelman',
    logoUrl: null,
    icon: 'credit-card',
    type: 'Fuel Card Provider',
    description: 'Fuelman fleet cards with purchase controls and expense management.',
    status: 'disconnected',
    authType: 'api_key',
    requiresAccountId: false,
    features: [
      'Purchase controls',
      'Expense tracking',
      'Fraud prevention',
      'Reporting',
      'Tax management'
    ]
  }
];

// Mock data for fuel transactions
const mockFuelTransactions = {
  transactions: [
    {
      id: 'ft-12345',
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(), // 1 day ago
      cardNumber: '1234 5678 9012 3456',
      vehicleName: 'Truck #1234',
      driverName: 'John Smith',
      stationName: 'Shell Station #123',
      fuelType: 'Diesel',
      liters: 75.5,
      pricePerLiter: 1.45,
      amount: 109.48,
      status: 'processed'
    },
    {
      id: 'ft-12346',
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
      cardNumber: '1234 5678 9012 3456',
      vehicleName: 'Truck #1234',
      driverName: 'John Smith',
      stationName: 'BP Station #456',
      fuelType: 'Diesel',
      liters: 80.2,
      pricePerLiter: 1.42,
      amount: 113.88,
      status: 'processed'
    },
    {
      id: 'ft-12347',
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
      cardNumber: '2345 6789 0123 4567',
      vehicleName: 'Van #5678',
      driverName: 'Jane Doe',
      stationName: 'Shell Station #789',
      fuelType: 'Unleaded',
      liters: 45.3,
      pricePerLiter: 1.38,
      amount: 62.51,
      status: 'processed'
    },
    {
      id: 'ft-12348',
      date: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(), // 12 hours ago
      cardNumber: '3456 7890 1234 5678',
      vehicleName: 'Truck #2468',
      driverName: 'Mike Johnson',
      stationName: 'Shell Station #123',
      fuelType: 'Diesel',
      liters: 68.7,
      pricePerLiter: 1.45,
      amount: 99.62,
      status: 'pending'
    },
    {
      id: 'ft-12349',
      date: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(), // 6 hours ago
      cardNumber: '4567 8901 2345 6789',
      vehicleName: 'Van #9012',
      driverName: 'Sarah Williams',
      stationName: 'BP Station #456',
      fuelType: 'Unleaded',
      liters: 50.1,
      pricePerLiter: 1.38,
      amount: 69.14,
      status: 'pending'
    }
  ],
  summary: {
    totalTransactions: 5,
    totalAmount: 454.63,
    totalLiters: 319.8,
    averagePrice: 1.42
  }
};

// Mock data for maintenance systems
const mockMaintenanceSystems = [
  {
    id: 'fleetcheck',
    name: 'FleetCheck',
    logoUrl: null,
    icon: 'wrench',
    type: 'Maintenance Management',
    description: 'Comprehensive fleet maintenance management system with compliance tracking.',
    status: 'connected',
    authType: 'api_key',
    requiresAccountId: false,
    features: [
      'Maintenance scheduling',
      'Service history tracking',
      'Compliance monitoring',
      'Defect reporting',
      'Cost tracking'
    ],
    config: {
      apiKey: 'fc_api_key_12345',
      apiUrl: 'https://api.fleetcheck.example.com/v2',
      autoSync: true,
      syncInterval: '60',
      bidirectionalSync: true,
      autoCreateJobs: true,
      defaultPriority: 'medium'
    }
  },
  {
    id: 'fleetio',
    name: 'Fleetio',
    logoUrl: null,
    icon: 'tools',
    type: 'Fleet Management',
    description: 'Cloud-based fleet management system with maintenance tracking and scheduling.',
    status: 'disconnected',
    authType: 'api_key',
    requiresAccountId: false,
    features: [
      'Maintenance scheduling',
      'Work order management',
      'Parts inventory',
      'Service history',
      'Vendor management'
    ]
  },
  {
    id: 'assetworks',
    name: 'AssetWorks',
    logoUrl: null,
    icon: 'cogs',
    type: 'Asset Management',
    description: 'Enterprise asset management solution for fleet maintenance and operations.',
    status: 'disconnected',
    authType: 'credentials',
    requiresAccountId: true,
    features: [
      'Preventive maintenance',
      'Work order management',
      'Parts inventory',
      'Fuel management',
      'Warranty recovery'
    ]
  },
  {
    id: 'dossier',
    name: 'Dossier Systems',
    logoUrl: null,
    icon: 'clipboard-list',
    type: 'Fleet Maintenance',
    description: 'Fleet maintenance management software with preventive maintenance scheduling.',
    status: 'disconnected',
    authType: 'credentials',
    requiresAccountId: true,
    features: [
      'Preventive maintenance',
      'Work order management',
      'Parts inventory',
      'Warranty tracking',
      'Reporting'
    ]
  }
];

// Mock data for maintenance jobs
const mockMaintenanceJobs = [
  {
    id: 'job-12345',
    jobId: 'FC-12345',
    vehicleName: 'Truck #1234',
    description: 'Regular service - oil change, filters, inspection',
    systemName: 'FleetCheck',
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5).toISOString(), // 5 days from now
    priority: 'medium',
    status: 'pending'
  },
  {
    id: 'job-12346',
    jobId: 'FC-12346',
    vehicleName: 'Van #5678',
    description: 'Brake pad replacement - front and rear',
    systemName: 'FleetCheck',
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days from now
    priority: 'high',
    status: 'pending'
  },
  {
    id: 'job-12347',
    jobId: 'FC-12347',
    vehicleName: 'Truck #2468',
    description: 'Annual inspection and certification',
    systemName: 'FleetCheck',
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 10).toISOString(), // 10 days from now
    priority: 'medium',
    status: 'pending'
  },
  {
    id: 'job-12348',
    jobId: 'FC-12348',
    vehicleName: 'Van #9012',
    description: 'Tire rotation and alignment',
    systemName: 'FleetCheck',
    dueDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(), // 1 day ago
    priority: 'low',
    status: 'in_progress'
  },
  {
    id: 'job-12349',
    jobId: 'FC-12349',
    vehicleName: 'Truck #1234',
    description: 'Replace cabin air filter',
    systemName: 'FleetCheck',
    dueDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // 5 days ago
    priority: 'low',
    status: 'completed'
  }
];

// Mock data for custom integrations
const mockCustomIntegrations = [
  {
    id: 'ci-12345',
    name: 'Daily Vehicle Report',
    description: 'Generates and emails a daily report of vehicle status and issues.',
    type: 'custom',
    triggerType: 'scheduled',
    schedule: '0 7 * * *', // Every day at 7 AM
    webhookUrl: null,
    active: true,
    status: 'active',
    lastRun: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    steps: [
      {
        id: 1,
        name: 'Get Vehicle Data',
        type: 'data_source',
        config: {
          source: 'vehicles',
          filter: '{"status": "active"}'
        }
      },
      {
        id: 2,
        name: 'Transform Data',
        type: 'transform',
        config: {
          script: '// Group vehicles by status\nconst result = {};\ndata.forEach(vehicle => {\n  if (!result[vehicle.status]) {\n    result[vehicle.status] = [];\n  }\n  result[vehicle.status].push(vehicle);\n});\nreturn result;'
        }
      },
      {
        id: 3,
        name: 'Send Email',
        type: 'destination',
        config: {
          destination: 'email',
          to: 'fleet-manager@example.com',
          subject: 'Daily Vehicle Status Report',
          body: 'Please find attached the daily vehicle status report.\n\n{{data}}'
        }
      }
    ]
  },
  {
    id: 'ci-12346',
    name: 'Maintenance Alert Webhook',
    description: 'Sends maintenance alerts to external system via webhook.',
    type: 'webhook',
    triggerType: 'webhook',
    schedule: null,
    webhookUrl: 'https://fleet-app.example.com/webhooks/maintenance-alerts',
    active: true,
    status: 'active',
    lastRun: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    steps: [
      {
        id: 1,
        name: 'Process Webhook Data',
        type: 'transform',
        config: {
          script: '// Format the incoming webhook data\nreturn {\n  alertId: data.id,\n  vehicleId: data.vehicleId,\n  alertType: data.type,\n  severity: data.severity,\n  description: data.description,\n  timestamp: new Date().toISOString()\n};'
        }
      },
      {
        id: 2,
        name: 'Send to Maintenance System',
        type: 'destination',
        config: {
          destination: 'http',
          url: 'https://api.maintenance-system.example.com/alerts',
          method: 'POST',
          headers: '{"Content-Type": "application/json", "Authorization": "Bearer abc123"}',
          body: 'data'
        }
      }
    ]
  },
  {
    id: 'ci-12347',
    name: 'Weekly Fuel Report',
    description: 'Generates a weekly report of fuel consumption and costs.',
    type: 'custom',
    triggerType: 'scheduled',
    schedule: '0 9 * * 1', // Every Monday at 9 AM
    webhookUrl: null,
    active: false,
    status: 'inactive',
    lastRun: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(), // 7 days ago
    steps: [
      {
        id: 1,
        name: 'Get Fuel Data',
        type: 'data_source',
        config: {
          source: 'fuel',
          filter: '{"date": {"$gte": "{{lastWeek}}", "$lte": "{{today}}"}}'
        }
      },
      {
        id: 2,
        name: 'Calculate Totals',
        type: 'transform',
        config: {
          script: '// Calculate totals by vehicle\nconst result = {\n  totalCost: 0,\n  totalLiters: 0,\n  byVehicle: {}\n};\n\ndata.forEach(transaction => {\n  result.totalCost += transaction.amount;\n  result.totalLiters += transaction.liters;\n  \n  if (!result.byVehicle[transaction.vehicleId]) {\n    result.byVehicle[transaction.vehicleId] = {\n      vehicleName: transaction.vehicleName,\n      cost: 0,\n      liters: 0,\n      transactions: 0\n    };\n  }\n  \n  result.byVehicle[transaction.vehicleId].cost += transaction.amount;\n  result.byVehicle[transaction.vehicleId].liters += transaction.liters;\n  result.byVehicle[transaction.vehicleId].transactions += 1;\n});\n\nreturn result;'
        }
      },
      {
        id: 3,
        name: 'Generate Report',
        type: 'destination',
        config: {
          destination: 'email',
          to: 'finance@example.com, fleet-manager@example.com',
          subject: 'Weekly Fuel Consumption Report',
          body: 'Please find attached the weekly fuel consumption report.\n\nTotal Cost: {{data.totalCost}}\nTotal Liters: {{data.totalLiters}}\n\nDetails by vehicle:\n{{data.byVehicle}}'
        }
      }
    ]
  }
];

// Mock data for integration logs
const mockIntegrationLogs = {
  'ci-12345': [
    {
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
      level: 'info',
      message: 'Integration started: Daily Vehicle Report'
    },
    {
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 + 1000).toISOString(), // 1 day ago + 1 second
      level: 'info',
      message: 'Step 1 (Get Vehicle Data) started'
    },
    {
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 + 2000).toISOString(), // 1 day ago + 2 seconds
      level: 'info',
      message: 'Retrieved 42 active vehicles'
    },
    {
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 + 3000).toISOString(), // 1 day ago + 3 seconds
      level: 'info',
      message: 'Step 2 (Transform Data) started'
    },
    {
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 + 4000).toISOString(), // 1 day ago + 4 seconds
      level: 'info',
      message: 'Data transformation completed'
    },
    {
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 + 5000).toISOString(), // 1 day ago + 5 seconds
      level: 'info',
      message: 'Step 3 (Send Email) started'
    },
    {
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 + 6000).toISOString(), // 1 day ago + 6 seconds
      level: 'success',
      message: 'Email sent to fleet-manager@example.com'
    },
    {
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 + 7000).toISOString(), // 1 day ago + 7 seconds
      level: 'info',
      message: 'Integration completed successfully'
    }
  ],
  'ci-12346': [
    {
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
      level: 'info',
      message: 'Webhook received: Maintenance Alert Webhook'
    },
    {
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2 + 1000).toISOString(), // 2 hours ago + 1 second
      level: 'info',
      message: 'Step 1 (Process Webhook Data) started'
    },
    {
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2 + 2000).toISOString(), // 2 hours ago + 2 seconds
      level: 'info',
      message: 'Data transformation completed'
    },
    {
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2 + 3000).toISOString(), // 2 hours ago + 3 seconds
      level: 'info',
      message: 'Step 2 (Send to Maintenance System) started'
    },
    {
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2 + 4000).toISOString(), // 2 hours ago + 4 seconds
      level: 'error',
      message: 'HTTP request failed: 401 Unauthorized'
    },
    {
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2 + 5000).toISOString(), // 2 hours ago + 5 seconds
      level: 'info',
      message: 'Retrying request with refreshed token'
    },
    {
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2 + 6000).toISOString(), // 2 hours ago + 6 seconds
      level: 'success',
      message: 'HTTP request successful: 200 OK'
    },
    {
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2 + 7000).toISOString(), // 2 hours ago + 7 seconds
      level: 'info',
      message: 'Integration completed successfully'
    }
  ],
  'ci-12347': [
    {
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(), // 7 days ago
      level: 'info',
      message: 'Integration started: Weekly Fuel Report'
    },
    {
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7 + 1000).toISOString(), // 7 days ago + 1 second
      level: 'info',
      message: 'Step 1 (Get Fuel Data) started'
    },
    {
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7 + 2000).toISOString(), // 7 days ago + 2 seconds
      level: 'info',
      message: 'Retrieved 28 fuel transactions'
    },
    {
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7 + 3000).toISOString(), // 7 days ago + 3 seconds
      level: 'info',
      message: 'Step 2 (Calculate Totals) started'
    },
    {
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7 + 4000).toISOString(), // 7 days ago + 4 seconds
      level: 'info',
      message: 'Data transformation completed'
    },
    {
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7 + 5000).toISOString(), // 7 days ago + 5 seconds
      level: 'info',
      message: 'Step 3 (Generate Report) started'
    },
    {
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7 + 6000).toISOString(), // 7 days ago + 6 seconds
      level: 'warning',
      message: 'Email delivery delayed: server busy'
    },
    {
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7 + 10000).toISOString(), // 7 days ago + 10 seconds
      level: 'success',
      message: 'Email sent to finance@example.com, fleet-manager@example.com'
    },
    {
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7 + 11000).toISOString(), // 7 days ago + 11 seconds
      level: 'info',
      message: 'Integration completed successfully'
    }
  ]
};

/**
 * Get integrations dashboard data
 * @param {boolean} useMockData - Flag to use mock data instead of API
 * @returns {Promise<Object>} Dashboard data
 */
export const getIntegrationsDashboard = async (useMockData = true) => {
  if (useMockData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockDashboardData);
      }, 500);
    });
  }
  
  // In a real implementation, this would call the actual API
  throw new Error('Real API not implemented');
};

/**
 * Get API keys
 * @param {boolean} useMockData - Flag to use mock data instead of API
 * @returns {Promise<Array>} List of API keys
 */
export const getAPIKeys = async (useMockData = true) => {
  if (useMockData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockAPIKeys);
      }, 500);
    });
  }
  
  // In a real implementation, this would call the actual API
  throw new Error('Real API not implemented');
};

/**
 * Create a new API key
 * @param {boolean} useMockData - Flag to use mock data instead of API
 * @param {Object} keyData - API key data
 * @returns {Promise<Object>} Created API key
 */
export const createAPIKey = async (useMockData = true, keyData) => {
  if (useMockData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newKey = {
          id: uuidv4().substring(0, 8),
          key: `sk_test_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`,
          createdAt: new Date().toISOString(),
          ...keyData
        };
        
        mockAPIKeys.push(newKey);
        
        resolve(newKey);
      }, 500);
    });
  }
  
  // In a real implementation, this would call the actual API
  throw new Error('Real API not implemented');
};

/**
 * Update an API key
 * @param {boolean} useMockData - Flag to use mock data instead of API
 * @param {string} keyId - API key ID
 * @param {Object} keyData - Updated API key data
 * @returns {Promise<Object>} Updated API key
 */
export const updateAPIKey = async (useMockData = true, keyId, keyData) => {
  if (useMockData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const keyIndex = mockAPIKeys.findIndex(key => key.id === keyId);
        
        if (keyIndex === -1) {
          reject(new Error(`API key with ID ${keyId} not found`));
          return;
        }
        
        const updatedKey = {
          ...mockAPIKeys[keyIndex],
          ...keyData
        };
        
        mockAPIKeys[keyIndex] = updatedKey;
        
        resolve(updatedKey);
      }, 500);
    });
  }
  
  // In a real implementation, this would call the actual API
  throw new Error('Real API not implemented');
};

/**
 * Delete an API key
 * @param {boolean} useMockData - Flag to use mock data instead of API
 * @param {string} keyId - API key ID
 * @returns {Promise<void>}
 */
export const deleteAPIKey = async (useMockData = true, keyId) => {
  if (useMockData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const keyIndex = mockAPIKeys.findIndex(key => key.id === keyId);
        
        if (keyIndex === -1) {
          reject(new Error(`API key with ID ${keyId} not found`));
          return;
        }
        
        mockAPIKeys.splice(keyIndex, 1);
        
        resolve();
      }, 500);
    });
  }
  
  // In a real implementation, this would call the actual API
  throw new Error('Real API not implemented');
};

/**
 * Get third-party connectors
 * @param {boolean} useMockData - Flag to use mock data instead of API
 * @returns {Promise<Array>} List of third-party connectors
 */
export const getThirdPartyConnectors = async (useMockData = true) => {
  if (useMockData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockThirdPartyConnectors);
      }, 500);
    });
  }
  
  // In a real implementation, this would call the actual API
  throw new Error('Real API not implemented');
};

/**
 * Update connector status
 * @param {boolean} useMockData - Flag to use mock data instead of API
 * @param {string} connectorId - Connector ID
 * @param {string} status - New status
 * @returns {Promise<Object>} Updated connector
 */
export const updateConnectorStatus = async (useMockData = true, connectorId, status) => {
  if (useMockData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const connectorIndex = mockThirdPartyConnectors.findIndex(connector => connector.id === connectorId);
        
        if (connectorIndex === -1) {
          reject(new Error(`Connector with ID ${connectorId} not found`));
          return;
        }
        
        mockThirdPartyConnectors[connectorIndex].status = status;
        
        resolve(mockThirdPartyConnectors[connectorIndex]);
      }, 500);
    });
  }
  
  // In a real implementation, this would call the actual API
  throw new Error('Real API not implemented');
};

/**
 * Configure connector
 * @param {boolean} useMockData - Flag to use mock data instead of API
 * @param {string} connectorId - Connector ID
 * @param {Object} config - Connector configuration
 * @returns {Promise<Object>} Updated connector
 */
export const configureConnector = async (useMockData = true, connectorId, config) => {
  if (useMockData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const connectorIndex = mockThirdPartyConnectors.findIndex(connector => connector.id === connectorId);
        
        if (connectorIndex === -1) {
          reject(new Error(`Connector with ID ${connectorId} not found`));
          return;
        }
        
        mockThirdPartyConnectors[connectorIndex].config = config;
        
        if (mockThirdPartyConnectors[connectorIndex].status === 'disconnected') {
          mockThirdPartyConnectors[connectorIndex].status = 'configuring';
        }
        
        resolve(mockThirdPartyConnectors[connectorIndex]);
      }, 500);
    });
  }
  
  // In a real implementation, this would call the actual API
  throw new Error('Real API not implemented');
};

/**
 * Get telematics providers
 * @param {boolean} useMockData - Flag to use mock data instead of API
 * @returns {Promise<Object>} Telematics providers and device mappings
 */
export const getTelematicsProviders = async (useMockData = true) => {
  if (useMockData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockTelematicsData);
      }, 500);
    });
  }
  
  // In a real implementation, this would call the actual API
  throw new Error('Real API not implemented');
};

/**
 * Update telematics provider
 * @param {boolean} useMockData - Flag to use mock data instead of API
 * @param {string} providerId - Provider ID
 * @param {Object} data - Updated provider data
 * @returns {Promise<Object>} Updated provider
 */
export const updateTelematicsProvider = async (useMockData = true, providerId, data) => {
  if (useMockData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const providerIndex = mockTelematicsData.providers.findIndex(provider => provider.id === providerId);
        
        if (providerIndex === -1) {
          reject(new Error(`Provider with ID ${providerId} not found`));
          return;
        }
        
        mockTelematicsData.providers[providerIndex] = {
          ...mockTelematicsData.providers[providerIndex],
          ...data
        };
        
        resolve(mockTelematicsData.providers[providerIndex]);
      }, 500);
    });
  }
  
  // In a real implementation, this would call the actual API
  throw new Error('Real API not implemented');
};

/**
 * Configure telematics provider
 * @param {boolean} useMockData - Flag to use mock data instead of API
 * @param {string} providerId - Provider ID
 * @param {Object} config - Provider configuration
 * @returns {Promise<Object>} Updated provider
 */
export const configureTelematicsProvider = async (useMockData = true, providerId, config) => {
  if (useMockData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const providerIndex = mockTelematicsData.providers.findIndex(provider => provider.id === providerId);
        
        if (providerIndex === -1) {
          reject(new Error(`Provider with ID ${providerId} not found`));
          return;
        }
        
        mockTelematicsData.providers[providerIndex].config = config;
        
        if (mockTelematicsData.providers[providerIndex].status === 'disconnected') {
          mockTelematicsData.providers[providerIndex].status = 'configuring';
        }
        
        resolve(mockTelematicsData.providers[providerIndex]);
      }, 500);
    });
  }
  
  // In a real implementation, this would call the actual API
  throw new Error('Real API not implemented');
};

/**
 * Get fuel card providers
 * @param {boolean} useMockData - Flag to use mock data instead of API
 * @returns {Promise<Array>} List of fuel card providers
 */
export const getFuelCardProviders = async (useMockData = true) => {
  if (useMockData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockFuelCardProviders);
      }, 500);
    });
  }
  
  // In a real implementation, this would call the actual API
  throw new Error('Real API not implemented');
};

/**
 * Update fuel card provider
 * @param {boolean} useMockData - Flag to use mock data instead of API
 * @param {string} providerId - Provider ID
 * @param {Object} data - Updated provider data
 * @returns {Promise<Object>} Updated provider
 */
export const updateFuelCardProvider = async (useMockData = true, providerId, data) => {
  if (useMockData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const providerIndex = mockFuelCardProviders.findIndex(provider => provider.id === providerId);
        
        if (providerIndex === -1) {
          reject(new Error(`Provider with ID ${providerId} not found`));
          return;
        }
        
        mockFuelCardProviders[providerIndex] = {
          ...mockFuelCardProviders[providerIndex],
          ...data
        };
        
        resolve(mockFuelCardProviders[providerIndex]);
      }, 500);
    });
  }
  
  // In a real implementation, this would call the actual API
  throw new Error('Real API not implemented');
};

/**
 * Configure fuel card provider
 * @param {boolean} useMockData - Flag to use mock data instead of API
 * @param {string} providerId - Provider ID
 * @param {Object} config - Provider configuration
 * @returns {Promise<Object>} Updated provider
 */
export const configureFuelCardProvider = async (useMockData = true, providerId, config) => {
  if (useMockData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const providerIndex = mockFuelCardProviders.findIndex(provider => provider.id === providerId);
        
        if (providerIndex === -1) {
          reject(new Error(`Provider with ID ${providerId} not found`));
          return;
        }
        
        mockFuelCardProviders[providerIndex].config = config;
        
        if (mockFuelCardProviders[providerIndex].status === 'disconnected') {
          mockFuelCardProviders[providerIndex].status = 'configuring';
        }
        
        resolve(mockFuelCardProviders[providerIndex]);
      }, 500);
    });
  }
  
  // In a real implementation, this would call the actual API
  throw new Error('Real API not implemented');
};

/**
 * Get fuel transactions
 * @param {boolean} useMockData - Flag to use mock data instead of API
 * @param {Object} filters - Filters for transactions
 * @returns {Promise<Object>} Fuel transactions and summary
 */
export const getFuelTransactions = async (useMockData = true, filters = {}) => {
  if (useMockData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        let filteredTransactions = [...mockFuelTransactions.transactions];
        
        // Apply provider filter
        if (filters.providerId && filters.providerId !== 'all') {
          // In a real implementation, this would filter by provider ID
          // For mock data, we'll just return all transactions since we don't have provider IDs
        }
        
        // Apply date range filter
        if (filters.startDate) {
          const startDate = new Date(filters.startDate);
          filteredTransactions = filteredTransactions.filter(transaction => 
            new Date(transaction.date) >= startDate
          );
        }
        
        if (filters.endDate) {
          const endDate = new Date(filters.endDate);
          endDate.setHours(23, 59, 59, 999); // End of day
          filteredTransactions = filteredTransactions.filter(transaction => 
            new Date(transaction.date) <= endDate
          );
        }
        
        // Calculate summary for filtered transactions
        const summary = {
          totalTransactions: filteredTransactions.length,
          totalAmount: filteredTransactions.reduce((sum, transaction) => sum + transaction.amount, 0),
          totalLiters: filteredTransactions.reduce((sum, transaction) => sum + transaction.liters, 0),
          averagePrice: 0
        };
        
        if (summary.totalLiters > 0) {
          summary.averagePrice = summary.totalAmount / summary.totalLiters;
        }
        
        resolve({
          transactions: filteredTransactions,
          summary
        });
      }, 500);
    });
  }
  
  // In a real implementation, this would call the actual API
  throw new Error('Real API not implemented');
};

/**
 * Get maintenance systems
 * @param {boolean} useMockData - Flag to use mock data instead of API
 * @returns {Promise<Array>} List of maintenance systems
 */
export const getMaintenanceSystems = async (useMockData = true) => {
  if (useMockData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockMaintenanceSystems);
      }, 500);
    });
  }
  
  // In a real implementation, this would call the actual API
  throw new Error('Real API not implemented');
};

/**
 * Update maintenance system
 * @param {boolean} useMockData - Flag to use mock data instead of API
 * @param {string} systemId - System ID
 * @param {Object} data - Updated system data
 * @returns {Promise<Object>} Updated system
 */
export const updateMaintenanceSystem = async (useMockData = true, systemId, data) => {
  if (useMockData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const systemIndex = mockMaintenanceSystems.findIndex(system => system.id === systemId);
        
        if (systemIndex === -1) {
          reject(new Error(`System with ID ${systemId} not found`));
          return;
        }
        
        mockMaintenanceSystems[systemIndex] = {
          ...mockMaintenanceSystems[systemIndex],
          ...data
        };
        
        resolve(mockMaintenanceSystems[systemIndex]);
      }, 500);
    });
  }
  
  // In a real implementation, this would call the actual API
  throw new Error('Real API not implemented');
};

/**
 * Configure maintenance system
 * @param {boolean} useMockData - Flag to use mock data instead of API
 * @param {string} systemId - System ID
 * @param {Object} config - System configuration
 * @returns {Promise<Object>} Updated system
 */
export const configureMaintenanceSystem = async (useMockData = true, systemId, config) => {
  if (useMockData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const systemIndex = mockMaintenanceSystems.findIndex(system => system.id === systemId);
        
        if (systemIndex === -1) {
          reject(new Error(`System with ID ${systemId} not found`));
          return;
        }
        
        mockMaintenanceSystems[systemIndex].config = config;
        
        if (mockMaintenanceSystems[systemIndex].status === 'disconnected') {
          mockMaintenanceSystems[systemIndex].status = 'configuring';
        }
        
        resolve(mockMaintenanceSystems[systemIndex]);
      }, 500);
    });
  }
  
  // In a real implementation, this would call the actual API
  throw new Error('Real API not implemented');
};

/**
 * Get maintenance jobs
 * @param {boolean} useMockData - Flag to use mock data instead of API
 * @param {Object} filters - Filters for jobs
 * @returns {Promise<Array>} List of maintenance jobs
 */
export const getMaintenanceJobs = async (useMockData = true, filters = {}) => {
  if (useMockData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        let filteredJobs = [...mockMaintenanceJobs];
        
        // Apply system filter
        if (filters.systemId && filters.systemId !== 'all') {
          // In a real implementation, this would filter by system ID
          // For mock data, we'll just return all jobs since all jobs have the same system
        }
        
        // Apply status filter
        if (filters.status && filters.status !== 'all') {
          filteredJobs = filteredJobs.filter(job => job.status === filters.status);
        }
        
        resolve(filteredJobs);
      }, 500);
    });
  }
  
  // In a real implementation, this would call the actual API
  throw new Error('Real API not implemented');
};

/**
 * Get custom integrations
 * @param {boolean} useMockData - Flag to use mock data instead of API
 * @returns {Promise<Array>} List of custom integrations
 */
export const getCustomIntegrations = async (useMockData = true) => {
  if (useMockData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockCustomIntegrations);
      }, 500);
    });
  }
  
  // In a real implementation, this would call the actual API
  throw new Error('Real API not implemented');
};

/**
 * Create custom integration
 * @param {boolean} useMockData - Flag to use mock data instead of API
 * @param {Object} integrationData - Integration data
 * @returns {Promise<Object>} Created integration
 */
export const createCustomIntegration = async (useMockData = true, integrationData) => {
  if (useMockData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newIntegration = {
          id: `ci-${Math.floor(Math.random() * 90000) + 10000}`,
          lastRun: null,
          webhookUrl: integrationData.triggerType === 'webhook' ? `https://fleet-app.example.com/webhooks/${Math.random().toString(36).substring(2, 15)}` : null,
          ...integrationData
        };
        
        mockCustomIntegrations.push(newIntegration);
        
        // Initialize logs for the new integration
        mockIntegrationLogs[newIntegration.id] = [
          {
            timestamp: new Date().toISOString(),
            level: 'info',
            message: `Integration created: ${newIntegration.name}`
          }
        ];
        
        resolve(newIntegration);
      }, 500);
    });
  }
  
  // In a real implementation, this would call the actual API
  throw new Error('Real API not implemented');
};

/**
 * Update custom integration
 * @param {boolean} useMockData - Flag to use mock data instead of API
 * @param {string} integrationId - Integration ID
 * @param {Object} integrationData - Updated integration data
 * @returns {Promise<Object>} Updated integration
 */
export const updateCustomIntegration = async (useMockData = true, integrationId, integrationData) => {
  if (useMockData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const integrationIndex = mockCustomIntegrations.findIndex(integration => integration.id === integrationId);
        
        if (integrationIndex === -1) {
          reject(new Error(`Integration with ID ${integrationId} not found`));
          return;
        }
        
        mockCustomIntegrations[integrationIndex] = {
          ...mockCustomIntegrations[integrationIndex],
          ...integrationData
        };
        
        // Add log entry for the update
        if (!mockIntegrationLogs[integrationId]) {
          mockIntegrationLogs[integrationId] = [];
        }
        
        mockIntegrationLogs[integrationId].push({
          timestamp: new Date().toISOString(),
          level: 'info',
          message: `Integration updated: ${mockCustomIntegrations[integrationIndex].name}`
        });
        
        resolve(mockCustomIntegrations[integrationIndex]);
      }, 500);
    });
  }
  
  // In a real implementation, this would call the actual API
  throw new Error('Real API not implemented');
};

/**
 * Delete custom integration
 * @param {boolean} useMockData - Flag to use mock data instead of API
 * @param {string} integrationId - Integration ID
 * @returns {Promise<void>}
 */
export const deleteCustomIntegration = async (useMockData = true, integrationId) => {
  if (useMockData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const integrationIndex = mockCustomIntegrations.findIndex(integration => integration.id === integrationId);
        
        if (integrationIndex === -1) {
          reject(new Error(`Integration with ID ${integrationId} not found`));
          return;
        }
        
        mockCustomIntegrations.splice(integrationIndex, 1);
        
        // Remove logs for the deleted integration
        delete mockIntegrationLogs[integrationId];
        
        resolve();
      }, 500);
    });
  }
  
  // In a real implementation, this would call the actual API
  throw new Error('Real API not implemented');
};

/**
 * Get integration logs
 * @param {boolean} useMockData - Flag to use mock data instead of API
 * @param {string} integrationId - Integration ID
 * @returns {Promise<Array>} List of integration logs
 */
export const getIntegrationLogs = async (useMockData = true, integrationId) => {
  if (useMockData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const logs = mockIntegrationLogs[integrationId];
        
        if (!logs) {
          resolve([]);
          return;
        }
        
        resolve([...logs].reverse()); // Return logs in reverse chronological order
      }, 500);
    });
  }
  
  // In a real implementation, this would call the actual API
  throw new Error('Real API not implemented');
};
