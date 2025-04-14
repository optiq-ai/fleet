import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Card from '../components/common/Card';
import Table from '../components/common/Table';
import driverSafetyService from '../services/api/driverSafetyService';

/**
 * @typedef {Object} SafetyAlert
 * @property {string} id - Alert ID
 * @property {string} type - Alert type
 * @property {string} driver - Driver name
 * @property {string} description - Alert description
 * @property {string} time - Alert time
 * @property {string} location - Alert location
 * @property {string} status - Alert status
 */

/**
 * @typedef {Object} SafetyAlertsResponse
 * @property {number} total - Total number of alerts
 * @property {number} page - Current page
 * @property {number} limit - Page size limit
 * @property {SafetyAlert[]} alerts - List of safety alerts
 */

/**
 * @typedef {Object} DriverRanking
 * @property {string} driver - Driver name
 * @property {number} score - Safety score
 * @property {string} trend - Score trend
 * @property {Object} details - Score details
 */

/**
 * @typedef {Object} DriverRankingResponse
 * @property {DriverRanking[]} rankings - Driver rankings
 */

/**
 * @typedef {Object} DrivingStyleResponse
 * @property {string} driver - Driver name
 * @property {number} overallScore - Overall score
 * @property {Array} drivingStyle - Driving style metrics
 * @property {Array} history - Score history
 * @property {Array} recommendations - Recommendations
 */

/**
 * @typedef {Object} CoachingSessionsResponse
 * @property {Array} sessions - Coaching sessions
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

const RadarChartContainer = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  margin: 0 auto;
`;

const RadarChartBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #f5f5f5;
  z-index: 1;
`;

const RadarChartAxis = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 1px;
  background-color: #e0e0e0;
  transform-origin: left center;
  transform: rotate(${props => props.angle}deg);
  z-index: 2;
`;

const RadarChartCircle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: ${props => props.size}%;
  height: ${props => props.size}%;
  border-radius: 50%;
  border: 1px dashed #e0e0e0;
  transform: translate(-50%, -50%);
  z-index: 2;
`;

const RadarChartPoint = styled.div`
  position: absolute;
  top: ${props => 50 + props.y * props.value / 100}%;
  left: ${props => 50 + props.x * props.value / 100}%;
  width: 8px;
  height: 8px;
  background-color: #3f51b5;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  z-index: 4;
`;

const RadarChartPolygon = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 3;
  
  & > svg {
    width: 100%;
    height: 100%;
    
    & > polygon {
      fill: rgba(63, 81, 181, 0.2);
      stroke: #3f51b5;
      stroke-width: 2;
    }
  }
`;

const RadarChartLabel = styled.div`
  position: absolute;
  top: ${props => props.y}%;
  left: ${props => props.x}%;
  transform: translate(-50%, -50%);
  font-size: 12px;
  color: #666;
  z-index: 5;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background-color: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
  margin-top: 4px;
`;

const ProgressBarFill = styled.div`
  height: 100%;
  width: ${props => props.width}%;
  background-color: ${props => props.color};
  border-radius: 4px;
  transition: width 0.3s ease;
`;

const VideoContainer = styled.div`
  width: 100%;
  height: 200px;
  background-color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  margin-top: 16px;
  border-radius: 8px;
`;

/**
 * DriverSafety component for monitoring driver safety
 * @returns {JSX.Element} DriverSafety component
 */
