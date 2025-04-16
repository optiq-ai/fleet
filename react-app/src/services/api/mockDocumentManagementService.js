/**
 * Mock Document Management Service
 * 
 * Mock service for document management functionality during development.
 */

import { generateId } from '../../utils/index';

// Mock data for documents
const mockDocuments = [
  {
    id: 'doc-001',
    name: 'Dowód rejestracyjny',
    type: 'vehicle',
    category: 'registration',
    vehicleId: 'veh-001',
    vehiclePlate: 'WA 12345',
    issueDate: '2024-01-15',
    expiryDate: '2025-01-14',
    status: 'active',
    fileUrl: '/documents/vehicle/registration/doc-001.pdf',
    fileType: 'pdf',
    fileSize: 1024000,
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
    createdBy: 'user-001',
    tags: ['rejestracja', 'pojazd', 'ważny']
  },
  {
    id: 'doc-002',
    name: 'Polisa ubezpieczeniowa OC',
    type: 'vehicle',
    category: 'insurance',
    vehicleId: 'veh-001',
    vehiclePlate: 'WA 12345',
    issueDate: '2024-02-01',
    expiryDate: '2025-01-31',
    status: 'active',
    fileUrl: '/documents/vehicle/insurance/doc-002.pdf',
    fileType: 'pdf',
    fileSize: 2048000,
    createdAt: '2024-02-01T14:15:00Z',
    updatedAt: '2024-02-01T14:15:00Z',
    createdBy: 'user-001',
    tags: ['ubezpieczenie', 'OC', 'pojazd']
  },
  {
    id: 'doc-003',
    name: 'Prawo jazdy',
    type: 'driver',
    category: 'license',
    driverId: 'drv-001',
    driverName: 'Jan Kowalski',
    issueDate: '2020-05-10',
    expiryDate: '2030-05-09',
    status: 'active',
    fileUrl: '/documents/driver/license/doc-003.pdf',
    fileType: 'pdf',
    fileSize: 512000,
    createdAt: '2023-01-10T09:45:00Z',
    updatedAt: '2023-01-10T09:45:00Z',
    createdBy: 'user-002',
    tags: ['prawo jazdy', 'kierowca', 'kategoria C+E']
  },
  {
    id: 'doc-004',
    name: 'Badanie lekarskie',
    type: 'driver',
    category: 'medical',
    driverId: 'drv-001',
    driverName: 'Jan Kowalski',
    issueDate: '2023-06-15',
    expiryDate: '2024-06-14',
    status: 'active',
    fileUrl: '/documents/driver/medical/doc-004.pdf',
    fileType: 'pdf',
    fileSize: 768000,
    createdAt: '2023-06-15T11:20:00Z',
    updatedAt: '2023-06-15T11:20:00Z',
    createdBy: 'user-002',
    tags: ['badanie', 'kierowca', 'zdrowie']
  },
  {
    id: 'doc-005',
    name: 'Umowa z operatorem drogowym',
    type: 'operational',
    category: 'contracts',
    issueDate: '2023-01-01',
    expiryDate: '2025-12-31',
    status: 'active',
    fileUrl: '/documents/operational/contracts/doc-005.pdf',
    fileType: 'pdf',
    fileSize: 3072000,
    createdAt: '2023-01-01T08:00:00Z',
    updatedAt: '2023-01-01T08:00:00Z',
    createdBy: 'user-003',
    tags: ['umowa', 'operator', 'opłaty drogowe']
  },
  {
    id: 'doc-006',
    name: 'Faktura za opłaty drogowe - Styczeń 2024',
    type: 'operational',
    category: 'invoices',
    issueDate: '2024-02-01',
    status: 'active',
    fileUrl: '/documents/operational/invoices/doc-006.pdf',
    fileType: 'pdf',
    fileSize: 1536000,
    createdAt: '2024-02-01T09:30:00Z',
    updatedAt: '2024-02-01T09:30:00Z',
    createdBy: 'user-003',
    tags: ['faktura', 'opłaty drogowe', 'styczeń']
  },
  {
    id: 'doc-007',
    name: 'Licencja transportowa',
    type: 'compliance',
    category: 'licenses',
    issueDate: '2022-03-15',
    expiryDate: '2027-03-14',
    status: 'active',
    fileUrl: '/documents/compliance/licenses/doc-007.pdf',
    fileType: 'pdf',
    fileSize: 2048000,
    createdAt: '2022-03-15T10:00:00Z',
    updatedAt: '2022-03-15T10:00:00Z',
    createdBy: 'user-004',
    tags: ['licencja', 'transport', 'zgodność']
  },
  {
    id: 'doc-008',
    name: 'Raport z audytu bezpieczeństwa',
    type: 'compliance',
    category: 'audits',
    issueDate: '2023-11-10',
    status: 'active',
    fileUrl: '/documents/compliance/audits/doc-008.pdf',
    fileType: 'pdf',
    fileSize: 4096000,
    createdAt: '2023-11-10T14:00:00Z',
    updatedAt: '2023-11-10T14:00:00Z',
    createdBy: 'user-004',
    tags: ['audyt', 'bezpieczeństwo', 'zgodność']
  },
  {
    id: 'doc-009',
    name: 'Polisa ubezpieczeniowa AC',
    type: 'vehicle',
    category: 'insurance',
    vehicleId: 'veh-002',
    vehiclePlate: 'WA 54321',
    issueDate: '2023-12-01',
    expiryDate: '2024-11-30',
    status: 'active',
    fileUrl: '/documents/vehicle/insurance/doc-009.pdf',
    fileType: 'pdf',
    fileSize: 2048000,
    createdAt: '2023-12-01T13:45:00Z',
    updatedAt: '2023-12-01T13:45:00Z',
    createdBy: 'user-001',
    tags: ['ubezpieczenie', 'AC', 'pojazd']
  },
  {
    id: 'doc-010',
    name: 'Certyfikat kwalifikacji zawodowej',
    type: 'driver',
    category: 'certificates',
    driverId: 'drv-002',
    driverName: 'Anna Nowak',
    issueDate: '2021-08-20',
    expiryDate: '2026-08-19',
    status: 'active',
    fileUrl: '/documents/driver/certificates/doc-010.pdf',
    fileType: 'pdf',
    fileSize: 1024000,
    createdAt: '2021-08-20T10:15:00Z',
    updatedAt: '2021-08-20T10:15:00Z',
    createdBy: 'user-002',
    tags: ['certyfikat', 'kwalifikacja', 'kierowca']
  },
  {
    id: 'doc-011',
    name: 'Umowa z operatorem promowym',
    type: 'operational',
    category: 'contracts',
    issueDate: '2023-03-01',
    expiryDate: '2025-02-28',
    status: 'active',
    fileUrl: '/documents/operational/contracts/doc-011.pdf',
    fileType: 'pdf',
    fileSize: 3072000,
    createdAt: '2023-03-01T09:00:00Z',
    updatedAt: '2023-03-01T09:00:00Z',
    createdBy: 'user-003',
    tags: ['umowa', 'operator', 'przeprawy promowe']
  },
  {
    id: 'doc-012',
    name: 'Certyfikat zgodności z normą ISO 9001',
    type: 'compliance',
    category: 'compliance_certificates',
    issueDate: '2023-05-05',
    expiryDate: '2026-05-04',
    status: 'active',
    fileUrl: '/documents/compliance/certificates/doc-012.pdf',
    fileType: 'pdf',
    fileSize: 2048000,
    createdAt: '2023-05-05T11:30:00Z',
    updatedAt: '2023-05-05T11:30:00Z',
    createdBy: 'user-004',
    tags: ['certyfikat', 'ISO', 'zgodność']
  }
];

