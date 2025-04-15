import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Card from '../components/common/Card';
import KPICard from '../components/common/KPICard';
import Table from '../components/common/Table';
import predictiveMaintenanceService from '../services/api/predictiveMaintenanceService';
import mockPredictiveMaintenanceService from '../services/api/mockPredictiveMaintenanceService';

/**
 * @typedef {Object} MaintenanceAlert
 * @property {string} id - Alert ID
 * @property {string} priority - Alert priority
 * @property {string} vehicle - Vehicle ID
 * @property {string} component - Component name
 * @property {string} forecast - Forecast description
 * @property {string} confidence - Confidence level
 * @property {string} status - Alert status
 */

/**
 * @typedef {Object} MaintenanceAlertsResponse
 * @property {number} total - Total number of alerts
 * @property {number} page - Current page
 * @property {number} limit - Page size limit
 * @property {MaintenanceAlert[]} alerts - List of maintenance alerts
 */

/**
 * @typedef {Object} VehicleHealth
 * @property {string} vehicle - Vehicle ID
 * @property {number} overallHealth - Overall health percentage
 * @property {Object} components - Component health data
 */

/**
 * @typedef {Object} VehicleHealthResponse
 * @property {VehicleHealth[]} vehicles - Vehicle health data
 */

/**
 * @typedef {Object} MaintenanceHistoryResponse
 * @property {Array} history - Maintenance history
 */

/**
 * @typedef {Object} MaintenanceScheduleResponse
 * @property {Array} schedule - Maintenance schedule
 */

/**
 * @typedef {Object} MaintenanceCostAnalysis
 * @property {number} totalCost - Total maintenance cost
 * @property {number} savingsEstimate - Estimated savings
 * @property {Array} costBreakdown - Cost breakdown
 * @property {Array} monthlyCosts - Monthly costs
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
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 20px;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
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

const Badge = styled.span`
  display: inline-block;
  padding: 4px 8px;
  background-color: ${props => props.color};
  color: white;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
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

const GaugeContainer = styled.div`
  position: relative;
  width: 200px;
  height: 100px;
  margin: 0 auto;
  overflow: hidden;
`;

const GaugeBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 200px;
  height: 200px;
  border-radius: 100px 100px 0 0;
  background: linear-gradient(to right, #f44336 0%, #ffeb3b 50%, #4caf50 100%);
  overflow: hidden;
`;

const GaugeMask = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 200px;
  height: 200px;
  background-color: white;
  transform-origin: center bottom;
  transform: rotate(${props => 180 - props.value * 1.8}deg);
`;

const GaugeCenter = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 160px;
  height: 80px;
  background-color: white;
  border-radius: 80px 80px 0 0;
  transform: translateX(-50%);
`;

const GaugeValue = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 24px;
  font-weight: 500;
  color: #333;
`;

const GaugeLabel = styled.div`
  position: absolute;
  bottom: -5px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
  color: #666;
`;

const GaugeNeedle = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 4px;
  height: 90px;
  background-color: #333;
  transform-origin: bottom center;
  transform: translateX(-50%) rotate(${props => -90 + props.value * 1.8}deg);
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 50%;
    width: 10px;
    height: 10px;
    background-color: #333;
    border-radius: 50%;
    transform: translateX(-50%);
  }
`;

const ChartContainer = styled.div`
  height: 300px;
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 16px;
  margin-top: 16px;
`;

const BarChart = styled.div`
  display: flex;
  height: 250px;
  align-items: flex-end;
  gap: 16px;
  padding: 0 16px;
`;

const BarChartBar = styled.div`
  flex: 1;
  height: ${props => props.height}%;
  background-color: ${props => props.color};
  border-radius: 4px 4px 0 0;
  position: relative;
  min-width: 30px;
  
  &::after {
    content: attr(data-value);
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 12px;
    color: #666;
  }
  
  &::before {
    content: attr(data-label);
    position: absolute;
    bottom: -25px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 12px;
    color: #666;
    white-space: nowrap;
  }
`;

const TimelineContainer = styled.div`
  margin-top: 20px;
  padding: 16px;
  background-color: #f5f5f5;
  border-radius: 8px;
`;

const TimelineItem = styled.div`
  display: flex;
  margin-bottom: 16px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 24px;
    left: 8px;
    width: 2px;
    height: calc(100% + 16px);
    background-color: #e0e0e0;
    z-index: 1;
  }
  
  &:last-child::before {
    display: none;
  }
`;

const TimelineDot = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: ${props => props.color};
  margin-right: 16px;
  margin-top: 4px;
  z-index: 2;
`;

const TimelineContent = styled.div`
  flex: 1;
`;

const TimelineDate = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 4px;
`;

const TimelineDescription = styled.div`
  font-size: 14px;
  color: #666;
`;

/**
 * PredictiveMaintenance component for maintenance forecasting and management
 * @returns {JSX.Element} PredictiveMaintenance component
 */
