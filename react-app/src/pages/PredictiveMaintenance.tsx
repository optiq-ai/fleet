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

const Timeline = styled.div`
  position: relative;
  margin: 20px 0;
  padding-left: 30px;
`;

const TimelineItem = styled.div`
  position: relative;
  padding-bottom: 30px;
  
  &:last-child {
    padding-bottom: 0;
  }
  
  &::before {
    content: '';
    position: absolute;
    left: -30px;
    top: 0;
    width: 2px;
    height: 100%;
    background-color: #e0e0e0;
  }
  
  &:last-child::before {
    height: 0;
  }
`;

const TimelineDot = styled.div<{ color: string }>`
  position: absolute;
  left: -39px;
  top: 0;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
  z-index: 1;
`;

const TimelineContent = styled.div`
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const TimelineTitle = styled.div`
  font-weight: 500;
  margin-bottom: 8px;
`;

const TimelineDate = styled.div`
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
`;

const TimelineDescription = styled.div`
  font-size: 14px;
  color: #333;
`;

const ComponentCard = styled.div<{ health: number }>`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 16px;
  margin-bottom: 16px;
  border-left: 4px solid ${props => 
    props.health > 80 ? '#28a745' : 
    props.health > 60 ? '#ffc107' : 
    props.health > 40 ? '#fd7e14' : 
    '#dc3545'
  };
`;

const ComponentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const ComponentName = styled.div`
  font-weight: 500;
  font-size: 16px;
`;

const ComponentHealth = styled.div<{ health: number }>`
  font-weight: 500;
  color: ${props => 
    props.health > 80 ? '#28a745' : 
    props.health > 60 ? '#ffc107' : 
    props.health > 40 ? '#fd7e14' : 
    '#dc3545'
  };
`;

const ComponentDetails = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #666;
  margin-bottom: 12px;
`;

const GaugeChart = styled.div`
  position: relative;
  width: 100%;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const GaugeBackground = styled.div`
  position: relative;
  width: 200px;
  height: 100px;
  border-top-left-radius: 100px;
  border-top-right-radius: 100px;
  background: linear-gradient(
    to right,
    #dc3545 0%,
    #fd7e14 25%,
    #ffc107 50%,
    #28a745 75%,
    #28a745 100%
  );
  overflow: hidden;
`;

const GaugeOverlay = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  bottom: 0;
  border-top-left-radius: 90px;
  border-top-right-radius: 90px;
  background-color: white;
`;

const GaugeNeedle = styled.div<{ rotation: number }>`
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 4px;
  height: 90px;
  background-color: #333;
  transform: translateX(-50%) rotate(${props => props.rotation}deg);
  transform-origin: bottom center;
  transition: transform 1s ease-in-out;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 50%;
    width: 10px;
    height: 10px;
    background-color: #333;
    border-radius: 50%;
    transform: translateX(-50%);
  }
`;

const GaugeValue = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 24px;
  font-weight: 500;
  color: #333;