// Mock data for document templates
const mockDocumentTemplates = [
  {
    id: 'templ-001',
    name: 'Szablon dowodu rejestracyjnego',
    type: 'vehicle',
    category: 'registration',
    description: 'Szablon do generowania dowodów rejestracyjnych',
    fileUrl: '/templates/vehicle/registration/templ-001.docx',
    fileType: 'docx',
    fields: [
      { name: 'vehiclePlate', label: 'Numer rejestracyjny', type: 'text', required: true },
      { name: 'issueDate', label: 'Data wydania', type: 'date', required: true },
      { name: 'expiryDate', label: 'Data ważności', type: 'date', required: true }
    ],
    createdAt: '2023-12-01T08:30:00Z',
    updatedAt: '2023-12-01T08:30:00Z',
    createdBy: 'user-001'
  },
  {
    id: 'templ-002',
    name: 'Szablon polisy ubezpieczeniowej',
    type: 'vehicle',
    category: 'insurance',
    description: 'Szablon do generowania polis ubezpieczeniowych',
    fileUrl: '/templates/vehicle/insurance/templ-002.docx',
    fileType: 'docx',
    fields: [
      { name: 'vehiclePlate', label: 'Numer rejestracyjny', type: 'text', required: true },
      { name: 'insuranceType', label: 'Typ ubezpieczenia', type: 'select', options: ['OC', 'AC', 'NNW'], required: true },
      { name: 'issueDate', label: 'Data wydania', type: 'date', required: true },
      { name: 'expiryDate', label: 'Data ważności', type: 'date', required: true },
      { name: 'premium', label: 'Składka', type: 'number', required: true }
    ],
    createdAt: '2023-12-05T09:15:00Z',
    updatedAt: '2023-12-05T09:15:00Z',
    createdBy: 'user-001'
  },
  {
    id: 'templ-003',
    name: 'Szablon umowy z kierowcą',
    type: 'driver',
    category: 'contracts',
    description: 'Szablon do generowania umów z kierowcami',
    fileUrl: '/templates/driver/contracts/templ-003.docx',
    fileType: 'docx',
    fields: [
      { name: 'driverName', label: 'Imię i nazwisko kierowcy', type: 'text', required: true },
      { name: 'driverAddress', label: 'Adres kierowcy', type: 'text', required: true },
      { name: 'contractType', label: 'Typ umowy', type: 'select', options: ['Umowa o pracę', 'Umowa zlecenie', 'B2B'], required: true },
      { name: 'startDate', label: 'Data rozpoczęcia', type: 'date', required: true },
      { name: 'endDate', label: 'Data zakończenia', type: 'date', required: false },
      { name: 'salary', label: 'Wynagrodzenie', type: 'number', required: true }
    ],
    createdAt: '2023-12-10T10:45:00Z',
    updatedAt: '2023-12-10T10:45:00Z',
    createdBy: 'user-002'
  }
];

