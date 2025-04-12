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

const PredictiveMaintenance: React.FC = () => {
  // Mock data for demonstration
  const maintenanceHeaders = ['Pojazd', 'Element', 'Prognoza', 'Pewność'];
  const maintenanceData = [
    ['ABC123', 'Hamulce', 'Awaria za 2 tyg.', '85%'],
    ['DEF456', 'Akumulator', 'Awaria za 5 dni', '72%'],
    ['GHI789', 'Olej', 'Wymiana za 3 dni', '91%'],
    ['JKL012', 'Zawieszenie', 'Awaria za 3 tyg.', '68%'],
    ['MNO345', 'Alternator', 'Awaria za 10 dni', '77%']
  ];
  
  const scheduleHeaders = ['Data', 'Pojazd', 'Typ serwisu', 'Status'];
  const scheduleData = [
    ['13.04', 'ABC123', 'Wymiana hamulców', 'Zaplanowane'],
    ['15.04', 'DEF456', 'Wymiana akumulatora', 'Zaplanowane'],
    ['15.04', 'GHI789', 'Wymiana oleju', 'Zaplanowane'],
    ['20.04', 'PQR678', 'Przegląd okresowy', 'Zaplanowane'],
    ['25.04', 'STU901', 'Wymiana opon', 'Zaplanowane']
  ];

  return (
    <PageContainer>
      <KPISection>
        <KPICard title="Pojazdy do konserwacji" value="12" trend="up" trendValue="3 więcej niż w zeszłym tygodniu" />
        <KPICard title="Zaplanowane przeglądy" value="8" trend="neutral" trendValue="Bez zmian" />
        <KPICard title="Alerty gwarancyjne" value="5" trend="down" trendValue="2 mniej niż w zeszłym miesiącu" />
        <KPICard title="Stan części magazynowych" value="87%" trend="up" trendValue="5% więcej niż w zeszłym miesiącu" />
      </KPISection>

      <SectionTitle>PROGNOZA AWARII</SectionTitle>
      <FilterBar>
        <FilterSelect>Wszystkie</FilterSelect>
        <FilterSelect>Priorytet</FilterSelect>
      </FilterBar>
      <Card fullWidth>
        <Table headers={maintenanceHeaders} data={maintenanceData} />
      </Card>

      <SectionTitle>HARMONOGRAM KONSERWACJI</SectionTitle>
      <Card fullWidth>
        <Table headers={scheduleHeaders} data={scheduleData} />
      </Card>
      
      <SectionTitle>ZARZĄDZANIE CZĘŚCIAMI</SectionTitle>
      <GridSection>
        <Card title="Stan magazynu">
          <ChartPlaceholder>Wykres słupkowy</ChartPlaceholder>
        </Card>
        <Card title="Zamówienia">
          <ChartPlaceholder>Lista zamówień</ChartPlaceholder>
        </Card>
      </GridSection>
      
      <GridSection>
        <Card title="Części krytyczne">
          <ChartPlaceholder>Lista z alertami</ChartPlaceholder>
        </Card>
        <Card title="Dostawcy">
          <ChartPlaceholder>Lista dostawców</ChartPlaceholder>
        </Card>
      </GridSection>
    </PageContainer>
  );
};

export default PredictiveMaintenance;
