import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Card from '../components/common/Card';
import Table from '../components/common/Table';
import KPICard from '../components/common/KPICard';
import fleetManagementService from '../services/api/fleetManagementService';
import mockFleetManagementService from '../services/api/mockFleetManagementService';

// Styled components
const PageContainer = styled.div`
  padding: 20px;
`;

const PageTitle = styled.h1`
  font-size: 24px;
  font-weight: 500;
  color: #333;
  margin: 0 0 20px 0;
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

const KPIContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 20px;
  padding: 16px;
  background-color: #f9f9f9;
  border-radius: 4px;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 200px;
`;

const FilterLabel = styled.label`
  font-size: 14px;
  margin-bottom: 4px;
  color: #666;
`;

const FilterSelect = styled.select`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
`;

const FilterInput = styled.input`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
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

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
`;

const PaginationInfo = styled.div`
  font-size: 14px;
  color: #666;
`;

const PaginationButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const LoadingIndicator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: #666;
`;

const ErrorMessage = styled.div`
  padding: 16px;
  background-color: #ffebee;
  color: #c62828;
  border-radius: 4px;
  margin-bottom: 20px;
`;

const DataToggleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ToggleLabel = styled.span`
  font-size: 14px;
  color: #666;
`;

const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 48px;
  height: 24px;
  margin: 0 8px;
  
  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: .4s;
    border-radius: 24px;
    
    &:before {
      position: absolute;
      content: "";
      height: 18px;
      width: 18px;
      left: 3px;
      bottom: 3px;
      background-color: white;
      transition: .4s;
      border-radius: 50%;
    }
  }
  
  input:checked + span {
    background-color: #3f51b5;
  }
  
  input:checked + span:before {
    transform: translateX(24px);
  }
`;

/**
 * Fleet Management page component
 * @returns {JSX.Element} Fleet Management component
 */