// Mock data for document categories
const mockDocumentCategories = [
  {
    id: 'cat-001',
    name: 'Rejestracja',
    type: 'vehicle',
    code: 'registration',
    description: 'Dokumenty rejestracyjne pojazdów',
    requiredForCompliance: true,
    defaultExpiryPeriod: 365, // w dniach
    reminderDays: [30, 14, 7, 1] // dni przed wygaśnięciem do wysłania przypomnienia
  },
  {
    id: 'cat-002',
    name: 'Ubezpieczenie',
    type: 'vehicle',
    code: 'insurance',
    description: 'Dokumenty ubezpieczeniowe pojazdów',
    requiredForCompliance: true,
    defaultExpiryPeriod: 365,
    reminderDays: [30, 14, 7, 1]
  },
  {
    id: 'cat-003',
    name: 'Przegląd techniczny',
    type: 'vehicle',
    code: 'inspection',
    description: 'Dokumenty przeglądów technicznych pojazdów',
    requiredForCompliance: true,
    defaultExpiryPeriod: 365,
    reminderDays: [30, 14, 7, 1]
  },
  {
    id: 'cat-004',
    name: 'Prawo jazdy',
    type: 'driver',
    code: 'license',
    description: 'Dokumenty prawa jazdy kierowców',
    requiredForCompliance: true,
    defaultExpiryPeriod: 3650,
    reminderDays: [90, 60, 30, 14]
  },
  {
    id: 'cat-005',
    name: 'Certyfikaty',
    type: 'driver',
    code: 'certificates',
    description: 'Certyfikaty i uprawnienia kierowców',
    requiredForCompliance: true,
    defaultExpiryPeriod: 1825,
    reminderDays: [90, 60, 30, 14]
  },
  {
    id: 'cat-006',
    name: 'Badania lekarskie',
    type: 'driver',
    code: 'medical',
    description: 'Dokumenty badań lekarskich kierowców',
    requiredForCompliance: true,
    defaultExpiryPeriod: 730,
    reminderDays: [60, 30, 14, 7]
  },
  {
    id: 'cat-007',
    name: 'Umowy',
    type: 'operational',
    code: 'contracts',
    description: 'Umowy operacyjne',
    requiredForCompliance: false,
    defaultExpiryPeriod: 1095,
    reminderDays: [90, 60, 30]
  },
  {
    id: 'cat-008',
    name: 'Faktury',
    type: 'operational',
    code: 'invoices',
    description: 'Faktury i dokumenty finansowe',
    requiredForCompliance: false,
    defaultExpiryPeriod: null,
    reminderDays: []
  },
  {
    id: 'cat-009',
    name: 'Raporty',
    type: 'operational',
    code: 'reports',
    description: 'Raporty operacyjne',
    requiredForCompliance: false,
    defaultExpiryPeriod: null,
    reminderDays: []
  },
  {
    id: 'cat-010',
    name: 'Licencje',
    type: 'compliance',
    code: 'licenses',
    description: 'Licencje i zezwolenia',
    requiredForCompliance: true,
    defaultExpiryPeriod: 1825,
    reminderDays: [180, 90, 60, 30]
  },
  {
    id: 'cat-011',
    name: 'Certyfikaty zgodności',
    type: 'compliance',
    code: 'compliance_certificates',
    description: 'Certyfikaty zgodności z przepisami',
    requiredForCompliance: true,
    defaultExpiryPeriod: 1095,
    reminderDays: [90, 60, 30, 14]
  },
  {
    id: 'cat-012',
    name: 'Audyty',
    type: 'compliance',
    code: 'audits',
    description: 'Dokumenty audytów',
    requiredForCompliance: false,
    defaultExpiryPeriod: null,
    reminderDays: []
  }
];

