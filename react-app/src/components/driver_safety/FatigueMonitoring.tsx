import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface FatigueMonitoringProps {
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

const FatigueMonitoring: React.FC<FatigueMonitoringProps> = ({
  driverId,
  onAlert,
  onSettingsChange
}) => {
  const [activeTab, setActiveTab] = useState<'live' | 'history' | 'settings'>('live');
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
      blinkRate: 12,
      yawns: 3,
      headPosition: 'normal',
      eyesClosed: 0.2,
      distractions: 2,
      focusScore: 85
    }
  });
  
  // Ustawienia
  const [settings, setSettings] = useState({
    enableFatigueDetection: true,
    enableDistractionDetection: true,
    enableAlerts: true,
    alertSensitivity: 70,
    blinkRateThreshold: 8,
    yawnThreshold: 5,
    eyesClosedThreshold: 0.3,
    distractionThreshold: 3
  });
  
  // Symulacja danych w czasie rzeczywistym
  useEffect(() => {
    const interval = setInterval(() => {
      // Symulacja zmieniających się danych
      const newBlinkRate = Math.max(5, Math.min(20, driverData.metrics.blinkRate + (Math.random() - 0.5) * 2));
      const newYawns = Math.max(0, Math.min(10, driverData.metrics.yawns + (Math.random() > 0.9 ? 1 : 0)));
      const newEyesClosed = Math.max(0, Math.min(1, driverData.metrics.eyesClosed + (Math.random() - 0.5) * 0.1));
      const newDistractions = Math.max(0, Math.min(10, driverData.metrics.distractions + (Math.random() > 0.9 ? 1 : 0)));
      const newFocusScore = Math.max(0, Math.min(100, driverData.metrics.focusScore + (Math.random() - 0.5) * 5));
      
      const newMetrics = {
        blinkRate: parseFloat(newBlinkRate.toFixed(1)),
        yawns: newYawns,
        headPosition: driverData.metrics.headPosition,
        eyesClosed: parseFloat(newEyesClosed.toFixed(2)),
        distractions: newDistractions,
        focusScore: Math.round(newFocusScore)
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
      
      // Określenie statusu monitorowania
      let newStatus: 'normal' | 'warning' | 'danger' | 'inactive' = 'normal';
      
      if (newBlinkRate > settings.blinkRateThreshold || 
          newYawns > settings.yawnThreshold || 
          newEyesClosed > settings.eyesClosedThreshold || 
          newDistractions > settings.distractionThreshold) {
        newStatus = 'warning';
      }
      
      if (newBlinkRate > settings.blinkRateThreshold * 1.5 || 
          newYawns > settings.yawnThreshold * 1.5 || 
          newEyesClosed > settings.eyesClosedThreshold * 1.5 || 
          newDistractions > settings.distractionThreshold * 1.5) {
        newStatus = 'danger';
      }
      
      setMonitoringStatus(newStatus);
      
      // Generowanie alertów
      if (newStatus === 'danger' && Math.random() > 0.8) {
        const alertTypes = [
          { title: 'Wykryto zmęczenie kierowcy', details: 'Wysoka częstotliwość mrugnięć i ziewania wskazuje na zmęczenie.', severity: 'high' as const },
          { title: 'Wykryto rozproszenie uwagi', details: 'Kierowca odwraca wzrok od drogi zbyt często.', severity: 'medium' as const },
          { title: 'Wykryto mikro-sen', details: 'Oczy kierowcy były zamknięte przez dłuższy czas.', severity: 'high' as const }
        ];
        
        const newAlert = {
          id: `alert-${Date.now()}`,
          ...alertTypes[Math.floor(Math.random() * alertTypes.length)],
          timestamp: new Date().toISOString()
        };
        
        setAlerts(prev => [newAlert, ...prev].slice(0, 10));
        onAlert(newAlert);
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
              <MetricCard alert={driverData.metrics.blinkRate > settings.blinkRateThreshold}>
                <MetricValue alert={driverData.metrics.blinkRate > settings.blinkRateThreshold}>
                  {driverData.metrics.blinkRate}
                </MetricValue>
                <MetricLabel>Częstotliwość mrugnięć (na min)</MetricLabel>
              </MetricCard>
              
              <MetricCard alert={driverData.metrics.yawns > settings.yawnThreshold}>
                <MetricValue alert={driverData.metrics.yawns > settings.yawnThreshold}>
                  {driverData.metrics.yawns}
                </MetricValue>
                <MetricLabel>Liczba ziewnięć</MetricLabel>
              </MetricCard>
              
              <MetricCard>
                <MetricValue>
                  {driverData.metrics.headPosition}
                </MetricValue>
                <MetricLabel>Pozycja głowy</MetricLabel>
              </MetricCard>
              
              <MetricCard alert={driverData.metrics.eyesClosed > settings.eyesClosedThreshold}>
                <MetricValue alert={driverData.metrics.eyesClosed > settings.eyesClosedThreshold}>
                  {(driverData.metrics.eyesClosed * 100).toFixed(0)}%
                </MetricValue>
                <MetricLabel>Czas zamkniętych oczu</MetricLabel>
              </MetricCard>
              
              <MetricCard alert={driverData.metrics.distractions > settings.distractionThreshold}>
                <MetricValue alert={driverData.metrics.distractions > settings.distractionThreshold}>
                  {driverData.metrics.distractions}
                </MetricValue>
                <MetricLabel>Liczba rozproszeń</MetricLabel>
              </MetricCard>
              
              <MetricCard>
                <MetricValue>
                  {driverData.metrics.focusScore}%
                </MetricValue>
                <MetricLabel>Wynik skupienia</MetricLabel>
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
      <Card>
        <CardTitle>Historia monitorowania</CardTitle>
        <CardContent>
          <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
            Funkcjonalność historii będzie dostępna wkrótce.
          </div>
        </CardContent>
      </Card>
    );
  };
  
  // Renderowanie zakładki ustawień
  const renderSettingsTab = () => {
    return (
      <Card>
        <CardTitle>Ustawienia monitorowania</CardTitle>
        <CardContent>
          <SettingsGrid>
            <SettingItem>
              <SettingLabel>Wykrywanie zmęczenia</SettingLabel>
              <SettingDescription>
                Monitorowanie mrugnięć, ziewania i pozycji głowy w celu wykrycia oznak zmęczenia.
              </SettingDescription>
              <ToggleContainer>
                <ToggleSwitch>
                  <input 
                    type="checkbox" 
                    checked={settings.enableFatigueDetection}
                    onChange={(e) => handleSettingChange('enableFatigueDetection', e.target.checked)}
                  />
                  <span></span>
                </ToggleSwitch>
                <ToggleLabel>
                  {settings.enableFatigueDetection ? 'Włączone' : 'Wyłączone'}
                </ToggleLabel>
              </ToggleContainer>
            </SettingItem>
            
            <SettingItem>
              <SettingLabel>Wykrywanie rozproszenia uwagi</SettingLabel>
              <SettingDescription>
                Monitorowanie kierunku wzroku i pozycji głowy w celu wykrycia rozproszenia uwagi.
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
                Powiadomienia dźwiękowe i wizualne w przypadku wykrycia zmęczenia lub rozproszenia uwagi.
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
                Dostosuj czułość systemu wykrywania zmęczenia i rozproszenia uwagi.
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
                <SettingLabel>Próg częstotliwości mrugnięć</SettingLabel>
                <SettingDescription>
                  Liczba mrugnięć na minutę, powyżej której system generuje alert.
                </SettingDescription>
                <SliderContainer>
                  <SliderRow>
                    <Slider 
                      type="range" 
                      min="5" 
                      max="20" 
                      value={settings.blinkRateThreshold}
                      onChange={(e) => handleSettingChange('blinkRateThreshold', parseInt(e.target.value))}
                    />
                    <SliderValue>{settings.blinkRateThreshold}</SliderValue>
                  </SliderRow>
                </SliderContainer>
              </SettingItem>
              
              <SettingItem>
                <SettingLabel>Próg liczby ziewnięć</SettingLabel>
                <SettingDescription>
                  Liczba ziewnięć, powyżej której system generuje alert.
                </SettingDescription>
                <SliderContainer>
                  <SliderRow>
                    <Slider 
                      type="range" 
                      min="1" 
                      max="10" 
                      value={settings.yawnThreshold}
                      onChange={(e) => handleSettingChange('yawnThreshold', parseInt(e.target.value))}
                    />
                    <SliderValue>{settings.yawnThreshold}</SliderValue>
                  </SliderRow>
                </SliderContainer>
              </SettingItem>
              
              <SettingItem>
                <SettingLabel>Próg czasu zamkniętych oczu</SettingLabel>
                <SettingDescription>
                  Procent czasu z zamkniętymi oczami, powyżej którego system generuje alert.
                </SettingDescription>
                <SliderContainer>
                  <SliderRow>
                    <Slider 
                      type="range" 
                      min="0.1" 
                      max="0.5" 
                      step="0.05"
                      value={settings.eyesClosedThreshold}
                      onChange={(e) => handleSettingChange('eyesClosedThreshold', parseFloat(e.target.value))}
                    />
                    <SliderValue>{(settings.eyesClosedThreshold * 100).toFixed(0)}%</SliderValue>
                  </SliderRow>
                </SliderContainer>
              </SettingItem>
              
              <SettingItem>
                <SettingLabel>Próg liczby rozproszeń</SettingLabel>
                <SettingDescription>
                  Liczba rozproszeń uwagi, powyżej której system generuje alert.
                </SettingDescription>
                <SliderContainer>
                  <SliderRow>
                    <Slider 
                      type="range" 
                      min="1" 
                      max="10" 
                      value={settings.distractionThreshold}
                      onChange={(e) => handleSettingChange('distractionThreshold', parseInt(e.target.value))}
                    />
                    <SliderValue>{settings.distractionThreshold}</SliderValue>
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
        <Title>Monitorowanie zmęczenia kierowcy</Title>
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

export default FatigueMonitoring;
