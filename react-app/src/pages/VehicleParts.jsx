import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Card from '../components/common/Card';
import Table from '../components/common/Table';
import partsService from '../services/api/partsService';
import mockPartsService from '../services/api/mockPartsService';

/**
 * @typedef {Object} Part
 * @property {string} id - Part ID
 * @property {string} name - Part name
 * @property {string} catalogNumber - Catalog number
 * @property {Array<string>} compatibleModels - Compatible vehicle models
 * @property {number} quantity - Quantity in stock
 * @property {number} minLevel - Minimum stock level
 * @property {number} price - Unit price
 * @property {string} supplier - Supplier name
 * @property {string} status - Part status (available, low stock, ordered)
 */

/**
 * @typedef {Object} Order
 * @property {string} id - Order ID
 * @property {string} date - Order date
 * @property {string} supplier - Supplier name
 * @property {Array<Object>} items - Ordered items
 * @property {string} status - Order status
 * @property {number} totalCost - Total order cost
 */

/**
 * @typedef {Object} UsageAnalysis
 * @property {Array<Object>} mostUsedParts - Most frequently used parts
 * @property {Array<Object>} costByCategory - Costs by part category
 * @property {Array<Object>} usageTrends - Usage trends over time
 * @property {Array<Object>} partsBySupplier - Parts distribution by supplier
 */

/**
 * @typedef {Object} Supplier
 * @property {string} id - Supplier ID
 * @property {string} name - Supplier name
 * @property {Object} contact - Contact information
 * @property {Array<string>} categories - Part categories supplied
 * @property {Object} performance - Performance metrics
 */

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 500;
  color: #333;
  margin: 0 0 16px 0;
`;

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 20px;
`;

const Tab = styled.div`
  padding: 12px 24px;
  cursor: pointer;
  font-weight: ${props => props.active ? '500' : 'normal'};
  color: ${props => props.active ? '#3f51b5' : '#666'};
  border-bottom: 2px solid ${props => props.active ? '#3f51b5' : 'transparent'};
  transition: all 0.3s ease;
  
  &:hover {
    color: #3f51b5;
    background-color: #f5f5f5;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 20px;
  padding: 16px;
  background-color: #f5f5f5;
  border-radius: 8px;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FilterLabel = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #333;
`;

const FilterSelect = styled.select`
  padding: 8px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 14px;
  min-width: 150px;
  
  &:focus {
    outline: none;
    border-color: #3f51b5;
  }
`;

const FilterInput = styled.input`
  padding: 8px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #3f51b5;
  }
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color: ${props => props.primary ? '#3f51b5' : 'white'};
  color: ${props => props.primary ? 'white' : '#3f51b5'};
  border: 1px solid #3f51b5;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.primary ? '#303f9f' : '#f0f0f0'};
  }
  
  &:disabled {
    background-color: #e0e0e0;
    color: #9e9e9e;
    border-color: #e0e0e0;
    cursor: not-allowed;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  margin-left: auto;
`;

const GridSection = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 20px;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const ChartContainer = styled.div`
  height: 300px;
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 16px;
  margin-top: 16px;
`;

const Badge = styled.span`
  display: inline-block;
  padding: 4px 8px;
  background-color: ${props => {
    switch(props.status) {
      case 'available': return '#4caf50';
      case 'low': return '#ff9800';
      case 'ordered': return '#2196f3';
      case 'out_of_stock': return '#f44336';
      default: return '#9e9e9e';
    }
  }};
  color: white;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
`;

const DetailContainer = styled.div`
  padding: 16px;
  background-color: #f5f5f5;
  border-radius: 8px;
  margin-top: 20px;
`;

const DetailTitle = styled.h3`
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin: 0 0 12px 0;
`;

const DetailRow = styled.div`
  display: flex;
  margin-bottom: 8px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const DetailLabel = styled.div`
  font-weight: 500;
  width: 200px;
  color: #666;
`;

const DetailValue = styled.div`
  flex: 1;
`;

const LoadingIndicator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  color: #666;
`;

const ErrorMessage = styled.div`
  color: #d32f2f;
  padding: 16px;
  background-color: #ffebee;
  border-radius: 4px;
  margin-bottom: 20px;
`;

// eslint-disable-next-line no-unused-vars
const CompatibilityList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

// eslint-disable-next-line no-unused-vars
const CompatibilityItem = styled.li`
  padding: 8px 0;
  border-bottom: 1px solid #e0e0e0;
  
  &:last-child {
    border-bottom: none;
  }
`;

/**
 * VehicleParts component for managing vehicle parts inventory and orders
 * @returns {JSX.Element} VehicleParts component
 */