// Mock data for document alerts
const mockDocumentAlerts = [
  {
    id: 'alert-001',
    documentId: 'doc-002',
    documentName: 'Polisa ubezpieczeniowa OC',
    type: 'expiry',
    message: 'Polisa ubezpieczeniowa OC wygasa za 30 dni',
    severity: 'warning',
    status: 'active',
    dueDate: '2025-01-31',
    createdAt: '2025-01-01T00:00:00Z',
    acknowledgedAt: null,
    acknowledgedBy: null,
    resolvedAt: null,
    resolvedBy: null
  },
  {
    id: 'alert-002',
    documentId: 'doc-004',
    documentName: 'Badanie lekarskie',
    type: 'expiry',
    message: 'Badanie lekarskie wygasa za 14 dni',
    severity: 'warning',
    status: 'active',
    dueDate: '2024-06-14',
    createdAt: '2024-05-31T00:00:00Z',
    acknowledgedAt: null,
    acknowledgedBy: null,
    resolvedAt: null,
    resolvedBy: null
  },
  {
    id: 'alert-003',
    documentId: null,
    documentName: null,
    type: 'missing',
    message: 'Brak dokumentu przeglądu technicznego dla pojazdu WA 54321',
    severity: 'critical',
    status: 'active',
    dueDate: null,
    createdAt: '2024-04-01T00:00:00Z',
    acknowledgedAt: null,
    acknowledgedBy: null,
    resolvedAt: null,
    resolvedBy: null
  },
  {
    id: 'alert-004',
    documentId: 'doc-009',
    documentName: 'Polisa ubezpieczeniowa AC',
    type: 'expiry',
    message: 'Polisa ubezpieczeniowa AC wygasa za 7 dni',
    severity: 'critical',
    status: 'acknowledged',
    dueDate: '2024-11-30',
    createdAt: '2024-11-23T00:00:00Z',
    acknowledgedAt: '2024-11-23T10:15:00Z',
    acknowledgedBy: 'user-001',
    resolvedAt: null,
    resolvedBy: null
  },
  {
    id: 'alert-005',
    documentId: 'doc-007',
    documentName: 'Licencja transportowa',
    type: 'update_required',
    message: 'Wymagana aktualizacja licencji transportowej ze względu na zmianę przepisów',
    severity: 'info',
    status: 'active',
    dueDate: '2024-12-31',
    createdAt: '2024-06-01T00:00:00Z',
    acknowledgedAt: null,
    acknowledgedBy: null,
    resolvedAt: null,
    resolvedBy: null
  }
];