`;

// Typy danych
interface MaintenanceData {
  kpis: {
    vehiclesForMaintenance: number;
    scheduledServices: number;
    warrantyAlerts: number;
    partsInventory: number;
  };
  maintenanceForecasts: {
    vehicle: string;
    component: string;
    forecast: string;
    confidence: string;
  }[];
  maintenanceSchedule: {
    date: string;
    vehicle: string;
    serviceType: string;
    status: string;
  }[];
  vehicleComponents: {
    id: string;
    vehicle: string;
    name: string;
    health: number;
    lastService: string;
    nextService: string;
  }[];
  partsInventory: {
    part: string;
    stock: number;
    reorderPoint: number;
    onOrder: number;
  }[];
  maintenanceHistory: {
    id: string;
    vehicle: string;
    date: string;
    type: string;
    description: string;
    cost: string;
  }[];
}

const PredictiveMaintenance: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [maintenanceData, setMaintenanceData] = useState<MaintenanceData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [vehicleFilter, setVehicleFilter] = useState('all');
  const [componentFilter, setComponentFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);

  // Symulacja pobierania danych z API
  useEffect(() => {
    const fetchMaintenanceData = async () => {
      setIsLoading(true);
      try {
        // Symulacja opóźnienia sieciowego
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Dane mockowe
        const mockData: MaintenanceData = {
          kpis: {
            vehiclesForMaintenance: 12,
            scheduledServices: 8,
            warrantyAlerts: 5,
            partsInventory: 87
          },
          maintenanceForecasts: [
            { vehicle: 'ABC123', component: 'Hamulce', forecast: 'Awaria za 2 tyg.', confidence: '85%' },
            { vehicle: 'DEF456', component: 'Akumulator', forecast: 'Awaria za 5 dni', confidence: '72%' },
            { vehicle: 'GHI789', component: 'Olej', forecast: 'Wymiana za 3 dni', confidence: '91%' },
            { vehicle: 'JKL012', component: 'Zawieszenie', forecast: 'Awaria za 3 tyg.', confidence: '68%' },
            { vehicle: 'MNO345', component: 'Alternator', forecast: 'Awaria za 10 dni', confidence: '77%' }
          ],
          maintenanceSchedule: [
            { date: '13.04', vehicle: 'ABC123', serviceType: 'Wymiana hamulców', status: 'Zaplanowane' },
            { date: '15.04', vehicle: 'DEF456', serviceType: 'Wymiana akumulatora', status: 'Zaplanowane' },
            { date: '15.04', vehicle: 'GHI789', serviceType: 'Wymiana oleju', status: 'Zaplanowane' },
            { date: '20.04', vehicle: 'PQR678', serviceType: 'Przegląd okresowy', status: 'Zaplanowane' },
            { date: '25.04', vehicle: 'STU901', serviceType: 'Wymiana opon', status: 'Zaplanowane' }
          ],
          vehicleComponents: [
            { id: 'comp1', vehicle: 'ABC123', name: 'Hamulce', health: 35, lastService: '10.01.2025', nextService: '15.04.2025' },
            { id: 'comp2', vehicle: 'ABC123', name: 'Akumulator', health: 65, lastService: '05.02.2025', nextService: '05.08.2025' },
            { id: 'comp3', vehicle: 'ABC123', name: 'Olej silnikowy', health: 25, lastService: '15.01.2025', nextService: '15.04.2025' },
            { id: 'comp4', vehicle: 'DEF456', name: 'Hamulce', health: 75, lastService: '20.02.2025', nextService: '20.08.2025' },
            { id: 'comp5', vehicle: 'DEF456', name: 'Akumulator', health: 28, lastService: '10.12.2024', nextService: '15.04.2025' },
            { id: 'comp6', vehicle: 'GHI789', name: 'Olej silnikowy', health: 15, lastService: '05.01.2025', nextService: '15.04.2025' }
          ],
          partsInventory: [
            { part: 'Klocki hamulcowe', stock: 24, reorderPoint: 10, onOrder: 0 },
            { part: 'Tarcze hamulcowe', stock: 12, reorderPoint: 5, onOrder: 10 },
            { part: 'Akumulatory', stock: 8, reorderPoint: 5, onOrder: 0 },
            { part: 'Olej silnikowy (l)', stock: 150, reorderPoint: 50, onOrder: 0 },
            { part: 'Filtry oleju', stock: 35, reorderPoint: 15, onOrder: 0 },
            { part: 'Filtry powietrza', stock: 18, reorderPoint: 10, onOrder: 20 }
          ],
          maintenanceHistory: [
            { id: 'hist1', vehicle: 'ABC123', date: '10.01.2025', type: 'Naprawa', description: 'Wymiana klocków hamulcowych', cost: '850 PLN' },
            { id: 'hist2', vehicle: 'DEF456', date: '20.02.2025', type: 'Przegląd', description: 'Przegląd okresowy', cost: '450 PLN' },
            { id: 'hist3', vehicle: 'GHI789', date: '05.01.2025', type: 'Naprawa', description: 'Wymiana oleju i filtrów', cost: '350 PLN' },
            { id: 'hist4', vehicle: 'ABC123', date: '05.11.2024', type: 'Naprawa', description: 'Wymiana akumulatora', cost: '750 PLN' },
            { id: 'hist5', vehicle: 'DEF456', date: '10.12.2024', type: 'Naprawa', description: 'Wymiana alternatora', cost: '1200 PLN' }
          ]
        };
        
        setMaintenanceData(mockData);
        setError(null);
      } catch (err) {
        console.error('Error fetching maintenance data:', err);
        setError('Nie udało się pobrać danych o konserwacji. Spróbuj ponownie później.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMaintenanceData();
  }, []);

  // Filtrowanie prognoz
  const getFilteredForecasts = () => {
    if (!maintenanceData) return [];
    
    return maintenanceData.maintenanceForecasts.filter(forecast => {
      // Filtrowanie po pojeździe
      if (vehicleFilter !== 'all' && forecast.vehicle !== vehicleFilter) return false;
      
      // Filtrowanie po komponencie
      if (componentFilter !== 'all' && forecast.component !== componentFilter) return false;
      
      // Filtrowanie po wyszukiwaniu
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          forecast.vehicle.toLowerCase().includes(query) ||
          forecast.component.toLowerCase().includes(query) ||
          forecast.forecast.toLowerCase().includes(query)
        );
      }
      
      return true;
    });
  };

  // Filtrowanie komponentów pojazdu
  const getFilteredComponents = () => {
    if (!maintenanceData) return [];
    
    let components = maintenanceData.vehicleComponents;
    
    // Filtrowanie po wybranym pojeździe
    if (selectedVehicle) {
      components = components.filter(component => component.vehicle === selectedVehicle);
    }
    
    return components;
  };

  // Konwersja danych do formatu wymaganego przez komponent Table
  const getForecastTableData = () => {
    const filteredForecasts = getFilteredForecasts();
    
    return {
      headers: ['Pojazd', 'Element', 'Prognoza', 'Pewność'],
      data: filteredForecasts.map(forecast => [
        forecast.vehicle,
        forecast.component,
        forecast.forecast,
        forecast.confidence
      ])
    };
  };
  
  const getScheduleTableData = () => {
    if (!maintenanceData) return { headers: [], data: [] };
    
    return {
      headers: ['Data', 'Pojazd', 'Typ serwisu', 'Status'],
      data: maintenanceData.maintenanceSchedule.map(schedule => [
        schedule.date,
        schedule.vehicle,
        schedule.serviceType,
        schedule.status
      ])
    };
  };
  
  const getPartsInventoryTableData = () => {
    if (!maintenanceData) return { headers: [], data: [] };
    
    return {
      headers: ['Część', 'Stan magazynowy', 'Punkt ponownego zamówienia', 'W zamówieniu'],
      data: maintenanceData.partsInventory.map(part => [
        part.part,
        part.stock.toString(),
        part.reorderPoint.toString(),
        part.onOrder.toString()
      ])
    };
  };

  // Obsługa kliknięcia wiersza tabeli
  const handleRowClick = (table: string, index: number) => {
    console.log(`Kliknięto wiersz ${index} w tabeli ${table}`);
    
    if (table === 'forecast' && maintenanceData) {
      const forecast = getFilteredForecasts()[index];
      setSelectedVehicle(forecast.vehicle);
      alert(`Wybrano pojazd: ${forecast.vehicle}`);
    }
  };

  // Obsługa zmiany filtrów
  const handleVehicleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setVehicleFilter(e.target.value);
  };
  
  const handleComponentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setComponentFilter(e.target.value);
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Obliczanie rotacji wskaźnika na wykresie
  const calculateGaugeRotation = (value: number) => {
    // Wartość 0% = -90 stopni, 100% = 90 stopni
    return -90 + (value / 100) * 180;
  };

  if (isLoading) {
    return (
      <PageContainer>
        <LoadingIndicator>Ładowanie danych o konserwacji predykcyjnej...</LoadingIndicator>
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

  if (!maintenanceData) {
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

  const { headers: forecastHeaders, data: forecastData } = getForecastTableData();
  const { headers: scheduleHeaders, data: scheduleData } = getScheduleTableData();
  const { headers: partsHeaders, data: partsData } = getPartsInventoryTableData();
  const filteredComponents = getFilteredComponents();

  // Unikalne pojazdy i komponenty do filtrów
  const uniqueVehicles = Array.from(new Set(maintenanceData.maintenanceForecasts.map(f => f.vehicle)));
  const uniqueComponents = Array.from(new Set(maintenanceData.maintenanceForecasts.map(f => f.component)));

  return (
    <PageContainer>
      <KPISection>
        <KPICard 
          title="Pojazdy do konserwacji" 
          value={maintenanceData.kpis.vehiclesForMaintenance} 
          trend="up" 
          trendValue="3 więcej niż w zeszłym tygodniu" 
        />
        <KPICard 
          title="Zaplanowane przeglądy" 
          value={maintenanceData.kpis.scheduledServices} 
          trend="neutral" 
          trendValue="Bez zmian" 
        />
        <KPICard 
          title="Alerty gwarancyjne" 
          value={maintenanceData.kpis.warrantyAlerts} 
          trend="down" 
          trendValue="2 mniej niż w zeszłym miesiącu" 
        />
        <KPICard 
          title="Stan części magazynowych" 
          value={`${maintenanceData.kpis.partsInventory}%`} 
          trend="up" 
          trendValue="5% więcej niż w zeszłym miesiącu" 
        />
      </KPISection>

      <SectionTitle>PROGNOZA AWARII</SectionTitle>
      <FilterBar>
        <FilterSelect value={vehicleFilter} onChange={handleVehicleChange}>
          <FilterOption value="all">Wszystkie pojazdy</FilterOption>
          {uniqueVehicles.map((vehicle, index) => (
            <FilterOption key={index} value={vehicle}>{vehicle}</FilterOption>
          ))}
        </FilterSelect>
        
        <FilterSelect value={componentFilter} onChange={handleComponentChange}>
          <FilterOption value="all">Wszystkie komponenty</FilterOption>
          {uniqueComponents.map((component, index) => (
            <FilterOption key={index} value={component}>{component}</FilterOption>
          ))}
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
          headers={forecastHeaders} 
          data={forecastData} 
          onRowClick={(index) => handleRowClick('forecast', index)}
          emptyMessage="Brak prognoz spełniających kryteria filtrowania"
        />
      </Card>

      <SectionTitle>HARMONOGRAM KONSERWACJI</SectionTitle>
      <Card fullWidth>
        <Table 
          headers={scheduleHeaders} 
          data={scheduleData} 
          onRowClick={(index) => handleRowClick('schedule', index)}
        />
      </Card>
      
      {selectedVehicle && (
        <>
          <SectionTitle>STAN KOMPONENTÓW POJAZDU {selectedVehicle}</SectionTitle>
          <div>
            {filteredComponents.map((component, index) => (
              <ComponentCard key={index} health={component.health}>
                <ComponentHeader>
                  <ComponentName>{component.name}</ComponentName>
                  <ComponentHealth health={component.health}>{component.health}%</ComponentHealth>
                </ComponentHeader>
                <ComponentDetails>
                  <div>Ostatni serwis: {component.lastService}</div>
                  <div>Następny serwis: {component.nextService}</div>
                </ComponentDetails>
                <GaugeChart>
                  <GaugeBackground>
                    <GaugeOverlay />
                    <GaugeNeedle rotation={calculateGaugeRotation(component.health)} />
                    <GaugeValue>{component.health}%</GaugeValue>
                  </GaugeBackground>
                </GaugeChart>
              </ComponentCard>
            ))}
          </div>
        </>
      )}
      
      <SectionTitle>ZARZĄDZANIE CZĘŚCIAMI</SectionTitle>
      <GridSection>
        <Card title="Stan magazynu">
          <Table 
            headers={partsHeaders} 
            data={partsData} 
          />
        </Card>
        <Card title="Historia konserwacji">
          <Timeline>
            {maintenanceData.maintenanceHistory
              .filter(history => !selectedVehicle || history.vehicle === selectedVehicle)
              .slice(0, 3)
              .map((history, index) => (
                <TimelineItem key={index}>
                  <TimelineDot color={history.type === 'Naprawa' ? '#dc3545' : '#28a745'}>
                    {history.type === 'Naprawa' ? 'N' : 'P'}
                  </TimelineDot>
                  <TimelineContent>
                    <TimelineTitle>{history.description}</TimelineTitle>
                    <TimelineDate>{history.date} - {history.vehicle}</TimelineDate>
                    <TimelineDescription>
                      Typ: {history.type}<br />
                      Koszt: {history.cost}
                    </TimelineDescription>
                  </TimelineContent>
                </TimelineItem>
              ))}
          </Timeline>
        </Card>
      </GridSection>
    </PageContainer>
  );
};

export default PredictiveMaintenance;