const VehicleParts = () => {
  // Active tab state
  const [activeTab, setActiveTab] = useState('inventory');
  
  // Data source toggle state (API vs Mock)
  const [useMockData, setUseMockData] = useState(true);
  
  // Parts inventory states
  const [parts, setParts] = useState(null);
  const [selectedPart, setSelectedPart] = useState(null);
  
  // Orders states
  const [orders, setOrders] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  
  // Usage analysis states
  const [usageAnalysis, setUsageAnalysis] = useState(null);
  
  // Compatibility search states
  const [compatibleParts, setCompatibleParts] = useState(null);
  const [vehicleModel, setVehicleModel] = useState('');
  
  // Suppliers states
  const [suppliers, setSuppliers] = useState(null);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  
  // Filters state
  const [filters, setFilters] = useState({
    category: 'all',
    supplier: 'all',
    status: 'all',
    search: '',
    page: 1,
    limit: 10
  });
  
  // Loading and error states
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch data based on active tab
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Select service based on toggle
        const service = useMockData ? mockPartsService : partsService;
        
        switch(activeTab) {
          case 'inventory':
            const partsResponse = await service.getParts(
              filters.category !== 'all' ? filters.category : undefined,
              filters.supplier !== 'all' ? filters.supplier : undefined,
              filters.status !== 'all' ? filters.status : undefined,
              filters.search || undefined,
              filters.page,
              filters.limit
            );
            console.log('Parts response:', partsResponse); // Debug log
            setParts(partsResponse);
            break;
            
          case 'orders':
            const ordersResponse = await service.getOrders(
              undefined, undefined, undefined, filters.page, filters.limit
            );
            console.log('Orders response:', ordersResponse); // Debug log
            setOrders(ordersResponse);
            break;
            
          case 'usage':
            const usageResponse = await service.getUsageAnalysis();
            console.log('Usage response:', usageResponse); // Debug log
            setUsageAnalysis(usageResponse);
            break;
            
          case 'compatibility':
            if (vehicleModel) {
              const compatibilityResponse = await service.getCompatibleParts(vehicleModel);
              console.log('Compatibility response:', compatibilityResponse); // Debug log
              setCompatibleParts(compatibilityResponse);
            }
            break;
            
          case 'suppliers':
            const suppliersResponse = await service.getSuppliers(
              undefined, filters.page, filters.limit
            );
            console.log('Suppliers response:', suppliersResponse); // Debug log
            setSuppliers(suppliersResponse);
            break;
            
          default:
            break;
        }
      } catch (err) {
        console.error(`Error fetching ${activeTab} data:`, err);
        setError(`Nie udało się pobrać danych ${getTabName(activeTab)}. Spróbuj odświeżyć stronę.`);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [activeTab, filters, vehicleModel, useMockData]);
  
  // Get part details
  const handlePartSelect = async (part) => {
    try {
      const service = useMockData ? mockPartsService : partsService;
      const partDetails = await service.getPartDetails(part.id);
      setSelectedPart(partDetails);
    } catch (err) {
      console.error('Error fetching part details:', err);
      setError('Nie udało się pobrać szczegółów części.');
    }
  };
  
  // Get order details
  const handleOrderSelect = async (order) => {
    try {
      const service = useMockData ? mockPartsService : partsService;
      const orderDetails = await service.getOrderDetails(order.id);
      setSelectedOrder(orderDetails);
    } catch (err) {
      console.error('Error fetching order details:', err);
      setError('Nie udało się pobrać szczegółów zamówienia.');
    }
  };
  
  // Get supplier details
  const handleSupplierSelect = async (supplier) => {
    try {
      const service = useMockData ? mockPartsService : partsService;
      const supplierDetails = await service.getSupplierDetails(supplier.id);
      setSelectedSupplier(supplierDetails);
    } catch (err) {
      console.error('Error fetching supplier details:', err);
      setError('Nie udało się pobrać szczegółów dostawcy.');
    }
  };
  
  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
      // Reset page when changing filters
      ...(name !== 'page' && { page: 1 })
    });
  };
  
  // Handle search
  const handleSearch = () => {
    setFilters({
      ...filters,
      page: 1
    });
  };
  
  // Handle compatibility search
  const handleCompatibilitySearch = () => {
    if (vehicleModel) {
      setFilters({
        ...filters,
        page: 1
      });
    }
  };
  
  // Handle data source toggle
  const handleToggleDataSource = () => {
    setUseMockData(prev => !prev);
  };
  
  // Export data to CSV
  const handleExportCSV = () => {
    // Implementation would depend on the specific requirements
    alert('Eksport do CSV zostanie zaimplementowany zgodnie z wymaganiami.');
  };
  
  // Export data to PDF
  const handleExportPDF = () => {
    // Implementation would depend on the specific requirements
    alert('Eksport do PDF zostanie zaimplementowany zgodnie z wymaganiami.');
  };
  
  // Helper function to get tab name in Polish
  const getTabName = (tab) => {
    switch(tab) {
      case 'inventory': return 'inwentarza';
      case 'orders': return 'zamówień';
      case 'usage': return 'analizy zużycia';
      case 'compatibility': return 'kompatybilności';
      case 'suppliers': return 'dostawców';
      default: return tab;
    }
  };
  
  // Render inventory tab content
  const renderInventoryTab = () => {
    if (isLoading) {
      return <LoadingIndicator>Ładowanie danych inwentarza...</LoadingIndicator>;
    }
    
    if (error) {
      return <ErrorMessage>{error}</ErrorMessage>;
    }
    
    if (!parts || !parts.data || parts.data.length === 0) {
      return <div>Brak danych inwentarza do wyświetlenia.</div>;
    }
    
    const columns = [
      { id: 'id', label: 'ID' },
      { id: 'name', label: 'Nazwa' },
      { id: 'catalogNumber', label: 'Numer katalogowy' },
      { id: 'quantity', label: 'Ilość' },
      { id: 'minLevel', label: 'Min. poziom' },
      { id: 'price', label: 'Cena jedn.', format: (value) => `${value.toFixed(2)} zł` },
      { id: 'supplier', label: 'Dostawca' },
      { 
        id: 'status', 
        label: 'Status',
        format: (value) => {
          let label = '';
          let status = '';
          
          switch(value) {
            case 'available':
              label = 'Dostępna';
              status = 'available';
              break;
            case 'low':
              label = 'Niski stan';
              status = 'low';
              break;
            case 'ordered':
              label = 'Zamówiona';
              status = 'ordered';
              break;
            case 'out_of_stock':
              label = 'Brak w magazynie';
              status = 'out_of_stock';
              break;
            default:
              label = value;
              status = 'default';
          }
          
          return <Badge status={status}>{label}</Badge>;
        }
      }
    ];
    
    return (
      <>
        <FilterContainer>
          <FilterGroup>
            <FilterLabel htmlFor="category">Kategoria</FilterLabel>
            <FilterSelect 
              id="category" 
              name="category" 
              value={filters.category} 
              onChange={handleFilterChange}
            >
              <option value="all">Wszystkie</option>
              <option value="engine">Silnik</option>
              <option value="transmission">Skrzynia biegów</option>
              <option value="brakes">Hamulce</option>
              <option value="suspension">Zawieszenie</option>
              <option value="electrical">Elektryka</option>
              <option value="body">Nadwozie</option>
              <option value="interior">Wnętrze</option>
              <option value="other">Inne</option>
            </FilterSelect>
          </FilterGroup>
          
          <FilterGroup>
            <FilterLabel htmlFor="supplier">Dostawca</FilterLabel>
            <FilterSelect 
              id="supplier" 
              name="supplier" 
              value={filters.supplier} 
              onChange={handleFilterChange}
            >
              <option value="all">Wszyscy</option>
              <option value="bosch">Bosch</option>
              <option value="continental">Continental</option>
              <option value="delphi">Delphi</option>
              <option value="valeo">Valeo</option>
              <option value="denso">Denso</option>
              <option value="other">Inni</option>
            </FilterSelect>
          </FilterGroup>
          
          <FilterGroup>
            <FilterLabel htmlFor="status">Status</FilterLabel>
            <FilterSelect 
              id="status" 
              name="status" 
              value={filters.status} 
              onChange={handleFilterChange}
            >
              <option value="all">Wszystkie</option>
              <option value="available">Dostępne</option>
              <option value="low">Niski stan</option>
              <option value="ordered">Zamówione</option>
              <option value="out_of_stock">Brak w magazynie</option>
            </FilterSelect>
          </FilterGroup>
          
          <FilterGroup>
            <FilterLabel htmlFor="search">Wyszukaj</FilterLabel>
            <FilterInput 
              type="text" 
              id="search" 
              name="search" 
              value={filters.search} 
              onChange={handleFilterChange}
              placeholder="Nazwa lub numer katalogowy"
            />
          </FilterGroup>
          
          <FilterGroup style={{ alignSelf: 'flex-end' }}>
            <Button primary onClick={handleSearch}>
              Szukaj
            </Button>
          </FilterGroup>
          
          <ButtonGroup>
            <Button onClick={handleExportCSV}>
              Eksport CSV
            </Button>
            <Button onClick={handleExportPDF}>
              Eksport PDF
            </Button>
            <Button onClick={handleToggleDataSource}>
              {useMockData ? 'Użyj API' : 'Użyj danych testowych'}
            </Button>
          </ButtonGroup>
        </FilterContainer>
        
        <Table 
          headers={columns.map(col => col.label)}
          data={parts.data.map(part => columns.map(col => {
            const value = part[col.id];
            return col.format && typeof col.format === 'function' ? col.format(value) : value;
          }))}
          onRowClick={(rowIndex) => handlePartSelect(parts.data[rowIndex])}
        />
        
        {selectedPart && (
          <DetailContainer>
            <DetailTitle>Szczegóły części: {selectedPart.name}</DetailTitle>
            
            <DetailRow>
              <DetailLabel>ID:</DetailLabel>
              <DetailValue>{selectedPart.id}</DetailValue>
            </DetailRow>
            
            <DetailRow>
              <DetailLabel>Numer katalogowy:</DetailLabel>
              <DetailValue>{selectedPart.catalogNumber}</DetailValue>
            </DetailRow>
            
            <DetailRow>
              <DetailLabel>Kompatybilne modele:</DetailLabel>
              <DetailValue>{selectedPart.compatibleModels.join(', ')}</DetailValue>
            </DetailRow>
            
            <DetailRow>
              <DetailLabel>Ilość w magazynie:</DetailLabel>
              <DetailValue>{selectedPart.quantity}</DetailValue>
            </DetailRow>
            
            <DetailRow>
              <DetailLabel>Minimalny poziom zapasów:</DetailLabel>
              <DetailValue>{selectedPart.minLevel}</DetailValue>
            </DetailRow>
            
            <DetailRow>
              <DetailLabel>Cena jednostkowa:</DetailLabel>
              <DetailValue>{selectedPart.price.toFixed(2)} zł</DetailValue>
            </DetailRow>
            
            <DetailRow>
              <DetailLabel>Dostawca:</DetailLabel>
              <DetailValue>{selectedPart.supplier}</DetailValue>
            </DetailRow>
            
            <DetailRow>
              <DetailLabel>Status:</DetailLabel>
              <DetailValue>
                <Badge status={selectedPart.status}>
                  {selectedPart.status === 'available' ? 'Dostępna' : 
                   selectedPart.status === 'low' ? 'Niski stan' : 
                   selectedPart.status === 'ordered' ? 'Zamówiona' : 
                   selectedPart.status === 'out_of_stock' ? 'Brak w magazynie' : 
                   selectedPart.status}
                </Badge>
              </DetailValue>
            </DetailRow>
            
            <DetailRow>
              <DetailLabel>Kategoria:</DetailLabel>
              <DetailValue>{selectedPart.category}</DetailValue>
            </DetailRow>
            
            <DetailRow>
              <DetailLabel>Lokalizacja w magazynie:</DetailLabel>
              <DetailValue>{selectedPart.location}</DetailValue>
            </DetailRow>
            
            <DetailRow>
              <DetailLabel>Data ostatniego zamówienia:</DetailLabel>
              <DetailValue>{selectedPart.lastOrderDate}</DetailValue>
            </DetailRow>
            
            <DetailRow>
              <DetailLabel>Opis:</DetailLabel>
              <DetailValue>{selectedPart.description}</DetailValue>
            </DetailRow>
            
            {selectedPart.technicalSpecs && (
              <>
                <DetailTitle style={{ marginTop: '16px' }}>Specyfikacja techniczna</DetailTitle>
                
                <DetailRow>
                  <DetailLabel>Wymiary:</DetailLabel>
                  <DetailValue>{selectedPart.technicalSpecs.dimensions}</DetailValue>
                </DetailRow>
                
                <DetailRow>
                  <DetailLabel>Waga:</DetailLabel>
                  <DetailValue>{selectedPart.technicalSpecs.weight}</DetailValue>
                </DetailRow>
                
                <DetailRow>
                  <DetailLabel>Materiał:</DetailLabel>
                  <DetailValue>{selectedPart.technicalSpecs.material}</DetailValue>
                </DetailRow>
                
                <DetailRow>
                  <DetailLabel>Producent:</DetailLabel>
                  <DetailValue>{selectedPart.technicalSpecs.manufacturer}</DetailValue>
                </DetailRow>
                
                <DetailRow>
                  <DetailLabel>Kraj pochodzenia:</DetailLabel>
                  <DetailValue>{selectedPart.technicalSpecs.countryOfOrigin}</DetailValue>
                </DetailRow>
                
                <DetailRow>
                  <DetailLabel>Gwarancja:</DetailLabel>
                  <DetailValue>{selectedPart.technicalSpecs.warranty}</DetailValue>
                </DetailRow>
              </>
            )}
            
            {selectedPart.installationInstructions && (
              <>
                <DetailTitle style={{ marginTop: '16px' }}>Instrukcja montażu</DetailTitle>
                <DetailRow>
                  <DetailValue>{selectedPart.installationInstructions}</DetailValue>
                </DetailRow>
              </>
            )}
            
            {selectedPart.replacementInterval && (
              <>
                <DetailTitle style={{ marginTop: '16px' }}>Zalecany interwał wymiany</DetailTitle>
                <DetailRow>
                  <DetailValue>{selectedPart.replacementInterval}</DetailValue>
                </DetailRow>
              </>
            )}
            
            {selectedPart.additionalNotes && (
              <>
                <DetailTitle style={{ marginTop: '16px' }}>Dodatkowe informacje</DetailTitle>
                <DetailRow>
                  <DetailValue>{selectedPart.additionalNotes}</DetailValue>
                </DetailRow>
              </>
            )}
          </DetailContainer>
        )}
      </>
    );
  };
  
  // Render orders tab content
  const renderOrdersTab = () => {
    if (isLoading) {
      return <LoadingIndicator>Ładowanie danych zamówień...</LoadingIndicator>;
    }
    
    if (error) {
      return <ErrorMessage>{error}</ErrorMessage>;
    }
    
    if (!orders || !orders.data || orders.data.length === 0) {
      return <div>Brak danych zamówień do wyświetlenia.</div>;
    }
    
    const columns = [
      { id: 'id', label: 'ID zamówienia' },
      { id: 'date', label: 'Data zamówienia' },
      { id: 'supplier', label: 'Dostawca' },
      { 
        id: 'items', 
        label: 'Liczba pozycji',
        format: (items) => items.length
      },
      { 
        id: 'totalCost', 
        label: 'Koszt całkowity',
        format: (value) => `${value.toFixed(2)} zł`
      },
      { 
        id: 'status', 
        label: 'Status',
        format: (value) => {
          let label = '';
          let status = '';
          
          switch(value) {
            case 'pending':
              label = 'Oczekujące';
              status = 'ordered';
              break;
            case 'processing':
              label = 'W realizacji';
              status = 'ordered';
              break;
            case 'shipped':
              label = 'Wysłane';
              status = 'available';
              break;
            case 'delivered':
              label = 'Dostarczone';
              status = 'available';
              break;
            case 'cancelled':
              label = 'Anulowane';
              status = 'out_of_stock';
              break;
            default:
              label = value;
              status = 'default';
          }
          
          return <Badge status={status}>{label}</Badge>;
        }
      }
    ];
    
    return (
      <>
        <ButtonGroup style={{ marginBottom: '20px' }}>
          <Button onClick={handleExportCSV}>
            Eksport CSV
          </Button>
          <Button onClick={handleExportPDF}>
            Eksport PDF
          </Button>
          <Button onClick={handleToggleDataSource}>
            {useMockData ? 'Użyj API' : 'Użyj danych testowych'}
          </Button>
        </ButtonGroup>
        
        <Table 
          columns={columns} 
          data={orders.data} 
          pagination={orders.pagination}
          onRowClick={handleOrderSelect}
          onPageChange={(page) => setFilters({ ...filters, page })}
        />
        
        {selectedOrder && (
          <DetailContainer>
            <DetailTitle>Szczegóły zamówienia: {selectedOrder.id}</DetailTitle>
            
            <DetailRow>
              <DetailLabel>Data zamówienia:</DetailLabel>
              <DetailValue>{selectedOrder.date}</DetailValue>
            </DetailRow>
            
            <DetailRow>
              <DetailLabel>Dostawca:</DetailLabel>
              <DetailValue>{selectedOrder.supplier}</DetailValue>
            </DetailRow>
            
            <DetailRow>
              <DetailLabel>Status:</DetailLabel>
              <DetailValue>
                <Badge status={
                  selectedOrder.status === 'pending' || selectedOrder.status === 'processing' ? 'ordered' :
                  selectedOrder.status === 'shipped' || selectedOrder.status === 'delivered' ? 'available' :
                  selectedOrder.status === 'cancelled' ? 'out_of_stock' : 'default'
                }>
                  {selectedOrder.status === 'pending' ? 'Oczekujące' : 
                   selectedOrder.status === 'processing' ? 'W realizacji' : 
                   selectedOrder.status === 'shipped' ? 'Wysłane' : 
                   selectedOrder.status === 'delivered' ? 'Dostarczone' : 
                   selectedOrder.status === 'cancelled' ? 'Anulowane' : 
                   selectedOrder.status}
                </Badge>
              </DetailValue>
            </DetailRow>
            
            <DetailRow>
              <DetailLabel>Koszt całkowity:</DetailLabel>
              <DetailValue>{selectedOrder.totalCost.toFixed(2)} zł</DetailValue>
            </DetailRow>
            
            {selectedOrder.estimatedDelivery && (
              <DetailRow>
                <DetailLabel>Szacowana data dostawy:</DetailLabel>
                <DetailValue>{selectedOrder.estimatedDelivery}</DetailValue>
              </DetailRow>
            )}
            
            {selectedOrder.deliveryDate && (
              <DetailRow>
                <DetailLabel>Data dostawy:</DetailLabel>
                <DetailValue>{selectedOrder.deliveryDate}</DetailValue>
              </DetailRow>
            )}
            
            {selectedOrder.trackingNumber && (
              <DetailRow>
                <DetailLabel>Numer przesyłki:</DetailLabel>
                <DetailValue>{selectedOrder.trackingNumber}</DetailValue>
              </DetailRow>
            )}
            
            {selectedOrder.cancellationReason && (
              <DetailRow>
                <DetailLabel>Powód anulowania:</DetailLabel>
                <DetailValue>{selectedOrder.cancellationReason}</DetailValue>
              </DetailRow>
            )}
            
            {selectedOrder.notes && (
              <DetailRow>
                <DetailLabel>Uwagi:</DetailLabel>
                <DetailValue>{selectedOrder.notes}</DetailValue>
              </DetailRow>
            )}
            
            <DetailTitle style={{ marginTop: '16px' }}>Pozycje zamówienia</DetailTitle>
            
            <Table 
              columns={[
                { id: 'partId', label: 'ID części' },
                { id: 'name', label: 'Nazwa' },
                { id: 'quantity', label: 'Ilość' },
                { id: 'price', label: 'Cena jedn.', format: (value) => `${value.toFixed(2)} zł` },
                { 
                  id: 'total', 
                  label: 'Wartość',
                  format: (_, item) => `${(item.quantity * item.price).toFixed(2)} zł`
                }
              ]} 
              data={selectedOrder.items} 
              pagination={null}
            />
            
            {selectedOrder.contact && (
              <>
                <DetailTitle style={{ marginTop: '16px' }}>Kontakt</DetailTitle>
                
                <DetailRow>
                  <DetailLabel>Osoba kontaktowa:</DetailLabel>
                  <DetailValue>{selectedOrder.contact.name}</DetailValue>
                </DetailRow>
                
                <DetailRow>
                  <DetailLabel>Email:</DetailLabel>
                  <DetailValue>{selectedOrder.contact.email}</DetailValue>
                </DetailRow>
                
                <DetailRow>
                  <DetailLabel>Telefon:</DetailLabel>
                  <DetailValue>{selectedOrder.contact.phone}</DetailValue>
                </DetailRow>
              </>
            )}
            
            {selectedOrder.history && selectedOrder.history.length > 0 && (
              <>
                <DetailTitle style={{ marginTop: '16px' }}>Historia zamówienia</DetailTitle>
                
                <Table 
                  columns={[
                    { id: 'date', label: 'Data' },
                    { 
                      id: 'status', 
                      label: 'Status',
                      format: (value) => {
                        let label = '';
                        let status = '';
                        
                        switch(value) {
                          case 'created':
                            label = 'Utworzone';
                            status = 'default';
                            break;
                          case 'processing':
                            label = 'W realizacji';
                            status = 'ordered';
                            break;
                          case 'shipped':
                            label = 'Wysłane';
                            status = 'available';
                            break;
                          case 'delivered':
                            label = 'Dostarczone';
                            status = 'available';
                            break;
                          case 'cancelled':
                            label = 'Anulowane';
                            status = 'out_of_stock';
                            break;
                          default:
                            label = value;
                            status = 'default';
                        }
                        
                        return <Badge status={status}>{label}</Badge>;
                      }
                    },
                    { id: 'note', label: 'Notatka' }
                  ]} 
                  data={selectedOrder.history} 
                  pagination={null}
                />
              </>
            )}
          </DetailContainer>
        )}
      </>
    );
  };
  
  // Render usage analysis tab content
  const renderUsageTab = () => {
    if (isLoading) {
      return <LoadingIndicator>Ładowanie danych analizy zużycia...</LoadingIndicator>;
    }
    
    if (error) {
      return <ErrorMessage>{error}</ErrorMessage>;
    }
    
    if (!usageAnalysis) {
      return <div>Brak danych analizy zużycia do wyświetlenia.</div>;
    }
    
    return (
      <>
        <ButtonGroup style={{ marginBottom: '20px' }}>
          <Button onClick={handleExportCSV}>
            Eksport CSV
          </Button>
          <Button onClick={handleExportPDF}>
            Eksport PDF
          </Button>
          <Button onClick={handleToggleDataSource}>
            {useMockData ? 'Użyj API' : 'Użyj danych testowych'}
          </Button>
        </ButtonGroup>
        
        <GridSection>
          <Card title="Najczęściej wymieniane części">
            <Table 
              columns={[
                { id: 'name', label: 'Nazwa części' },
                { id: 'count', label: 'Liczba wymian' },
                { id: 'cost', label: 'Koszt całkowity', format: (value) => `${value.toFixed(2)} zł` }
              ]} 
              data={usageAnalysis.mostUsedParts} 
              pagination={null}
            />
          </Card>
          
          <Card title="Koszty części według kategorii">
            <ChartContainer>
              {/* Placeholder for chart - would be implemented with a charting library */}
              <div style={{ textAlign: 'center', paddingTop: '120px' }}>
                Wykres kosztów według kategorii części
              </div>
            </ChartContainer>
            <Table 
              columns={[
                { id: 'category', label: 'Kategoria' },
                { id: 'cost', label: 'Koszt całkowity', format: (value) => `${value.toFixed(2)} zł` },
                { id: 'percentage', label: 'Procent całości', format: (value) => `${value}%` }
              ]} 
              data={usageAnalysis.costByCategory} 
              pagination={null}
            />
          </Card>
        </GridSection>
        
        <GridSection>
          <Card title="Trendy zużycia części w czasie">
            <ChartContainer>
              {/* Placeholder for chart - would be implemented with a charting library */}
              <div style={{ textAlign: 'center', paddingTop: '120px' }}>
                Wykres trendów zużycia części w czasie
              </div>
            </ChartContainer>
            <Table 
              columns={[
                { id: 'month', label: 'Miesiąc' },
                { id: 'count', label: 'Liczba wymian' },
                { id: 'cost', label: 'Koszt całkowity', format: (value) => `${value.toFixed(2)} zł` }
              ]} 
              data={usageAnalysis.usageTrends} 
              pagination={null}
            />
          </Card>
          
          <Card title="Części według dostawców">
            <ChartContainer>
              {/* Placeholder for chart - would be implemented with a charting library */}
              <div style={{ textAlign: 'center', paddingTop: '120px' }}>
                Wykres części według dostawców
              </div>
            </ChartContainer>
            <Table 
              columns={[
                { id: 'supplier', label: 'Dostawca' },
                { id: 'count', label: 'Liczba części' },
                { id: 'percentage', label: 'Procent całości', format: (value) => `${value}%` }
              ]} 
              data={usageAnalysis.partsBySupplier} 
              pagination={null}
            />
          </Card>
        </GridSection>
      </>
    );
  };
  
  // Render compatibility tab content
  const renderCompatibilityTab = () => {
    return (
      <>
        <FilterContainer>
          <FilterGroup>
            <FilterLabel htmlFor="vehicleModel">Model pojazdu</FilterLabel>
            <FilterSelect 
              id="vehicleModel" 
              name="vehicleModel" 
              value={vehicleModel} 
              onChange={(e) => setVehicleModel(e.target.value)}
            >
              <option value="">Wybierz model</option>
              <option value="Mercedes Actros">Mercedes Actros</option>
              <option value="Mercedes Arocs">Mercedes Arocs</option>
              <option value="Mercedes Atego">Mercedes Atego</option>
              <option value="Volvo FH">Volvo FH</option>
              <option value="Volvo FM">Volvo FM</option>
              <option value="Scania R">Scania R</option>
              <option value="Scania S">Scania S</option>
            </FilterSelect>
          </FilterGroup>
          
          <FilterGroup style={{ alignSelf: 'flex-end' }}>
            <Button 
              primary 
              onClick={handleCompatibilitySearch}
              disabled={!vehicleModel}
            >
              Szukaj
            </Button>
          </FilterGroup>
          
          <ButtonGroup>
            <Button onClick={handleToggleDataSource}>
              {useMockData ? 'Użyj API' : 'Użyj danych testowych'}
            </Button>
          </ButtonGroup>
        </FilterContainer>
        
        {isLoading ? (
          <LoadingIndicator>Ładowanie kompatybilnych części...</LoadingIndicator>
        ) : error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : compatibleParts ? (
          <>
            <SectionTitle>Kompatybilne części dla modelu: {vehicleModel}</SectionTitle>
            
            <Table 
              columns={[
                { id: 'id', label: 'ID' },
                { id: 'name', label: 'Nazwa' },
                { id: 'catalogNumber', label: 'Numer katalogowy' },
                { id: 'category', label: 'Kategoria' },
                { id: 'price', label: 'Cena', format: (value) => `${value.toFixed(2)} zł` },
                { 
                  id: 'status', 
                  label: 'Status',
                  format: (value) => {
                    let label = '';
                    let status = '';
                    
                    switch(value) {
                      case 'available':
                        label = 'Dostępna';
                        status = 'available';
                        break;
                      case 'low':
                        label = 'Niski stan';
                        status = 'low';
                        break;
                      case 'ordered':
                        label = 'Zamówiona';
                        status = 'ordered';
                        break;
                      case 'out_of_stock':
                        label = 'Brak w magazynie';
                        status = 'out_of_stock';
                        break;
                      default:
                        label = value;
                        status = 'default';
                    }
                    
                    return <Badge status={status}>{label}</Badge>;
                  }
                }
              ]} 
              data={compatibleParts.compatibleParts} 
              pagination={null}
              onRowClick={handlePartSelect}
            />
            
            {selectedPart && compatibleParts.alternativeParts && compatibleParts.alternativeParts[selectedPart.id] && (
              <DetailContainer>
                <DetailTitle>Alternatywne części dla: {selectedPart.name}</DetailTitle>
                
                <Table 
                  columns={[
                    { id: 'id', label: 'ID' },
                    { id: 'name', label: 'Nazwa' },
                    { id: 'manufacturer', label: 'Producent' },
                    { id: 'price', label: 'Cena', format: (value) => `${value.toFixed(2)} zł` },
                    { 
                      id: 'compatibilityRating', 
                      label: 'Ocena kompatybilności',
                      format: (value) => {
                        const stars = '★'.repeat(Math.floor(value)) + '☆'.repeat(5 - Math.floor(value));
                        return <span style={{ color: '#f39c12' }}>{stars} ({value.toFixed(1)})</span>;
                      }
                    }
                  ]} 
                  data={compatibleParts.alternativeParts[selectedPart.id]} 
                  pagination={null}
                />
              </DetailContainer>
            )}
          </>
        ) : (
          <div>Wybierz model pojazdu, aby wyświetlić kompatybilne części.</div>
        )}
      </>
    );
  };
  
  // Render suppliers tab content
  const renderSuppliersTab = () => {
    if (isLoading) {
      return <LoadingIndicator>Ładowanie danych dostawców...</LoadingIndicator>;
    }
    
    if (error) {
      return <ErrorMessage>{error}</ErrorMessage>;
    }
    
    if (!suppliers || !suppliers.data || suppliers.data.length === 0) {
      return <div>Brak danych dostawców do wyświetlenia.</div>;
    }
    
    const columns = [
      { id: 'id', label: 'ID' },
      { id: 'name', label: 'Nazwa' },
      { id: 'contactPerson', label: 'Osoba kontaktowa' },
      { id: 'email', label: 'Email' },
      { id: 'phone', label: 'Telefon' },
      { 
        id: 'categories', 
        label: 'Kategorie',
        format: (categories) => categories.join(', ')
      },
      { 
        id: 'rating', 
        label: 'Ocena',
        format: (value) => {
          const stars = '★'.repeat(Math.floor(value)) + '☆'.repeat(5 - Math.floor(value));
          return <span style={{ color: '#f39c12' }}>{stars} ({value.toFixed(1)})</span>;
        }
      }
    ];
    
    return (
      <>
        <ButtonGroup style={{ marginBottom: '20px' }}>
          <Button onClick={handleExportCSV}>
            Eksport CSV
          </Button>
          <Button onClick={handleExportPDF}>
            Eksport PDF
          </Button>
          <Button onClick={handleToggleDataSource}>
            {useMockData ? 'Użyj API' : 'Użyj danych testowych'}
          </Button>
        </ButtonGroup>
        
        <Table 
          columns={columns} 
          data={suppliers.data} 
          pagination={suppliers.pagination}
          onRowClick={handleSupplierSelect}
          onPageChange={(page) => setFilters({ ...filters, page })}
        />
        
        {selectedSupplier && (
          <DetailContainer>
            <DetailTitle>Szczegóły dostawcy: {selectedSupplier.name}</DetailTitle>
            
            <DetailRow>
              <DetailLabel>ID:</DetailLabel>
              <DetailValue>{selectedSupplier.id}</DetailValue>
            </DetailRow>
            
            <DetailRow>
              <DetailLabel>Osoba kontaktowa:</DetailLabel>
              <DetailValue>{selectedSupplier.contactPerson}</DetailValue>
            </DetailRow>
            
            <DetailRow>
              <DetailLabel>Email:</DetailLabel>
              <DetailValue>{selectedSupplier.email}</DetailValue>
            </DetailRow>
            
            <DetailRow>
              <DetailLabel>Telefon:</DetailLabel>
              <DetailValue>{selectedSupplier.phone}</DetailValue>
            </DetailRow>
            
            {selectedSupplier.address && (
              <DetailRow>
                <DetailLabel>Adres:</DetailLabel>
                <DetailValue>{selectedSupplier.address}</DetailValue>
              </DetailRow>
            )}
            
            <DetailRow>
              <DetailLabel>Kategorie części:</DetailLabel>
              <DetailValue>{selectedSupplier.categories.join(', ')}</DetailValue>
            </DetailRow>
            
            <DetailRow>
              <DetailLabel>Ocena ogólna:</DetailLabel>
              <DetailValue>
                {(() => {
                  const stars = '★'.repeat(Math.floor(selectedSupplier.rating)) + '☆'.repeat(5 - Math.floor(selectedSupplier.rating));
                  return <span style={{ color: '#f39c12' }}>{stars} ({selectedSupplier.rating.toFixed(1)})</span>;
                })()}
              </DetailValue>
            </DetailRow>
            
            {selectedSupplier.performance && (
              <>
                <DetailTitle style={{ marginTop: '16px' }}>Ocena wydajności</DetailTitle>
                
                <DetailRow>
                  <DetailLabel>Terminowość:</DetailLabel>
                  <DetailValue>
                    {(() => {
                      const stars = '★'.repeat(Math.floor(selectedSupplier.performance.timeliness)) + '☆'.repeat(5 - Math.floor(selectedSupplier.performance.timeliness));
                      return <span style={{ color: '#f39c12' }}>{stars} ({selectedSupplier.performance.timeliness.toFixed(1)})</span>;
                    })()}
                  </DetailValue>
                </DetailRow>
                
                <DetailRow>
                  <DetailLabel>Jakość:</DetailLabel>
                  <DetailValue>
                    {(() => {
                      const stars = '★'.repeat(Math.floor(selectedSupplier.performance.quality)) + '☆'.repeat(5 - Math.floor(selectedSupplier.performance.quality));
                      return <span style={{ color: '#f39c12' }}>{stars} ({selectedSupplier.performance.quality.toFixed(1)})</span>;
                    })()}
                  </DetailValue>
                </DetailRow>
                
                <DetailRow>
                  <DetailLabel>Ceny:</DetailLabel>
                  <DetailValue>
                    {(() => {
                      const stars = '★'.repeat(Math.floor(selectedSupplier.performance.pricing)) + '☆'.repeat(5 - Math.floor(selectedSupplier.performance.pricing));
                      return <span style={{ color: '#f39c12' }}>{stars} ({selectedSupplier.performance.pricing.toFixed(1)})</span>;
                    })()}
                  </DetailValue>
                </DetailRow>
              </>
            )}
            
            {selectedSupplier.notes && (
              <>
                <DetailTitle style={{ marginTop: '16px' }}>Notatki</DetailTitle>
                <DetailRow>
                  <DetailValue>{selectedSupplier.notes}</DetailValue>
                </DetailRow>
              </>
            )}
            
            {selectedSupplier.orderHistory && selectedSupplier.orderHistory.length > 0 && (
              <>
                <DetailTitle style={{ marginTop: '16px' }}>Historia zamówień</DetailTitle>
                
                <Table 
                  columns={[
                    { id: 'date', label: 'Data' },
                    { id: 'orderId', label: 'ID zamówienia' },
                    { id: 'itemCount', label: 'Liczba pozycji' },
                    { id: 'totalCost', label: 'Koszt całkowity', format: (value) => `${value.toFixed(2)} zł` },
                    { 
                      id: 'status', 
                      label: 'Status',
                      format: (value) => {
                        let label = '';
                        let status = '';
                        
                        switch(value) {
                          case 'pending':
                            label = 'Oczekujące';
                            status = 'ordered';
                            break;
                          case 'processing':
                            label = 'W realizacji';
                            status = 'ordered';
                            break;
                          case 'shipped':
                            label = 'Wysłane';
                            status = 'available';
                            break;
                          case 'delivered':
                            label = 'Dostarczone';
                            status = 'available';
                            break;
                          case 'cancelled':
                            label = 'Anulowane';
                            status = 'out_of_stock';
                            break;
                          default:
                            label = value;
                            status = 'default';
                        }
                        
                        return <Badge status={status}>{label}</Badge>;
                      }
                    }
                  ]} 
                  data={selectedSupplier.orderHistory} 
                  pagination={null}
                />
              </>
            )}
          </DetailContainer>
        )}
      </>
    );
  };
  
  // Render main content
  const renderContent = () => {
    switch(activeTab) {
      case 'inventory':
        return renderInventoryTab();
      case 'orders':
        return renderOrdersTab();
      case 'usage':
        return renderUsageTab();
      case 'compatibility':
        return renderCompatibilityTab();
      case 'suppliers':
        return renderSuppliersTab();
      default:
        return renderInventoryTab();
    }
  };
  
  // Debug output
  console.log('Current tab:', activeTab);
  console.log('Using mock data:', useMockData);
  console.log('Parts data:', parts);
  console.log('Orders data:', orders);
  console.log('Usage data:', usageAnalysis);
  console.log('Compatible parts data:', compatibleParts);
  console.log('Suppliers data:', suppliers);
  
  return (
    <PageContainer>
      <SectionTitle>Zarządzanie częściami</SectionTitle>
      
      <TabsContainer>
        <Tab 
          active={activeTab === 'inventory'} 
          onClick={() => setActiveTab('inventory')}
        >
          Inwentarz części
        </Tab>
        <Tab 
          active={activeTab === 'orders'} 
          onClick={() => setActiveTab('orders')}
        >
          Zarządzanie zamówieniami
        </Tab>
        <Tab 
          active={activeTab === 'usage'} 
          onClick={() => setActiveTab('usage')}
        >
          Analiza zużycia
        </Tab>
        <Tab 
          active={activeTab === 'compatibility'} 
          onClick={() => setActiveTab('compatibility')}
        >
          Kompatybilność części
        </Tab>
        <Tab 
          active={activeTab === 'suppliers'} 
          onClick={() => setActiveTab('suppliers')}
        >
          Dostawcy
        </Tab>
      </TabsContainer>
      
      {renderContent()}
    </PageContainer>
  );
};

export default VehicleParts;