// Mock implementation of API methods
export const getDocumentsDashboard = async (params = {}) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Return mock dashboard data
  return {
    documentCounts: {
      total: mockDocuments.length,
      byType: {
        vehicle: mockDocuments.filter(doc => doc.type === 'vehicle').length,
        driver: mockDocuments.filter(doc => doc.type === 'driver').length,
        operational: mockDocuments.filter(doc => doc.type === 'operational').length,
        compliance: mockDocuments.filter(doc => doc.type === 'compliance').length
      },
      byStatus: {
        active: mockDocuments.filter(doc => doc.status === 'active').length,
        expired: mockDocuments.filter(doc => doc.status === 'expired').length,
        pending: mockDocuments.filter(doc => doc.status === 'pending').length,
        archived: mockDocuments.filter(doc => doc.status === 'archived').length
      }
    },
    expiringDocuments: {
      next7Days: 1,
      next30Days: 3,
      next90Days: 5
    },
    recentActivity: {
      added: 2,
      updated: 3,
      viewed: 8
    },
    complianceRate: {
      overall: 95,
      byType: {
        vehicle: 98,
        driver: 92,
        operational: 96,
        compliance: 94
      }
    },
    alerts: mockDocumentAlerts.filter(alert => alert.status === 'active').slice(0, 5)
  };
};

export const getDocuments = async (params = {}) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Filter documents based on params
  let filteredDocuments = [...mockDocuments];

  if (params.type) {
    filteredDocuments = filteredDocuments.filter(doc => doc.type === params.type);
  }

  if (params.category) {
    filteredDocuments = filteredDocuments.filter(doc => doc.category === params.category);
  }

  if (params.status) {
    filteredDocuments = filteredDocuments.filter(doc => doc.status === params.status);
  }

  if (params.search) {
    const searchLower = params.search.toLowerCase();
    filteredDocuments = filteredDocuments.filter(doc => 
      doc.name.toLowerCase().includes(searchLower) || 
      (doc.vehiclePlate && doc.vehiclePlate.toLowerCase().includes(searchLower)) ||
      (doc.driverName && doc.driverName.toLowerCase().includes(searchLower)) ||
      doc.tags.some(tag => tag.toLowerCase().includes(searchLower))
    );
  }

  // Pagination
  const page = params.page || 1;
  const limit = params.limit || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedDocuments = filteredDocuments.slice(startIndex, endIndex);

  return {
    data: paginatedDocuments,
    pagination: {
      total: filteredDocuments.length,
      page,
      limit,
      pages: Math.ceil(filteredDocuments.length / limit)
    }
  };
};

export const getDocumentDetails = async (documentId) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));

  const document = mockDocuments.find(doc => doc.id === documentId);
  
  if (!document) {
    throw new Error(`Document with ID ${documentId} not found`);
  }
  
  return document;
};

export const uploadDocument = async (documentData, file) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  const newDocument = {
    id: `doc-${generateId(6)}`,
    ...documentData,
    fileUrl: `/documents/${documentData.type}/${documentData.category}/${documentData.name.replace(/\s+/g, '_').toLowerCase()}.${file.name.split('.').pop()}`,
    fileType: file.name.split('.').pop(),
    fileSize: Math.floor(Math.random() * 5000000) + 500000,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: 'user-001',
    tags: documentData.tags || []
  };
  
  mockDocuments.push(newDocument);
  
  return newDocument;
};

export const updateDocument = async (documentId, documentData, file = null) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));

  const documentIndex = mockDocuments.findIndex(doc => doc.id === documentId);
  
  if (documentIndex === -1) {
    throw new Error(`Document with ID ${documentId} not found`);
  }
  
  const updatedDocument = {
    ...mockDocuments[documentIndex],
    ...documentData,
    updatedAt: new Date().toISOString()
  };
  
  if (file) {
    updatedDocument.fileUrl = `/documents/${updatedDocument.type}/${updatedDocument.category}/${updatedDocument.name.replace(/\s+/g, '_').toLowerCase()}.${file.name.split('.').pop()}`;
    updatedDocument.fileType = file.name.split('.').pop();
    updatedDocument.fileSize = Math.floor(Math.random() * 5000000) + 500000;
  }
  
  mockDocuments[documentIndex] = updatedDocument;
  
  return updatedDocument;
};