const FleetManagement = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState('inventory');
  
  // State for data
  const [vehicles, setVehicles] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [fuelData, setFuelData] = useState(null);
  const [performanceData, setPerformanceData] = useState(null);
  const [serviceHistory, setServiceHistory] = useState(null);
  const [documents, setDocuments] = useState(null);
  const [assets, setAssets] = useState(null);
  const [routeData, setRouteData] = useState(null);
  const [kpiData, setKpiData] = useState(null);
  
  // State for UI
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [useMockData, setUseMockData] = useState(true);
  
  // State for filters
  const [filters, setFilters] = useState({
    status: 'all',
    type: 'all',
    search: '',
    page: 1,
    limit: 10
  });
  
  // Get service based on mock data toggle
  const service = useMockData ? mockFleetManagementService : fleetManagementService;
  
  // Fetch fleet data
  const fetchFleetData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Fetch data based on active tab
      const kpiResponse = await service.getFleetKPIs();
      setKpiData(kpiResponse);
      
      switch (activeTab) {
        case 'inventory':
          const vehiclesResponse = await service.getVehicles(filters);
          setVehicles(vehiclesResponse);
          break;
        case 'fuel':
          const fuelResponse = await service.getFuelConsumption(filters);
          setFuelData(fuelResponse);
          break;
        case 'performance':
          const performanceResponse = await service.getVehiclePerformance(filters);
          setPerformanceData(performanceResponse);
          break;
        case 'service':
          const serviceResponse = await service.getServiceHistory(filters);
          setServiceHistory(serviceResponse);
          break;
        case 'documents':
          const documentsResponse = await service.getDocuments(filters);
          setDocuments(documentsResponse);
          break;
        case 'assets':
          const assetsResponse = await service.getNonVehicleAssets(filters);
          setAssets(assetsResponse);
          break;
        case 'routes':
          const routesResponse = await service.getRouteOptimization(filters);
          setRouteData(routesResponse);
          break;
        default:
          const defaultResponse = await service.getVehicles(filters);
          setVehicles(defaultResponse);
      }
    } catch (err) {
      console.error('Error fetching fleet data:', err);
      setError('Wystąpił błąd podczas pobierania danych. Spróbuj ponownie później.');
    } finally {
      setIsLoading(false);
    }
  }, [activeTab, filters, service]);
  
  // Fetch vehicle details
  const fetchVehicleDetails = useCallback(async (vehicleId) => {
    setIsLoading(true);
    
    try {
      const vehicleDetails = await service.getVehicleDetails(vehicleId);
      setSelectedVehicle(vehicleDetails);
    } catch (err) {
      console.error('Error fetching vehicle details:', err);
    } finally {
      setIsLoading(false);
    }
  }, [service]);
  
  // Fetch data on component mount and when filters or mock data toggle changes
  useEffect(() => {
    fetchFleetData();
  }, [fetchFleetData]);
  
  // Fetch data when active tab changes
  useEffect(() => {
    fetchFleetData();
  }, [activeTab, fetchFleetData]);
  
  // Fetch vehicle details when selected vehicle changes
  useEffect(() => {
    if (selectedVehicle && selectedVehicle.id) {
      fetchVehicleDetails(selectedVehicle.id);
    }
  }, [selectedVehicle, fetchVehicleDetails]);
  
  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedVehicle(null);
  };
  
  // Handle filter change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle search
  const handleSearch = () => {
    setFilters(prev => ({
      ...prev,
      page: 1
    }));
    fetchFleetData();
  };
  
  // Handle page change
  const handlePageChange = (newPage) => {
    setFilters(prev => ({
      ...prev,
      page: newPage
    }));
  };
  
  // Handle vehicle selection
  const handleVehicleSelect = (vehicle) => {
    setSelectedVehicle(vehicle);
  };
  
  // Render data toggle
  const renderDataToggle = () => {
    return (
      <DataToggleContainer>
        <ToggleLabel>Użyj danych testowych:</ToggleLabel>
        <ToggleSwitch>
          <input 
            type="checkbox" 
            checked={useMockData} 
            onChange={() => setUseMockData(!useMockData)} 
          />
          <span />
        </ToggleSwitch>
        <ToggleLabel style={{ marginLeft: '12px' }}>
          {useMockData ? 'Włączone' : 'Wyłączone'}
        </ToggleLabel>
      </DataToggleContainer>
    );
  };
  
  // Render KPI cards
  const renderKPICards = () => {
    if (!kpiData) return null;
    
    return (
      <KPIContainer>
        <KPICard 
          title="Aktywne pojazdy" 
          value={kpiData.activeVehicles} 
          trend={kpiData.activeVehiclesTrend} 
        />
        <KPICard 
          title="Średni przebieg" 
          value={`${kpiData.averageMileage} km`} 
          trend={kpiData.averageMileageTrend} 
        />
        <KPICard 
          title="Średnie zużycie paliwa" 
          value={`${kpiData.averageFuelConsumption} l/100km`} 
          trend={kpiData.averageFuelConsumptionTrend} 
          trendInverted={true}
        />
        <KPICard 
          title="Pojazdy wymagające serwisu" 
          value={kpiData.vehiclesNeedingService} 
          trend={kpiData.vehiclesNeedingServiceTrend} 
          trendInverted={true}
        />
      </KPIContainer>
    );
  };
  
  // Render filters
  const renderFilters = () => {
    return (
      <FilterContainer>
        <FilterGroup>
          <FilterLabel htmlFor="status">Status</FilterLabel>
          <FilterSelect 
            id="status" 
            name="status" 
            value={filters.status} 
            onChange={handleFilterChange}
          >
            <option value="all">Wszystkie</option>
            <option value="active">Aktywny</option>
            <option value="inactive">Nieaktywny</option>
            <option value="maintenance">W serwisie</option>
          </FilterSelect>
        </FilterGroup>
        <FilterGroup>
          <FilterLabel htmlFor="type">Typ pojazdu</FilterLabel>
          <FilterSelect 
            id="type" 
            name="type" 
            value={filters.type} 
            onChange={handleFilterChange}
          >
            <option value="all">Wszystkie</option>
            <option value="truck">Ciężarówka</option>
            <option value="van">Dostawczy</option>
            <option value="car">Osobowy</option>
            <option value="special">Specjalny</option>
          </FilterSelect>
        </FilterGroup>
        <FilterGroup>
          <FilterLabel htmlFor="search">Wyszukaj</FilterLabel>
          <div style={{ display: 'flex', gap: '8px' }}>
            <FilterInput 
              id="search" 
              name="search" 
              value={filters.search} 
              onChange={handleFilterChange}
              placeholder="Numer, model, marka..."
            />
            <Button primary onClick={handleSearch}>Szukaj</Button>
          </div>
        </FilterGroup>
      </FilterContainer>
    );
  };
  
  // Render vehicles table
  const renderVehiclesTable = () => {
    if (!vehicles || !vehicles.vehicles) return null;
    
    const columns = [
      { key: 'id', label: 'ID' },
      { key: 'make', label: 'Marka' },
      { key: 'model', label: 'Model' },
      { key: 'year', label: 'Rok produkcji' },
      { key: 'registrationNumber', label: 'Numer rejestracyjny' },
      { key: 'status', label: 'Status' },
      { key: 'mileage', label: 'Przebieg (km)' },
      { key: 'lastService', label: 'Ostatni serwis' }
    ];
    
    const formatStatus = (status) => {
      switch (status) {
        case 'active':
          return <span style={{ color: '#4caf50' }}>Aktywny</span>;
        case 'inactive':
          return <span style={{ color: '#f44336' }}>Nieaktywny</span>;
        case 'maintenance':
          return <span style={{ color: '#ff9800' }}>W serwisie</span>;
        default:
          return status;
      }
    };
    
    const data = vehicles.vehicles.map(vehicle => [
      vehicle.id,
      vehicle.make,
      vehicle.model,
      vehicle.year,
      vehicle.registrationNumber,
      formatStatus(vehicle.status),
      vehicle.mileage.toLocaleString(),
      vehicle.lastService
    ]);
    
    return (
      <Card>
        <Table 
          headers={columns.map(col => col.label)} 
          data={data} 
          onRowClick={(rowIndex) => handleVehicleSelect(vehicles.vehicles[rowIndex])}
          isLoading={isLoading}
        />
        <PaginationContainer>
          <PaginationInfo>
            Pokazuje {(filters.page - 1) * filters.limit + 1} - {Math.min(filters.page * filters.limit, vehicles.total)} z {vehicles.total} pojazdów
          </PaginationInfo>
          <PaginationButtons>
            <Button 
              onClick={() => handlePageChange(filters.page - 1)} 
              disabled={filters.page === 1}
            >
              Poprzednia
            </Button>
            <Button 
              onClick={() => handlePageChange(filters.page + 1)} 
              disabled={filters.page * filters.limit >= vehicles.total}
            >
              Następna
            </Button>
          </PaginationButtons>
        </PaginationContainer>
      </Card>
    );
  };
  
  // Render fuel consumption comparison
  const renderFuelConsumption = () => {
    if (!fuelData || !fuelData.vehicles) return null;
    
    const columns = [
      { key: 'id', label: 'ID' },
      { key: 'make', label: 'Marka' },
      { key: 'model', label: 'Model' },
      { key: 'registrationNumber', label: 'Numer rejestracyjny' },
      { key: 'averageConsumption', label: 'Średnie zużycie (l/100km)' },
      { key: 'totalFuelUsed', label: 'Całkowite zużycie (l)' },
      { key: 'totalDistance', label: 'Przejechany dystans (km)' },
      { key: 'efficiency', label: 'Efektywność' }
    ];
    
    const formatEfficiency = (efficiency) => {
      let color = '#f44336';
      if (efficiency >= 90) color = '#4caf50';
      else if (efficiency >= 75) color = '#ff9800';
      
      return <span style={{ color }}>{efficiency}%</span>;
    };
    
    const data = fuelData.vehicles.map(vehicle => [
      vehicle.id,
      vehicle.make,
      vehicle.model,
      vehicle.registrationNumber,
      vehicle.averageConsumption.toFixed(1),
      vehicle.totalFuelUsed.toLocaleString(),
      vehicle.totalDistance.toLocaleString(),
      formatEfficiency(vehicle.efficiency)
    ]);
    
    return (
      <Card>
        <Table 
          headers={columns.map(col => col.label)} 
          data={data} 
          onRowClick={(rowIndex) => handleVehicleSelect(fuelData.vehicles[rowIndex])}
          isLoading={isLoading}
        />
        <PaginationContainer>
          <PaginationInfo>
            Pokazuje {(filters.page - 1) * filters.limit + 1} - {Math.min(filters.page * filters.limit, fuelData.total)} z {fuelData.total} pojazdów
          </PaginationInfo>
          <PaginationButtons>
            <Button 
              onClick={() => handlePageChange(filters.page - 1)} 
              disabled={filters.page === 1}
            >
              Poprzednia
            </Button>
            <Button 
              onClick={() => handlePageChange(filters.page + 1)} 
              disabled={filters.page * filters.limit >= fuelData.total}
            >
              Następna
            </Button>
          </PaginationButtons>
        </PaginationContainer>
      </Card>
    );
  };
  
  // Render vehicle performance indicators
  const renderPerformanceIndicators = () => {
    if (!performanceData || !performanceData.vehicles) return null;
    
    const columns = [
      { key: 'id', label: 'ID' },
      { key: 'make', label: 'Marka' },
      { key: 'model', label: 'Model' },
      { key: 'registrationNumber', label: 'Numer rejestracyjny' },
      { key: 'utilization', label: 'Wykorzystanie (%)' },
      { key: 'downtime', label: 'Przestoje (h)' },
      { key: 'maintenanceCost', label: 'Koszt utrzymania' },
      { key: 'performanceScore', label: 'Ocena wydajności' }
    ];
    
    const formatPerformanceScore = (score) => {
      let color = '#f44336';
      if (score >= 80) color = '#4caf50';
      else if (score >= 60) color = '#ff9800';
      
      return <span style={{ color }}>{score}%</span>;
    };
    
    const data = performanceData.vehicles.map(vehicle => [
      vehicle.id,
      vehicle.make,
      vehicle.model,
      vehicle.registrationNumber,
      `${vehicle.utilization}%`,
      vehicle.downtime,
      `${vehicle.maintenanceCost.toLocaleString()} PLN`,
      formatPerformanceScore(vehicle.performanceScore)
    ]);
    
    return (
      <Card>
        <Table 
          headers={columns.map(col => col.label)} 
          data={data} 
          onRowClick={(rowIndex) => handleVehicleSelect(performanceData.vehicles[rowIndex])}
          isLoading={isLoading}
        />
        <PaginationContainer>
          <PaginationInfo>
            Pokazuje {(filters.page - 1) * filters.limit + 1} - {Math.min(filters.page * filters.limit, performanceData.total)} z {performanceData.total} pojazdów
          </PaginationInfo>
          <PaginationButtons>
            <Button 
              onClick={() => handlePageChange(filters.page - 1)} 
              disabled={filters.page === 1}
            >
              Poprzednia
            </Button>
            <Button 
              onClick={() => handlePageChange(filters.page + 1)} 
              disabled={filters.page * filters.limit >= performanceData.total}
            >
              Następna
            </Button>
          </PaginationButtons>
        </PaginationContainer>
      </Card>
    );
  };
  
  // Render service history
  const renderServiceHistory = () => {
    if (!serviceHistory || !serviceHistory.services) return null;
    
    const columns = [
      { key: 'id', label: 'ID' },
      { key: 'vehicleId', label: 'ID pojazdu' },
      { key: 'vehicleInfo', label: 'Pojazd' },
      { key: 'serviceType', label: 'Typ serwisu' },
      { key: 'serviceDate', label: 'Data serwisu' },
      { key: 'mileage', label: 'Przebieg (km)' },
      { key: 'cost', label: 'Koszt' },
      { key: 'status', label: 'Status' }
    ];
    
    const formatStatus = (status) => {
      switch (status) {
        case 'completed':
          return <span style={{ color: '#4caf50' }}>Zakończony</span>;
        case 'scheduled':
          return <span style={{ color: '#2196f3' }}>Zaplanowany</span>;
        case 'in_progress':
          return <span style={{ color: '#ff9800' }}>W trakcie</span>;
        default:
          return status;
      }
    };
    
    const data = serviceHistory.services.map(service => [
      service.id,
      service.vehicleId,
      `${service.vehicleMake} ${service.vehicleModel} (${service.registrationNumber})`,
      service.serviceType,
      service.serviceDate,
      service.mileage.toLocaleString(),
      `${service.cost.toLocaleString()} PLN`,
      formatStatus(service.status)
    ]);
    
    return (
      <Card>
        <Table 
          headers={columns.map(col => col.label)} 
          data={data} 
          isLoading={isLoading}
        />
        <PaginationContainer>
          <PaginationInfo>
            Pokazuje {(filters.page - 1) * filters.limit + 1} - {Math.min(filters.page * filters.limit, serviceHistory.total)} z {serviceHistory.total} serwisów
          </PaginationInfo>
          <PaginationButtons>
            <Button 
              onClick={() => handlePageChange(filters.page - 1)} 
              disabled={filters.page === 1}
            >
              Poprzednia
            </Button>
            <Button 
              onClick={() => handlePageChange(filters.page + 1)} 
              disabled={filters.page * filters.limit >= serviceHistory.total}
            >
              Następna
            </Button>
          </PaginationButtons>
        </PaginationContainer>
      </Card>
    );
  };
  
  // Render documents
  const renderDocuments = () => {
    if (!documents || !documents.documents) return null;
    
    const columns = [
      { key: 'id', label: 'ID' },
      { key: 'vehicleId', label: 'ID pojazdu' },
      { key: 'vehicleInfo', label: 'Pojazd' },
      { key: 'documentType', label: 'Typ dokumentu' },
      { key: 'documentNumber', label: 'Numer dokumentu' },
      { key: 'issueDate', label: 'Data wydania' },
      { key: 'expiryDate', label: 'Data ważności' },
      { key: 'status', label: 'Status' }
    ];
    
    const formatStatus = (status) => {
      switch (status) {
        case 'valid':
          return <span style={{ color: '#4caf50' }}>Ważny</span>;
        case 'expiring':
          return <span style={{ color: '#ff9800' }}>Wygasa wkrótce</span>;
        case 'expired':
          return <span style={{ color: '#f44336' }}>Wygasł</span>;
        default:
          return status;
      }
    };
    
    const data = documents.documents.map(document => [
      document.id,
      document.vehicleId,
      `${document.vehicleMake} ${document.vehicleModel} (${document.registrationNumber})`,
      document.documentType,
      document.documentNumber,
      document.issueDate,
      document.expiryDate,
      formatStatus(document.status)
    ]);
    
    return (
      <Card>
        <Table 
          headers={columns.map(col => col.label)} 
          data={data} 
          isLoading={isLoading}
        />
        <PaginationContainer>
          <PaginationInfo>
            Pokazuje {(filters.page - 1) * filters.limit + 1} - {Math.min(filters.page * filters.limit, documents.total)} z {documents.total} dokumentów
          </PaginationInfo>
          <PaginationButtons>
            <Button 
              onClick={() => handlePageChange(filters.page - 1)} 
              disabled={filters.page === 1}
            >
              Poprzednia
            </Button>
            <Button 
              onClick={() => handlePageChange(filters.page + 1)} 
              disabled={filters.page * filters.limit >= documents.total}
            >
              Następna
            </Button>
          </PaginationButtons>
        </PaginationContainer>
      </Card>
    );
  };
  
  // Render non-vehicle assets
  const renderAssets = () => {
    if (!assets || !assets.assets) return null;
    
    const columns = [
      { key: 'id', label: 'ID' },
      { key: 'assetType', label: 'Typ aktywa' },
      { key: 'name', label: 'Nazwa' },
      { key: 'serialNumber', label: 'Numer seryjny' },
      { key: 'purchaseDate', label: 'Data zakupu' },
      { key: 'purchasePrice', label: 'Cena zakupu' },
      { key: 'currentValue', label: 'Obecna wartość' },
      { key: 'status', label: 'Status' }
    ];
    
    const formatStatus = (status) => {
      switch (status) {
        case 'active':
          return <span style={{ color: '#4caf50' }}>Aktywny</span>;
        case 'inactive':
          return <span style={{ color: '#f44336' }}>Nieaktywny</span>;
        case 'maintenance':
          return <span style={{ color: '#ff9800' }}>W serwisie</span>;
        default:
          return status;
      }
    };
    
    const data = assets.assets.map(asset => [
      asset.id,
      asset.assetType,
      asset.name,
      asset.serialNumber,
      asset.purchaseDate,
      `${asset.purchasePrice.toLocaleString()} PLN`,
      `${asset.currentValue.toLocaleString()} PLN`,
      formatStatus(asset.status)
    ]);
    
    return (
      <Card>
        <Table 
          headers={columns.map(col => col.label)} 
          data={data} 
          isLoading={isLoading}
        />
        <PaginationContainer>
          <PaginationInfo>
            Pokazuje {(filters.page - 1) * filters.limit + 1} - {Math.min(filters.page * filters.limit, assets.total)} z {assets.total} aktywów
          </PaginationInfo>
          <PaginationButtons>
            <Button 
              onClick={() => handlePageChange(filters.page - 1)} 
              disabled={filters.page === 1}
            >
              Poprzednia
            </Button>
            <Button 
              onClick={() => handlePageChange(filters.page + 1)} 
              disabled={filters.page * filters.limit >= assets.total}
            >
              Następna
            </Button>
          </PaginationButtons>
        </PaginationContainer>
      </Card>
    );
  };
  
  // Render route optimization
  const renderRouteOptimization = () => {
    if (!routeData || !routeData.routes) return null;
    
    const columns = [
      { key: 'id', label: 'ID' },
      { key: 'vehicleId', label: 'ID pojazdu' },
      { key: 'vehicleInfo', label: 'Pojazd' },
      { key: 'startLocation', label: 'Lokalizacja początkowa' },
      { key: 'endLocation', label: 'Lokalizacja końcowa' },
      { key: 'distance', label: 'Dystans (km)' },
      { key: 'estimatedFuel', label: 'Szacowane zużycie paliwa (l)' },
      { key: 'optimizationScore', label: 'Ocena optymalizacji' }
    ];
    
    const formatOptimizationScore = (score) => {
      let color = '#f44336';
      if (score >= 80) color = '#4caf50';
      else if (score >= 60) color = '#ff9800';
      
      return <span style={{ color }}>{score}%</span>;
    };
    
    const data = routeData.routes.map(route => [
      route.id,
      route.vehicleId,
      `${route.vehicleMake} ${route.vehicleModel} (${route.registrationNumber})`,
      route.startLocation,
      route.endLocation,
      route.distance.toLocaleString(),
      route.estimatedFuel.toFixed(1),
      formatOptimizationScore(route.optimizationScore)
    ]);
    
    return (
      <Card>
        <Table 
          headers={columns.map(col => col.label)} 
          data={data} 
          isLoading={isLoading}
        />
        <PaginationContainer>
          <PaginationInfo>
            Pokazuje {(filters.page - 1) * filters.limit + 1} - {Math.min(filters.page * filters.limit, routeData.total)} z {routeData.total} tras
          </PaginationInfo>
          <PaginationButtons>
            <Button 
              onClick={() => handlePageChange(filters.page - 1)} 
              disabled={filters.page === 1}
            >
              Poprzednia
            </Button>
            <Button 
              onClick={() => handlePageChange(filters.page + 1)} 
              disabled={filters.page * filters.limit >= routeData.total}
            >
              Następna
            </Button>
          </PaginationButtons>
        </PaginationContainer>
      </Card>
    );
  };
  
  // Render content based on active tab
  const renderContent = () => {
    if (isLoading) {
      return <LoadingIndicator>Ładowanie danych floty...</LoadingIndicator>;
    }
    
    if (error) {
      return <ErrorMessage>{error}</ErrorMessage>;
    }
    
    switch (activeTab) {
      case 'inventory':
        return (
          <>
            {renderKPICards()}
            {renderFilters()}
            {renderVehiclesTable()}
          </>
        );
      case 'fuel':
        return (
          <>
            {renderKPICards()}
            {renderFilters()}
            {renderFuelConsumption()}
          </>
        );
      case 'performance':
        return (
          <>
            {renderKPICards()}
            {renderFilters()}
            {renderPerformanceIndicators()}
          </>
        );
      case 'service':
        return (
          <>
            {renderKPICards()}
            {renderFilters()}
            {renderServiceHistory()}
          </>
        );
      case 'documents':
        return (
          <>
            {renderKPICards()}
            {renderFilters()}
            {renderDocuments()}
          </>
        );
      case 'assets':
        return (
          <>
            {renderKPICards()}
            {renderFilters()}
            {renderAssets()}
          </>
        );
      case 'routes':
        return (
          <>
            {renderKPICards()}
            {renderFilters()}
            {renderRouteOptimization()}
          </>
        );
      default:
        return (
          <>
            {renderKPICards()}
            {renderFilters()}
            {renderVehiclesTable()}
          </>
        );
    }
  };
  
  return (
    <PageContainer>
      <PageTitle>Zarządzanie Flotą</PageTitle>
      {renderDataToggle()}
      
      <TabsContainer>
        <Tab 
          active={activeTab === 'inventory'} 
          onClick={() => handleTabChange('inventory')}
        >
          Inwentaryzacja pojazdów
        </Tab>
        <Tab 
          active={activeTab === 'fuel'} 
          onClick={() => handleTabChange('fuel')}
        >
          Zużycie paliwa
        </Tab>
        <Tab 
          active={activeTab === 'performance'} 
          onClick={() => handleTabChange('performance')}
        >
          Wskaźniki wydajności
        </Tab>
        <Tab 
          active={activeTab === 'service'} 
          onClick={() => handleTabChange('service')}
        >
          Historia serwisowa
        </Tab>
        <Tab 
          active={activeTab === 'documents'} 
          onClick={() => handleTabChange('documents')}
        >
          Dokumenty
        </Tab>
        <Tab 
          active={activeTab === 'assets'} 
          onClick={() => handleTabChange('assets')}
        >
          Aktywa
        </Tab>
        <Tab 
          active={activeTab === 'routes'} 
          onClick={() => handleTabChange('routes')}
        >
          Optymalizacja tras
        </Tab>
      </TabsContainer>
      
      {renderContent()}
    </PageContainer>
  );
};

export default FleetManagement;
