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

const DriverSafety: React.FC = () => {
  // Mock data for demonstration
  const safetyAlertHeaders = ['Typ', 'Kierowca', 'Opis', 'Czas', 'Lokalizacja', 'Status'];
  const safetyAlertData = [
    ['Zmęcz.', 'Jan K.', 'Wykryto oznaki zmęczenia', '10:23', 'Warszawa-Łódź', 'Nowy'],
    ['Rozpr.', 'Anna W.', 'Korzystanie z telefonu', '09:45', 'Kraków-Katowice', 'Nowy'],
    ['Styl', 'Piotr M.', 'Gwałtowne hamowanie', '08:30', 'Poznań', 'W trakcie'],
    ['Koliz.', 'Tomasz L.', 'Zbyt mała odległość', '11:15', 'Wrocław', 'W trakcie'],
    ['Zmęcz.', 'Ewa S.', 'Długi czas pracy', '12:05', 'Gdańsk-Gdynia', 'Zamknięty']
  ];
  
  const coachingHeaders = ['Kierowca', 'Typ', 'Temat', 'Data', 'Status'];
  const coachingData = [
    ['Jan K.', 'Online', 'Zmęczenie za kierownicą', '15.04', 'Zaplanowane'],
    ['Piotr M.', 'Osobiste', 'Techniki hamowania', '18.04', 'Zaplanowane'],
    ['Grupa A', 'Webinar', 'Bezpieczny dystans', '20.04', 'Zaplanowane'],
    ['Anna W.', 'Online', 'Rozproszenie uwagi', '22.04', 'Zaplanowane'],
    ['Tomasz L.', 'Osobiste', 'Defensywna jazda', '25.04', 'Zaplanowane']
  ];

  return (
    <PageContainer>
      <KPISection>
        <KPICard title="Wskaźnik bezpieczeństwa" value="85%" trend="up" trendValue="5% w tym miesiącu" />
        <KPICard title="Liczba alertów" value="12" trend="down" trendValue="3 mniej niż wczoraj" />
        <KPICard title="Zmęczenie kierowców" value="3 kierowców" trend="neutral" trendValue="Bez zmian" />
        <KPICard title="Rozproszenie uwagi" value="5 przypadków" trend="down" trendValue="2 mniej niż wczoraj" />
      </KPISection>

      <SectionTitle>MAPA INCYDENTÓW BEZPIECZEŃSTWA</SectionTitle>
      <Card fullWidth>
        <MapPlaceholder>Interaktywna mapa z oznaczeniami incydentów</MapPlaceholder>
      </Card>

      <SectionTitle>ALERTY BEZPIECZEŃSTWA</SectionTitle>
      <FilterBar>
        <FilterSelect>Wszystkie</FilterSelect>
        <FilterSelect>Dzisiaj</FilterSelect>
      </FilterBar>
      <Card fullWidth>
        <Table headers={safetyAlertHeaders} data={safetyAlertData} />
      </Card>
      
      <SectionTitle>ANALIZA ZACHOWANIA KIEROWCÓW</SectionTitle>
      <GridSection>
        <Card title="Ranking bezpieczeństwa">
          <ChartPlaceholder>Top 5 kierowców</ChartPlaceholder>
        </Card>
        <Card title="Trendy bezpieczeństwa">
          <ChartPlaceholder>Wykres trendu</ChartPlaceholder>
        </Card>
      </GridSection>
      
      <GridSection>
        <Card title="Styl jazdy">
          <ChartPlaceholder>Wykres radarowy</ChartPlaceholder>
        </Card>
        <Card title="Punktacja">
          <ChartPlaceholder>Tabela wyników</ChartPlaceholder>
        </Card>
      </GridSection>

      <SectionTitle>SYSTEM COACHINGU</SectionTitle>
      <Card fullWidth>
        <Table headers={coachingHeaders} data={coachingData} />
      </Card>
    </PageContainer>
  );
};

export default DriverSafety;
