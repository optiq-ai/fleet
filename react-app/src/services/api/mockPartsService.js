import { delay } from '../../utils';

/**
 * Mock service for Parts data
 * This service provides mock data for the VehicleParts component
 */
class MockPartsService {
  /**
   * Get parts inventory
   * @param {string} [category] - Category filter
   * @param {string} [supplier] - Supplier filter
   * @param {string} [status] - Status filter
   * @param {string} [search] - Search query
   * @param {number} [page=1] - Page number
   * @param {number} [limit=10] - Results per page
   * @returns {Promise<Object>} Parts inventory response
   */
  async getParts(
    category,
    supplier,
    status,
    search,
    page = 1,
    limit = 10
  ) {
    await delay(500);
    
    let parts = [
      {
        id: 'P-001',
        name: 'Klocki hamulcowe przednie',
        catalogNumber: 'BRK-1234-F',
        compatibleModels: ['Mercedes Actros', 'Mercedes Arocs', 'Mercedes Atego'],
        quantity: 24,
        minLevel: 10,
        price: 450.00,
        supplier: 'Bosch',
        status: 'available',
        category: 'brakes',
        location: 'A-12-3',
        lastOrderDate: '2025-03-15',
        description: 'Wysokiej jakości klocki hamulcowe do pojazdów ciężarowych Mercedes.'
      },
      {
        id: 'P-002',
        name: 'Filtr oleju',
        catalogNumber: 'OIL-5678-F',
        compatibleModels: ['Mercedes Actros', 'Mercedes Arocs', 'Volvo FH', 'Scania R'],
        quantity: 8,
        minLevel: 15,
        price: 120.00,
        supplier: 'Mann-Filter',
        status: 'low',
        category: 'engine',
        location: 'B-05-2',
        lastOrderDate: '2025-03-10',
        description: 'Filtr oleju do silników Diesla w pojazdach ciężarowych.'
      },
      {
        id: 'P-003',
        name: 'Alternator',
        catalogNumber: 'ELE-9012-A',
        compatibleModels: ['Mercedes Actros', 'Mercedes Arocs'],
        quantity: 5,
        minLevel: 3,
        price: 1800.00,
        supplier: 'Bosch',
        status: 'available',
        category: 'electrical',
        location: 'C-08-1',
        lastOrderDate: '2025-02-28',
        description: 'Alternator 24V do pojazdów ciężarowych Mercedes.'
      },
      {
        id: 'P-004',
        name: 'Amortyzator przedni',
        catalogNumber: 'SUS-3456-F',
        compatibleModels: ['Volvo FH', 'Volvo FM'],
        quantity: 2,
        minLevel: 4,
        price: 950.00,
        supplier: 'Sachs',
        status: 'low',
        category: 'suspension',
        location: 'D-03-4',
        lastOrderDate: '2025-03-05',
        description: 'Amortyzator przedni do pojazdów ciężarowych Volvo.'
      },
      {
        id: 'P-005',
        name: 'Zestaw sprzęgła',
        catalogNumber: 'TRN-7890-C',
        compatibleModels: ['Scania R', 'Scania S'],
        quantity: 0,
        minLevel: 2,
        price: 3200.00,
        supplier: 'Valeo',
        status: 'out_of_stock',
        category: 'transmission',
        location: 'E-01-2',
        lastOrderDate: '2025-02-20',
        description: 'Kompletny zestaw sprzęgła do pojazdów ciężarowych Scania.'
      },
      {
        id: 'P-006',
        name: 'Filtr powietrza',
        catalogNumber: 'AIR-2345-F',
        compatibleModels: ['Mercedes Actros', 'Mercedes Arocs', 'Mercedes Atego', 'Volvo FH', 'Volvo FM', 'Scania R', 'Scania S'],
        quantity: 18,
        minLevel: 10,
        price: 180.00,
        supplier: 'Mann-Filter',
        status: 'available',
        category: 'engine',
        location: 'B-06-3',
        lastOrderDate: '2025-03-12',
        description: 'Uniwersalny filtr powietrza do pojazdów ciężarowych.'
      },
      {
        id: 'P-007',
        name: 'Tarcze hamulcowe przednie',
        catalogNumber: 'BRK-6789-D',
        compatibleModels: ['Mercedes Actros', 'Mercedes Arocs'],
        quantity: 6,
        minLevel: 6,
        price: 850.00,
        supplier: 'Brembo',
        status: 'ordered',
        category: 'brakes',
        location: 'A-14-1',
        lastOrderDate: '2025-03-18',
        description: 'Tarcze hamulcowe przednie do pojazdów ciężarowych Mercedes.'
      },
      {
        id: 'P-008',
        name: 'Akumulator 225Ah',
        catalogNumber: 'ELE-1234-B',
        compatibleModels: ['Mercedes Actros', 'Mercedes Arocs', 'Volvo FH', 'Volvo FM', 'Scania R', 'Scania S'],
        quantity: 4,
        minLevel: 5,
        price: 1500.00,
        supplier: 'Varta',
        status: 'low',
        category: 'electrical',
        location: 'C-02-2',
        lastOrderDate: '2025-03-08',
        description: 'Akumulator 225Ah do pojazdów ciężarowych.'
      },
      {
        id: 'P-009',
        name: 'Pasek klinowy',
        catalogNumber: 'ENG-5678-B',
        compatibleModels: ['Volvo FH', 'Volvo FM'],
        quantity: 12,
        minLevel: 8,
        price: 120.00,
        supplier: 'Continental',
        status: 'available',
        category: 'engine',
        location: 'B-09-4',
        lastOrderDate: '2025-03-02',
        description: 'Pasek klinowy do pojazdów ciężarowych Volvo.'
      },
      {
        id: 'P-010',
        name: 'Zestaw naprawczy zawieszenia',
        catalogNumber: 'SUS-9012-R',
        compatibleModels: ['Scania R', 'Scania S'],
        quantity: 3,
        minLevel: 2,
        price: 1200.00,
        supplier: 'Sachs',
        status: 'available',
        category: 'suspension',
        location: 'D-07-1',
        lastOrderDate: '2025-02-25',
        description: 'Zestaw naprawczy zawieszenia do pojazdów ciężarowych Scania.'
      },
      {
        id: 'P-011',
        name: 'Pompa wody',
        catalogNumber: 'ENG-3456-W',
        compatibleModels: ['Mercedes Actros', 'Mercedes Arocs'],
        quantity: 0,
        minLevel: 3,
        price: 750.00,
        supplier: 'Bosch',
        status: 'ordered',
        category: 'engine',
        location: 'B-11-2',
        lastOrderDate: '2025-03-20',
        description: 'Pompa wody do silników pojazdów ciężarowych Mercedes.'
      },
      {
        id: 'P-012',
        name: 'Filtr paliwa',
        catalogNumber: 'FUE-7890-F',
        compatibleModels: ['Mercedes Actros', 'Mercedes Arocs', 'Mercedes Atego', 'Volvo FH', 'Volvo FM', 'Scania R', 'Scania S'],
        quantity: 15,
        minLevel: 10,
        price: 150.00,
        supplier: 'Mann-Filter',
        status: 'available',
        category: 'engine',
        location: 'B-08-3',
        lastOrderDate: '2025-03-14',
        description: 'Filtr paliwa do pojazdów ciężarowych.'
      }
    ];
    
    // Apply filters
    if (category && category !== 'all') {
      parts = parts.filter(part => part.category === category);
    }
    
    if (supplier && supplier !== 'all') {
      parts = parts.filter(part => part.supplier.toLowerCase() === supplier.toLowerCase());
    }
    
    if (status && status !== 'all') {
      parts = parts.filter(part => part.status === status);
    }
    
    if (search) {
      const searchLower = search.toLowerCase();
      parts = parts.filter(part => 
        part.name.toLowerCase().includes(searchLower) || 
        part.catalogNumber.toLowerCase().includes(searchLower)
      );
    }
    
    // Calculate pagination
    const total = parts.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedParts = parts.slice(startIndex, endIndex);
    
    return {
      total,
      page,
      limit,
      data: paginatedParts
    };
  }
  
