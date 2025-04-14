import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Card from '../components/common/Card';
import Table from '../components/common/Table';
import driverSafetyService from '../services/api/driverSafetyService';
import mockDriverSafetyService from '../services/api/mockDriverSafetyService';

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

const DataToggleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 8px 16px;
  background-color: #f5f5f5;
  border-radius: 8px;
`;

const ToggleLabel = styled.span`
  margin-right: 12px;
  font-size: 14px;
  color: #666;
`;

const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 50px;
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
      height: 16px;
      width: 16px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      transition: .4s;
      border-radius: 50%;
    }
  }
  
  input:checked + span {
    background-color: #3f51b5;
  }
  
  input:checked + span:before {
    transform: translateX(26px);
  }
`;

const KPIContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 20px;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const KPICard = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const KPITitle = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
`;

const KPIValue = styled.div`
  font-size: 24px;
  font-weight: 500;
  color: #333;
`;

const KPITrend = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
  font-size: 12px;
  color: ${props => props.up ? '#4caf50' : props.down ? '#f44336' : '#666'};
`;

const VideoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-top: 16px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const VideoCard = styled.div`
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const VideoThumbnail = styled.div`
  height: 150px;
  background-color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  position: relative;
`;

const VideoInfo = styled.div`
  padding: 12px;
`;

const VideoTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
`;

const VideoMeta = styled.div`
  font-size: 12px;
  color: #666;
  display: flex;
  justify-content: space-between;
`;

const SeverityBadge = styled.span`
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 4px 8px;
  background-color: ${props => 
    props.severity === 'high' ? '#f44336' : 
    props.severity === 'medium' ? '#ff9800' : '#4caf50'};
  color: white;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
`;

