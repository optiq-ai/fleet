import React from 'react';
import styled from 'styled-components';
import Card from '../components/common/Card';
import KPICard from '../components/common/KPICard';
import Table from '../components/common/Table';

const DashboardContainer = styled.div`
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

const Dashboard: React.FC = () => {
  // Mock data for demonstration
  const fraudAlertHeaders = ['Prio', 'Pojazd', 'Opis'];
  const fraudAlertData = [
    ['WYS', 'ABC1234', 'Nietypowa transakcja paliwowa'],
    ['ŚRE', 'DEF5678', 'Podejrzana lokalizacja tankowania'],
    ['NIS', 'GHI9012', 'Niezgodność przebiegu']
  ];
  
  const safetyAlertHeaders = ['Typ', 'Kierowca', 'Opis'];
  const safetyAlertData = [
    ['Zmęcz.', 'Jan K.', 'Wykryto oznaki zmęczenia'],
    ['Rozpr.', 'Anna W.', 'Korzystanie z telefonu'],
    ['Styl', 'Piotr M.', 'Gwałtowne hamowanie']
  ];
  
  const maintenanceHeaders = ['Pojazd', 'Element', 'Prognoza'];
  const maintenanceData = [
    ['ABC123', 'Hamulce', '85% za 2 tyg.'],
    ['DEF456', 'Akumulator', '72% za 5 dni'],
    ['GHI789', 'Olej', '91% za 3 dni']
  ];

  return (
    <DashboardContainer>
      <KPISection>
        <KPICard title="Aktywne pojazdy" value="125" />
        <KPICard title="Aktywni kierowcy" value="98" />
        <KPICard title="Koszty dzisiaj" value="12 500 PLN" />
        <KPICard title="Potencjalne oszczędności" value="3 200 PLN" />
        <KPICard title="Wskaźnik bezpieczeństwa" value="85%" trend="up" trendValue="5% w tym miesiącu" />
        <KPICard title="Prognoza konserwacji" value="12 pojazdów" trend="down" trendValue="3 mniej niż w zeszłym tygodniu" />
      </KPISection>

      <SectionTitle>WYKRYWANIE OSZUSTW</SectionTitle>
      <Card fullWidth>
        <Table headers={fraudAlertHeaders} data={fraudAlertData} />
      </Card>
      
      <GridSection>
        <Card>
          <MapPlaceholder>Mapa fraudów</MapPlaceholder>
        </Card>
        <Card>
          <MapPlaceholder>Weryfikacja karty</MapPlaceholder>
        </Card>
      </GridSection>

      <SectionTitle>BEZPIECZEŃSTWO KIEROWCY</SectionTitle>
      <Card fullWidth>
        <Table headers={safetyAlertHeaders} data={safetyAlertData} />
      </Card>
      
      <GridSection>
        <Card>
          <MapPlaceholder>Mapa incydentów</MapPlaceholder>
        </Card>
        <Card>
          <MapPlaceholder>Ranking bezpieczeństwa</MapPlaceholder>
        </Card>
      </GridSection>

      <SectionTitle>KONSERWACJA PREDYKCYJNA</SectionTitle>
      <Card fullWidth>
        <Table headers={maintenanceHeaders} data={maintenanceData} />
      </Card>
      
      <SectionTitle>MONITORING POJAZDÓW</SectionTitle>
      <Card fullWidth>
        <MapPlaceholder>Mapa pojazdów</MapPlaceholder>
      </Card>
    </DashboardContainer>
  );
};

export default Dashboard;