  /**
   * Get part details
   * @param {string} id - Part ID
   * @returns {Promise<Object>} Part details
   */
  async getPartDetails(id) {
    await delay(300);
    
    const parts = {
      'P-001': {
        id: 'P-001',
        name: 'Klocki hamulcowe przednie',
        catalogNumber: 'BRK-1234-F',
        compatibleModels: ['Mercedes Actros', 'Mercedes Arocs', 'Mercedes Atego'],
        quantity: 24,
        minLevel: 10,
        price: 450.00,
        supplier: 'Bosch',
        status: 'available',
        category: 'brakes',
        location: 'A-12-3',
        lastOrderDate: '2025-03-15',
        description: 'Wysokiej jakości klocki hamulcowe do pojazdów ciężarowych Mercedes.',
        technicalSpecs: 'Grubość: 20mm, Szerokość: 150mm, Wysokość: 60mm, Materiał: ceramiczny',
        installationInstructions: true
      },
      'P-002': {
        id: 'P-002',
        name: 'Filtr oleju',
        catalogNumber: 'OIL-5678-F',
        compatibleModels: ['Mercedes Actros', 'Mercedes Arocs', 'Volvo FH', 'Scania R'],
        quantity: 8,
        minLevel: 15,
        price: 120.00,
        supplier: 'Mann-Filter',
        status: 'low',
        category: 'engine',
        location: 'B-05-2',
        lastOrderDate: '2025-03-10',
        description: 'Filtr oleju do silników Diesla w pojazdach ciężarowych.',
        technicalSpecs: 'Średnica: 90mm, Wysokość: 120mm, Gwint: M20x1.5, Przepływ: 15L/min',
        installationInstructions: true
      },
      'P-003': {
        id: 'P-003',
        name: 'Alternator',
        catalogNumber: 'ELE-9012-A',
        compatibleModels: ['Mercedes Actros', 'Mercedes Arocs'],
        quantity: 5,
        minLevel: 3,
        price: 1800.00,
        supplier: 'Bosch',
        status: 'available',
        category: 'electrical',
        location: 'C-08-1',
        lastOrderDate: '2025-02-28',
        description: 'Alternator 24V do pojazdów ciężarowych Mercedes.',
        technicalSpecs: 'Napięcie: 24V, Moc: 150A, Waga: 7.5kg, Typ montażu: bezpośredni',
        installationInstructions: true
      },
      'P-004': {
        id: 'P-004',
        name: 'Amortyzator przedni',
        catalogNumber: 'SUS-3456-F',
        compatibleModels: ['Volvo FH', 'Volvo FM'],
        quantity: 2,
        minLevel: 4,
        price: 950.00,
        supplier: 'Sachs',
        status: 'low',
        category: 'suspension',
        location: 'D-03-4',
        lastOrderDate: '2025-03-05',
        description: 'Amortyzator przedni do pojazdów ciężarowych Volvo.',
        technicalSpecs: 'Długość: 450mm, Skok: 200mm, Siła tłumienia: 15kN, Typ: gazowy',
        installationInstructions: true
      },
      'P-005': {
        id: 'P-005',
        name: 'Zestaw sprzęgła',
        catalogNumber: 'TRN-7890-C',
        compatibleModels: ['Scania R', 'Scania S'],
        quantity: 0,
        minLevel: 2,
        price: 3200.00,
        supplier: 'Valeo',
        status: 'out_of_stock',
        category: 'transmission',
        location: 'E-01-2',
        lastOrderDate: '2025-02-20',
        description: 'Kompletny zestaw sprzęgła do pojazdów ciężarowych Scania.',
        technicalSpecs: 'Średnica tarczy: 430mm, Moment obrotowy: 2500Nm, Typ: suche, jednopłytkowe',
        installationInstructions: true
      }
    };
    
    return parts[id] || null;
  }
  