export const deleteDocument = async (documentId) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const documentIndex = mockDocuments.findIndex(doc => doc.id === documentId);
  
  if (documentIndex === -1) {
    throw new Error(`Document with ID ${documentId} not found`);
  }
  
  mockDocuments.splice(documentIndex, 1);
  
  return { success: true, message: 'Document deleted successfully' };
};

export const searchDocuments = async (params = {}) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 700));

  let filteredDocuments = [...mockDocuments];
  
  if (params.query) {
    const queryLower = params.query.toLowerCase();
    filteredDocuments = filteredDocuments.filter(doc => 
      doc.name.toLowerCase().includes(queryLower) || 
      (doc.vehiclePlate && doc.vehiclePlate.toLowerCase().includes(queryLower)) ||
      (doc.driverName && doc.driverName.toLowerCase().includes(queryLower)) ||
      doc.tags.some(tag => tag.toLowerCase().includes(queryLower))
    );
  }
  
  if (params.types && params.types.length > 0) {
    filteredDocuments = filteredDocuments.filter(doc => params.types.includes(doc.type));
  }
  
  if (params.categories && params.categories.length > 0) {
    filteredDocuments = filteredDocuments.filter(doc => params.categories.includes(doc.category));
  }
  
  if (params.statuses && params.statuses.length > 0) {
    filteredDocuments = filteredDocuments.filter(doc => params.statuses.includes(doc.status));
  }
  
  if (params.dateFrom) {
    const dateFrom = new Date(params.dateFrom);
    filteredDocuments = filteredDocuments.filter(doc => new Date(doc.createdAt) >= dateFrom);
  }
  
  if (params.dateTo) {
    const dateTo = new Date(params.dateTo);
    filteredDocuments = filteredDocuments.filter(doc => new Date(doc.createdAt) <= dateTo);
  }
  
  // Pagination
  const page = params.page || 1;
  const limit = params.limit || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedDocuments = filteredDocuments.slice(startIndex, endIndex);
  
  return {
    data: paginatedDocuments,
    pagination: {
      total: filteredDocuments.length,
      page,
      limit,
      pages: Math.ceil(filteredDocuments.length / limit)
    }
  };
};

export const generateDocumentReport = async (params = {}) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  return {
    success: true,
    reportUrl: `/reports/documents/${params.reportType}_${new Date().toISOString().split('T')[0]}.${params.format.toLowerCase()}`,
    reportName: `Raport dokumentów - ${params.reportType}`,
    generatedAt: new Date().toISOString(),
    format: params.format,
    filters: params.filters
  };
};

export const exportDocuments = async (params = {}) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1200));

  return {
    success: true,
    exportUrl: `/exports/documents/export_${new Date().toISOString().split('T')[0]}.${params.format.toLowerCase()}`,
    exportName: `Eksport dokumentów`,
    generatedAt: new Date().toISOString(),
    format: params.format,
    documentCount: params.documentIds.length
  };
};

export const setDocumentReminder = async (documentId, reminderData) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 600));

  const document = mockDocuments.find(doc => doc.id === documentId);
  
  if (!document) {
    throw new Error(`Document with ID ${documentId} not found`);
  }
  
  const reminder = {
    id: `reminder-${generateId(6)}`,
    documentId,
    documentName: document.name,
    date: reminderData.date,
    type: reminderData.type,
    recipients: reminderData.recipients,
    createdAt: new Date().toISOString(),
    createdBy: 'user-001',
    status: 'active'
  };
  
  return reminder;
};

export const shareDocument = async (documentId, shareData) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 600));

  const document = mockDocuments.find(doc => doc.id === documentId);
  
  if (!document) {
    throw new Error(`Document with ID ${documentId} not found`);
  }
  
  const share = {
    id: `share-${generateId(6)}`,
    documentId,
    documentName: document.name,
    userIds: shareData.userIds,
    permission: shareData.permission,
    expiryDate: shareData.expiryDate,
    createdAt: new Date().toISOString(),
    createdBy: 'user-001',
    status: 'active',
    shareUrl: `/documents/share/${documentId}/${generateId(12)}`
  };
  
  return share;
};