const PredictiveMaintenance = () => {
  // Stan dla alertów konserwacji
  const [alerts, setAlerts] = useState(null);
  
  // Stan dla wybranego alertu
  const [selectedAlert, setSelectedAlert] = useState(null);
  
  // Stan dla stanu technicznego pojazdów
  const [vehicleHealth, setVehicleHealth] = useState(null);
  
  // Stan dla historii konserwacji
  const [maintenanceHistory, setMaintenanceHistory] = useState(null);
  
  // Stan dla harmonogramu konserwacji
  const [maintenanceSchedule, setMaintenanceSchedule] = useState(null);
  
  // Stan dla analizy kosztów
  const [costAnalysis, setCostAnalysis] = useState(null);
  
  // Stan dla filtrów
  const [filters, setFilters] = useState({
    priority: 'all',
    vehicle: '',
    component: '',
    status: 'all',
    page: 1,
    limit: 10
  });
  
  // Stan dla aktywnej zakładki
  const [activeTab, setActiveTab] = useState('alerts');
  
  // Stan dla przełącznika danych (API vs Mock)
  const [useMockData, setUseMockData] = useState(false);
  
  // Stany ładowania i błędów
  const [isLoading, setIsLoading] = useState(true);
  const [isDetailLoading, setIsDetailLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Pobieranie danych przy montowaniu komponentu
  useEffect(() => {
    const fetchMaintenanceData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Wybór serwisu danych w zależności od stanu przełącznika
        const service = useMockData ? mockPredictiveMaintenanceService : predictiveMaintenanceService;
        
        // Pobieranie alertów konserwacji
        const alertsResponse = await service.getAlerts(
          filters.priority !== 'all' ? filters.priority : undefined,
          filters.vehicle || undefined,
          filters.component || undefined,
          filters.status !== 'all' ? filters.status : undefined,
          filters.page,
          filters.limit
        );
        setAlerts(alertsResponse);
        
        // Pobieranie stanu technicznego pojazdów
        const healthResponse = await service.getVehicleHealth();
        setVehicleHealth(healthResponse);
        
        // Pobieranie historii konserwacji
        const historyResponse = await service.getMaintenanceHistory(
          undefined, undefined, undefined, undefined, 1, 5
        );
        setMaintenanceHistory(historyResponse);
        
        // Pobieranie harmonogramu konserwacji
        const scheduleResponse = await service.getMaintenanceSchedule(
          undefined, undefined, undefined, undefined, 1, 5
        );
        setMaintenanceSchedule(scheduleResponse);
        
        // Pobieranie analizy kosztów
        const costResponse = await service.getCostAnalysis();
        setCostAnalysis(costResponse);
      } catch (err) {
        console.error('Error fetching maintenance data:', err);
        setError('Nie udało się pobrać danych konserwacji predykcyjnej. Spróbuj odświeżyć stronę.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMaintenanceData();
  }, [filters.priority, filters.status, filters.page, filters.limit, useMockData]);
  
  // Obsługa zmiany filtrów
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
      // Resetowanie strony przy zmianie filtrów
      ...(name !== 'page' && { page: 1 })
    });
  };
  
  // Obsługa wyszukiwania
  const handleSearch = () => {
    setFilters({
      ...filters,
      page: 1
    });
  };
  
  // Obsługa zmiany strony
  const handlePageChange = (newPage) => {
    setFilters({
      ...filters,
      page: newPage
    });
  };
  
  // Obsługa kliknięcia wiersza alertu
  const handleAlertClick = async (alert) => {
    setIsDetailLoading(true);
    
    try {
      // Wybór serwisu danych w zależności od stanu przełącznika
      const service = useMockData ? mockPredictiveMaintenanceService : predictiveMaintenanceService;
      const alertDetails = await service.getAlertDetails(alert.id);
      setSelectedAlert(alertDetails);
    } catch (err) {
      console.error('Error fetching alert details:', err);
      setError('Nie udało się pobrać szczegółów alertu.');
    } finally {
      setIsDetailLoading(false);
    }
  };
  
  // Obsługa aktualizacji statusu alertu
  const handleStatusUpdate = async (id, newStatus) => {
    try {
      // Wybór serwisu danych w zależności od stanu przełącznika
      const service = useMockData ? mockPredictiveMaintenanceService : predictiveMaintenanceService;
      await service.updateAlertStatus(id, newStatus);
      
      // Odświeżenie listy alertów
      const alertsResponse = await service.getAlerts(
        filters.priority !== 'all' ? filters.priority : undefined,
        filters.vehicle || undefined,
        filters.component || undefined,
        filters.status !== 'all' ? filters.status : undefined,
        filters.page,
        filters.limit
      );
      
      setAlerts(alertsResponse);
      
      // Aktualizacja wybranego alertu, jeśli istnieje
      if (selectedAlert && selectedAlert.id === id) {
        setSelectedAlert({
          ...selectedAlert,
          status: newStatus
        });
      }
    } catch (err) {
      console.error('Error updating alert status:', err);
      setError('Nie udało się zaktualizować statusu alertu.');
    }
  };
  
  // Obsługa przełączania źródła danych
  const handleToggleDataSource = () => {
    setUseMockData(prev => !prev);
  };

  // Renderowanie sekcji filtrów
  const renderFilters = () => {
    return (
      <FilterContainer>
        <FilterGroup>
          <FilterLabel htmlFor="priority">Priorytet</FilterLabel>
          <FilterSelect 
            id="priority" 
            name="priority" 
            value={filters.priority} 
            onChange={handleFilterChange}
          >
            <option value="all">Wszystkie</option>
            <option value="high">Wysoki</option>
            <option value="medium">Średni</option>
            <option value="low">Niski</option>
          </FilterSelect>
        </FilterGroup>
        
        <FilterGroup>
          <FilterLabel htmlFor="vehicle">Pojazd</FilterLabel>
          <FilterInput 
            type="text" 
            id="vehicle" 
            name="vehicle" 
            value={filters.vehicle} 
            onChange={handleFilterChange}
            placeholder="Numer pojazdu"
          />
        </FilterGroup>
        
        <FilterGroup>
          <FilterLabel htmlFor="component">Komponent</FilterLabel>
          <FilterInput 
            type="text" 
            id="component" 
            name="component" 
            value={filters.component} 
            onChange={handleFilterChange}
            placeholder="Nazwa komponentu"
          />
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
            <option value="new">Nowy</option>
            <option value="inProgress">W trakcie</option>
            <option value="scheduled">Zaplanowany</option>
            <option value="completed">Zakończony</option>
          </FilterSelect>
        </FilterGroup>
        
        <FilterGroup>
          <FilterLabel>&nbsp;</FilterLabel>
          <Button primary onClick={handleSearch}>Szukaj</Button>
        </FilterGroup>
      </FilterContainer>
    );
  };
  
  // Renderowanie tabeli alertów
  const renderAlertsTable = () => {
    if (!alerts) return null;
    
    const getPriorityBadge = (priority) => {
      const colors = {
        high: '#f44336',
        medium: '#ff9800',
        low: '#4caf50'
      };
      
      return (
        <Badge color={colors[priority] || '#2196f3'}>
          {priority === 'high' ? 'Wysoki' : 
           priority === 'medium' ? 'Średni' : 
           priority === 'low' ? 'Niski' : priority}
        </Badge>
      );
    };
    
    const getStatusBadge = (status) => {
      const colors = {
        new: '#2196f3',
        inProgress: '#ff9800',
        scheduled: '#9c27b0',
        completed: '#4caf50'
      };
      
      return (
        <Badge color={colors[status] || '#2196f3'}>
          {status === 'new' ? 'Nowy' : 
           status === 'inProgress' ? 'W trakcie' : 
           status === 'scheduled' ? 'Zaplanowany' : 
           status === 'completed' ? 'Zakończony' : status}
        </Badge>
      );
    };
    
    const getConfidenceBadge = (confidence) => {
      const confidenceValue = parseInt(confidence);
      const colors = {
        high: '#4caf50',
        medium: '#ff9800',
        low: '#f44336'
      };
      
      let level = 'medium';
      if (confidenceValue >= 80) level = 'high';
      else if (confidenceValue < 50) level = 'low';
      
      return (
        <Badge color={colors[level]}>
          {confidence}
        </Badge>
      );
    };
    
    // Convert to format expected by our Table component
    const tableHeaders = ['Priorytet', 'Pojazd', 'Komponent', 'Prognoza', 'Pewność', 'Status'];
    const tableData = alerts.alerts.map(alert => [
      getPriorityBadge(alert.priority),
      alert.vehicle,
      alert.component,
      alert.forecast,
      getConfidenceBadge(alert.confidence),
      getStatusBadge(alert.status)
    ]);
    
    return (
      <>
        <Table 
          headers={tableHeaders}
          data={tableData}
          onRowClick={(index) => handleAlertClick(alerts.alerts[index])}
        />
        
        <PaginationContainer>
          <PaginationInfo>
            Wyświetlanie {(filters.page - 1) * filters.limit + 1} - {Math.min(filters.page * filters.limit, alerts.total)} z {alerts.total} alertów
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
              disabled={filters.page * filters.limit >= alerts.total}
            >
              Następna
            </Button>
          </PaginationButtons>
        </PaginationContainer>
      </>
    );
  };
  
  // Renderowanie szczegółów alertu
  const renderAlertDetails = () => {
    if (!selectedAlert) return null;
    
    return (
      <DetailContainer>
        <DetailTitle>Szczegóły alertu</DetailTitle>
        
        <DetailRow>
          <DetailLabel>ID:</DetailLabel>
          <DetailValue>{selectedAlert.id}</DetailValue>
        </DetailRow>
        
        <DetailRow>
          <DetailLabel>Pojazd:</DetailLabel>
          <DetailValue>{selectedAlert.vehicle}</DetailValue>
        </DetailRow>
        
        <DetailRow>
          <DetailLabel>Komponent:</DetailLabel>
          <DetailValue>{selectedAlert.component}</DetailValue>
        </DetailRow>
        
        <DetailRow>
          <DetailLabel>Prognoza:</DetailLabel>
          <DetailValue>{selectedAlert.forecast}</DetailValue>
        </DetailRow>
        
        <DetailRow>
          <DetailLabel>Pewność:</DetailLabel>
          <DetailValue>{selectedAlert.confidence}</DetailValue>
        </DetailRow>
        
        <DetailRow>
          <DetailLabel>Status:</DetailLabel>
          <DetailValue>{selectedAlert.status}</DetailValue>
        </DetailRow>
        
        {selectedAlert.details && (
          <>
            <DetailTitle>Dodatkowe informacje</DetailTitle>
            
            <DetailRow>
              <DetailLabel>Przewidywana data awarii:</DetailLabel>
              <DetailValue>{selectedAlert.details.predictedFailureDate}</DetailValue>
            </DetailRow>
            
            <DetailRow>
              <DetailLabel>Obecny stan:</DetailLabel>
              <DetailValue>{selectedAlert.details.currentHealth}%</DetailValue>
            </DetailRow>
            
            <DetailRow>
              <DetailLabel>Zalecane działanie:</DetailLabel>
              <DetailValue>{selectedAlert.details.recommendedAction}</DetailValue>
            </DetailRow>
            
            <DetailRow>
              <DetailLabel>Szacowany koszt naprawy:</DetailLabel>
              <DetailValue>{selectedAlert.details.estimatedRepairCost} zł</DetailValue>
            </DetailRow>
            
            <DetailRow>
              <DetailLabel>Szacowany czas naprawy:</DetailLabel>
              <DetailValue>{selectedAlert.details.estimatedRepairTime} godz.</DetailValue>
            </DetailRow>
          </>
        )}
        
        <DetailTitle>Akcje</DetailTitle>
        <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
          <Button 
            onClick={() => handleStatusUpdate(selectedAlert.id, 'scheduled')}
            disabled={selectedAlert.status === 'scheduled' || selectedAlert.status === 'completed'}
          >
            Zaplanuj konserwację
          </Button>
          
          <Button 
            onClick={() => handleStatusUpdate(selectedAlert.id, 'inProgress')}
            disabled={selectedAlert.status === 'inProgress' || selectedAlert.status === 'completed'}
          >
            Rozpocznij konserwację
          </Button>
          
          <Button 
            onClick={() => handleStatusUpdate(selectedAlert.id, 'completed')}
            disabled={selectedAlert.status === 'completed'}
          >
            Zakończ konserwację
          </Button>
        </div>
      </DetailContainer>
    );
  };
  
  // Renderowanie stanu technicznego pojazdów
  const renderVehicleHealth = () => {
    if (!vehicleHealth) return null;
    
    // Renderowanie wskaźnika stanu technicznego
    const renderGauge = (value) => {
      return (
        <GaugeContainer>
          <GaugeBackground />
          <GaugeMask value={value} />
          <GaugeCenter />
          <GaugeValue>{value}%</GaugeValue>
          <GaugeNeedle value={value} />
        </GaugeContainer>
      );
    };
    
    return (
      <div>
        {vehicleHealth.vehicles.map((vehicle, index) => (
          <Card key={`vehicle-${index}`} title={`Pojazd: ${vehicle.vehicle}`}>
            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
              <div>Stan techniczny ogólny</div>
              {renderGauge(vehicle.overallHealth)}
            </div>
            
            <DetailTitle>Komponenty</DetailTitle>
            {Object.entries(vehicle.components).map(([component, health], idx) => (
              <DetailRow key={`component-${idx}`}>
                <DetailLabel>{component}:</DetailLabel>
                <DetailValue>
                  {health}%
                  <div style={{ 
                    width: '100%', 
                    height: '8px', 
                    backgroundColor: '#e0e0e0',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    marginTop: '4px'
                  }}>
                    <div style={{ 
                      height: '100%', 
                      width: `${health}%`, 
                      backgroundColor: health >= 80 ? '#4caf50' : health >= 50 ? '#ff9800' : '#f44336',
                      borderRadius: '4px'
                    }} />
                  </div>
                </DetailValue>
              </DetailRow>
            ))}
          </Card>
        ))}
      </div>
    );
  };
  
  // Renderowanie historii konserwacji
  const renderMaintenanceHistory = () => {
    if (!maintenanceHistory) return null;
    
    return (
      <TimelineContainer>
        <DetailTitle>Historia konserwacji</DetailTitle>
        
        {maintenanceHistory.history.map((item, index) => (
          <TimelineItem key={`history-${index}`}>
            <TimelineDot color={
              item.type === 'preventive' ? '#4caf50' : 
              item.type === 'corrective' ? '#f44336' : 
              '#2196f3'
            } />
            <TimelineContent>
              <TimelineDate>{item.date} - {item.vehicle}</TimelineDate>
              <TimelineDescription>
                <strong>{item.component}</strong>: {item.description}
              </TimelineDescription>
              <TimelineDescription>
                Koszt: {item.cost} zł | Czas: {item.duration} godz.
              </TimelineDescription>
            </TimelineContent>
          </TimelineItem>
        ))}
      </TimelineContainer>
    );
  };
  
  // Renderowanie harmonogramu konserwacji
  const renderMaintenanceSchedule = () => {
    if (!maintenanceSchedule) return null;
    
    return (
      <TimelineContainer>
        <DetailTitle>Harmonogram konserwacji</DetailTitle>
        
        {maintenanceSchedule.schedule.map((item, index) => (
          <TimelineItem key={`schedule-${index}`}>
            <TimelineDot color={
              item.priority === 'high' ? '#f44336' : 
              item.priority === 'medium' ? '#ff9800' : 
              '#4caf50'
            } />
            <TimelineContent>
              <TimelineDate>{item.date} - {item.vehicle}</TimelineDate>
              <TimelineDescription>
                <strong>{item.component}</strong>: {item.description}
              </TimelineDescription>
              <TimelineDescription>
                Szacowany koszt: {item.estimatedCost} zł | Szacowany czas: {item.estimatedDuration} godz.
              </TimelineDescription>
            </TimelineContent>
          </TimelineItem>
        ))}
      </TimelineContainer>
    );
  };
  
  // Renderowanie analizy kosztów
  const renderCostAnalysis = () => {
    if (!costAnalysis) return null;
    
    // Renderowanie wykresu słupkowego
    const renderBarChart = () => {
      const maxValue = Math.max(...costAnalysis.monthlyCosts.map(item => item.cost));
      
      return (
        <ChartContainer>
          <DetailTitle>Miesięczne koszty konserwacji</DetailTitle>
          <BarChart>
            {costAnalysis.monthlyCosts.map((item, index) => (
              <BarChartBar 
                key={`bar-${index}`}
                height={(item.cost / maxValue) * 100}
                color="#3f51b5"
                data-value={`${item.cost} zł`}
                data-label={item.month}
              />
            ))}
          </BarChart>
        </ChartContainer>
      );
    };
    
    return (
      <div>
        <Card title="Analiza kosztów konserwacji">
          <GridSection>
            <KPICard 
              title="Całkowity koszt" 
              value={`${costAnalysis.totalCost} zł`} 
              icon="💰"
            />
            <KPICard 
              title="Szacowane oszczędności" 
              value={`${costAnalysis.savingsEstimate} zł`} 
              icon="💹"
              trend="up"
              trendValue={`${Math.round((costAnalysis.savingsEstimate / costAnalysis.totalCost) * 100)}%`}
              trendPositive
            />
          </GridSection>
          
          <DetailTitle>Podział kosztów</DetailTitle>
          {costAnalysis.costBreakdown.map((item, index) => (
            <DetailRow key={`cost-${index}`}>
              <DetailLabel>{item.category}:</DetailLabel>
              <DetailValue>
                {item.cost} zł ({item.percentage}%)
                <div style={{ 
                  width: '100%', 
                  height: '8px', 
                  backgroundColor: '#e0e0e0',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  marginTop: '4px'
                }}>
                  <div style={{ 
                    height: '100%', 
                    width: `${item.percentage}%`, 
                    backgroundColor: item.color,
                    borderRadius: '4px'
                  }} />
                </div>
              </DetailValue>
            </DetailRow>
          ))}
          
          {renderBarChart()}
        </Card>
      </div>
    );
  };
  
  if (isLoading) {
    return (
      <PageContainer>
        <LoadingIndicator>Ładowanie danych konserwacji predykcyjnej...</LoadingIndicator>
      </PageContainer>
    );
  }
  
  if (error) {
    return (
      <PageContainer>
        <ErrorMessage>{error}</ErrorMessage>
      </PageContainer>
    );
  }
  
  return (
    <PageContainer>
      <SectionTitle>KONSERWACJA PREDYKCYJNA</SectionTitle>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <TabsContainer>
          <Tab 
            active={activeTab === 'alerts'} 
            onClick={() => setActiveTab('alerts')}
          >
            Alerty konserwacji
          </Tab>
          <Tab 
            active={activeTab === 'health'} 
            onClick={() => setActiveTab('health')}
          >
            Stan techniczny
          </Tab>
          <Tab 
            active={activeTab === 'history'} 
            onClick={() => setActiveTab('history')}
          >
            Historia i harmonogram
          </Tab>
          <Tab 
            active={activeTab === 'costs'} 
            onClick={() => setActiveTab('costs')}
          >
            Analiza kosztów
          </Tab>
        </TabsContainer>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '14px', color: '#666' }}>Źródło danych:</span>
          <Button 
            onClick={handleToggleDataSource}
            style={{ 
              backgroundColor: !useMockData ? '#3f51b5' : 'white',
              color: !useMockData ? 'white' : '#3f51b5'
            }}
          >
            API
          </Button>
          <Button 
            onClick={handleToggleDataSource}
            style={{ 
              backgroundColor: useMockData ? '#3f51b5' : 'white',
              color: useMockData ? 'white' : '#3f51b5'
            }}
          >
            Mock
          </Button>
        </div>
      </div>
      
      {activeTab === 'alerts' && (
        <>
          {renderFilters()}
          <Card title="Alerty konserwacji predykcyjnej" fullWidth>
            {renderAlertsTable()}
          </Card>
          {selectedAlert && renderAlertDetails()}
        </>
      )}
      
      {activeTab === 'health' && (
        <>
          <GridSection>
            {renderVehicleHealth()}
          </GridSection>
        </>
      )}
      
      {activeTab === 'history' && (
        <>
          <Card title="Historia i harmonogram konserwacji" fullWidth>
            {renderMaintenanceHistory()}
            {renderMaintenanceSchedule()}
          </Card>
        </>
      )}
      
      {activeTab === 'costs' && (
        <>
          {renderCostAnalysis()}
        </>
      )}
    </PageContainer>
  );
};

export default PredictiveMaintenance;
