import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Pie, Bar, Line } from 'react-chartjs-2';
import Card from '../components/common/Card';
import Table from '../components/common/Table';
import partsService from '../services/api/partsService';
import mockPartsService from '../services/api/mockPartsService';

// Register ChartJS components
ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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
  padding: 20px;
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
  overflow-x: auto;
  
  &::-webkit-scrollbar {
    height: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 2px;
  }
`;

const Tab = styled.div`
  padding: 12px 24px;
  cursor: pointer;
  font-weight: ${props => props.active ? '500' : 'normal'};
  color: ${props => props.active ? '#3f51b5' : '#666'};
  border-bottom: 2px solid ${props => props.active ? '#3f51b5' : 'transparent'};
  transition: all 0.3s ease;
  white-space: nowrap;
  
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
  position: relative;
`;

const LoadingIndicator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: #666;
  font-size: 16px;
`;

const ErrorMessage = styled.div`
  padding: 16px;
  background-color: #ffebee;
  color: #c62828;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const DetailContainer = styled.div`
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  margin-top: 20px;
`;

const DetailTitle = styled.h3`
  font-size: 18px;
  font-weight: 500;
  color: #333;
  margin: 0 0 16px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid #e0e0e0;
`;

const DetailRow = styled.div`
  display: flex;
  margin-bottom: 12px;
`;

const DetailLabel = styled.div`
  width: 200px;
  font-weight: 500;
  color: #666;
`;

const DetailValue = styled.div`
  flex: 1;
  color: #333;
`;

const Badge = styled.span`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  
  background-color: ${props => {
    switch(props.status) {
      case 'available': return '#e8f5e9';
      case 'low': return '#fff8e1';
      case 'ordered': return '#e3f2fd';
      case 'out_of_stock': return '#ffebee';
      case 'pending': return '#fff8e1';
      case 'processing': return '#e3f2fd';
      case 'shipped': return '#e8f5e9';
      case 'delivered': return '#e0f2f1';
      case 'cancelled': return '#ffebee';
      default: return '#f5f5f5';
    }
  }};
  
  color: ${props => {
    switch(props.status) {
      case 'available': return '#2e7d32';
      case 'low': return '#ff9800';
      case 'ordered': return '#1976d2';
      case 'out_of_stock': return '#c62828';
      case 'pending': return '#ff9800';
      case 'processing': return '#1976d2';
      case 'shipped': return '#2e7d32';
      case 'delivered': return '#00897b';
      case 'cancelled': return '#c62828';
      default: return '#757575';
    }
  }};
`;

const SupplierCard = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }
`;

const SupplierName = styled.h3`
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin: 0 0 8px 0;
`;

const SupplierRating = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 8px;
  
  span {
    color: #ff9800;
    font-weight: 500;
  }
`;

const SupplierInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: #666;
`;

const SupplierContact = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SupplierCategories = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
`;

const CategoryTag = styled.span`
  padding: 4px 8px;
  background-color: #e0e0e0;
  border-radius: 4px;
  font-size: 12px;
  color: #333;
`;

const PerformanceMetric = styled.div`
  margin-bottom: 12px;
