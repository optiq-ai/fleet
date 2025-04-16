/**
 * Mock Asset Management Service
 * 
 * Mock service for managing all fleet assets including vehicles, equipment, tools, parts, and accessories.
 * Used for development and testing without backend.
 */

import { v4 as uuidv4 } from 'uuid';

// Mock data
const mockAssets = [
  {
    id: "asset-001",
    name: "Wózek widłowy Toyota",
    type: "equipment",
    category: "forklift",
    serialNumber: "TYT-FL-12345",
    manufacturer: "Toyota",
    model: "8FBE20",
    purchaseDate: "2023-05-15",
    purchasePrice: 45000,
    currentValue: 38000,
    depreciationMethod: "straight-line",
    depreciationRate: 10,
    expectedLifespan: 10,
    warrantyExpiryDate: "2026-05-14",
    location: "Warehouse A",
    assignedTo: { type: "vehicle", id: "veh-001", name: "Ciężarówka MAN TGX" },
    status: "active",
    maintenanceSchedule: [
      { type: "inspection", interval: 30, unit: "days", lastPerformed: "2024-03-15", nextDue: "2024-04-14" },
      { type: "service", interval: 500, unit: "hours", lastPerformed: "2024-02-10", nextDue: "2024-05-10" }
    ],
    specifications: {
      height: 4.7,
      width: 1.2,
      length: 3.5,
      weight: 3200,
      liftingCapacity: 2000,
      fuelType: "electric",
      batteryCapacity: 48
    },
    documents: [
      { id: "doc-001", name: "Instrukcja obsługi", type: "manual", fileUrl: "/documents/asset-001-manual.pdf" },
      { id: "doc-002", name: "Certyfikat gwarancji", type: "warranty", fileUrl: "/documents/asset-001-warranty.pdf" }
    ],
    notes: "Wymaga regularnego ładowania baterii co 8 godzin pracy",
    tags: ["magazyn", "elektryczny", "toyota"],
    customFields: {
      insurancePolicy: "POL-12345",
      insuranceExpiryDate: "2025-05-14",
      departmentCode: "LOG-WH-A"
    },
    createdAt: "2023-05-15T10:30:00Z",
    updatedAt: "2024-03-15T14:45:00Z",
    createdBy: "user-001",
    lastCheckedBy: "user-002",
    lastCheckedAt: "2024-03-15T14:45:00Z"
  },
  {
    id: "asset-002",
    name: "Przyczepa chłodnicza Schmitz",
    type: "equipment",
    category: "trailer",
    serialNumber: "SCH-TR-67890",
    manufacturer: "Schmitz Cargobull",
    model: "SKO 24",
    purchaseDate: "2022-08-10",
    purchasePrice: 85000,
    currentValue: 72000,
    depreciationMethod: "straight-line",
    depreciationRate: 8,
    expectedLifespan: 12,
    warrantyExpiryDate: "2025-08-09",
    location: "Parking B",
    assignedTo: { type: "vehicle", id: "veh-002", name: "Ciągnik siodłowy Volvo FH" },
    status: "active",
    maintenanceSchedule: [
      { type: "inspection", interval: 60, unit: "days", lastPerformed: "2024-02-15", nextDue: "2024-04-15" },
      { type: "service", interval: 10000, unit: "kilometers", lastPerformed: "2024-01-20", nextDue: "2024-06-20" }
    ],
    specifications: {
      height: 4.0,
      width: 2.6,
      length: 13.6,
      weight: 7500,
      capacity: 33,
      temperatureRange: "-30 to +30",
      axles: 3
    },
    documents: [
      { id: "doc-003", name: "Dokumentacja techniczna", type: "manual", fileUrl: "/documents/asset-002-manual.pdf" },
      { id: "doc-004", name: "Certyfikat ATP", type: "certificate", fileUrl: "/documents/asset-002-certificate.pdf" }
    ],
    notes: "Wyposażona w agregat chłodniczy Carrier Transicold",
    tags: ["chłodnia", "przyczepa", "schmitz"],
    customFields: {
      insurancePolicy: "POL-67890",
      insuranceExpiryDate: "2025-08-09",
      departmentCode: "TRANS-COLD"
    },
    createdAt: "2022-08-10T09:15:00Z",
    updatedAt: "2024-02-15T11:30:00Z",
    createdBy: "user-001",
    lastCheckedBy: "user-003",
    lastCheckedAt: "2024-02-15T11:30:00Z"
  },
  {
    id: "asset-003",
    name: "Skaner kodów kreskowych Zebra",
    type: "tool",
    category: "scanner",
    serialNumber: "ZBR-SC-54321",
    manufacturer: "Zebra Technologies",
    model: "DS3678",
    purchaseDate: "2023-11-05",
    purchasePrice: 1200,
    currentValue: 1080,
    depreciationMethod: "straight-line",
    depreciationRate: 20,
    expectedLifespan: 5,
    warrantyExpiryDate: "2025-11-04",
    location: "Warehouse A",
    assignedTo: { type: "driver", id: "drv-001", name: "Jan Kowalski" },
    status: "active",
    maintenanceSchedule: [
      { type: "calibration", interval: 180, unit: "days", lastPerformed: "2024-01-10", nextDue: "2024-07-08" }
    ],
    specifications: {
      scanRange: "7 cm to 9 m",
      connectivity: "Bluetooth",
      batteryLife: "24 hours",
      weight: 410,
      ipRating: "IP67"
    },
    documents: [
      { id: "doc-005", name: "Instrukcja obsługi", type: "manual", fileUrl: "/documents/asset-003-manual.pdf" }
    ],
    notes: "Odporny na upadki z wysokości do 2,4 m",
    tags: ["skaner", "magazyn", "zebra"],
    customFields: {
      departmentCode: "LOG-WH-A"
    },
    createdAt: "2023-11-05T14:20:00Z",
    updatedAt: "2024-01-10T10:15:00Z",
    createdBy: "user-002",
    lastCheckedBy: "user-002",
    lastCheckedAt: "2024-01-10T10:15:00Z"
  },
  {
    id: "asset-004",
    name: "Zestaw narzędzi warsztatowych",
    type: "tool",
    category: "toolset",
    serialNumber: "SNP-TS-98765",
    manufacturer: "Snap-on",
    model: "KRA2210",
    purchaseDate: "2022-03-20",
    purchasePrice: 8500,
    currentValue: 6800,
    depreciationMethod: "straight-line",
    depreciationRate: 10,
    expectedLifespan: 10,
    warrantyExpiryDate: "2032-03-19",
    location: "Service Center",
    assignedTo: { type: "location", id: "loc-001", name: "Warsztat główny" },
    status: "active",
    maintenanceSchedule: [
      { type: "inspection", interval: 90, unit: "days", lastPerformed: "2024-02-01", nextDue: "2024-05-01" }
    ],
    specifications: {
      pieces: 356,
      weight: 120,
      dimensions: "183 x 77 x 47 cm"
    },
    documents: [
      { id: "doc-006", name: "Katalog narzędzi", type: "manual", fileUrl: "/documents/asset-004-catalog.pdf" }
    ],
    notes: "Kompletny zestaw narzędzi do napraw mechanicznych",
    tags: ["narzędzia", "warsztat", "snap-on"],
    customFields: {
      inventoryCode: "TOOL-SET-001",
      departmentCode: "MAINT-MAIN"
    },
    createdAt: "2022-03-20T08:45:00Z",
    updatedAt: "2024-02-01T09:30:00Z",
    createdBy: "user-003",
    lastCheckedBy: "user-004",
    lastCheckedAt: "2024-02-01T09:30:00Z"
  },
  {
    id: "asset-005",
    name: "Kompresor powietrza Atlas Copco",
    type: "equipment",
    category: "compressor",
    serialNumber: "AC-CP-24680",
    manufacturer: "Atlas Copco",
    model: "GA 30+",
    purchaseDate: "2021-09-12",
    purchasePrice: 32000,
    currentValue: 24000,
    depreciationMethod: "straight-line",
    depreciationRate: 10,
    expectedLifespan: 15,
    warrantyExpiryDate: "2024-09-11",
    location: "Service Center",
    assignedTo: { type: "location", id: "loc-001", name: "Warsztat główny" },
    status: "maintenance",
    maintenanceSchedule: [
      { type: "service", interval: 2000, unit: "hours", lastPerformed: "2024-03-01", nextDue: "2024-06-01" },
      { type: "inspection", interval: 30, unit: "days", lastPerformed: "2024-03-15", nextDue: "2024-04-14" }
    ],
    specifications: {
      power: "30 kW",
      capacity: "5.3 m³/min",
      pressure: "7.5 bar",
      noise: "67 dB(A)",
      weight: 750
    },
    documents: [
      { id: "doc-007", name: "Instrukcja obsługi", type: "manual", fileUrl: "/documents/asset-005-manual.pdf" },
      { id: "doc-008", name: "Harmonogram serwisowy", type: "schedule", fileUrl: "/documents/asset-005-schedule.pdf" }
    ],
    notes: "Obecnie w trakcie przeglądu okresowego",
    tags: ["kompresor", "warsztat", "atlas copco"],
    customFields: {
      powerSupply: "400V/3-phase",
      departmentCode: "MAINT-MAIN"
    },
    createdAt: "2021-09-12T11:20:00Z",
    updatedAt: "2024-03-15T13:10:00Z",
    createdBy: "user-001",
    lastCheckedBy: "user-004",
    lastCheckedAt: "2024-03-15T13:10:00Z"
  }
];

