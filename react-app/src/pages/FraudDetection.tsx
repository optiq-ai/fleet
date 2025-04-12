import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Card from '../components/common/Card';
import Table from '../components/common/Table';
import fraudDetectionService, { 
  FraudAlert, 
  FraudAlertsResponse, 
  TransactionPatternsResponse 
} from '../services/api/fraudDetectionService';

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

const Button = styled.button<{ primary?: boolean }>`
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

const ChartContainer = styled.div`
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f9f9f9;
  border-radius: 8px;
  margin-top: 16px;
`;

const PieChart = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: conic-gradient(
    #f44336 0% 25%,
    #ff9800 25% 50%,
    #ffeb3b 50% 75%,
    #4caf50 75% 100%
  );
`;

const PieChartLegend = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-left: 32px;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
`;

const LegendColor = styled.div<{ color: string }>`
  width: 16px;
  height: 16px;
  background-color: ${props => props.color};
  border-radius: 4px;
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

const Badge = styled.span<{ color: string }>`
  display: inline-block;
  padding: 4px 8px;
  background-color: ${props => props.color};
  color: white;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
`;

const FraudDetection: React.FC = () => {
  // Stan dla alertów oszustw
  const [alerts, setAlerts] = useState<FraudAlertsResponse | null>(null);
  
  // Stan dla wybranego alertu
  const [selectedAlert, setSelectedAlert] = useState<FraudAlert | null>(null);
  
  // Stan dla wzorców transakcji
  const [transactionPatterns, setTransactionPatterns] = useState<TransactionPatternsResponse | null>(null);
  
  // Stan dla filtrów
  const [filters, setFilters] = useState({
    priority: 'all',
    status: 'all',
    dateFrom: '',
    dateTo: '',
    search: '',
    page: 1,
    limit: 10
  });
  
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
  const [isDetailLoading, setIsDetailLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // Pobieranie alertów przy montowaniu komponentu i zmianie filtrów
  useEffect(() => {
    const fetchAlerts = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const alertsResponse = await fraudDetectionService.getAlerts(
          filters.priority !== 'all' ? filters.priority : undefined,
          filters.status !== 'all' ? filters.status : undefined,
          filters.dateFrom || undefined,
          filters.dateTo || undefined,
          filters.search || undefined,
          filters.page,
          filters.limit
        );
        
        setAlerts(alertsResponse);
        
        // Pobieranie wzorców transakcji
        const patternsResponse = await fraudDetectionService.getTransactionPatterns();
        setTransactionPatterns(patternsResponse);
      } catch (err) {
        console.error('Error fetching fraud detection data:', err);
        setError('Nie udało się pobrać danych wykrywania oszustw. Spróbuj odświeżyć stronę.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAlerts();
  }, [filters.priority, filters.status, filters.page, filters.limit]);
  
  // Obsługa zmiany filtrów
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
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
  const handlePageChange = (newPage: number) => {
    setFilters({
      ...filters,
      page: newPage
    });
  };
  
  // Obsługa kliknięcia wiersza alertu
  const handleAlertClick = async (alert: FraudAlert) => {
    setIsDetailLoading(true);
    
    try {
      const alertDetails = await fraudDetectionService.getAlertDetails(alert.id);
      setSelectedAlert(alertDetails);
    } catch (err) {
      console.error('Error fetching alert details:', err);
      setError('Nie udało się pobrać szczegółów alertu.');
    } finally {
      setIsDetailLoading(false);
    }
  };
  
  // Obsługa aktualizacji statusu alertu
  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      await fraudDetectionService.updateAlertStatus(id, { status: newStatus });
      
      // Odświeżenie listy alertów
      const alertsResponse = await fraudDetectionService.getAlerts(
        filters.priority !== 'all' ? filters.priority : undefined,
        filters.status !== 'all' ? filters.status : undefined,
        filters.dateFrom || undefined,
        filters.dateTo || undefined,
        filters.search || undefined,
        filters.page,
        filters.limit
      );
      
      setAlerts(alertsResponse);
      
      // Aktualizacja wybranego alertu, jeśli istnieje
      if (selectedAlert && selectedAlert.id === id) {
        setSelectedAlert({
          ...selectedAlert,
          status: newStatus
        });
      }
    } catch (err) {
      console.error('Error updating alert status:', err);
      setError('Nie udało się zaktualizować statusu alertu.');
    }
  };
  
  // Renderowanie sekcji filtrów
  const renderFilters = () => {
    return (
      <FilterContainer>
        <FilterGroup>
          <FilterLabel htmlFor="priority">Priorytet</FilterLabel>
          <FilterSelect 
            id="priority" 
            name="priority" 
            value={filters.priority} 
            onChange={handleFilterChange}
          >
            <option value="all">Wszystkie</option>
            <option value="high">Wysoki</option>
            <option value="medium">Średni</option>
            <option value="low">Niski</option>
          </FilterSelect>
        </FilterGroup>
        
        <FilterGroup>
          <FilterLabel htmlFor="status">Status</FilterLabel>
          <FilterSelect 
            id="status" 
            name="status" 
            value={filters.status} 
            onChange={handleFilterChange}
          >
            <option value="all">Wszystkie</option>
            <option value="new">Nowy</option>
            <option value="inProgress">W trakcie</option>
            <option value="closed">Zamknięty</option>
          </FilterSelect>
        </FilterGroup>
        
        <FilterGroup>
          <FilterLabel htmlFor="dateFrom">Data od</FilterLabel>
          <FilterInput 
            type="date" 
            id="dateFrom" 
            name="dateFrom" 
            value={filters.dateFrom} 
            onChange={handleFilterChange}
          />
        </FilterGroup>
        
        <FilterGroup>
          <FilterLabel htmlFor="dateTo">Data do</FilterLabel>
          <FilterInput 
            type="date" 
            id="dateTo" 
            name="dateTo" 
            value={filters.dateTo} 
            onChange={handleFilterChange}
          />
        </FilterGroup>
        
        <FilterGroup>
          <FilterLabel htmlFor="search">Wyszukaj</FilterLabel>
          <FilterInput 
            type="text" 
            id="search" 
            name="search" 
            value={filters.search} 
            onChange={handleFilterChange}
            placeholder="Pojazd, lokalizacja..."
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
    
    const getPriorityBadge = (priority: string) => {
      const colors: Record<string, string> = {
        high: '#f44336',
        medium: '#ff9800',
        low: '#4caf50'
      };
      
      return (
        <Badge color={colors[priority] || '#2196f3'}>
          {priority === 'high' ? 'Wysoki' : 
           priority === 'medium' ? 'Średni' : 
           priority === 'low' ? 'Niski' : priority}
        </Badge>
      );
    };
    
    const getStatusBadge = (status: string) => {
      const colors: Record<string, string> = {
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
    
    const columns = [
      { 
        key: 'priority', 
        header: 'Priorytet',
        render: (alert: FraudAlert) => getPriorityBadge(alert.priority)
      },
      { key: 'vehicle', header: 'Pojazd' },
      { key: 'description', header: 'Opis' },
      { key: 'date', header: 'Data' },
      { key: 'location', header: 'Lokalizacja' },
      { 
        key: 'status', 
        header: 'Status',
        render: (alert: FraudAlert) => getStatusBadge(alert.status)
      }
    ];
    
    return (
      <>
        <Table 
          data={alerts.alerts}
          columns={columns}
          onRowClick={handleAlertClick}
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
          <DetailLabel>Pojazd:</DetailLabel>
          <DetailValue>{selectedAlert.vehicle}</DetailValue>
        </DetailRow>
        
        <DetailRow>
          <DetailLabel>Opis:</DetailLabel>
          <DetailValue>{selectedAlert.description}</DetailValue>
        </DetailRow>
        
        <DetailRow>
          <DetailLabel>Data:</DetailLabel>
          <DetailValue>{selectedAlert.date}</DetailValue>
        </DetailRow>
        
        <DetailRow>
          <DetailLabel>Lokalizacja:</DetailLabel>
          <DetailValue>{selectedAlert.location}</DetailValue>
        </DetailRow>
        
        <DetailRow>
          <DetailLabel>Status:</DetailLabel>
          <DetailValue>
            <FilterSelect 
              value={selectedAlert.status} 
              onChange={(e) => handleStatusUpdate(selectedAlert.id, e.target.value)}
            >
              <option value="new">Nowy</option>
              <option value="inProgress">W trakcie</option>
              <option value="closed">Zamknięty</option>
            </FilterSelect>
          </DetailValue>
        </DetailRow>
        
        {selectedAlert.details && (
          <>
            <DetailTitle style={{ marginTop: '16px' }}>Szczegóły transakcji</DetailTitle>
            
            <DetailRow>
              <DetailLabel>ID transakcji:</DetailLabel>
              <DetailValue>{selectedAlert.details.transactionId}</DetailValue>
            </DetailRow>
            
            <DetailRow>
              <DetailLabel>Kwota:</DetailLabel>
              <DetailValue>{selectedAlert.details.amount} zł</DetailValue>
            </DetailRow>
            
            <DetailRow>
              <DetailLabel>Rodzaj paliwa:</DetailLabel>
              <DetailValue>{selectedAlert.details.fuelType}</DetailValue>
            </DetailRow>
            
            <DetailRow>
              <DetailLabel>Ilość:</DetailLabel>
              <DetailValue>{selectedAlert.details.quantity} l</DetailValue>
            </DetailRow>
            
            <DetailRow>
              <DetailLabel>ID kierowcy:</DetailLabel>
              <DetailValue>{selectedAlert.details.driverId}</DetailValue>
            </DetailRow>
            
            {selectedAlert.details.cardVerification && (
              <>
                <DetailTitle style={{ marginTop: '16px' }}>Weryfikacja karty</DetailTitle>
                
                <DetailRow>
                  <DetailLabel>Status:</DetailLabel>
                  <DetailValue>
                    <Badge 
                      color={selectedAlert.details.cardVerification.status === 'verified' ? '#4caf50' : '#f44336'}
                    >
                      {selectedAlert.details.cardVerification.status === 'verified' ? 'Zweryfikowana' : 'Niezweryfikowana'}
                    </Badge>
                  </DetailValue>
                </DetailRow>
                
                <DetailRow>
                  <DetailLabel>Odległość od pojazdu:</DetailLabel>
                  <DetailValue>
                    {selectedAlert.details.cardVerification.distanceFromVehicle} km
                  </DetailValue>
                </DetailRow>
              </>
            )}
          </>
        )}
      </DetailContainer>
    );
  };
  
  // Renderowanie analizy wzorców transakcji
  const renderTransactionPatterns = () => {
    if (!transactionPatterns) return null;
    
    return (
      <Card title="Analiza wzorców transakcji">
        <ChartContainer>
          <PieChart />
          <PieChartLegend>
            {transactionPatterns.analysis.riskDistribution.map((item, index) => (
              <LegendItem key={index}>
                <LegendColor color={item.color} />
                {item.category}: {item.percentage}%
              </LegendItem>
            ))}
          </PieChartLegend>
        </ChartContainer>
        
        <DetailContainer style={{ marginTop: '16px' }}>
          <DetailTitle>Statystyki transakcji</DetailTitle>
          
          <DetailRow>
            <DetailLabel>Średnia kwota:</DetailLabel>
            <DetailValue>{transactionPatterns.analysis.averageAmount} zł</DetailValue>
          </DetailRow>
          
          <DetailRow>
            <DetailLabel>Średnia ilość:</DetailLabel>
            <DetailValue>{transactionPatterns.analysis.averageQuantity} l</DetailValue>
          </DetailRow>
          
          <DetailTitle style={{ marginTop: '16px' }}>Najczęstsze lokalizacje</DetailTitle>
          
          {transactionPatterns.analysis.frequentLocations.map((location, index) => (
            <DetailRow key={index}>
              <DetailLabel>{location.location}:</DetailLabel>
              <DetailValue>{location.count} transakcji</DetailValue>
            </DetailRow>
          ))}
        </DetailContainer>
      </Card>
    );
  };
  
  if (isLoading) {
    return (
      <PageContainer>
        <LoadingIndicator>Ładowanie danych wykrywania oszustw...</LoadingIndicator>
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
      <SectionTitle>WYKRYWANIE OSZUSTW</SectionTitle>
      
      {renderFilters()}
      
      <Card title="Alerty oszustw" fullWidth>
        {renderAlertsTable()}
      </Card>
      
      {selectedAlert && (
        <Card title="Szczegóły alertu" fullWidth>
          {isDetailLoading ? (
            <LoadingIndicator>Ładowanie szczegółów...</LoadingIndicator>
          ) : (
            renderAlertDetails()
          )}
        </Card>
      )}
      
      <GridSection>
        {renderTransactionPatterns()}
        
        <Card title="Mapa alertów">
          <MapContainer>
            <MapPlaceholder>
              Mapa alertów oszustw
              <br />
              (Integracja z rzeczywistą mapą)
            </MapPlaceholder>
          </MapContainer>
        </Card>
      </GridSection>
    </PageContainer>
  );
};

export default FraudDetection;