  /**
   * Get orders
   * @param {string} [status] - Status filter
   * @param {string} [supplier] - Supplier filter
   * @param {string} [search] - Search query
   * @param {number} [page=1] - Page number
   * @param {number} [limit=10] - Results per page
   * @returns {Promise<Object>} Orders response
   */
  async getOrders(
    status,
    supplier,
    search,
    page = 1,
    limit = 10
  ) {
    await delay(500);
    
    let orders = [
      {
        id: 'ORD-001',
        date: '2025-03-20',
        supplier: 'Bosch',
        itemCount: 3,
        totalCost: 3500.00,
        status: 'pending',
        estimatedDelivery: '2025-03-27',
        notes: 'Zamówienie priorytetowe',
        items: [
          {
            partId: 'P-007',
            name: 'Tarcze hamulcowe przednie',
            quantity: 10,
            unitPrice: 850.00,
            totalPrice: 8500.00
          },
          {
            partId: 'P-011',
            name: 'Pompa wody',
            quantity: 5,
            unitPrice: 750.00,
            totalPrice: 3750.00
          },
          {
            partId: 'P-001',
            name: 'Klocki hamulcowe przednie',
            quantity: 20,
            unitPrice: 450.00,
            totalPrice: 9000.00
          }
        ]
      },
      {
        id: 'ORD-002',
        date: '2025-03-18',
        supplier: 'Mann-Filter',
        itemCount: 2,
        totalCost: 4800.00,
        status: 'processing',
        estimatedDelivery: '2025-03-25',
        notes: '',
        items: [
          {
            partId: 'P-002',
            name: 'Filtr oleju',
            quantity: 30,
            unitPrice: 120.00,
            totalPrice: 3600.00
          },
          {
            partId: 'P-012',
            name: 'Filtr paliwa',
            quantity: 20,
            unitPrice: 150.00,
            totalPrice: 3000.00
          }
        ]
      },
      {
        id: 'ORD-003',
        date: '2025-03-15',
        supplier: 'Valeo',
        itemCount: 1,
        totalCost: 6400.00,
        status: 'shipped',
        estimatedDelivery: '2025-03-22',
        notes: 'Wysłano kurierem DHL',
        items: [
          {
            partId: 'P-005',
            name: 'Zestaw sprzęgła',
            quantity: 2,
            unitPrice: 3200.00,
            totalPrice: 6400.00
          }
        ]
      },
      {
        id: 'ORD-004',
        date: '2025-03-10',
        supplier: 'Sachs',
        itemCount: 2,
        totalCost: 5700.00,
        status: 'delivered',
        estimatedDelivery: '2025-03-17',
        notes: 'Dostarczone w komplecie',
        items: [
          {
            partId: 'P-004',
            name: 'Amortyzator przedni',
            quantity: 5,
            unitPrice: 950.00,
            totalPrice: 4750.00
          },
          {
            partId: 'P-010',
            name: 'Zestaw naprawczy zawieszenia',
            quantity: 2,
            unitPrice: 1200.00,
            totalPrice: 2400.00
          }
        ]
      },
      {
        id: 'ORD-005',
        date: '2025-03-05',
        supplier: 'Varta',
        itemCount: 1,
        totalCost: 7500.00,
        status: 'delivered',
        estimatedDelivery: '2025-03-12',
        notes: '',
        items: [
          {
            partId: 'P-008',
            name: 'Akumulator 225Ah',
            quantity: 5,
            unitPrice: 1500.00,
            totalPrice: 7500.00
          }
        ]
      },
      {
        id: 'ORD-006',
        date: '2025-03-01',
        supplier: 'Continental',
        itemCount: 1,
        totalCost: 1200.00,
        status: 'cancelled',
        estimatedDelivery: '2025-03-08',
        notes: 'Anulowano z powodu błędnego zamówienia',
        items: [
          {
            partId: 'P-009',
            name: 'Pasek klinowy',
            quantity: 10,
            unitPrice: 120.00,
            totalPrice: 1200.00
          }
        ]
      }
    ];
    
    // Apply filters
    if (status && status !== 'all') {
      orders = orders.filter(order => order.status === status);
    }
    
    if (supplier && supplier !== 'all') {
      orders = orders.filter(order => order.supplier.toLowerCase() === supplier.toLowerCase());
    }
    
    if (search) {
      orders = orders.filter(order => order.id.toLowerCase().includes(search.toLowerCase()));
    }
    
    // Calculate pagination
    const total = orders.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedOrders = orders.slice(startIndex, endIndex);
    
    return {
      total,
      page,
      limit,
      data: paginatedOrders
    };
  }
  
