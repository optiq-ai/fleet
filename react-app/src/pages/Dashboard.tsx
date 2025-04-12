import React, { useState, useEffect } from 'react';
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

const MapPoint = styled.div<{ x: number; y: number; color: string }>`
  position: absolute;
  top: ${props => props.y}%;
  left: ${props => props.x}%;
  width: 12px;
  height: 12px;
  background-color: ${props => props.color};
  border-radius: 50%;
  transform: translate(-50%, -50%);
  
  &:hover::after {
    content: 'Lokalizacja';
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
  }
`;

const LoadingIndicator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  color: #666;
`;

// Typy danych
interface DashboardData {
  kpis: {
    activeVehicles: number;
    activeDrivers: number;
    dailyCosts: number;
    potentialSavings: number;
    safetyIndex: number;
    maintenanceForecast: number;
  };
  fraudAlerts: {
    priority: string;
    vehicle: string;
    description: string;
  }[];
  safetyAlerts: {
    type: string;
    driver: string;
    description: string;
  }[];
  maintenanceAlerts: {
    vehicle: string;
    component: string;
    forecast: string;
  }[];
  mapData: {
    fraudPoints: { x: number; y: number }[];
    safetyPoints: { x: number; y: number }[];
    vehiclePoints: { x: number; y: number }[];
  };
}

const Dashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Symulacja pobierania danych z API
  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        // Symulacja opóźnienia sieciowego
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Dane mockowe
        const mockData: DashboardData = {
          kpis: {
            activeVehicles: 125,
            activeDrivers: 98,
            dailyCosts: 12500,
            potentialSavings: 3200,
            safetyIndex: 85,
            maintenanceForecast: 12
          },
          fraudAlerts: [
            { priority: 'WYS', vehicle: 'ABC1234', description: 'Nietypowa transakcja paliwowa' },
            { priority: 'ŚRE', vehicle: 'DEF5678', description: 'Podejrzana lokalizacja tankowania' },
            { priority: 'NIS', vehicle: 'GHI9012', description: 'Niezgodność przebiegu' }
          ],
          safetyAlerts: [
            { type: 'Zmęcz.', driver: 'Jan K.', description: 'Wykryto oznaki zmęczenia' },
            { type: 'Rozpr.', driver: 'Anna W.', description: 'Korzystanie z telefonu' },
            { type: 'Styl', driver: 'Piotr M.', description: 'Gwałtowne hamowanie' }
          ],
          maintenanceAlerts: [
            { vehicle: 'ABC123', component: 'Hamulce', forecast: '85% za 2 tyg.' },
            { vehicle: 'DEF456', component: 'Akumulator', forecast: '72% za 5 dni' },
            { vehicle: 'GHI789', component: 'Olej', forecast: '91% za 3 dni' }
          ],
          mapData: {
            fraudPoints: [
              { x: 25, y: 35 },
              { x: 65, y: 45 },
              { x: 40, y: 70 }
            ],
            safetyPoints: [
              { x: 30, y: 40 },
              { x: 70, y: 30 },
              { x: 50, y: 60 }
            ],
            vehiclePoints: [
              { x: 20, y: 30 },
              { x: 40, y: 50 },
              { x: 60, y: 40 },
              { x: 80, y: 60 },
              { x: 35, y: 75 }
            ]
          }
        };
        
        setDashboardData(mockData);
        setError(null);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Nie udało się pobrać danych dashboardu. Spróbuj ponownie później.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Konwersja danych do formatu wymaganego przez komponent Table
  const getFraudAlertTableData = () => {
    if (!dashboardData) return { headers: [], data: [] };
    
    return {
      headers: ['Prio', 'Pojazd', 'Opis'],
      data: dashboardData.fraudAlerts.map(alert => [
        alert.priority,
        alert.vehicle,
        alert.description
      ])
    };
  };
  
  const getSafetyAlertTableData = () => {
    if (!dashboardData) return { headers: [], data: [] };
    
    return {
      headers: ['Typ', 'Kierowca', 'Opis'],
      data: dashboardData.safetyAlerts.map(alert => [
        alert.type,
        alert.driver,
        alert.description
      ])
    };
  };
  
  const getMaintenanceTableData = () => {
    if (!dashboardData) return { headers: [], data: [] };
    
    return {
      headers: ['Pojazd', 'Element', 'Prognoza'],
      data: dashboardData.maintenanceAlerts.map(alert => [
        alert.vehicle,
        alert.component,
        alert.forecast
      ])
    };
  };

  // Obsługa kliknięcia wiersza tabeli
  const handleRowClick = (table: string, index: number) => {
    console.log(`Kliknięto wiersz ${index} w tabeli ${table}`);
    // Tutaj można dodać nawigację do szczegółów
  };

  if (isLoading) {
    return (
      <DashboardContainer>
        <LoadingIndicator>Ładowanie danych dashboardu...</LoadingIndicator>
      </DashboardContainer>
    );
  }

  if (error) {
    return (
      <DashboardContainer>
        <Card fullWidth>
          <div style={{ color: 'red', padding: '20px', textAlign: 'center' }}>
            {error}
          </div>
        </Card>
      </DashboardContainer>
    );
  }

  if (!dashboardData) {
    return (
      <DashboardContainer>
        <Card fullWidth>
          <div style={{ padding: '20px', textAlign: 'center' }}>
            Brak danych do wyświetlenia
          </div>
        </Card>
      </DashboardContainer>
    );
  }

  const { headers: fraudHeaders, data: fraudData } = getFraudAlertTableData();
  const { headers: safetyHeaders, data: safetyData } = getSafetyAlertTableData();
  const { headers: maintenanceHeaders, data: maintenanceData } = getMaintenanceTableData();

  return (
    <DashboardContainer>
      <KPISection>
        <KPICard 
          title="Aktywne pojazdy" 
          value={dashboardData.kpis.activeVehicles} 
        />
        <KPICard 
          title="Aktywni kierowcy" 
          value={dashboardData.kpis.activeDrivers} 
        />
        <KPICard 
          title="Koszty dzisiaj" 
          value={`${dashboardData.kpis.dailyCosts} PLN`} 
        />
        <KPICard 
          title="Potencjalne oszczędności" 
          value={`${dashboardData.kpis.potentialSavings} PLN`} 
        />
        <KPICard 
          title="Wskaźnik bezpieczeństwa" 
          value={`${dashboardData.kpis.safetyIndex}%`} 
          trend="up" 
          trendValue="5% w tym miesiącu" 
        />
        <KPICard 
          title="Prognoza konserwacji" 
          value={`${dashboardData.kpis.maintenanceForecast} pojazdów`} 
          trend="down" 
          trendValue="3 mniej niż w zeszłym tygodniu" 
        />
      </KPISection>

      <SectionTitle>WYKRYWANIE OSZUSTW</SectionTitle>
      <Card fullWidth>
        <Table 
          headers={fraudHeaders} 
          data={fraudData} 
          onRowClick={(index) => handleRowClick('fraud', index)}
        />
      </Card>
      
      <GridSection>
        <Card>
          <MapPlaceholder>
            Mapa fraudów
            <MapOverlay>
              {dashboardData.mapData.fraudPoints.map((point, index) => (
                <MapPoint 
                  key={`fraud-${index}`}
                  x={point.x} 
                  y={point.y} 
                  color="#dc3545"
                />
              ))}
            </MapOverlay>
          </MapPlaceholder>
        </Card>
        <Card>
          <MapPlaceholder>
            Weryfikacja karty
            <MapOverlay>
              {dashboardData.mapData.fraudPoints.map((point, index) => (
                <MapPoint 
                  key={`verify-${index}`}
                  x={point.x} 
                  y={point.y} 
                  color="#fd7e14"
                />
              ))}
            </MapOverlay>
          </MapPlaceholder>
        </Card>
      </GridSection>

      <SectionTitle>BEZPIECZEŃSTWO KIEROWCY</SectionTitle>
      <Card fullWidth>
        <Table 
          headers={safetyHeaders} 
          data={safetyData} 
          onRowClick={(index) => handleRowClick('safety', index)}
        />
      </Card>
      
      <GridSection>
        <Card>
          <MapPlaceholder>
            Mapa incydentów
            <MapOverlay>
              {dashboardData.mapData.safetyPoints.map((point, index) => (
                <MapPoint 
                  key={`safety-${index}`}
                  x={point.x} 
                  y={point.y} 
                  color="#ffc107"
                />
              ))}
            </MapOverlay>
          </MapPlaceholder>
        </Card>
        <Card>
          <MapPlaceholder>
            Ranking bezpieczeństwa
          </MapPlaceholder>
        </Card>
      </GridSection>

      <SectionTitle>KONSERWACJA PREDYKCYJNA</SectionTitle>
      <Card fullWidth>
        <Table 
          headers={maintenanceHeaders} 
          data={maintenanceData} 
          onRowClick={(index) => handleRowClick('maintenance', index)}
        />
      </Card>
      
      <SectionTitle>MONITORING POJAZDÓW</SectionTitle>
      <Card fullWidth>
        <MapPlaceholder>
          Mapa pojazdów
          <MapOverlay>
            {dashboardData.mapData.vehiclePoints.map((point, index) => (
              <MapPoint 
                key={`vehicle-${index}`}
                x={point.x} 
                y={point.y} 
                color="#0d6efd"
              />
            ))}
          </MapOverlay>
        </MapPlaceholder>
      </Card>
    </DashboardContainer>
  );
};

export default Dashboard;
