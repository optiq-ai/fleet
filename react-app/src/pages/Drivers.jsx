import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Card from '../components/common/Card';
import Table from '../components/common/Table';
import driversService from '../services/api/driversService';
import mockDriversService from '../services/api/mockDriversService';
import DriverDetails from '../components/drivers/DriverDetails';
import DriverMap from '../components/drivers/DriverMap';
import DriverDocuments from '../components/drivers/DriverDocuments';
import DriverPerformance from '../components/drivers/DriverPerformance';

/**
 * @typedef {Object} Driver
 * @property {string} id - Driver ID
 * @property {string} name - Driver name
 * @property {string} licenseNumber - Driver license number
 * @property {string} status - Driver status (active, inactive, on_leave)
 * @property {number} safetyScore - Driver safety score
 * @property {string} currentVehicle - Current vehicle ID
 * @property {Object} currentLocation - Current location coordinates
 * @property {string} lastUpdate - Last update timestamp
 */

/**
 * @typedef {Object} DriverDocument
 * @property {string} id - Document ID
 * @property {string} type - Document type
 * @property {string} number - Document number
 * @property {string} issuedDate - Issue date
 * @property {string} expiryDate - Expiry date
 * @property {string} status - Document status
 */

/**
 * @typedef {Object} DriverPerformanceData
 * @property {Array} mileage - Mileage data
 * @property {Array} fuelConsumption - Fuel consumption data
 * @property {Array} deliveryTimes - Delivery times data
 * @property {Array} ratings - Ratings data
 */

/**
 * @typedef {Object} DriverSchedule
 * @property {string} id - Schedule entry ID
 * @property {string} type - Schedule type
 * @property {string} startDate - Start date
 * @property {string} endDate - End date
 * @property {string} status - Schedule status
 * @property {string} description - Schedule description
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

const GridSection = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.columns || 2}, 1fr);
  gap: 20px;
  margin-bottom: 20px;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const KPIContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 20px;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const KPICard = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const KPITitle = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
`;

const KPIValue = styled.div`
  font-size: 24px;
  font-weight: 500;
  color: #333;
`;

const KPITrend = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
  font-size: 12px;
  color: ${props => props.up ? '#4caf50' : props.down ? '#f44336' : '#666'};
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

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 20px;
  overflow-x: auto;
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

const DataToggleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 8px 16px;
  background-color: #f5f5f5;
  border-radius: 8px;
`;

const ToggleLabel = styled.span`
  margin-right: 12px;
  font-size: 14px;
  color: #666;
`;

const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
  
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
      height: 16px;
      width: 16px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      transition: .4s;
      border-radius: 50%;
    }
  }
  
  input:checked + span {
    background-color: #3f51b5;
  }
  
  input:checked + span:before {
    transform: translateX(26px);
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

const PaginationInfo = styled.div`
  font-size: 14px;
  color: #666;
`;

const PaginationButtons = styled.div`
  display: flex;
  gap: 8px;
`;

/**
 * Drivers component for managing driver information
 * @returns {JSX.Element} Drivers component
 */