  /**
   * Get order details
   * @param {string} id - Order ID
   * @returns {Promise<Object>} Order details
   */
  async getOrderDetails(id) {
    await delay(300);
    
    const orders = {
      'ORD-001': {
        id: 'ORD-001',
        date: '2025-03-20',
        supplier: 'Bosch',
        itemCount: 3,
        totalCost: 21250.00,
        status: 'pending',
        estimatedDelivery: '2025-03-27',
        notes: 'Zamówienie priorytetowe',
        items: [
          {
            partId: 'P-007',
            name: 'Tarcze hamulcowe przednie',
            quantity: 10,
            unitPrice: 850.00,
            totalPrice: 8500.00
          },
          {
            partId: 'P-011',
            name: 'Pompa wody',
            quantity: 5,
            unitPrice: 750.00,
            totalPrice: 3750.00
          },
          {
            partId: 'P-001',
            name: 'Klocki hamulcowe przednie',
            quantity: 20,
            unitPrice: 450.00,
            totalPrice: 9000.00
          }
        ]
      },
      'ORD-002': {
        id: 'ORD-002',
        date: '2025-03-18',
        supplier: 'Mann-Filter',
        itemCount: 2,
        totalCost: 6600.00,
        status: 'processing',
        estimatedDelivery: '2025-03-25',
        notes: '',
        items: [
          {
            partId: 'P-002',
            name: 'Filtr oleju',
            quantity: 30,
            unitPrice: 120.00,
            totalPrice: 3600.00
          },
          {
            partId: 'P-012',
            name: 'Filtr paliwa',
            quantity: 20,
            unitPrice: 150.00,
            totalPrice: 3000.00
          }
        ]
      },
      'ORD-003': {
        id: 'ORD-003',
        date: '2025-03-15',
        supplier: 'Valeo',
        itemCount: 1,
        totalCost: 6400.00,
        status: 'shipped',
        estimatedDelivery: '2025-03-22',
        notes: 'Wysłano kurierem DHL',
        items: [
          {
            partId: 'P-005',
            name: 'Zestaw sprzęgła',
            quantity: 2,
            unitPrice: 3200.00,
            totalPrice: 6400.00
          }
        ]
      },
      'ORD-004': {
        id: 'ORD-004',
        date: '2025-03-10',
        supplier: 'Sachs',
        itemCount: 2,
        totalCost: 7150.00,
        status: 'delivered',
        estimatedDelivery: '2025-03-17',
        notes: 'Dostarczone w komplecie',
        items: [
          {
            partId: 'P-004',
            name: 'Amortyzator przedni',
            quantity: 5,
            unitPrice: 950.00,
            totalPrice: 4750.00
          },
          {
            partId: 'P-010',
            name: 'Zestaw naprawczy zawieszenia',
            quantity: 2,
            unitPrice: 1200.00,
            totalPrice: 2400.00
          }
        ]
      },
      'ORD-005': {
        id: 'ORD-005',
        date: '2025-03-05',
        supplier: 'Varta',
        itemCount: 1,
        totalCost: 7500.00,
        status: 'delivered',
        estimatedDelivery: '2025-03-12',
        notes: '',
        items: [
          {
            partId: 'P-008',
            name: 'Akumulator 225Ah',
            quantity: 5,
            unitPrice: 1500.00,
            totalPrice: 7500.00
          }
        ]
      },
      'ORD-006': {
        id: 'ORD-006',
        date: '2025-03-01',
        supplier: 'Continental',
        itemCount: 1,
        totalCost: 1200.00,
        status: 'cancelled',
        estimatedDelivery: '2025-03-08',
        notes: 'Anulowano z powodu błędnego zamówienia',
        items: [
          {
            partId: 'P-009',
            name: 'Pasek klinowy',
            quantity: 10,
            unitPrice: 120.00,
            totalPrice: 1200.00
          }
        ]
      }
    };
    
    return orders[id] || null;
  }
  
