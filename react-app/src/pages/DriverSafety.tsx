import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Card from '../components/common/Card';
import Table from '../components/common/Table';
import KPICard from '../components/common/KPICard';

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

const KPISection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
  margin-bottom: 20px;
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

const MapPlaceholder = styled.div`
  background-color: #e9ecef;
  border-radius: 8px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6c757d;
  position: relative;
`;

const MapOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const MapPoint = styled.div<{ x: number; y: number; color: string; size?: number }>`
  position: absolute;
  top: ${props => props.y}%;
  left: ${props => props.x}%;
  width: ${props => props.size || 12}px;
  height: ${props => props.size || 12}px;
  background-color: ${props => props.color};
  border-radius: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translate(-50%, -50%) scale(1.5);
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
    z-index: 10;
  }
  
  &:hover::after {
    content: 'Incident ID: ${props => props.x * props.y}';
    position: absolute;
    top: -30px;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    white-space: nowrap;
    z-index: 20;
  }
`;

const ChartPlaceholder = styled.div`
  background-color: #e9ecef;
  border-radius: 8px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6c757d;
  position: relative;
`;

const FilterBar = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
  flex-wrap: wrap;
`;

const FilterSelect = styled.select`
  padding: 8px 16px;
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: #3f51b5;
  }
`;

const FilterOption = styled.option`
  padding: 8px;
`;

const SearchInput = styled.input`
  padding: 8px 16px;
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
  flex-grow: 1;
  max-width: 300px;
  
  &:focus {
    outline: none;
    border-color: #3f51b5;
  }
  
  &::placeholder {
    color: #999;
  }
`;

const LoadingIndicator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  color: #666;
`;

const RadarChart = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RadarBackground = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.9) 0%,
    rgba(240, 240, 240, 0.9) 30%,
    rgba(230, 230, 230, 0.9) 60%,
    rgba(220, 220, 220, 0.9) 100%
  );
`;

const RadarAxis = styled.div<{ rotation: number }>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.1);
  transform: translateY(-50%) rotate(${props => props.rotation}deg);
  transform-origin: center;
`;

const RadarLabel = styled.div<{ x: number; y: number }>`
  position: absolute;
  top: ${props => props.y}%;
  left: ${props => props.x}%;
  transform: translate(-50%, -50%);
  font-size: 12px;
  color: #666;
  white-space: nowrap;
`;

const RadarPoint = styled.div<{ x: number; y: number; size: number; color: string }>`
  position: absolute;
  top: ${props => props.y}%;
  left: ${props => props.x}%;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background-color: ${props => props.color};
  border-radius: 50%;
  transform: translate(-50%, -50%);
`;

const RadarPolygon = styled.polygon`
  fill: rgba(63, 81, 181, 0.2);
  stroke: rgba(63, 81, 181, 0.8);
  stroke-width: 2;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 20px;
  background-color: #e9ecef;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 10px;
`;

const ProgressFill = styled.div<{ width: number; color: string }>`
  height: 100%;
  width: ${props => props.width}%;
  background-color: ${props => props.color};
  border-radius: 10px;
  transition: width 1s ease-in-out;
`;