const Drivers = () => {
  // Toggle for mock data vs API data
  const [useMockData, setUseMockData] = useState(true);
  
  // Get the appropriate service based on toggle
  const service = useMockData ? mockDriversService : driversService;
  
  // State for drivers list
  const [drivers, setDrivers] = useState(null);
  
  // State for selected driver
  const [selectedDriver, setSelectedDriver] = useState(null);
  
  // State for driver documents
  const [driverDocuments, setDriverDocuments] = useState(null);
  
  // State for driver performance data
  const [performanceData, setPerformanceData] = useState(null);
  
  // State for driver schedule
  const [driverSchedule, setDriverSchedule] = useState(null);
  
  // State for KPI data
  const [kpiData, setKpiData] = useState(null);
  
  // State for filters
  const [filters, setFilters] = useState({
    status: 'all',
    vehicle: 'all',
    search: '',
    page: 1,
    limit: 10
  });
  
  // State for active tab
  const [activeTab, setActiveTab] = useState('overview');
  
  // Loading and error states
  const [isLoading, setIsLoading] = useState(true);
  const [isDetailLoading, setIsDetailLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Fetch drivers data on component mount and when filters or data source changes
  useEffect(() => {
    const fetchDriversData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Fetch drivers list
        const driversResponse = await service.getDrivers(
          filters.status !== 'all' ? filters.status : undefined,
          filters.vehicle !== 'all' ? filters.vehicle : undefined,
          filters.search || undefined,
          filters.page,
          filters.limit
        );
        setDrivers(driversResponse);
        
        // Fetch KPI data
        const kpiResponse = await service.getDriversKPI();
        setKpiData(kpiResponse);
        
        // If there are drivers, select the first one by default
        if (driversResponse && driversResponse.drivers.length > 0 && !selectedDriver) {
          const firstDriver = driversResponse.drivers[0];
          setSelectedDriver(firstDriver);
          
          // Fetch driver details
          await fetchDriverDetails(firstDriver.id);
        }
      } catch (err) {
        console.error('Error fetching drivers data:', err);
        setError('Nie udało się pobrać danych kierowców. Spróbuj odświeżyć stronę.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDriversData();
  }, [service, filters.status, filters.vehicle, filters.page, filters.limit, useMockData]);
  
  // Fetch driver details when a driver is selected
  const fetchDriverDetails = async (driverId) => {
    setIsDetailLoading(true);
    
    try {
      // Fetch driver documents
      const documentsResponse = await service.getDriverDocuments(driverId);
      setDriverDocuments(documentsResponse);
      
      // Fetch driver performance data
      const performanceResponse = await service.getDriverPerformance(driverId);
      setPerformanceData(performanceResponse);
      
      // Fetch driver schedule
      const scheduleResponse = await service.getDriverSchedule(driverId);
      setDriverSchedule(scheduleResponse);
    } catch (err) {
      console.error('Error fetching driver details:', err);
      setError('Nie udało się pobrać szczegółów kierowcy.');
    } finally {
      setIsDetailLoading(false);
    }
  };
  
  // Handle driver selection
  const handleDriverSelect = (driver) => {
    setSelectedDriver(driver);
    fetchDriverDetails(driver.id);
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
  
  // Handle page change
  const handlePageChange = (newPage) => {
    setFilters({
      ...filters,
      page: newPage
    });
  };
  
  // Render data toggle switch
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
        <KPICard>
          <KPITitle>Aktywni kierowcy</KPITitle>
          <KPIValue>{kpiData.activeDrivers}</KPIValue>
          <KPITrend up={kpiData.activeDriversTrend > 0} down={kpiData.activeDriversTrend < 0}>
            {kpiData.activeDriversTrend > 0 ? '↑' : kpiData.activeDriversTrend < 0 ? '↓' : '–'} 
            {Math.abs(kpiData.activeDriversTrend)}% w porównaniu do poprzedniego miesiąca
          </KPITrend>
        </KPICard>
        <KPICard>
          <KPITitle>Średnia ocena wydajności</KPITitle>
          <KPIValue>{kpiData.averagePerformance}%</KPIValue>
          <KPITrend up={kpiData.averagePerformanceTrend > 0} down={kpiData.averagePerformanceTrend < 0}>
            {kpiData.averagePerformanceTrend > 0 ? '↑' : kpiData.averagePerformanceTrend < 0 ? '↓' : '–'} 
            {Math.abs(kpiData.averagePerformanceTrend)}% w porównaniu do poprzedniego miesiąca
          </KPITrend>
        </KPICard>
        <KPICard>
          <KPITitle>Aktualne dokumenty</KPITitle>
          <KPIValue>{kpiData.validDocumentsPercentage}%</KPIValue>
          <KPITrend up={kpiData.validDocumentsTrend > 0} down={kpiData.validDocumentsTrend < 0}>
            {kpiData.validDocumentsTrend > 0 ? '↑' : kpiData.validDocumentsTrend < 0 ? '↓' : '–'} 
            {Math.abs(kpiData.validDocumentsTrend)}% w porównaniu do poprzedniego miesiąca
          </KPITrend>
        </KPICard>
        <KPICard>
          <KPITitle>Wskaźnik absencji</KPITitle>
          <KPIValue>{kpiData.absenceRate}%</KPIValue>
          <KPITrend up={kpiData.absenceRateTrend < 0} down={kpiData.absenceRateTrend > 0}>
            {kpiData.absenceRateTrend > 0 ? '↑' : kpiData.absenceRateTrend < 0 ? '↓' : '–'} 
            {Math.abs(kpiData.absenceRateTrend)}% w porównaniu do poprzedniego miesiąca
          </KPITrend>
        </KPICard>
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
            <option value="on_leave">Na urlopie</option>
          </FilterSelect>
        </FilterGroup>
        <FilterGroup>
          <FilterLabel htmlFor="vehicle">Pojazd</FilterLabel>
          <FilterSelect 
            id="vehicle" 
            name="vehicle" 
            value={filters.vehicle} 
            onChange={handleFilterChange}
          >
            <option value="all">Wszystkie</option>
            <option value="assigned">Z przypisanym pojazdem</option>
            <option value="unassigned">Bez przypisanego pojazdu</option>
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
              placeholder="Imię, nazwisko, numer..."
            />
            <Button primary onClick={handleSearch}>Szukaj</Button>
          </div>
        </FilterGroup>
      </FilterContainer>
    );
  };
  
  // Render tabs
  const renderTabs = () => {
    return (
      <TabsContainer>
        <Tab 
          active={activeTab === 'overview'} 
          onClick={() => setActiveTab('overview')}
        >
          Przegląd
        </Tab>
        <Tab 
          active={activeTab === 'details'} 
          onClick={() => setActiveTab('details')}
        >
          Szczegóły
        </Tab>
        <Tab 
          active={activeTab === 'performance'} 
          onClick={() => setActiveTab('performance')}
        >
          Wydajność
        </Tab>
        <Tab 
          active={activeTab === 'documents'} 
          onClick={() => setActiveTab('documents')}
        >
          Dokumenty
        </Tab>
        <Tab 
          active={activeTab === 'schedule'} 
          onClick={() => setActiveTab('schedule')}
        >
          Harmonogram
        </Tab>
        <Tab 
          active={activeTab === 'map'} 
          onClick={() => setActiveTab('map')}
        >
          Mapa
        </Tab>
      </TabsContainer>
    );
  };
  
  // Render drivers table
  const renderDriversTable = () => {
    if (!drivers || !drivers.drivers) return null;
    
    const columns = [
      { key: 'name', label: 'Imię i nazwisko' },
      { key: 'status', label: 'Status' },
      { key: 'licenseNumber', label: 'Numer prawa jazdy' },
      { key: 'currentVehicle', label: 'Aktualny pojazd' },
      { key: 'safetyScore', label: 'Ocena bezpieczeństwa' },
      { key: 'lastUpdate', label: 'Ostatnia aktualizacja' }
    ];
    
    const formatStatus = (status) => {
      switch (status) {
        case 'active':
          return <span style={{ color: '#4caf50' }}>Aktywny</span>;
        case 'inactive':
          return <span style={{ color: '#f44336' }}>Nieaktywny</span>;
        case 'on_leave':
          return <span style={{ color: '#ff9800' }}>Na urlopie</span>;
        default:
          return status;
      }
    };
    
    const formatSafetyScore = (score) => {
      let color = '#f44336';
      if (score >= 80) color = '#4caf50';
      else if (score >= 60) color = '#ff9800';
      
      return <span style={{ color }}>{score}%</span>;
    };
    
    const data = drivers.drivers.map(driver => ({
      ...driver,
      status: formatStatus(driver.status),
      safetyScore: formatSafetyScore(driver.safetyScore),
      onClick: () => handleDriverSelect(driver)
    }));
    
    return (
      <Card>
        <Table 
          columns={columns} 
          data={data} 
          selectedRow={selectedDriver ? selectedDriver.id : null}
        />
        <PaginationContainer>
          <PaginationInfo>
            Pokazuje {(filters.page - 1) * filters.limit + 1} - {Math.min(filters.page * filters.limit, drivers.total)} z {drivers.total} kierowców
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
              disabled={filters.page * filters.limit >= drivers.total}
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
      return <LoadingIndicator>Ładowanie danych kierowców...</LoadingIndicator>;
    }
    
    if (error) {
      return <ErrorMessage>{error}</ErrorMessage>;
    }
    
    if (!drivers || !drivers.drivers || drivers.drivers.length === 0) {
      return <ErrorMessage>Brak danych kierowców do wyświetlenia.</ErrorMessage>;
    }
    
    switch (activeTab) {
      case 'overview':
        return (
          <>
            {renderKPICards()}
            {renderFilters()}
            {renderDriversTable()}
          </>
        );
      case 'details':
        return (
          <DriverDetails 
            driver={selectedDriver} 
            isLoading={isDetailLoading} 
          />
        );
      case 'performance':
        return (
          <DriverPerformance 
            performanceData={performanceData} 
            isLoading={isDetailLoading} 
          />
        );
      case 'documents':
        return (
          <DriverDocuments 
            documents={driverDocuments} 
            isLoading={isDetailLoading} 
          />
        );
      case 'schedule':
        return (
          <Card>
            <SectionTitle>Harmonogram kierowcy</SectionTitle>
            {isDetailLoading ? (
              <LoadingIndicator>Ładowanie harmonogramu...</LoadingIndicator>
            ) : driverSchedule && driverSchedule.schedule ? (
              <Table 
                columns={[
                  { key: 'type', label: 'Typ' },
                  { key: 'startDate', label: 'Data rozpoczęcia' },
                  { key: 'endDate', label: 'Data zakończenia' },
                  { key: 'status', label: 'Status' },
                  { key: 'description', label: 'Opis' }
                ]} 
                data={driverSchedule.schedule.map(item => ({
                  ...item,
                  status: (() => {
                    switch (item.status) {
                      case 'scheduled':
                        return <span style={{ color: '#2196f3' }}>Zaplanowane</span>;
                      case 'in_progress':
                        return <span style={{ color: '#ff9800' }}>W trakcie</span>;
                      case 'completed':
                        return <span style={{ color: '#4caf50' }}>Zakończone</span>;
                      case 'cancelled':
                        return <span style={{ color: '#f44336' }}>Anulowane</span>;
                      default:
                        return item.status;
                    }
                  })()
                }))} 
              />
            ) : (
              <div>Brak danych harmonogramu.</div>
            )}
          </Card>
        );
      case 'map':
        return (
          <DriverMap 
            drivers={drivers.drivers} 
            selectedDriver={selectedDriver} 
            onDriverSelect={handleDriverSelect} 
          />
        );
      default:
        return null;
    }
  };
  
  return (
    <PageContainer>
      <SectionTitle>Zarządzanie kierowcami</SectionTitle>
      {renderDataToggle()}
      {renderTabs()}
      {renderContent()}
    </PageContainer>
  );
};

export default Drivers;
