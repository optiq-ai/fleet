import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface DistractionDetectionProps {
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

const StatusIndicator = styled.div<{ status: 'normal' | 'warning' | 'danger' | 'inactive' }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 14px;
  background-color: ${props => 
    props.status === 'normal' ? '#e8f5e9' : 
    props.status === 'warning' ? '#fff8e1' : 
    props.status === 'danger' ? '#ffebee' : 
    '#f5f5f5'
  };
  color: ${props => 
    props.status === 'normal' ? '#2e7d32' : 
    props.status === 'warning' ? '#f57f17' : 
    props.status === 'danger' ? '#c62828' : 
    '#757575'
  };
`;

const StatusDot = styled.div<{ status: 'normal' | 'warning' | 'danger' | 'inactive' }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${props => 
    props.status === 'normal' ? '#4caf50' : 
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

const DistractionTypes = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 20px;
`;

const DistractionType = styled.div<{ active: boolean }>`
  padding: 8px 16px;
  border-radius: 20px;
  background-color: ${props => props.active ? '#e8eaf6' : '#f5f5f5'};
  color: ${props => props.active ? '#3f51b5' : '#666'};
  border: 1px solid ${props => props.active ? '#3f51b5' : 'transparent'};
  font-size: 14px;
  cursor: pointer;
  
  &:hover {
    background-color: ${props => props.active ? '#e8eaf6' : '#eeeeee'};
  }
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

const DistractionDetection: React.FC<DistractionDetectionProps> = ({
  driverId,
  onAlert,
  onSettingsChange
}) => {
  const [activeTab, setActiveTab] = useState<'live' | 'analytics' | 'settings'>('live');
  const [monitoringStatus, setMonitoringStatus] = useState<'normal' | 'warning' | 'danger' | 'inactive'>('normal');
  const [alerts, setAlerts] = useState<any[]>([]);
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
      eyesOffRoad: 0.15,
      phoneUsage: 1,
      eatingDrinking: 0,
      smokingVaping: 0,
      reachingObjects: 2,
      distractionScore: 78
    }
  });
  
  // Aktywne typy rozproszenia
  const [activeDistractions, setActiveDistractions] = useState<string[]>([]);
  
  // Ustawienia
  const [settings, setSettings] = useState({
    enableDistractionDetection: true,
    enableAlerts: true,
    alertSensitivity: 70,
    eyesOffRoadThreshold: 0.2,
    phoneUsageThreshold: 2,
    eatingDrinkingThreshold: 3,
    smokingVapingThreshold: 1,
    reachingObjectsThreshold: 3
  });
  
  // Symulacja danych w czasie rzeczywistym
  useEffect(() => {
    const interval = setInterval(() => {
      // Symulacja zmieniających się danych
      const newEyesOffRoad = Math.max(0, Math.min(1, driverData.metrics.eyesOffRoad + (Math.random() - 0.5) * 0.1));
      const newPhoneUsage = Math.max(0, Math.min(10, driverData.metrics.phoneUsage + (Math.random() > 0.9 ? 1 : 0)));
      const newEatingDrinking = Math.max(0, Math.min(5, driverData.metrics.eatingDrinking + (Math.random() > 0.95 ? 1 : 0)));
      const newSmokingVaping = Math.max(0, Math.min(3, driverData.metrics.smokingVaping + (Math.random() > 0.98 ? 1 : 0)));
      const newReachingObjects = Math.max(0, Math.min(5, driverData.metrics.reachingObjects + (Math.random() > 0.9 ? 1 : 0)));
      const newDistractionScore = Math.max(0, Math.min(100, driverData.metrics.distractionScore + (Math.random() - 0.5) * 5));
      
      const newMetrics = {
        eyesOffRoad: parseFloat(newEyesOffRoad.toFixed(2)),
        phoneUsage: newPhoneUsage,
        eatingDrinking: newEatingDrinking,
        smokingVaping: newSmokingVaping,
        reachingObjects: newReachingObjects,
        distractionScore: Math.round(newDistractionScore)
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
      
      // Określenie aktywnych typów rozproszenia
      const newActiveDistractions: string[] = [];
      
      if (newEyesOffRoad > settings.eyesOffRoadThreshold) {
        newActiveDistractions.push('eyes_off_road');
      }
      
      if (newPhoneUsage > settings.phoneUsageThreshold) {
        newActiveDistractions.push('phone_usage');
      }
      
      if (newEatingDrinking > settings.eatingDrinkingThreshold) {
        newActiveDistractions.push('eating_drinking');
      }
      
      if (newSmokingVaping > settings.smokingVapingThreshold) {
        newActiveDistractions.push('smoking_vaping');
      }
      
      if (newReachingObjects > settings.reachingObjectsThreshold) {
        newActiveDistractions.push('reaching_objects');
      }
      
      setActiveDistractions(newActiveDistractions);
      
      // Określenie statusu monitorowania
      let newStatus: 'normal' | 'warning' | 'danger' | 'inactive' = 'normal';
      
      if (newActiveDistractions.length === 1) {
        newStatus = 'warning';
      } else if (newActiveDistractions.length > 1) {
        newStatus = 'danger';
      }
      
      setMonitoringStatus(newStatus);
      
      // Generowanie alertów
      if (newStatus === 'danger' && Math.random() > 0.8) {
        const alertTypes = [
          { 
            title: 'Wykryto korzystanie z telefonu', 
            details: 'Kierowca korzysta z telefonu podczas jazdy.', 
            severity: 'high' as const,
            type: 'phone_usage'
          },
          { 
            title: 'Oczy poza drogą', 
            details: 'Kierowca nie patrzy na drogę przez dłuższy czas.', 
            severity: 'high' as const,
            type: 'eyes_off_road'
          },
          { 
            title: 'Wykryto jedzenie/picie', 
            details: 'Kierowca je lub pije podczas jazdy.', 
            severity: 'medium' as const,
            type: 'eating_drinking'
          },
          { 
            title: 'Wykryto palenie', 
            details: 'Kierowca pali podczas jazdy.', 
            severity: 'medium' as const,
            type: 'smoking_vaping'
          },
          { 
            title: 'Sięganie po przedmioty', 
            details: 'Kierowca sięga po przedmioty podczas jazdy.', 
            severity: 'medium' as const,
            type: 'reaching_objects'
          }
        ];
        
        // Wybierz alert na podstawie aktywnych rozproszeń
        const possibleAlerts = alertTypes.filter(alert => 
          newActiveDistractions.includes(alert.type)
        );
        
        if (possibleAlerts.length > 0) {
          const selectedAlert = possibleAlerts[Math.floor(Math.random() * possibleAlerts.length)];
          
          const newAlert = {
            id: `alert-${Date.now()}`,
            ...selectedAlert,
            timestamp: new Date().toISOString()
          };
          
          setAlerts(prev => [newAlert, ...prev].slice(0, 10));
          onAlert(newAlert);
        }
      }
    }, 1000);
    
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
            Status monitorowania
            <StatusIndicator status={monitoringStatus}>
              <StatusDot status={monitoringStatus} />
              {monitoringStatus === 'normal' ? 'Normalny' : 
               monitoringStatus === 'warning' ? 'Ostrzeżenie' : 
               monitoringStatus === 'danger' ? 'Niebezpieczeństwo' : 
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
              <div>Podgląd kamery monitorującej kierowcę</div>
              <VideoOverlay>
                {formatTime(new Date().toISOString())} • {monitoringStatus === 'normal' ? 'Status: OK' : 
                 monitoringStatus === 'warning' ? 'Status: Ostrzeżenie' : 
                 monitoringStatus === 'danger' ? 'Status: Alarm' : 
                 'Status: Nieaktywny'}
              </VideoOverlay>
            </VideoFeed>
            
            <MetricsGrid>
              <MetricCard alert={driverData.metrics.eyesOffRoad > settings.eyesOffRoadThreshold}>
                <MetricValue alert={driverData.metrics.eyesOffRoad > settings.eyesOffRoadThreshold}>
                  {(driverData.metrics.eyesOffRoad * 100).toFixed(0)}%
                </MetricValue>
                <MetricLabel>Oczy poza drogą</MetricLabel>
              </MetricCard>
              
              <MetricCard alert={driverData.metrics.phoneUsage > settings.phoneUsageThreshold}>
                <MetricValue alert={driverData.metrics.phoneUsage > settings.phoneUsageThreshold}>
                  {driverData.metrics.phoneUsage}
                </MetricValue>
                <MetricLabel>Korzystanie z telefonu</MetricLabel>
              </MetricCard>
              
              <MetricCard alert={driverData.metrics.eatingDrinking > settings.eatingDrinkingThreshold}>
                <MetricValue alert={driverData.metrics.eatingDrinking > settings.eatingDrinkingThreshold}>
                  {driverData.metrics.eatingDrinking}
                </MetricValue>
                <MetricLabel>Jedzenie/Picie</MetricLabel>
              </MetricCard>
              
              <MetricCard alert={driverData.metrics.smokingVaping > settings.smokingVapingThreshold}>
                <MetricValue alert={driverData.metrics.smokingVaping > settings.smokingVapingThreshold}>
                  {driverData.metrics.smokingVaping}
                </MetricValue>
                <MetricLabel>Palenie/Wapowanie</MetricLabel>
              </MetricCard>
              
              <MetricCard alert={driverData.metrics.reachingObjects > settings.reachingObjectsThreshold}>
                <MetricValue alert={driverData.metrics.reachingObjects > settings.reachingObjectsThreshold}>
                  {driverData.metrics.reachingObjects}
                </MetricValue>
                <MetricLabel>Sięganie po przedmioty</MetricLabel>
              </MetricCard>
              
              <MetricCard>
                <MetricValue>
                  {driverData.metrics.distractionScore}%
                </MetricValue>
                <MetricLabel>Wynik skupienia</MetricLabel>
              </MetricCard>
            </MetricsGrid>
            
            <DistractionTypes>
              <DistractionType active={activeDistractions.includes('eyes_off_road')}>
                Oczy poza drogą
              </DistractionType>
              <DistractionType active={activeDistractions.includes('phone_usage')}>
                Korzystanie z telefonu
              </DistractionType>
              <DistractionType active={activeDistractions.includes('eating_drinking')}>
                Jedzenie/Picie
              </DistractionType>
              <DistractionType active={activeDistractions.includes('smoking_vaping')}>
                Palenie/Wapowanie
              </DistractionType>
              <DistractionType active={activeDistractions.includes('reaching_objects')}>
                Sięganie po przedmioty
              </DistractionType>
            </DistractionTypes>
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
  
  // Renderowanie zakładki analityki
  const renderAnalyticsTab = () => {
    return (
      <>
        <Card>
          <CardTitle>Analiza rozproszenia uwagi</CardTitle>
          <CardContent>
            <ChartContainer>
              <ChartTitle>Trendy rozproszenia uwagi w czasie</ChartTitle>
              <ChartContent>
                Wykres trendów rozproszenia uwagi
              </ChartContent>
            </ChartContainer>
            
            <ChartContainer>
              <ChartTitle>Rozkład typów rozproszenia uwagi</ChartTitle>
              <ChartContent>
                Wykres kołowy typów rozproszenia uwagi
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
        <CardTitle>Ustawienia wykrywania rozproszenia uwagi</CardTitle>
        <CardContent>
          <SettingsGrid>
            <SettingItem>
              <SettingLabel>Wykrywanie rozproszenia uwagi</SettingLabel>
              <SettingDescription>
                Monitorowanie kierunku wzroku i zachowań kierowcy w celu wykrycia rozproszenia uwagi.
              </SettingDescription>
              <ToggleContainer>
                <ToggleSwitch>
                  <input 
                    type="checkbox" 
                    checked={settings.enableDistractionDetection}
                    onChange={(e) => handleSettingChange('enableDistractionDetection', e.target.checked)}
                  />
                  <span></span>
                </ToggleSwitch>
                <ToggleLabel>
                  {settings.enableDistractionDetection ? 'Włączone' : 'Wyłączone'}
                </ToggleLabel>
              </ToggleContainer>
            </SettingItem>
            
            <SettingItem>
              <SettingLabel>Alerty</SettingLabel>
              <SettingDescription>
                Powiadomienia dźwiękowe i wizualne w przypadku wykrycia rozproszenia uwagi.
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
                Dostosuj czułość systemu wykrywania rozproszenia uwagi.
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
                <SettingLabel>Próg czasu oczu poza drogą</SettingLabel>
                <SettingDescription>
                  Procent czasu, gdy oczy kierowcy nie są skierowane na drogę, powyżej którego system generuje alert.
                </SettingDescription>
                <SliderContainer>
                  <SliderRow>
                    <Slider 
                      type="range" 
                      min="0.1" 
                      max="0.5" 
                      step="0.05"
                      value={settings.eyesOffRoadThreshold}
                      onChange={(e) => handleSettingChange('eyesOffRoadThreshold', parseFloat(e.target.value))}
                    />
                    <SliderValue>{(settings.eyesOffRoadThreshold * 100).toFixed(0)}%</SliderValue>
                  </SliderRow>
                </SliderContainer>
              </SettingItem>
              
              <SettingItem>
                <SettingLabel>Próg korzystania z telefonu</SettingLabel>
                <SettingDescription>
                  Liczba przypadków korzystania z telefonu, powyżej której system generuje alert.
                </SettingDescription>
                <SliderContainer>
                  <SliderRow>
                    <Slider 
                      type="range" 
                      min="1" 
                      max="5" 
                      value={settings.phoneUsageThreshold}
                      onChange={(e) => handleSettingChange('phoneUsageThreshold', parseInt(e.target.value))}
                    />
                    <SliderValue>{settings.phoneUsageThreshold}</SliderValue>
                  </SliderRow>
                </SliderContainer>
              </SettingItem>
              
              <SettingItem>
                <SettingLabel>Próg jedzenia/picia</SettingLabel>
                <SettingDescription>
                  Liczba przypadków jedzenia lub picia, powyżej której system generuje alert.
                </SettingDescription>
                <SliderContainer>
                  <SliderRow>
                    <Slider 
                      type="range" 
                      min="1" 
                      max="10" 
                      value={settings.eatingDrinkingThreshold}
                      onChange={(e) => handleSettingChange('eatingDrinkingThreshold', parseInt(e.target.value))}
                    />
                    <SliderValue>{settings.eatingDrinkingThreshold}</SliderValue>
                  </SliderRow>
                </SliderContainer>
              </SettingItem>
              
              <SettingItem>
                <SettingLabel>Próg palenia/wapowania</SettingLabel>
                <SettingDescription>
                  Liczba przypadków palenia lub wapowania, powyżej której system generuje alert.
                </SettingDescription>
                <SliderContainer>
                  <SliderRow>
                    <Slider 
                      type="range" 
                      min="1" 
                      max="5" 
                      value={settings.smokingVapingThreshold}
                      onChange={(e) => handleSettingChange('smokingVapingThreshold', parseInt(e.target.value))}
                    />
                    <SliderValue>{settings.smokingVapingThreshold}</SliderValue>
                  </SliderRow>
                </SliderContainer>
              </SettingItem>
              
              <SettingItem>
                <SettingLabel>Próg sięgania po przedmioty</SettingLabel>
                <SettingDescription>
                  Liczba przypadków sięgania po przedmioty, powyżej której system generuje alert.
                </SettingDescription>
                <SliderContainer>
                  <SliderRow>
                    <Slider 
                      type="range" 
                      min="1" 
                      max="10" 
                      value={settings.reachingObjectsThreshold}
                      onChange={(e) => handleSettingChange('reachingObjectsThreshold', parseInt(e.target.value))}
                    />
                    <SliderValue>{settings.reachingObjectsThreshold}</SliderValue>
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
        <Title>Wykrywanie rozproszenia uwagi</Title>
      </Header>
      
      <TabsContainer>
        <Tab 
          active={activeTab === 'live'} 
          onClick={() => setActiveTab('live')}
        >
          Na żywo
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
      
      {activeTab === 'live' && renderLiveTab()}
      {activeTab === 'analytics' && renderAnalyticsTab()}
      {activeTab === 'settings' && renderSettingsTab()}
    </Container>
  );
};

export default DistractionDetection;
