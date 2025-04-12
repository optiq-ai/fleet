import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface ElectricVehicleOptimizationProps {
  onSaveSettings: (settings: any) => Promise<void>;
  onGenerateReport: (vehicleId: string, reportType: string) => Promise<void>;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 500;
`;

const Card = styled.div`
  background-color: var(--color-surface, white);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
`;

const CardTitle = styled.div`
  font-weight: 500;
  font-size: 16px;
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardContent = styled.div``;

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 20px;
`;

const Tab = styled.div<{ active: boolean }>`
  padding: 12px 24px;
  cursor: pointer;
  font-weight: ${props => props.active ? '500' : 'normal'};
  color: ${props => props.active ? 'var(--color-primary, #3f51b5)' : '#666'};
  border-bottom: 2px solid ${props => props.active ? 'var(--color-primary, #3f51b5)' : 'transparent'};
  transition: all 0.3s ease;
  
  &:hover {
    color: var(--color-primary, #3f51b5);
    background-color: #f5f5f5;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  
  &:focus {
    border-color: var(--color-primary, #3f51b5);
    outline: none;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  background-color: white;
  
  &:focus {
    border-color: var(--color-primary, #3f51b5);
    outline: none;
  }
`;

const Button = styled.button`
  padding: 10px 16px;
  background-color: var(--color-primary, #3f51b5);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  
  &:hover {
    background-color: var(--color-primary, #303f9f);
    opacity: 0.9;
  }
  
  &:disabled {
    background-color: #c5cae9;
    cursor: not-allowed;
  }
`;

const SecondaryButton = styled.button`
  padding: 10px 16px;
  background-color: white;
  color: var(--color-primary, #3f51b5);
  border: 1px solid var(--color-primary, #3f51b5);
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  
  &:hover {
    background-color: #e8eaf6;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`;

const VehiclesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const VehicleItem = styled.div`
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
`;

const VehicleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const VehicleTitle = styled.div`
  font-weight: 500;
`;

const VehicleBadge = styled.div<{ type: string }>`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  background-color: ${props => 
    props.type === 'BEV' ? '#e8f5e9' : 
    props.type === 'PHEV' ? '#fff8e1' : 
    props.type === 'HEV' ? '#e3f2fd' : 
    '#f5f5f5'
  };
  color: ${props => 
    props.type === 'BEV' ? '#2e7d32' : 
    props.type === 'PHEV' ? '#f57f17' : 
    props.type === 'HEV' ? '#1565c0' : 
    '#616161'
  };
`;

const VehicleInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 16px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const VehicleInfoItem = styled.div``;

const VehicleInfoLabel = styled.div`
  font-size: 12px;
  color: #666;
  margin-bottom: 4px;
`;

const VehicleInfoValue = styled.div`
  font-weight: 500;
`;

const VehicleActions = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button`
  padding: 6px 12px;
  background-color: white;
  color: var(--color-primary, #3f51b5);
  border: 1px solid var(--color-primary, #3f51b5);
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  
  &:hover {
    background-color: #e8eaf6;
  }
`;

const SearchContainer = styled.div`
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  
  &:focus {
    border-color: var(--color-primary, #3f51b5);
    outline: none;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const FilterButton = styled.button<{ active: boolean }>`
  padding: 6px 12px;
  background-color: ${props => props.active ? 'var(--color-primary, #3f51b5)' : 'white'};
  color: ${props => props.active ? 'white' : 'var(--color-primary, #3f51b5)'};
  border: 1px solid var(--color-primary, #3f51b5);
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  
  &:hover {
    background-color: ${props => props.active ? 'var(--color-primary, #303f9f)' : '#e8eaf6'};
  }
`;

const ChartContainer = styled.div`
  height: 300px;
  background-color: #f5f5f5;
  border-radius: 8px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div`
  padding: 16px;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const StatTitle = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
`;

const StatValue = styled.div`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 8px;
`;

const StatTrend = styled.div<{ trend: 'up' | 'down' | 'stable' }>`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  color: ${props => 
    props.trend === 'up' ? '#4caf50' : 
    props.trend === 'down' ? '#f44336' : 
    '#757575'
  };
`;

const SettingsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SettingCard = styled.div`
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #ddd;
  background-color: white;
`;

const SettingTitle = styled.div`
  font-weight: 500;
  margin-bottom: 12px;
`;

const SettingDescription = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 16px;
`;

const ToggleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
`;

const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
  
  &:checked + span {
    background-color: var(--color-primary, #3f51b5);
  }
  
  &:checked + span:before {
    transform: translateX(26px);
  }
`;

const ToggleSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 34px;
  
  &:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
  }
`;

const RangeContainer = styled.div`
  margin-top: 16px;
`;

const RangeLabel = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const RangeInput = styled.input`
  width: 100%;
  -webkit-appearance: none;
  height: 8px;
  border-radius: 4px;
  background: #ddd;
  outline: none;
  
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--color-primary, #3f51b5);
    cursor: pointer;
  }
  
  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--color-primary, #3f51b5);
    cursor: pointer;
  }
`;

const ChargingStationsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
`;

const ChargingStationItem = styled.div`
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
  display: flex;
  align-items: center;
  gap: 16px;
`;

const ChargingStationIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #e3f2fd;
  color: #1976d2;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
`;

const ChargingStationInfo = styled.div`
  flex: 1;
`;

const ChargingStationName = styled.div`
  font-weight: 500;
  margin-bottom: 4px;
`;

const ChargingStationAddress = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 4px;
`;

const ChargingStationDetails = styled.div`
  display: flex;
  gap: 16px;
  font-size: 14px;
`;

const ChargingStationStatus = styled.div<{ status: 'available' | 'busy' | 'offline' }>`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  background-color: ${props => 
    props.status === 'available' ? '#e8f5e9' : 
    props.status === 'busy' ? '#fff8e1' : 
    '#ffebee'
  };
  color: ${props => 
    props.status === 'available' ? '#2e7d32' : 
    props.status === 'busy' ? '#f57f17' : 
    '#c62828'
  };
`;

const MapContainer = styled.div`
  height: 400px;
  background-color: #f5f5f5;
  border-radius: 8px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
`;

const ElectricVehicleOptimization: React.FC<ElectricVehicleOptimizationProps> = ({
  onSaveSettings,
  onGenerateReport
}) => {
  const [activeTab, setActiveTab] = useState<'fleet' | 'charging' | 'settings' | 'reports'>('fleet');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [vehicleTypeFilter, setVehicleTypeFilter] = useState<'all' | 'BEV' | 'PHEV' | 'HEV'>('all');
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [chargingStations, setChargingStations] = useState<any[]>([]);
  
  // Ustawienia optymalizacji
  const [smartChargingEnabled, setSmartChargingEnabled] = useState<boolean>(true);
  const [routeOptimizationEnabled, setRouteOptimizationEnabled] = useState<boolean>(true);
  const [batteryHealthMonitoringEnabled, setBatteryHealthMonitoringEnabled] = useState<boolean>(true);
  const [preConditioningEnabled, setPreConditioningEnabled] = useState<boolean>(false);
  const [chargingThreshold, setChargingThreshold] = useState<number>(80);
  const [rangeReserve, setRangeReserve] = useState<number>(20);
  
  // Przykładowe dane
  useEffect(() => {
    // Symulacja pobrania pojazdów elektrycznych
    const sampleVehicles = [
      {
        id: 'ev1',
        name: 'Tesla Model 3',
        type: 'BEV',
        licensePlate: 'EV-12345',
        batteryCapacity: 75,
        currentCharge: 68,
        range: 320,
        efficiency: 16.8,
        lastCharged: '2025-04-11T08:30:00Z',
        assignedTo: 'Jan Kowalski',
        status: 'active',
        location: {
          latitude: 52.2297,
          longitude: 21.0122
        }
      },
      {
        id: 'ev2',
        name: 'Volkswagen ID.4',
        type: 'BEV',
        licensePlate: 'EV-67890',
        batteryCapacity: 82,
        currentCharge: 45,
        range: 210,
        efficiency: 18.2,
        lastCharged: '2025-04-10T17:15:00Z',
        assignedTo: 'Anna Nowak',
        status: 'active',
        location: {
          latitude: 52.2297,
          longitude: 21.0122
        }
      },
      {
        id: 'ev3',
        name: 'Toyota RAV4 Hybrid',
        type: 'HEV',
        licensePlate: 'HEV-54321',
        batteryCapacity: 1.6,
        currentCharge: 1.2,
        range: 950,
        efficiency: 5.6,
        lastCharged: null,
        assignedTo: 'Piotr Wiśniewski',
        status: 'active',
        location: {
          latitude: 52.2297,
          longitude: 21.0122
        }
      },
      {
        id: 'ev4',
        name: 'BMW 330e',
        type: 'PHEV',
        licensePlate: 'PHEV-98765',
        batteryCapacity: 12,
        currentCharge: 8.5,
        range: 60,
        efficiency: 14.5,
        lastCharged: '2025-04-12T07:45:00Z',
        assignedTo: 'Maria Kowalczyk',
        status: 'maintenance',
        location: {
          latitude: 52.2297,
          longitude: 21.0122
        }
      },
      {
        id: 'ev5',
        name: 'Hyundai Kona Electric',
        type: 'BEV',
        licensePlate: 'EV-24680',
        batteryCapacity: 64,
        currentCharge: 32,
        range: 180,
        efficiency: 15.4,
        lastCharged: '2025-04-09T19:30:00Z',
        assignedTo: 'Tomasz Lewandowski',
        status: 'active',
        location: {
          latitude: 52.2297,
          longitude: 21.0122
        }
      }
    ];
    
    setVehicles(sampleVehicles);
    
    // Symulacja pobrania stacji ładowania
    const sampleChargingStations = [
      {
        id: 'cs1',
        name: 'Stacja ładowania - Centrala',
        address: 'ul. Główna 1, Warszawa',
        type: 'DC Fast Charger',
        power: 150,
        connectors: 4,
        status: 'available',
        lastMaintenance: '2025-03-15',
        availableConnectors: 3
      },
      {
        id: 'cs2',
        name: 'Stacja ładowania - Magazyn Wschód',
        address: 'ul. Wschodnia 15, Warszawa',
        type: 'AC Level 2',
        power: 22,
        connectors: 6,
        status: 'busy',
        lastMaintenance: '2025-04-01',
        availableConnectors: 2
      },
      {
        id: 'cs3',
        name: 'Stacja ładowania - Biuro Północ',
        address: 'ul. Północna 8, Warszawa',
        type: 'DC Fast Charger',
        power: 100,
        connectors: 2,
        status: 'available',
        lastMaintenance: '2025-03-20',
        availableConnectors: 2
      },
      {
        id: 'cs4',
        name: 'Stacja ładowania - Magazyn Zachód',
        address: 'ul. Zachodnia 22, Warszawa',
        type: 'AC Level 2',
        power: 11,
        connectors: 8,
        status: 'offline',
        lastMaintenance: '2025-02-10',
        availableConnectors: 0
      }
    ];
    
    setChargingStations(sampleChargingStations);
  }, []);
  
  // Filtrowanie pojazdów na podstawie wyszukiwania i filtrów
  const filteredVehicles = vehicles.filter(vehicle => {
    // Filtrowanie według wyszukiwania
    if (searchQuery && !vehicle.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !vehicle.licensePlate.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !vehicle.assignedTo.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filtrowanie według typu pojazdu
    if (vehicleTypeFilter !== 'all' && vehicle.type !== vehicleTypeFilter) {
      return false;
    }
    
    return true;
  });
  
  // Filtrowanie stacji ładowania na podstawie wyszukiwania
  const filteredChargingStations = chargingStations.filter(station => {
    if (searchQuery && !station.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !station.address.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });
  
  // Obsługa zapisywania ustawień
  const handleSaveSettings = async () => {
    const settings = {
      smartChargingEnabled,
      routeOptimizationEnabled,
      batteryHealthMonitoringEnabled,
      preConditioningEnabled,
      chargingThreshold,
      rangeReserve
    };
    
    try {
      await onSaveSettings(settings);
      alert('Ustawienia zostały zapisane');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Wystąpił błąd podczas zapisywania ustawień');
    }
  };
  
  // Obsługa generowania raportu
  const handleGenerateReport = async (vehicleId: string, reportType: string) => {
    try {
      await onGenerateReport(vehicleId, reportType);
      alert(`Raport ${reportType} został wygenerowany`);
    } catch (error) {
      console.error('Error generating report:', error);
      alert('Wystąpił błąd podczas generowania raportu');
    }
  };
  
  // Formatowanie daty
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Nie dotyczy';
    
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  
  // Renderowanie zakładki floty
  const renderFleetTab = () => {
    return (
      <>
        <SearchContainer>
          <SearchInput 
            type="text" 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
            placeholder="Szukaj pojazdów po nazwie, numerze rejestracyjnym lub kierowcy..."
          />
        </SearchContainer>
        
        <FilterContainer>
          <FilterButton 
            active={vehicleTypeFilter === 'all'} 
            onClick={() => setVehicleTypeFilter('all')}
          >
            Wszystkie
          </FilterButton>
          <FilterButton 
            active={vehicleTypeFilter === 'BEV'} 
            onClick={() => setVehicleTypeFilter('BEV')}
          >
            Elektryczne (BEV)
          </FilterButton>
          <FilterButton 
            active={vehicleTypeFilter === 'PHEV'} 
            onClick={() => setVehicleTypeFilter('PHEV')}
          >
            Hybrydowe Plug-in (PHEV)
          </FilterButton>
          <FilterButton 
            active={vehicleTypeFilter === 'HEV'} 
            onClick={() => setVehicleTypeFilter('HEV')}
          >
            Hybrydowe (HEV)
          </FilterButton>
        </FilterContainer>
        
        <StatsGrid>
          <StatCard>
            <StatTitle>Średni poziom naładowania</StatTitle>
            <StatValue>64%</StatValue>
            <StatTrend trend="up">
              <span>↑</span>
              <span>5% w porównaniu do zeszłego tygodnia</span>
            </StatTrend>
          </StatCard>
          <StatCard>
            <StatTitle>Średni zasięg</StatTitle>
            <StatValue>215 km</StatValue>
            <StatTrend trend="stable">
              <span>→</span>
              <span>Bez zmian</span>
            </StatTrend>
          </StatCard>
          <StatCard>
            <StatTitle>Efektywność energetyczna</StatTitle>
            <StatValue>16.2 kWh/100km</StatValue>
            <StatTrend trend="down">
              <span>↓</span>
              <span>2% lepiej niż w zeszłym miesiącu</span>
            </StatTrend>
          </StatCard>
        </StatsGrid>
        
        <ChartContainer>
          Wykres zużycia energii w czasie
        </ChartContainer>
        
        {filteredVehicles.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px', color: '#ddd' }}>🔍</div>
            <div style={{ fontSize: '16px', marginBottom: '8px' }}>Brak pojazdów</div>
            <div style={{ fontSize: '14px', color: '#999', marginBottom: '16px' }}>
              {searchQuery || vehicleTypeFilter !== 'all' ? 
                'Brak wyników dla podanych filtrów' : 
                'Dodaj pojazdy elektryczne, aby rozpocząć'}
            </div>
            {(searchQuery || vehicleTypeFilter !== 'all') && (
              <SecondaryButton onClick={() => {
                setSearchQuery('');
                setVehicleTypeFilter('all');
              }}>
                Wyczyść filtry
              </SecondaryButton>
            )}
          </div>
        ) : (
          <VehiclesList>
            {filteredVehicles.map(vehicle => (
              <VehicleItem key={vehicle.id}>
                <VehicleHeader>
                  <VehicleTitle>{vehicle.name} ({vehicle.licensePlate})</VehicleTitle>
                  <VehicleBadge type={vehicle.type}>
                    {vehicle.type === 'BEV' ? 'Elektryczny' : 
                     vehicle.type === 'PHEV' ? 'Hybrydowy Plug-in' : 
                     'Hybrydowy'}
                  </VehicleBadge>
                </VehicleHeader>
                
                <VehicleInfo>
                  <VehicleInfoItem>
                    <VehicleInfoLabel>Poziom naładowania</VehicleInfoLabel>
                    <VehicleInfoValue>{Math.round((vehicle.currentCharge / vehicle.batteryCapacity) * 100)}%</VehicleInfoValue>
                  </VehicleInfoItem>
                  
                  <VehicleInfoItem>
                    <VehicleInfoLabel>Zasięg</VehicleInfoLabel>
                    <VehicleInfoValue>{vehicle.range} km</VehicleInfoValue>
                  </VehicleInfoItem>
                  
                  <VehicleInfoItem>
                    <VehicleInfoLabel>Efektywność</VehicleInfoLabel>
                    <VehicleInfoValue>{vehicle.efficiency} kWh/100km</VehicleInfoValue>
                  </VehicleInfoItem>
                  
                  <VehicleInfoItem>
                    <VehicleInfoLabel>Ostatnie ładowanie</VehicleInfoLabel>
                    <VehicleInfoValue>{formatDate(vehicle.lastCharged)}</VehicleInfoValue>
                  </VehicleInfoItem>
                  
                  <VehicleInfoItem>
                    <VehicleInfoLabel>Przypisany do</VehicleInfoLabel>
                    <VehicleInfoValue>{vehicle.assignedTo}</VehicleInfoValue>
                  </VehicleInfoItem>
                  
                  <VehicleInfoItem>
                    <VehicleInfoLabel>Status</VehicleInfoLabel>
                    <VehicleInfoValue>
                      {vehicle.status === 'active' ? 'Aktywny' : 
                       vehicle.status === 'maintenance' ? 'W konserwacji' : 
                       'Nieaktywny'}
                    </VehicleInfoValue>
                  </VehicleInfoItem>
                </VehicleInfo>
                
                <VehicleActions>
                  <ActionButton onClick={() => handleGenerateReport(vehicle.id, 'efficiency')}>
                    Raport efektywności
                  </ActionButton>
                  <ActionButton onClick={() => handleGenerateReport(vehicle.id, 'battery')}>
                    Raport baterii
                  </ActionButton>
                  <ActionButton>Zaplanuj ładowanie</ActionButton>
                  <ActionButton>Szczegóły</ActionButton>
                </VehicleActions>
              </VehicleItem>
            ))}
          </VehiclesList>
        )}
      </>
    );
  };
  
  // Renderowanie zakładki stacji ładowania
  const renderChargingTab = () => {
    return (
      <>
        <SearchContainer>
          <SearchInput 
            type="text" 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
            placeholder="Szukaj stacji ładowania po nazwie lub adresie..."
          />
        </SearchContainer>
        
        <MapContainer>
          Mapa stacji ładowania
        </MapContainer>
        
        <StatsGrid>
          <StatCard>
            <StatTitle>Dostępne stacje</StatTitle>
            <StatValue>
              {chargingStations.filter(station => station.status === 'available').length} / {chargingStations.length}
            </StatValue>
          </StatCard>
          <StatCard>
            <StatTitle>Dostępne złącza</StatTitle>
            <StatValue>
              {chargingStations.reduce((acc, station) => acc + station.availableConnectors, 0)} / {chargingStations.reduce((acc, station) => acc + station.connectors, 0)}
            </StatValue>
          </StatCard>
          <StatCard>
            <StatTitle>Średni czas ładowania</StatTitle>
            <StatValue>45 min</StatValue>
          </StatCard>
        </StatsGrid>
        
        {filteredChargingStations.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px', color: '#ddd' }}>🔍</div>
            <div style={{ fontSize: '16px', marginBottom: '8px' }}>Brak stacji ładowania</div>
            <div style={{ fontSize: '14px', color: '#999', marginBottom: '16px' }}>
              {searchQuery ? 'Brak wyników dla podanego wyszukiwania' : 'Dodaj stacje ładowania, aby rozpocząć'}
            </div>
            {searchQuery && (
              <SecondaryButton onClick={() => setSearchQuery('')}>
                Wyczyść wyszukiwanie
              </SecondaryButton>
            )}
          </div>
        ) : (
          <ChargingStationsList>
            {filteredChargingStations.map(station => (
              <ChargingStationItem key={station.id}>
                <ChargingStationIcon>⚡</ChargingStationIcon>
                <ChargingStationInfo>
                  <ChargingStationName>{station.name}</ChargingStationName>
                  <ChargingStationAddress>{station.address}</ChargingStationAddress>
                  <ChargingStationDetails>
                    <div>Typ: {station.type}</div>
                    <div>Moc: {station.power} kW</div>
                    <div>Złącza: {station.availableConnectors} / {station.connectors} dostępne</div>
                  </ChargingStationDetails>
                </ChargingStationInfo>
                <ChargingStationStatus status={station.status as any}>
                  {station.status === 'available' ? 'Dostępna' : 
                   station.status === 'busy' ? 'Zajęta' : 
                   'Offline'}
                </ChargingStationStatus>
                <VehicleActions>
                  <ActionButton>Szczegóły</ActionButton>
                  <ActionButton>Zarezerwuj</ActionButton>
                </VehicleActions>
              </ChargingStationItem>
            ))}
          </ChargingStationsList>
        )}
      </>
    );
  };
  
  // Renderowanie zakładki ustawień
  const renderSettingsTab = () => {
    return (
      <>
        <SettingsGrid>
          <SettingCard>
            <SettingTitle>Inteligentne ładowanie</SettingTitle>
            <SettingDescription>
              Automatycznie planuj ładowanie pojazdów w godzinach niższych taryf energetycznych 
              i optymalizuj harmonogram ładowania dla całej floty.
            </SettingDescription>
            <ToggleContainer>
              <div>Włącz inteligentne ładowanie</div>
              <ToggleSwitch>
                <ToggleInput 
                  type="checkbox" 
                  checked={smartChargingEnabled}
                  onChange={() => setSmartChargingEnabled(!smartChargingEnabled)}
                />
                <ToggleSlider />
              </ToggleSwitch>
            </ToggleContainer>
          </SettingCard>
          
          <SettingCard>
            <SettingTitle>Optymalizacja tras</SettingTitle>
            <SettingDescription>
              Automatycznie planuj trasy z uwzględnieniem zasięgu pojazdu, lokalizacji stacji ładowania 
              i aktualnych warunków drogowych.
            </SettingDescription>
            <ToggleContainer>
              <div>Włącz optymalizację tras</div>
              <ToggleSwitch>
                <ToggleInput 
                  type="checkbox" 
                  checked={routeOptimizationEnabled}
                  onChange={() => setRouteOptimizationEnabled(!routeOptimizationEnabled)}
                />
                <ToggleSlider />
              </ToggleSwitch>
            </ToggleContainer>
          </SettingCard>
          
          <SettingCard>
            <SettingTitle>Monitorowanie stanu baterii</SettingTitle>
            <SettingDescription>
              Monitoruj stan baterii pojazdów elektrycznych i otrzymuj powiadomienia o potencjalnych problemach 
              lub konieczności konserwacji.
            </SettingDescription>
            <ToggleContainer>
              <div>Włącz monitorowanie stanu baterii</div>
              <ToggleSwitch>
                <ToggleInput 
                  type="checkbox" 
                  checked={batteryHealthMonitoringEnabled}
                  onChange={() => setBatteryHealthMonitoringEnabled(!batteryHealthMonitoringEnabled)}
                />
                <ToggleSlider />
              </ToggleSwitch>
            </ToggleContainer>
          </SettingCard>
          
          <SettingCard>
            <SettingTitle>Wstępne kondycjonowanie</SettingTitle>
            <SettingDescription>
              Automatycznie przygotowuj pojazd przed rozpoczęciem jazdy, ogrzewając lub chłodząc kabinę 
              podczas ładowania, aby oszczędzać energię baterii.
            </SettingDescription>
            <ToggleContainer>
              <div>Włącz wstępne kondycjonowanie</div>
              <ToggleSwitch>
                <ToggleInput 
                  type="checkbox" 
                  checked={preConditioningEnabled}
                  onChange={() => setPreConditioningEnabled(!preConditioningEnabled)}
                />
                <ToggleSlider />
              </ToggleSwitch>
            </ToggleContainer>
          </SettingCard>
        </SettingsGrid>
        
        <Card>
          <CardTitle>Ustawienia ładowania</CardTitle>
          <CardContent>
            <RangeContainer>
              <Label>Próg ładowania (do ilu % ładować baterie)</Label>
              <RangeLabel>
                <span>50%</span>
                <span>{chargingThreshold}%</span>
                <span>100%</span>
              </RangeLabel>
              <RangeInput 
                type="range" 
                min="50" 
                max="100" 
                value={chargingThreshold}
                onChange={(e) => setChargingThreshold(parseInt(e.target.value))}
              />
              <div style={{ marginTop: '8px', fontSize: '14px', color: '#666' }}>
                Ładowanie baterii do {chargingThreshold}% zamiast 100% może wydłużyć żywotność baterii.
              </div>
            </RangeContainer>
            
            <RangeContainer>
              <Label>Rezerwa zasięgu (minimalny % baterii)</Label>
              <RangeLabel>
                <span>10%</span>
                <span>{rangeReserve}%</span>
                <span>30%</span>
              </RangeLabel>
              <RangeInput 
                type="range" 
                min="10" 
                max="30" 
                value={rangeReserve}
                onChange={(e) => setRangeReserve(parseInt(e.target.value))}
              />
              <div style={{ marginTop: '8px', fontSize: '14px', color: '#666' }}>
                Utrzymywanie minimalnej rezerwy {rangeReserve}% zapewnia margines bezpieczeństwa w przypadku nieoczekiwanych zmian trasy.
              </div>
            </RangeContainer>
          </CardContent>
        </Card>
        
        <ButtonGroup>
          <Button onClick={handleSaveSettings}>Zapisz ustawienia</Button>
        </ButtonGroup>
      </>
    );
  };
  
  // Renderowanie zakładki raportów
  const renderReportsTab = () => {
    return (
      <>
        <Card>
          <CardTitle>Raporty efektywności</CardTitle>
          <CardContent>
            <p>Generuj raporty efektywności dla poszczególnych pojazdów lub całej floty.</p>
            
            <FormGroup>
              <Label>Wybierz pojazd</Label>
              <Select>
                <option value="all">Cała flota</option>
                {vehicles.map(vehicle => (
                  <option key={vehicle.id} value={vehicle.id}>
                    {vehicle.name} ({vehicle.licensePlate})
                  </option>
                ))}
              </Select>
            </FormGroup>
            
            <FormGroup>
              <Label>Zakres czasu</Label>
              <Select>
                <option value="week">Ostatni tydzień</option>
                <option value="month">Ostatni miesiąc</option>
                <option value="quarter">Ostatni kwartał</option>
                <option value="year">Ostatni rok</option>
                <option value="custom">Niestandardowy zakres</option>
              </Select>
            </FormGroup>
            
            <ButtonGroup>
              <Button onClick={() => handleGenerateReport('all', 'efficiency')}>
                Generuj raport efektywności
              </Button>
            </ButtonGroup>
          </CardContent>
        </Card>
        
        <Card>
          <CardTitle>Raporty stanu baterii</CardTitle>
          <CardContent>
            <p>Generuj raporty stanu baterii dla poszczególnych pojazdów elektrycznych.</p>
            
            <FormGroup>
              <Label>Wybierz pojazd elektryczny</Label>
              <Select>
                {vehicles.filter(v => v.type === 'BEV' || v.type === 'PHEV').map(vehicle => (
                  <option key={vehicle.id} value={vehicle.id}>
                    {vehicle.name} ({vehicle.licensePlate})
                  </option>
                ))}
              </Select>
            </FormGroup>
            
            <ButtonGroup>
              <Button onClick={() => handleGenerateReport(vehicles[0].id, 'battery')}>
                Generuj raport stanu baterii
              </Button>
            </ButtonGroup>
          </CardContent>
        </Card>
        
        <Card>
          <CardTitle>Raporty ładowania</CardTitle>
          <CardContent>
            <p>Generuj raporty ładowania dla poszczególnych pojazdów lub stacji ładowania.</p>
            
            <FormGroup>
              <Label>Typ raportu</Label>
              <Select>
                <option value="vehicle">Według pojazdu</option>
                <option value="station">Według stacji ładowania</option>
                <option value="cost">Analiza kosztów</option>
              </Select>
            </FormGroup>
            
            <FormGroup>
              <Label>Zakres czasu</Label>
              <Select>
                <option value="week">Ostatni tydzień</option>
                <option value="month">Ostatni miesiąc</option>
                <option value="quarter">Ostatni kwartał</option>
                <option value="year">Ostatni rok</option>
                <option value="custom">Niestandardowy zakres</option>
              </Select>
            </FormGroup>
            
            <ButtonGroup>
              <Button onClick={() => handleGenerateReport('all', 'charging')}>
                Generuj raport ładowania
              </Button>
            </ButtonGroup>
          </CardContent>
        </Card>
      </>
    );
  };
  
  return (
    <Container>
      <Header>
        <Title>Optymalizacja pojazdów elektrycznych</Title>
      </Header>
      
      <TabsContainer>
        <Tab 
          active={activeTab === 'fleet'} 
          onClick={() => setActiveTab('fleet')}
        >
          Flota elektryczna
        </Tab>
        <Tab 
          active={activeTab === 'charging'} 
          onClick={() => setActiveTab('charging')}
        >
          Stacje ładowania
        </Tab>
        <Tab 
          active={activeTab === 'settings'} 
          onClick={() => setActiveTab('settings')}
        >
          Ustawienia
        </Tab>
        <Tab 
          active={activeTab === 'reports'} 
          onClick={() => setActiveTab('reports')}
        >
          Raporty
        </Tab>
      </TabsContainer>
      
      {activeTab === 'fleet' && renderFleetTab()}
      {activeTab === 'charging' && renderChargingTab()}
      {activeTab === 'settings' && renderSettingsTab()}
      {activeTab === 'reports' && renderReportsTab()}
    </Container>
  );
};

export default ElectricVehicleOptimization;
