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
    content: 'Alert ID: ${props => props.x * props.y}';
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

const BarChart = styled.div`
  display: flex;
  height: 150px;
  align-items: flex-end;
  justify-content: space-around;
  padding: 20px;
`;

const Bar = styled.div<{ height: number; color: string }>`
  width: 30px;
  height: ${props => props.height}%;
  background-color: ${props => props.color};
  border-radius: 4px 4px 0 0;
  position: relative;
  transition: height 1s ease-in-out;
  
  &:hover {
    opacity: 0.8;
  }
  
  &:hover::after {
    content: '${props => props.height}%';
    position: absolute;
    top: -25px;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 12px;
    white-space: nowrap;
  }
`;

const BarLabel = styled.div`
  position: absolute;
  bottom: -25px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
  color: #666;
  white-space: nowrap;
`;

// Typy danych
interface FraudData {
  kpis: {
    highPriorityAlerts: number;
    mediumPriorityAlerts: number;
    potentialLosses: number;
    detectedFrauds: number;
  };
  fraudAlerts: {
    priority: string;
    vehicle: string;
    description: string;
    date: string;
    location: string;
    status: string;
  }[];
  transactionPatterns: {
    date: string;
    vehicle: string;
    driver: string;
    amount: string;
    quantity: string;
    location: string;
    riskLevel: string;
  }[];
  mapData: {
    fraudPoints: { x: number; y: number }[];
    cardVerificationPoints: { x: number; y: number }[];
  };
  riskDistribution: {
    category: string;
    percentage: number;
    color: string;
  }[];
}

