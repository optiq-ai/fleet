import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface DrivingBehaviorAnalysisProps {
  driverId: string;
  onAlert: (alert: any) => void;
  onSettingsChange: (settings: any) => void;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 500;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
`;

const CardTitle = styled.div`
  font-weight: 500;
  font-size: 16px;
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardContent = styled.div``;

const StatusIndicator = styled.div<{ status: 'good' | 'moderate' | 'poor' | 'inactive' }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 14px;
  background-color: ${props => 
    props.status === 'good' ? '#e8f5e9' : 
    props.status === 'moderate' ? '#fff8e1' : 
    props.status === 'poor' ? '#ffebee' : 
    '#f5f5f5'
  };
  color: ${props => 
    props.status === 'good' ? '#2e7d32' : 
    props.status === 'moderate' ? '#f57f17' : 
    props.status === 'poor' ? '#c62828' : 
    '#757575'
  };
`;

const StatusDot = styled.div<{ status: 'good' | 'moderate' | 'poor' | 'inactive' }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${props => 
    props.status === 'good' ? '#4caf50' : 
    props.status === 'moderate' ? '#ffc107' : 
    props.status === 'poor' ? '#f44336' : 
    '#bdbdbd'
  };
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const MetricCard = styled.div<{ alert?: boolean }>`
  background-color: ${props => props.alert ? '#ffebee' : '#f5f5f5'};
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border-left: ${props => props.alert ? '3px solid #f44336' : 'none'};
`;

const MetricValue = styled.div<{ alert?: boolean }>`
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 8px;
  color: ${props => props.alert ? '#f44336' : 'inherit'};
`;

const MetricLabel = styled.div`
  font-size: 14px;
  color: #666;
`;

const AlertsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 20px;
`;

const AlertItem = styled.div<{ severity: 'low' | 'medium' | 'high' }>`
  padding: 12px;
  border-radius: 4px;
  background-color: ${props => 
    props.severity === 'high' ? '#ffebee' : 
    props.severity === 'medium' ? '#fff8e1' : 
    '#e8f5e9'
  };
  border-left: 4px solid ${props => 
    props.severity === 'high' ? '#f44336' : 
    props.severity === 'medium' ? '#ffc107' : 
    '#4caf50'
  };
`;

const AlertHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const AlertTitle = styled.div`
  font-weight: 500;
`;

const AlertTime = styled.div`
  font-size: 12px;
  color: #666;
`;

const AlertDetails = styled.div`
  font-size: 14px;
  color: #666;
`;

const MapContainer = styled.div`
  height: 400px;
  background-color: #e9e9e9;
  border-radius: 8px;
  margin-bottom: 20px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
`;

const MapOverlay = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 12px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1;
  font-size: 14px;
`;

const SettingsContainer = styled.div`
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #e0e0e0;
`;

const SettingsTitle = styled.div`
  font-weight: 500;
  margin-bottom: 16px;
`;

const SettingsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SettingItem = styled.div`
  margin-bottom: 16px;
`;

const SettingLabel = styled.div`
  font-weight: 500;
  margin-bottom: 8px;
`;

const SettingDescription = styled.div`
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
`;

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 48px;
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

const ToggleLabel = styled.div`
  font-size: 14px;
`;

const SliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const SliderRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const Slider = styled.input`
  flex: 1;
  -webkit-appearance: none;
  width: 100%;
  height: 4px;
  border-radius: 2px;
  background: #ddd;
  outline: none;
  
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #3f51b5;
    cursor: pointer;
  }
  
  &::-moz-range-thumb {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #3f51b5;
    cursor: pointer;
  }
`;

const SliderValue = styled.div`
  width: 40px;
  text-align: right;
  font-size: 14px;
`;

const ActionButton = styled.button`
  padding: 8px 16px;
  background-color: #3f51b5;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #303f9f;
  }
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

const ChartContainer = styled.div`
  height: 300px;
  background-color: #f5f5f5;
  border-radius: 8px;
  margin-bottom: 20px;
  padding: 16px;
  display: flex;
  flex-direction: column;
`;

const ChartTitle = styled.div`
  font-weight: 500;
  margin-bottom: 16px;
`;

const ChartContent = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
`;

const ScoreCard = styled.div<{ score: number }>`
  background-color: ${props => 
    props.score >= 80 ? '#e8f5e9' : 
    props.score >= 60 ? '#fff8e1' : 
    '#ffebee'
  };
  border-radius: 8px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 20px;