const mockAssetCategories = [
  {
    id: "cat-001",
    code: "forklift",
    name: "Wózki widłowe",
    type: "equipment",
    description: "Wózki widłowe używane w magazynach",
    maintenanceRequirements: [
      { type: "inspection", interval: 30, unit: "days", description: "Przegląd bezpieczeństwa" },
      { type: "service", interval: 500, unit: "hours", description: "Serwis techniczny" }
    ],
    defaultDepreciationMethod: "straight-line",
    defaultDepreciationRate: 10,
    defaultLifespan: 10,
    requiredDocuments: ["manual", "warranty", "insurance"],
    customFields: ["insurancePolicy", "insuranceExpiryDate", "departmentCode"]
  },
  {
    id: "cat-002",
    code: "trailer",
    name: "Przyczepy",
    type: "equipment",
    description: "Przyczepy transportowe różnych typów",
    maintenanceRequirements: [
      { type: "inspection", interval: 60, unit: "days", description: "Przegląd techniczny" },
      { type: "service", interval: 10000, unit: "kilometers", description: "Serwis okresowy" }
    ],
    defaultDepreciationMethod: "straight-line",
    defaultDepreciationRate: 8,
    defaultLifespan: 12,
    requiredDocuments: ["manual", "warranty", "insurance", "certificate"],
    customFields: ["insurancePolicy", "insuranceExpiryDate", "departmentCode"]
  },
  {
    id: "cat-003",
    code: "scanner",
    name: "Skanery",
    type: "tool",
    description: "Skanery kodów kreskowych i RFID",
    maintenanceRequirements: [
      { type: "calibration", interval: 180, unit: "days", description: "Kalibracja" }
    ],
    defaultDepreciationMethod: "straight-line",
    defaultDepreciationRate: 20,
    defaultLifespan: 5,
    requiredDocuments: ["manual", "warranty"],
    customFields: ["departmentCode"]
  },
  {
    id: "cat-004",
    code: "toolset",
    name: "Zestawy narzędzi",
    type: "tool",
    description: "Komplety narzędzi warsztatowych",
    maintenanceRequirements: [
      { type: "inspection", interval: 90, unit: "days", description: "Kontrola kompletności i stanu" }
    ],
    defaultDepreciationMethod: "straight-line",
    defaultDepreciationRate: 10,
    defaultLifespan: 10,
    requiredDocuments: ["manual", "warranty"],
    customFields: ["inventoryCode", "departmentCode"]
  },
  {
    id: "cat-005",
    code: "compressor",
    name: "Kompresory",
    type: "equipment",
    description: "Kompresory powietrza",
    maintenanceRequirements: [
      { type: "service", interval: 2000, unit: "hours", description: "Serwis techniczny" },
      { type: "inspection", interval: 30, unit: "days", description: "Kontrola bezpieczeństwa" }
    ],
    defaultDepreciationMethod: "straight-line",
    defaultDepreciationRate: 10,
    defaultLifespan: 15,
    requiredDocuments: ["manual", "warranty", "schedule"],
    customFields: ["powerSupply", "departmentCode"]
  }
];