const ProgressLabel = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #666;
`;

// Typy danych
interface DriverSafetyData {
  kpis: {
    safetyIndex: number;
    alertCount: number;
    fatigueDrivers: number;
    distractionCases: number;
  };
  safetyAlerts: {
    type: string;
    driver: string;
    description: string;
    time: string;
    location: string;
    status: string;
  }[];
  coachingSessions: {
    driver: string;
    type: string;
    topic: string;
    date: string;
    status: string;
  }[];
  mapData: {
    incidentPoints: { x: number; y: number; type: string }[];
  };
  driverRankings: {
    driver: string;
    score: number;
    trend: 'up' | 'down' | 'neutral';
  }[];
  drivingStyle: {
    category: string;
    value: number;
    angle: number;
    labelPosition: { x: number; y: number };
  }[];
}

const DriverSafety: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [safetyData, setSafetyData] = useState<DriverSafetyData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [alertTypeFilter, setAlertTypeFilter] = useState('all');
  const [timeFilter, setTimeFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Symulacja pobierania danych z API
  useEffect(() => {
    const fetchSafetyData = async () => {
      setIsLoading(true);
      try {
        // Symulacja opóźnienia sieciowego
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Dane mockowe
        const mockData: DriverSafetyData = {
          kpis: {
            safetyIndex: 85,
            alertCount: 12,
            fatigueDrivers: 3,
            distractionCases: 5
          },
          safetyAlerts: [
            { type: 'Zmęcz.', driver: 'Jan K.', description: 'Wykryto oznaki zmęczenia', time: '10:23', location: 'Warszawa-Łódź', status: 'Nowy' },
            { type: 'Rozpr.', driver: 'Anna W.', description: 'Korzystanie z telefonu', time: '09:45', location: 'Kraków-Katowice', status: 'Nowy' },
            { type: 'Styl', driver: 'Piotr M.', description: 'Gwałtowne hamowanie', time: '08:30', location: 'Poznań', status: 'W trakcie' },
            { type: 'Koliz.', driver: 'Tomasz L.', description: 'Zbyt mała odległość', time: '11:15', location: 'Wrocław', status: 'W trakcie' },
            { type: 'Zmęcz.', driver: 'Ewa S.', description: 'Długi czas pracy', time: '12:05', location: 'Gdańsk-Gdynia', status: 'Zamknięty' }
          ],
          coachingSessions: [
            { driver: 'Jan K.', type: 'Online', topic: 'Zmęczenie za kierownicą', date: '15.04', status: 'Zaplanowane' },
            { driver: 'Piotr M.', type: 'Osobiste', topic: 'Techniki hamowania', date: '18.04', status: 'Zaplanowane' },
            { driver: 'Grupa A', type: 'Webinar', topic: 'Bezpieczny dystans', date: '20.04', status: 'Zaplanowane' },
            { driver: 'Anna W.', type: 'Online', topic: 'Rozproszenie uwagi', date: '22.04', status: 'Zaplanowane' },
            { driver: 'Tomasz L.', type: 'Osobiste', topic: 'Defensywna jazda', date: '25.04', status: 'Zaplanowane' }
          ],
          mapData: {
            incidentPoints: [
              { x: 25, y: 35, type: 'Zmęczenie' },
              { x: 65, y: 45, type: 'Rozproszenie' },
              { x: 40, y: 70, type: 'Styl jazdy' },
              { x: 30, y: 20, type: 'Kolizja' },
              { x: 70, y: 60, type: 'Zmęczenie' },
              { x: 55, y: 30, type: 'Rozproszenie' }
            ]
          },
          driverRankings: [
            { driver: 'Marek N.', score: 95, trend: 'up' },
            { driver: 'Alicja K.', score: 92, trend: 'up' },
            { driver: 'Robert W.', score: 88, trend: 'neutral' },
            { driver: 'Karolina Z.', score: 85, trend: 'down' },
            { driver: 'Michał S.', score: 82, trend: 'up' }
          ],
          drivingStyle: [
            { category: 'Hamowanie', value: 75, angle: 0, labelPosition: { x: 90, y: 50 } },
            { category: 'Przyspieszanie', value: 85, angle: 72, labelPosition: { x: 75, y: 15 } },
            { category: 'Zakręty', value: 65, angle: 144, labelPosition: { x: 25, y: 15 } },
            { category: 'Prędkość', value: 90, angle: 216, labelPosition: { x: 10, y: 50 } },
            { category: 'Dystans', value: 70, angle: 288, labelPosition: { x: 25, y: 85 } }
          ]
        };
        
        setSafetyData(mockData);
        setError(null);
      } catch (err) {
        console.error('Error fetching safety data:', err);
        setError('Nie udało się pobrać danych o bezpieczeństwie. Spróbuj ponownie później.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSafetyData();
  }, []);

  // Filtrowanie alertów
  const getFilteredAlerts = () => {
    if (!safetyData) return [];
    
    return safetyData.safetyAlerts.filter(alert => {
      // Filtrowanie po typie alertu
      if (alertTypeFilter !== 'all') {
        if (alertTypeFilter === 'fatigue' && alert.type !== 'Zmęcz.') return false;
        if (alertTypeFilter === 'distraction' && alert.type !== 'Rozpr.') return false;
        if (alertTypeFilter === 'style' && alert.type !== 'Styl') return false;
        if (alertTypeFilter === 'collision' && alert.type !== 'Koliz.') return false;
      }
      
      // Filtrowanie po czasie (uproszczone)
      if (timeFilter !== 'all') {
        const hour = parseInt(alert.time.split(':')[0]);
        if (timeFilter === 'morning' && (hour < 6 || hour >= 12)) return false;
        if (timeFilter === 'afternoon' && (hour < 12 || hour >= 18)) return false;
        if (timeFilter === 'evening' && (hour < 18 || hour >= 22)) return false;
      }
      
      // Filtrowanie po wyszukiwaniu
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          alert.driver.toLowerCase().includes(query) ||
          alert.description.toLowerCase().includes(query) ||
          alert.location.toLowerCase().includes(query)
        );
      }
      
      return true;
    });
  };

  // Konwersja danych do formatu wymaganego przez komponent Table
  const getSafetyAlertTableData = () => {
    const filteredAlerts = getFilteredAlerts();
    
    return {
      headers: ['Typ', 'Kierowca', 'Opis', 'Czas', 'Lokalizacja', 'Status'],
      data: filteredAlerts.map(alert => [
        alert.type,
        alert.driver,
        alert.description,
        alert.time,
        alert.location,
        alert.status
      ])
    };
  };
  
  const getCoachingTableData = () => {
    if (!safetyData) return { headers: [], data: [] };
    
    return {
      headers: ['Kierowca', 'Typ', 'Temat', 'Data', 'Status'],
      data: safetyData.coachingSessions.map(session => [
        session.driver,
        session.type,
        session.topic,
        session.date,
        session.status
      ])
    };
  };

  // Generowanie punktów dla wykresu radarowego
  const generateRadarPoints = () => {
    if (!safetyData) return '';
    
    const center = { x: 50, y: 50 };
    const radius = 40;
    
    return safetyData.drivingStyle.map(item => {
      const angle = (item.angle * Math.PI) / 180;
      const distance = (item.value / 100) * radius;
      const x = center.x + distance * Math.cos(angle);
      const y = center.y + distance * Math.sin(angle);
      return `${x},${y}`;
    }).join(' ');
  };

  // Obsługa kliknięcia wiersza tabeli
  const handleRowClick = (table: string, index: number) => {
    console.log(`Kliknięto wiersz ${index} w tabeli ${table}`);
    // Tutaj można dodać nawigację do szczegółów
    alert(`Otwieranie szczegółów alertu ${index + 1}`);
  };

  // Obsługa zmiany filtrów
  const handleAlertTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAlertTypeFilter(e.target.value);
  };
  
  const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTimeFilter(e.target.value);
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  if (isLoading) {
    return (
      <PageContainer>
        <LoadingIndicator>Ładowanie danych o bezpieczeństwie kierowców...</LoadingIndicator>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <Card fullWidth>
          <div style={{ color: 'red', padding: '20px', textAlign: 'center' }}>
            {error}
          </div>
        </Card>
      </PageContainer>
    );
  }

  if (!safetyData) {
    return (
      <PageContainer>
        <Card fullWidth>
          <div style={{ padding: '20px', textAlign: 'center' }}>
            Brak danych do wyświetlenia
          </div>
        </Card>
      </PageContainer>
    );
  }

  const { headers: alertHeaders, data: alertData } = getSafetyAlertTableData();
  const { headers: coachingHeaders, data: coachingData } = getCoachingTableData();
  const radarPoints = generateRadarPoints();

  return (
    <PageContainer>
      <KPISection>
        <KPICard 
          title="Wskaźnik bezpieczeństwa" 
          value={`${safetyData.kpis.safetyIndex}%`} 
          trend="up" 
          trendValue="5% w tym miesiącu" 
        />
        <KPICard 
          title="Liczba alertów" 
          value={safetyData.kpis.alertCount} 
          trend="down" 
          trendValue="3 mniej niż wczoraj" 
        />
        <KPICard 
          title="Zmęczenie kierowców" 
          value={`${safetyData.kpis.fatigueDrivers} kierowców`} 
          trend="neutral" 
          trendValue="Bez zmian" 
        />
        <KPICard 
          title="Rozproszenie uwagi" 
          value={`${safetyData.kpis.distractionCases} przypadków`} 
          trend="down" 
          trendValue="2 mniej niż wczoraj" 
        />
      </KPISection>

      <SectionTitle>MAPA INCYDENTÓW BEZPIECZEŃSTWA</SectionTitle>
      <Card fullWidth>
        <MapPlaceholder>
          Interaktywna mapa z oznaczeniami incydentów
          <MapOverlay>
            {safetyData.mapData.incidentPoints.map((point, index) => (
              <MapPoint 
                key={`incident-${index}`}
                x={point.x} 
                y={point.y} 
                color={
                  point.type === 'Zmęczenie' ? '#dc3545' :
                  point.type === 'Rozproszenie' ? '#fd7e14' :
                  point.type === 'Styl jazdy' ? '#ffc107' :
                  '#0d6efd'
                }
                size={14}
              />
            ))}
          </MapOverlay>
        </MapPlaceholder>
      </Card>

      <SectionTitle>ALERTY BEZPIECZEŃSTWA</SectionTitle>
      <FilterBar>
        <FilterSelect value={alertTypeFilter} onChange={handleAlertTypeChange}>
          <FilterOption value="all">Wszystkie typy</FilterOption>
          <FilterOption value="fatigue">Zmęczenie</FilterOption>
          <FilterOption value="distraction">Rozproszenie uwagi</FilterOption>
          <FilterOption value="style">Styl jazdy</FilterOption>
          <FilterOption value="collision">Ryzyko kolizji</FilterOption>
        </FilterSelect>
        
        <FilterSelect value={timeFilter} onChange={handleTimeChange}>
          <FilterOption value="all">Wszystkie godziny</FilterOption>
          <FilterOption value="morning">Rano (6-12)</FilterOption>
          <FilterOption value="afternoon">Popołudnie (12-18)</FilterOption>
          <FilterOption value="evening">Wieczór (18-22)</FilterOption>
        </FilterSelect>
        
        <SearchInput 
          type="text" 
          placeholder="Szukaj..." 
          value={searchQuery} 
          onChange={handleSearchChange}
        />
      </FilterBar>
      
      <Card fullWidth>
        <Table 
          headers={alertHeaders} 
          data={alertData} 
          onRowClick={(index) => handleRowClick('safety', index)}
          emptyMessage="Brak alertów spełniających kryteria filtrowania"
        />
      </Card>
      
      <SectionTitle>ANALIZA ZACHOWANIA KIEROWCÓW</SectionTitle>
      <GridSection>
        <Card title="Ranking bezpieczeństwa">
          <div style={{ padding: '20px' }}>
            {safetyData.driverRankings.map((driver, index) => (
              <div key={index} style={{ marginBottom: '15px' }}>
                <ProgressLabel>
                  <span>{driver.driver}</span>
                  <span>{driver.score}%</span>
                </ProgressLabel>
                <ProgressBar>
                  <ProgressFill 
                    width={driver.score} 
                    color={
                      driver.score >= 90 ? '#28a745' :
                      driver.score >= 80 ? '#17a2b8' :
                      driver.score >= 70 ? '#ffc107' :
                      '#dc3545'
                    } 
                  />
                </ProgressBar>
              </div>
            ))}
          </div>
        </Card>
        <Card title="Trendy bezpieczeństwa">
          <ChartPlaceholder>
            Wykres trendu
          </ChartPlaceholder>
        </Card>
      </GridSection>
      
      <GridSection>
        <Card title="Styl jazdy">
          <RadarChart>
            <RadarBackground>
              {safetyData.drivingStyle.map((item, index) => (
                <RadarAxis key={`axis-${index}`} rotation={item.angle} />
              ))}
              <svg width="100%" height="100%" viewBox="0 0 100 100" style={{ position: 'absolute', top: 0, left: 0 }}>
                <RadarPolygon points={radarPoints} />
              </svg>
              {safetyData.drivingStyle.map((item, index) => (
                <RadarLabel 
                  key={`label-${index}`} 
                  x={item.labelPosition.x} 
                  y={item.labelPosition.y}
                >
                  {item.category}
                </RadarLabel>
              ))}
            </RadarBackground>
          </RadarChart>
        </Card>
        <Card title="Punktacja">
          <div style={{ padding: '20px' }}>
            {safetyData.drivingStyle.map((item, index) => (
              <div key={index} style={{ marginBottom: '15px' }}>
                <ProgressLabel>
                  <span>{item.category}</span>
                  <span>{item.value}%</span>
                </ProgressLabel>
                <ProgressBar>
                  <ProgressFill 
                    width={item.value} 
                    color={
                      item.value >= 90 ? '#28a745' :
                      item.value >= 80 ? '#17a2b8' :
                      item.value >= 70 ? '#ffc107' :
                      '#dc3545'
                    } 
                  />
                </ProgressBar>
              </div>
            ))}
          </div>
        </Card>
      </GridSection>

      <SectionTitle>SYSTEM COACHINGU</SectionTitle>
      <Card fullWidth>
        <Table 
          headers={coachingHeaders} 
          data={coachingData} 
          onRowClick={(index) => handleRowClick('coaching', index)}
        />
      </Card>
    </PageContainer>
  );
};

export default DriverSafety;