`;

const ScoreValue = styled.div<{ score: number }>`
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 8px;
  color: ${props => 
    props.score >= 80 ? '#2e7d32' : 
    props.score >= 60 ? '#f57f17' : 
    '#c62828'
  };
`;

const ScoreLabel = styled.div`
  font-size: 16px;
  color: #666;
  margin-bottom: 16px;
`;

const ScoreDescription = styled.div`
  font-size: 14px;
  color: #666;
  max-width: 400px;
`;

const EventsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 20px;
`;

const EventItem = styled.div`
  padding: 12px;
  border-radius: 4px;
  background-color: #f5f5f5;
  border-left: 4px solid #3f51b5;
`;

const EventHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const EventTitle = styled.div`
  font-weight: 500;
`;

const EventTime = styled.div`
  font-size: 12px;
  color: #666;
`;

const EventDetails = styled.div`
  font-size: 14px;
  color: #666;
`;

const EventLocation = styled.div`
  font-size: 12px;
  color: #666;
  margin-top: 8px;
`;

const DrivingBehaviorAnalysis: React.FC<DrivingBehaviorAnalysisProps> = ({
  driverId,
  onAlert,
  onSettingsChange
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'events' | 'analytics' | 'settings'>('overview');
  const [drivingStatus, setDrivingStatus] = useState<'good' | 'moderate' | 'poor' | 'inactive'>('good');
  const [alerts, setAlerts] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [driverData, setDriverData] = useState<any>({
    name: 'Jan Kowalski',
    id: 'DRV-12345',
    vehicle: 'Ciężarówka #1234',
    shift: {
      start: '2025-04-12T06:00:00Z',
      end: '2025-04-12T18:00:00Z',
      duration: 12,
      remaining: 4
    },
    metrics: {
      speedingEvents: 2,
      harshBrakingEvents: 1,
      harshAccelerationEvents: 3,
      harshCorneringEvents: 0,
      idlingTime: 15,
      ecoScore: 78,
      safetyScore: 82,
      overallScore: 80
    },
    location: {
      latitude: 52.2297,
      longitude: 21.0122,
      speed: 65,
      heading: 270
    }
  });
  
  // Ustawienia
  const [settings, setSettings] = useState({
    enableBehaviorAnalysis: true,
    enableAlerts: true,
    alertSensitivity: 70,
    speedingThreshold: 10,
    harshBrakingThreshold: 0.3,
    harshAccelerationThreshold: 0.3,
    harshCorneringThreshold: 0.2,
    idlingThreshold: 30
  });
  
  // Symulacja danych w czasie rzeczywistym
  useEffect(() => {
    const interval = setInterval(() => {
      // Symulacja zmieniających się danych
      const newSpeedingEvents = Math.max(0, driverData.metrics.speedingEvents + (Math.random() > 0.95 ? 1 : 0));
      const newHarshBrakingEvents = Math.max(0, driverData.metrics.harshBrakingEvents + (Math.random() > 0.97 ? 1 : 0));
      const newHarshAccelerationEvents = Math.max(0, driverData.metrics.harshAccelerationEvents + (Math.random() > 0.96 ? 1 : 0));
      const newHarshCorneringEvents = Math.max(0, driverData.metrics.harshCorneringEvents + (Math.random() > 0.98 ? 1 : 0));
      const newIdlingTime = Math.max(0, driverData.metrics.idlingTime + (Math.random() > 0.9 ? 1 : 0));
      
      // Aktualizacja wyników
      const newEcoScore = Math.max(0, Math.min(100, driverData.metrics.ecoScore + (Math.random() - 0.5) * 2));
      const newSafetyScore = Math.max(0, Math.min(100, driverData.metrics.safetyScore + (Math.random() - 0.5) * 2));
      const newOverallScore = Math.round((newEcoScore + newSafetyScore) / 2);
      
      // Aktualizacja lokalizacji
      const newLatitude = driverData.location.latitude + (Math.random() - 0.5) * 0.001;
      const newLongitude = driverData.location.longitude + (Math.random() - 0.5) * 0.001;
      const newSpeed = Math.max(0, Math.min(120, driverData.location.speed + (Math.random() - 0.5) * 5));
      const newHeading = (driverData.location.heading + (Math.random() - 0.5) * 10) % 360;
      
      const newMetrics = {
        speedingEvents: newSpeedingEvents,
        harshBrakingEvents: newHarshBrakingEvents,
        harshAccelerationEvents: newHarshAccelerationEvents,
        harshCorneringEvents: newHarshCorneringEvents,
        idlingTime: newIdlingTime,
        ecoScore: parseFloat(newEcoScore.toFixed(1)),
        safetyScore: parseFloat(newSafetyScore.toFixed(1)),
        overallScore: newOverallScore
      };
      
      const newLocation = {
        latitude: parseFloat(newLatitude.toFixed(6)),
        longitude: parseFloat(newLongitude.toFixed(6)),
        speed: Math.round(newSpeed),
        heading: Math.round(newHeading)
      };
      
      // Aktualizacja pozostałego czasu zmiany
      const newRemaining = Math.max(0, driverData.shift.remaining - 1/60);
      
      setDriverData(prev => ({
        ...prev,
        metrics: newMetrics,
        location: newLocation,
        shift: {
          ...prev.shift,
          remaining: parseFloat(newRemaining.toFixed(2))
        }
      }));
      
      // Określenie statusu jazdy
      let newStatus: 'good' | 'moderate' | 'poor' | 'inactive' = 'good';
      
      if (newOverallScore < 60) {
        newStatus = 'poor';
      } else if (newOverallScore < 80) {
        newStatus = 'moderate';
      }
      
      setDrivingStatus(newStatus);
      
      // Generowanie zdarzeń
      if (Math.random() > 0.9) {
        const eventTypes = [
          { 
            title: 'Przekroczenie prędkości', 
            details: `Przekroczenie prędkości o ${Math.round(Math.random() * 20 + 5)} km/h`, 
            type: 'speeding'
          },
          { 
            title: 'Gwałtowne hamowanie', 
            details: 'Wykryto gwałtowne hamowanie', 
            type: 'harsh_braking'
          },
          { 
            title: 'Gwałtowne przyspieszenie', 
            details: 'Wykryto gwałtowne przyspieszenie', 
            type: 'harsh_acceleration'
          },
          { 
            title: 'Gwałtowny skręt', 
            details: 'Wykryto gwałtowny skręt', 
            type: 'harsh_cornering'
          },
          { 
            title: 'Nadmierne jałowe obroty', 
            details: `Silnik na jałowych obrotach przez ${Math.round(Math.random() * 10 + 5)} minut`, 
            type: 'idling'
          }
        ];
        
        const selectedEvent = eventTypes[Math.floor(Math.random() * eventTypes.length)];
        
        const newEvent = {
          id: `event-${Date.now()}`,
          ...selectedEvent,
          timestamp: new Date().toISOString(),
          location: {
            latitude: newLatitude,
            longitude: newLongitude
          }
        };
        
        setEvents(prev => [newEvent, ...prev].slice(0, 20));
        
        // Generowanie alertów dla poważnych zdarzeń
        if (Math.random() > 0.7) {
          const alertSeverity = Math.random() > 0.5 ? 'medium' as const : 'high' as const;
          
          const newAlert = {
            id: `alert-${Date.now()}`,
            title: selectedEvent.title,
            details: selectedEvent.details,
            severity: alertSeverity,
            timestamp: new Date().toISOString()
          };
          
          setAlerts(prev => [newAlert, ...prev].slice(0, 10));
          onAlert(newAlert);
        }
      }
    }, 2000);
    
    return () => clearInterval(interval);
  }, [driverData, settings, onAlert]);
  
  // Obsługa zmiany ustawień
  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => {
      const newSettings = { ...prev, [key]: value };
      onSettingsChange(newSettings);
      return newSettings;
    });
  };
  
  // Formatowanie czasu
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // Formatowanie czasu trwania
  const formatDuration = (hours: number) => {
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    return `${h}h ${m}m`;
  };
  
  // Renderowanie zakładki przeglądu
  const renderOverviewTab = () => {
    return (
      <>
        <Card>
          <CardTitle>
            Status jazdy
            <StatusIndicator status={drivingStatus}>
              <StatusDot status={drivingStatus} />
              {drivingStatus === 'good' ? 'Dobry' : 
               drivingStatus === 'moderate' ? 'Umiarkowany' : 
               drivingStatus === 'poor' ? 'Słaby' : 
               'Nieaktywny'}
            </StatusIndicator>
          </CardTitle>
          <CardContent>
            <div style={{ marginBottom: '16px' }}>
              <div><strong>Kierowca:</strong> {driverData.name} ({driverData.id})</div>
              <div><strong>Pojazd:</strong> {driverData.vehicle}</div>
              <div><strong>Zmiana:</strong> {formatTime(driverData.shift.start)} - {formatTime(driverData.shift.end)} (pozostało: {formatDuration(driverData.shift.remaining)})</div>
            </div>
            
            <ScoreCard score={driverData.metrics.overallScore}>
              <ScoreValue score={driverData.metrics.overallScore}>
                {driverData.metrics.overallScore}
              </ScoreValue>
              <ScoreLabel>Ogólny wynik jazdy</ScoreLabel>
              <ScoreDescription>
                {driverData.metrics.overallScore >= 80 ? 
                  'Doskonała jazda! Kontynuuj bezpieczną i ekonomiczną jazdę.' : 
                driverData.metrics.overallScore >= 60 ? 
                  'Dobra jazda, ale jest miejsce na poprawę. Zwróć uwagę na zdarzenia wymienione poniżej.' : 
                  'Wymagana poprawa stylu jazdy. Skontaktuj się z kierownikiem floty w celu uzyskania wskazówek.'}
              </ScoreDescription>
            </ScoreCard>
            
            <MapContainer>
              <div>Mapa z lokalizacją pojazdu</div>
              <MapOverlay>
                <div>Prędkość: {driverData.location.speed} km/h</div>
                <div>Kierunek: {driverData.location.heading}°</div>
              </MapOverlay>
            </MapContainer>
            
            <MetricsGrid>
              <MetricCard>
                <MetricValue>
                  {driverData.metrics.safetyScore}
                </MetricValue>
                <MetricLabel>Wynik bezpieczeństwa</MetricLabel>
              </MetricCard>
              
              <MetricCard>
                <MetricValue>
                  {driverData.metrics.ecoScore}
                </MetricValue>
                <MetricLabel>Wynik ekologiczny</MetricLabel>
              </MetricCard>
              
              <MetricCard alert={driverData.metrics.speedingEvents > 0}>
                <MetricValue alert={driverData.metrics.speedingEvents > 0}>
                  {driverData.metrics.speedingEvents}
                </MetricValue>
                <MetricLabel>Przekroczenia prędkości</MetricLabel>
              </MetricCard>
              
              <MetricCard alert={driverData.metrics.harshBrakingEvents > 0}>
                <MetricValue alert={driverData.metrics.harshBrakingEvents > 0}>
                  {driverData.metrics.harshBrakingEvents}
                </MetricValue>
                <MetricLabel>Gwałtowne hamowania</MetricLabel>
              </MetricCard>
              
              <MetricCard alert={driverData.metrics.harshAccelerationEvents > 0}>
                <MetricValue alert={driverData.metrics.harshAccelerationEvents > 0}>
                  {driverData.metrics.harshAccelerationEvents}
                </MetricValue>
                <MetricLabel>Gwałtowne przyspieszenia</MetricLabel>
              </MetricCard>
              
              <MetricCard alert={driverData.metrics.harshCorneringEvents > 0}>
                <MetricValue alert={driverData.metrics.harshCorneringEvents > 0}>
                  {driverData.metrics.harshCorneringEvents}
                </MetricValue>
                <MetricLabel>Gwałtowne skręty</MetricLabel>
              </MetricCard>
            </MetricsGrid>
          </CardContent>
        </Card>
        
        <Card>
          <CardTitle>Ostatnie alerty</CardTitle>
          <CardContent>
            {alerts.length > 0 ? (
              <AlertsContainer>
                {alerts.map(alert => (
                  <AlertItem key={alert.id} severity={alert.severity}>
                    <AlertHeader>
                      <AlertTitle>{alert.title}</AlertTitle>
                      <AlertTime>{formatTime(alert.timestamp)}</AlertTime>
                    </AlertHeader>
                    <AlertDetails>{alert.details}</AlertDetails>
                  </AlertItem>
                ))}
              </AlertsContainer>
            ) : (
              <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
                Brak alertów
              </div>
            )}
          </CardContent>
        </Card>
      </>
    );
  };
  
  // Renderowanie zakładki zdarzeń
  const renderEventsTab = () => {
    return (
      <Card>
        <CardTitle>Zdarzenia podczas jazdy</CardTitle>
        <CardContent>
          {events.length > 0 ? (
            <EventsList>
              {events.map(event => (
                <EventItem key={event.id}>
                  <EventHeader>
                    <EventTitle>{event.title}</EventTitle>
                    <EventTime>{formatTime(event.timestamp)}</EventTime>
                  </EventHeader>
                  <EventDetails>{event.details}</EventDetails>
                  <EventLocation>
                    Lokalizacja: {event.location.latitude.toFixed(6)}, {event.location.longitude.toFixed(6)}
                  </EventLocation>
                </EventItem>
              ))}
            </EventsList>
          ) : (
            <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
              Brak zdarzeń
            </div>
          )}
        </CardContent>
      </Card>
    );
  };
  
  // Renderowanie zakładki analityki
  const renderAnalyticsTab = () => {
    return (
      <>
        <Card>
          <CardTitle>Analiza stylu jazdy</CardTitle>
          <CardContent>
            <ChartContainer>
              <ChartTitle>Trendy wyników w czasie</ChartTitle>
              <ChartContent>
                Wykres trendów wyników jazdy
              </ChartContent>
            </ChartContainer>
            
            <ChartContainer>
              <ChartTitle>Rozkład zdarzeń według typu</ChartTitle>
              <ChartContent>
                Wykres kołowy typów zdarzeń
              </ChartContent>
            </ChartContainer>
            
            <ChartContainer>
              <ChartTitle>Porównanie z innymi kierowcami</ChartTitle>
              <ChartContent>
                Wykres porównawczy z innymi kierowcami
              </ChartContent>
            </ChartContainer>
          </CardContent>
        </Card>
      </>
    );
  };
  
  // Renderowanie zakładki ustawień
  const renderSettingsTab = () => {
    return (
      <Card>
        <CardTitle>Ustawienia analizy stylu jazdy</CardTitle>
        <CardContent>
          <SettingsGrid>
            <SettingItem>
              <SettingLabel>Analiza stylu jazdy</SettingLabel>
              <SettingDescription>
                Monitorowanie i analiza stylu jazdy kierowcy w celu poprawy bezpieczeństwa i efektywności.
              </SettingDescription>
              <ToggleContainer>
                <ToggleSwitch>
                  <input 
                    type="checkbox" 
                    checked={settings.enableBehaviorAnalysis}
                    onChange={(e) => handleSettingChange('enableBehaviorAnalysis', e.target.checked)}
                  />
                  <span></span>
                </ToggleSwitch>
                <ToggleLabel>
                  {settings.enableBehaviorAnalysis ? 'Włączone' : 'Wyłączone'}
                </ToggleLabel>
              </ToggleContainer>
            </SettingItem>
            
            <SettingItem>
              <SettingLabel>Alerty</SettingLabel>
              <SettingDescription>
                Powiadomienia o zdarzeniach związanych ze stylem jazdy.
              </SettingDescription>
              <ToggleContainer>
                <ToggleSwitch>
                  <input 
                    type="checkbox" 
                    checked={settings.enableAlerts}
                    onChange={(e) => handleSettingChange('enableAlerts', e.target.checked)}
                  />
                  <span></span>
                </ToggleSwitch>
                <ToggleLabel>
                  {settings.enableAlerts ? 'Włączone' : 'Wyłączone'}
                </ToggleLabel>
              </ToggleContainer>
            </SettingItem>
            
            <SettingItem>
              <SettingLabel>Czułość alertów</SettingLabel>
              <SettingDescription>
                Dostosuj czułość systemu wykrywania zdarzeń podczas jazdy.
              </SettingDescription>
              <SliderContainer>
                <SliderRow>
                  <Slider 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={settings.alertSensitivity}
                    onChange={(e) => handleSettingChange('alertSensitivity', parseInt(e.target.value))}
                  />
                  <SliderValue>{settings.alertSensitivity}%</SliderValue>
                </SliderRow>
              </SliderContainer>
            </SettingItem>
          </SettingsGrid>
          
          <SettingsContainer>
            <SettingsTitle>Zaawansowane ustawienia</SettingsTitle>
            <SettingsGrid>
              <SettingItem>
                <SettingLabel>Próg przekroczenia prędkości</SettingLabel>
                <SettingDescription>
                  Liczba kilometrów na godzinę powyżej limitu, od której system rejestruje zdarzenie przekroczenia prędkości.
                </SettingDescription>
                <SliderContainer>
                  <SliderRow>
                    <Slider 
                      type="range" 
                      min="5" 
                      max="20" 
                      value={settings.speedingThreshold}
                      onChange={(e) => handleSettingChange('speedingThreshold', parseInt(e.target.value))}
                    />
                    <SliderValue>{settings.speedingThreshold} km/h</SliderValue>
                  </SliderRow>
                </SliderContainer>
              </SettingItem>
              
              <SettingItem>
                <SettingLabel>Próg gwałtownego hamowania</SettingLabel>
                <SettingDescription>
                  Wartość opóźnienia (w g), od której system rejestruje zdarzenie gwałtownego hamowania.
                </SettingDescription>
                <SliderContainer>
                  <SliderRow>
                    <Slider 
                      type="range" 
                      min="0.1" 
                      max="0.5" 
                      step="0.05"
                      value={settings.harshBrakingThreshold}
                      onChange={(e) => handleSettingChange('harshBrakingThreshold', parseFloat(e.target.value))}
                    />
                    <SliderValue>{settings.harshBrakingThreshold} g</SliderValue>
                  </SliderRow>
                </SliderContainer>
              </SettingItem>
              
              <SettingItem>
                <SettingLabel>Próg gwałtownego przyspieszenia</SettingLabel>
                <SettingDescription>
                  Wartość przyspieszenia (w g), od której system rejestruje zdarzenie gwałtownego przyspieszenia.
                </SettingDescription>
                <SliderContainer>
                  <SliderRow>
                    <Slider 
                      type="range" 
                      min="0.1" 
                      max="0.5" 
                      step="0.05"
                      value={settings.harshAccelerationThreshold}
                      onChange={(e) => handleSettingChange('harshAccelerationThreshold', parseFloat(e.target.value))}
                    />
                    <SliderValue>{settings.harshAccelerationThreshold} g</SliderValue>
                  </SliderRow>
                </SliderContainer>
              </SettingItem>
              
              <SettingItem>
                <SettingLabel>Próg gwałtownego skrętu</SettingLabel>
                <SettingDescription>
                  Wartość przyspieszenia bocznego (w g), od której system rejestruje zdarzenie gwałtownego skrętu.
                </SettingDescription>
                <SliderContainer>
                  <SliderRow>
                    <Slider 
                      type="range" 
                      min="0.1" 
                      max="0.4" 
                      step="0.05"
                      value={settings.harshCorneringThreshold}
                      onChange={(e) => handleSettingChange('harshCorneringThreshold', parseFloat(e.target.value))}
                    />
                    <SliderValue>{settings.harshCorneringThreshold} g</SliderValue>
                  </SliderRow>
                </SliderContainer>
              </SettingItem>
              
              <SettingItem>
                <SettingLabel>Próg jałowych obrotów</SettingLabel>
                <SettingDescription>
                  Liczba minut, po której system rejestruje zdarzenie nadmiernych jałowych obrotów.
                </SettingDescription>
                <SliderContainer>
                  <SliderRow>
                    <Slider 
                      type="range" 
                      min="5" 
                      max="60" 
                      value={settings.idlingThreshold}
                      onChange={(e) => handleSettingChange('idlingThreshold', parseInt(e.target.value))}
                    />
                    <SliderValue>{settings.idlingThreshold} min</SliderValue>
                  </SliderRow>
                </SliderContainer>
              </SettingItem>
            </SettingsGrid>
            
            <div style={{ marginTop: '20px', textAlign: 'right' }}>
              <ActionButton>
                Zapisz ustawienia
              </ActionButton>
            </div>
          </SettingsContainer>
        </CardContent>
      </Card>
    );
  };
  
  return (
    <Container>
      <Header>
        <Title>Analiza stylu jazdy</Title>
      </Header>
      
      <TabsContainer>
        <Tab 
          active={activeTab === 'overview'} 
          onClick={() => setActiveTab('overview')}
        >
          Przegląd
        </Tab>
        <Tab 
          active={activeTab === 'events'} 
          onClick={() => setActiveTab('events')}
        >
          Zdarzenia
        </Tab>
        <Tab 
          active={activeTab === 'analytics'} 
          onClick={() => setActiveTab('analytics')}
        >
          Analityka
        </Tab>
        <Tab 
          active={activeTab === 'settings'} 
          onClick={() => setActiveTab('settings')}
        >
          Ustawienia
        </Tab>
      </TabsContainer>
      
      {activeTab === 'overview' && renderOverviewTab()}
      {activeTab === 'events' && renderEventsTab()}
      {activeTab === 'analytics' && renderAnalyticsTab()}
      {activeTab === 'settings' && renderSettingsTab()}
    </Container>
  );
};

export default DrivingBehaviorAnalysis;