const mockAssetLocations = [
  { id: "loc-001", name: "Warsztat główny", type: "workshop", address: "ul. Przemysłowa 1, Warszawa" },
  { id: "loc-002", name: "Warehouse A", type: "warehouse", address: "ul. Magazynowa 10, Warszawa" },
  { id: "loc-003", name: "Parking B", type: "parking", address: "ul. Transportowa 5, Warszawa" },
  { id: "loc-004", name: "Service Center", type: "service", address: "ul. Serwisowa 8, Warszawa" },
  { id: "loc-005", name: "Biuro główne", type: "office", address: "ul. Biurowa 15, Warszawa" }
];

const mockMaintenanceHistory = [
  {
    id: "maint-001",
    assetId: "asset-001",
    type: "service",
    status: "completed",
    scheduledDate: "2024-02-10",
    completedDate: "2024-02-10",
    performedBy: "vendor-001",
    performedByName: "Serwis Toyota",
    description: "Regularny serwis techniczny po 500 godzinach pracy",
    findings: "Wymieniono olej hydrauliczny, sprawdzono układ hamulcowy",
    recommendations: "Zalecana wymiana baterii w ciągu najbliższych 6 miesięcy",
    cost: 1200,
    invoiceNumber: "INV-2024-123",
    invoiceDate: "2024-02-10",
    nextScheduledDate: "2024-05-10",
    documents: [
      { id: "doc-003", name: "Raport serwisowy", fileUrl: "/documents/asset-001-service-report.pdf" },
      { id: "doc-004", name: "Faktura za serwis", fileUrl: "/documents/asset-001-service-invoice.pdf" }
    ],
    notes: "Serwis wykonany zgodnie z harmonogramem",
    createdAt: "2024-01-15T09:00:00Z",
    updatedAt: "2024-02-10T16:30:00Z",
    createdBy: "user-001"
  },
  {
    id: "maint-002",
    assetId: "asset-001",
    type: "inspection",
    status: "completed",
    scheduledDate: "2024-03-15",
    completedDate: "2024-03-15",
    performedBy: "user-002",
    performedByName: "Adam Nowak",
    description: "Miesięczny przegląd bezpieczeństwa",
    findings: "Wszystkie systemy działają prawidłowo",
    recommendations: "Brak zaleceń",
    cost: 0,
    invoiceNumber: null,
    invoiceDate: null,
    nextScheduledDate: "2024-04-14",
    documents: [
      { id: "doc-009", name: "Raport z przeglądu", fileUrl: "/documents/asset-001-inspection-report.pdf" }
    ],
    notes: "Przegląd wewnętrzny",
    createdAt: "2024-03-01T10:00:00Z",
    updatedAt: "2024-03-15T14:45:00Z",
    createdBy: "user-002"
  },
  {
    id: "maint-003",
    assetId: "asset-002",
    type: "inspection",
    status: "completed",
    scheduledDate: "2024-02-15",
    completedDate: "2024-02-15",
    performedBy: "user-003",
    performedByName: "Piotr Wiśniewski",
    description: "Dwumiesięczny przegląd techniczny",
    findings: "Wymieniono filtr powietrza w agregacie chłodniczym",
    recommendations: "Zalecana kontrola szczelności układu chłodniczego przy następnym przeglądzie",
    cost: 150,
    invoiceNumber: null,
    invoiceDate: null,
    nextScheduledDate: "2024-04-15",
    documents: [
      { id: "doc-010", name: "Raport z przeglądu", fileUrl: "/documents/asset-002-inspection-report.pdf" }
    ],
    notes: "Przegląd wewnętrzny",
    createdAt: "2024-02-01T09:30:00Z",
    updatedAt: "2024-02-15T11:30:00Z",
    createdBy: "user-003"
  }
];

const mockAssetAssignments = [
  {
    id: "assign-001",
    assetId: "asset-001",
    assignedTo: {
      type: "vehicle",
      id: "veh-001",
      name: "Ciężarówka MAN TGX"
    },
    startDate: "2024-01-01",
    endDate: null,
    assignedBy: "user-001",
    notes: "Przypisano na stałe do ciężarówki",
    createdAt: "2023-12-28T14:00:00Z",
    updatedAt: "2023-12-28T14:00:00Z"
  },
  {
    id: "assign-002",
    assetId: "asset-002",
    assignedTo: {
      type: "vehicle",
      id: "veh-002",
      name: "Ciągnik siodłowy Volvo FH"
    },
    startDate: "2023-09-15",
    endDate: null,
    assignedBy: "user-001",
    notes: "Przypisano na stałe do ciągnika",
    createdAt: "2023-09-14T10:30:00Z",
    updatedAt: "2023-09-14T10:30:00Z"
  },
  {
    id: "assign-003",
    assetId: "asset-003",
    assignedTo: {
      type: "driver",
      id: "drv-001",
      name: "Jan Kowalski"
    },
    startDate: "2024-01-10",
    endDate: null,
    assignedBy: "user-002",
    notes: "Przypisano do kierowcy na czas nieokreślony",
    createdAt: "2024-01-09T15:45:00Z",
    updatedAt: "2024-01-09T15:45:00Z"
  }
];

const mockAssetCosts = [
  {
    id: "cost-001",
    assetId: "asset-001",
    type: "maintenance",
    amount: 1200,
    date: "2024-02-10",
    description: "Regularny serwis techniczny",
    category: "service",
    vendor: "vendor-001",
    vendorName: "Serwis Toyota",
    invoiceNumber: "INV-2024-123",
    invoiceDate: "2024-02-10",
    paymentMethod: "transfer",
    paymentStatus: "paid",
    documents: [
      { id: "doc-004", name: "Faktura za serwis", fileUrl: "/documents/asset-001-service-invoice.pdf" }
    ],
    notes: "Koszt regularnego serwisu po 500 godzinach pracy",
    createdAt: "2024-02-10T16:30:00Z",
    updatedAt: "2024-02-10T16:30:00Z",
    createdBy: "user-001"
  },
  {
    id: "cost-002",
    assetId: "asset-002",
    type: "maintenance",
    amount: 150,
    date: "2024-02-15",
    description: "Wymiana filtra powietrza w agregacie chłodniczym",
    category: "repair",
    vendor: "internal",
    vendorName: "Dział Utrzymania",
    invoiceNumber: null,
    invoiceDate: null,
    paymentMethod: "internal",
    paymentStatus: "processed",
    documents: [],
    notes: "Koszt części zamiennych",
    createdAt: "2024-02-15T11:30:00Z",
    updatedAt: "2024-02-15T11:30:00Z",
    createdBy: "user-003"
  },
  {
    id: "cost-003",
    assetId: "asset-001",
    type: "insurance",
    amount: 2500,
    date: "2023-05-15",
    description: "Roczne ubezpieczenie wózka widłowego",
    category: "insurance",
    vendor: "vendor-002",
    vendorName: "PZU",
    invoiceNumber: "INS-2023-456",
    invoiceDate: "2023-05-15",
    paymentMethod: "transfer",
    paymentStatus: "paid",
    documents: [
      { id: "doc-011", name: "Polisa ubezpieczeniowa", fileUrl: "/documents/asset-001-insurance-policy.pdf" }
    ],
    notes: "Ubezpieczenie OC i AC",
    createdAt: "2023-05-15T10:30:00Z",
    updatedAt: "2023-05-15T10:30:00Z",
    createdBy: "user-001"
  }
];