`;

const MetricLabel = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
  
  span:first-child {
    color: #666;
  }
  
  span:last-child {
    font-weight: 500;
    color: #333;
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
  const handlePartSelect = async (index) => {
    try {
      const service = useMockData ? mockPartsService : partsService;
      const partId = parts.data[index].id;
      const partDetails = await service.getPartDetails(partId);
      setSelectedPart(partDetails);
    } catch (err) {
      console.error('Error fetching part details:', err);
      setError('Nie udało się pobrać szczegółów części.');
    }
  };
  
  // Get order details
  const handleOrderSelect = async (index) => {
    try {
      const service = useMockData ? mockPartsService : partsService;
      const orderId = orders.data[index].id;
      const orderDetails = await service.getOrderDetails(orderId);
      setSelectedOrder(orderDetails);
    } catch (err) {
      console.error('Error fetching order details:', err);
      setError('Nie udało się pobrać szczegółów zamówienia.');
    }
  };
  
  // Get supplier details
  const handleSupplierSelect = async (index) => {
    try {
      const service = useMockData ? mockPartsService : partsService;
      const supplierId = suppliers.data[index].id;
      const supplierDetails = await service.getSupplierDetails(supplierId);
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
    
    const headers = [
      'ID', 'Nazwa', 'Numer katalogowy', 'Ilość', 'Min. poziom', 
      'Cena jedn.', 'Dostawca', 'Status'
    ];
    
    const formattedData = parts.data.map(part => [
      part.id,
      part.name,
      part.catalogNumber,
      part.quantity,
      part.minLevel,
      `${part.price.toFixed(2)} zł`,
      part.supplier,
      <Badge status={part.status}>
        {part.status === 'available' ? 'Dostępna' : 
         part.status === 'low' ? 'Niski stan' : 
         part.status === 'ordered' ? 'Zamówiona' : 
         part.status === 'out_of_stock' ? 'Brak w magazynie' : 
         part.status}
      </Badge>
    ]);
    
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
              placeholder="Nazwa, numer katalogowy..."
            />
          </FilterGroup>
          
          <ButtonGroup>
            <Button onClick={handleSearch}>Szukaj</Button>
            <Button onClick={handleExportCSV}>Eksport CSV</Button>
          </ButtonGroup>
        </FilterContainer>
        
        <Table 
          headers={headers}
          data={formattedData}
          onRowClick={handlePartSelect}
          emptyMessage="Brak części spełniających kryteria wyszukiwania."
        />
        
        {selectedPart && (
          <DetailContainer>
            <DetailTitle>Szczegóły części: {selectedPart.name}</DetailTitle>
            
            <DetailRow>
              <DetailLabel>ID:</DetailLabel>
              <DetailValue>{selectedPart.id}</DetailValue>
            </DetailRow>
            
            <DetailRow>
              <DetailLabel>Nazwa:</DetailLabel>
              <DetailValue>{selectedPart.name}</DetailValue>
            </DetailRow>
            
            <DetailRow>
              <DetailLabel>Numer katalogowy:</DetailLabel>
              <DetailValue>{selectedPart.catalogNumber}</DetailValue>
            </DetailRow>
            
            <DetailRow>
              <DetailLabel>Kategoria:</DetailLabel>
              <DetailValue>{selectedPart.category}</DetailValue>
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
              <DetailLabel>Minimalny poziom:</DetailLabel>
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
              <DetailLabel>Lokalizacja:</DetailLabel>
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
              <DetailRow>
                <DetailLabel>Specyfikacja techniczna:</DetailLabel>
                <DetailValue>{selectedPart.technicalSpecs}</DetailValue>
              </DetailRow>
            )}
            
            <ButtonGroup style={{ marginTop: '16px' }}>
              <Button>Zamów</Button>
              <Button>Edytuj</Button>
              <Button onClick={() => setSelectedPart(null)}>Zamknij</Button>
            </ButtonGroup>
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
    
    const headers = [
      'ID zamówienia', 'Data zamówienia', 'Dostawca', 'Liczba pozycji', 
      'Wartość', 'Status', 'Przewidywana dostawa'
    ];
    
    const formattedData = orders.data.map(order => [
      order.id,
      order.date,
      order.supplier,
      order.itemCount,
      `${order.totalCost.toFixed(2)} zł`,
      <Badge status={order.status}>
        {order.status === 'pending' ? 'Oczekujące' : 
         order.status === 'processing' ? 'W realizacji' : 
         order.status === 'shipped' ? 'Wysłane' : 
         order.status === 'delivered' ? 'Dostarczone' : 
         order.status === 'cancelled' ? 'Anulowane' : 
         order.status}
      </Badge>,
      order.estimatedDelivery
    ]);
    
    return (
      <>
        <FilterContainer>
          <FilterGroup>
            <FilterLabel htmlFor="orderStatus">Status</FilterLabel>
            <FilterSelect 
              id="orderStatus" 
              name="orderStatus" 
              value={filters.orderStatus || 'all'} 
              onChange={handleFilterChange}
            >
              <option value="all">Wszystkie</option>
              <option value="pending">Oczekujące</option>
              <option value="processing">W realizacji</option>
              <option value="shipped">Wysłane</option>
              <option value="delivered">Dostarczone</option>
              <option value="cancelled">Anulowane</option>
            </FilterSelect>
          </FilterGroup>
          
          <FilterGroup>
            <FilterLabel htmlFor="orderSupplier">Dostawca</FilterLabel>
            <FilterSelect 
              id="orderSupplier" 
              name="orderSupplier" 
              value={filters.orderSupplier || 'all'} 
              onChange={handleFilterChange}
            >
              <option value="all">Wszyscy</option>
              <option value="bosch">Bosch</option>
              <option value="mann-filter">Mann-Filter</option>
              <option value="valeo">Valeo</option>
              <option value="sachs">Sachs</option>
              <option value="continental">Continental</option>
              <option value="varta">Varta</option>
            </FilterSelect>
          </FilterGroup>
          
          <FilterGroup>
            <FilterLabel htmlFor="orderSearch">Wyszukaj</FilterLabel>
            <FilterInput 
              type="text" 
              id="orderSearch" 
              name="orderSearch" 
              value={filters.orderSearch || ''} 
              onChange={handleFilterChange} 
              placeholder="ID zamówienia..."
            />
          </FilterGroup>
          
          <ButtonGroup>
            <Button onClick={handleSearch}>Szukaj</Button>
            <Button onClick={handleExportCSV}>Eksport CSV</Button>
          </ButtonGroup>
        </FilterContainer>
        
        <Table 
          headers={headers}
          data={formattedData}
          onRowClick={handleOrderSelect}
          emptyMessage="Brak zamówień spełniających kryteria wyszukiwania."
        />
        
        {selectedOrder && (
          <DetailContainer>
            <DetailTitle>Szczegóły zamówienia: {selectedOrder.id}</DetailTitle>
            
            <DetailRow>
              <DetailLabel>ID zamówienia:</DetailLabel>
              <DetailValue>{selectedOrder.id}</DetailValue>
            </DetailRow>
            
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
                <Badge status={selectedOrder.status}>
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
              <DetailLabel>Przewidywana dostawa:</DetailLabel>
              <DetailValue>{selectedOrder.estimatedDelivery}</DetailValue>
            </DetailRow>
            
            <DetailRow>
              <DetailLabel>Uwagi:</DetailLabel>
              <DetailValue>{selectedOrder.notes || 'Brak uwag'}</DetailValue>
            </DetailRow>
            
            <SectionTitle style={{ marginTop: '24px' }}>Pozycje zamówienia</SectionTitle>
            
            <Table 
              headers={['ID części', 'Nazwa', 'Ilość', 'Cena jedn.', 'Wartość']}
              data={selectedOrder.items.map(item => [
                item.partId,
                item.name,
                item.quantity,
                `${item.unitPrice.toFixed(2)} zł`,
                `${item.totalPrice.toFixed(2)} zł`
              ])}
              emptyMessage="Brak pozycji w zamówieniu."
            />
            
            <DetailRow style={{ marginTop: '16px', justifyContent: 'flex-end' }}>
              <DetailLabel>Wartość całkowita:</DetailLabel>
              <DetailValue style={{ fontWeight: '500' }}>{selectedOrder.totalCost.toFixed(2)} zł</DetailValue>
            </DetailRow>
            
            <ButtonGroup style={{ marginTop: '16px' }}>
              <Button>Edytuj</Button>
              <Button>Drukuj</Button>
              <Button onClick={() => setSelectedOrder(null)}>Zamknij</Button>
            </ButtonGroup>
          </DetailContainer>
        )}
      </>
    );
  };
  
  // Render usage analysis tab content
  const renderUsageAnalysisTab = () => {
    if (isLoading) {
      return <LoadingIndicator>Ładowanie danych analizy zużycia...</LoadingIndicator>;
    }
    
    if (error) {
      return <ErrorMessage>{error}</ErrorMessage>;
    }
    
    if (!usageAnalysis) {
      return <div>Brak danych analizy zużycia do wyświetlenia.</div>;
    }
    
    // Prepare chart data
    const mostUsedPartsData = {
      labels: usageAnalysis.mostUsedParts.map(part => part.name),
      datasets: [
        {
          data: usageAnalysis.mostUsedParts.map(part => part.percentage),
          backgroundColor: [
            '#4caf50', '#2196f3', '#ff9800', '#f44336', '#9c27b0',
            '#00bcd4', '#ffeb3b', '#795548', '#607d8b', '#e91e63'
          ],
          borderWidth: 1
        }
      ]
    };
    
    const costByCategoryData = {
      labels: usageAnalysis.costByCategory.map(category => category.category),
      datasets: [
        {
          data: usageAnalysis.costByCategory.map(category => category.percentage),
          backgroundColor: [
            '#4caf50', '#2196f3', '#ff9800', '#f44336', '#9c27b0',
            '#00bcd4', '#ffeb3b', '#795548', '#607d8b', '#e91e63'
          ],
          borderWidth: 1
        }
      ]
    };
    
    const usageTrendsData = {
      labels: usageAnalysis.usageTrends.map(trend => trend.month),
      datasets: [
        {
          label: 'Liczba użytych części',
          data: usageAnalysis.usageTrends.map(trend => trend.count),
          borderColor: '#2196f3',
          backgroundColor: 'rgba(33, 150, 243, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4
        }
      ]
    };
    
    const partsBySupplierData = {
      labels: usageAnalysis.partsBySupplier.map(supplier => supplier.supplier),
      datasets: [
        {
          data: usageAnalysis.partsBySupplier.map(supplier => supplier.percentage),
          backgroundColor: [
            '#4caf50', '#2196f3', '#ff9800', '#f44336', '#9c27b0',
            '#00bcd4', '#ffeb3b', '#795548', '#607d8b', '#e91e63'
          ],
          borderWidth: 1
        }
      ]
    };
    
    // Chart options
    const pieOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
          labels: {
            boxWidth: 15,
            padding: 15
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.label}: ${context.raw}%`;
            }
          }
        }
      }
    };
    
    const lineOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top'
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    };
    
    return (
      <>
        <GridSection>
          <Card title="Najczęściej używane części">
            <ChartContainer>
              <Pie data={mostUsedPartsData} options={pieOptions} />
            </ChartContainer>
          </Card>
          
          <Card title="Koszty według kategorii">
            <ChartContainer>
              <Pie data={costByCategoryData} options={pieOptions} />
            </ChartContainer>
          </Card>
        </GridSection>
        
        <Card title="Trendy zużycia części w czasie">
          <ChartContainer>
            <Line data={usageTrendsData} options={lineOptions} />
          </ChartContainer>
        </Card>
        
        <Card title="Podział części według dostawcy">
          <ChartContainer>
            <Pie data={partsBySupplierData} options={pieOptions} />
          </ChartContainer>
        </Card>
        
        <Card title="Szczegółowe dane zużycia części">
          <Table 
            headers={['Nazwa części', 'Liczba użyć', 'Udział procentowy']}
            data={usageAnalysis.mostUsedParts.map(part => [
              part.name,
              part.count,
              `${part.percentage}%`
            ])}
            emptyMessage="Brak danych szczegółowych."
          />
        </Card>
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
          
          <ButtonGroup>
            <Button onClick={handleCompatibilitySearch} disabled={!vehicleModel}>Szukaj</Button>
          </ButtonGroup>
        </FilterContainer>
        
        {isLoading ? (
          <LoadingIndicator>Ładowanie kompatybilnych części...</LoadingIndicator>
        ) : error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : !vehicleModel ? (
          <div>Wybierz model pojazdu, aby wyświetlić kompatybilne części.</div>
        ) : !compatibleParts ? (
          <div>Brak danych kompatybilności dla wybranego modelu.</div>
        ) : (
          <>
            <Card title={`Kompatybilne części dla ${vehicleModel}`}>
              <Table 
                headers={['ID', 'Nazwa', 'Numer katalogowy', 'Kategoria', 'Cena', 'Status']}
                data={compatibleParts.parts.map(part => [
                  part.id,
                  part.name,
                  part.catalogNumber,
                  part.category,
                  `${part.price.toFixed(2)} zł`,
                  <Badge status={part.status}>
                    {part.status === 'available' ? 'Dostępna' : 
                     part.status === 'low' ? 'Niski stan' : 
                     part.status === 'ordered' ? 'Zamówiona' : 
                     part.status === 'out_of_stock' ? 'Brak w magazynie' : 
                     part.status}
                  </Badge>
                ])}
                emptyMessage={`Brak kompatybilnych części dla ${vehicleModel}.`}
              />
            </Card>
            
            {compatibleParts.alternativeParts && compatibleParts.alternativeParts.length > 0 && (
              <Card title="Części alternatywne" style={{ marginTop: '20px' }}>
                <Table 
                  headers={['ID', 'Nazwa', 'Numer katalogowy', 'Kategoria', 'Kompatybilność', 'Cena', 'Status']}
                  data={compatibleParts.alternativeParts.map(part => [
                    part.id,
                    part.name,
                    part.catalogNumber,
                    part.category,
                    `${part.compatibility}%`,
                    `${part.price.toFixed(2)} zł`,
                    <Badge status={part.status}>
                      {part.status === 'available' ? 'Dostępna' : 
                       part.status === 'low' ? 'Niski stan' : 
                       part.status === 'ordered' ? 'Zamówiona' : 
                       part.status === 'out_of_stock' ? 'Brak w magazynie' : 
                       part.status}
                    </Badge>
                  ])}
                  emptyMessage="Brak części alternatywnych."
                />
              </Card>
            )}
          </>
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
    
    return (
      <>
        <FilterContainer>
          <FilterGroup>
            <FilterLabel htmlFor="supplierSearch">Wyszukaj dostawcę</FilterLabel>
            <FilterInput 
              type="text" 
              id="supplierSearch" 
              name="supplierSearch" 
              value={filters.supplierSearch || ''} 
              onChange={handleFilterChange} 
              placeholder="Nazwa dostawcy..."
            />
          </FilterGroup>
          
          <ButtonGroup>
            <Button onClick={handleSearch}>Szukaj</Button>
            <Button>Dodaj dostawcę</Button>
          </ButtonGroup>
        </FilterContainer>
        
        <GridSection>
          {suppliers.data.map((supplier, index) => (
            <SupplierCard key={supplier.id} onClick={() => handleSupplierSelect(index)}>
              <SupplierName>{supplier.name}</SupplierName>
              
              <SupplierRating>
                <span>{supplier.rating}</span> / 5.0
              </SupplierRating>
              
              <SupplierInfo>
                <SupplierContact>
                  <span>Kontakt:</span> {supplier.contactPerson}
                </SupplierContact>
                
                <SupplierContact>
                  <span>Email:</span> {supplier.email}
                </SupplierContact>
                
                <SupplierContact>
                  <span>Telefon:</span> {supplier.phone}
                </SupplierContact>
                
                <SupplierContact>
                  <span>Liczba kategorii:</span> {supplier.categoryCount}
                </SupplierContact>
              </SupplierInfo>
            </SupplierCard>
          ))}
        </GridSection>
        
        {selectedSupplier && (
          <DetailContainer>
            <DetailTitle>Szczegóły dostawcy: {selectedSupplier.name}</DetailTitle>
            
            <DetailRow>
              <DetailLabel>ID:</DetailLabel>
              <DetailValue>{selectedSupplier.id}</DetailValue>
            </DetailRow>
            
            <DetailRow>
              <DetailLabel>Nazwa:</DetailLabel>
              <DetailValue>{selectedSupplier.name}</DetailValue>
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
            
            <DetailRow>
              <DetailLabel>Adres:</DetailLabel>
              <DetailValue>{selectedSupplier.address}</DetailValue>
            </DetailRow>
            
            <DetailRow>
              <DetailLabel>Kategorie:</DetailLabel>
              <DetailValue>
                <SupplierCategories>
                  {selectedSupplier.categories.map((category, index) => (
                    <CategoryTag key={index}>{category}</CategoryTag>
                  ))}
                </SupplierCategories>
              </DetailValue>
            </DetailRow>
            
            <DetailRow>
              <DetailLabel>Ocena ogólna:</DetailLabel>
              <DetailValue>{selectedSupplier.rating} / 5.0</DetailValue>
            </DetailRow>
            
            <SectionTitle style={{ marginTop: '24px' }}>Oceny wydajności</SectionTitle>
            
            <PerformanceMetric>
              <MetricLabel>
                <span>Terminowość dostaw:</span>
                <span>{selectedSupplier.performance.timeliness} / 5.0</span>
              </MetricLabel>
              <div style={{ 
                height: '8px', 
                backgroundColor: '#e0e0e0', 
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div style={{ 
                  width: `${(selectedSupplier.performance.timeliness / 5) * 100}%`, 
                  height: '100%', 
                  backgroundColor: '#2196f3',
                  borderRadius: '4px'
                }} />
              </div>
            </PerformanceMetric>
            
            <PerformanceMetric>
              <MetricLabel>
                <span>Jakość produktów:</span>
                <span>{selectedSupplier.performance.quality} / 5.0</span>
              </MetricLabel>
              <div style={{ 
                height: '8px', 
                backgroundColor: '#e0e0e0', 
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div style={{ 
                  width: `${(selectedSupplier.performance.quality / 5) * 100}%`, 
                  height: '100%', 
                  backgroundColor: '#4caf50',
                  borderRadius: '4px'
                }} />
              </div>
            </PerformanceMetric>
            
            <PerformanceMetric>
              <MetricLabel>
                <span>Konkurencyjność cenowa:</span>
                <span>{selectedSupplier.performance.pricing} / 5.0</span>
              </MetricLabel>
              <div style={{ 
                height: '8px', 
                backgroundColor: '#e0e0e0', 
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div style={{ 
                  width: `${(selectedSupplier.performance.pricing / 5) * 100}%`, 
                  height: '100%', 
                  backgroundColor: '#ff9800',
                  borderRadius: '4px'
                }} />
              </div>
            </PerformanceMetric>
            
            <SectionTitle style={{ marginTop: '24px' }}>Historia zamówień</SectionTitle>
            
            <Table 
              headers={['Data', 'ID zamówienia', 'Liczba pozycji', 'Wartość', 'Status']}
              data={selectedSupplier.orderHistory.map(order => [
                order.date,
                order.orderId,
                order.itemCount,
                `${order.totalCost.toFixed(2)} zł`,
                <Badge status={order.status}>
                  {order.status === 'pending' ? 'Oczekujące' : 
                   order.status === 'processing' ? 'W realizacji' : 
                   order.status === 'shipped' ? 'Wysłane' : 
                   order.status === 'delivered' ? 'Dostarczone' : 
                   order.status === 'cancelled' ? 'Anulowane' : 
                   order.status}
                </Badge>
              ])}
              emptyMessage="Brak historii zamówień."
            />
            
            {selectedSupplier.notes && (
              <DetailRow style={{ marginTop: '16px' }}>
                <DetailLabel>Uwagi:</DetailLabel>
                <DetailValue>{selectedSupplier.notes}</DetailValue>
              </DetailRow>
            )}
            
            <ButtonGroup style={{ marginTop: '16px' }}>
              <Button>Edytuj</Button>
              <Button>Nowe zamówienie</Button>
              <Button onClick={() => setSelectedSupplier(null)}>Zamknij</Button>
            </ButtonGroup>
          </DetailContainer>
        )}
      </>
    );
  };
  
  return (
    <PageContainer>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <SectionTitle>Zarządzanie częściami</SectionTitle>
        
        <Button onClick={handleToggleDataSource}>
          {useMockData ? 'Używam danych mockowych' : 'Używam danych API'}
        </Button>
      </div>
      
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
          Kompatybilne części
        </Tab>
        
        <Tab 
          active={activeTab === 'suppliers'} 
          onClick={() => setActiveTab('suppliers')}
        >
          Dostawcy
        </Tab>
      </TabsContainer>
      
      {activeTab === 'inventory' && renderInventoryTab()}
      {activeTab === 'orders' && renderOrdersTab()}
      {activeTab === 'usage' && renderUsageAnalysisTab()}
      {activeTab === 'compatibility' && renderCompatibilityTab()}
      {activeTab === 'suppliers' && renderSuppliersTab()}
    </PageContainer>
  );
};

export default VehicleParts;
