import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Card from '../components/common/Card';
import KPICard from '../components/common/KPICard';
import Table from '../components/common/Table';
import ViewSelector from '../components/common/ViewSelector';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';
import monitoringService from '../services/api/monitoringService';
import mockMonitoringService from '../services/api/mockMonitoringService';
import mockMonitoringChartsService from '../services/api/mockMonitoringChartsService';
import mockMonitoringMapService from '../services/api/mockMonitoringMapService';
import SuspiciousTransactionsMap from '../components/fraud/SuspiciousTransactionsMap';

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
  
  // States for chart data
  const [vehicleFuelConsumptionChart, setVehicleFuelConsumptionChart] = useState(null);
  const [fuelConsumptionTrendChart, setFuelConsumptionTrendChart] = useState(null);
  const [kilometersTrendChart, setKilometersTrendChart] = useState(null);
  const [alertsTrendChart, setAlertsTrendChart] = useState(null);
  
  // States for map data
  const [vehicleMapData, setVehicleMapData] = useState([]);
  const [isLoadingVehicleMap, setIsLoadingVehicleMap] = useState(true);
  
  // State for active tab
  const [activeTab, setActiveTab] = useState('vehicles');
  
  // States for loading and errors
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State for data source toggle (API vs Mock)
  const [useMockData, setUseMockData] = useState(true);
  
  // Register Chart.js components
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler
  );
  
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
        
        // Fetch chart data
        const vehicleFuelChartResponse = await mockMonitoringChartsService.getVehicleFuelConsumptionChart();
        setVehicleFuelConsumptionChart(vehicleFuelChartResponse);
        
        const fuelTrendChartResponse = await mockMonitoringChartsService.getFuelConsumptionTrendChart();
        setFuelConsumptionTrendChart(fuelTrendChartResponse);
        
        const kmTrendChartResponse = await mockMonitoringChartsService.getKilometersTrendChart();
        setKilometersTrendChart(kmTrendChartResponse);
        
        const alertsTrendChartResponse = await mockMonitoringChartsService.getAlertsTrendChart();
        setAlertsTrendChart(alertsTrendChartResponse);
        
        // Fetch map data
        const vehicleMapResponse = await mockMonitoringMapService.getVehicleLocationsForMapComponent();
        setVehicleMapData(vehicleMapResponse);
        setIsLoadingVehicleMap(false);
      } catch (err) {
        console.error('Error fetching monitoring data:', err);
        setError('Nie udało się pobrać danych monitoringu. Spróbuj odświeżyć stronę.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMonitoringData();
  }, [dataService, useMockData, selectedVehicle]);
  
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
  
  // Handle marker click on the map
  const handleMarkerClick = (transaction) => {
    console.log('Clicked vehicle on map:', transaction);
    // Find the corresponding vehicle and select it
    const vehicleId = transaction.id;
    if (vehicleId) {
      handleVehicleSelect(vehicleId);
    }
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
  
  // Format location for display
  const formatLocation = (location) => {
    if (!location) return "Brak danych";
    
    // If location is an object with lat/lng properties
    if (location.lat !== undefined && location.lng !== undefined) {
      return `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}`;
    }
    
    // If location is a string
    if (typeof location === 'string') {
      return location;
    }
    
    // If location has city and street properties
    if (location.city && location.street) {
      return `${location.city}, ${location.street}`;
    }
    
    // Fallback
    return JSON.stringify(location);
  };
  
  // Prepare chart data from service response
  const prepareChartData = (chartData) => {
    if (!chartData || !chartData.data) return null;
    
    // Extract labels and data from chart data
    const labels = chartData.data.map(item => item.date);
    const data = chartData.data.map(item => item.value);
    
    return { labels, data };
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
    
    return (
      <>
        <SectionTitle>ŚLEDZENIE LOKALIZACJI GPS</SectionTitle>
        <Card fullWidth>
          <MapContainer>
            {isLoadingVehicleMap ? (
              <MapPlaceholder>Ładowanie mapy pojazdów...</MapPlaceholder>
            ) : (
              <SuspiciousTransactionsMap 
                transactions={vehicleMapData}
                onMarkerClick={handleMarkerClick}
              />
            )}
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
        <SectionTitle>MONITOROWANIE POJAZDÓW</SectionTitle>
        <Card fullWidth>
          <TabsContainer>
            <Tab 
              active={activeTab === 'vehicles'} 
              onClick={() => setActiveTab('vehicles')}
            >
              Pojazdy
            </Tab>
            <Tab 
              active={activeTab === 'fuel'} 
              onClick={() => setActiveTab('fuel')}
            >
              Zużycie paliwa
            </Tab>
            <Tab 
              active={activeTab === 'alerts'} 
              onClick={() => setActiveTab('alerts')}
            >
              Alerty
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
                headers={['ID', 'Status', 'Kierowca', 'Lokalizacja', 'Ostatnia aktualizacja']}
                data={vehicles.slice(0, 5).map(vehicle => [
                  vehicle.id,
                  vehicle.status,
                  vehicle.driver,
                  formatLocation(vehicle.location),
                  vehicle.lastUpdate
                ])}
                onRowClick={(index) => handleVehicleSelect(vehicles[index].id)}
              />
              
              <ViewAllButton onClick={() => console.log('View all vehicles')}>
                Zobacz wszystkie pojazdy
              </ViewAllButton>
            </>
          )}
          
          {activeTab === 'fuel' && (
            <>
              <ChartContainer style={{ height: '300px' }}>
                {vehicleFuelConsumptionChart && (
                  <Line
                    data={{
                      labels: vehicleFuelConsumptionChart.data.map(item => item.date),
                      datasets: [
                        {
                          label: 'Zużycie paliwa',
                          data: vehicleFuelConsumptionChart.data.map(item => item.consumption),
                          borderColor: vehicleFuelConsumptionChart.colors?.line || '#3f51b5',
                          backgroundColor: vehicleFuelConsumptionChart.colors?.area || 'rgba(63, 81, 181, 0.1)',
                          borderWidth: 2,
                          tension: 0.3,
                          fill: true
                        },
                        {
                          label: vehicleFuelConsumptionChart.target?.label || 'Cel',
                          data: Array(vehicleFuelConsumptionChart.data.length).fill(vehicleFuelConsumptionChart.target?.value || 30),
                          borderColor: vehicleFuelConsumptionChart.colors?.target || '#4caf50',
                          borderWidth: 2,
                          borderDash: [5, 5],
                          fill: false,
                          pointRadius: 0
                        }
                      ]
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: 'top',
                        },
                        tooltip: {
                          callbacks: {
                            label: (context) => {
                              const datasetLabel = context.dataset.label;
                              const value = context.raw;
                              return `${datasetLabel}: ${value} l/100km`;
                            }
                          }
                        }
                      },
                      scales: {
                        y: {
                          beginAtZero: false,
                          grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                          }
                        },
                        x: {
                          grid: {
                            display: false
                          }
                        }
                      }
                    }}
                  />
                )}
              </ChartContainer>
            </>
          )}
          
          {activeTab === 'alerts' && (
            <>
              <Table 
                headers={['Priorytet', 'Pojazd', 'Opis', 'Data', 'Status']}
                data={alerts.slice(0, 5).map(alert => [
                  alert.severity,
                  alert.vehicleId,
                  alert.message,
                  alert.timestamp,
                  alert.acknowledged ? 'Potwierdzony' : 'Nowy'
                ])}
                onRowClick={(index) => handleAcknowledgeAlert(alerts[index].id)}
              />
              
              <ViewAllButton onClick={() => console.log('View all alerts')}>
                Zobacz wszystkie alerty
              </ViewAllButton>
            </>
          )}
        </Card>
      </>
    );
  };
  
  // Render vehicle details section
  const renderVehicleDetailsSection = () => {
    if (!selectedVehicle) return null;
    
    // Check if selectedVehicle is from the map data or regular vehicle data
    const isMapVehicle = !selectedVehicle.hasOwnProperty('mileage');
    
    return (
      <VehicleDetailsCard title={`Szczegóły pojazdu: ${selectedVehicle.name || selectedVehicle.vehicle}`}>
        <DetailRow>
          <DetailLabel>Status:</DetailLabel>
          <DetailValue>{selectedVehicle.status}</DetailValue>
        </DetailRow>
        <DetailRow>
          <DetailLabel>Kierowca:</DetailLabel>
          <DetailValue>{selectedVehicle.driver}</DetailValue>
        </DetailRow>
        <DetailRow>
          <DetailLabel>Lokalizacja:</DetailLabel>
          <DetailValue>
            {formatLocation(selectedVehicle.location)}
          </DetailValue>
        </DetailRow>
        <DetailRow>
          <DetailLabel>Ostatnia aktualizacja:</DetailLabel>
          <DetailValue>{selectedVehicle.lastUpdate || selectedVehicle.date}</DetailValue>
        </DetailRow>
        {!isMapVehicle && (
          <DetailRow>
            <DetailLabel>Przebieg:</DetailLabel>
            <DetailValue>{`${selectedVehicle.mileage.toLocaleString()} km`}</DetailValue>
          </DetailRow>
        )}
        <DetailRow>
          <DetailLabel>Poziom paliwa:</DetailLabel>
          <DetailValue>
            {isMapVehicle 
              ? `${selectedVehicle.amount}%` 
              : `${selectedVehicle.fuelData?.level || 0}%`
            }
          </DetailValue>
        </DetailRow>
        
        <GaugeContainer>
          <GaugeBackground />
          <GaugeFill 
            percentage={isMapVehicle 
              ? selectedVehicle.amount 
              : selectedVehicle.fuelData?.level || 0
            } 
          />
          <GaugeLabel 
            percentage={isMapVehicle 
              ? selectedVehicle.amount 
              : selectedVehicle.fuelData?.level || 0
            }
          >
            {isMapVehicle 
              ? `${selectedVehicle.amount}%` 
              : `${selectedVehicle.fuelData?.level || 0}%`
            }
          </GaugeLabel>
        </GaugeContainer>
      </VehicleDetailsCard>
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
            <div>
              <strong>Zmiana w stosunku do poprzedniego miesiąca: </strong> 
              <span style={{ 
                color: fuelConsumptionTrendChart?.change < 0 ? '#4caf50' : '#f44336',
                fontWeight: '500'
              }}>
                {fuelConsumptionTrendChart?.change < 0 ? '↓' : '↑'} {Math.abs(fuelConsumptionTrendChart?.change || 0).toFixed(1)}%
              </span>
            </div>
            <ChartContainer>
              {fuelConsumptionTrendChart && (
                <Bar
                  data={{
                    labels: fuelConsumptionTrendChart.data.map(item => item.date),
                    datasets: [
                      {
                        label: 'Zużycie paliwa (l/100km)',
                        data: fuelConsumptionTrendChart.data.map(item => item.value),
                        backgroundColor: fuelConsumptionTrendChart.colors?.primary || '#3f51b5',
                        borderRadius: 5
                      }
                    ]
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false
                      }
                    },
                    scales: {
                      y: {
                        beginAtZero: false,
                        grid: {
                          color: 'rgba(0, 0, 0, 0.05)'
                        }
                      },
                      x: {
                        grid: {
                          display: false
                        }
                      }
                    }
                  }}
                />
              )}
            </ChartContainer>
          </Card>
          
          <Card title="Trend przejechanych kilometrów">
            <div>
              <strong>Zmiana w stosunku do poprzedniego miesiąca: </strong> 
              <span style={{ 
                color: kilometersTrendChart?.change > 0 ? '#4caf50' : '#f44336',
                fontWeight: '500'
              }}>
                {kilometersTrendChart?.change > 0 ? '↑' : '↓'} {Math.abs(kilometersTrendChart?.change || 0).toFixed(1)}%
              </span>
            </div>
            <ChartContainer>
              {kilometersTrendChart && (
                <Bar
                  data={{
                    labels: kilometersTrendChart.data.map(item => item.date),
                    datasets: [
                      {
                        label: 'Przejechane kilometry',
                        data: kilometersTrendChart.data.map(item => item.value),
                        backgroundColor: kilometersTrendChart.colors?.primary || '#4caf50',
                        borderRadius: 5
                      }
                    ]
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false
                      },
                      tooltip: {
                        callbacks: {
                          label: (context) => {
                            const value = context.raw;
                            return `Przejechane kilometry: ${value.toLocaleString()} km`;
                          }
                        }
                      }
                    },
                    scales: {
                      y: {
                        beginAtZero: false,
                        grid: {
                          color: 'rgba(0, 0, 0, 0.05)'
                        },
                        ticks: {
                          callback: (value) => value.toLocaleString()
                        }
                      },
                      x: {
                        grid: {
                          display: false
                        }
                      }
                    }
                  }}
                />
              )}
            </ChartContainer>
          </Card>
          
          <Card title="Trend alertów">
            <div>
              <strong>Zmiana w stosunku do poprzedniego miesiąca: </strong> 
              <span style={{ 
                color: alertsTrendChart?.change < 0 ? '#4caf50' : '#f44336',
                fontWeight: '500'
              }}>
                {alertsTrendChart?.change < 0 ? '↓' : '↑'} {Math.abs(alertsTrendChart?.change || 0).toFixed(1)}%
              </span>
            </div>
            <ChartContainer>
              {alertsTrendChart && (
                <Line
                  data={{
                    labels: alertsTrendChart.data.map(item => item.date),
                    datasets: [
                      {
                        label: 'Liczba alertów',
                        data: alertsTrendChart.data.map(item => item.value),
                        borderColor: alertsTrendChart.colors?.primary || '#f44336',
                        backgroundColor: alertsTrendChart.colors?.background || 'rgba(244, 67, 54, 0.1)',
                        borderWidth: 2,
                        tension: 0.3,
                        fill: true
                      }
                    ]
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false
                      }
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        grid: {
                          color: 'rgba(0, 0, 0, 0.05)'
                        },
                        ticks: {
                          stepSize: 1
                        }
                      },
                      x: {
                        grid: {
                          display: false
                        }
                      }
                    }
                  }}
                />
              )}
            </ChartContainer>
          </Card>
        </GridSection>
      </>
    );
  };
  
  // Render main component
  return (
    <PageContainer>
      <DataSourceToggle>
        <ToggleLabel>
          API
          <ToggleSwitch 
            checked={useMockData} 
            onClick={handleToggleDataSource}
          />
          Mock
        </ToggleLabel>
      </DataSourceToggle>
      
      {error && (
        <ErrorMessage>{error}</ErrorMessage>
      )}
      
      {isLoading ? (
        <LoadingIndicator>Ładowanie danych monitoringu...</LoadingIndicator>
      ) : (
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