const mockDashboardData = {
  assetCounts: {
    total: 5,
    byType: {
      vehicle: 0,
      equipment: 3,
      tool: 2,
      part: 0,
      accessory: 0
    },
    byStatus: {
      active: 4,
      maintenance: 1,
      inactive: 0,
      disposed: 0
    }
  },
  maintenanceAlerts: [
    {
      id: "alert-001",
      assetId: "asset-001",
      assetName: "Wózek widłowy Toyota",
      type: "maintenance_due",
      priority: "medium",
      description: "Przegląd bezpieczeństwa za 14 dni",
      dueDate: "2024-04-14",
      createdAt: "2024-03-15T14:45:00Z"
    },
    {
      id: "alert-002",
      assetId: "asset-005",
      assetName: "Kompresor powietrza Atlas Copco",
      type: "in_maintenance",
      priority: "high",
      description: "Aktywo obecnie w serwisie",
      dueDate: null,
      createdAt: "2024-03-15T13:10:00Z"
    }
  ],
  utilizationStats: {
    averageUtilization: 78,
    underutilizedAssets: 1,
    overutilizedAssets: 0,
    utilizationByType: {
      vehicle: 0,
      equipment: 82,
      tool: 71,
      part: 0,
      accessory: 0
    }
  },
  costSummary: {
    totalCosts: 3850,
    byType: {
      purchase: 0,
      maintenance: 1350,
      repair: 0,
      insurance: 2500,
      tax: 0,
      fuel: 0,
      other: 0
    },
    monthlyTrend: [
      { month: "2023-11", amount: 0 },
      { month: "2023-12", amount: 0 },
      { month: "2024-01", amount: 0 },
      { month: "2024-02", amount: 1350 },
      { month: "2024-03", amount: 0 }
    ]
  },
  warrantyExpirations: [
    {
      assetId: "asset-005",
      assetName: "Kompresor powietrza Atlas Copco",
      expiryDate: "2024-09-11",
      daysRemaining: 149
    },
    {
      assetId: "asset-003",
      assetName: "Skaner kodów kreskowych Zebra",
      expiryDate: "2025-11-04",
      daysRemaining: 568
    }
  ],
  recentActivities: [
    {
      id: "activity-001",
      type: "maintenance",
      description: "Przegląd bezpieczeństwa wózka widłowego Toyota",
      assetId: "asset-001",
      assetName: "Wózek widłowy Toyota",
      performedBy: "Adam Nowak",
      date: "2024-03-15T14:45:00Z"
    },
    {
      id: "activity-002",
      type: "status_change",
      description: "Zmiana statusu kompresora na 'maintenance'",
      assetId: "asset-005",
      assetName: "Kompresor powietrza Atlas Copco",
      performedBy: "Piotr Wiśniewski",
      date: "2024-03-15T13:10:00Z"
    }
  ]
};

const mockUtilizationData = {
  summary: {
    averageUtilization: 78,
    utilizationByType: {
      vehicle: 0,
      equipment: 82,
      tool: 71,
      part: 0,
      accessory: 0
    },
    utilizationByCategory: {
      forklift: 85,
      trailer: 90,
      scanner: 65,
      toolset: 75,
      compressor: 70
    },
    utilizationTrend: [
      { month: "2023-11", utilization: 72 },
      { month: "2023-12", utilization: 68 },
      { month: "2024-01", utilization: 75 },
      { month: "2024-02", utilization: 80 },
      { month: "2024-03", utilization: 78 }
    ]
  },
  assetUtilization: [
    {
      assetId: "asset-001",
      assetName: "Wózek widłowy Toyota",
      utilization: 85,
      hoursUsed: 420,
      totalAvailableHours: 496,
      downtimeHours: 76,
      downtimeReason: "Maintenance, Charging"
    },
    {
      assetId: "asset-002",
      assetName: "Przyczepa chłodnicza Schmitz",
      utilization: 90,
      hoursUsed: 670,
      totalAvailableHours: 744,
      downtimeHours: 74,
      downtimeReason: "Maintenance, Loading/Unloading"
    },
    {
      assetId: "asset-003",
      assetName: "Skaner kodów kreskowych Zebra",
      utilization: 65,
      hoursUsed: 156,
      totalAvailableHours: 240,
      downtimeHours: 84,
      downtimeReason: "Not in use, Charging"
    },
    {
      assetId: "asset-004",
      assetName: "Zestaw narzędzi warsztatowych",
      utilization: 75,
      hoursUsed: 180,
      totalAvailableHours: 240,
      downtimeHours: 60,
      downtimeReason: "Not in use"
    },
    {
      assetId: "asset-005",
      assetName: "Kompresor powietrza Atlas Copco",
      utilization: 70,
      hoursUsed: 520,
      totalAvailableHours: 744,
      downtimeHours: 224,
      downtimeReason: "Maintenance, Not in use"
    }
  ],
  recommendations: [
    {
      assetId: "asset-003",
      assetName: "Skaner kodów kreskowych Zebra",
      recommendation: "Rozważ przypisanie do innego kierowcy lub lokalizacji dla zwiększenia wykorzystania",
      potentialUtilizationIncrease: 15,
      priority: "medium"
    }
  ]
};