const DriverSafety = () => {
  // Stan dla alertów bezpieczeństwa
  const [alerts, setAlerts] = useState(null);
  
  // Stan dla wybranego alertu
  const [selectedAlert, setSelectedAlert] = useState(null);
  
  // Stan dla rankingu kierowców
  const [driverRanking, setDriverRanking] = useState(null);
  
  // Stan dla analizy stylu jazdy
  const [drivingStyle, setDrivingStyle] = useState(null);
  
  // Stan dla sesji coachingowych
  const [coachingSessions, setCoachingSessions] = useState(null);
  
  // Stan dla filtrów
  const [filters, setFilters] = useState({
    type: 'all',
    time: 'all',
    search: '',
    page: 1,
    limit: 10
  });
  
  // Stan dla aktywnej zakładki
  const [activeTab, setActiveTab] = useState('alerts');
  
  // Stany ładowania i błędów
  const [isLoading, setIsLoading] = useState(true);
  const [isDetailLoading, setIsDetailLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Pobieranie danych przy montowaniu komponentu
  useEffect(() => {
    const fetchSafetyData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Pobieranie alertów bezpieczeństwa
        const alertsResponse = await driverSafetyService.getAlerts(
          filters.type !== 'all' ? filters.type : undefined,
          filters.time !== 'all' ? filters.time : undefined,
          filters.search || undefined,
          filters.page,
          filters.limit
        );
        setAlerts(alertsResponse);
        
        // Pobieranie rankingu kierowców
        const rankingResponse = await driverSafetyService.getDriverRanking();
        setDriverRanking(rankingResponse);
        
        // Pobieranie sesji coachingowych
        const coachingResponse = await driverSafetyService.getCoachingSessions();
        setCoachingSessions(coachingResponse);
        
        // Pobieranie analizy stylu jazdy dla pierwszego kierowcy z rankingu
        if (rankingResponse && rankingResponse.rankings.length > 0) {
          const drivingStyleResponse = await driverSafetyService.getDriverStyle(
            rankingResponse.rankings[0].driver
          );
          setDrivingStyle(drivingStyleResponse);
        }
      } catch (err) {
        console.error('Error fetching safety data:', err);
        setError('Nie udało się pobrać danych bezpieczeństwa kierowcy. Spróbuj odświeżyć stronę.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSafetyData();
  }, [filters.type, filters.time, filters.page, filters.limit]);
  
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
      const alertDetails = await driverSafetyService.getAlertDetails(alert.id);
      setSelectedAlert(alertDetails);
    } catch (err) {
      console.error('Error fetching alert details:', err);
      setError('Nie udało się pobrać szczegółów alertu.');
    } finally {
      setIsDetailLoading(false);
    }
  };
  
  // Obsługa kliknięcia wiersza kierowcy
  const handleDriverClick = async (driver) => {
    setIsDetailLoading(true);
    
    try {
      const drivingStyleResponse = await driverSafetyService.getDriverStyle(driver.driver);
      setDrivingStyle(drivingStyleResponse);
    } catch (err) {
      console.error('Error fetching driving style:', err);
      setError('Nie udało się pobrać analizy stylu jazdy.');
    } finally {
      setIsDetailLoading(false);
    }
  };
  
  // Renderowanie sekcji filtrów
  const renderFilters = () => {
    return (
      <FilterContainer>
        <FilterGroup>
          <FilterLabel htmlFor="type">Typ alertu</FilterLabel>
          <FilterSelect 
            id="type" 
            name="type" 
            value={filters.type} 
            onChange={handleFilterChange}
          >
            <option value="all">Wszystkie</option>
            <option value="fatigue">Zmęczenie</option>
            <option value="distraction">Rozproszenie uwagi</option>
            <option value="style">Styl jazdy</option>
            <option value="collision">Ryzyko kolizji</option>
          </FilterSelect>
        </FilterGroup>
        
        <FilterGroup>
          <FilterLabel htmlFor="time">Czas</FilterLabel>
          <FilterSelect 
            id="time" 
            name="time" 
            value={filters.time} 
            onChange={handleFilterChange}
          >
            <option value="all">Wszystkie</option>
            <option value="morning">Rano</option>
            <option value="afternoon">Popołudnie</option>
            <option value="evening">Wieczór</option>
          </FilterSelect>
        </FilterGroup>
        
        <FilterGroup>
          <FilterLabel htmlFor="search">Wyszukaj</FilterLabel>
          <FilterInput 
            type="text" 
            id="search" 
            name="search" 
            value={filters.search} 
            onChange={handleFilterChange}
            placeholder="Kierowca, lokalizacja..."
          />
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
    
    const getTypeBadge = (type) => {
      const colors = {
        fatigue: '#f44336',
        distraction: '#ff9800',
        style: '#2196f3',
        collision: '#9c27b0'
      };
      
      return (
        <Badge color={colors[type] || '#2196f3'}>
          {type === 'fatigue' ? 'Zmęczenie' : 
           type === 'distraction' ? 'Rozproszenie' : 
           type === 'style' ? 'Styl jazdy' : 
           type === 'collision' ? 'Ryzyko kolizji' : type}
        </Badge>
      );
    };
    
    const getStatusBadge = (status) => {
      const colors = {
        new: '#2196f3',
        inProgress: '#ff9800',
        closed: '#9e9e9e'
      };
      
      return (
        <Badge color={colors[status] || '#2196f3'}>
          {status === 'new' ? 'Nowy' : 
           status === 'inProgress' ? 'W trakcie' : 
           status === 'closed' ? 'Zamknięty' : status}
        </Badge>
      );
    };
    
    // Convert to format expected by our Table component
    const tableHeaders = ['Typ', 'Kierowca', 'Opis', 'Czas', 'Lokalizacja', 'Status'];
    const tableData = alerts.alerts.map(alert => [
      getTypeBadge(alert.type),
      alert.driver,
      alert.description,
      alert.time,
      alert.location,
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
          <DetailLabel>Kierowca:</DetailLabel>
          <DetailValue>{selectedAlert.driver}</DetailValue>
        </DetailRow>
        
        <DetailRow>
          <DetailLabel>Typ:</DetailLabel>
          <DetailValue>{selectedAlert.type}</DetailValue>
        </DetailRow>
        
        <DetailRow>
          <DetailLabel>Opis:</DetailLabel>
          <DetailValue>{selectedAlert.description}</DetailValue>
        </DetailRow>
        
        <DetailRow>
          <DetailLabel>Czas:</DetailLabel>
          <DetailValue>{selectedAlert.time}</DetailValue>
        </DetailRow>
        
        <DetailRow>
          <DetailLabel>Lokalizacja:</DetailLabel>
          <DetailValue>{selectedAlert.location}</DetailValue>
        </DetailRow>
        
        <DetailRow>
          <DetailLabel>Status:</DetailLabel>
          <DetailValue>{selectedAlert.status}</DetailValue>
        </DetailRow>
        
        {selectedAlert.details && (
          <>
            <DetailTitle>Dodatkowe informacje</DetailTitle>
            
            <DetailRow>
              <DetailLabel>Typ incydentu:</DetailLabel>
              <DetailValue>{selectedAlert.details.incidentType}</DetailValue>
            </DetailRow>
            
            <DetailRow>
              <DetailLabel>Poziom zagrożenia:</DetailLabel>
              <DetailValue>{selectedAlert.details.severity}</DetailValue>
            </DetailRow>
            
            <DetailRow>
              <DetailLabel>Stan kierowcy:</DetailLabel>
              <DetailValue>{selectedAlert.details.driverState}</DetailValue>
            </DetailRow>
            
            <DetailRow>
              <DetailLabel>Prędkość pojazdu:</DetailLabel>
              <DetailValue>{selectedAlert.details.vehicleSpeed} km/h</DetailValue>
            </DetailRow>
            
            {selectedAlert.details.videoUrl && (
              <VideoContainer>
                Nagranie wideo incydentu
              </VideoContainer>
            )}
          </>
        )}
      </DetailContainer>
    );
  };
  
  // Renderowanie rankingu kierowców
  const renderDriverRanking = () => {
    if (!driverRanking) return null;
    
    const getTrendIcon = (trend) => {
      return trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→';
    };
    
    const getTrendColor = (trend) => {
      return trend === 'up' ? '#4caf50' : trend === 'down' ? '#f44336' : '#757575';
    };
    
    // Convert to format expected by our Table component
    const tableHeaders = ['Kierowca', 'Wynik', 'Trend', 'Zmęczenie', 'Rozproszenie', 'Styl jazdy', 'Ryzyko kolizji'];
    const tableData = driverRanking.rankings.map(driver => [
      driver.driver,
      driver.score,
      <span style={{ color: getTrendColor(driver.trend) }}>{getTrendIcon(driver.trend)}</span>,
      driver.details.fatigueScore,
      driver.details.distractionScore,
      driver.details.drivingStyleScore,
      driver.details.collisionRiskScore
    ]);
    
    return (
      <Table 
        headers={tableHeaders}
        data={tableData}
        onRowClick={(index) => handleDriverClick(driverRanking.rankings[index])}
      />
    );
  };
  
  // Renderowanie analizy stylu jazdy
  const renderDrivingStyle = () => {
    if (!drivingStyle) return null;
    
    // Renderowanie wykresu radarowego
    const renderRadarChart = () => {
      const categories = drivingStyle.drivingStyle.map(item => item.category);
      const values = drivingStyle.drivingStyle.map(item => item.value);
      
      // Obliczanie współrzędnych punktów na wykresie
      const points = drivingStyle.drivingStyle.map((item, index) => {
        const angle = (index / categories.length) * 2 * Math.PI;
        const x = Math.sin(angle) * 45; // 45% od środka
        const y = -Math.cos(angle) * 45; // 45% od środka, ujemne dla odwrócenia osi Y
        
        return {
          category: item.category,
          value: item.value,
          x,
          y,
          labelX: Math.sin(angle) * 55, // 55% od środka dla etykiety
          labelY: -Math.cos(angle) * 55 // 55% od środka dla etykiety
        };
      });
      
      // Tworzenie punktów dla wielokąta
      const polygonPoints = points.map(point => {
        const factor = point.value / 100;
        return `${50 + point.x * factor},${50 + point.y * factor}`;
      }).join(' ');
      
      return (
        <RadarChartContainer>
          <RadarChartBackground />
          
          {/* Okręgi */}
          <RadarChartCircle size={20} />
          <RadarChartCircle size={40} />
          <RadarChartCircle size={60} />
          <RadarChartCircle size={80} />
          
          {/* Osie */}
          {points.map((point, index) => (
            <RadarChartAxis 
              key={`axis-${index}`} 
              angle={(index / categories.length) * 360} 
            />
          ))}
          
          {/* Wielokąt */}
          <RadarChartPolygon>
            <svg viewBox="0 0 100 100">
              <polygon points={polygonPoints} />
            </svg>
          </RadarChartPolygon>
          
          {/* Punkty */}
          {points.map((point, index) => (
            <RadarChartPoint 
              key={`point-${index}`} 
              x={point.x} 
              y={point.y} 
              value={point.value} 
            />
          ))}
          
          {/* Etykiety */}
          {points.map((point, index) => (
            <RadarChartLabel 
              key={`label-${index}`} 
              x={50 + point.labelX} 
              y={50 + point.labelY}
            >
              {point.category}
            </RadarChartLabel>
          ))}
        </RadarChartContainer>
      );
    };
    
    // Renderowanie historii wyników
    const renderScoreHistory = () => {
      return (
        <div>
          <DetailTitle>Historia wyników</DetailTitle>
          
          {drivingStyle.history.map((item, index) => (
            <DetailRow key={`history-${index}`}>
              <DetailLabel>{item.date}</DetailLabel>
              <DetailValue>
                {item.score}
                <ProgressBar>
                  <ProgressBarFill 
                    width={item.score} 
                    color={
                      item.score >= 80 ? '#4caf50' : 
                      item.score >= 60 ? '#ff9800' : 
                      '#f44336'
                    } 
                  />
                </ProgressBar>
              </DetailValue>
            </DetailRow>
          ))}
        </div>
      );
    };
    
    // Renderowanie rekomendacji
    const renderRecommendations = () => {
      return (
        <div>
          <DetailTitle>Rekomendacje</DetailTitle>
          
          {drivingStyle.recommendations.map((item, index) => (
            <DetailRow key={`recommendation-${index}`}>
              <DetailLabel>{item.category}</DetailLabel>
              <DetailValue>{item.recommendation}</DetailValue>
            </DetailRow>
          ))}
        </div>
      );
    };
    
    return (
      <DetailContainer>
        <DetailTitle>Analiza stylu jazdy: {drivingStyle.driver}</DetailTitle>
        <DetailRow>
          <DetailLabel>Ogólny wynik:</DetailLabel>
          <DetailValue>
            {drivingStyle.overallScore}/100
            <ProgressBar>
              <ProgressBarFill 
                width={drivingStyle.overallScore} 
                color={
                  drivingStyle.overallScore >= 80 ? '#4caf50' : 
                  drivingStyle.overallScore >= 60 ? '#ff9800' : 
                  '#f44336'
                } 
              />
            </ProgressBar>
          </DetailValue>
        </DetailRow>
        
        {renderRadarChart()}
        {renderScoreHistory()}
        {renderRecommendations()}
      </DetailContainer>
    );
  };
  
  // Renderowanie sesji coachingowych
  const renderCoachingSessions = () => {
    if (!coachingSessions) return null;
    
    // Convert to format expected by our Table component
    const tableHeaders = ['Kierowca', 'Typ', 'Temat', 'Data', 'Status'];
    const tableData = coachingSessions.sessions.map(session => [
      session.driver,
      session.type,
      session.topic,
      session.date,
      session.status
    ]);
    
    return (
      <Table 
        headers={tableHeaders}
        data={tableData}
      />
    );
  };
  
  if (isLoading) {
    return (
      <PageContainer>
        <LoadingIndicator>Ładowanie danych bezpieczeństwa kierowcy...</LoadingIndicator>
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
      <SectionTitle>BEZPIECZEŃSTWO KIEROWCY</SectionTitle>
      
      <TabsContainer>
        <Tab 
          active={activeTab === 'alerts'} 
          onClick={() => setActiveTab('alerts')}
        >
          Alerty bezpieczeństwa
        </Tab>
        <Tab 
          active={activeTab === 'ranking'} 
          onClick={() => setActiveTab('ranking')}
        >
          Ranking kierowców
        </Tab>
        <Tab 
          active={activeTab === 'coaching'} 
          onClick={() => setActiveTab('coaching')}
        >
          Sesje coachingowe
        </Tab>
      </TabsContainer>
      
      {activeTab === 'alerts' && (
        <>
          {renderFilters()}
          <Card title="Alerty bezpieczeństwa" fullWidth>
            {renderAlertsTable()}
          </Card>
          {selectedAlert && renderAlertDetails()}
        </>
      )}
      
      {activeTab === 'ranking' && (
        <>
          <Card title="Ranking bezpieczeństwa kierowców" fullWidth>
            {renderDriverRanking()}
          </Card>
          {drivingStyle && renderDrivingStyle()}
        </>
      )}
      
      {activeTab === 'coaching' && (
        <Card title="Sesje coachingowe" fullWidth>
          {renderCoachingSessions()}
        </Card>
      )}
    </PageContainer>
  );
};

export default DriverSafety;
