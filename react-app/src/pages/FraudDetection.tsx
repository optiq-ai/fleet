import React from 'react';
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
`;

const ChartPlaceholder = styled.div`
  background-color: #e9ecef;
  border-radius: 8px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6c757d;
`;

const FilterBar = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
`;

const FilterSelect = styled.div`
  padding: 8px 16px;
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  
  &:after {
    content: '▼';
    font-size: 10px;
    color: #666;
  }
`;

const FraudDetection: React.FC = () => {
  // Mock data for demonstration
  const fraudAlertHeaders = ['Prio', 'Pojazd', 'Opis', 'Data', 'Lokalizacja', 'Status'];
  const fraudAlertData = [
    ['WYS', 'ABC1234', 'Nietypowa transakcja paliwowa', '12.04.2025', 'Warszawa', 'Nowy'],
    ['WYS', 'JKL4567', 'Weryfikacja karty nieudana', '12.04.2025', 'Kraków', 'Nowy'],
    ['ŚRE', 'DEF5678', 'Podejrzana lokalizacja tankowania', '11.04.2025', 'Gdańsk', 'W trakcie'],
    ['ŚRE', 'MNO7890', 'Niezgodność czasu tankowania', '11.04.2025', 'Poznań', 'W trakcie'],
    ['NIS', 'GHI9012', 'Niezgodność przebiegu', '10.04.2025', 'Wrocław', 'Zamknięty'],
    ['NIS', 'PQR1234', 'Podejrzany wzorzec tankowania', '09.04.2025', 'Łódź', 'Zamknięty']
  ];
  
  const transactionPatternHeaders = ['Data', 'Pojazd', 'Kierowca', 'Kwota', 'Ilość', 'Lokalizacja', 'Ocena ryzyka'];
  const transactionPatternData = [
    ['12.04.2025', 'ABC1234', 'Jan Kowalski', '450 PLN', '90L', 'Warszawa', 'Wysokie'],
    ['10.04.2025', 'ABC1234', 'Jan Kowalski', '300 PLN', '60L', 'Warszawa', 'Niskie'],
    ['08.04.2025', 'ABC1234', 'Jan Kowalski', '475 PLN', '95L', 'Radom', 'Wysokie'],
    ['05.04.2025', 'ABC1234', 'Jan Kowalski', '250 PLN', '50L', 'Warszawa', 'Niskie']
  ];

  return (
    <PageContainer>
      <KPISection>
        <KPICard title="Alerty wysokiego priorytetu" value="8" trend="up" trendValue="2 więcej niż wczoraj" />
        <KPICard title="Alerty średniego priorytetu" value="15" trend="down" trendValue="3 mniej niż wczoraj" />
        <KPICard title="Potencjalne straty" value="12 500 PLN" trend="up" trendValue="15% więcej niż w zeszłym tygodniu" />
        <KPICard title="Wykryte oszustwa" value="5" trend="neutral" trendValue="Bez zmian" />
      </KPISection>

      <SectionTitle>ALERTY OSZUSTW</SectionTitle>
      <FilterBar>
        <FilterSelect>Wszystkie priorytety</FilterSelect>
        <FilterSelect>Wszystkie statusy</FilterSelect>
        <FilterSelect>Ostatnie 7 dni</FilterSelect>
      </FilterBar>
      <Card fullWidth>
        <Table headers={fraudAlertHeaders} data={fraudAlertData} />
      </Card>
      
      <GridSection>
        <Card title="Mapa fraudów">
          <MapPlaceholder>Interaktywna mapa z oznaczeniami</MapPlaceholder>
        </Card>
        <Card title="Weryfikacja karty paliwowej">
          <MapPlaceholder>Mapa korelacji lokalizacji pojazdu i transakcji</MapPlaceholder>
        </Card>
      </GridSection>

      <SectionTitle>ANALIZA WZORCÓW TRANSAKCJI</SectionTitle>
      <Card fullWidth>
        <Table headers={transactionPatternHeaders} data={transactionPatternData} />
      </Card>
      
      <GridSection>
        <Card title="Trendy transakcji">
          <ChartPlaceholder>Wykres trendów transakcji</ChartPlaceholder>
        </Card>
        <Card title="Rozkład ryzyka">
          <ChartPlaceholder>Wykres rozkładu ryzyka</ChartPlaceholder>
        </Card>
      </GridSection>

      <SectionTitle>UWIERZYTELNIANIE BIOMETRYCZNE</SectionTitle>
      <Card fullWidth>
        <MapPlaceholder>Panel uwierzytelniania biometrycznego</MapPlaceholder>
      </Card>
      
      <SectionTitle>KSIĘGA TRANSAKCJI BLOCKCHAIN</SectionTitle>
      <Card fullWidth>
        <ChartPlaceholder>Widok księgi transakcji z historią zmian</ChartPlaceholder>
      </Card>
    </PageContainer>
  );
};

export default FraudDetection;