const mockDepreciationData = {
  summary: {
    totalOriginalValue: 171700,
    totalCurrentValue: 141880,
    totalDepreciation: 29820,
    averageDepreciationRate: 11.6,
    depreciationByType: {
      vehicle: 0,
      equipment: 28000,
      tool: 1820,
      part: 0,
      accessory: 0
    }
  },
  assetDepreciation: [
    {
      assetId: "asset-001",
      assetName: "Wózek widłowy Toyota",
      purchaseDate: "2023-05-15",
      purchasePrice: 45000,
      currentValue: 38000,
      totalDepreciation: 7000,
      depreciationMethod: "straight-line",
      depreciationRate: 10,
      expectedLifespan: 10,
      remainingLifespan: 9.1,
      projectedValues: [
        { date: "2024-05-15", value: 36000 },
        { date: "2025-05-15", value: 31500 },
        { date: "2026-05-15", value: 27000 },
        { date: "2027-05-15", value: 22500 },
        { date: "2028-05-15", value: 18000 }
      ]
    },
    {
      assetId: "asset-002",
      assetName: "Przyczepa chłodnicza Schmitz",
      purchaseDate: "2022-08-10",
      purchasePrice: 85000,
      currentValue: 72000,
      totalDepreciation: 13000,
      depreciationMethod: "straight-line",
      depreciationRate: 8,
      expectedLifespan: 12,
      remainingLifespan: 10.3,
      projectedValues: [
        { date: "2024-08-10", value: 65280 },
        { date: "2025-08-10", value: 58560 },
        { date: "2026-08-10", value: 51840 },
        { date: "2027-08-10", value: 45120 },
        { date: "2028-08-10", value: 38400 }
      ]
    },
    {
      assetId: "asset-003",
      assetName: "Skaner kodów kreskowych Zebra",
      purchaseDate: "2023-11-05",
      purchasePrice: 1200,
      currentValue: 1080,
      totalDepreciation: 120,
      depreciationMethod: "straight-line",
      depreciationRate: 20,
      expectedLifespan: 5,
      remainingLifespan: 4.6,
      projectedValues: [
        { date: "2024-11-05", value: 840 },
        { date: "2025-11-05", value: 600 },
        { date: "2026-11-05", value: 360 },
        { date: "2027-11-05", value: 120 },
        { date: "2028-11-05", value: 0 }
      ]
    },
    {
      assetId: "asset-004",
      assetName: "Zestaw narzędzi warsztatowych",
      purchaseDate: "2022-03-20",
      purchasePrice: 8500,
      currentValue: 6800,
      totalDepreciation: 1700,
      depreciationMethod: "straight-line",
      depreciationRate: 10,
      expectedLifespan: 10,
      remainingLifespan: 8,
      projectedValues: [
        { date: "2024-03-20", value: 6120 },
        { date: "2025-03-20", value: 5440 },
        { date: "2026-03-20", value: 4760 },
        { date: "2027-03-20", value: 4080 },
        { date: "2028-03-20", value: 3400 }
      ]
    },
    {
      assetId: "asset-005",
      assetName: "Kompresor powietrza Atlas Copco",
      purchaseDate: "2021-09-12",
      purchasePrice: 32000,
      currentValue: 24000,
      totalDepreciation: 8000,
      depreciationMethod: "straight-line",
      depreciationRate: 10,
      expectedLifespan: 15,
      remainingLifespan: 12.4,
      projectedValues: [
        { date: "2024-09-12", value: 21600 },
        { date: "2025-09-12", value: 19200 },
        { date: "2026-09-12", value: 16800 },
        { date: "2027-09-12", value: 14400 },
        { date: "2028-09-12", value: 12000 }
      ]
    }
  ]
};

// Helper functions
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const filterAssets = (assets, filters = {}) => {
  let filteredAssets = [...assets];
  
  if (filters.type) {
    filteredAssets = filteredAssets.filter(asset => asset.type === filters.type);
  }
  
  if (filters.category) {
    filteredAssets = filteredAssets.filter(asset => asset.category === filters.category);
  }
  
  if (filters.status) {
    filteredAssets = filteredAssets.filter(asset => asset.status === filters.status);
  }
  
  if (filters.location) {
    filteredAssets = filteredAssets.filter(asset => asset.location === filters.location);
  }
  
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filteredAssets = filteredAssets.filter(asset => 
      asset.name.toLowerCase().includes(searchLower) || 
      asset.serialNumber.toLowerCase().includes(searchLower) ||
      asset.manufacturer.toLowerCase().includes(searchLower) ||
      asset.model.toLowerCase().includes(searchLower)
    );
  }
  
  return filteredAssets;
};

const paginateAssets = (assets, page = 1, limit = 10) => {
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedAssets = assets.slice(startIndex, endIndex);
  
  return {
    assets: paginatedAssets,
    pagination: {
      total: assets.length,
      page,
      limit,
      pages: Math.ceil(assets.length / limit)
    }
  };
};

// Mock API functions
export const getAssetDashboard = async (params = {}) => {
  await delay(500);
  return mockDashboardData;
};

export const getAssets = async (params = {}) => {
  await delay(500);
  const filteredAssets = filterAssets(mockAssets, params);
  return paginateAssets(filteredAssets, params.page || 1, params.limit || 10);
};

export const getAssetDetails = async (assetId) => {
  await delay(300);
  const asset = mockAssets.find(asset => asset.id === assetId);
  
  if (!asset) {
    throw new Error(`Asset with ID ${assetId} not found`);
  }
  
  return asset;
};