  /**
   * Get usage analysis
   * @returns {Promise<Object>} Usage analysis data
   */
  async getUsageAnalysis() {
    await delay(600);
    
    return {
      mostUsedParts: [
        {
          name: 'Klocki hamulcowe przednie',
          count: 120,
          percentage: 18
        },
        {
          name: 'Filtr oleju',
          count: 95,
          percentage: 14
        },
        {
          name: 'Filtr powietrza',
          count: 85,
          percentage: 13
        },
        {
          name: 'Filtr paliwa',
          count: 70,
          percentage: 10
        },
        {
          name: 'Akumulator 225Ah',
          count: 45,
          percentage: 7
        }
      ],
      costByCategory: [
        {
          category: 'Hamulce',
          cost: 150000,
          percentage: 25
        },
        {
          category: 'Silnik',
          cost: 120000,
          percentage: 20
        },
        {
          category: 'Elektryka',
          cost: 90000,
          percentage: 15
        },
        {
          category: 'Zawieszenie',
          cost: 75000,
          percentage: 12
        },
        {
          category: 'Skrzynia biegów',
          cost: 60000,
          percentage: 10
        },
        {
          category: 'Nadwozie',
          cost: 45000,
          percentage: 8
        },
        {
          category: 'Inne',
          cost: 60000,
          percentage: 10
        }
      ],
      usageTrends: [
        { month: 'Styczeń', count: 180 },
        { month: 'Luty', count: 160 },
        { month: 'Marzec', count: 210 },
        { month: 'Kwiecień', count: 190 },
        { month: 'Maj', count: 220 },
        { month: 'Czerwiec', count: 200 }
      ],
      partsBySupplier: [
        {
          supplier: 'Bosch',
          partCount: 250,
          percentage: 30
        },
        {
          supplier: 'Mann-Filter',
          partCount: 180,
          percentage: 22
        },
        {
          supplier: 'Valeo',
          partCount: 120,
          percentage: 15
        },
        {
          supplier: 'Sachs',
          partCount: 100,
          percentage: 12
        },
        {
          supplier: 'Continental',
          partCount: 90,
          percentage: 11
        },
        {
          supplier: 'Varta',
          partCount: 50,
          percentage: 6
        },
        {
          supplier: 'Inni',
          partCount: 30,
          percentage: 4
        }
      ]
    };
  }
  
