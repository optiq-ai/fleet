import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Card from '../components/common/Card';
import KPICard from '../components/common/KPICard';
import Table from '../components/common/Table';
import dashboardService, { KPIData, Alert, MapData } from '../services/api/dashboardService';

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

const MapPoint = styled.div<{ x: number; y: number; color: string }>`
  position: absolute;
  top: ${props => props.y}%;
  left: ${props => props.x}%;
  width: 12px;
  height: 12px;
  background-color: ${props => props.color};
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
    background-color: ${props => props.color}33;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
  }
`;

const MapTooltip = styled.div<{ visible: boolean }>`
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

const Dashboard: React.FC = () => {
  // Stan dla danych KPI
  const [kpiData, setKpiData] = useState<KPIData | null>(null);
  
  // Stan dla alertów
  const [alerts, setAlerts] = useState<{
    fraudAlerts: Alert[];
    safetyAlerts: Alert[];
    maintenanceAlerts: Alert[];
  } | null>(null);
  
  // Stan dla danych mapy
  const [mapData, setMapData] = useState<MapData | null>(null);
  
  // Stan dla aktywnej zakładki alertów
  const [activeAlertTab, setActiveAlertTab] = useState<string>('fraud');
  
  // Stan dla tooltipa mapy
  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    content: string;
    x: number;
    y: number;
  }>({
    visible: false,
    content: '',
    x: 0,
    y: 0
  });
  
  // Stany ładowania i błędów
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Pobieranie danych przy montowaniu komponentu
  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Pobieranie danych KPI
        const kpiResponse = await dashboardService.getKPIData();
        setKpiData(kpiResponse);
        
        // Pobieranie alertów
        const alertsResponse = await dashboardService.getAlerts();
        setAlerts(alertsResponse);
        
        // Pobieranie danych mapy
        const mapResponse = await dashboardService.getMapData('vehicles');
        setMapData(mapResponse);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Nie udało się pobrać danych dashboardu. Spróbuj odświeżyć stronę.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);
  
  // Obsługa zmiany typu danych mapy
  const handleMapTypeChange = async (type: string) => {
    try {
      setIsLoading(true);
      const mapResponse = await dashboardService.getMapData(type);
      setMapData(mapResponse);
    } catch (err) {
      console.error('Error fetching map data:', err);
      setError('Nie udało się pobrać danych mapy.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Obsługa pokazywania tooltipa na mapie
  const handleMapPointHover = (point: any, event: React.MouseEvent) => {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    setTooltip({
      visible: true,
      content: `${point.label} (${point.type})`,
      x: rect.left,
      y: rect.top - 30
    });
  };
  
  // Obsługa ukrywania tooltipa na mapie
  const handleMapPointLeave = () => {
    setTooltip({
      ...tooltip,
      visible: false
    });
  };
  
  // Renderowanie sekcji KPI
  const renderKPISection = () => {
    if (!kpiData) return null;
    
    return (
      <>
        <SectionTitle>KLUCZOWE WSKAŹNIKI</SectionTitle>
        <GridSection>
          <KPICard 
            title="Aktywne pojazdy" 
            value={kpiData.activeVehicles.toString()} 
            icon="🚚"
            trend="up"
            trendValue="5%"
          />
          <KPICard 
            title="Aktywni kierowcy" 
            value={kpiData.activeDrivers.toString()} 
            icon="👤"
            trend="up"
            trendValue="3%"
          />
          <KPICard 
            title="Dzienne koszty" 
            value={`${kpiData.dailyCosts.toLocaleString()} zł`} 
            icon="💰"
            trend="down"
            trendValue="2%"
            trendPositive
          />
          <KPICard 
            title="Potencjalne oszczędności" 
            value={`${kpiData.potentialSavings.toLocaleString()} zł`} 
            icon="💹"
            trend="up"
            trendValue="8%"
            trendPositive
          />
          <KPICard 
            title="Indeks bezpieczeństwa" 
            value={`${kpiData.safetyIndex}/100`} 
            icon="🛡️"
            trend="up"
            trendValue="4%"
            trendPositive
          />
          <KPICard 
            title="Prognoza konserwacji" 
            value={kpiData.maintenanceForecast.toString()} 
            icon="🔧"
            trend="down"
            trendValue="10%"
            trendPositive
          />
        </GridSection>
      </>
    );
  };
  
  // Renderowanie sekcji alertów
  const renderAlertsSection = () => {
    if (!alerts) return null;
    
    const getAlertsByType = () => {
      switch (activeAlertTab) {
        case 'fraud':
          return alerts.fraudAlerts;
        case 'safety':
          return alerts.safetyAlerts;
        case 'maintenance':
          return alerts.maintenanceAlerts;
        default:
          return alerts.fraudAlerts;
      }
    };
    
    const currentAlerts = getAlertsByType();
    
    return (
      <>
        <SectionTitle>ALERTY</SectionTitle>
        <Card fullWidth>
          <TabsContainer>
            <Tab 
              active={activeAlertTab === 'fraud'} 
              onClick={() => setActiveAlertTab('fraud')}
            >
              Oszustwa ({alerts.fraudAlerts.length})
            </Tab>
            <Tab 
              active={activeAlertTab === 'safety'} 
              onClick={() => setActiveAlertTab('safety')}
            >
              Bezpieczeństwo ({alerts.safetyAlerts.length})
            </Tab>
            <Tab 
              active={activeAlertTab === 'maintenance'} 
              onClick={() => setActiveAlertTab('maintenance')}
            >
              Konserwacja ({alerts.maintenanceAlerts.length})
            </Tab>
          </TabsContainer>
          
          <Table 
            data={currentAlerts}
            columns={[
              { key: 'priority', header: 'Priorytet' },
              { key: 'description', header: 'Opis' },
              { key: 'vehicle', header: 'Pojazd' },
              { key: 'date', header: 'Data' },
              { key: 'status', header: 'Status' }
            ]}
            onRowClick={(row) => console.log('Clicked row:', row)}
          />
        </Card>
      </>
    );
  };
  
  // Renderowanie sekcji mapy
  const renderMapSection = () => {
    if (!mapData) return null;
    
    // Funkcja do generowania pseudolosowych współrzędnych na podstawie id punktu
    const getCoordinates = (id: string) => {
      const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      return {
        x: (hash % 80) + 10, // 10-90%
        y: ((hash * 13) % 80) + 10 // 10-90%
      };
    };
    
    // Funkcja do określania koloru punktu na podstawie typu
    const getPointColor = (type: string) => {
      switch (type) {
        case 'vehicle':
          return '#4caf50';
        case 'fraud':
          return '#f44336';
        case 'safety':
          return '#ff9800';
        default:
          return '#2196f3';
      }
    };
    
    return (
      <>
        <SectionTitle>MAPA FLOTY</SectionTitle>
        <Card fullWidth>
          <TabsContainer>
            <Tab 
              active={true} 
              onClick={() => handleMapTypeChange('vehicles')}
            >
              Pojazdy
            </Tab>
            <Tab 
              active={false} 
              onClick={() => handleMapTypeChange('fraud')}
            >
              Oszustwa
            </Tab>
            <Tab 
              active={false} 
              onClick={() => handleMapTypeChange('safety')}
            >
              Bezpieczeństwo
            </Tab>
          </TabsContainer>
          
          <MapContainer>
            {mapData.points.length === 0 ? (
              <MapPlaceholder>Brak danych do wyświetlenia na mapie</MapPlaceholder>
            ) : (
              <>
                {mapData.points.map(point => {
                  const coords = getCoordinates(point.id);
                  return (
                    <MapPoint 
                      key={point.id}
                      x={coords.x}
                      y={coords.y}
                      color={getPointColor(point.type)}
                      onMouseEnter={(e) => handleMapPointHover(point, e)}
                      onMouseLeave={handleMapPointLeave}
                    />
                  );
                })}
                <MapTooltip 
                  visible={tooltip.visible}
                  style={{ top: tooltip.y, left: tooltip.x }}
                >
                  {tooltip.content}
                </MapTooltip>
              </>
            )}
          </MapContainer>
        </Card>
      </>
    );
  };
  
  if (isLoading) {
    return (
      <PageContainer>
        <LoadingIndicator>Ładowanie danych dashboardu...</LoadingIndicator>
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
      {renderKPISection()}
      {renderAlertsSection()}
      {renderMapSection()}
    </PageContainer>
  );
};

export default Dashboard;
