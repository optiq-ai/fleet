import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface CollisionWarningProps {
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

const StatusIndicator = styled.div<{ status: 'safe' | 'warning' | 'danger' | 'inactive' }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 14px;
  background-color: ${props => 
    props.status === 'safe' ? '#e8f5e9' : 
    props.status === 'warning' ? '#fff8e1' : 
    props.status === 'danger' ? '#ffebee' : 
    '#f5f5f5'
  };
  color: ${props => 
    props.status === 'safe' ? '#2e7d32' : 
    props.status === 'warning' ? '#f57f17' : 
    props.status === 'danger' ? '#c62828' : 
    '#757575'
  };
`;

const StatusDot = styled.div<{ status: 'safe' | 'warning' | 'danger' | 'inactive' }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${props => 
    props.status === 'safe' ? '#4caf50' : 
    props.status === 'warning' ? '#ffc107' : 
    props.status === 'danger' ? '#f44336' : 
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

const VideoFeed = styled.div`
  height: 300px;
  background-color: #000;
  border-radius: 8px;
  margin-bottom: 20px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const VideoOverlay = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 12px;
  color: white;
`;

const WarningOverlay = styled.div<{ visible: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(244, 67, 54, 0.3);
  display: ${props => props.visible ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: white;
  font-weight: 700;
  font-size: 24px;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
`;

const WarningIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
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

const CollisionWarning: React.FC<CollisionWarningProps> = ({
  driverId,
  onAlert,
  onSettingsChange
}) => {
  const [activeTab, setActiveTab] = useState<'live' | 'history' | 'settings'>('live');
  const [warningStatus, setWarningStatus] = useState<'safe' | 'warning' | 'danger' | 'inactive'>('safe');
  const [alerts, setAlerts] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [showWarning, setShowWarning] = useState<boolean>(false);
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
      forwardCollisionWarnings: 0,
      laneChangeWarnings: 0,
      tailgatingWarnings: 0,
      pedestrianWarnings: 0,
      forwardDistance: 45,
      timeToCollision: 3.2
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
    enableCollisionWarning: true,
    enableLaneChangeWarning: true,
    enableTailgatingWarning: true,
    enablePedestrianWarning: true,
    enableAlerts: true,
    alertSensitivity: 70,
    forwardDistanceThreshold: 30,
    timeToCollisionThreshold: 2.0,
    tailgatingThreshold: 1.5,
    laneChangeThreshold: 0.8
  });
  
  // Symulacja danych w czasie rzeczywistym
  useEffect(() => {
    const interval = setInterval(() => {
      // Symulacja zmieniających się danych
      const newForwardDistance = Math.max(5, Math.min(100, driverData.metrics.forwardDistance + (Math.random() - 0.5) * 10));
      const newTimeToCollision = Math.max(0.5, Math.min(5, driverData.metrics.timeToCollision + (Math.random() - 0.5) * 0.5));
      
      // Aktualizacja liczników ostrzeżeń
      let newForwardCollisionWarnings = driverData.metrics.forwardCollisionWarnings;
      let newLaneChangeWarnings = driverData.metrics.laneChangeWarnings;
      let newTailgatingWarnings = driverData.metrics.tailgatingWarnings;
      let newPedestrianWarnings = driverData.metrics.pedestrianWarnings;
      
      // Symulacja ostrzeżeń
      let newWarningStatus: 'safe' | 'warning' | 'danger' | 'inactive' = 'safe';
      let newShowWarning = false;
      let warningType = '';
      let warningDetails = '';
      let warningSeverity: 'low' | 'medium' | 'high' = 'medium';
      
      // Ostrzeżenie o kolizji z przodu
      if (newForwardDistance < settings.forwardDistanceThreshold || newTimeToCollision < settings.timeToCollisionThreshold) {
        if (newTimeToCollision < settings.timeToCollisionThreshold / 2) {
          newWarningStatus = 'danger';
          warningSeverity = 'high';
        } else {
          newWarningStatus = 'warning';
          warningSeverity = 'medium';
        }
        
        newShowWarning = true;
        warningType = 'forward_collision';
        warningDetails = `Wykryto potencjalną kolizję z przodu. Odległość: ${Math.round(newForwardDistance)}m, Czas do kolizji: ${newTimeToCollision.toFixed(1)}s`;
        newForwardCollisionWarnings += 1;
      }
      
      // Symulacja innych ostrzeżeń
      if (Math.random() > 0.95) {
        const warningTypes = [
          {
            type: 'lane_change',
            title: 'Ostrzeżenie o zmianie pasa',
            details: 'Wykryto niezamierzoną zmianę pasa ruchu.',
            counter: 'laneChangeWarnings'
          },
          {
            type: 'tailgating',
            title: 'Ostrzeżenie o jeździe na zderzaku',
            details: 'Zbyt mała odległość od pojazdu z przodu.',
            counter: 'tailgatingWarnings'
          },
          {
            type: 'pedestrian',
            title: 'Ostrzeżenie o pieszym',
            details: 'Wykryto pieszego na drodze.',
            counter: 'pedestrianWarnings'
          }
        ];
        
        const selectedWarning = warningTypes[Math.floor(Math.random() * warningTypes.length)];
        
        if (!newShowWarning) {
          newWarningStatus = 'warning';
          newShowWarning = true;
          warningType = selectedWarning.type;
          warningDetails = selectedWarning.details;
          
          // Aktualizacja odpowiedniego licznika
          if (selectedWarning.counter === 'laneChangeWarnings') {
            newLaneChangeWarnings += 1;
          } else if (selectedWarning.counter === 'tailgatingWarnings') {
            newTailgatingWarnings += 1;
          } else if (selectedWarning.counter === 'pedestrianWarnings') {
            newPedestrianWarnings += 1;
          }
        }
      }
      
      const newMetrics = {
        forwardCollisionWarnings: newForwardCollisionWarnings,
        laneChangeWarnings: newLaneChangeWarnings,
        tailgatingWarnings: newTailgatingWarnings,
        pedestrianWarnings: newPedestrianWarnings,
        forwardDistance: Math.round(newForwardDistance),
        timeToCollision: parseFloat(newTimeToCollision.toFixed(1))
      };
      
      // Aktualizacja pozostałego czasu zmiany
      const newRemaining = Math.max(0, driverData.shift.remaining - 1/60);
      
      setDriverData(prev => ({
        ...prev,
        metrics: newMetrics,
        shift: {
          ...prev.shift,
          remaining: parseFloat(newRemaining.toFixed(2))
        }
      }));
      
      setWarningStatus(newWarningStatus);
      setShowWarning(newShowWarning);
      
      // Generowanie alertów i zdarzeń
      if (newShowWarning) {
        // Generowanie alertu
        const newAlert = {
          id: `alert-${Date.now()}`,
          title: warningType === 'forward_collision' ? 'Ostrzeżenie o kolizji z przodu' :
                 warningType === 'lane_change' ? 'Ostrzeżenie o zmianie pasa' :
                 warningType === 'tailgating' ? 'Ostrzeżenie o jeździe na zderzaku' :
                 'Ostrzeżenie o pieszym',
          details: warningDetails,
          severity: warningSeverity,
          timestamp: new Date().toISOString()
        };
        
        setAlerts(prev => [newAlert, ...prev].slice(0, 10));
        onAlert(newAlert);
        
        // Generowanie zdarzenia
        const newEvent = {
          id: `event-${Date.now()}`,
          title: newAlert.title,
          details: newAlert.details,
          type: warningType,
          timestamp: new Date().toISOString(),
          location: {
            latitude: driverData.location.latitude,
            longitude: driverData.location.longitude
          }
        };
        
        setEvents(prev => [newEvent, ...prev].slice(0, 20));
      }
      
      // Resetowanie ostrzeżenia po krótkim czasie
      if (newShowWarning) {
        setTimeout(() => {
          setShowWarning(false);
        }, 3000);
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
  
  // Renderowanie zakładki na żywo
  const renderLiveTab = () => {
    return (
      <>
        <Card>
          <CardTitle>
            Status ostrzeżeń
            <StatusIndicator status={warningStatus}>
              <StatusDot status={warningStatus} />
              {warningStatus === 'safe' ? 'Bezpieczny' : 
               warningStatus === 'warning' ? 'Ostrzeżenie' : 
               warningStatus === 'danger' ? 'Niebezpieczeństwo' : 
               'Nieaktywny'}
            </StatusIndicator>
          </CardTitle>
          <CardContent>
            <div style={{ marginBottom: '16px' }}>
              <div><strong>Kierowca:</strong> {driverData.name} ({driverData.id})</div>
              <div><strong>Pojazd:</strong> {driverData.vehicle}</div>
              <div><strong>Zmiana:</strong> {formatTime(driverData.shift.start)} - {formatTime(driverData.shift.end)} (pozostało: {formatDuration(driverData.shift.remaining)})</div>
            </div>
            
            <VideoFeed>
              <div>Podgląd kamery przedniej</div>
              <VideoOverlay>
                {formatTime(new Date().toISOString())} • Odległość: {driverData.metrics.forwardDistance}m • TTC: {driverData.metrics.timeToCollision}s
              </VideoOverlay>
              <WarningOverlay visible={showWarning}>
                <WarningIcon>⚠️</WarningIcon>
                {warningStatus === 'danger' ? 'NIEBEZPIECZEŃSTWO KOLIZJI!' : 'OSTRZEŻENIE!'}
              </WarningOverlay>
            </VideoFeed>
            
            <MetricsGrid>
              <MetricCard alert={driverData.metrics.forwardDistance < settings.forwardDistanceThreshold}>
                <MetricValue alert={driverData.metrics.forwardDistance < settings.forwardDistanceThreshold}>
                  {driverData.metrics.forwardDistance}m
                </MetricValue>
                <MetricLabel>Odległość z przodu</MetricLabel>
              </MetricCard>
              
              <MetricCard alert={driverData.metrics.timeToCollision < settings.timeToCollisionThreshold}>
                <MetricValue alert={driverData.metrics.timeToCollision < settings.timeToCollisionThreshold}>
                  {driverData.metrics.timeToCollision}s
                </MetricValue>
                <MetricLabel>Czas do kolizji</MetricLabel>
              </MetricCard>
              
              <MetricCard alert={driverData.metrics.forwardCollisionWarnings > 0}>
                <MetricValue alert={driverData.metrics.forwardCollisionWarnings > 0}>
                  {driverData.metrics.forwardCollisionWarnings}
                </MetricValue>
                <MetricLabel>Ostrzeżenia o kolizji</MetricLabel>
              </MetricCard>
              
              <MetricCard alert={driverData.metrics.laneChangeWarnings > 0}>
                <MetricValue alert={driverData.metrics.laneChangeWarnings > 0}>
                  {driverData.metrics.laneChangeWarnings}
                </MetricValue>
                <MetricLabel>Ostrzeżenia o zmianie pasa</MetricLabel>
              </MetricCard>
              
              <MetricCard alert={driverData.metrics.tailgatingWarnings > 0}>
                <MetricValue alert={driverData.metrics.tailgatingWarnings > 0}>
                  {driverData.metrics.tailgatingWarnings}
                </MetricValue>
                <MetricLabel>Ostrzeżenia o jeździe na zderzaku</MetricLabel>
              </MetricCard>
              
              <MetricCard alert={driverData.metrics.pedestrianWarnings > 0}>
                <MetricValue alert={driverData.metrics.pedestrianWarnings > 0}>
                  {driverData.metrics.pedestrianWarnings}
                </MetricValue>
                <MetricLabel>Ostrzeżenia o pieszych</MetricLabel>
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
  
  // Renderowanie zakładki historii
  const renderHistoryTab = () => {
    return (
      <>
        <Card>
          <CardTitle>Historia ostrzeżeń</CardTitle>
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
        
        <Card>
          <CardTitle>Analiza ostrzeżeń</CardTitle>
          <CardContent>
            <ChartContainer>
              <ChartTitle>Rozkład typów ostrzeżeń</ChartTitle>
              <ChartContent>
                Wykres kołowy typów ostrzeżeń
              </ChartContent>
            </ChartContainer>
            
            <ChartContainer>
              <ChartTitle>Trendy ostrzeżeń w czasie</ChartTitle>
              <ChartContent>
                Wykres liniowy trendów ostrzeżeń
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
        <CardTitle>Ustawienia ostrzeżeń o kolizji</CardTitle>
        <CardContent>
          <SettingsGrid>
            <SettingItem>
              <SettingLabel>Ostrzeżenia o kolizji z przodu</SettingLabel>
              <SettingDescription>
                Ostrzeganie o potencjalnej kolizji z pojazdem lub przeszkodą z przodu.
              </SettingDescription>
              <ToggleContainer>
                <ToggleSwitch>
                  <input 
                    type="checkbox" 
                    checked={settings.enableCollisionWarning}
                    onChange={(e) => handleSettingChange('enableCollisionWarning', e.target.checked)}
                  />
                  <span></span>
                </ToggleSwitch>
                <ToggleLabel>
                  {settings.enableCollisionWarning ? 'Włączone' : 'Wyłączone'}
                </ToggleLabel>
              </ToggleContainer>
            </SettingItem>
            
            <SettingItem>
              <SettingLabel>Ostrzeżenia o zmianie pasa</SettingLabel>
              <SettingDescription>
                Ostrzeganie o niezamierzonej zmianie pasa ruchu.
              </SettingDescription>
              <ToggleContainer>
                <ToggleSwitch>
                  <input 
                    type="checkbox" 
                    checked={settings.enableLaneChangeWarning}
                    onChange={(e) => handleSettingChange('enableLaneChangeWarning', e.target.checked)}
                  />
                  <span></span>
                </ToggleSwitch>
                <ToggleLabel>
                  {settings.enableLaneChangeWarning ? 'Włączone' : 'Wyłączone'}
                </ToggleLabel>
              </ToggleContainer>
            </SettingItem>
            
            <SettingItem>
              <SettingLabel>Ostrzeżenia o jeździe na zderzaku</SettingLabel>
              <SettingDescription>
                Ostrzeganie o zbyt małej odległości od pojazdu z przodu.
              </SettingDescription>
              <ToggleContainer>
                <ToggleSwitch>
                  <input 
                    type="checkbox" 
                    checked={settings.enableTailgatingWarning}
                    onChange={(e) => handleSettingChange('enableTailgatingWarning', e.target.checked)}
                  />
                  <span></span>
                </ToggleSwitch>
                <ToggleLabel>
                  {settings.enableTailgatingWarning ? 'Włączone' : 'Wyłączone'}
                </ToggleLabel>
              </ToggleContainer>
            </SettingItem>
            
            <SettingItem>
              <SettingLabel>Ostrzeżenia o pieszych</SettingLabel>
              <SettingDescription>
                Ostrzeganie o pieszych na drodze.
              </SettingDescription>
              <ToggleContainer>
                <ToggleSwitch>
                  <input 
                    type="checkbox" 
                    checked={settings.enablePedestrianWarning}
                    onChange={(e) => handleSettingChange('enablePedestrianWarning', e.target.checked)}
                  />
                  <span></span>
                </ToggleSwitch>
                <ToggleLabel>
                  {settings.enablePedestrianWarning ? 'Włączone' : 'Wyłączone'}
                </ToggleLabel>
              </ToggleContainer>
            </SettingItem>
            
            <SettingItem>
              <SettingLabel>Alerty</SettingLabel>
              <SettingDescription>
                Powiadomienia dźwiękowe i wizualne w przypadku wykrycia potencjalnej kolizji.
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
                Dostosuj czułość systemu ostrzegania o kolizji.
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
                <SettingLabel>Próg odległości z przodu</SettingLabel>
                <SettingDescription>
                  Minimalna odległość (w metrach) od pojazdu lub przeszkody z przodu, poniżej której system generuje ostrzeżenie.
                </SettingDescription>
                <SliderContainer>
                  <SliderRow>
                    <Slider 
                      type="range" 
                      min="10" 
                      max="50" 
                      value={settings.forwardDistanceThreshold}
                      onChange={(e) => handleSettingChange('forwardDistanceThreshold', parseInt(e.target.value))}
                    />
                    <SliderValue>{settings.forwardDistanceThreshold}m</SliderValue>
                  </SliderRow>
                </SliderContainer>
              </SettingItem>
              
              <SettingItem>
                <SettingLabel>Próg czasu do kolizji</SettingLabel>
                <SettingDescription>
                  Minimalny czas (w sekundach) do potencjalnej kolizji, poniżej którego system generuje ostrzeżenie.
                </SettingDescription>
                <SliderContainer>
                  <SliderRow>
                    <Slider 
                      type="range" 
                      min="1" 
                      max="4" 
                      step="0.1"
                      value={settings.timeToCollisionThreshold}
                      onChange={(e) => handleSettingChange('timeToCollisionThreshold', parseFloat(e.target.value))}
                    />
                    <SliderValue>{settings.timeToCollisionThreshold}s</SliderValue>
                  </SliderRow>
                </SliderContainer>
              </SettingItem>
              
              <SettingItem>
                <SettingLabel>Próg jazdy na zderzaku</SettingLabel>
                <SettingDescription>
                  Minimalny czas (w sekundach) między pojazdami, poniżej którego system generuje ostrzeżenie o jeździe na zderzaku.
                </SettingDescription>
                <SliderContainer>
                  <SliderRow>
                    <Slider 
                      type="range" 
                      min="0.5" 
                      max="3" 
                      step="0.1"
                      value={settings.tailgatingThreshold}
                      onChange={(e) => handleSettingChange('tailgatingThreshold', parseFloat(e.target.value))}
                    />
                    <SliderValue>{settings.tailgatingThreshold}s</SliderValue>
                  </SliderRow>
                </SliderContainer>
              </SettingItem>
              
              <SettingItem>
                <SettingLabel>Próg zmiany pasa</SettingLabel>
                <SettingDescription>
                  Wartość odchylenia od środka pasa (w metrach), powyżej której system generuje ostrzeżenie o zmianie pasa.
                </SettingDescription>
                <SliderContainer>
                  <SliderRow>
                    <Slider 
                      type="range" 
                      min="0.3" 
                      max="1.5" 
                      step="0.1"
                      value={settings.laneChangeThreshold}
                      onChange={(e) => handleSettingChange('laneChangeThreshold', parseFloat(e.target.value))}
                    />
                    <SliderValue>{settings.laneChangeThreshold}m</SliderValue>
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
        <Title>System ostrzegania o kolizji</Title>
      </Header>
      
      <TabsContainer>
        <Tab 
          active={activeTab === 'live'} 
          onClick={() => setActiveTab('live')}
        >
          Na żywo
        </Tab>
        <Tab 
          active={activeTab === 'history'} 
          onClick={() => setActiveTab('history')}
        >
          Historia
        </Tab>
        <Tab 
          active={activeTab === 'settings'} 
          onClick={() => setActiveTab('settings')}
        >
          Ustawienia
        </Tab>
      </TabsContainer>
      
      {activeTab === 'live' && renderLiveTab()}
      {activeTab === 'history' && renderHistoryTab()}
      {activeTab === 'settings' && renderSettingsTab()}
    </Container>
  );
};

export default CollisionWarning;