  /**
   * Get compatible parts for a vehicle model
   * @param {string} vehicleModel - Vehicle model
   * @returns {Promise<Object>} Compatible parts
   */
  async getCompatibleParts(vehicleModel) {
    await delay(500);
    
    const compatibilityData = {
      'Mercedes Actros': {
        parts: [
          {
            id: 'P-001',
            name: 'Klocki hamulcowe przednie',
            catalogNumber: 'BRK-1234-F',
            category: 'brakes',
            price: 450.00,
            status: 'available'
          },
          {
            id: 'P-002',
            name: 'Filtr oleju',
            catalogNumber: 'OIL-5678-F',
            category: 'engine',
            price: 120.00,
            status: 'low'
          },
          {
            id: 'P-003',
            name: 'Alternator',
            catalogNumber: 'ELE-9012-A',
            category: 'electrical',
            price: 1800.00,
            status: 'available'
          },
          {
            id: 'P-006',
            name: 'Filtr powietrza',
            catalogNumber: 'AIR-2345-F',
            category: 'engine',
            price: 180.00,
            status: 'available'
          },
          {
            id: 'P-007',
            name: 'Tarcze hamulcowe przednie',
            catalogNumber: 'BRK-6789-D',
            category: 'brakes',
            price: 850.00,
            status: 'ordered'
          },
          {
            id: 'P-008',
            name: 'Akumulator 225Ah',
            catalogNumber: 'ELE-1234-B',
            category: 'electrical',
            price: 1500.00,
            status: 'low'
          },
          {
            id: 'P-011',
            name: 'Pompa wody',
            catalogNumber: 'ENG-3456-W',
            category: 'engine',
            price: 750.00,
            status: 'ordered'
          },
          {
            id: 'P-012',
            name: 'Filtr paliwa',
            catalogNumber: 'FUE-7890-F',
            category: 'engine',
            price: 150.00,
            status: 'available'
          }
        ],
        alternativeParts: [
          {
            id: 'P-013',
            name: 'Klocki hamulcowe przednie (zamiennik)',
            catalogNumber: 'BRK-1234-FA',
            category: 'brakes',
            compatibility: 95,
            price: 350.00,
            status: 'available'
          },
          {
            id: 'P-014',
            name: 'Filtr oleju (zamiennik)',
            catalogNumber: 'OIL-5678-FA',
            category: 'engine',
            compatibility: 98,
            price: 90.00,
            status: 'available'
          },
          {
            id: 'P-015',
            name: 'Alternator (regenerowany)',
            catalogNumber: 'ELE-9012-AR',
            category: 'electrical',
            compatibility: 100,
            price: 1200.00,
            status: 'available'
          }
        ]
      },
      'Volvo FH': {
        parts: [
          {
            id: 'P-002',
            name: 'Filtr oleju',
            catalogNumber: 'OIL-5678-F',
            category: 'engine',
            price: 120.00,
            status: 'low'
          },
          {
            id: 'P-004',
            name: 'Amortyzator przedni',
            catalogNumber: 'SUS-3456-F',
            category: 'suspension',
            price: 950.00,
            status: 'low'
          },
          {
            id: 'P-006',
            name: 'Filtr powietrza',
            catalogNumber: 'AIR-2345-F',
            category: 'engine',
            price: 180.00,
            status: 'available'
          },
          {
            id: 'P-008',
            name: 'Akumulator 225Ah',
            catalogNumber: 'ELE-1234-B',
            category: 'electrical',
            price: 1500.00,
            status: 'low'
          },
          {
            id: 'P-009',
            name: 'Pasek klinowy',
            catalogNumber: 'ENG-5678-B',
            category: 'engine',
            price: 120.00,
            status: 'available'
          },
          {
            id: 'P-012',
            name: 'Filtr paliwa',
            catalogNumber: 'FUE-7890-F',
            category: 'engine',
            price: 150.00,
            status: 'available'
          }
        ],
        alternativeParts: [
          {
            id: 'P-016',
            name: 'Amortyzator przedni (zamiennik)',
            catalogNumber: 'SUS-3456-FA',
            category: 'suspension',
            compatibility: 90,
            price: 750.00,
            status: 'available'
          },
          {
            id: 'P-017',
            name: 'Pasek klinowy (zamiennik)',
            catalogNumber: 'ENG-5678-BA',
            category: 'engine',
            compatibility: 100,
            price: 90.00,
            status: 'available'
          }
        ]
      },
      'Scania R': {
        parts: [
          {
            id: 'P-002',
            name: 'Filtr oleju',
            catalogNumber: 'OIL-5678-F',
            category: 'engine',
            price: 120.00,
            status: 'low'
          },
          {
            id: 'P-005',
            name: 'Zestaw sprzęgła',
            catalogNumber: 'TRN-7890-C',
            category: 'transmission',
            price: 3200.00,
            status: 'out_of_stock'
          },
          {
            id: 'P-006',
            name: 'Filtr powietrza',
            catalogNumber: 'AIR-2345-F',
            category: 'engine',
            price: 180.00,
            status: 'available'
          },
          {
            id: 'P-008',
            name: 'Akumulator 225Ah',
            catalogNumber: 'ELE-1234-B',
            category: 'electrical',
            price: 1500.00,
            status: 'low'
          },
          {
            id: 'P-010',
            name: 'Zestaw naprawczy zawieszenia',
            catalogNumber: 'SUS-9012-R',
            category: 'suspension',
            price: 1200.00,
            status: 'available'
          },
          {
            id: 'P-012',
            name: 'Filtr paliwa',
            catalogNumber: 'FUE-7890-F',
            category: 'engine',
            price: 150.00,
            status: 'available'
          }
        ],
        alternativeParts: [
          {
            id: 'P-018',
            name: 'Zestaw sprzęgła (zamiennik)',
            catalogNumber: 'TRN-7890-CA',
            category: 'transmission',
            compatibility: 95,
            price: 2800.00,
            status: 'available'
          }
        ]
      }
    };
    
    // Return data for the requested vehicle model or empty arrays if not found
    return compatibilityData[vehicleModel] || { parts: [], alternativeParts: [] };
  }
  
