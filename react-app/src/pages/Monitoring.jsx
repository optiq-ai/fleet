import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Card from '../components/common/Card';
import KPICard from '../components/common/KPICard';
import Table from '../components/common/Table';
import ViewSelector from '../components/common/ViewSelector';
import monitoringService from '../services/api/monitoringService';
import mockMonitoringService from '../services/api/mockMonitoringService';

// Styled components
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

const GridSection = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 20px;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const MapContainer = styled.div`
  height: 400px;
  background-color: #f5f5f5;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
`;

const MapPlaceholder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #666;
`;

const MapPoint = styled.div`
  position: absolute;
  top: ${props => props.y}%;
  left: ${props => props.x}%;
  width: 12px;
  height: 12px;
  background-color: ${props => props.color || '#3f51b5'};
  border-radius: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  
  &:hover {
    width: 16px;
    height: 16px;
    z-index: 10;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 24px;
    height: 24px;
    background-color: ${props => props.color || '#3f51b5'}33;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
  }
`;

const MapTooltip = styled.div`
  position: absolute;
  background-color: white;
  border-radius: 4px;
  padding: 8px 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 100;
  display: ${props => props.visible ? 'block' : 'none'};
  max-width: 200px;
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

const ViewAllButton = styled.button`
  background-color: transparent;
  border: none;
  color: #3f51b5;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  text-align: center;
  display: block;
  margin: 16px auto 0;
  
  &:hover {
    text-decoration: underline;
    background-color: #f5f5f5;
    border-radius: 4px;
  }
`;

const ChartContainer = styled.div`
  height: 250px;
  background-color: #f9f9f9;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #666;
  margin-top: 12px;
`;

const VehicleStatusContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
`;

const StatusItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StatusCount = styled.div`
  font-size: 24px;
  font-weight: 500;
  color: ${props => props.color || '#333'};
`;

const StatusLabel = styled.div`
  font-size: 14px;
  color: #666;
  margin-top: 4px;
`;

const DataSourceToggle = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const ToggleLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
`;

const ToggleSwitch = styled.div`
  position: relative;
  width: 50px;
  height: 24px;
  background-color: ${props => props.checked ? '#3f51b5' : '#ccc'};
  border-radius: 12px;
  margin: 0 8px;
  transition: background-color 0.3s;
  
  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: ${props => props.checked ? '26px' : '2px'};
    width: 20px;
    height: 20px;
    background-color: white;
    border-radius: 50%;
    transition: left 0.3s;
  }
`;

const VehicleDetailsCard = styled(Card)`
  margin-top: 20px;
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
  
  &:last-child {
    border-bottom: none;
  }
`;

const DetailLabel = styled.div`
  color: #666;
`;

const DetailValue = styled.div`
  font-weight: 500;
  color: #333;
`;

const GaugeContainer = styled.div`
  position: relative;
  width: 100%;
  height: 120px;
  margin: 20px 0;
`;

const GaugeBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 20px;
  background-color: #f0f0f0;
  border-radius: 10px;
`;

const GaugeFill = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: ${props => props.percentage}%;
  height: 20px;
  background-color: ${props => {
    if (props.percentage > 75) return '#4caf50';
    if (props.percentage > 25) return '#ff9800';
    return '#f44336';
  }};
  border-radius: 10px;
  transition: width 0.5s ease;
`;

const GaugeLabel = styled.div`
  position: absolute;
  top: 30px;
  left: ${props => props.percentage}%;
  transform: translateX(-50%);
  font-size: 14px;
  font-weight: 500;
  color: #333;
`;

/**
 * Monitoring component for real-time vehicle monitoring, GPS tracking, fuel consumption, alerts, and KPIs
 * @returns {JSX.Element} Monitoring component
 */