export const createAsset = async (assetData, file = null) => {
  await delay(700);
  const newAsset = {
    id: `asset-${uuidv4().substring(0, 8)}`,
    ...assetData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  mockAssets.push(newAsset);
  return newAsset;
};

export const updateAsset = async (assetId, assetData, file = null) => {
  await delay(700);
  const assetIndex = mockAssets.findIndex(asset => asset.id === assetId);
  
  if (assetIndex === -1) {
    throw new Error(`Asset with ID ${assetId} not found`);
  }
  
  const updatedAsset = {
    ...mockAssets[assetIndex],
    ...assetData,
    updatedAt: new Date().toISOString()
  };
  
  mockAssets[assetIndex] = updatedAsset;
  return updatedAsset;
};

export const deleteAsset = async (assetId) => {
  await delay(500);
  const assetIndex = mockAssets.findIndex(asset => asset.id === assetId);
  
  if (assetIndex === -1) {
    throw new Error(`Asset with ID ${assetId} not found`);
  }
  
  mockAssets.splice(assetIndex, 1);
  return { success: true, message: `Asset with ID ${assetId} deleted successfully` };
};

export const assignAsset = async (assetId, assignmentData) => {
  await delay(500);
  const asset = mockAssets.find(asset => asset.id === assetId);
  
  if (!asset) {
    throw new Error(`Asset with ID ${assetId} not found`);
  }
  
  const newAssignment = {
    id: `assign-${uuidv4().substring(0, 8)}`,
    assetId,
    ...assignmentData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  mockAssetAssignments.push(newAssignment);
  
  // Update asset with new assignment
  asset.assignedTo = {
    type: assignmentData.type,
    id: assignmentData.id,
    name: assignmentData.name
  };
  asset.updatedAt = new Date().toISOString();
  
  return newAssignment;
};

export const unassignAsset = async (assetId, assignmentId) => {
  await delay(500);
  const asset = mockAssets.find(asset => asset.id === assetId);
  
  if (!asset) {
    throw new Error(`Asset with ID ${assetId} not found`);
  }
  
  const assignmentIndex = mockAssetAssignments.findIndex(
    assignment => assignment.id === assignmentId && assignment.assetId === assetId
  );
  
  if (assignmentIndex === -1) {
    throw new Error(`Assignment with ID ${assignmentId} for asset ${assetId} not found`);
  }
  
  // Update assignment with end date
  mockAssetAssignments[assignmentIndex].endDate = new Date().toISOString();
  mockAssetAssignments[assignmentIndex].updatedAt = new Date().toISOString();
  
  // Remove assignment from asset
  asset.assignedTo = null;
  asset.updatedAt = new Date().toISOString();
  
  return { success: true, message: `Asset with ID ${assetId} unassigned successfully` };
};

export const getAssetMaintenanceSchedule = async (assetId) => {
  await delay(300);
  const asset = mockAssets.find(asset => asset.id === assetId);
  
  if (!asset) {
    throw new Error(`Asset with ID ${assetId} not found`);
  }
  
  return asset.maintenanceSchedule || [];
};

export const getAssetMaintenanceHistory = async (assetId, params = {}) => {
  await delay(500);
  const history = mockMaintenanceHistory.filter(item => item.assetId === assetId);
  
  if (params.startDate) {
    const startDate = new Date(params.startDate);
    history.filter(item => new Date(item.completedDate) >= startDate);
  }
  
  if (params.endDate) {
    const endDate = new Date(params.endDate);
    history.filter(item => new Date(item.completedDate) <= endDate);
  }
  
  if (params.type) {
    history.filter(item => item.type === params.type);
  }
  
  const page = params.page || 1;
  const limit = params.limit || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  
  return {
    history: history.slice(startIndex, endIndex),
    pagination: {
      total: history.length,
      page,
      limit,
      pages: Math.ceil(history.length / limit)
    }
  };
};

export const scheduleAssetMaintenance = async (assetId, maintenanceData) => {
  await delay(700);
  const asset = mockAssets.find(asset => asset.id === assetId);
  
  if (!asset) {
    throw new Error(`Asset with ID ${assetId} not found`);
  }
  
  if (!asset.maintenanceSchedule) {
    asset.maintenanceSchedule = [];
  }
  
  asset.maintenanceSchedule.push(maintenanceData);
  asset.updatedAt = new Date().toISOString();
  
  return maintenanceData;
};

export const recordAssetMaintenance = async (assetId, maintenanceData, file = null) => {
  await delay(700);
  const asset = mockAssets.find(asset => asset.id === assetId);
  
  if (!asset) {
    throw new Error(`Asset with ID ${assetId} not found`);
  }
  
  const newMaintenance = {
    id: `maint-${uuidv4().substring(0, 8)}`,
    assetId,
    ...maintenanceData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  mockMaintenanceHistory.push(newMaintenance);
  
  // Update maintenance schedule if applicable
  if (asset.maintenanceSchedule && maintenanceData.type) {
    const scheduleIndex = asset.maintenanceSchedule.findIndex(item => item.type === maintenanceData.type);
    
    if (scheduleIndex !== -1) {
      asset.maintenanceSchedule[scheduleIndex].lastPerformed = maintenanceData.completedDate;
      
      // Calculate next due date based on interval
      const schedule = asset.maintenanceSchedule[scheduleIndex];
      const completedDate = new Date(maintenanceData.completedDate);
      let nextDue;
      
      if (schedule.unit === 'days') {
        nextDue = new Date(completedDate);
        nextDue.setDate(nextDue.getDate() + schedule.interval);
      } else if (schedule.unit === 'months') {
        nextDue = new Date(completedDate);
        nextDue.setMonth(nextDue.getMonth() + schedule.interval);
      } else {
        // For other units like hours, kilometers, etc., just set a placeholder
        nextDue = new Date(completedDate);
        nextDue.setDate(nextDue.getDate() + 90); // Default to 90 days
      }
      
      asset.maintenanceSchedule[scheduleIndex].nextDue = nextDue.toISOString().split('T')[0];
    }
  }
  
  asset.updatedAt = new Date().toISOString();
  
  return newMaintenance;
};

export const getAssetCategories = async (params = {}) => {
  await delay(300);
  let categories = [...mockAssetCategories];
  
  if (params.type) {
    categories = categories.filter(category => category.type === params.type);
  }
  
  return categories;
};

export const getAssetLocations = async () => {
  await delay(300);
  return mockAssetLocations;
};

export const getAssetUtilization = async (params = {}) => {
  await delay(500);
  let utilization = { ...mockUtilizationData };
  
  if (params.assetId) {
    utilization.assetUtilization = utilization.assetUtilization.filter(
      item => item.assetId === params.assetId
    );
  }
  
  if (params.type) {
    utilization.assetUtilization = utilization.assetUtilization.filter(
      item => {
        const asset = mockAssets.find(asset => asset.id === item.assetId);
        return asset && asset.type === params.type;
      }
    );
  }
  
  if (params.category) {
    utilization.assetUtilization = utilization.assetUtilization.filter(
      item => {
        const asset = mockAssets.find(asset => asset.id === item.assetId);
        return asset && asset.category === params.category;
      }
    );
  }
  
  return utilization;
};

export const getAssetDepreciation = async (params = {}) => {
  await delay(500);
  let depreciation = { ...mockDepreciationData };
  
  if (params.assetId) {
    depreciation.assetDepreciation = depreciation.assetDepreciation.filter(
      item => item.assetId === params.assetId
    );
  }
  
  if (params.type) {
    depreciation.assetDepreciation = depreciation.assetDepreciation.filter(
      item => {
        const asset = mockAssets.find(asset => asset.id === item.assetId);
        return asset && asset.type === params.type;
      }
    );
  }
  
  if (params.category) {
    depreciation.assetDepreciation = depreciation.assetDepreciation.filter(
      item => {
        const asset = mockAssets.find(asset => asset.id === item.assetId);
        return asset && asset.category === params.category;
      }
    );
  }
  
  return depreciation;
};

export const getAssetCosts = async (params = {}) => {
  await delay(500);
  let costs = [...mockAssetCosts];
  
  if (params.assetId) {
    costs = costs.filter(cost => cost.assetId === params.assetId);
  }
  
  if (params.type) {
    costs = costs.filter(cost => cost.type === params.type);
  }
  
  if (params.startDate) {
    const startDate = new Date(params.startDate);
    costs = costs.filter(cost => new Date(cost.date) >= startDate);
  }
  
  if (params.endDate) {
    const endDate = new Date(params.endDate);
    costs = costs.filter(cost => new Date(cost.date) <= endDate);
  }
  
  const page = params.page || 1;
  const limit = params.limit || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  
  return {
    costs: costs.slice(startIndex, endIndex),
    pagination: {
      total: costs.length,
      page,
      limit,
      pages: Math.ceil(costs.length / limit)
    },
    summary: {
      totalAmount: costs.reduce((sum, cost) => sum + cost.amount, 0),
      byType: costs.reduce((acc, cost) => {
        acc[cost.type] = (acc[cost.type] || 0) + cost.amount;
        return acc;
      }, {})
    }
  };
};

export const calculateAssetTCO = async (assetId, params = {}) => {
  await delay(700);
  const asset = mockAssets.find(asset => asset.id === assetId);
  
  if (!asset) {
    throw new Error(`Asset with ID ${assetId} not found`);
  }
  
  // Calculate TCO based on purchase price and all costs
  const assetCosts = mockAssetCosts.filter(cost => cost.assetId === assetId);
  const totalCosts = assetCosts.reduce((sum, cost) => sum + cost.amount, 0);
  const purchasePrice = asset.purchasePrice || 0;
  
  // Calculate projected costs for future years
  const yearsToProject = params.yearsToProject || 5;
  const annualMaintenanceCost = totalCosts * 1.05; // Assume 5% increase per year
  const projectedCosts = [];
  
  for (let i = 1; i <= yearsToProject; i++) {
    const yearDate = new Date();
    yearDate.setFullYear(yearDate.getFullYear() + i);
    
    projectedCosts.push({
      year: yearDate.getFullYear(),
      maintenanceCost: Math.round(annualMaintenanceCost * (1 + 0.03 * i)), // 3% inflation per year
      depreciationCost: Math.round(purchasePrice * (asset.depreciationRate / 100)),
      operationalCost: Math.round(purchasePrice * 0.05 * (1 + 0.02 * i)) // Operational costs increase 2% per year
    });
  }
  
  return {
    assetId,
    assetName: asset.name,
    purchasePrice,
    currentValue: asset.currentValue || 0,
    totalCostsToDate: totalCosts,
    tco: purchasePrice + totalCosts,
    costBreakdown: {
      purchase: purchasePrice,
      maintenance: assetCosts.filter(cost => cost.type === 'maintenance').reduce((sum, cost) => sum + cost.amount, 0),
      insurance: assetCosts.filter(cost => cost.type === 'insurance').reduce((sum, cost) => sum + cost.amount, 0),
      other: assetCosts.filter(cost => !['maintenance', 'insurance'].includes(cost.type)).reduce((sum, cost) => sum + cost.amount, 0)
    },
    projectedCosts,
    projectedTCO: purchasePrice + totalCosts + projectedCosts.reduce((sum, year) => 
      sum + year.maintenanceCost + year.operationalCost, 0
    )
  };
};

export const forecastAssetReplacement = async (assetId, params = {}) => {
  await delay(700);
  const asset = mockAssets.find(asset => asset.id === assetId);
  
  if (!asset) {
    throw new Error(`Asset with ID ${assetId} not found`);
  }
  
  // Get depreciation data
  const depreciationData = mockDepreciationData.assetDepreciation.find(item => item.assetId === assetId);
  
  // Get maintenance costs
  const maintenanceCosts = mockAssetCosts.filter(
    cost => cost.assetId === assetId && cost.type === 'maintenance'
  );
  
  // Calculate optimal replacement time based on TCO
  const purchasePrice = asset.purchasePrice || 0;
  const depreciationRate = asset.depreciationRate || 10;
  const maintenanceCostRate = maintenanceCosts.length > 0 
    ? maintenanceCosts.reduce((sum, cost) => sum + cost.amount, 0) / purchasePrice * 100
    : 5; // Default to 5% if no data
  
  // Simple algorithm: when annual maintenance cost exceeds X% of current value
  const replacementThreshold = params.replacementThreshold || 30; // Default 30%
  
  // Calculate years until replacement
  let yearsUntilReplacement = 0;
  let currentValue = asset.currentValue || purchasePrice;
  let annualMaintenanceCost = purchasePrice * (maintenanceCostRate / 100);
  
  while (annualMaintenanceCost < currentValue * (replacementThreshold / 100) && yearsUntilReplacement < 15) {
    yearsUntilReplacement++;
    currentValue = currentValue * (1 - depreciationRate / 100);
    annualMaintenanceCost = annualMaintenanceCost * 1.1; // Assume 10% increase in maintenance costs per year
  }
  
  // Calculate replacement date
  const replacementDate = new Date();
  replacementDate.setFullYear(replacementDate.getFullYear() + yearsUntilReplacement);
  
  // Calculate estimated replacement cost
  const inflationRate = params.inflationRate || 3; // Default 3%
  const replacementCost = purchasePrice * Math.pow(1 + inflationRate / 100, yearsUntilReplacement);
  
  return {
    assetId,
    assetName: asset.name,
    purchaseDate: asset.purchaseDate,
    purchasePrice,
    currentValue: asset.currentValue || 0,
    optimalReplacementDate: replacementDate.toISOString().split('T')[0],
    yearsUntilReplacement,
    estimatedReplacementCost: Math.round(replacementCost),
    reasonForReplacement: "Increasing maintenance costs exceed economic threshold",
    costAnalysis: {
      currentAnnualMaintenanceCost: Math.round(purchasePrice * (maintenanceCostRate / 100)),
      projectedAnnualMaintenanceCost: Math.round(annualMaintenanceCost),
      currentValueAtReplacement: Math.round(currentValue),
      costRatio: Math.round(annualMaintenanceCost / currentValue * 100)
    },
    alternativeOptions: [
      {
        option: "Extend life by 2 years with major overhaul",
        cost: Math.round(purchasePrice * 0.3),
        pros: "Delays capital expenditure",
        cons: "Higher operational costs, potential reliability issues"
      },
      {
        option: "Lease new equipment",
        cost: Math.round(replacementCost * 0.25) + " per year",
        pros: "Lower upfront cost, includes maintenance",
        cons: "Higher total cost over time"
      }
    ]
  };
};

export const trackAssetLocation = async (assetId) => {
  await delay(300);
  const asset = mockAssets.find(asset => asset.id === assetId);
  
  if (!asset) {
    throw new Error(`Asset with ID ${assetId} not found`);
  }
  
  // For assets with GPS tracking (simulated)
  if (['equipment', 'vehicle'].includes(asset.type)) {
    return {
      assetId,
      assetName: asset.name,
      location: asset.location,
      coordinates: {
        latitude: 52.2297 + (Math.random() * 0.02 - 0.01),
        longitude: 21.0122 + (Math.random() * 0.02 - 0.01)
      },
      lastUpdated: new Date().toISOString(),
      inMotion: Math.random() > 0.7,
      speed: Math.random() > 0.7 ? Math.round(Math.random() * 60) : 0,
      address: asset.location === "Warehouse A" 
        ? "ul. Magazynowa 10, Warszawa" 
        : asset.location === "Parking B"
          ? "ul. Transportowa 5, Warszawa"
          : "ul. Przemysłowa 1, Warszawa"
    };
  } else {
    // For non-GPS assets
    return {
      assetId,
      assetName: asset.name,
      location: asset.location,
      lastUpdated: new Date().toISOString(),
      inMotion: false,
      address: asset.location === "Warehouse A" 
        ? "ul. Magazynowa 10, Warszawa" 
        : asset.location === "Service Center"
          ? "ul. Serwisowa 8, Warszawa"
          : "ul. Przemysłowa 1, Warszawa"
    };
  }
};

export const generateAssetReport = async (params = {}) => {
  await delay(1000);
  
  // Simulate report generation
  const reportId = `report-${uuidv4().substring(0, 8)}`;
  const reportDate = new Date().toISOString();
  const reportFormat = params.format || 'PDF';
  
  return {
    reportId,
    reportType: params.reportType || 'asset_inventory',
    format: reportFormat,
    generatedAt: reportDate,
    downloadUrl: `/reports/${reportId}.${reportFormat.toLowerCase()}`,
    filters: params.filters || {},
    summary: {
      totalAssets: mockAssets.length,
      totalValue: mockAssets.reduce((sum, asset) => sum + (asset.currentValue || 0), 0),
      assetsByType: {
        vehicle: mockAssets.filter(asset => asset.type === 'vehicle').length,
        equipment: mockAssets.filter(asset => asset.type === 'equipment').length,
        tool: mockAssets.filter(asset => asset.type === 'tool').length,
        part: mockAssets.filter(asset => asset.type === 'part').length,
        accessory: mockAssets.filter(asset => asset.type === 'accessory').length
      }
    }
  };
};

export const exportAssetData = async (params = {}) => {
  await delay(1000);
  
  // Simulate export generation
  const exportId = `export-${uuidv4().substring(0, 8)}`;
  const exportDate = new Date().toISOString();
  const exportFormat = params.format || 'CSV';
  
  return {
    exportId,
    format: exportFormat,
    generatedAt: exportDate,
    downloadUrl: `/exports/${exportId}.${exportFormat.toLowerCase()}`,
    assetCount: params.assetIds ? params.assetIds.length : mockAssets.length,
    filters: params.filters || {}
  };
};

export const importAssetData = async (file, params = {}) => {
  await delay(1500);
  
  // Simulate import process
  const importId = `import-${uuidv4().substring(0, 8)}`;
  const importDate = new Date().toISOString();
  
  // Simulate adding some assets
  const newAssetsCount = Math.floor(Math.random() * 5) + 1;
  
  for (let i = 0; i < newAssetsCount; i++) {
    const newAsset = {
      id: `asset-${uuidv4().substring(0, 8)}`,
      name: `Imported Asset ${i + 1}`,
      type: ['equipment', 'tool', 'part'][Math.floor(Math.random() * 3)],
      category: ['forklift', 'trailer', 'scanner', 'toolset'][Math.floor(Math.random() * 4)],
      serialNumber: `IMP-${Math.floor(Math.random() * 100000)}`,
      manufacturer: ['Toyota', 'Schmitz', 'Zebra', 'Snap-on'][Math.floor(Math.random() * 4)],
      model: `Model ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${Math.floor(Math.random() * 100)}`,
      purchaseDate: new Date().toISOString().split('T')[0],
      purchasePrice: Math.floor(Math.random() * 50000) + 1000,
      status: 'active',
      createdAt: importDate,
      updatedAt: importDate
    };
    
    mockAssets.push(newAsset);
  }
  
  return {
    importId,
    processedAt: importDate,
    status: 'completed',
    summary: {
      totalRecords: newAssetsCount + Math.floor(Math.random() * 3),
      successfulImports: newAssetsCount,
      failedImports: Math.floor(Math.random() * 3),
      updatedRecords: params.updateExisting ? Math.floor(Math.random() * 3) : 0
    },
    errors: []
  };
};

export default {
  getAssetDashboard,
  getAssets,
  getAssetDetails,
  createAsset,
  updateAsset,
  deleteAsset,
  assignAsset,
  unassignAsset,
  getAssetMaintenanceSchedule,
  getAssetMaintenanceHistory,
  scheduleAssetMaintenance,
  recordAssetMaintenance,
  getAssetCategories,
  getAssetLocations,
  getAssetUtilization,
  getAssetDepreciation,
  getAssetCosts,
  calculateAssetTCO,
  forecastAssetReplacement,
  trackAssetLocation,
  generateAssetReport,
  exportAssetData,
  importAssetData
};