export const getDocumentTemplates = async (params = {}) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 400));

  let filteredTemplates = [...mockDocumentTemplates];
  
  if (params.type) {
    filteredTemplates = filteredTemplates.filter(template => template.type === params.type);
  }
  
  if (params.category) {
    filteredTemplates = filteredTemplates.filter(template => template.category === params.category);
  }
  
  if (params.search) {
    const searchLower = params.search.toLowerCase();
    filteredTemplates = filteredTemplates.filter(template => 
      template.name.toLowerCase().includes(searchLower) || 
      template.description.toLowerCase().includes(searchLower)
    );
  }
  
  return filteredTemplates;
};

export const createDocumentTemplate = async (templateData, file) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  const newTemplate = {
    id: `templ-${generateId(6)}`,
    ...templateData,
    fileUrl: `/templates/${templateData.type}/${templateData.category}/${templateData.name.replace(/\s+/g, '_').toLowerCase()}.${file.name.split('.').pop()}`,
    fileType: file.name.split('.').pop(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: 'user-001'
  };
  
  mockDocumentTemplates.push(newTemplate);
  
  return newTemplate;
};

export const generateDocumentFromTemplate = async (templateId, data) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1200));

  const template = mockDocumentTemplates.find(templ => templ.id === templateId);
  
  if (!template) {
    throw new Error(`Template with ID ${templateId} not found`);
  }
  
  const generatedDocument = {
    id: `doc-${generateId(6)}`,
    name: `${template.name.replace('Szablon ', '')} - ${new Date().toISOString().split('T')[0]}`,
    type: template.type,
    category: template.category,
    ...data,
    fileUrl: `/documents/${template.type}/${template.category}/generated_${new Date().toISOString().split('T')[0]}_${generateId(6)}.pdf`,
    fileType: 'pdf',
    fileSize: Math.floor(Math.random() * 2000000) + 500000,
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: 'user-001',
    tags: [`wygenerowany`, template.type, template.category]
  };
  
  mockDocuments.push(generatedDocument);
  
  return generatedDocument;
};

export const getDocumentChangeHistory = async (documentId) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));

  const document = mockDocuments.find(doc => doc.id === documentId);
  
  if (!document) {
    throw new Error(`Document with ID ${documentId} not found`);
  }
  
  // Generate mock history
  const history = [
    {
      id: `change-${generateId(6)}`,
      documentId,
      action: 'create',
      field: null,
      oldValue: null,
      newValue: null,
      timestamp: document.createdAt,
      userId: document.createdBy,
      userName: 'Admin',
      ipAddress: '192.168.1.1'
    }
  ];
  
  // Add update history if document has been updated
  if (document.createdAt !== document.updatedAt) {
    history.push({
      id: `change-${generateId(6)}`,
      documentId,
      action: 'update',
      field: 'status',
      oldValue: 'pending',
      newValue: document.status,
      timestamp: document.updatedAt,
      userId: 'user-002',
      userName: 'Manager',
      ipAddress: '192.168.1.2'
    });
  }
  
  // Add view history
  history.push({
    id: `change-${generateId(6)}`,
    documentId,
    action: 'view',
    field: null,
    oldValue: null,
    newValue: null,
    timestamp: new Date(Date.now() - 86400000).toISOString(), // yesterday
    userId: 'user-003',
    userName: 'Operator',
    ipAddress: '192.168.1.3'
  });
  
  return history;
};

export const getDocumentCategories = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return mockDocumentCategories;
};

export const getDocumentAlerts = async (params = {}) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 400));

  let filteredAlerts = [...mockDocumentAlerts];
  
  if (params.type) {
    filteredAlerts = filteredAlerts.filter(alert => alert.type === params.type);
  }
  
  if (params.severity) {
    filteredAlerts = filteredAlerts.filter(alert => alert.severity === params.severity);
  }
  
  if (params.status) {
    filteredAlerts = filteredAlerts.filter(alert => alert.status === params.status);
  }
  
  return filteredAlerts;
};

export default {
  getDocumentsDashboard,
  getDocuments,
  getDocumentDetails,
  uploadDocument,
  updateDocument,
  deleteDocument,
  searchDocuments,
  generateDocumentReport,
  exportDocuments,
  setDocumentReminder,
  shareDocument,
  getDocumentTemplates,
  createDocumentTemplate,
  generateDocumentFromTemplate,
  getDocumentChangeHistory,
  getDocumentCategories,
  getDocumentAlerts
};