const FraudDetection: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [fraudData, setFraudData] = useState<FraudData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('7days');
  const [searchQuery, setSearchQuery] = useState('');

  // Symulacja pobierania danych z API
  useEffect(() => {
    const fetchFraudData = async () => {
      setIsLoading(true);
      try {
        // Symulacja opóźnienia sieciowego
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Dane mockowe
        const mockData: FraudData = {
          kpis: {
            highPriorityAlerts: 8,
            mediumPriorityAlerts: 15,
            potentialLosses: 12500,
            detectedFrauds: 5
          },
          fraudAlerts: [
            { priority: 'WYS', vehicle: 'ABC1234', description: 'Nietypowa transakcja paliwowa', date: '12.04.2025', location: 'Warszawa', status: 'Nowy' },
            { priority: 'WYS', vehicle: 'JKL4567', description: 'Weryfikacja karty nieudana', date: '12.04.2025', location: 'Kraków', status: 'Nowy' },
            { priority: 'ŚRE', vehicle: 'DEF5678', description: 'Podejrzana lokalizacja tankowania', date: '11.04.2025', location: 'Gdańsk', status: 'W trakcie' },
            { priority: 'ŚRE', vehicle: 'MNO7890', description: 'Niezgodność czasu tankowania', date: '11.04.2025', location: 'Poznań', status: 'W trakcie' },
            { priority: 'NIS', vehicle: 'GHI9012', description: 'Niezgodność przebiegu', date: '10.04.2025', location: 'Wrocław', status: 'Zamknięty' },
            { priority: 'NIS', vehicle: 'PQR1234', description: 'Podejrzany wzorzec tankowania', date: '09.04.2025', location: 'Łódź', status: 'Zamknięty' }
          ],
          transactionPatterns: [
            { date: '12.04.2025', vehicle: 'ABC1234', driver: 'Jan Kowalski', amount: '450 PLN', quantity: '90L', location: 'Warszawa', riskLevel: 'Wysokie' },
            { date: '10.04.2025', vehicle: 'ABC1234', driver: 'Jan Kowalski', amount: '300 PLN', quantity: '60L', location: 'Warszawa', riskLevel: 'Niskie' },
            { date: '08.04.2025', vehicle: 'ABC1234', driver: 'Jan Kowalski', amount: '475 PLN', quantity: '95L', location: 'Radom', riskLevel: 'Wysokie' },
            { date: '05.04.2025', vehicle: 'ABC1234', driver: 'Jan Kowalski', amount: '250 PLN', quantity: '50L', location: 'Warszawa', riskLevel: 'Niskie' }
          ],
          mapData: {
            fraudPoints: [
              { x: 25, y: 35 },
              { x: 65, y: 45 },
              { x: 40, y: 70 },
              { x: 30, y: 20 },
              { x: 70, y: 60 },
              { x: 55, y: 30 }
            ],
            cardVerificationPoints: [
              { x: 26, y: 36 },
              { x: 66, y: 46 },
              { x: 41, y: 71 },
              { x: 31, y: 21 },
              { x: 71, y: 61 },
              { x: 56, y: 31 }
            ]
          },
          riskDistribution: [
            { category: 'Wysokie', percentage: 35, color: '#dc3545' },
            { category: 'Średnie', percentage: 45, color: '#fd7e14' },
            { category: 'Niskie', percentage: 20, color: '#28a745' }
          ]
        };
        
        setFraudData(mockData);
        setError(null);
      } catch (err) {
        console.error('Error fetching fraud data:', err);
        setError('Nie udało się pobrać danych o oszustwach. Spróbuj ponownie później.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFraudData();
  }, []);

  // Filtrowanie alertów
  const getFilteredAlerts = () => {
    if (!fraudData) return [];
    
    return fraudData.fraudAlerts.filter(alert => {
      // Filtrowanie po priorytecie
      if (priorityFilter !== 'all') {
        if (priorityFilter === 'high' && alert.priority !== 'WYS') return false;
        if (priorityFilter === 'medium' && alert.priority !== 'ŚRE') return false;
        if (priorityFilter === 'low' && alert.priority !== 'NIS') return false;
      }
      
      // Filtrowanie po statusie
      if (statusFilter !== 'all') {
        if (statusFilter === 'new' && alert.status !== 'Nowy') return false;
        if (statusFilter === 'inProgress' && alert.status !== 'W trakcie') return false;
        if (statusFilter === 'closed' && alert.status !== 'Zamknięty') return false;
      }
      
      // Filtrowanie po dacie (uproszczone)
      if (dateFilter !== 'all') {
        // W rzeczywistej aplikacji tutaj byłoby prawdziwe porównanie dat
        if (dateFilter === '7days' && alert.date < '05.04.2025') return false;
        if (dateFilter === '30days' && alert.date < '12.03.2025') return false;
      }
      
      // Filtrowanie po wyszukiwaniu
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          alert.vehicle.toLowerCase().includes(query) ||
          alert.description.toLowerCase().includes(query) ||
          alert.location.toLowerCase().includes(query)
        );
      }
      
      return true;
    });
  };

  // Konwersja danych do formatu wymaganego przez komponent Table
  const getFraudAlertTableData = () => {
    const filteredAlerts = getFilteredAlerts();
    
    return {
      headers: ['Prio', 'Pojazd', 'Opis', 'Data', 'Lokalizacja', 'Status'],
      data: filteredAlerts.map(alert => [
        alert.priority,
        alert.vehicle,
        alert.description,
        alert.date,
        alert.location,
        alert.status
      ])
    };
  };
  
  const getTransactionPatternTableData = () => {
    if (!fraudData) return { headers: [], data: [] };
    
    return {
      headers: ['Data', 'Pojazd', 'Kierowca', 'Kwota', 'Ilość', 'Lokalizacja', 'Ocena ryzyka'],
      data: fraudData.transactionPatterns.map(pattern => [
        pattern.date,
        pattern.vehicle,
        pattern.driver,
        pattern.amount,
        pattern.quantity,
        pattern.location,
        pattern.riskLevel
      ])
    };
  };

  // Obsługa kliknięcia wiersza tabeli
  const handleRowClick = (table: string, index: number) => {
    console.log(`Kliknięto wiersz ${index} w tabeli ${table}`);
    // Tutaj można dodać nawigację do szczegółów
    alert(`Otwieranie szczegółów alertu ${index + 1}`);
  };

  // Obsługa zmiany filtrów
  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPriorityFilter(e.target.value);
  };
  
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
  };
  
  const handleDateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDateFilter(e.target.value);
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  if (isLoading) {
    return (
      <PageContainer>
        <LoadingIndicator>Ładowanie danych o oszustwach...</LoadingIndicator>
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

  if (!fraudData) {
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

  const { headers: fraudHeaders, data: fraudData } = getFraudAlertTableData();
  const { headers: transactionHeaders, data: transactionData } = getTransactionPatternTableData();

  return (
    <PageContainer>
      <KPISection>
        <KPICard 
          title="Alerty wysokiego priorytetu" 
          value={fraudData.kpis.highPriorityAlerts} 
          trend="up" 
          trendValue="2 więcej niż wczoraj" 
        />
        <KPICard 
          title="Alerty średniego priorytetu" 
          value={fraudData.kpis.mediumPriorityAlerts} 
          trend="down" 
          trendValue="3 mniej niż wczoraj" 
        />
        <KPICard 
          title="Potencjalne straty" 
          value={`${fraudData.kpis.potentialLosses} PLN`} 
          trend="up" 
          trendValue="15% więcej niż w zeszłym tygodniu" 
        />
        <KPICard 
          title="Wykryte oszustwa" 
          value={fraudData.kpis.detectedFrauds} 
          trend="neutral" 
          trendValue="Bez zmian" 
        />
      </KPISection>

      <SectionTitle>ALERTY OSZUSTW</SectionTitle>
      <FilterBar>
        <FilterSelect value={priorityFilter} onChange={handlePriorityChange}>
          <FilterOption value="all">Wszystkie priorytety</FilterOption>
          <FilterOption value="high">Wysoki priorytet</FilterOption>
          <FilterOption value="medium">Średni priorytet</FilterOption>
          <FilterOption value="low">Niski priorytet</FilterOption>
        </FilterSelect>
        
        <FilterSelect value={statusFilter} onChange={handleStatusChange}>
          <FilterOption value="all">Wszystkie statusy</FilterOption>
          <FilterOption value="new">Nowe</FilterOption>
          <FilterOption value="inProgress">W trakcie</FilterOption>
          <FilterOption value="closed">Zamknięte</FilterOption>
        </FilterSelect>
        
        <FilterSelect value={dateFilter} onChange={handleDateChange}>
          <FilterOption value="all">Wszystkie daty</FilterOption>
          <FilterOption value="7days">Ostatnie 7 dni</FilterOption>
          <FilterOption value="30days">Ostatnie 30 dni</FilterOption>
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
          headers={fraudHeaders} 
          data={fraudData} 
          onRowClick={(index) => handleRowClick('fraud', index)}
          emptyMessage="Brak alertów spełniających kryteria filtrowania"
        />
      </Card>
      
      <GridSection>
        <Card title="Mapa fraudów">
          <MapPlaceholder>
            Interaktywna mapa z oznaczeniami
            <MapOverlay>
              {fraudData.mapData.fraudPoints.map((point, index) => (
                <MapPoint 
                  key={`fraud-${index}`}
                  x={point.x} 
                  y={point.y} 
                  color="#dc3545"
                  size={14}
                />
              ))}
            </MapOverlay>
          </MapPlaceholder>
        </Card>
        <Card title="Weryfikacja karty paliwowej">
          <MapPlaceholder>
            Mapa korelacji lokalizacji pojazdu i transakcji
            <MapOverlay>
              {fraudData.mapData.fraudPoints.map((point, index) => (
                <MapPoint 
                  key={`vehicle-${index}`}
                  x={point.x} 
                  y={point.y} 
                  color="#0d6efd"
                  size={14}
                />
              ))}
              {fraudData.mapData.cardVerificationPoints.map((point, index) => (
                <MapPoint 
                  key={`card-${index}`}
                  x={point.x} 
                  y={point.y} 
                  color="#fd7e14"
                  size={10}
                />
              ))}
            </MapOverlay>
          </MapPlaceholder>
        </Card>
      </GridSection>

      <SectionTitle>ANALIZA WZORCÓW TRANSAKCJI</SectionTitle>
      <Card fullWidth>
        <Table 
          headers={transactionHeaders} 
          data={transactionData} 
          onRowClick={(index) => handleRowClick('transaction', index)}
        />
      </Card>
      
      <GridSection>
        <Card title="Trendy transakcji">
          <ChartPlaceholder>
            Wykres trendów transakcji
          </ChartPlaceholder>
        </Card>
        <Card title="Rozkład ryzyka">
          <BarChart>
            {fraudData.riskDistribution.map((item, index) => (
              <div key={index} style={{ position: 'relative' }}>
                <Bar height={item.percentage} color={item.color}>
                  <BarLabel>{item.category}</BarLabel>
                </Bar>
              </div>
            ))}
          </BarChart>
        </Card>
      </GridSection>

      <SectionTitle>UWIERZYTELNIANIE BIOMETRYCZNE</SectionTitle>
      <Card fullWidth>
        <MapPlaceholder>
          Panel uwierzytelniania biometrycznego
        </MapPlaceholder>
      </Card>
      
      <SectionTitle>KSIĘGA TRANSAKCJI BLOCKCHAIN</SectionTitle>
      <Card fullWidth>
        <ChartPlaceholder>
          Widok księgi transakcji z historią zmian
        </ChartPlaceholder>
      </Card>
    </PageContainer>
  );
};

export default FraudDetection;
