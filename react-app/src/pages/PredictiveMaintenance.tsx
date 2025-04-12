import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Card from '../components/common/Card';
import KPICard from '../components/common/KPICard';
import Table from '../components/common/Table';
import predictiveMaintenanceService, { 
  MaintenanceAlert, 
  MaintenanceAlertsResponse, 
  VehicleHealth,
  VehicleHealthResponse,
  MaintenanceHistoryResponse,
  MaintenanceScheduleResponse,
  MaintenanceCostAnalysis
} from '../services/api/predictiveMaintenanceService';

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

const Button = styled.button<{ primary?: boolean }>`
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

const Badge = styled.span<{ color: string }>`
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

const Tab = styled.div<{ active: boolean }>`
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

const GaugeMask = styled.div<{ value: number }>`
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

const GaugeNeedle = styled.div<{ value: number }>`
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

const BarChartBar = styled.div<{ height: number; color: string }>`
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

const TimelineDot = styled.div<{ color: string }>`
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

const PredictiveMaintenance: React.FC = () => {
  // Stan dla alertów konserwacji
  const [alerts, setAlerts] = useState<MaintenanceAlertsResponse | null>(null);
  
  // Stan dla wybranego alertu
  const [selectedAlert, setSelectedAlert] = useState<MaintenanceAlert | null>(null);
  
  // Stan dla stanu technicznego pojazdów
  const [vehicleHealth, setVehicleHealth] = useState<VehicleHealthResponse | null>(null);
  
  // Stan dla historii konserwacji
  const [maintenanceHistory, setMaintenanceHistory] = useState<MaintenanceHistoryResponse | null>(null);
  
  // Stan dla harmonogramu konserwacji
  const [maintenanceSchedule, setMaintenanceSchedule] = useState<MaintenanceScheduleResponse | null>(null);
  
  // Stan dla analizy kosztów
  const [costAnalysis, setCostAnalysis] = useState<MaintenanceCostAnalysis | null>(null);
  
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
  const [activeTab, setActiveTab] = useState<string>('alerts');
  
  // Stany ładowania i błędów
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDetailLoading, setIsDetailLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // Pobieranie danych przy montowaniu komponentu
  useEffect(() => {
    const fetchMaintenanceData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Pobieranie alertów konserwacji
        const alertsResponse = await predictiveMaintenanceService.getAlerts(
          filters.priority !== 'all' ? filters.priority : undefined,
          filters.vehicle || undefined,
          filters.component || undefined,
          filters.status !== 'all' ? filters.status : undefined,
          filters.page,
          filters.limit
        );
        setAlerts(alertsResponse);
        
        // Pobieranie stanu technicznego pojazdów
        const healthResponse = await predictiveMaintenanceService.getVehicleHealth();
        setVehicleHealth(healthResponse);
        
        // Pobieranie historii konserwacji
        const historyResponse = await predictiveMaintenanceService.getMaintenanceHistory(
          undefined, undefined, undefined, undefined, 1, 5
        );
        setMaintenanceHistory(historyResponse);
        
        // Pobieranie harmonogramu konserwacji
        const scheduleResponse = await predictiveMaintenanceService.getMaintenanceSchedule(
          undefined, undefined, undefined, undefined, 1, 5
        );
        setMaintenanceSchedule(scheduleResponse);
        
        // Pobieranie analizy kosztów
        const costResponse = await predictiveMaintenanceService.getCostAnalysis();
        setCostAnalysis(costResponse);
      } catch (err) {
        console.error('Error fetching maintenance data:', err);
        setError('Nie udało się pobrać danych konserwacji predykcyjnej. Spróbuj odświeżyć stronę.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMaintenanceData();
  }, [filters.priority, filters.status, filters.page, filters.limit]);
  
  // Obsługa zmiany filtrów
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
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
  const handlePageChange = (newPage: number) => {
    setFilters({
      ...filters,
      page: newPage
    });
  };
  
  // Obsługa kliknięcia wiersza alertu
  const handleAlertClick = async (alert: MaintenanceAlert) => {
    setIsDetailLoading(true);
    
    try {
      const alertDetails = await predictiveMaintenanceService.getAlertDetails(alert.id);
      setSelectedAlert(alertDetails);
    } catch (err) {
      console.error('Error fetching alert details:', err);
      setError('Nie udało się pobrać szczegółów alertu.');
    } finally {
      setIsDetailLoading(false);
    }
  };
  
  // Obsługa aktualizacji statusu alertu
  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      await predictiveMaintenanceService.updateAlertStatus(id, newStatus);
      
      // Odświeżenie listy alertów
      const alertsResponse = await predictiveMaintenanceService.getAlerts(
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
    
    const getPriorityBadge = (priority: string) => {
      const colors: Record<string, string> = {
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
    
    const getStatusBadge = (status: string) => {
      const colors: Record<string, string> = {
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
    
    const getConfidenceBadge = (confidence: string) => {
      const confidenceValue = parseInt(confidence);
      let color = '#f44336';
      
      if (confidenceValue >= 80) {
        color = '#4caf50';
      } else if (confidenceValue >= 60) {
        color = '#8bc34a';
      } else if (confidenceValue >= 40) {
        color = '#ffeb3b';
      } else if (confidenceValue >= 20) {
        color = '#ff9800';
      }
      
      return (
        <Badge color={color}>
          {confidence}%
        </Badge>
      );
    };
    
    const columns = [
      { 
        key: 'priority', 
        header: 'Priorytet',
        render: (alert: MaintenanceAlert) => getPriorityBadge(alert.priority)
      },
      { key: 'vehicle', header: 'Pojazd' },
      { key: 'component', header: 'Komponent' },
      { key: 'description', header: 'Opis' },
      { key: 'forecastDate', header: 'Prognoza' },
      { 
        key: 'confidence', 
        header: 'Pewność',
        render: (alert: MaintenanceAlert) => getConfidenceBadge(alert.confidence)
      },
      { 
        key: 'status', 
        header: 'Status',
        render: (alert: MaintenanceAlert) => getStatusBadge(alert.status)
      }
    ];
    
    return (
      <>
        <Table 
          data={alerts.alerts}
          columns={columns}
          onRowClick={handleAlertClick}
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
          <DetailLabel>Opis:</DetailLabel>
          <DetailValue>{selectedAlert.description}</DetailValue>
        </DetailRow>
        
        <DetailRow>
          <DetailLabel>Prognoza awarii:</DetailLabel>
          <DetailValue>{selectedAlert.forecastDate}</DetailValue>
        </DetailRow>
        
        <DetailRow>
          <DetailLabel>Pewność prognozy:</DetailLabel>
          <DetailValue>{selectedAlert.confidence}%</DetailValue>
        </DetailRow>
        
        <DetailRow>
          <DetailLabel>Status:</DetailLabel>
          <DetailValue>
            <FilterSelect 
              value={selectedAlert.status} 
              onChange={(e) => handleStatusUpdate(selectedAlert.id, e.target.value)}
            >
              <option value="new">Nowy</option>
              <option value="inProgress">W trakcie</option>
              <option value="scheduled">Zaplanowany</option>
              <option value="completed">Zakończony</option>
            </FilterSelect>
          </DetailValue>
        </DetailRow>
        
        {selectedAlert.details && (
          <>
            <DetailTitle style={{ marginTop: '16px' }}>Szczegóły komponentu</DetailTitle>
            
            <DetailRow>
              <DetailLabel>ID komponentu:</DetailLabel>
              <DetailValue>{selectedAlert.details.componentId}</DetailValue>
            </DetailRow>
            
            <DetailRow>
              <DetailLabel>Typ komponentu:</DetailLabel>
              <DetailValue>{selectedAlert.details.componentType}</DetailValue>
            </DetailRow>
            
            <DetailRow>
              <DetailLabel>Ostatnia konserwacja:</DetailLabel>
              <DetailValue>{selectedAlert.details.lastMaintenance}</DetailValue>
            </DetailRow>
            
            <DetailRow>
              <DetailLabel>Obecny stan:</DetailLabel>
              <DetailValue>{selectedAlert.details.currentCondition}</DetailValue>
            </DetailRow>
            
            <DetailRow>
              <DetailLabel>Szacowana żywotność:</DetailLabel>
              <DetailValue>{selectedAlert.details.estimatedLifeRemaining}</DetailValue>
            </DetailRow>
            
            <DetailRow>
              <DetailLabel>Prawdopodobieństwo awarii:</DetailLabel>
              <DetailValue>{selectedAlert.details.failureProbability}%</DetailValue>
            </DetailRow>
            
            <DetailRow>
              <DetailLabel>Zalecane działanie:</DetailLabel>
              <DetailValue>{selectedAlert.details.recommendedAction}</DetailValue>
            </DetailRow>
            
            <DetailRow>
              <DetailLabel>Szacowany koszt:</DetailLabel>
              <DetailValue>{selectedAlert.details.estimatedCost} zł</DetailValue>
            </DetailRow>
            
            {selectedAlert.details.sensorData && selectedAlert.details.sensorData.length > 0 && (
              <>
                <DetailTitle style={{ marginTop: '16px' }}>Dane z czujników</DetailTitle>
                
                {selectedAlert.details.sensorData.map((sensor, index) => (
                  <div key={index} style={{ marginBottom: '16px' }}>
                    <DetailRow>
                      <DetailLabel>Czujnik:</DetailLabel>
                      <DetailValue>{sensor.sensorType} ({sensor.sensorId})</DetailValue>
                    </DetailRow>
                    
                    <DetailRow>
                      <DetailLabel>Jednostka:</DetailLabel>
                      <DetailValue>{sensor.unit}</DetailValue>
                    </DetailRow>
                    
                    <DetailRow>
                      <DetailLabel>Próg alarmowy:</DetailLabel>
                      <DetailValue>{sensor.threshold} {sensor.unit}</DetailValue>
                    </DetailRow>
                    
                    <ChartContainer>
                      <div style={{ fontSize: '14px', marginBottom: '8px' }}>Ostatnie odczyty:</div>
                      <BarChart>
                        {sensor.readings.slice(-5).map((reading, idx) => {
                          const value = reading.value;
                          const height = (value / (sensor.threshold * 1.5)) * 100;
                          const color = value > sensor.threshold ? '#f44336' : '#4caf50';
                          const date = new Date(reading.timestamp).toLocaleDateString();
                          
                          return (
                            <BarChartBar 
                              key={idx} 
                              height={Math.min(height, 100)} 
                              color={color}
                              data-value={`${value} ${sensor.unit}`}
                              data-label={date}
                            />
                          );
                        })}
                      </BarChart>
                    </ChartContainer>
                  </div>
                ))}
              </>
            )}
          </>
        )}
      </DetailContainer>
    );
  };
  
  // Renderowanie stanu technicznego pojazdów
  const renderVehicleHealth = () => {
    if (!vehicleHealth) return null;
    
    return (
      <Card title="Stan techniczny pojazdów">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
          {vehicleHealth.vehicles.slice(0, 3).map((vehicle, index) => (
            <div key={index} style={{ textAlign: 'center', width: '200px' }}>
              <h3>{vehicle.vehicle}</h3>
              
              <GaugeContainer>
                <GaugeBackground />
                <GaugeMask value={vehicle.overallHealth} />
                <GaugeCenter />
                <GaugeValue>{vehicle.overallHealth}%</GaugeValue>
                <GaugeNeedle value={vehicle.overallHealth} />
              </GaugeContainer>
              
              <div style={{ marginTop: '20px', textAlign: 'left' }}>
                {vehicle.components.map((component, idx) => (
                  <div key={idx} style={{ marginBottom: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>{component.name}</span>
                      <span>{component.health}%</span>
                    </div>
                    <div style={{ width: '100%', height: '4px', backgroundColor: '#e0e0e0', borderRadius: '2px', overflow: 'hidden' }}>
                      <div 
                        style={{ 
                          height: '100%', 
                          width: `${component.health}%`, 
                          backgroundColor: component.health > 70 ? '#4caf50' : component.health > 40 ? '#ff9800' : '#f44336',
                          borderRadius: '2px'
                        }} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
  };
  
  // Renderowanie harmonogramu konserwacji
  const renderMaintenanceSchedule = () => {
    if (!maintenanceSchedule) return null;
    
    const getStatusBadge = (status: string) => {
      const colors: Record<string, string> = {
        scheduled: '#2196f3',
        inProgress: '#ff9800',
        completed: '#4caf50',
        cancelled: '#f44336'
      };
      
      return (
        <Badge color={colors[status] || '#2196f3'}>
          {status === 'scheduled' ? 'Zaplanowany' : 
           status === 'inProgress' ? 'W trakcie' : 
           status === 'completed' ? 'Zakończony' : 
           status === 'cancelled' ? 'Anulowany' : status}
        </Badge>
      );
    };
    
    return (
      <Card title="Harmonogram konserwacji">
        <Table 
          data={maintenanceSchedule.schedule}
          columns={[
            { key: 'vehicle', header: 'Pojazd' },
            { key: 'scheduledDate', header: 'Data' },
            { key: 'type', header: 'Typ' },
            { key: 'estimatedDuration', header: 'Czas trwania' },
            { key: 'estimatedCost', header: 'Koszt', render: (item: any) => `${item.estimatedCost} zł` },
            { key: 'status', header: 'Status', render: (item: any) => getStatusBadge(item.status) }
          ]}
        />
      </Card>
    );
  };
  
  // Renderowanie historii konserwacji
  const renderMaintenanceHistory = () => {
    if (!maintenanceHistory) return null;
    
    return (
      <Card title="Historia konserwacji">
        <TimelineContainer>
          {maintenanceHistory.history.map((item, index) => (
            <TimelineItem key={index}>
              <TimelineDot color="#3f51b5" />
              <TimelineContent>
                <TimelineDate>{item.date} - {item.vehicle}</TimelineDate>
                <TimelineDescription>
                  <strong>{item.type}</strong> - {item.components.join(', ')}
                  <br />
                  Koszt: {item.cost} zł | Technik: {item.technician}
                </TimelineDescription>
              </TimelineContent>
            </TimelineItem>
          ))}
        </TimelineContainer>
      </Card>
    );
  };
  
  // Renderowanie analizy kosztów
  const renderCostAnalysis = () => {
    if (!costAnalysis) return null;
    
    return (
      <Card title="Analiza kosztów konserwacji">
        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
          <h3>Całkowity koszt: {costAnalysis.totalCost.toLocaleString()} zł</h3>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
          <div style={{ textAlign: 'center' }}>
            <h4>Konserwacja prewencyjna vs. naprawy</h4>
            <div style={{ display: 'flex', height: '20px', width: '200px', borderRadius: '10px', overflow: 'hidden' }}>
              <div 
                style={{ 
                  width: `${(costAnalysis.preventiveVsCorrective.preventive / (costAnalysis.preventiveVsCorrective.preventive + costAnalysis.preventiveVsCorrective.corrective)) * 100}%`, 
                  backgroundColor: '#4caf50' 
                }} 
              />
              <div 
                style={{ 
                  width: `${(costAnalysis.preventiveVsCorrective.corrective / (costAnalysis.preventiveVsCorrective.preventive + costAnalysis.preventiveVsCorrective.corrective)) * 100}%`, 
                  backgroundColor: '#f44336' 
                }} 
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginTop: '4px' }}>
              <div>Prewencyjna: {costAnalysis.preventiveVsCorrective.preventive.toLocaleString()} zł</div>
              <div>Naprawy: {costAnalysis.preventiveVsCorrective.corrective.toLocaleString()} zł</div>
            </div>
          </div>
        </div>
        
        <ChartContainer>
          <div style={{ fontSize: '14px', marginBottom: '8px' }}>Koszty według miesięcy:</div>
          <BarChart>
            {costAnalysis.costByMonth.map((item, index) => {
              const maxCost = Math.max(...costAnalysis.costByMonth.map(i => i.cost));
              const height = (item.cost / maxCost) * 100;
              
              return (
                <BarChartBar 
                  key={index} 
                  height={height} 
                  color="#3f51b5"
                  data-value={`${item.cost.toLocaleString()} zł`}
                  data-label={item.month}
                />
              );
            })}
          </BarChart>
        </ChartContainer>
      </Card>
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
          active={activeTab === 'schedule'} 
          onClick={() => setActiveTab('schedule')}
        >
          Harmonogram i historia
        </Tab>
        <Tab 
          active={activeTab === 'costs'} 
          onClick={() => setActiveTab('costs')}
        >
          Analiza kosztów
        </Tab>
      </TabsContainer>
      
      {activeTab === 'alerts' && (
        <>
          {renderFilters()}
          
          <Card title="Alerty konserwacji" fullWidth>
            {renderAlertsTable()}
          </Card>
          
          {selectedAlert && (
            <Card title="Szczegóły alertu" fullWidth>
              {isDetailLoading ? (
                <LoadingIndicator>Ładowanie szczegółów...</LoadingIndicator>
              ) : (
                renderAlertDetails()
              )}
            </Card>
          )}
        </>
      )}
      
      {activeTab === 'health' && (
        <>
          {renderVehicleHealth()}
        </>
      )}
      
      {activeTab === 'schedule' && (
        <GridSection>
          {renderMaintenanceSchedule()}
          {renderMaintenanceHistory()}
        </GridSection>
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