const ChartContainer = styled.div`
  height: 300px;
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

/**
 * DriverSafety component for monitoring driver safety
 * @returns {JSX.Element} DriverSafety component
 */
const DriverSafety = () => {
  // Toggle for mock data vs API data
  const [useMockData, setUseMockData] = useState(true);
  
  // Get the appropriate service based on toggle
  const service = useMockData ? mockDriverSafetyService : driverSafetyService;
  
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
  
  // Stan dla telematyki wideo
  const [videoTelematics, setVideoTelematics] = useState(null);
  
  // Stan dla filtrów
  const [filters, setFilters] = useState({
    type: 'all',
    time: 'all',
    search: '',
    page: 1,
    limit: 10
  });
  
  // Stan dla aktywnej zakładki
  const [activeTab, setActiveTab] = useState('overview');
  
  // Stany ładowania i błędów
  const [isLoading, setIsLoading] = useState(true);
  const [isDetailLoading, setIsDetailLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Pobieranie danych przy montowaniu komponentu i zmianie źródła danych
  useEffect(() => {
    const fetchSafetyData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Pobieranie alertów bezpieczeństwa
        const alertsResponse = await service.getAlerts(
          filters.type !== 'all' ? filters.type : undefined,
          filters.time !== 'all' ? filters.time : undefined,
          filters.search || undefined,
          filters.page,
          filters.limit
        );
        setAlerts(alertsResponse);
        
        // Pobieranie rankingu kierowców
        const rankingResponse = await service.getDriverRanking();
        setDriverRanking(rankingResponse);
        
        // Pobieranie sesji coachingowych
        const coachingResponse = await service.getCoachingSessions();
        setCoachingSessions(coachingResponse);
        
        // Pobieranie analizy stylu jazdy dla pierwszego kierowcy z rankingu
        if (rankingResponse && rankingResponse.rankings.length > 0) {
          const drivingStyleResponse = await service.getDriverStyle(
            rankingResponse.rankings[0].driver
          );
          setDrivingStyle(drivingStyleResponse);
          
          // Pobieranie danych telematyki wideo
          if (service.getVideoTelematics) {
            const videoResponse = await service.getVideoTelematics(
              rankingResponse.rankings[0].driver
            );
            setVideoTelematics(videoResponse);
          }
        }
      } catch (err) {
        console.error('Error fetching safety data:', err);
        setError('Nie udało się pobrać danych bezpieczeństwa kierowcy. Spróbuj odświeżyć stronę.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSafetyData();
  }, [service, filters.type, filters.time, filters.page, filters.limit, useMockData]);
  
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
      const alertDetails = await service.getAlertDetails(alert.id);
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
      const drivingStyleResponse = await service.getDriverStyle(driver.driver);
      setDrivingStyle(drivingStyleResponse);
      
      // Pobieranie danych telematyki wideo
      if (service.getVideoTelematics) {
        const videoResponse = await service.getVideoTelematics(driver.driver);
        setVideoTelematics(videoResponse);
      }
    } catch (err) {
      console.error('Error fetching driving style:', err);
      setError('Nie udało się pobrać analizy stylu jazdy.');
    } finally {
      setIsDetailLoading(false);
    }
  };
  
  // Renderowanie przełącznika danych
  const renderDataToggle = () => {
    return (
      <DataToggleContainer>
        <ToggleLabel>Użyj danych testowych:</ToggleLabel>
        <ToggleSwitch>
          <input 
            type="checkbox" 
            checked={useMockData} 
            onChange={() => setUseMockData(!useMockData)} 
          />
          <span />
        </ToggleSwitch>
        <ToggleLabel style={{ marginLeft: '12px' }}>
          {useMockData ? 'Włączone' : 'Wyłączone'}
        </ToggleLabel>
      </DataToggleContainer>
    );
  };
  
  // Renderowanie zakładek
  const renderTabs = () => {
    return (
      <TabsContainer>
        <Tab 
          active={activeTab === 'overview'} 
          onClick={() => setActiveTab('overview')}
        >
          Przegląd
        </Tab>
        <Tab 
          active={activeTab === 'fatigue'} 
          onClick={() => setActiveTab('fatigue')}
        >
          Zmęczenie kierowcy
        </Tab>
        <Tab 
          active={activeTab === 'distraction'} 
          onClick={() => setActiveTab('distraction')}
        >
          Rozproszenie uwagi
        </Tab>
        <Tab 
          active={activeTab === 'style'} 
          onClick={() => setActiveTab('style')}
        >
          Styl jazdy
        </Tab>
        <Tab 
          active={activeTab === 'collision'} 
          onClick={() => setActiveTab('collision')}
        >
          Zapobieganie kolizjom
        </Tab>
        <Tab 
          active={activeTab === 'coaching'} 
          onClick={() => setActiveTab('coaching')}
        >
          Coaching
        </Tab>
        <Tab 
          active={activeTab === 'video'} 
          onClick={() => setActiveTab('video')}
        >
          Telematyka wideo
        </Tab>
        <Tab 
          active={activeTab === 'ranking'} 
          onClick={() => setActiveTab('ranking')}
        >
          Rankingi
        </Tab>
      </TabsContainer>
    );
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
          <DetailLabel>Typ incydentu:</DetailLabel>
          <DetailValue>{selectedAlert.details?.incidentType || 'Brak danych'}</DetailValue>
        </DetailRow>
        
        <DetailRow>
          <DetailLabel>Poziom zagrożenia:</DetailLabel>
          <DetailValue>{selectedAlert.details?.severity || 'Brak danych'}</DetailValue>
        </DetailRow>
        
        <DetailRow>
          <DetailLabel>Stan kierowcy:</DetailLabel>
          <DetailValue>{selectedAlert.details?.driverState || 'Brak danych'}</DetailValue>
        </DetailRow>
        
        <DetailRow>
          <DetailLabel>Prędkość pojazdu:</DetailLabel>
          <DetailValue>{selectedAlert.details?.vehicleSpeed ? `${selectedAlert.details.vehicleSpeed} km/h` : 'Brak danych'}</DetailValue>
        </DetailRow>
        
        <DetailRow>
          <DetailLabel>Lokalizacja:</DetailLabel>
          <DetailValue>
            {selectedAlert.location}
            {selectedAlert.details?.locationCoordinates && (
              <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                Lat: {selectedAlert.details.locationCoordinates.latitude.toFixed(6)}, 
                Lng: {selectedAlert.details.locationCoordinates.longitude.toFixed(6)}
              </div>
            )}
          </DetailValue>
        </DetailRow>
        
        {selectedAlert.details?.eventTimeline && (
          <>
            <DetailTitle style={{ marginTop: '16px' }}>Oś czasu zdarzenia</DetailTitle>
            {selectedAlert.details.eventTimeline.map((event, index) => (
              <DetailRow key={index}>
                <DetailLabel>{event.time}</DetailLabel>
                <DetailValue>{event.event}</DetailValue>
              </DetailRow>
            ))}
          </>
        )}
        
        {selectedAlert.details?.recommendations && (
          <>
            <DetailTitle style={{ marginTop: '16px' }}>Zalecenia</DetailTitle>
            {selectedAlert.details.recommendations.map((recommendation, index) => (
              <DetailRow key={index}>
                <DetailValue>• {recommendation}</DetailValue>
              </DetailRow>
            ))}
          </>
        )}
        
        {selectedAlert.details?.videoUrl && (
          <>
            <DetailTitle style={{ marginTop: '16px' }}>Nagranie wideo</DetailTitle>
            <VideoContainer>
              Nagranie wideo incydentu
            </VideoContainer>
          </>
        )}
      </DetailContainer>
    );
  };
  
  // Renderowanie tabeli rankingu kierowców
  const renderDriverRankingTable = () => {
    if (!driverRanking) return null;
    
    const getTrendIcon = (trend) => {
      if (trend === 'up') return '↑';
      if (trend === 'down') return '↓';
      return '→';
    };
    
    const getTrendColor = (trend) => {
      if (trend === 'up') return '#4caf50';
      if (trend === 'down') return '#f44336';
      return '#666';
    };
    
    // Convert to format expected by our Table component
    const tableHeaders = ['Kierowca', 'Wynik', 'Trend', 'Zmęczenie', 'Rozproszenie', 'Styl jazdy', 'Ryzyko kolizji'];
    const tableData = driverRanking.rankings.map(ranking => [
      ranking.driver,
      ranking.score,
      <span style={{ color: getTrendColor(ranking.trend) }}>{getTrendIcon(ranking.trend)}</span>,
      ranking.details.fatigueScore,
      ranking.details.distractionScore,
      ranking.details.drivingStyleScore,
      ranking.details.collisionRiskScore
    ]);
    
    return (
      <Table 
        headers={tableHeaders}
        data={tableData}
        onRowClick={(index) => handleDriverClick(driverRanking.rankings[index])}
      />
    );
  };
  
  // Renderowanie wykresu radarowego stylu jazdy
  const renderDrivingStyleRadarChart = () => {
    if (!drivingStyle) return null;
    
    const points = drivingStyle.drivingStyle.map(category => {
      const radians = (category.angle * Math.PI) / 180;
      const x = Math.cos(radians) * 40 * (category.value / 100);
      const y = Math.sin(radians) * 40 * (category.value / 100);
      
      return { x, y, value: category.value };
    });
    
    const polygonPoints = points.map(point => 
      `${50 + point.x},${50 + point.y}`
    ).join(' ');
    
    return (
      <RadarChartContainer>
        <RadarChartBackground />
        
        {/* Osie */}
        {drivingStyle.drivingStyle.map((category, index) => (
          <RadarChartAxis key={index} angle={category.angle} />
        ))}
        
        {/* Kółka */}
        {[25, 50, 75, 100].map(size => (
          <RadarChartCircle key={size} size={size} />
        ))}
        
        {/* Wielokąt */}
        <RadarChartPolygon>
          <svg>
            <polygon points={polygonPoints} />
          </svg>
        </RadarChartPolygon>
        
        {/* Punkty */}
        {points.map((point, index) => (
          <RadarChartPoint 
            key={index} 
            x={point.x} 
            y={point.y} 
            value={point.value} 
          />
        ))}
        
        {/* Etykiety */}
        {drivingStyle.drivingStyle.map((category, index) => (
          <RadarChartLabel 
            key={index} 
            x={category.labelPosition.x} 
            y={category.labelPosition.y}
          >
            {category.category}
          </RadarChartLabel>
        ))}
      </RadarChartContainer>
    );
  };
  
  // Renderowanie rekomendacji stylu jazdy
  const renderDrivingStyleRecommendations = () => {
    if (!drivingStyle || !drivingStyle.recommendations) return null;
    
    return (
      <DetailContainer>
        <DetailTitle>Rekomendacje</DetailTitle>
        
        {drivingStyle.recommendations.map((recommendation, index) => (
          <DetailRow key={index}>
            <DetailLabel>{recommendation.category}:</DetailLabel>
            <DetailValue>{recommendation.recommendation}</DetailValue>
          </DetailRow>
        ))}
      </DetailContainer>
    );
  };
  
  // Renderowanie tabeli sesji coachingowych
  const renderCoachingSessions = () => {
    if (!coachingSessions) return null;
    
    const getStatusBadge = (status) => {
      const colors = {
        scheduled: '#2196f3',
        completed: '#4caf50',
        cancelled: '#f44336'
      };
      
      return (
        <Badge color={colors[status] || '#2196f3'}>
          {status === 'scheduled' ? 'Zaplanowana' : 
           status === 'completed' ? 'Zakończona' : 
           status === 'cancelled' ? 'Anulowana' : status}
        </Badge>
      );
    };
    
    // Convert to format expected by our Table component
    const tableHeaders = ['Kierowca', 'Typ', 'Temat', 'Data', 'Status'];
    const tableData = coachingSessions.sessions.map(session => [
      session.driver,
      session.type,
      session.topic,
      session.date,
      getStatusBadge(session.status)
    ]);
    
    return (
      <Table 
        headers={tableHeaders}
        data={tableData}
      />
    );
  };
  
  // Renderowanie sekcji telematyki wideo
  const renderVideoTelematics = () => {
    if (!videoTelematics) return null;
    
    return (
      <>
        <SectionTitle>Telematyka wideo - {videoTelematics.driver}</SectionTitle>
        
        <VideoGrid>
          {videoTelematics.videos.map((video, index) => (
            <VideoCard key={index}>
              <VideoThumbnail>
                Podgląd nagrania
                <SeverityBadge severity={video.severity}>
                  {video.severity === 'high' ? 'Wysoki' : 
                   video.severity === 'medium' ? 'Średni' : 'Niski'}
                </SeverityBadge>
              </VideoThumbnail>
              <VideoInfo>
                <VideoTitle>{video.description}</VideoTitle>
                <VideoMeta>
                  <span>{video.timestamp}</span>
                  <span>{video.duration}s</span>
                </VideoMeta>
                <VideoMeta>
                  <span>{video.location}</span>
                </VideoMeta>
              </VideoInfo>
            </VideoCard>
          ))}
        </VideoGrid>
        
        <DetailContainer style={{ marginTop: '20px' }}>
          <DetailTitle>Statystyki nagrań</DetailTitle>
          
          <DetailRow>
            <DetailLabel>Całkowita liczba nagrań:</DetailLabel>
            <DetailValue>{videoTelematics.statistics.totalVideos}</DetailValue>
          </DetailRow>
          
          <DetailTitle style={{ marginTop: '16px' }}>Według typu</DetailTitle>
          
          <DetailRow>
            <DetailLabel>Zmęczenie:</DetailLabel>
            <DetailValue>
              {videoTelematics.statistics.byType.fatigue}
              <ProgressBar>
                <ProgressBarFill 
                  width={(videoTelematics.statistics.byType.fatigue / videoTelematics.statistics.totalVideos) * 100} 
                  color="#f44336" 
                />
              </ProgressBar>
            </DetailValue>
          </DetailRow>
          
          <DetailRow>
            <DetailLabel>Rozproszenie uwagi:</DetailLabel>
            <DetailValue>
              {videoTelematics.statistics.byType.distraction}
              <ProgressBar>
                <ProgressBarFill 
                  width={(videoTelematics.statistics.byType.distraction / videoTelematics.statistics.totalVideos) * 100} 
                  color="#ff9800" 
                />
              </ProgressBar>
            </DetailValue>
          </DetailRow>
          
          <DetailRow>
            <DetailLabel>Styl jazdy:</DetailLabel>
            <DetailValue>
              {videoTelematics.statistics.byType.style}
              <ProgressBar>
                <ProgressBarFill 
                  width={(videoTelematics.statistics.byType.style / videoTelematics.statistics.totalVideos) * 100} 
                  color="#2196f3" 
                />
              </ProgressBar>
            </DetailValue>
          </DetailRow>
          
          <DetailRow>
            <DetailLabel>Ryzyko kolizji:</DetailLabel>
            <DetailValue>
              {videoTelematics.statistics.byType.collision}
              <ProgressBar>
                <ProgressBarFill 
                  width={(videoTelematics.statistics.byType.collision / videoTelematics.statistics.totalVideos) * 100} 
                  color="#9c27b0" 
                />
              </ProgressBar>
            </DetailValue>
          </DetailRow>
        </DetailContainer>
      </>
    );
  };
  
  // Renderowanie sekcji zmęczenia kierowcy
  const renderDriverFatigue = () => {
    if (!drivingStyle || !drivingStyle.fatigueData) return null;
    
    return (
      <>
        <SectionTitle>Monitorowanie zmęczenia kierowcy - {drivingStyle.driver}</SectionTitle>
        
        <KPIContainer>
          <KPICard>
            <KPITitle>Liczba incydentów</KPITitle>
            <KPIValue>{drivingStyle.fatigueData.incidents}</KPIValue>
          </KPICard>
          
          <KPICard>
            <KPITitle>Średni czas trwania</KPITitle>
            <KPIValue>{drivingStyle.fatigueData.averageDuration}s</KPIValue>
          </KPICard>
          
          <KPICard>
            <KPITitle>Najczęstszy objaw</KPITitle>
            <KPIValue>
              {drivingStyle.fatigueData.symptoms.sort((a, b) => b.count - a.count)[0].name}
            </KPIValue>
          </KPICard>
          
          <KPICard>
            <KPITitle>Ocena ryzyka</KPITitle>
            <KPIValue>
              {drivingStyle.fatigueData.incidents > 3 ? 'Wysokie' : 
               drivingStyle.fatigueData.incidents > 1 ? 'Średnie' : 'Niskie'}
            </KPIValue>
          </KPICard>
        </KPIContainer>
        
        <GridSection>
          <Card title="Objawy zmęczenia">
            <DetailContainer>
              {drivingStyle.fatigueData.symptoms.map((symptom, index) => (
                <DetailRow key={index}>
                  <DetailLabel>{symptom.name}:</DetailLabel>
                  <DetailValue>
                    {symptom.count}
                    <ProgressBar>
                      <ProgressBarFill 
                        width={(symptom.count / Math.max(...drivingStyle.fatigueData.symptoms.map(s => s.count))) * 100} 
                        color="#f44336" 
                      />
                    </ProgressBar>
                  </DetailValue>
                </DetailRow>
              ))}
            </DetailContainer>
          </Card>
          
          <Card title="Pora dnia">
            <DetailContainer>
              <DetailRow>
                <DetailLabel>Rano (6-12):</DetailLabel>
                <DetailValue>
                  {drivingStyle.fatigueData.timeOfDay.morning}%
                  <ProgressBar>
                    <ProgressBarFill 
                      width={drivingStyle.fatigueData.timeOfDay.morning} 
                      color="#2196f3" 
                    />
                  </ProgressBar>
                </DetailValue>
              </DetailRow>
              
              <DetailRow>
                <DetailLabel>Popołudnie (12-18):</DetailLabel>
                <DetailValue>
                  {drivingStyle.fatigueData.timeOfDay.afternoon}%
                  <ProgressBar>
                    <ProgressBarFill 
                      width={drivingStyle.fatigueData.timeOfDay.afternoon} 
                      color="#ff9800" 
                    />
                  </ProgressBar>
                </DetailValue>
              </DetailRow>
              
              <DetailRow>
                <DetailLabel>Wieczór (18-24):</DetailLabel>
                <DetailValue>
                  {drivingStyle.fatigueData.timeOfDay.evening}%
                  <ProgressBar>
                    <ProgressBarFill 
                      width={drivingStyle.fatigueData.timeOfDay.evening} 
                      color="#9c27b0" 
                    />
                  </ProgressBar>
                </DetailValue>
              </DetailRow>
              
              <DetailRow>
                <DetailLabel>Noc (0-6):</DetailLabel>
                <DetailValue>
                  {drivingStyle.fatigueData.timeOfDay.night}%
                  <ProgressBar>
                    <ProgressBarFill 
                      width={drivingStyle.fatigueData.timeOfDay.night} 
                      color="#333" 
                    />
                  </ProgressBar>
                </DetailValue>
              </DetailRow>
            </DetailContainer>
          </Card>
        </GridSection>
        
        <Card title="Zalecenia">
          <DetailContainer>
            <DetailRow>
              <DetailValue>• Zaplanuj regularne przerwy co 2 godziny jazdy</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailValue>• Unikaj jazdy w godzinach nocnych (0-6)</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailValue>• Zadbaj o odpowiednią ilość snu przed długą trasą</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailValue>• Unikaj ciężkich posiłków przed jazdą</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailValue>• Utrzymuj odpowiednią temperaturę w kabinie</DetailValue>
            </DetailRow>
          </DetailContainer>
        </Card>
      </>
    );
  };
  
  // Renderowanie sekcji rozproszenia uwagi
  const renderDriverDistraction = () => {
    if (!drivingStyle || !drivingStyle.distractionData) return null;
    
    return (
      <>
        <SectionTitle>Wykrywanie rozproszenia uwagi - {drivingStyle.driver}</SectionTitle>
        
        <KPIContainer>
          <KPICard>
            <KPITitle>Liczba incydentów</KPITitle>
            <KPIValue>{drivingStyle.distractionData.incidents}</KPIValue>
          </KPICard>
          
          <KPICard>
            <KPITitle>Średni czas trwania</KPITitle>
            <KPIValue>{drivingStyle.distractionData.duration}s</KPIValue>
          </KPICard>
          
          <KPICard>
            <KPITitle>Główne źródło</KPITitle>
            <KPIValue>
              {Object.entries(drivingStyle.distractionData.types)
                .sort((a, b) => b[1] - a[1])[0][0] === 'phone' ? 'Telefon' : 
                Object.entries(drivingStyle.distractionData.types)
                  .sort((a, b) => b[1] - a[1])[0][0] === 'eating' ? 'Jedzenie' : 
                Object.entries(drivingStyle.distractionData.types)
                  .sort((a, b) => b[1] - a[1])[0][0] === 'radio' ? 'Radio' : 'Inne'}
            </KPIValue>
          </KPICard>
          
          <KPICard>
            <KPITitle>Ocena ryzyka</KPITitle>
            <KPIValue>
              {drivingStyle.distractionData.incidents > 5 ? 'Wysokie' : 
               drivingStyle.distractionData.incidents > 2 ? 'Średnie' : 'Niskie'}
            </KPIValue>
          </KPICard>
        </KPIContainer>
        
        <GridSection>
          <Card title="Typy rozproszenia uwagi">
            <DetailContainer>
              <DetailRow>
                <DetailLabel>Telefon:</DetailLabel>
                <DetailValue>
                  {drivingStyle.distractionData.types.phone}
                  <ProgressBar>
                    <ProgressBarFill 
                      width={(drivingStyle.distractionData.types.phone / 
                        (drivingStyle.distractionData.types.phone + 
                         drivingStyle.distractionData.types.eating + 
                         drivingStyle.distractionData.types.radio + 
                         drivingStyle.distractionData.types.other)) * 100} 
                      color="#f44336" 
                    />
                  </ProgressBar>
                </DetailValue>
              </DetailRow>
              
              <DetailRow>
                <DetailLabel>Jedzenie:</DetailLabel>
                <DetailValue>
                  {drivingStyle.distractionData.types.eating}
                  <ProgressBar>
                    <ProgressBarFill 
                      width={(drivingStyle.distractionData.types.eating / 
                        (drivingStyle.distractionData.types.phone + 
                         drivingStyle.distractionData.types.eating + 
                         drivingStyle.distractionData.types.radio + 
                         drivingStyle.distractionData.types.other)) * 100} 
                      color="#ff9800" 
                    />
                  </ProgressBar>
                </DetailValue>
              </DetailRow>
              
              <DetailRow>
                <DetailLabel>Radio:</DetailLabel>
                <DetailValue>
                  {drivingStyle.distractionData.types.radio}
                  <ProgressBar>
                    <ProgressBarFill 
                      width={(drivingStyle.distractionData.types.radio / 
                        (drivingStyle.distractionData.types.phone + 
                         drivingStyle.distractionData.types.eating + 
                         drivingStyle.distractionData.types.radio + 
                         drivingStyle.distractionData.types.other)) * 100} 
                      color="#2196f3" 
                    />
                  </ProgressBar>
                </DetailValue>
              </DetailRow>
              
              <DetailRow>
                <DetailLabel>Inne:</DetailLabel>
                <DetailValue>
                  {drivingStyle.distractionData.types.other}
                  <ProgressBar>
                    <ProgressBarFill 
                      width={(drivingStyle.distractionData.types.other / 
                        (drivingStyle.distractionData.types.phone + 
                         drivingStyle.distractionData.types.eating + 
                         drivingStyle.distractionData.types.radio + 
                         drivingStyle.distractionData.types.other)) * 100} 
                      color="#9c27b0" 
                    />
                  </ProgressBar>
                </DetailValue>
              </DetailRow>
            </DetailContainer>
          </Card>
          
          <Card title="Wpływ na jazdę">
            <DetailContainer>
              <DetailRow>
                <DetailLabel>Odchylenia od toru jazdy:</DetailLabel>
                <DetailValue>
                  {drivingStyle.distractionData.impact.laneDeviation} cm
                  <ProgressBar>
                    <ProgressBarFill 
                      width={(drivingStyle.distractionData.impact.laneDeviation / 10) * 100} 
                      color="#f44336" 
                    />
                  </ProgressBar>
                </DetailValue>
              </DetailRow>
              
              <DetailRow>
                <DetailLabel>Wahania prędkości:</DetailLabel>
                <DetailValue>
                  {drivingStyle.distractionData.impact.speedVariation} km/h
                  <ProgressBar>
                    <ProgressBarFill 
                      width={(drivingStyle.distractionData.impact.speedVariation / 20) * 100} 
                      color="#ff9800" 
                    />
                  </ProgressBar>
                </DetailValue>
              </DetailRow>
              
              <DetailRow>
                <DetailLabel>Czas reakcji:</DetailLabel>
                <DetailValue>
                  {drivingStyle.distractionData.impact.reactionTime} ms
                  <ProgressBar>
                    <ProgressBarFill 
                      width={(drivingStyle.distractionData.impact.reactionTime / 100) * 100} 
                      color="#2196f3" 
                    />
                  </ProgressBar>
                </DetailValue>
              </DetailRow>
            </DetailContainer>
          </Card>
        </GridSection>
        
        <Card title="Zalecenia">
          <DetailContainer>
            <DetailRow>
              <DetailValue>• Wyłącz telefon lub używaj trybu "Nie przeszkadzać" podczas jazdy</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailValue>• Przygotuj posiłki przed jazdą lub zatrzymuj się na posiłki</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailValue>• Ustaw radio/muzykę przed rozpoczęciem jazdy</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailValue>• Używaj systemów głośnomówiących do niezbędnej komunikacji</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailValue>• Regularnie rób przerwy, aby zmniejszyć potrzebę rozpraszania się</DetailValue>
            </DetailRow>
          </DetailContainer>
        </Card>
      </>
    );
  };
  
  // Renderowanie sekcji analizy stylu jazdy
  const renderDrivingStyle = () => {
    if (!drivingStyle) return null;
    
    return (
      <>
        <SectionTitle>Analiza stylu jazdy - {drivingStyle.driver}</SectionTitle>
        
        <KPIContainer>
          <KPICard>
            <KPITitle>Ogólna ocena</KPITitle>
            <KPIValue>{drivingStyle.overallScore}/100</KPIValue>
          </KPICard>
          
          <KPICard>
            <KPITitle>Przyspieszanie</KPITitle>
            <KPIValue>
              {drivingStyle.drivingStyle.find(item => item.category === 'Przyspieszanie')?.value || 0}/100
            </KPIValue>
          </KPICard>
          
          <KPICard>
            <KPITitle>Hamowanie</KPITitle>
            <KPIValue>
              {drivingStyle.drivingStyle.find(item => item.category === 'Hamowanie')?.value || 0}/100
            </KPIValue>
          </KPICard>
          
          <KPICard>
            <KPITitle>Skręcanie</KPITitle>
            <KPIValue>
              {drivingStyle.drivingStyle.find(item => item.category === 'Skręcanie')?.value || 0}/100
            </KPIValue>
          </KPICard>
        </KPIContainer>
        
        <GridSection>
          <Card title="Wykres stylu jazdy">
            {renderDrivingStyleRadarChart()}
          </Card>
          
          <Card title="Historia ocen">
            <ChartContainer>
              Wykres historii ocen stylu jazdy
            </ChartContainer>
          </Card>
        </GridSection>
        
        {renderDrivingStyleRecommendations()}
      </>
    );
  };
  
  // Renderowanie sekcji zapobiegania kolizjom
  const renderCollisionPrevention = () => {
    if (!drivingStyle || !drivingStyle.collisionRiskData) return null;
    
    return (
      <>
        <SectionTitle>Alerty zapobiegania kolizjom - {drivingStyle.driver}</SectionTitle>
        
        <KPIContainer>
          <KPICard>
            <KPITitle>Liczba incydentów</KPITitle>
            <KPIValue>{drivingStyle.collisionRiskData.incidents}</KPIValue>
          </KPICard>
          
          <KPICard>
            <KPITitle>Kolizje czołowe</KPITitle>
            <KPIValue>{drivingStyle.collisionRiskData.types.frontCollision}</KPIValue>
          </KPICard>
          
          <KPICard>
            <KPITitle>Zmiana pasa</KPITitle>
            <KPIValue>{drivingStyle.collisionRiskData.types.laneChange}</KPIValue>
          </KPICard>
          
          <KPICard>
            <KPITitle>Skrzyżowania</KPITitle>
            <KPIValue>{drivingStyle.collisionRiskData.types.intersection}</KPIValue>
          </KPICard>
        </KPIContainer>
        
        <GridSection>
          <Card title="Czynniki ryzyka">
            <DetailContainer>
              {drivingStyle.collisionRiskData.riskFactors.map((factor, index) => (
                <DetailRow key={index}>
                  <DetailLabel>{factor.factor}:</DetailLabel>
                  <DetailValue>
                    {factor.value}/100
                    <ProgressBar>
                      <ProgressBarFill 
                        width={factor.value} 
                        color={factor.value > 80 ? '#4caf50' : factor.value > 50 ? '#ff9800' : '#f44336'} 
                      />
                    </ProgressBar>
                  </DetailValue>
                </DetailRow>
              ))}
            </DetailContainer>
          </Card>
          
          <Card title="Średnia odległość od poprzedzającego pojazdu">
            <DetailContainer>
              <DetailRow>
                <DetailLabel>Średnia odległość:</DetailLabel>
                <DetailValue>
                  {drivingStyle.collisionRiskData.averageDistance} m
                  <ProgressBar>
                    <ProgressBarFill 
                      width={(drivingStyle.collisionRiskData.averageDistance / 20) * 100} 
                      color={drivingStyle.collisionRiskData.averageDistance > 10 ? '#4caf50' : 
                             drivingStyle.collisionRiskData.averageDistance > 5 ? '#ff9800' : '#f44336'} 
                    />
                  </ProgressBar>
                </DetailValue>
              </DetailRow>
              
              <DetailRow>
                <DetailLabel>Zalecana odległość:</DetailLabel>
                <DetailValue>
                  Minimum 10 metrów przy prędkości miejskiej
                </DetailValue>
              </DetailRow>
            </DetailContainer>
          </Card>
        </GridSection>
        
        <Card title="Zalecenia">
          <DetailContainer>
            <DetailRow>
              <DetailValue>• Zachowuj bezpieczną odległość od poprzedzającego pojazdu (zasada 2 sekund)</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailValue>• Zmniejszaj prędkość w trudnych warunkach atmosferycznych</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailValue>• Używaj kierunkowskazów z odpowiednim wyprzedzeniem</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailValue>• Zachowaj szczególną ostrożność na skrzyżowaniach</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailValue>• Unikaj gwałtownych manewrów</DetailValue>
            </DetailRow>
          </DetailContainer>
        </Card>
      </>
    );
  };
  
  // Renderowanie głównej zawartości
  const renderContent = () => {
    if (isLoading) {
      return (
        <LoadingIndicator>
          Ładowanie danych...
        </LoadingIndicator>
      );
    }
    
    if (error) {
      return (
        <ErrorMessage>
          {error}
        </ErrorMessage>
      );
    }
    
    if (activeTab === 'overview') {
      return (
        <>
          <SectionTitle>ALERTY BEZPIECZEŃSTWA</SectionTitle>
          {renderFilters()}
          {renderAlertsTable()}
          {selectedAlert && renderAlertDetails()}
          
          <SectionTitle style={{ marginTop: '40px' }}>RANKING BEZPIECZEŃSTWA KIEROWCÓW</SectionTitle>
          {renderDriverRankingTable()}
          
          {drivingStyle && (
            <>
              <SectionTitle style={{ marginTop: '40px' }}>ANALIZA STYLU JAZDY</SectionTitle>
              <GridSection>
                <Card title="Wykres stylu jazdy">
                  {renderDrivingStyleRadarChart()}
                </Card>
                
                <Card title="Rekomendacje">
                  {renderDrivingStyleRecommendations()}
                </Card>
              </GridSection>
            </>
          )}
          
          {coachingSessions && (
            <>
              <SectionTitle style={{ marginTop: '40px' }}>SESJE COACHINGOWE</SectionTitle>
              {renderCoachingSessions()}
            </>
          )}
        </>
      );
    }
    
    if (activeTab === 'fatigue') {
      return renderDriverFatigue();
    }
    
    if (activeTab === 'distraction') {
      return renderDriverDistraction();
    }
    
    if (activeTab === 'style') {
      return renderDrivingStyle();
    }
    
    if (activeTab === 'collision') {
      return renderCollisionPrevention();
    }
    
    if (activeTab === 'coaching') {
      return (
        <>
          <SectionTitle>SYSTEM COACHINGU KIEROWCÓW</SectionTitle>
          {renderCoachingSessions()}
        </>
      );
    }
    
    if (activeTab === 'video') {
      return renderVideoTelematics();
    }
    
    if (activeTab === 'ranking') {
      return (
        <>
          <SectionTitle>RANKING BEZPIECZEŃSTWA KIEROWCÓW</SectionTitle>
          {renderDriverRankingTable()}
        </>
      );
    }
    
    return null;
  };
  
  return (
    <PageContainer>
      {renderDataToggle()}
      {renderTabs()}
      {renderContent()}
    </PageContainer>
  );
};

export default DriverSafety;