  /**
   * Get suppliers
   * @param {string} [search] - Search query
   * @param {number} [page=1] - Page number
   * @param {number} [limit=10] - Results per page
   * @returns {Promise<Object>} Suppliers response
   */
  async getSuppliers(
    search,
    page = 1,
    limit = 10
  ) {
    await delay(500);
    
    let suppliers = [
      {
        id: 'SUP-001',
        name: 'Bosch',
        contactPerson: 'Hans Schmidt',
        email: 'h.schmidt@bosch.com',
        phone: '+49 123 456 789',
        categoryCount: 5,
        rating: 4.8
      },
      {
        id: 'SUP-002',
        name: 'Mann-Filter',
        contactPerson: 'Klaus Weber',
        email: 'k.weber@mann-filter.com',
        phone: '+49 234 567 890',
        categoryCount: 3,
        rating: 4.5
      },
      {
        id: 'SUP-003',
        name: 'Valeo',
        contactPerson: 'Pierre Dupont',
        email: 'p.dupont@valeo.com',
        phone: '+33 123 456 789',
        categoryCount: 4,
        rating: 4.2
      },
      {
        id: 'SUP-004',
        name: 'Sachs',
        contactPerson: 'Thomas Müller',
        email: 't.muller@sachs.com',
        phone: '+49 345 678 901',
        categoryCount: 2,
        rating: 4.4
      },
      {
        id: 'SUP-005',
        name: 'Continental',
        contactPerson: 'Markus Bauer',
        email: 'm.bauer@continental.com',
        phone: '+49 456 789 012',
        categoryCount: 3,
        rating: 4.6
      },
      {
        id: 'SUP-006',
        name: 'Varta',
        contactPerson: 'Stefan Krause',
        email: 's.krause@varta.com',
        phone: '+49 567 890 123',
        categoryCount: 1,
        rating: 4.3
      },
      {
        id: 'SUP-007',
        name: 'Brembo',
        contactPerson: 'Marco Rossi',
        email: 'm.rossi@brembo.com',
        phone: '+39 123 456 789',
        categoryCount: 1,
        rating: 4.7
      }
    ];
    
    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase();
      suppliers = suppliers.filter(supplier => 
        supplier.name.toLowerCase().includes(searchLower)
      );
    }
    