const Monitoring = () => {
  // State for vehicles data
  const [vehicles, setVehicles] = useState([]);
  
  // State for selected vehicle
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  
  // State for alerts
  const [alerts, setAlerts] = useState([]);
  
  // State for KPI data
  const [kpiData, setKpiData] = useState(null);
  
  // State for fuel consumption data
  const [fuelData, setFuelData] = useState(null);
  
  // State for trend data
  const [trendData, setTrendData] = useState(null);
  
  // State for map tooltip
  const [tooltip, setTooltip] = useState({
    visible: false,
    content: '',
    x: 0,
    y: 0
  });
  
  // State for active tab
  const [activeTab, setActiveTab] = useState('vehicles');
  
  // States for loading and errors
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State for data source toggle (API vs Mock)
  const [useMockData, setUseMockData] = useState(true);
  
  // Select data service based on toggle state
  const dataService = useMockData ? mockMonitoringService : monitoringService;
  
  // Fetch data on component mount and when data source changes
  useEffect(() => {
    const fetchMonitoringData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Fetch vehicles data
        const vehiclesData = await dataService.getVehicles();
        setVehicles(vehiclesData);
        
        // Set first vehicle as selected by default if none is selected
        if (!selectedVehicle && vehiclesData.length > 0) {
          setSelectedVehicle(vehiclesData[0]);
        }
        
        // Fetch alerts
        const alertsData = await dataService.getAlerts();
        setAlerts(alertsData);
        
        // Fetch KPI data
        const kpiResponse = await dataService.getKPIData();
        setKpiData(kpiResponse);
        
        // Fetch fuel consumption data
        const fuelResponse = await dataService.getFuelConsumptionData();
        setFuelData(fuelResponse);
        
        // Fetch trend data
        const trendResponse = await dataService.getTrendData();
        setTrendData(trendResponse);
      } catch (err) {
        console.error('Error fetching monitoring data:', err);
        setError('Nie udało się pobrać danych monitoringu. Spróbuj odświeżyć stronę.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMonitoringData();
  }, [dataService, useMockData]);
  
  // Handle vehicle selection
  const handleVehicleSelect = async (vehicleId) => {
    try {
      const vehicle = vehicles.find(v => v.id === vehicleId);
      setSelectedVehicle(vehicle);
    } catch (err) {
      console.error('Error selecting vehicle:', err);
    }
  };
  
  // Handle alert acknowledgement
  const handleAcknowledgeAlert = async (alertId) => {
    try {
      const success = await dataService.acknowledgeAlert(alertId);
      if (success) {
        // Update alerts list
        setAlerts(alerts.map(alert => 
          alert.id === alertId ? { ...alert, acknowledged: true } : alert
        ));
      }
    } catch (err) {
      console.error('Error acknowledging alert:', err);
    }
  };
  
  // Handle map point hover
  const handleMapPointHover = (vehicle, event) => {
    const rect = event.target.getBoundingClientRect();
    setTooltip({
      visible: true,
      content: `${vehicle.name} (${vehicle.status})`,
      x: rect.left,
      y: rect.top - 30
    });
  };
  
  // Handle map point leave
  const handleMapPointLeave = () => {
    setTooltip({
      ...tooltip,
      visible: false
    });
  };
  
  // Handle data source toggle
  const handleToggleDataSource = () => {
    setUseMockData(!useMockData);
  };
  
  // Calculate vehicle status counts
  const getVehicleStatusCounts = () => {
    if (!vehicles.length) return { active: 0, maintenance: 0, inactive: 0 };
    
    return vehicles.reduce((counts, vehicle) => {
      const status = vehicle.status.toLowerCase();
      if (status === 'active') counts.active++;
      else if (status === 'maintenance') counts.maintenance++;
      else if (status === 'inactive') counts.inactive++;
      return counts;
    }, { active: 0, maintenance: 0, inactive: 0 });
  };
  
  // Render KPI section
  const renderKPISection = () => {
    if (!kpiData) return null;
    
    return (
      <>
        <SectionTitle>KLUCZOWE WSKAŹNIKI</SectionTitle>
        <GridSection>
          <KPICard 
            title="Pojazdy aktywne" 
            value={`${kpiData.activeVehicles}/${kpiData.totalVehicles}`} 
            icon="🚚"
            trend="up"
            trendValue="5%"
          />
          <KPICard 
            title="Średnie zużycie paliwa" 
            value={`${kpiData.averageFuelConsumption.toFixed(1)} l/100km`} 
            icon="⛽"
            trend="down"
            trendValue="3.2%"
            trendPositive
          />
          <KPICard 
            title="Całkowity dystans" 
            value={`${kpiData.totalDistance.toLocaleString()} km`} 
            icon="🛣️"
            trend="up"
            trendValue="8.5%"
          />
          <KPICard 
            title="Średnia prędkość" 
            value={`${kpiData.averageSpeed.toFixed(1)} km/h`} 
            icon="⏱️"
            trend="up"
            trendValue="2.1%"
          />
          <KPICard 
            title="Czas bezczynności" 
            value={`${kpiData.idleTime} min`} 
            icon="⏸️"
            trend="down"
            trendValue="12%"
            trendPositive
          />
          <KPICard 
            title="Aktywne alerty" 
            value={kpiData.alertsCount.toString()} 
            icon="⚠️"
            trend="up"
            trendValue="15%"
          />
        </GridSection>
      </>
    );
  };
  
  // Render vehicle map section
  const renderVehicleMapSection = () => {
    if (!vehicles.length) return null;
    
    // Convert Poland coordinates to percentage values for the map
    const convertCoordinatesToPercentage = (lat, lng) => {
      // Approximate bounds for Poland
      const minLat = 49.0; // South
      const maxLat = 55.0; // North
      const minLng = 14.0; // West
      const maxLng = 24.0; // East
      
      const latRange = maxLat - minLat;
      const lngRange = maxLng - minLng;
      
      // Convert to percentage (y is inverted because 0% is at the top)
      const x = ((lng - minLng) / lngRange) * 100;
      const y = 100 - ((lat - minLat) / latRange) * 100;
      
      return { x, y };
    };
    
    // Get color based on vehicle status
    const getVehicleStatusColor = (status) => {
      switch (status.toLowerCase()) {
        case 'active': return '#4caf50'; // Green
        case 'maintenance': return '#ff9800'; // Orange
        case 'inactive': return '#f44336'; // Red
        default: return '#3f51b5'; // Blue
      }
    };
    
    return (
      <>
        <SectionTitle>ŚLEDZENIE LOKALIZACJI GPS</SectionTitle>
        <Card fullWidth>
          <MapContainer>
            <MapPlaceholder>Mapa Polski z lokalizacjami pojazdów</MapPlaceholder>
            
            {vehicles.map(vehicle => {
              const { x, y } = convertCoordinatesToPercentage(
                vehicle.location.lat, 
                vehicle.location.lng
              );
              const color = getVehicleStatusColor(vehicle.status);
              
              return (
                <MapPoint 
                  key={vehicle.id}
                  x={x}
                  y={y}
                  color={color}
                  onClick={() => handleVehicleSelect(vehicle.id)}
                  onMouseEnter={(e) => handleMapPointHover(vehicle, e)}
                  onMouseLeave={handleMapPointLeave}
                />
              );
            })}
            
            <MapTooltip 
              visible={tooltip.visible}
              style={{ 
                top: `${tooltip.y}px`, 
                left: `${tooltip.x}px` 
              }}
            >
              {tooltip.content}
            </MapTooltip>
          </MapContainer>
        </Card>
      </>
    );
  };
  
  // Render vehicle monitoring section
  const renderVehicleMonitoringSection = () => {
    if (!vehicles.length) return null;
    
    const statusCounts = getVehicleStatusCounts();
    
    return (
      <>
        <SectionTitle>MONITOROWANIE STANU POJAZDÓW</SectionTitle>
        <Card fullWidth>
          <TabsContainer>
            <Tab 
              active={activeTab === 'vehicles'} 
              onClick={() => setActiveTab('vehicles')}
            >
              Pojazdy
            </Tab>
            <Tab 
              active={activeTab === 'alerts'} 
              onClick={() => setActiveTab('alerts')}
            >
              Alerty ({alerts.length})
            </Tab>
            <Tab 
              active={activeTab === 'fuel'} 
              onClick={() => setActiveTab('fuel')}
            >
              Zużycie paliwa
            </Tab>
          </TabsContainer>
          
          {activeTab === 'vehicles' && (
            <>
              <VehicleStatusContainer>
                <StatusItem>
                  <StatusCount color="#4caf50">{statusCounts.active}</StatusCount>
                  <StatusLabel>Aktywne</StatusLabel>
                </StatusItem>
                <StatusItem>
                  <StatusCount color="#ff9800">{statusCounts.maintenance}</StatusCount>
                  <StatusLabel>W serwisie</StatusLabel>
                </StatusItem>
                <StatusItem>
                  <StatusCount color="#f44336">{statusCounts.inactive}</StatusCount>
                  <StatusLabel>Nieaktywne</StatusLabel>
                </StatusItem>
              </VehicleStatusContainer>
              
              <Table 
                headers={['ID', 'Nazwa', 'Typ', 'Status', 'Kierowca']}
                data={vehicles.map(vehicle => [
                  vehicle.id,
                  vehicle.name,
                  vehicle.type,
                  vehicle.status,
                  vehicle.driver
                ])}
                onRowClick={(index) => handleVehicleSelect(vehicles[index].id)}
              />
            </>
          )}
          
          {activeTab === 'alerts' && (
            <Table 
              headers={['Pojazd', 'Typ', 'Priorytet', 'Wiadomość', 'Czas', 'Status']}
              data={alerts.map(alert => [
                alert.vehicleId,
                alert.type,
                alert.severity,
                alert.message,
                alert.timestamp,
                alert.acknowledged ? 'Potwierdzony' : 'Nowy'
              ])}
              onRowClick={(index) => handleAcknowledgeAlert(alerts[index].id)}
            />
          )}
          
          {activeTab === 'fuel' && fuelData && (
            <>
              <DetailRow>
                <DetailLabel>Średnie zużycie:</DetailLabel>
                <DetailValue>{fuelData.averageConsumption.toFixed(1)} l/100km</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel>Całkowite zużycie:</DetailLabel>
                <DetailValue>{fuelData.totalConsumption.toFixed(1)} l</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel>Koszt paliwa:</DetailLabel>
                <DetailValue>{fuelData.totalCost.toLocaleString()} zł</DetailValue>
              </DetailRow>
              <ChartContainer>Wykres zużycia paliwa w czasie</ChartContainer>
            </>
          )}
        </Card>
      </>
    );
  };
  
  // Render vehicle details section
  const renderVehicleDetailsSection = () => {
    if (!selectedVehicle) return null;
    
    return (
      <>
        <SectionTitle>SZCZEGÓŁY POJAZDU</SectionTitle>
        <VehicleDetailsCard title={`${selectedVehicle.name} (${selectedVehicle.id})`}>
          <DetailRow>
            <DetailLabel>Status:</DetailLabel>
            <DetailValue>{selectedVehicle.status}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Typ:</DetailLabel>
            <DetailValue>{selectedVehicle.type}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Kierowca:</DetailLabel>
            <DetailValue>{selectedVehicle.driver}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Poziom paliwa:</DetailLabel>
            <DetailValue>{selectedVehicle.fuelData.level}%</DetailValue>
          </DetailRow>
          
          <GaugeContainer>
            <GaugeBackground />
            <GaugeFill percentage={selectedVehicle.fuelData.level} />
            <GaugeLabel percentage={selectedVehicle.fuelData.level}>
              {selectedVehicle.fuelData.level}%
            </GaugeLabel>
          </GaugeContainer>
          
          <DetailRow>
            <DetailLabel>Średnie zużycie:</DetailLabel>
            <DetailValue>{selectedVehicle.fuelData.consumption} l/100km</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Zasięg:</DetailLabel>
            <DetailValue>{selectedVehicle.fuelData.range} km</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Prędkość:</DetailLabel>
            <DetailValue>{selectedVehicle.performance.speed} km/h</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Temperatura silnika:</DetailLabel>
            <DetailValue>{selectedVehicle.performance.engineTemp}°C</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Ciśnienie oleju:</DetailLabel>
            <DetailValue>{selectedVehicle.performance.oilPressure} bar</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Napięcie akumulatora:</DetailLabel>
            <DetailValue>{selectedVehicle.performance.batteryVoltage} V</DetailValue>
          </DetailRow>
        </VehicleDetailsCard>
      </>
    );
  };
  
  // Render trend analysis section
  const renderTrendAnalysisSection = () => {
    if (!trendData) return null;
    
    return (
      <>
        <SectionTitle>RAPORTY I ANALIZY TRENDÓW</SectionTitle>
        <GridSection>
          <Card title="Trend zużycia paliwa">
            <ChartContainer>Wykres trendu zużycia paliwa</ChartContainer>
          </Card>
          
          <Card title="Trend przejechanych kilometrów">
            <ChartContainer>Wykres trendu przejechanych kilometrów</ChartContainer>
          </Card>
          
          <Card title="Trend alertów">
            <ChartContainer>Wykres trendu liczby alertów</ChartContainer>
          </Card>
        </GridSection>
      </>
    );
  };
  
  return (
    <PageContainer>
      {/* Data source toggle */}
      <DataSourceToggle>
        <ToggleLabel>
          API
          <ToggleSwitch 
            checked={useMockData} 
            onClick={handleToggleDataSource}
          />
          Dane testowe
        </ToggleLabel>
      </DataSourceToggle>
      
      {/* Loading and error states */}
      {isLoading && <LoadingIndicator>Ładowanie danych monitoringu...</LoadingIndicator>}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      
      {/* Main content */}
      {!isLoading && !error && (
        <>
          {renderKPISection()}
          {renderVehicleMapSection()}
          {renderVehicleMonitoringSection()}
          {renderVehicleDetailsSection()}
          {renderTrendAnalysisSection()}
        </>
      )}
    </PageContainer>
  );
};

export default Monitoring;