    // Calculate pagination
    const total = suppliers.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedSuppliers = suppliers.slice(startIndex, endIndex);
    
    return {
      total,
      page,
      limit,
      data: paginatedSuppliers
    };
  }
  
  /**
   * Get supplier details
   * @param {string} id - Supplier ID
   * @returns {Promise<Object>} Supplier details
   */
  async getSupplierDetails(id) {
    await delay(300);
    
    const suppliers = {
      'SUP-001': {
        id: 'SUP-001',
        name: 'Bosch',
        contactPerson: 'Hans Schmidt',
        email: 'h.schmidt@bosch.com',
        phone: '+49 123 456 789',
        address: 'Robert-Bosch-Platz 1, 70839 Gerlingen, Niemcy',
        categories: ['Hamulce', 'Elektryka', 'Silnik', 'Układ wtryskowy', 'Elektronika'],
        rating: 4.8,
        performance: {
          timeliness: 4.7,
          quality: 4.9,
          pricing: 4.5
        },
        notes: 'Preferowany dostawca dla części elektrycznych i elektronicznych.',
        orderHistory: [
          {
            date: '2025-03-20',
            orderId: 'ORD-001',
            itemCount: 3,
            totalCost: 21250.00,
            status: 'pending'
          },
          {
            date: '2025-02-28',
            orderId: 'ORD-007',
            itemCount: 2,
            totalCost: 9000.00,
            status: 'delivered'
          },
          {
            date: '2025-02-10',
            orderId: 'ORD-012',
            itemCount: 4,
            totalCost: 15000.00,
            status: 'delivered'
          }
        ]
      },
      'SUP-002': {
        id: 'SUP-002',
        name: 'Mann-Filter',
        contactPerson: 'Klaus Weber',
        email: 'k.weber@mann-filter.com',
        phone: '+49 234 567 890',
        address: 'Hindenburgstraße 45, 71638 Ludwigsburg, Niemcy',
        categories: ['Filtry oleju', 'Filtry powietrza', 'Filtry paliwa'],
        rating: 4.5,
        performance: {
          timeliness: 4.6,
          quality: 4.7,
          pricing: 4.2
        },
        notes: 'Specjalizacja w filtrach wysokiej jakości.',
        orderHistory: [
          {
            date: '2025-03-18',
            orderId: 'ORD-002',
            itemCount: 2,
            totalCost: 6600.00,
            status: 'processing'
          },
          {
            date: '2025-02-15',
            orderId: 'ORD-009',
            itemCount: 3,
            totalCost: 8500.00,
            status: 'delivered'
          }
        ]
      }
    };
    
    return suppliers[id] || null;
  }
}

export default new MockPartsService();
